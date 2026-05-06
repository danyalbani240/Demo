<template>
  <div
    class="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:text-slate-50"
  >
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

          {{ $t("policy.header.badge") }}

          <span class="text-gray-400 dark:text-slate-500">•</span>

          {{ $t("policy.header.updated") }}
          <span class="tabular-nums">{{ updatedAt }}</span>
        </div>

        <div class="mt-4 flex flex-col gap-3">
          <h1
            class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
          >
            {{ $t("policy.header.title") }}
          </h1>

          <p
            class="max-w-2xl text-sm sm:text-base leading-7 text-gray-600 dark:text-slate-300"
          >
            {{ $t("policy.header.description") }}
          </p>
        </div>

        <div class="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center">
          <UButton
            color="primary"
            size="md"
            class="justify-center"
            @click="navigateTo('/contact')"
          >
            {{ $t("policy.actions.contact") }}
          </UButton>

          <UButton
            variant="outline"
            size="md"
            class="justify-center"
            @click="navigateTo('/help')"
          >
            {{ $t("policy.actions.help") }}
          </UButton>
        </div>
      </header>

      <div class="grid lg:grid-cols-12 gap-4 lg:gap-6">
        <!-- TOC -->
        <aside class="lg:col-span-4">
          <!-- Mobile -->
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
                    >☰</span
                  >

                  <div>
                    <p class="text-sm font-semibold">
                      {{ $t("policy.toc.title") }}
                    </p>
                    <p
                      class="text-xs text-gray-500 dark:text-slate-400 -mt-0.5"
                    >
                      {{ $t("policy.toc.subtitle") }}
                    </p>
                  </div>
                </div>

                <span
                  class="text-gray-500 transition-transform group-open:rotate-180 dark:text-slate-400"
                  >▼</span
                >
              </summary>

              <nav class="px-4 pb-4 text-sm">
                <ul class="space-y-2">
                  <li
                    v-for="item in $tm('policy.toc.items')"
                    :key="$rt(item.href)"
                  >
                    <a
                      :href="$rt(item.href)"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                      @click="closeDetailsOnClick"
                    >
                      {{ $rt(item.label) }}
                    </a>
                  </li>
                </ul>
              </nav>
            </details>
          </UCard>

          <!-- Desktop -->
          <div class="hidden lg:block sticky top-16">
            <UCard
              class="overflow-hidden border border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50"
            >
              <div class="p-4 border-b border-gray-100 dark:border-slate-800">
                <p class="text-sm font-semibold">
                  {{ $t("policy.toc.title") }}
                </p>

                <p class="text-xs mt-1 text-gray-500 dark:text-slate-400">
                  {{ $t("policy.toc.desktopHint") }}
                </p>
              </div>

              <nav class="p-3 text-sm">
                <ul class="space-y-1">
                  <li
                    v-for="item in $tm('policy.toc.items')"
                    :key="$rt(item.href)"
                  >
                    <a
                      :href="$rt(item.href)"
                      class="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100/70 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    >
                      {{ $rt(item.label) }}
                    </a>
                  </li>
                </ul>
              </nav>

              <div class="p-4 border-t border-gray-100 dark:border-slate-800">
                <div
                  class="flex items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/40"
                >
                  <p class="text-xs text-gray-600 dark:text-slate-300">
                    {{ $t("policy.toc.question") }}
                  </p>

                  <UButton
                    color="primary"
                    size="xs"
                    @click="navigateTo('/contact')"
                  >
                    {{ $t("policy.toc.support") }}
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
                    {{ $t("policy.terms.title") }}
                  </h2>

                  <p
                    class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-300"
                  >
                    {{ $t("policy.terms.subtitle") }}
                  </p>
                </div>
              </div>

              <ul
                class="list-disc pr-5 text-sm sm:text-base leading-8 text-gray-700 dark:text-slate-200 space-y-2"
              >
                <li v-for="(item, i) in $tm('policy.terms.items')" :key="i">
                  {{ $rt(item) }}
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
                    {{ $t("policy.privacy.title") }}
                  </h2>

                  <p
                    class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-300"
                  >
                    {{ $t("policy.privacy.subtitle") }}
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <p
                  class="text-sm sm:text-base leading-8 text-gray-700 dark:text-slate-200"
                >
                  {{ $t("policy.privacy.description") }}
                </p>

                <div class="grid sm:grid-cols-2 gap-3">
                  <div
                    class="rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/30"
                  >
                    <p
                      class="text-sm font-bold text-gray-900 dark:text-slate-50"
                    >
                      {{ $t("policy.privacy.rightsTitle") }}
                    </p>

                    <ul
                      class="mt-2 list-disc pr-5 text-sm leading-7 text-gray-700 dark:text-slate-200 space-y-1"
                    >
                      <li
                        v-for="(item, i) in $tm('policy.privacy.rights')"
                        :key="i"
                      >
                        {{ $rt(item) }}
                      </li>
                    </ul>
                  </div>

                  <div
                    class="rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/30"
                  >
                    <p
                      class="text-sm font-bold text-gray-900 dark:text-slate-50"
                    >
                      {{ $t("policy.privacy.permissionsTitle") }}
                    </p>

                    <ul
                      class="mt-2 list-disc pr-5 text-sm leading-7 text-gray-700 dark:text-slate-200 space-y-1"
                    >
                      <li
                        v-for="(item, i) in $tm('policy.privacy.permissions')"
                        :key="i"
                      >
                        {{ $rt(item) }}
                      </li>
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
                    {{ $t("policy.cancellation.title") }}
                  </h2>

                  <p
                    class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-300"
                  >
                    {{ $t("policy.cancellation.subtitle") }}
                  </p>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div
                  v-for="item in $tm('policy.cancellation.highlights')"
                  :key="$rt(item.label)"
                  class="rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/30"
                >
                  <p class="text-xs text-gray-500 dark:text-slate-400">
                    {{ $rt(item.label) }}
                  </p>

                  <p
                    class="mt-2 text-sm font-extrabold text-gray-900 dark:text-slate-50"
                  >
                    {{ $rt(item.value) }}
                  </p>

                  <p
                    class="mt-1 text-xs leading-6 text-gray-600 dark:text-slate-300"
                  >
                    {{ $rt(item.note) }}
                  </p>
                </div>
              </div>

              <ul
                class="mt-5 list-disc pr-5 text-sm sm:text-base leading-8 text-gray-700 dark:text-slate-200 space-y-2"
              >
                <li>
                  {{ $t("policy.cancellation.rules.free.before") }}
                  <b class="font-extrabold">
                    {{
                      policyConfig.cancellation.freeCancellationWindowHours.toLocaleString(
                        $i18n.locale,
                      )
                    }}
                    {{ $t("policy.cancellation.rules.free.hours") }}
                  </b>
                  {{ $t("policy.cancellation.rules.free.after") }}
                </li>

                <li>
                  {{ $t("policy.cancellation.rules.late.before") }}
                  <b class="font-extrabold">{{ cancellationFeePercentText }}</b>
                  {{ $t("policy.cancellation.rules.late.after") }}
                </li>

                <li>
                  {{ $t("policy.cancellation.rules.noShow.before") }}
                  <b class="font-extrabold">{{ noShowRefundText }}</b>
                  {{ $t("policy.cancellation.rules.noShow.after") }}
                </li>

                <li>
                  {{ $t("policy.cancellation.rules.provider.before") }}
                  <b class="font-extrabold">{{
                    providerCancellationRefundText
                  }}</b>
                  {{ $t("policy.cancellation.rules.provider.after") }}
                </li>
              </ul>

              <div
                class="mt-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-900/10"
              >
                <p
                  class="text-sm font-extrabold text-amber-900 dark:text-amber-200"
                >
                  {{ $t("policy.cancellation.important.title") }}
                </p>

                <p
                  class="mt-1 text-sm leading-7 text-amber-900/80 dark:text-amber-100/80"
                >
                  {{ $t("policy.cancellation.important.text") }}
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
                    {{ $t("policy.cookies.title") }}
                  </h2>

                  <p
                    class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-300"
                  >
                    {{ $t("policy.cookies.subtitle") }}
                  </p>
                </div>
              </div>

              <p
                class="text-sm sm:text-base leading-8 text-gray-700 dark:text-slate-200"
              >
                {{ $t("policy.cookies.description") }}
              </p>
            </UCard>
          </section>
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
