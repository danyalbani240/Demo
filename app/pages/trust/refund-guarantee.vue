<template>
  <div
    dir="rtl"
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
        <span class="opacity-90">اعتماد و شفافیت</span>
        <span class="opacity-70">/</span>
        <span class="text-gray-700 dark:text-slate-200"
          >گارانتی بازگشت وجه</span
        >
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
                گارانتی بازگشت وجه
              </h1>
              <p
                class="mt-2 text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-7"
              >
                اگر سرویس مطابق توافق انجام نشد یا مشکل جدی رخ داد، سازوکار
                مشخصی برای رسیدگی و در صورت نیاز بازگشت وجه داریم. این سیاست
                برای محافظت از کاربر و ایجاد استاندارد حرفه‌ای برای متخصص طراحی
                شده.
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  شفاف و مرحله‌ای
                </span>
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                  نیازمند بررسی
                </span>
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  پرداخت امن
                </span>
              </div>
            </div>

            <!-- Quick nav -->
            <div class="w-full lg:w-[360px]">
              <div
                class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/40 p-4"
              >
                <p class="text-xs text-gray-500 dark:text-slate-400">
                  اعتماد و شفافیت
                </p>
                <div class="mt-3 grid grid-cols-1 gap-2">
                  <NuxtLink
                    to="/trust/provider-verification"
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">احراز هویت متخصصان</div>
                    <div class="text-xs opacity-80 mt-1">مراحل و معیارها</div>
                  </NuxtLink>

                  <NuxtLink
                    to="/trust/ratings-feedback"
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">
                      سیستم امتیازدهی و بازخورد
                    </div>
                    <div class="text-xs opacity-80 mt-1">
                      شفاف، واقعی، ضدتقلب
                    </div>
                  </NuxtLink>

                  <NuxtLink
                    to="/trust/refund-guarantee"
                    class="rounded-xl px-3 py-3 border border-primary-200/70 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-200"
                  >
                    <div class="text-sm font-bold">گارانتی بازگشت وجه</div>
                    <div class="text-xs opacity-80 mt-1">قواعد و زمان‌بندی</div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Big callout -->
          <div
            class="mt-6 rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-emerald-50/70 via-white to-white dark:from-emerald-500/10 dark:via-slate-950/40 dark:to-slate-950/40 p-5 sm:p-6"
          >
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <div class="text-sm text-gray-600 dark:text-slate-300">
                  اصل مهم
                </div>
                <div class="mt-1 text-base sm:text-lg font-black">
                  اول تلاش برای حل مسئله؛ در صورت عدم حل، بازگشت وجه
                </div>
                <p
                  class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
                >
                  ما اول تلاش می‌کنیم مشکل با گفت‌وگوی منصفانه و شفاف حل شود.
                  اگر نشد، مسیر بازگشت وجه فعال می‌شود.
                </p>
              </div>
              <NuxtLink
                to="/support"
                class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
              >
                ارتباط با پشتیبانی
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Policy -->
      <section class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div
          class="lg:col-span-7 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
        >
          <h2 class="text-lg sm:text-xl font-black">
            چه زمانی بازگشت وجه شامل می‌شود؟
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6">
            برای جلوگیری از سوءاستفاده، بازگشت وجه فقط در شرایط مشخص و قابل
            بررسی انجام می‌شود.
          </p>

          <div class="mt-5 space-y-3">
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="font-extrabold">۱) انجام نشدن سرویس</div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                اگر متخصص در زمان رزرو حاضر نشود یا سرویس عملاً انجام نشود.
              </p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="font-extrabold">۲) مغایرت جدی با توضیحات</div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                اگر سرویس ارائه‌شده به شکل واضح با توضیحات ثبت‌شده تفاوت داشته
                باشد (مثلاً کیفیت/محدوده سرویس).
              </p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="font-extrabold">۳) هزینه‌های خارج از توافق</div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                در صورتی که هزینه‌ی اضافی بدون توافق و شفافیت مطالبه شود و قابل
                اثبات باشد.
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 grid gap-4">
          <div
            class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
          >
            <h3 class="font-black">چه زمانی شامل نمی‌شود؟</h3>
            <ul
              class="mt-3 space-y-2 text-sm text-gray-700 dark:text-slate-200"
            >
              <li class="flex gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                تغییر نظر سلیقه‌ای بدون اشکال قابل بررسی
              </li>
              <li class="flex gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                درخواست خارج از سرویس ثبت‌شده
              </li>
              <li class="flex gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                عدم همکاری برای ارائه مدارک/توضیحات لازم
              </li>
            </ul>

            <div
              class="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="text-sm font-bold">شفافیت</div>
              <p
                class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                هدف این بخش «نه سخت‌گیری»، بلکه «منصفانه بودن» برای هر دو طرف
                است.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Steps -->
      <section class="mt-8">
        <div
          class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
        >
          <h2 class="text-lg sm:text-xl font-black">
            مراحل درخواست بازگشت وجه
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6">
            این مسیر را طوری طراحی کرده‌ایم که سریع، قابل پیگیری و با حداقل
            رفت‌وبرگشت باشد.
          </p>

          <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                مرحله ۱
              </div>
              <div class="mt-1 font-extrabold">ثبت گزارش از داخل رزرو</div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                مشکل را دقیق بنویسید و در صورت امکان عکس/مدرک اضافه کنید.
              </p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                مرحله ۲
              </div>
              <div class="mt-1 font-extrabold">بررسی و تلاش برای حل</div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                تیم پشتیبانی با طرفین هماهنگ می‌کند تا اگر امکان حل هست، سریع
                انجام شود.
              </p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                مرحله ۳
              </div>
              <div class="mt-1 font-extrabold">بازگشت وجه (در صورت تایید)</div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                در صورت تایید، بازگشت وجه طبق روش پرداخت/کیف پول انجام می‌شود.
              </p>
            </div>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <NuxtLink
              to="/trust/ratings-feedback"
              class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
            >
              بازگشت: امتیازدهی و بازخورد
            </NuxtLink>
            <NuxtLink
              to="/trust/provider-verification"
              class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
            >
              بازگشت: احراز هویت متخصصان
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="mt-8">
        <div
          class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
        >
          <h2 class="text-lg sm:text-xl font-black">سوالات پرتکرار</h2>

          <div class="mt-4 space-y-3">
            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >چقدر طول می‌کشد؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                بسته به نوع مشکل و نیاز به بررسی، زمان متفاوت است. هدف ما رسیدگی
                سریع و مرحله‌ای است و وضعیت رسیدگی قابل پیگیری خواهد بود.
              </p>
            </details>

            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >بازگشت وجه به چه روشی انجام می‌شود؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                بسته به روش پرداخت شما، بازگشت وجه می‌تواند به کیف پول سرویس‌هاب
                یا به روش پرداخت قبلی انجام شود.
              </p>
            </details>

            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >اگر متخصص همکاری نکند چه می‌شود؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                بررسی بر اساس شواهد و اطلاعات رزرو انجام می‌شود. در صورت تایید
                مشکل، تصمیم نهایی مستقل از همکاری متخصص خواهد بود.
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
  title: "گارانتی بازگشت وجه | سرویس‌هاب",
  description:
    "سیاست گارانتی بازگشت وجه در سرویس‌هاب: شرایط شامل/غیرشامل، مراحل رسیدگی، و سوالات پرتکرار برای اعتماد و شفافیت.",
  ogTitle: "گارانتی بازگشت وجه | سرویس‌هاب",
  ogDescription:
    "گارانتی بازگشت وجه در سرویس‌هاب: روند مرحله‌ای، شفاف و قابل پیگیری برای حفاظت از کاربر و استاندارد حرفه‌ای.",
});
</script>
