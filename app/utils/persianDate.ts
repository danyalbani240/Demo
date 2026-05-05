export interface JalaliDateParts {
  year: number;
  month: number;
  day: number;
  dayText: string;
}

const PERSIAN_DIGIT_TO_LATIN: Record<string, string> = {
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9",
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
};

export function normalizeDateKey(value: unknown): string {
  if (!value) return "";
  const normalized = String(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return normalized;
  if (normalized.length >= 10 && /^\d{4}-\d{2}-\d{2}/.test(normalized)) {
    return normalized.slice(0, 10);
  }
  return "";
}

export function toLatinDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (char) => PERSIAN_DIGIT_TO_LATIN[char] || char);
}

export function parseLocalizedInt(value: string): number {
  const parsed = Number(toLatinDigits(String(value || "").trim()));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function addDaysToIso(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const base = new Date(Date.UTC(year || 1970, (month || 1) - 1, day || 1));
  base.setUTCDate(base.getUTCDate() + days);
  const nextYear = base.getUTCFullYear();
  const nextMonth = String(base.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(base.getUTCDate()).padStart(2, "0");
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export function isoToTehranDate(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00+03:30`);
}

export function getDateKeyFromFormatter(
  ms: number,
  formatter: Intl.DateTimeFormat,
): string {
  const parts = formatter.formatToParts(new Date(ms));
  const year = parts.find((part) => part.type === "year")?.value || "";
  const month = parts.find((part) => part.type === "month")?.value || "";
  const day = parts.find((part) => part.type === "day")?.value || "";
  if (!year || !month || !day) return "";
  return `${year}-${month}-${day}`;
}

export function getJalaliParts(
  date: Date,
  formatter: Intl.DateTimeFormat,
): JalaliDateParts {
  const parts = formatter.formatToParts(date);
  const yearText = parts.find((part) => part.type === "year")?.value || "";
  const monthText = parts.find((part) => part.type === "month")?.value || "";
  const dayText = parts.find((part) => part.type === "day")?.value || "";

  return {
    year: parseLocalizedInt(yearText),
    month: parseLocalizedInt(monthText),
    day: parseLocalizedInt(dayText),
    dayText,
  };
}
