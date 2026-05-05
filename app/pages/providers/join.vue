<template>
  <div
    dir="rtl"
    class="bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50"
  >
    <div
      class="border-b bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900"
    >
      <UContainer class="flex items-center justify-between gap-3 py-2 text-sm">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-shield-check" class="h-5 w-5" />
          <span>احراز هویت | پرداخت امن | {{ siteCopy.supportHours }}</span>
        </div>
        <NuxtLink
          to="/policies"
          class="hidden text-sm text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200 sm:inline-flex"
        >
          قوانین همکاری
        </NuxtLink>
      </UContainer>
    </div>

    <header class="bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      <UContainer class="grid items-center gap-8 py-10 lg:grid-cols-[1.15fr,0.85fr] lg:py-14">
        <div class="space-y-6">
          <UBadge color="primary" variant="soft">برای متخصصان</UBadge>
          <h1 class="text-3xl font-extrabold leading-[1.2] sm:text-4xl">
            ثبت‌نام متخصص و شروع جذب مشتری در سرویس‌هاب
          </h1>
          <p class="text-base leading-8 text-gray-700 dark:text-gray-300 sm:text-lg">
            پروفایل حرفه‌ای بسازید، تقویم نوبت‌دهی را فعال کنید و درخواست‌های
            رزرو را در یک پنل مشخص مدیریت کنید. این صفحه برای شروع همکاری، مدارک
            لازم و شرایط کلی را شفاف توضیح می‌دهد.
          </p>

          <div class="grid gap-3 sm:grid-cols-3">
            <div
              v-for="benefit in heroBenefits"
              :key="benefit.title"
              class="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
            >
              <UIcon :name="benefit.icon" class="h-6 w-6 text-primary-600 dark:text-primary-300" />
              <p class="mt-3 font-bold">{{ benefit.title }}</p>
              <p class="mt-1 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {{ benefit.description }}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton color="primary" size="lg" @click="goSignup">
              ثبت‌نام متخصص
            </UButton>
            <UButton variant="outline" size="lg" to="/help">
              سوالات متداول
            </UButton>
          </div>
        </div>

        <UCard
          class="border border-gray-200 bg-white p-5 shadow-lg transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-lg font-extrabold">چک‌لیست شروع همکاری</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                قبل از ارسال درخواست، این سه مورد را آماده کنید.
              </p>
            </div>
            <UBadge color="info" variant="soft">۳ مرحله</UBadge>
          </div>

          <div class="mt-5 space-y-4">
            <div
              v-for="(step, index) in onboardingSteps"
              :key="step.title"
              class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/40"
            >
              <div class="flex items-start gap-3">
                <span
                  class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700 dark:bg-primary-500/20 dark:text-primary-200"
                >
                  {{ index + 1 }}
                </span>
                <div>
                  <p class="font-bold">{{ step.title }}</p>
                  <p class="mt-1 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/40 dark:bg-emerald-900/10">
            <p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">
              مزیت کلیدی
            </p>
            <p class="mt-1 text-sm leading-7 text-emerald-900/80 dark:text-emerald-100/80">
              پرداخت‌ها و وضعیت رزروها در یک مسیر مشخص نمایش داده می‌شود تا پیگیری
              نوبت‌ها و تسویه‌ها ساده‌تر باشد.
            </p>
          </div>
        </UCard>
      </UContainer>
    </header>

    <section class="py-10">
      <UContainer>
        <h2 class="mb-6 text-2xl font-bold">مزایای همکاری برای متخصصان</h2>
        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <UCard
            v-for="feature in features"
            :key="feature.title"
            class="h-full border border-gray-200 bg-white transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <UIcon :name="feature.icon" class="h-7 w-7 text-primary-600 dark:text-primary-300" />
            <p class="mt-4 font-bold">{{ feature.title }}</p>
            <p class="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <section class="border-y bg-white py-10 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <UContainer>
        <div class="grid gap-6 lg:grid-cols-2">
          <UCard class="border border-gray-200 bg-gray-50/80 p-6 dark:border-slate-700 dark:bg-slate-950/40">
            <h2 class="text-2xl font-bold">مدارک و نیازمندی‌ها</h2>
            <p class="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              برای بررسی سریع‌تر درخواست، این موارد را از ابتدا آماده کنید.
            </p>

            <ul class="mt-5 space-y-3 text-sm leading-7 text-gray-700 dark:text-slate-200">
              <li
                v-for="requirement in requirements"
                :key="requirement"
                class="flex items-start gap-3"
              >
                <UIcon name="i-heroicons-check-badge-20-solid" class="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                <span>{{ requirement }}</span>
              </li>
            </ul>
          </UCard>

          <UCard class="border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
            <h2 class="text-2xl font-bold">اعتماد و شفافیت</h2>
            <p class="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              قبل از شروع همکاری، این صفحات را ببینید تا از شرایط لغو، استرداد و
              پاسخ‌گویی پشتیبانی مطلع شوید.
            </p>

            <div class="mt-5 space-y-3">
              <NuxtLink
                v-for="link in trustLinks"
                :key="link.to"
                :to="link.to"
                class="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-4 transition hover:border-primary-200 hover:bg-primary-50/70 dark:border-slate-700 dark:bg-slate-950/40 dark:hover:border-primary-500/30 dark:hover:bg-primary-500/10"
              >
                <div>
                  <p class="font-bold">{{ link.title }}</p>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {{ link.description }}
                  </p>
                </div>
                <UIcon name="i-heroicons-arrow-left-20-solid" class="h-5 w-5 text-gray-400 dark:text-slate-500" />
              </NuxtLink>
            </div>

            <div class="mt-5 rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/40">
              <p class="text-sm font-bold">پنجره لغو بدون جریمه</p>
              <p class="mt-1 text-sm leading-7 text-gray-600 dark:text-gray-400">
                لغو تا {{ policyConfig.cancellation.freeCancellationWindowHours.toLocaleString("fa-IR") }}
                ساعت قبل از سرویس، مطابق سیاست فعلی بدون جریمه انجام می‌شود.
              </p>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <section class="py-10">
      <UContainer>
        <h2 class="mb-6 text-2xl font-bold">سوالات رایج متخصصان</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <details
            v-for="faq in faqs"
            :key="faq.question"
            class="rounded-2xl border border-gray-200 bg-white p-4 open:bg-gray-50 dark:border-slate-700 dark:bg-slate-800/50 dark:open:bg-slate-800"
          >
            <summary class="cursor-pointer font-semibold">
              {{ faq.question }}
            </summary>
            <p class="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </UContainer>
    </section>

    <section class="pb-12 pt-2">
      <UContainer>
        <UCard class="bg-gradient-to-l from-primary-600 to-primary-500 text-white">
          <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-2xl font-extrabold">برای شروع آماده‌اید؟</h2>
              <p class="mt-2 text-sm leading-7 text-white/90">
                ثبت‌نام را آغاز کنید یا قبل از آن، قوانین، استرداد و راهنما را
                مرور کنید تا با اطمینان بیشتری وارد همکاری شوید.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <UButton color="neutral" size="lg" @click="goSignup">
                ثبت‌نام متخصص
              </UButton>
              <UButton color="neutral" variant="outline" size="lg" to="/trust/refund-guarantee">
                سیاست استرداد
              </UButton>
              <UButton color="neutral" variant="outline" size="lg" to="/help">
                راهنما
              </UButton>
            </div>
          </div>
        </UCard>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { policyConfig } from "~/constants/policies";
import { siteCopy } from "~/constants/site";

function goSignup() {
  navigateTo("/auth/?role=provider");
}

const heroBenefits = [
  {
    icon: "i-heroicons-user-group-20-solid",
    title: "مشتریان جدید",
    description: "در کنار پروفایل، به لیست جستجوی مشتریان هم اضافه می‌شوید.",
  },
  {
    icon: "i-heroicons-calendar-days-20-solid",
    title: "تقویم نوبت‌دهی",
    description: "زمان‌های آزاد خود را مشخص می‌کنید و از رفت‌و‌برگشت تلفنی کم می‌شود.",
  },
  {
    icon: "i-heroicons-credit-card-20-solid",
    title: "پرداخت شفاف",
    description: "وضعیت رزرو و پرداخت‌ها در مسیر مشخصی نمایش داده می‌شود.",
  },
] as const;

const features = [
  {
    icon: "i-heroicons-magnifying-glass-20-solid",
    title: "نمایش در جستجوی مشتریان",
    description: "پروفایل شما کنار سایر متخصصان نمایش داده می‌شود تا شانس جذب مشتری بیشتر شود.",
  },
  {
    icon: "i-heroicons-clock-20-solid",
    title: "مدیریت بهتر زمان",
    description: "تقویم و وضعیت رزروها کمک می‌کند بازه‌های خالی و شلوغی را دقیق‌تر مدیریت کنید.",
  },
  {
    icon: "i-heroicons-banknotes-20-solid",
    title: "پیگیری تسویه‌ها",
    description: "سوابق مالی و درخواست‌های مرتبط در پنل ثبت می‌شود تا پیگیری‌ها پراکنده نباشد.",
  },
  {
    icon: "i-heroicons-shield-check-20-solid",
    title: "اعتمادسازی با اطلاعات شفاف",
    description: "اطلاعات کامل‌تر پروفایل، نمونه‌کار و مدارک تاییدشده به تصمیم مشتری کمک می‌کند.",
  },
] as const;

const onboardingSteps = [
  {
    title: "ساخت حساب متخصص",
    description: "با شماره موبایل و رمز عبور ثبت‌نام می‌کنید و حساب ارائه‌دهنده را فعال می‌سازید.",
  },
  {
    title: "تکمیل پروفایل و خدمات",
    description: "خدمات، قیمت پایه، شهر، توضیحات و زمان‌های کاری را ثبت می‌کنید.",
  },
  {
    title: "بررسی مدارک و شروع دریافت رزرو",
    description: "پس از تکمیل اطلاعات، پروفایل برای نمایش بهتر و دریافت رزرو آماده می‌شود.",
  },
] as const;

const requirements = [
  "نام و نام خانوادگی یا نام کسب‌وکار",
  "شماره موبایل در دسترس برای ورود و پیگیری",
  "انتخاب حوزه فعالیت و شهر ارائه خدمت",
  "تصویر کارت شناسایی یا مدارک لازم برای احراز هویت",
  "نمونه‌کار، توضیح خدمات و قیمت پایه برای اعتماد بیشتر مشتری",
] as const;

const trustLinks = [
  {
    to: "/policies",
    title: "قوانین و شرایط همکاری",
    description: "مرور چارچوب کلی استفاده، لغو، حریم خصوصی و سیاست‌های پاسخ‌گویی.",
  },
  {
    to: "/trust/refund-guarantee",
    title: "سیاست بازگشت وجه",
    description: "نحوه رسیدگی به اختلاف‌ها و شرایط استرداد را قبل از شروع ببینید.",
  },
  {
    to: "/help",
    title: "راهنما و سوالات متداول",
    description: "پاسخ به سوالات رایج درباره ثبت‌نام، رزرو، پرداخت و پشتیبانی.",
  },
] as const;

const faqs = [
  {
    question: "ثبت‌نام متخصص از کجا شروع می‌شود؟",
    answer:
      "از همین صفحه روی «ثبت‌نام متخصص» بزنید. سپس حساب ارائه‌دهنده ایجاد می‌شود و می‌توانید پروفایل و خدمات را تکمیل کنید.",
  },
  {
    question: "آیا برای شروع همکاری مدارک لازم است؟",
    answer:
      "بله، برای اعتمادسازی و احراز هویت بهتر است اطلاعات هویتی، شهر فعالیت و مشخصات خدمات را کامل وارد کنید.",
  },
  {
    question: "اگر مشتری رزرو را لغو کند چه می‌شود؟",
    answer:
      "پنجره لغو بدون جریمه و جزئیات استرداد در صفحه قوانین و سیاست بازگشت وجه توضیح داده شده است.",
  },
  {
    question: "چه زمانی از پشتیبانی پاسخ می‌گیرم؟",
    answer: `${siteCopy.supportHours} و ${siteCopy.supportResponseSla}`,
  },
] as const;

useHead({
  title: "ثبت‌نام متخصص | سرویس‌هاب",
  meta: [
    {
      name: "description",
      content:
        "صفحه ثبت‌نام متخصص در سرویس‌هاب با مزایا، مراحل شروع همکاری، مدارک لازم و لینک مستقیم به قوانین و راهنما.",
    },
  ],
});
</script>
