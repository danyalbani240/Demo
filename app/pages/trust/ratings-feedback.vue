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
          >سیستم امتیازدهی و بازخورد</span
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
                سیستم امتیازدهی و بازخورد
              </h1>
              <p
                class="mt-2 text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-7"
              >
                امتیازها فقط وقتی معتبرند که
                <span class="font-semibold">واقعی</span> باشند. در سرویس‌هاب،
                ثبت امتیاز بعد از انجام سرویس انجام می‌شود تا هم کاربر محافظت
                شود و هم متخصص‌ها منصفانه ارزیابی شوند.
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  فقط رزروهای واقعی
                </span>
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  ضدتقلب
                </span>
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                  حق پاسخ برای متخصص
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
                    class="rounded-xl px-3 py-3 border border-primary-200/70 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-200"
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
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">گارانتی بازگشت وجه</div>
                    <div class="text-xs opacity-80 mt-1">قواعد و زمان‌بندی</div>
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
              <div class="text-xs text-gray-500 dark:text-slate-400">اصل ۱</div>
              <div class="mt-1 font-extrabold">
                امتیاز فقط بعد از انجام سرویس
              </div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                تنها کاربرانی می‌توانند امتیاز دهند که رزروشان «تکمیل شده» باشد.
              </p>
            </div>
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">اصل ۲</div>
              <div class="mt-1 font-extrabold">شفاف + قابل فهم</div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                امتیاز کلی در کنار جزئیات (وقت‌شناسی، برخورد، کیفیت) نمایش داده
                می‌شود.
              </p>
            </div>
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">اصل ۳</div>
              <div class="mt-1 font-extrabold">رسیدگی به گزارش تقلب</div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                بازخوردهای مشکوک بررسی می‌شوند و در صورت اثبات، از نمایش عمومی
                حذف می‌شوند.
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
            امتیازدهی دقیقاً چگونه انجام می‌شود؟
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6">
            ما یک مدل ساده اما دقیق داریم تا کاربر سریع تصمیم بگیرد و متخصص هم
            منصفانه ارزیابی شود.
          </p>

          <div class="mt-5 space-y-3">
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="font-extrabold">۱) امتیاز کلی (از ۵)</div>
                <span
                  class="text-xs rounded-full px-2 py-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 text-gray-600 dark:text-slate-300"
                >
                  سریع
                </span>
              </div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                یک امتیاز کلی برای جمع‌بندی تجربه.
              </p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="font-extrabold">۲) معیارهای جزئی</div>
                <span
                  class="text-xs rounded-full px-2 py-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 text-gray-600 dark:text-slate-300"
                >
                  دقیق
                </span>
              </div>
              <ul
                class="mt-2 text-sm text-gray-700 dark:text-slate-200 space-y-2"
              >
                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                  ></span>
                  وقت‌شناسی و پایبندی به زمان رزرو
                </li>
                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                  ></span>
                  کیفیت سرویس نسبت به توضیحات
                </li>
                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                  ></span>
                  برخورد حرفه‌ای و ارتباط
                </li>
                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                  ></span>
                  شفافیت قیمت و هزینه‌های اضافی
                </li>
              </ul>
            </div>

            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="font-extrabold">۳) متن بازخورد</div>
                <span
                  class="text-xs rounded-full px-2 py-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 text-gray-600 dark:text-slate-300"
                >
                  شفاف
                </span>
              </div>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                بازخوردهای متنی کمک می‌کنند بفهمیم «چرا» امتیاز بالا/پایین ثبت
                شده. توهین، اطلاعات شخصی یا محتوای نامرتبط نمایش داده نمی‌شود.
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 grid gap-4">
          <div
            class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
          >
            <h3 class="font-black">حق پاسخ برای متخصص</h3>
            <p class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6">
              متخصص می‌تواند زیر یک بازخورد، پاسخ کوتاه و محترمانه ثبت کند تا
              ابهام‌ها روشن شوند.
            </p>
            <div
              class="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <div class="text-sm font-bold">هدف ما</div>
              <p
                class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                تبدیل بازخورد به بهبود واقعی، نه جنگ اعصاب.
              </p>
            </div>
          </div>

          <div
            class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
          >
            <h3 class="font-black">چه چیزی «بازخورد معتبر» حساب می‌شود؟</h3>
            <ul
              class="mt-3 space-y-2 text-sm text-gray-700 dark:text-slate-200"
            >
              <li class="flex gap-2">
                <span
                  class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                ></span>
                مربوط به همان رزرو باشد
              </li>
              <li class="flex gap-2">
                <span
                  class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                ></span>
                شامل جزئیات قابل بررسی باشد
              </li>
              <li class="flex gap-2">
                <span
                  class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                ></span>
                محترمانه و بدون اطلاعات حساس باشد
              </li>
            </ul>

            <div class="mt-4 flex flex-col sm:flex-row gap-3">
              <NuxtLink
                to="/trust/refund-guarantee"
                class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
              >
                ادامه: گارانتی بازگشت وجه
              </NuxtLink>
              <NuxtLink
                to="/trust/provider-verification"
                class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
              >
                بازگشت: احراز هویت متخصصان
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
          <h2 class="text-lg sm:text-xl font-black">سوالات پرتکرار</h2>

          <div class="mt-4 space-y-3">
            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >چرا بعضی بازخوردها نمایش داده نمی‌شوند؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                اگر شامل توهین، اطلاعات شخصی، تبلیغ، یا محتوای نامرتبط باشد،
                برای حفظ کیفیت و امنیت حذف/مخفی می‌شود.
              </p>
            </details>

            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >امتیاز منصفانه نیست؛ چه کنم؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                از گزینه «گزارش» استفاده کنید. تیم پشتیبانی بررسی می‌کند و اگر
                بازخورد خلاف قوانین باشد، اصلاح می‌شود.
              </p>
            </details>

            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >آیا می‌شود امتیاز را تغییر داد؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                تا مدت کوتاهی بعد از ثبت (مثلاً اگر اشتباه کرده باشید) امکان
                ویرایش وجود دارد؛ سپس قفل می‌شود تا از سوءاستفاده جلوگیری شود.
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
