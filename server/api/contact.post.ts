import {
  defineEventHandler,
  readBody,
  createError,
  getRequestHeader,
} from "h3";

/**
 * In-memory rate limiter (works well on single server)
 * If you're on serverless or multiple instances, replace with Redis/Upstash.
 */
type Bucket = { count: number; resetAt: number; lastAt: number };
const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function getClientIp(event: any) {
  const xff = getRequestHeader(event, "x-forwarded-for");
  if (xff) return String(xff).split(",")[0].trim();
  const xri = getRequestHeader(event, "x-real-ip");
  if (xri) return String(xri).trim();
  // fallback (may be empty in some deployments)
  // @ts-ignore
  return (event?.node?.req?.socket?.remoteAddress as string) || "unknown";
}

function isEmail(x: string) {
  return /.+@.+\..+/.test(x);
}

function escapeHtml(input: string) {
  return String(input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function rateLimitOrThrow(
  key: string,
  opts: { windowMs: number; max: number; minGapMs?: number },
) {
  const t = now();
  const b = buckets.get(key);

  // cleanup: if map grows too much, prune old buckets quickly
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (t > v.resetAt + 60_000) buckets.delete(k);
    }
  }

  if (!b || t > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: t + opts.windowMs, lastAt: t });
    return;
  }

  if (opts.minGapMs && t - b.lastAt < opts.minGapMs) {
    throw createError({
      statusCode: 429,
      statusMessage: "درخواست‌ها خیلی سریع ارسال شده‌اند. لطفاً کمی صبر کنید.",
    });
  }

  b.count += 1;
  b.lastAt = t;

  if (b.count > opts.max) {
    const secondsLeft = Math.ceil((b.resetAt - t) / 1000);
    throw createError({
      statusCode: 429,
      statusMessage: `تعداد پیام‌ها زیاد است. لطفاً ${secondsLeft} ثانیه دیگر دوباره تلاش کنید.`,
    });
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const topic = String(body?.topic ?? "").trim();
  const message = String(body?.message ?? "").trim();

  // honeypot (bots fill it)
  const website = String(body?.website ?? "").trim();

  // client meta (anti-bot)
  const spentMs = Number(body?.clientMeta?.spentMs ?? 0);
  const lat = body?.clientMeta?.lat;
  const lng = body?.clientMeta?.lng;

  // ---- anti-spam / validation ----
  if (website) {
    // silently reject bots (same response)
    return { ok: true };
  }

  if (!name)
    throw createError({ statusCode: 400, statusMessage: "نام لازم است." });
  if (!isEmail(email))
    throw createError({ statusCode: 400, statusMessage: "ایمیل معتبر نیست." });
  if (!topic)
    throw createError({ statusCode: 400, statusMessage: "موضوع لازم است." });
  if (!message)
    throw createError({ statusCode: 400, statusMessage: "متن پیام لازم است." });

  // message length limits (server authoritative)
  if (message.length < 20)
    throw createError({
      statusCode: 400,
      statusMessage: "پیام خیلی کوتاه است.",
    });
  if (message.length > 1200)
    throw createError({
      statusCode: 400,
      statusMessage: "پیام خیلی طولانی است.",
    });

  // require realistic fill time (bots often submit instantly)
  if (spentMs && spentMs < 1200) {
    throw createError({
      statusCode: 429,
      statusMessage: "ارسال خیلی سریع بود. لطفاً دوباره تلاش کنید.",
    });
  }

  // ---- rate limiting ----
  const ip = getClientIp(event);
  const ua = String(getRequestHeader(event, "user-agent") ?? "unknown").slice(
    0,
    140,
  );

  // per-IP: 5 requests / 10 minutes + minimum 6s gap
  rateLimitOrThrow(`contact:ip:${ip}`, {
    windowMs: 10 * 60_000,
    max: 5,
    minGapMs: 6000,
  });

  // per IP+UA tighter short window (burst control): 2 / 60s
  rateLimitOrThrow(`contact:burst:${ip}:${ua}`, {
    windowMs: 60_000,
    max: 2,
    minGapMs: 4000,
  });

  // ---- email sending (Resend) ----
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const MAIL_FROM = process.env.CONTACT_MAIL_FROM; // e.g. "ServiceHub <no-reply@yourdomain.com>"
  const MAIL_TO = "mr.d.bani.d@gmail.com";

  if (!RESEND_API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: "RESEND_API_KEY تنظیم نشده است.",
    });
  }
  if (!MAIL_FROM) {
    throw createError({
      statusCode: 500,
      statusMessage: "CONTACT_MAIL_FROM تنظیم نشده است.",
    });
  }

  const subjectMap: Record<string, string> = {
    booking: "پشتیبانی رزرو",
    abuse: "گزارش تخلف",
    feature: "پیشنهاد ویژگی",
    other: "سایر موارد",
  };
  const topicLabel = subjectMap[topic] ?? topic;

  const mapsLink =
    typeof lat === "number" && typeof lng === "number"
      ? `https://www.google.com/maps?q=${lat},${lng}`
      : "";

  const html = `
    <div style="font-family:ui-sans-serif,system-ui; line-height:1.8">
      <h2 style="margin:0 0 12px">پیام جدید از فرم تماس سرویس‌هاب</h2>
      <p style="margin:0 0 8px"><b>نام:</b> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px"><b>ایمیل:</b> ${escapeHtml(email)}</p>
      <p style="margin:0 0 8px"><b>موبایل:</b> ${escapeHtml(phone || "—")}</p>
      <p style="margin:0 0 8px"><b>موضوع:</b> ${escapeHtml(topicLabel)}</p>
      <p style="margin:0 0 8px"><b>IP:</b> ${escapeHtml(ip)}</p>
      <p style="margin:0 0 8px"><b>User-Agent:</b> ${escapeHtml(ua)}</p>

      <p style="margin:16px 0 8px"><b>متن پیام:</b></p>
      <div style="white-space:pre-wrap; padding:12px; border:1px solid #e5e7eb; border-radius:12px;">
        ${escapeHtml(message)}
      </div>

      ${
        mapsLink
          ? `<p style="margin:16px 0 0"><b>لوکیشن:</b> <a href="${mapsLink}">${mapsLink}</a></p>`
          : ""
      }
    </div>
  `;

  const resendResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [MAIL_TO],
      reply_to: email, // reply directly to user
      subject: `Contact: ${topicLabel} — ${name}`,
      html,
    }),
  });

  if (!resendResp.ok) {
    const txt = await resendResp.text().catch(() => "");
    throw createError({
      statusCode: 502,
      statusMessage: `ارسال ایمیل ناموفق بود. ${txt ? "جزئیات: " + txt : ""}`,
    });
  }

  return { ok: true };
});
