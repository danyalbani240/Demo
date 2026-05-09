// server/utils/mail.ts
export function isEmail(x: string) {
  return /.+@.+\..+/.test(x);
}
export function escapeHtml(input: string) {
  return String(input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
export async function sendContactEmail(data: {
  name: string;
  email: string;
  topic: string;
  message: string;
  meta: { ip: string; ua: string };
}) {
  //   const { name, meta, email, topic, message } = data;
  //   if (!name)
  //     throw createError({ statusCode: 400, statusMessage: "نام لازم است." });
  //   if (!isEmail(email))
  //     throw createError({ statusCode: 400, statusMessage: "ایمیل معتبر نیست." });
  //   if (!topic)
  //     throw createError({ statusCode: 400, statusMessage: "موضوع لازم است." });
  //   if (!message)
  //     throw createError({ statusCode: 400, statusMessage: "متن پیام لازم است." });

  //   // message length limits (server authoritative)
  //   if (message.length < 20)
  //     throw createError({
  //       statusCode: 400,
  //       statusMessage: "پیام خیلی کوتاه است.",
  //     });
  //   if (message.length > 1200)
  //     throw createError({
  //       statusCode: 400,
  //       statusMessage: "پیام خیلی طولانی است.",
  //     });
  const { topic, email, name, message } = data;
  const { ip, ua } = data.meta;
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

  const html = `
    <div style="font-family:ui-sans-serif,system-ui; line-height:1.8">
      <h2 style="margin:0 0 12px">پیام جدید از فرم تماس سرویس‌هاب</h2>
      <p style="margin:0 0 8px"><b>نام:</b> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px"><b>ایمیل:</b> ${escapeHtml(email)}</p>
      <p style="margin:0 0 8px"><b>موضوع:</b> ${escapeHtml(topicLabel)}</p>
      <p style="margin:0 0 8px"><b>IP:</b> ${escapeHtml(ip)}</p>
      <p style="margin:0 0 8px"><b>User-Agent:</b> ${escapeHtml(ua)}</p>

      <p style="margin:16px 0 8px"><b>متن پیام:</b></p>
      <div style="white-space:pre-wrap; padding:12px; border:1px solid #e5e7eb; border-radius:12px;">
        ${escapeHtml(message)}
      </div>

      
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
}
