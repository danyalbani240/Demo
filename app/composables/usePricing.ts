// composables/usePricing.ts
import { ref, computed } from "vue";
import type { Ref } from "vue";

interface PaymentQuote {
  subtotal_toman: number;
  discount_toman: number;
  payable_toman: number;
  discount_scope: "admin" | "provider" | null;
}

export function usePricing(
  providerId: Ref<string | undefined>,
  selectedServiceIds: Ref<string[]>,
  totalPrice: Ref<number>,
) {
  const authStore = useAuthStore();
  const isLoggedIn = computed(() => authStore.isAuthed);
  const discountCode = ref("");
  const pricingQuote = ref<PaymentQuote | null>(null);

  const loading = ref(false);
  const error = ref("");

  const subtotalPrice = computed(
    () => pricingQuote.value?.subtotal_toman ?? totalPrice.value,
  );

  const discountAmount = computed(
    () => pricingQuote.value?.discount_toman ?? 0,
  );

  const payablePrice = computed(
    () => pricingQuote.value?.payable_toman ?? totalPrice.value,
  );

  const discountScope = computed(
    () => pricingQuote.value?.discount_scope ?? null,
  );

  const normalizedCode = computed(() => discountCode.value.trim());

  async function fetchQuote() {
    if (
      !isLoggedIn.value ||
      !providerId.value ||
      selectedServiceIds.value.length === 0
    ) {
      pricingQuote.value = null;
      return;
    }

    loading.value = true;
    error.value = "";

    try {
      const res: any = await $fetch("/api/payment/quote", {
        method: "POST",
        body: {
          providerId: providerId.value,
          serviceIds: selectedServiceIds.value,
          ...(normalizedCode.value && {
            discountCode: normalizedCode.value,
          }),
        },
      });

      if (!res?.success) {
        error.value = res?.message || "محاسبه مبلغ ناموفق بود";
        pricingQuote.value = null;
        return;
      }

      pricingQuote.value = res.data;
    } catch (e: any) {
      error.value = e?.data?.message || e?.message || "محاسبه مبلغ ناموفق بود";
      pricingQuote.value = null;
    } finally {
      loading.value = false;
    }
  }

  function clearDiscount() {
    discountCode.value = "";
    pricingQuote.value = null;
    error.value = "";
  }

  return {
    discountCode,
    pricingQuote,
    subtotalPrice,
    discountAmount,
    payablePrice,
    discountScope,
    quoteLoading: loading,
    quoteError: error,
    fetchQuote,
    clearDiscount,
  };
}
