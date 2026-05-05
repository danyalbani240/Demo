<template>
  <section
    class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
  >
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="font-extrabold">۱) انتخاب سرویس</p>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
          یک یا چند سرویس را انتخاب کنید.
        </p>
      </div>

      <div class="text-xs text-slate-500 dark:text-slate-400">
        {{ services?.length || 0 }} سرویس
      </div>
    </div>
    <div
      v-if="loadingServices"
      class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="h-16 rounded-2xl bg-slate-100 animate-pulse dark:bg-slate-700/40"
      />
    </div>

    <div v-else class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
      <button
        v-for="s in services"
        :key="s._id"
        type="button"
        class="text-right rounded-2xl border px-3 py-3 transition shadow-sm"
        :class="
          isServiceSelected(s._id ?? '')
            ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
            : 'border-slate-200 bg-white/70 hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800'
        "
        @click="toggleService(s._id || '')"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="font-extrabold truncate">{{ s.title }}</p>
            <p
              v-if="s.description"
              class="mt-1 text-xs opacity-80 line-clamp-1"
            >
              {{ s.description }}
            </p>
          </div>
          <div class="shrink-0 text-left">
            <p class="text-[11px] opacity-80">قیمت</p>
            <p class="font-extrabold">
              {{ formatPrice(String(s.price || 0)) }} تومان
            </p>
          </div>
        </div>
        <div class="mt-2 flex justify-end">
          <span
            class="text-[11px] rounded-full px-2 py-1"
            :class="
              isServiceSelected(s._id || '')
                ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-200'
            "
          >
            {{ isServiceSelected(s._id || "") ? "انتخاب شده" : "انتخاب" }}
          </span>
        </div>
      </button>
    </div>
    <p
      v-if="!loadingServices && (!services || services?.length === 0)"
      class="mt-4 text-sm text-slate-600 dark:text-slate-400"
    >
      هنوز سرویسی برای این ارائه‌دهنده ثبت نشده است.
    </p>
  </section>
</template>

<script lang="ts" setup>
import type { ServiceItem } from "~/types";
import { toggleId } from "~/utils/bookingSelection";

const props = defineProps<{
  services: ServiceItem[];
}>();
const selectedServiceIds = defineModel<string[]>({
  default: () => [],
});
/** service-selection detail and info  */
const loadingServices = ref(false);

// const selectedServices = computed(() =>
//   pickSelectedById(props.services as any, selectedServiceIdSet.value),
// );
function isServiceSelected(id: string) {
  return selectedServiceIds.value.includes(String(id || ""));
}
function toggleService(id: string) {
  console.log(toggleId(selectedServiceIds.value, id));
  selectedServiceIds.value = toggleId(selectedServiceIds.value, id);
}
</script>
<!-- we finally cleaned this one-->
