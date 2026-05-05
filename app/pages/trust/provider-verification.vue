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
          >احراز هویت متخصصان</span
        >
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
                احراز هویت متخصصان در سرویس‌هاب
              </h1>
              <p
                class="mt-2 text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-7"
              >
                ما برای اینکه رزرو شما با خیال راحت انجام شود، یک فرآیند
                چندمرحله‌ای برای احراز هویت و اعتبارسنجی متخصصان داریم. نتیجه‌اش
                ساده است:
                <span class="font-semibold text-gray-800 dark:text-white"
                  >شفافیت، پاسخ‌گویی، و کاهش ریسک</span
                >.
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  تایید هویت
                </span>
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  تایید مهارت
                </span>
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm"
                >
                  <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                  پایش کیفیت
                </span>
              </div>
            </div>

            <!-- Quick nav -->
            <div class="w-full lg:w-[360px]">
              <div
                class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 p-4"
              >
                <p class="text-xs text-gray-500 dark:text-slate-400">
                  اعتماد و شفافیت
                </p>
                <div class="mt-3 grid grid-cols-1 gap-2">
                  <NuxtLink
                    to="/trust/provider-verification"
                    class="rounded-xl px-3 py-3 border border-primary-200/70 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-200"
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
                    class="rounded-xl px-3 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                  >
                    <div class="text-sm font-bold">گارانتی بازگشت وجه</div>
                    <div class="text-xs opacity-80 mt-1">قواعد و زمان‌بندی</div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Trust stats -->
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                مرحله ۱
              </div>
              <div class="mt-1 font-extrabold">تایید اطلاعات هویتی</div>
              <div
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                شماره تماس، اطلاعات پایه، و تطابق مالکیت حساب برای جلوگیری از
                حساب‌های جعلی.
              </div>
            </div>
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                مرحله ۲
              </div>
              <div class="mt-1 font-extrabold">تایید مهارت و نمونه‌کار</div>
              <div
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                بررسی سوابق، نمونه‌کارها، خدمات قابل ارائه، و شفافیت قیمت‌گذاری.
              </div>
            </div>
            <div
              class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                مرحله ۳
              </div>
              <div class="mt-1 font-extrabold">پایش مستمر کیفیت</div>
              <div
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                امتیازها، شکایات، لغوهای پرتکرار و رفتار حرفه‌ای به صورت دوره‌ای
                ارزیابی می‌شود.
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
              فرآیند احراز هویت چگونه است؟
            </h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-slate-300">
              قدم‌به‌قدم، قابل پیگیری، و با حداقل اصطکاک برای متخصص.
            </p>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- Timeline -->
          <div
            class="lg:col-span-7 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6"
          >
            <ol class="space-y-4">
              <li class="flex gap-3">
                <div
                  class="mt-1 h-7 w-7 shrink-0 rounded-xl bg-primary-100 dark:bg-primary-500/15 border border-primary-200/80 dark:border-primary-400/30 grid place-items-center font-extrabold text-primary-700 dark:text-primary-200 text-sm"
                >
                  1
                </div>
                <div>
                  <div class="font-bold">ثبت اطلاعات اولیه</div>
                  <p
                    class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
                  >
                    نام، شهر/محدوده خدمات، تخصص‌ها، و اطلاعات تماس. هر چیزی که
                    کاربر باید شفاف ببیند.
                  </p>
                </div>
              </li>

              <li class="flex gap-3">
                <div
                  class="mt-1 h-7 w-7 shrink-0 rounded-xl bg-primary-100 dark:bg-primary-500/15 border border-primary-200/80 dark:border-primary-400/30 grid place-items-center font-extrabold text-primary-700 dark:text-primary-200 text-sm"
                >
                  2
                </div>
                <div>
                  <div class="font-bold">تایید هویت و مالکیت حساب</div>
                  <p
                    class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
                  >
                    اطمینان از اینکه حساب متعلق به شخص واقعی است و امکان
                    پاسخ‌گویی وجود دارد.
                  </p>
                </div>
              </li>

              <li class="flex gap-3">
                <div
                  class="mt-1 h-7 w-7 shrink-0 rounded-xl bg-primary-100 dark:bg-primary-500/15 border border-primary-200/80 dark:border-primary-400/30 grid place-items-center font-extrabold text-primary-700 dark:text-primary-200 text-sm"
                >
                  3
                </div>
                <div>
                  <div class="font-bold">اعتبارسنجی خدمات و قیمت‌گذاری</div>
                  <p
                    class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
                  >
                    سرویس‌ها، حداقل/حداکثر قیمت، و شرایط انجام کار بررسی می‌شود
                    تا وعده‌ی غیرواقعی ثبت نشود.
                  </p>
                </div>
              </li>

              <li class="flex gap-3">
                <div
                  class="mt-1 h-7 w-7 shrink-0 rounded-xl bg-primary-100 dark:bg-primary-500/15 border border-primary-200/80 dark:border-primary-400/30 grid place-items-center font-extrabold text-primary-700 dark:text-primary-200 text-sm"
                >
                  4
                </div>
                <div>
                  <div class="font-bold">فعال‌سازی نشان‌های اعتماد</div>
                  <p
                    class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
                  >
                    بعد از تایید، نشان‌های مربوط (مثل «هویت تایید شده» یا
                    «پروفایل کامل») در پروفایل نمایش داده می‌شود.
                  </p>
                </div>
              </li>

              <li class="flex gap-3">
                <div
                  class="mt-1 h-7 w-7 shrink-0 rounded-xl bg-primary-100 dark:bg-primary-500/15 border border-primary-200/80 dark:border-primary-400/30 grid place-items-center font-extrabold text-primary-700 dark:text-primary-200 text-sm"
                >
                  5
                </div>
                <div>
                  <div class="font-bold">پایش دوره‌ای + رسیدگی به گزارش‌ها</div>
                  <p
                    class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
                  >
                    امتیاز، بازخوردها، گزارش تخلف و نرخ لغو رزرو برای حفظ کیفیت
                    بررسی می‌شود.
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
                <h3 class="font-black">چه چیزهایی را تضمین می‌کنیم؟</h3>
                <span
                  class="text-xs rounded-full px-2 py-1 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-slate-300"
                >
                  شفافیت
                </span>
              </div>
              <ul
                class="mt-3 space-y-2 text-sm text-gray-700 dark:text-slate-200"
              >
                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                  ></span>
                  نمایش واضح شهر، تخصص و محدوده خدمات
                </li>
                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                  ></span>
                  قیمت‌گذاری قابل فهم (حداقل/حداکثر و جزئیات)
                </li>
                <li class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                  ></span>
                  امکان گزارش مشکل و پیگیری سریع
                </li>
              </ul>
            </div>

            <div
              class="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5"
            >
              <h3 class="font-black">به حریم خصوصی احترام می‌گذاریم</h3>
              <p
                class="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                اطلاعات حساس فقط برای تایید استفاده می‌شود و در صفحه عمومی متخصص
                نمایش داده نمی‌شود.
              </p>
              <div
                class="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
              >
                <div class="text-sm font-bold">نکته مهم</div>
                <p
                  class="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-6"
                >
                  هر نشان اعتماد به معنی «تایید هویت/پروفایل» است، نه تضمین ۱۰۰٪
                  نتیجه‌ی کار. برای همین سیستم امتیازدهی و گارانتی هم کنار آن
                  قرار گرفته.
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
          <h2 class="text-lg sm:text-xl font-black">سوالات پرتکرار</h2>

          <div class="mt-4 space-y-3">
            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >آیا همه متخصص‌ها «تایید شده» هستند؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                هر متخصص برای شروع کار حداقل مراحل پایه را طی می‌کند. برخی
                نشان‌های تکمیلی هم دارند (مثل پروفایل کامل/نمونه‌کارهای
                تاییدشده). وضعیت هر مورد داخل پروفایل شفاف نمایش داده می‌شود.
              </p>
            </details>

            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >اگر به مشکلی برخورد کنم چه کار کنم؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                از داخل رزرو یا پروفایل متخصص، گزینه «گزارش مشکل» را انتخاب
                کنید. تیم پشتیبانی بر اساس مدارک/شرح مشکل بررسی می‌کند و در صورت
                نیاز، فرآیند بازگشت وجه فعال می‌شود.
              </p>
            </details>

            <details
              class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
            >
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-3"
              >
                <span class="font-bold text-sm sm:text-base"
                  >چرا بعضی اطلاعات را عمومی نمی‌گذارید؟</span
                >
                <span
                  class="text-xs text-gray-500 dark:text-slate-400 group-open:rotate-180 transition"
                  >⌄</span
                >
              </summary>
              <p
                class="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-6"
              >
                برای امنیت و حریم خصوصی. اطلاعات حساس برای تایید استفاده می‌شود
                اما نمایش عمومی فقط شامل موارد ضروری برای تصمیم‌گیری کاربر است.
              </p>
            </details>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <NuxtLink
              to="/trust/ratings-feedback"
              class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
            >
              ادامه: سیستم امتیازدهی و بازخورد
            </NuxtLink>
            <NuxtLink
              to="/trust/refund-guarantee"
              class="inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
            >
              ادامه: گارانتی بازگشت وجه
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
