<template>
  <section
    class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
  >
    <p class="font-extrabold">خلاصه رزرو</p>

    <div class="mt-3 space-y-2 text-sm">
      <ReservationSummaryRow label="ارائه‌دهنده" :value="providerName" />
      <ReservationSummaryRow label="سرویس" :value="selectedServiceTitles" />
      <ReservationSummaryRow label="روز" :value="dateText" />
      <ReservationSummaryRow label="ساعت" :value="selectedTime" />

      <!-- Coupon -->

      <slot></slot>
      <!-- <div class="pt-4 border-t">
        <ReservationCheckCoupan
          :modelValue="discountCode"
          @update:modelValue="emit('update:discountCode', $event)"
          :loading="quoteLoading"
          :error="quoteError"
          :discountAmount="discountAmount"
          :discountScope="discountScope"
          @apply="emit('applyDiscount')"
          @clear="emit('clearDiscount')"
        />
      </div> -->

      <!-- Pricing -->
      <!-- <ReservationSummaryRow label="جمع خدمات" :value="subtotalText" /> -->

      <!-- <ReservationSummaryRow
        v-if="discountAmount > 0"
        label="تخفیف"
        :value="discountText"
      /> -->

      <ReservationSummaryRow
        class="pt-3 border-t"
        label="قابل پرداخت"
        :value="`${formatPrice(String(finalPrice))} تومان`"
        :bold="true"
      />

      <ReservationSummaryRow label="مدت کل" :value="totalDuration" />
    </div>

    <p v-if="errorMsg" class="mt-4 text-sm text-red-600">
      {{ errorMsg }}
    </p>
    <button
      class="mt-6 w-full cursor-pointer rounded-xl bg-blue-600 text-white py-3"
      :disabled="!canConfirmBooking || loading"
      @click="emit('confirm')"
    >
      <span v-if="loading">در حال ثبت…</span>
      <span v-else>ثبت رزرو</span>
    </button>
  </section>
  <div
    class="fixed sm:hidden block bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-slate-50/92 backdrop-blur dark:border-slate-800 dark:bg-slate-900/92"
    style="padding-bottom: env(safe-area-inset-bottom)"
  >
    <UContainer class="py-3">
      <div class="flex items-center justify-between gap-3">
        <div class="min-w-0">
          <p class="text-xs text-slate-500 dark:text-slate-400">قابل پرداخت</p>
          <p class="font-extrabold truncate">
            {{
              selectedServiceIds.length > 0
                ? `${formatPrice(String(finalPrice))} تومان`
                : "—"
            }}
          </p>
        </div>

        <button
          type="button"
          class="rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          :disabled="!canConfirmBooking || isProcessingBooking"
        >
          <span v-if="isProcessingBooking">در حال ثبت…</span>
          <span v-else>ثبت رزرو</span>
        </button>
      </div>

      <p v-if="errorMsg" class="mt-2 text-xs text-rose-600 dark:text-rose-300">
        {{ errorMsg }}
      </p>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Provider } from "~/types";

const props = defineProps<{
  provider: Provider;
  selectedServiceIds: string[];
  selectedDate: string;
  selectedTime: string;
  finalPrice: number;
  loading: boolean;
}>();
//provider values =

const providerName = props.provider.full_name || props.provider.business_name;
const loading = ref(false);
const { bookingLoading: isProcessingBooking, bookingError: errorMsg } =
  useBooking();
const canConfirmBooking = computed(() => {
  const providerAvailable = props.provider?.is_active !== false;
  const allFieldsSelected =
    !!props.provider._id &&
    props.selectedServiceIds.length > 0 &&
    !!props.selectedDate &&
    !!props.selectedTime;

  return providerAvailable && allFieldsSelected;
});
const emit = defineEmits([
  // "update:discountCode",
  // "applyDiscount",
  // "clearDiscount",

  "confirm",
]);

// const providerName = computed(
//   () => provider.value?.business_name || provider.value?.full_name,
// );

// const servicesText = computed(
//   () =>
//     selectedServices.value
//       ?.map((s: any) => s?.title)
//       .filter(Boolean)
//       .join("، ") || "-",
// );

const dateText = ref(formatJalaliShort(props.selectedDate));
const selectedServiceIdSet = computed(() => {
  return toIdSet(props.selectedServiceIds);
});
const selectedServices = computed(() =>
  pickSelectedById(props.provider.services ?? [], selectedServiceIdSet.value),
);

const selectedServiceTitles = computed(() =>
  selectedServices.value.map((s) => s.title).join("، "),
);

const totalDuration = computed(
  () =>
    selectedServices.value.reduce((sum, service) => {
      return sum + Number(service.durationMinutes || 0);
    }, 0) + "دقیقه",
);
</script>
