<template>
  <div
    dir="rtl"
    class="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:text-slate-50"
  >
    <!-- Soft premium glow -->
    <div
      class="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-400/10"
      />
      <div
        class="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-400/10"
      />
    </div>

    <UContainer class="relative py-6 sm:py-10">
      <!-- Header -->
      <header class="mb-5 sm:mb-8">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200"
        >
          <span class="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
          سند رسمی سرویس‌هاب
          <span class="text-gray-400 dark:text-slate-500">•</span>
          آخرین به‌روزرسانی: <span class="tabular-nums">{{ updatedAt }}</span>
        </div>

        <div class="mt-4 flex flex-col gap-3">
          <h1
            class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
          >
            قوانین، حریم خصوصی و سیاست‌ها
          </h1>
          <p
            class="max-w-2xl text-sm sm:text-base leading-7 text-gray-600 dark:text-slate-300"
          >
            هدف ما شفافیت و امنیت تجربهٔ شماست. این صفحه توضیح می‌دهد چه مواردی
            مجاز است، چه داده‌هایی جمع‌آوری می‌شود و سیاست‌های لغو/استرداد چگونه
            عمل می‌کنند.
          </p>
        </div>

        <!-- Mobile quick actions -->
        <div class="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center">
          <UButton
            color="primary"
            size="md"
            class="justify-center"
            @click="navigateTo('/contact')"
          >
            تماس با پشتیبانی
          </UButton>
          <UButton
            variant="outline"
            size="md"
            class="justify-center"
            @click="navigateTo('/help')"
          >
            رفتن به راهنما
          </UButton>
        </div>
      </header>

      <div class="grid lg:grid-cols-12 gap-4 lg:gap-6">
        <!-- TOC -->
        <aside class="lg:col-span-4">
          <!-- Mobile: collapsible -->
          <UCard
            class="lg:hidden overflow-hidden border border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50"
          >
            <details class="group">
              <summary
                class="flex cursor-pointer list-none items-center justify-between p-4"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    ☰
                  </span>
                  <div>
                    <p class="text-sm font-semibold">فهرست بخش‌ها</p>
                    <p
                      class="text-xs text-gray-500 dark:text-slate-400 -mt-0.5"
                    >
                      برای رفتن سریع به هر بخش
                    </p>
                  </div>
                </div>
                <span
                  class="text-gray-500 transition-transform group-open:rotate-180 dark:text-slate-400"
                >
                  ▼
                </span>
              </summary>

              <nav class="px-4 pb-4 text-sm">
                <ul class="space-y-2">
                  <li>
                    <a
                      href="#terms"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                      @click="closeDetailsOnClick"
                    >
                      شرایط استفاده
                    </a>
                  </li>
                  <li>
                    <a
                      href="#privacy"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                      @click="closeDetailsOnClick"
                    >
                      حریم خصوصی
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cancellation"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                      @click="closeDetailsOnClick"
                    >
                      لغو و استرداد
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cookies"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                      @click="closeDetailsOnClick"
                    >
                      کوکی‌ها
                    </a>
                  </li>
                </ul>
              </nav>
            </details>
          </UCard>

          <!-- Desktop: sticky -->
          <div class="hidden lg:block sticky top-16">
            <UCard
              class="overflow-hidden border border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50"
            >
              <div class="p-4 border-b border-gray-100 dark:border-slate-800">
                <p class="text-sm font-semibold">فهرست بخش‌ها</p>
                <p class="text-xs mt-1 text-gray-500 dark:text-slate-400">
                  روی هر مورد بزنید تا اسکرول شود
                </p>
              </div>

              <nav class="p-3 text-sm">
                <ul class="space-y-1">
                  <li>
                    <a
                      href="#terms"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    >
                      شرایط استفاده
                    </a>
                  </li>
                  <li>
                    <a
                      href="#privacy"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    >
                      حریم خصوصی
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cancellation"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    >
                      لغو و استرداد
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cookies"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    >
                      کوکی‌ها
                    </a>
                  </li>
                </ul>
              </nav>

              <div class="p-4 border-t border-gray-100 dark:border-slate-800">
                <div
                  class="flex items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/40"
                >
                  <p class="text-xs text-gray-600 dark:text-slate-300">
                    سوال دارید؟
                  </p>
                  <UButton
                    color="primary"
                    size="xs"
                    @click="navigateTo('/contact')"
                  >
                    پشتیبانی
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>
        </aside>

        <!-- Content -->
        <main class="lg:col-span-8 space-y-4 sm:space-y-6">
          <!-- TERMS -->
          <section id="terms" class="scroll-mt-24">
            <UCard
              class="border border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 p-5 sm:p-6"
            >
              <div class="flex items-start gap-3 mb-4">
                <div
                  class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100"
                >
                  📌
                </div>
                <div>
                  <h2 class="text-lg sm:text-xl font-extrabold tracking-tight">
                    شرایط استفاده
                  </h2>
                  <p
                    class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-300"
                  >
                    چارچوب کلی استفاده از پلتفرم و مسئولیت‌ها
                  </p>
                </div>
              </div>

              <ul
                class="list-disc pr-5 text-sm sm:text-base leading-8 text-gray-700 dark:text-slate-200 space-y-2"
              >
                <li>
                  کاربران موظف‌اند اطلاعات واقعی و دقیق ثبت کنند؛ مسئولیت صحت
                  داده‌های واردشده بر عهدهٔ خود کاربر است.
                </li>
                <li>
                  رزروها طبق زمان‌های اعلامی معتبر است و رعایت زمان به عهدهٔ
                  طرفین است.
                </li>
                <li>هرگونه فعالیت مغایر با قوانین کشور ممنوع است.</li>
                <li>
                  سرویس‌هاب می‌تواند در صورت تخلف، حساب کاربری را محدود یا تعلیق
                  کند.
                </li>
              </ul>
            </UCard>
          </section>

          <!-- PRIVACY -->
          <section id="privacy" class="scroll-mt-24">
            <UCard
              class="border border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 p-5 sm:p-6"
            >
              <div class="flex items-start gap-3 mb-4">
                <div
                  class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100"
                >
                  🛡️
                </div>
                <div>
                  <h2 class="text-lg sm:text-xl font-extrabold tracking-tight">
                    حریم خصوصی
                  </h2>
                  <p
                    class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-300"
                  >
                    شفافیت دربارهٔ داده‌ها و نحوهٔ استفاده
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <p
                  class="text-sm sm:text-base leading-8 text-gray-700 dark:text-slate-200"
                >
                  داده‌های شما (نام، شماره تماس، سوابق رزرو) فقط برای ارائه و
                  بهبود خدمات استفاده می‌شود. بدون رضایت شما به اشخاص ثالث
                  فروخته نمی‌شود. اطلاعات حساس با استانداردهای امنیتی نگهداری
                  می‌گردد.
                </p>

                <div class="grid sm:grid-cols-2 gap-3">
                  <div
                    class="rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/30"
                  >
                    <p
                      class="text-sm font-bold text-gray-900 dark:text-slate-50"
                    >
                      حقوق شما
                    </p>
                    <ul
                      class="mt-2 list-disc pr-5 text-sm leading-7 text-gray-700 dark:text-slate-200 space-y-1"
                    >
                      <li>حق درخواست حذف حساب و داده‌ها</li>
                      <li>حق اصلاح اطلاعات پروفایل</li>
                      <li>حق دریافت پاسخ از پشتیبانی</li>
                    </ul>
                  </div>

                  <div
                    class="rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/30"
                  >
                    <p
                      class="text-sm font-bold text-gray-900 dark:text-slate-50"
                    >
                      مجوزها
                    </p>
                    <ul
                      class="mt-2 list-disc pr-5 text-sm leading-7 text-gray-700 dark:text-slate-200 space-y-1"
                    >
                      <li>دسترسی به میکروفون/لوکیشن فقط با اجازهٔ صریح شما</li>
                      <li>می‌توانید هر زمان دسترسی‌ها را غیرفعال کنید</li>
                    </ul>
                  </div>
                </div>
              </div>
            </UCard>
          </section>

          <!-- CANCELLATION -->
          <section id="cancellation" class="scroll-mt-24">
            <UCard
              class="border border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 p-5 sm:p-6"
            >
              <div class="flex items-start gap-3 mb-4">
                <div
                  class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100"
                >
                  💸
                </div>
                <div>
                  <h2 class="text-lg sm:text-xl font-extrabold tracking-tight">
                    لغو و استرداد
                  </h2>
                  <p
                    class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-300"
                  >
                    سیاست‌های منصفانه برای زمان و تعهدات
                  </p>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div
                  v-for="item in cancellationHighlights"
                  :key="item.label"
                  class="rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/30"
                >
                  <p class="text-xs text-gray-500 dark:text-slate-400">
                    {{ item.label }}
                  </p>
                  <p class="mt-2 text-sm font-extrabold text-gray-900 dark:text-slate-50">
                    {{ item.value }}
                  </p>
                  <p class="mt-1 text-xs leading-6 text-gray-600 dark:text-slate-300">
                    {{ item.note }}
                  </p>
                </div>
              </div>

              <ul
                class="mt-5 list-disc pr-5 text-sm sm:text-base leading-8 text-gray-700 dark:text-slate-200 space-y-2"
              >
                <li>
                  لغو تا
                  <b class="font-extrabold">
                    {{ policyConfig.cancellation.freeCancellationWindowHours.toLocaleString("fa-IR") }}
                    ساعت
                  </b>
                  قبل از شروع سرویس: بازگشت کامل بیعانه.
                </li>
                <li>
                  کمتر از این بازه:
                  <b class="font-extrabold">{{ cancellationFeePercentText }}</b>
                  به‌عنوان جریمهٔ لغو ثبت می‌شود.
                </li>
                <li>
                  عدم حضور مشتری بدون اطلاع:
                  <b class="font-extrabold">{{ noShowRefundText }}</b>
                  بازگشت وجه.
                </li>
                <li>
                  لغو از سوی متخصص:
                  <b class="font-extrabold">{{ providerCancellationRefundText }}</b>
                  بازگشت وجه + پیشنهاد زمان جایگزین.
                </li>
              </ul>

              <div
                class="mt-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-900/10"
              >
                <p
                  class="text-sm font-extrabold text-amber-900 dark:text-amber-200"
                >
                  نکتهٔ مهم
                </p>
                <p
                  class="mt-1 text-sm leading-7 text-amber-900/80 dark:text-amber-100/80"
                >
                  اگر اختلافی پیش آمد، ابتدا از داخل پشتیبانی/تماس موضوع را مطرح
                  کنید تا بررسی و حل‌وفصل سریع‌تر انجام شود.
                </p>
              </div>
            </UCard>
          </section>

          <!-- COOKIES -->
          <section id="cookies" class="scroll-mt-24">
            <UCard
              class="border border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 p-5 sm:p-6"
            >
              <div class="flex items-start gap-3 mb-4">
                <div
                  class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100"
                >
                  🍪
                </div>
                <div>
                  <h2 class="text-lg sm:text-xl font-extrabold tracking-tight">
                    کوکی‌ها
                  </h2>
                  <p
                    class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-300"
                  >
                    برای امنیت، ورود و تجربهٔ بهتر
                  </p>
                </div>
              </div>

              <p
                class="text-sm sm:text-base leading-8 text-gray-700 dark:text-slate-200"
              >
                برای ورود امن و بهبود تجربه از کوکی‌ها استفاده می‌کنیم.
                می‌توانید از تنظیمات مرورگر مدیریت کنید؛ خاموش‌کردن برخی کوکی‌ها
                ممکن است بخشی از امکانات را محدود کند.
              </p>
            </UCard>
          </section>

          <!-- CTA -->
          <UCard
            class="border border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 p-5 sm:p-6"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <p class="text-sm font-semibold">پرسشی دربارهٔ قوانین دارید؟</p>
                <p class="text-xs mt-1 text-gray-600 dark:text-slate-300">
                  {{ siteCopy.supportHours }} و {{ siteCopy.supportResponseSla }}
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-2">
                <UButton
                  color="primary"
                  class="justify-center"
                  @click="navigateTo('/contact')"
                >
                  تماس با پشتیبانی
                </UButton>
                <UButton
                  variant="outline"
                  class="justify-center"
                  @click="navigateTo('/help')"
                >
                  رفتن به راهنما
                </UButton>
              </div>
            </div>
          </UCard>
        </main>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { policyConfig } from "~/constants/policies";
import { siteCopy } from "~/constants/site";

const updatedAt = policyConfig.updatedAt;

function percentText(value: number | null): string {
  if (value == null) return "در حال تکمیل (به‌زودی)";
  return `${value.toLocaleString("fa-IR")}٪`;
}

function tomanText(value: number | null): string {
  if (value == null) return "در حال تکمیل (به‌زودی)";
  return `${value.toLocaleString("fa-IR")} تومان`;
}

const cancellationFeePercentText = percentText(
  policyConfig.cancellation.cancellationFeePercent,
);
const noShowRefundText = percentText(
  policyConfig.cancellation.noShowRefundPercent,
);
const providerCancellationRefundText = percentText(
  policyConfig.cancellation.providerCancellationRefundPercent,
);

const cancellationHighlights = [
  {
    label: "لغو بدون جریمه",
    value: `${policyConfig.cancellation.freeCancellationWindowHours.toLocaleString("fa-IR")} ساعت`,
    note: "لغو تا قبل از این بازه، بازگشت کامل بیعانه دارد.",
  },
  {
    label: "جریمه لغو نزدیک سرویس",
    value: cancellationFeePercentText,
    note: "درصد نهایی این بخش هنوز در حال تکمیل است.",
  },
  {
    label: "سقف بازگشت وجه",
    value: tomanText(policyConfig.cancellation.refundMaxToman),
    note: "عدد نهایی پس از تایید کسب‌وکار در همین صفحه ثبت می‌شود.",
  },
  {
    label: "لغو از سمت متخصص",
    value: providerCancellationRefundText,
    note: "در صورت لغو از سمت متخصص، مبلغ پرداختی به‌صورت کامل برمی‌گردد.",
  },
] as const;

useHead({
  title: "قوانین و حریم خصوصی | سرویس‌هاب",
  meta: [
    {
      name: "description",
      content:
        "قوانین استفاده، حریم خصوصی، سیاست‌های لغو و استرداد و کوکی‌ها در سرویس‌هاب.",
    },
  ],
});

function closeDetailsOnClick(e: Event) {
  const el = e.currentTarget as HTMLElement | null;
  const details = el?.closest("details") as HTMLDetailsElement | null;
  if (details) details.open = false;
}
</script>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}
</style>
