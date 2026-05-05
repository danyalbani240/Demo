/**
 * Safely parse a value to a number (handles strings with non-numeric chars)
 */
function parseNumberSafe(value: unknown): number | null {
  if (value == null) return null;
  const str = String(value).trim();
  const num = Number(str.replace(/[^\d.]/g, ""));
  return Number.isFinite(num) ? num : null;
}

/**
 * Format price to Persian locale with fallback
 */
function formatPrice(value: unknown): string {
  let num: number | null = null;

  if (typeof value === "number" && Number.isFinite(value)) {
    num = value;
  } else if (typeof value === "string") {
    num = parseNumberSafe(value);
  }

  if (num == null) return "—";

  try {
    return num.toLocaleString("fa-IR");
  } catch {
    return String(num);
  }
}
function parsePrice(value: unknown): number {
  // direct number
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  // null, undefined, empty string, false, etc.
  if (value == null || value === "") return 0;

  // convert to string
  const s = String(value).trim();
  if (!s) return 0;

  // normalize Persian/Arabic digits to English
  const normalized = s.replace(/[۰-۹]/g, (d) =>
    String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)),
  );

  // remove currency words, commas, spaces, anything non-digit
  const cleaned = normalized.replace(/[^\d]/g, "");
  if (!cleaned) return 0;

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

// to persian digits => converting english digits to persian digits

export const toPersianDigits = (n: number | string): string => {
  return Number(n).toLocaleString("fa-IR");
};

export const faNumberFormatter = new Intl.NumberFormat("fa-IR");

export { parseNumberSafe, formatPrice, parsePrice };
