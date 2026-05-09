/**
 * In-memory rate limiter (works well on single server)
 * If you're on serverless or multiple instances, replace with Redis/Upstash.
 */
type Bucket = { count: number; resetAt: number; lastAt: number };
const buckets = new Map<string, Bucket>();
export function rateLimitOrThrow(
  key: string,
  opts: { windowMs: number; max: number; minGapMs?: number },
) {
  const t = Date.now();
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
