export function normalizePhone(phone: string) {
  return String(phone || "").trim();
}
export function isValidIranPhone(v: string) {
  return /^09\d{9}$/.test(normalizePhone(v));
}
