<template>
  <div
    dir="rtl"
    class="min-h-[100dvh] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-md rounded-3xl border border-emerald-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur dark:border-emerald-500/30 dark:bg-slate-900/60"
    >
      <h1 class="text-xl font-extrabold text-emerald-600 dark:text-emerald-300">
        پرداخت موفق
      </h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
        پرداخت شما با موفقیت انجام شد. رزرو شما نهایی شد.
      </p>

      <div v-if="refId" class="mt-4 text-sm text-slate-500 dark:text-slate-400">
        کد پیگیری: <span class="font-mono font-bold">{{ refId }}</span>
      </div>

      <div
        v-if="pricing"
        class="mt-4 rounded-2xl border border-slate-200/70 bg-slate-50 p-3 text-right text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
      >
        <div class="flex items-center justify-between">
          <span>مبلغ کل</span>
          <span class="font-semibold">{{ formatToman(pricing.total_price_toman) }} تومان</span>
        </div>
        <div v-if="pricing.discount_amount_toman > 0" class="mt-1 flex items-center justify-between text-emerald-600 dark:text-emerald-300">
          <span>تخفیف</span>
          <span class="font-semibold">-{{ formatToman(pricing.discount_amount_toman) }} تومان</span>
        </div>
        <div class="mt-1 flex items-center justify-between font-extrabold text-slate-900 dark:text-slate-100">
          <span>مبلغ پرداختی</span>
          <span>{{ formatToman(pricing.payable_price_toman) }} تومان</span>
        </div>
        <div v-if="pricing.discount_scope" class="mt-1 text-[11px]">
          نوع تخفیف:
          {{ pricing.discount_scope === "provider" ? "کد ارائه‌دهنده" : "تخفیف عمومی" }}
          <span v-if="pricing.discount_code_upper">({{ pricing.discount_code_upper }})</span>
        </div>
      </div>

      <div class="mt-6 flex gap-2 justify-center">
        <UButton color="primary" to="/dashboard/bookings">
          مشاهده رزروها
        </UButton>
        <UButton variant="outline" to="/">صفحه اصلی</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const pid = String(route.query.pid ?? "").trim();
const refId = ref<string | null>(null);
const pricing = ref<{
  total_price_toman: number;
  discount_amount_toman: number;
  payable_price_toman: number;
  discount_scope: "admin" | "provider" | null;
  discount_code_upper: string | null;
} | null>(null);

if (pid) {
  const { data } = await useFetch("/api/payment/intent", { params: { pid } });
  const intent: any = (data.value as any)?.data || {};
  refId.value = intent?.ref_id ?? null;
  pricing.value = {
    total_price_toman: Number(intent?.total_price_toman || 0),
    discount_amount_toman: Number(intent?.discount_amount_toman || 0),
    payable_price_toman: Number(intent?.payable_price_toman || intent?.total_price_toman || 0),
    discount_scope: intent?.discount_scope || null,
    discount_code_upper: intent?.discount_code_upper || null,
  };
}

function formatToman(value: number) {
  return Number(value || 0).toLocaleString("fa-IR");
}
</script>
