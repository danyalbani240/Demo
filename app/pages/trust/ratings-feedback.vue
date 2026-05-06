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
          >{{ $t("search.home") }}</NuxtLink
        >
        <span class="opacity-70">/</span>
        <span class="opacity-90">{{ $t("trust.common.section") }}</span>
        <span class="opacity-70">/</span>
        <span class="text-gray-700 dark:text-slate-200">
          {{ $t("trust.ratings.title") }}
        </span>
      </nav>

      <!-- Hero -->
      <section
        class="mt-5 rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-slate-900/40 overflow-hidden"
      >
        <div class="p-5 sm:p-8">
          <div
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div class="max-w-2xl">
              <h1
                class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight"
              >
                {{ $t("trust.ratings.title") }}
              </h1>

              <p
                class="mt-2 text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-7"
              >
                {{ $t("trust.ratings.heroText1") }}
                <span class="font-semibold">{{
                  $t("trust.ratings.heroHighlight")
                }}</span>
                {{ $t("trust.ratings.heroText2") }}
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  {{ $t("trust.ratings.badges.realBookings") }}
                </span>

                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  {{ $t("trust.ratings.badges.antiFraud") }}
                </span>

                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                  {{ $t("trust.ratings.badges.replyRight") }}
                </span>
              </div>
            </div>

            <!-- Quick nav -->
            <div class="w-full lg:w-[360px]">
              <div
                class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/40 p-4"
              >
                <p class="text-xs text-gray-500 dark:text-slate-400">
                  {{ $t("trust.common.section") }}
                </p>

                <div class="mt-3 grid grid-cols-1 gap-2">
                  <NuxtLink
                    to="/trust/provider-verification"
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">
                      {{ $t("trust.provider.title") }}
                    </div>
                    <div class="text-xs opacity-80 mt-1">
                      {{ $t("trust.provider.subtitle") }}
                    </div>
                  </NuxtLink>

                  <NuxtLink
                    to="/trust/ratings-feedback"
                    class="rounded-xl px-3 py-3 border border-primary-200/70 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-200"
                  >
                    <div class="text-sm font-bold">
                      {{ $t("trust.ratings.title") }}
                    </div>
                    <div class="text-xs opacity-80 mt-1">
                      {{ $t("trust.ratings.subtitle") }}
                    </div>
                  </NuxtLink>

                  <NuxtLink
                    to="/trust/refund-guarantee"
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">
                      {{ $t("trust.refund.title") }}
                    </div>
                    <div class="text-xs opacity-80 mt-1">
                      {{ $t("trust.refund.subtitle") }}
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Principles -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                {{ $t("trust.ratings.principles.p1.label") }}
              </div>
              <div class="mt-1 font-extrabold">
                {{ $t("trust.ratings.principles.p1.title") }}
              </div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.principles.p1.desc") }}
              </p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                {{ $t("trust.ratings.principles.p2.label") }}
              </div>
              <div class="mt-1 font-extrabold">
                {{ $t("trust.ratings.principles.p2.title") }}
              </div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.principles.p2.desc") }}
              </p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                {{ $t("trust.ratings.principles.p3.label") }}
              </div>
              <div class="mt-1 font-extrabold">
                {{ $t("trust.ratings.principles.p3.title") }}
              </div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.principles.p3.desc") }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it works -->
      <section class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div
          class="lg:col-span-7 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
        >
          <h2 class="text-lg sm:text-xl font-black">
            {{ $t("trust.ratings.how.title") }}
          </h2>

          <p class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6">
            {{ $t("trust.ratings.how.description") }}
          </p>

          <div class="mt-5 space-y-3">
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="font-extrabold">
                  {{ $t("trust.ratings.steps.overall.title") }}
                </div>
                <span
                  class="text-xs rounded-full px-2 py-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 text-gray-600 dark:text-slate-300"
                >
                  {{ $t("trust.ratings.steps.overall.badge") }}
                </span>
              </div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.steps.overall.desc") }}
              </p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="font-extrabold">
                  {{ $t("trust.ratings.steps.criteria.title") }}
                </div>
                <span
                  class="text-xs rounded-full px-2 py-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 text-gray-600 dark:text-slate-300"
                >
                  {{ $t("trust.ratings.steps.criteria.badge") }}
                </span>
              </div>

              <ul
                class="mt-2 text-sm text-gray-700 dark:text-slate-200 space-y-2"
              >
                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                  ></span>
                  {{ $t("trust.ratings.criteria.punctuality") }}
                </li>

                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                  ></span>
                  {{ $t("trust.ratings.criteria.quality") }}
                </li>

                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                  ></span>
                  {{ $t("trust.ratings.criteria.communication") }}
                </li>

                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                  ></span>
                  {{ $t("trust.ratings.criteria.priceTransparency") }}
                </li>
              </ul>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="font-extrabold">
                  {{ $t("trust.ratings.steps.feedback.title") }}
                </div>
                <span
                  class="text-xs rounded-full px-2 py-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 text-gray-600 dark:text-slate-300"
                >
                  {{ $t("trust.ratings.steps.feedback.badge") }}
                </span>
              </div>

              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.steps.feedback.desc") }}
              </p>
            </div>
          </div>
        </div>
        <div class="lg:col-span-5 grid gap-4">
          <div
            class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
          >
            <h3 class="font-black">
              {{ $t("trust.ratings.reply.title") }}
            </h3>

            <p class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6">
              {{ $t("trust.ratings.reply.desc") }}
            </p>

            <div
              class="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="text-sm font-bold">
                {{ $t("trust.ratings.reply.goalTitle") }}
              </div>

              <p
                class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.reply.goalDesc") }}
              </p>
            </div>
          </div>

          <div
            class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
          >
            <h3 class="font-black">
              {{ $t("trust.ratings.validFeedback.title") }}
            </h3>

            <ul
              class="mt-3 space-y-2 text-sm text-gray-700 dark:text-slate-200"
            >
              <li class="flex gap-2">
                <span
                  class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                ></span>
                {{ $t("trust.ratings.validFeedback.v1") }}
              </li>

              <li class="flex gap-2">
                <span
                  class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                ></span>
                {{ $t("trust.ratings.validFeedback.v2") }}
              </li>

              <li class="flex gap-2">
                <span
                  class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                ></span>
                {{ $t("trust.ratings.validFeedback.v3") }}
              </li>
            </ul>

            <div class="mt-4 flex flex-col sm:flex-row gap-3">
              <NuxtLink
                to="/trust/refund-guarantee"
                class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
              >
                {{ $t("trust.ratings.links.refund") }}
              </NuxtLink>

              <NuxtLink
                to="/trust/provider-verification"
                class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
              >
                {{ $t("trust.ratings.links.provider") }}
              </NuxtLink>
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
            {{ $t("trust.ratings.faq.title") }}
          </h2>

          <div class="mt-4 space-y-3">
            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base">
                  {{ $t("trust.ratings.faq.q1") }}
                </span>
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>

              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.faq.a1") }}
              </p>
            </details>

            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base">
                  {{ $t("trust.ratings.faq.q2") }}
                </span>
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>

              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.faq.a2") }}
              </p>
            </details>

            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base">
                  {{ $t("trust.ratings.faq.q3") }}
                </span>
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>

              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                {{ $t("trust.ratings.faq.a3") }}
              </p>
            </details>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "سیستم امتیازدهی و بازخورد | سرویس‌هاب",
  description:
    "سیستم امتیازدهی سرویس‌هاب: فقط رزروهای واقعی، معیارهای جزئی، حق پاسخ متخصص و مکانیزم‌های ضدتقلب برای اعتماد و شفافیت.",
  ogTitle: "سیستم امتیازدهی و بازخورد | سرویس‌هاب",
  ogDescription:
    "شفافیت در امتیازها و بازخوردها: واقعی، قابل بررسی، و منصفانه برای کاربران و متخصصان.",
});
</script>
