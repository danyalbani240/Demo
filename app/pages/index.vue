<template>
  <!-- Root: Persian RTL Landing Page for ServiceHub -->
  <div dir="rtl">
    <!-- Hero -->
    <HomeHero
      :categories="categories"
      :cities="cities"
      :providersCount="providersCountFa"
    />

    <!-- Categories -->
    <HomeCategories :categories="categories" />

    <!-- How it works -->
    <HomeSteps />

    <!-- Featured Providers -->
    <HomeBestProviders :providers="providers" />

    <!-- CTA Section -->
    <HomeCTA />
  </div>
</template>

<script setup lang="ts">
import { toPersianDigits } from "~/utils/number";

const bootstrapStore = useBootstrapStore();

const categories = computed(() => bootstrapStore.categories || []);
const cities = computed(() => bootstrapStore.cities || []);
const providers = computed(() => bootstrapStore.topProviders || []);
const providersCount = computed(() => bootstrapStore.providersCount);
const providersCountFa = computed(() =>
  toPersianDigits(providersCount.value || 0),
);

useHead({
  title: "سرویس‌هاب | رزرو آنلاین وقت از متخصصان در سنندج",
  meta: [
    {
      name: "description",
      content:
        "رزرو آنلاین وقت از متخصصان خدمات (زیبایی و …) در سنندج. تقویم دقیق، نمایش زمان‌های خالی واقعی، پروفایل شفاف و ثبت بازخورد.",
    },
  ],
});
</script>
