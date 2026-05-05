/**
 * Parse ISO date string (YYYY-MM-DD) to Date object
 * Avoids timezone edge cases by using midday
 */
function parseIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year || 1970, (month || 1) - 1, day || 1, 12, 0, 0, 0);
}

/**
 * Format ISO date to long Persian Jalali format
 */
function formatJalaliLong(isoDate: string): string {
  const date = parseIsoDate(isoDate);
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Format ISO date to short Persian Jalali format (YY/MM/DD)
 */
function formatJalaliShort(isoDate: string): string {
  const date = parseIsoDate(isoDate);
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
function tehranTimeZone() {
  const now = new Date();
  const tehranTime = new Date(now.getTime() + 210 * 60_000); // UTC+3:30
  return tehranTime.toISOString().slice(0, 10);
}
function generateNextDays() {
  const days: Array<{ iso: string; weekday: string; faDate: string }> = [];
  const base = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(base.getTime() + i * 86400_000);
    const tehranTime = new Date(date.getTime() + 210 * 60_000);
    const isoString = tehranTime.toISOString().slice(0, 10);

    days.push({
      iso: isoString,
      weekday: new Intl.DateTimeFormat("fa-IR", {
        weekday: "long",
      }).format(tehranTime),
      faDate: new Intl.DateTimeFormat("fa-IR", {
        month: "long",
        day: "numeric",
      }).format(tehranTime),
    });
  }
  return days;
}
function minutesToHHMM(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
function buildStartAt(dateKey: string, startMin: number) {
  const hhmm = minutesToHHMM(startMin);
  return `${dateKey}T${hhmm}:00+03:30`;
}
export {
  parseIsoDate,
  formatJalaliLong,
  formatJalaliShort,
  tehranTimeZone,
  generateNextDays,
  buildStartAt,
};
