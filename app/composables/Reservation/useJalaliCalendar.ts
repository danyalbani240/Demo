import { faNumberFormatter } from "./../../utils/number";
export interface SelectableDay {
  iso: string;
  monthKey: string;
  monthLabel: string;
  monthIndex: number;
  year: number;
  dayLabel: string;
  weekdayShort: string;
  faDate: string;
}

export interface SelectableMonth {
  key: string;
  label: string;
  year: number;
  monthIndex: number;
  dayCount: number;
  days: SelectableDay[];
}

export function useJalaliCalendar() {
  const TEHRAN_TIMEZONE = "Asia/Tehran";

  const jalaliPartsFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: TEHRAN_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const jalaliMonthFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: TEHRAN_TIMEZONE,
    month: "long",
  });

  const jalaliWeekdayShortFormatter = new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    { timeZone: TEHRAN_TIMEZONE, weekday: "short" },
  );

  const jalaliMonthDayFormatter = new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    { timeZone: TEHRAN_TIMEZONE, month: "short", day: "numeric" },
  );

  const todayTehran = computed(() => normalizeDateKey(tehranTimeZone()));

  const selectableDays = computed<SelectableDay[]>(() => {
    const startIso = normalizeDateKey(todayTehran.value);
    if (!startIso) return [];

    const firstDate = isoToTehranDate(startIso);
    const firstPersian = getJalaliParts(firstDate, jalaliPartsFormatter);
    if (!firstPersian.year) return [];

    const list: SelectableDay[] = [];

    for (let i = 0; i < 370; i++) {
      const iso = addDaysToIso(startIso, i);
      const date = isoToTehranDate(iso);
      const persian = getJalaliParts(date, jalaliPartsFormatter);

      if (persian.year !== firstPersian.year) break;

      const monthKey = `${persian.year}-${String(persian.month).padStart(2, "0")}`;

      list.push({
        iso,
        monthKey,
        monthLabel: jalaliMonthFormatter.format(date),
        monthIndex: persian.month,
        year: persian.year,
        dayLabel: persian.dayText || faNumberFormatter.format(persian.day),
        weekdayShort: jalaliWeekdayShortFormatter.format(date),
        faDate: jalaliMonthDayFormatter.format(date),
      });
    }

    return list;
  });

  const selectableMonths = computed<SelectableMonth[]>(() => {
    const map = new Map<string, SelectableMonth>();

    for (const day of selectableDays.value) {
      if (!map.has(day.monthKey)) {
        map.set(day.monthKey, {
          key: day.monthKey,
          label: `${day.monthLabel} ${faNumberFormatter.format(day.year)}`,
          year: day.year,
          monthIndex: day.monthIndex,
          dayCount: 0,
          days: [],
        });
      }

      const m = map.get(day.monthKey)!;
      m.days.push(day);
      m.dayCount++;
    }

    return Array.from(map.values());
  });

  return {
    selectableDays,
    selectableMonths,
  };
}
