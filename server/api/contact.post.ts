import { getClientIp } from "../utils/getClientIp";
import { sendContactEmail } from "../utils/mail";
import { rateLimitOrThrow } from "../utils/rateLimit";

// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const ip = getClientIp(event) ?? "";

  // client meta (anti-bot)

  const website = String(body?.website ?? "").trim();

  const spentMs = Number(body?.clientMeta?.spentMs ?? 0);

  // ---- anti-spam / validation ----
  if (website) {
    // silently reject bots (same response)
    return { ok: true };
  }

  // require realistic fill time (bots often submit instantly)
  if (spentMs && spentMs < 1200) {
    throw createError({
      statusCode: 429,
      statusMessage: "ارسال خیلی سریع بود. لطفاً دوباره تلاش کنید.",
    });
  }

  // 2. Rate Limiting (Call your existing util)
  rateLimitOrThrow(`contact:${ip}`, { windowMs: 600000, max: 5 });

  // 3. Delegate business logic to the service
  try {
    await sendContactEmail({
      name: body.name,
      email: body.email,
      topic: body.topic,
      message: body.message,
      meta: { ip, ua: getHeader(event, "user-agent") || "" },
    });

    return { success: true, message: "پیام با موفقیت ارسال شد" };
  } catch (e) {
    throw createError({ statusCode: 502, message: "خطا در ارسال ایمیل" });
  }
});
