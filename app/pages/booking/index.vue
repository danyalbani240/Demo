<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
  >
    <UContainer class="pb-24 pt-3 sm:pt-6">
      <!-- Top header -->
      <div class="mb-4">
        <div class="text-xs text-slate-500 dark:text-slate-400">
          {{ $t("search.home") }} / رزرو /
          {{ provider.full_name || "انتخاب نوبت" }}
        </div>

        <div class="mt-2 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h1
              class="text-xl sm:text-2xl font-extrabold tracking-tight truncate"
            >
              انتخاب نوبت
            </h1>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
              سرویس را انتخاب کنید، سپس روز و ساعت را.
            </p>
          </div>

          <button
            type="button"
            class="shrink-0 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800"
            @click="navigateTo('/')"
          >
            بازگشت
          </button>
        </div>
      </div>

      <!-- Provider summary card -->
      <section
        class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
      >
        <div class="flex items-start gap-3">
          <UAvatar :src="provider?.avatar || undefined" size="lg" />
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <p class="font-extrabold truncate">
                {{ providerName || "ارائه‌دهنده" }}
              </p>
              <span
                v-if="provider?.is_verified"
                class="rounded-full px-2 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
              >
                {{ $t("provider.verified") }}
              </span>
              <span
                v-if="provider?.is_active === false"
                class="rounded-full px-2 py-1 text-[11px] font-semibold bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200"
              >
                نوبت‌گیری غیرفعال
              </span>
            </div>

            <div
              class="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <span>📍 {{ provider?.cityTitle || "—" }}</span>
              <span class="opacity-50">•</span>
              <span>⭐ {{ provider.rating }}</span>
            </div>

            <p
              v-if="provider?.address"
              class="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2"
            >
              {{ provider.address }}
            </p>
          </div>
        </div>
      </section>

      <!-- Steps -->
      <div class="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- Left: step content -->
        <div class="lg:col-span-8 space-y-4">
          <!-- Step 1: Choose service -->
          <ReservationServiceSelection
            :services="provider.services"
            v-model="selectedServiceIds"
          />
          <!-- Step 2: Choose date -->
          <ReservationSelectTime v-model="selectedDate" />
          <!-- Step 3: Choose slot -->
          <LazyReservationTimeSlotSelection
            :selected-date="selectedDate"
            :selected-service-ids="selectedServiceIds"
            :provider="provider"
            v-model="selectedSlot"
          />
          <!-- Notes -->
          <section
            class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
          >
            <p class="font-extrabold">یادداشت (اختیاری)</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
              اگر توضیحی دارید اینجا بنویسید.
            </p>
            <!-- v-model="bookingNote" -->

            <textarea
              rows="3"
              class="mt-3 w-full rounded-2xl border border-slate-200 bg-white/70 px-3 py-3 text-sm outline-none shadow-sm placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/60 dark:placeholder:text-slate-500"
              placeholder="مثلاً: لطفاً خیلی کوتاه نشه…"
            />
          </section>
        </div>

        <aside class="lg:col-span-4">
          <div class="sticky top-24 space-y-3">
            <LazyReservationDetailsSummary
              :provider="provider"
              :selected-date="selectedDate"
              :selectedTime="selectedSlot?.label ?? ''"
              :selectedServiceIds="selectedServiceIds"
              :finalPrice="finalPrice ?? 0"
              :loading="loading"
              @confirm="confirmBooking"
            >
              <ReservationCheckCoupan
                :loading="loading"
                v-model="discountCode"
                :discountAmount="discountAmount ?? 0"
                @apply="fetchQuote"
            /></LazyReservationDetailsSummary>
          </div>
        </aside>
      </div>
    </UContainer>
    <!-- Mobile bottom confirm bar 
    <ReservationStickyNav /> -->
    <!-- Authentication Modal - shown when user is not logged in -->
    <!-- <AuthGateModal :otp="otpProp" v-model:open="authModalOpen" /> -->
  </div>
</template>

<script setup lang="ts">
const toast = useToast();
import { useBooking } from "~/composables/useBooking";
import { useProviderApiRepository } from "~/repositories/providers.repo";
import type { BookingPayload } from "~/types";
const loading = ref(false);
// form state
const selectedServiceIds = ref<string[]>([]);
const selectedDate = ref<string>(normalizeDateKey(tehranTimeZone()));
const selectedSlot = ref();
const route = useRoute();
const discountCode = ref();
const discountAmount = ref<number>();
const providerId = computed(() => route.query.provider as string | undefined);
const finalPrice = ref<number>(0);

const { data: provider } = await useAsyncData(
  "provider-and-services",
  async () => {
    if (!providerId.value) {
      await navigateTo("/");
      return null;
    }

    const api = useProviderApiRepository();

    const apiCall = await api.getProviderAndServices(providerId.value);

    const isSuccessFull =
      apiCall?.success === true || apiCall?.status === "success";
    if (!isSuccessFull) {
      throw new Error(apiCall?.message || "خطا در دریافت ارائه‌دهنده");
    }

    const providerData = apiCall?.data?.provider;

    if (!providerData) {
      toast.add({
        title: "خطا",
        description: "خطا در دریافت ارائه‌دهنده",
        color: "error",
      });
      return;
    }
    return providerData;
  },
);
const providerName = provider.value.full_name || provider.value.business_name;
//

const { handleBooking } = useBooking();
const confirmBooking = async () => {
  const payload = ref<BookingPayload>({
    providerId: providerId.value ?? "",
    serviceIds: selectedServiceIds.value,
    startAt: buildStartAt(selectedDate.value, selectedSlot.value.startMin),
    discountCode: "",
  });
  return await handleBooking(payload.value);
};
watch(selectedServiceIds, () => {
  // Safety check for provider.services
  if (!provider.value?.services) {
    finalPrice.value = 0;
    return;
  }

  const selected = pickSelectedById(
    provider.value.services,
    toIdSet(selectedServiceIds.value),
  );

  // Fix: Use optional chaining and ?? 0
  const total = selected.reduce((accumulator, currentService) => {
    // Ensure price is a number, default to 0 if null/undefined
    const price = Number(currentService?.price ?? 0);
    return accumulator + price;
  }, 0);

  finalPrice.value = total;
});
const { fetchQuote } = usePricing(
  providerId.value ?? "",
  selectedServiceIds.value,
  ref(+finalPrice?.value) || ref(0),
);
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
