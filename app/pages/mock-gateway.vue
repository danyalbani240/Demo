<template>
  <div
    dir="rtl"
    class="min-h-[100dvh] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-lg font-extrabold">درگاه پرداخت آزمایشی</h1>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
            این فقط برای تست جریان رزرو است.
          </p>
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400">MOCK</div>
      </div>

      <div
        class="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40"
      >
        <p class="text-xs text-slate-500 dark:text-slate-400">شناسه پرداخت</p>
        <p class="mt-1 font-mono text-sm break-all">{{ pid || "—" }}</p>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <button
          class="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-emerald-500"
          @click="go('success')"
        >
          پرداخت موفق ✅
        </button>
        <button
          class="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-extrabold text-slate-900 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-50 dark:hover:bg-slate-900"
          @click="go('cancel')"
        >
          انصراف ✖️
        </button>
      </div>

      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">
        بعد از انتخاب نتیجه، سیستم پرداخت را تایید می‌کند و رزرو نهایی می‌شود.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const pid = computed(() => String(route.query.pid ?? "").trim());

function go(result: "success" | "cancel") {
  navigateTo(
    `/payment/return?pid=${encodeURIComponent(pid.value)}&result=${encodeURIComponent(result)}`,
  );
}
</script>