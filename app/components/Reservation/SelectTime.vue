<template>
  <section
    class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
  >
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="font-extrabold">۲) انتخاب روز</p>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
          ماه و روز را انتخاب کنید تا ساعت‌های آزاد نمایش داده شود.
        </p>
      </div>

      <button
        type="button"
        class="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800"
        @click="selectToday"
      >
        امروز
      </button>
    </div>

    <div class="mt-4 space-y-3">
      <div>
        <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">
          ماه
        </p>
        <div
          ref="monthStripRef"
          class="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        >
          <button
            v-for="m in selectableMonths"
            :key="m.key"
            type="button"
            class="snap-start shrink-0 rounded-2xl border px-3 py-2 text-right shadow-sm transition min-w-[132px]"
            :data-month-key="m.key"
            :class="
              selectedMonthKey === m.key
                ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                : 'border-slate-200 bg-white/70 hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800'
            "
            @click="selectMonth(m.key)"
          >
            <p class="font-extrabold text-sm">{{ m.label }}</p>
            <p class="mt-1 text-[11px] opacity-80">{{ m.dayCount }} روز</p>
          </button>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between gap-2">
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">
            روز
          </p>
          <div class="flex items-center gap-2">
            <p
              v-if="selectedMonthCaption"
              class="text-[11px] text-slate-500 dark:text-slate-400"
            >
              {{ selectedMonthCaption }}
            </p>
            <div class="hidden md:flex items-center gap-1">
              <button
                type="button"
                class="h-8 w-8 rounded-xl border border-slate-200 bg-white/80 text-slate-700 grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                :disabled="!canStepToPrevDay"
                title="روز قبل"
                @click="stepDay(-1)"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="h-8 w-8 rounded-xl border border-slate-200 bg-white/80 text-slate-700 grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                :disabled="!canStepToNextDay"
                title="روز بعد"
                @click="stepDay(1)"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <p class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
          برای پیمایش روزها، افقی اسکرول کنید.
        </p>

        <div v-if="daysForSelectedMonth.length > 0" class="relative mt-2">
          <div
            class="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/90 to-transparent dark:from-slate-800/80"
          />
          <div
            class="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white/90 to-transparent dark:from-slate-800/80"
          />

          <div
            ref="dayStripRef"
            class="no-scrollbar flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
            @wheel="onDayStripWheel"
          >
            <button
              v-for="d in daysForSelectedMonth"
              :key="d.iso"
              type="button"
              class="snap-start shrink-0 min-w-[132px] rounded-2xl border px-3 py-2 text-right shadow-sm transition min-h-[76px]"
              :data-day-iso="d.iso"
              :class="
                selectedDate === d.iso
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                  : 'border-slate-200 bg-white/70 hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800'
              "
              @click="selectedDate = d.iso"
            >
              <p class="text-[11px] opacity-80">{{ d.weekdayShort }}</p>
              <p class="mt-1 font-extrabold text-base">
                {{ d.dayLabel }}
              </p>
              <p class="mt-1 text-[11px] opacity-80">{{ d.faDate }}</p>
            </button>
          </div>
        </div>

        <div
          v-else
          class="mt-2 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
        >
          روز قابل انتخابی وجود ندارد.
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useCalendarSelection } from "~/composables/Reservation/useCalendarSelection";
import { useHorizontalScroll } from "~/composables/Reservation/useHorizontalScroll";
import { useJalaliCalendar } from "~/composables/Reservation/useJalaliCalendar";
import { normalizeDateKey } from "~/utils/persianDate";
import { tehranTimeZone } from "~/utils/date";

const { selectableDays, selectableMonths } = useJalaliCalendar();

const selectedDate = defineModel<string>({
  default: () => normalizeDateKey(tehranTimeZone()),
});
const {
  selectedMonthKey,
  daysForSelectedMonth,
  selectedMonthCaption,
  selectMonth,
  selectToday,
  stepDay,
  canStepToPrevDay,
  canStepToNextDay,
} = useCalendarSelection(selectableDays, selectableMonths, selectedDate);

const { monthStripRef, dayStripRef, centerStripItem, onDayStripWheel } =
  useHorizontalScroll();

watch(selectedMonthKey, (key) => {
  nextTick(() => centerStripItem(monthStripRef.value, "data-month-key", key));
});

watch(selectedDate, (iso) => {
  nextTick(() => centerStripItem(dayStripRef.value, "data-day-iso", iso));
});
</script>
