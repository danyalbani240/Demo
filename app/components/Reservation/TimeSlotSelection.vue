<template>
  <section
    class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
  >
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="font-extrabold">۳) انتخاب ساعت</p>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
          ساعت‌های آزاد برای روز انتخاب‌شده.
        </p>
      </div>

      <button
        type="button"
        class="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800"
        :class="{
          'cursor-pointer': !loadingSlots,
          'cursor-not-allowed': loadingSlots,
        }"
        :disabled="
          loadingSlots || selectedServiceIds.length === 0 || !selectedDate
        "
        @click="refreshTimeSlots"
      >
        بروزرسانی
      </button>
    </div>

    <div class="mt-4">
      <!-- Guards -->
      <div
        v-if="provider?.is_active === false"
        class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-100"
      >
        این ارائه‌دهنده فعلاً نوبت‌گیری را غیرفعال کرده است.
      </div>

      <div
        v-else-if="selectedServiceIds.length === 0"
        class="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
      >
        ابتدا حداقل یک سرویس انتخاب کنید.
      </div>

      <div
        v-else-if="loadingSlots"
        class="grid grid-cols-3 sm:grid-cols-4 gap-2"
      >
        <div
          v-for="i in 12"
          :key="i"
          class="h-10 rounded-xl bg-slate-100 animate-pulse dark:bg-slate-700/40"
        />
      </div>

      <div
        v-else-if="timeSlots?.length === 0"
        class="rounded-2xl border border-slate-200 bg-white/70 p-6 text-center dark:border-slate-700 dark:bg-slate-800/60"
      >
        <div class="text-2xl">🗓️</div>
        <p class="mt-2 font-extrabold">ساعت آزادی پیدا نشد</p>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
          روز دیگری را انتخاب کنید یا دوباره تلاش کنید.
        </p>
      </div>

      <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-2">
        <button
          v-for="sl in timeSlots"
          :key="sl.startMin"
          type="button"
          class="rounded-xl border px-2 py-2 text-sm font-semibold shadow-sm transition"
          :class="
            selectedSlot?.startMin === sl.startMin
              ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
              : 'border-slate-200 bg-white/70 hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800'
          "
          @click="selectedSlot = sl"
        >
          {{ sl.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Provider } from "~/types";
const { fetchAvailability, loadingSlots } = useAvailability();
const props = defineProps<{
  provider: Provider;
  selectedServiceIds: string[];
  selectedDate: string;
}>();

const timeSlots = ref();
const selectedSlot: any = defineModel({
  default: () => null,
});

const providerId = ref(props.provider.id || props.provider._id);

async function refreshTimeSlots() {
  if (
    providerId.value &&
    props.selectedServiceIds.length > 0 &&
    props.selectedDate
  ) {
    timeSlots.value = await fetchAvailability(
      providerId.value,
      props.selectedServiceIds,
      props.selectedDate,
    );
  }
}

watch(
  () => props.selectedDate,
  async () => {
    selectedSlot.value = null;
    timeSlots.value = await fetchAvailability(
      providerId.value ?? "",
      props.selectedServiceIds,
      props.selectedDate,
    );
  },
);
watch(
  () => props.selectedServiceIds,
  async () => {
    selectedSlot.value = null;
    timeSlots.value = await fetchAvailability(
      providerId.value ?? "",
      props.selectedServiceIds,
      props.selectedDate,
    );
  },
);
</script>
