// composables/useCalendarSelection.ts
import type { SelectableDay, SelectableMonth } from "./useJalaliCalendar";

export function useCalendarSelection(
  selectableDays: Ref<SelectableDay[]>,
  selectableMonths: Ref<SelectableMonth[]>,
  selectedDate: Ref<string>,
) {
  // derived
  const selectedMonthKey = computed(() => {
    const d = selectableDays.value.find((d) => d.iso === selectedDate.value);
    return d?.monthKey || selectableMonths.value[0]?.key || "";
  });

  const daysForSelectedMonth = computed(() => {
    return (
      selectableMonths.value.find((m) => m.key === selectedMonthKey.value)
        ?.days || []
    );
  });

  const selectedMonthCaption = computed(() => {
    const m = selectableMonths.value.find(
      (m) => m.key === selectedMonthKey.value,
    );
    if (!m) return "";
    return `سال ${new Intl.NumberFormat("fa-IR").format(m.year)} • ${m.dayCount} روز`;
  });

  // init
  watchEffect(() => {
    if (!selectedDate.value && selectableDays.value.length) {
      selectedDate.value = selectableDays?.value[0]?.iso ?? "";
    }
  });

  // actions
  function selectMonth(key: string) {
    const m = selectableMonths.value.find((m) => m.key === key);
    if (!m) return;
    selectedDate.value = m.days[0]?.iso || "";
  }

  function selectDate(iso: string) {
    selectedDate.value = iso;
  }

  function selectToday() {
    const today = normalizeDateKey(tehranTimeZone());
    const found =
      selectableDays.value.find((d) => d.iso === today) ||
      selectableDays.value[0];

    if (found) selectedDate.value = found.iso;
  }

  function stepDay(step: -1 | 1) {
    const days = daysForSelectedMonth.value;
    if (!days.length) return;

    let idx = days.findIndex((d) => d.iso === selectedDate.value);
    if (idx < 0) idx = 0;

    const next = days[Math.min(days.length - 1, Math.max(0, idx + step))];
    if (next) selectedDate.value = next.iso;
  }

  // navigation helpers
  const selectedDayIndexInMonth = computed(() =>
    daysForSelectedMonth.value.findIndex((d) => d.iso === selectedDate.value),
  );

  const canStepToPrevDay = computed(() => selectedDayIndexInMonth.value > 0);

  const canStepToNextDay = computed(() => {
    const i = selectedDayIndexInMonth.value;
    return i >= 0 && i < daysForSelectedMonth.value.length - 1;
  });

  return {
    selectedDate,
    selectedMonthKey,
    daysForSelectedMonth,
    selectedMonthCaption,
    selectMonth,
    selectDate,
    selectToday,
    stepDay,
    canStepToPrevDay,
    canStepToNextDay,
  };
}
