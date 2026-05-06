<template>
  <div
    class="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-50"
  >
    <UContainer class="py-8 sm:py-10">
      <!-- Breadcrumb -->
      <nav
        class="text-xs sm:text-sm text-gray-500 dark:text-slate-400 flex flex-wrap items-center gap-2"
      >
        <NuxtLink
          to="/"
          class="hover:text-primary-600 dark:hover:text-primary-400"
        >
          {{ $t("search.home") }}
        </NuxtLink>

        <span class="opacity-70">/</span>
        <span class="opacity-90">
          {{ $t("trustProviderVerification.breadcrumb.trust") }}
        </span>

        <span class="opacity-70">/</span>
        <span class="text-gray-700 dark:text-slate-200">
          {{ $t("trustProviderVerification.breadcrumb.page") }}
        </span>
      </nav>

      <!-- Hero -->
      <section
        class="mt-5 relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-slate-900/40"
      >
        <div class="absolute inset-0 pointer-events-none">
          <div
            class="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-500/10"
          ></div>
          <div
            class="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-200/40 blur-3xl dark:bg-fuchsia-500/10"
          ></div>
        </div>

        <div class="relative p-5 sm:p-8">
          <div
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div class="max-w-2xl">
              <h1
                class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight"
              >
                {{ $t("trustProviderVerification.hero.title") }}
              </h1>

              <p
                class="mt-2 text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-7"
              >
                {{ $t("trustProviderVerification.hero.desc1") }}
                <span class="font-semibold text-gray-800 dark:text-white">
                  {{ $t("trustProviderVerification.hero.highlight") }} </span
                >.
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  {{ $t("trustProviderVerification.badges.identity") }}
                </span>

                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  {{ $t("trustProviderVerification.badges.skill") }}
                </span>

                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                  {{ $t("trustProviderVerification.badges.quality") }}
                </span>
              </div>
            </div>

            <!-- Quick nav -->
            <div class="w-full lg:w-[360px]">
              <div
                class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 p-4"
              >
                <p class="text-xs text-gray-500 dark:text-slate-400">
                  {{ $t("trustProviderVerification.quick.title") }}
                </p>

                <div class="mt-3 grid grid-cols-1 gap-2">
                  <NuxtLink
                    to="/trust/provider-verification"
                    class="rounded-xl px-3 py-3 border border-primary-200/70 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-200"
                  >
                    <div class="text-sm font-bold">
                      {{ $t("trustProviderVerification.quick.verifyTitle") }}
                    </div>
                    <div class="text-xs opacity-80 mt-1">
                      {{ $t("trustProviderVerification.quick.verifyDesc") }}
                    </div>
                  </NuxtLink>

                  <NuxtLink
                    to="/trust/ratings-feedback"
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">
                      {{ $t("trustProviderVerification.quick.ratingTitle") }}
                    </div>
                    <div class="text-xs opacity-80 mt-1">
                      {{ $t("trustProviderVerification.quick.ratingDesc") }}
                    </div>
                  </NuxtLink>

                  <NuxtLink
                    to="/trust/refund-guarantee"
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">
                      {{ $t("trustProviderVerification.quick.refundTitle") }}
                    </div>
                    <div class="text-xs opacity-80 mt-1">
                      {{ $t("trustProviderVerification.quick.refundDesc") }}
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Trust stats -->
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              v-for="(item, i) in $tm('trustProviderVerification.steps')"
              :key="i"
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                {{ $rt(item.stage) }}
              </div>
              <div class="mt-1 font-extrabold">
                {{ $rt(item.title) }}
              </div>
              <div
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $rt(item.desc) }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Process -->
      <section class="mt-8">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-lg sm:text-xl font-black">
              {{ $t("trustProviderVerification.process.title") }}
            </h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-slate-300">
              {{ $t("trustProviderVerification.process.subtitle") }}
            </p>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- Timeline -->
          <div
            class="lg:col-span-7 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
          >
            <ol class="space-y-4">
              <li
                v-for="(step, i) in $tm('trustProviderVerification.timeline')"
                :key="i"
                class="flex gap-3"
              >
                <div
                  class="mt-1 h-7 w-7 shrink-0 rounded-xl bg-primary-100 dark:bg-primary-500/15 border border-primary-200/80 dark:border-primary-400/30 grid place-items-center font-extrabold text-primary-700 dark:text-primary-200 text-sm"
                >
                  {{ i }}
                </div>

                <div>
                  <div class="font-bold">
                    {{ $rt(step.title) }}
                  </div>

                  <p
                    class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
                  >
                    {{ $rt(step.desc) }}
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <!-- Side cards -->
          <div class="lg:col-span-5 grid gap-4">
            <div
              class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5"
            >
              <div class="flex items-center justify-between">
                <h3 class="font-black">
                  {{ $t("trustProviderVerification.guarantee.title") }}
                </h3>

                <span
                  class="text-xs rounded-full px-2 py-1 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-slate-300"
                >
                  {{ $t("trustProviderVerification.guarantee.badge") }}
                </span>
              </div>

              <ul
                class="mt-3 space-y-2 text-sm text-gray-700 dark:text-slate-200"
              >
                <li
                  v-for="(item, i) in $tm(
                    'trustProviderVerification.guarantee.items',
                  )"
                  :key="i"
                  class="flex gap-2"
                >
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                  ></span>
                  {{ $rt(item) }}
                </li>
              </ul>
            </div>

            <div
              class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5"
            >
              <h3 class="font-black">
                {{ $t("trustProviderVerification.privacy.title") }}
              </h3>

              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trustProviderVerification.privacy.desc") }}
              </p>

              <div
                class="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
              >
                <div class="text-sm font-bold">
                  {{ $t("trustProviderVerification.privacy.noteTitle") }}
                </div>

                <p
                  class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
                >
                  {{ $t("trustProviderVerification.privacy.noteDesc") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- FAQ -->
      <section class="mt-8">
        <div
          class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
        >
          <h2 class="text-lg sm:text-xl font-black">
            {{ $t("trustProviderVerification.faq.title") }}
          </h2>

          <div class="mt-4 space-y-3">
            <details
              v-for="(item, i) in $tm('trustProviderVerification.faq.items')"
              :key="i"
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base">
                  {{ $rt(item.q) }}
                </span>

                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                >
                  ⌄
                </span>
              </summary>

              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $rt(item.a) }}
              </p>
            </details>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <NuxtLink
              to="/trust/ratings-feedback"
              class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
            >
              {{ $t("trustProviderVerification.links.rating") }}
            </NuxtLink>

            <NuxtLink
              to="/trust/refund-guarantee"
              class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
            >
              {{ $t("trustProviderVerification.links.refund") }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "احراز هویت متخصصان | سرویس‌هاب",
  description:
    "فرآیند احراز هویت و اعتبارسنجی متخصصان در سرویس‌هاب: تایید هویت، تایید مهارت، و پایش کیفیت برای اعتماد و شفافیت.",
  ogTitle: "احراز هویت متخصصان | سرویس‌هاب",
  ogDescription:
    "شفافیت و اعتماد: مراحل احراز هویت متخصصان، معیارها، نشان‌های اعتماد، و سوالات پرتکرار.",
});
</script>
