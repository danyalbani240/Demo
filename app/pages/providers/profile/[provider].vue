<template>
  <div
    class="bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300"
  >
    <!-- HERO -->
    <section class="relative">
      <div
        class="banner-base h-52 sm:h-64 lg:h-72 w-full after:absolute after:inset-0 after:bg-cover after:bg-center after:opacity-70 dark:after:opacity-20"
        :class="{
          'banner-barber': provider?.category === '696a545d4f93795b47baa8b9',
          'banner-nail': provider?.category === '696a545d4f93795b47baa8ba',
          'banner-hair': provider?.category === '696a545d4f93795b47baa8bb',
        }"
      ></div>
      <!-- {{ provider.category }} -->
      <!-- Overlay Profile Card -->
      <div
        class="max-w-screen-2xl mx-auto px-4 -mt-16 sm:-mt-20 lg:-mt-24 relative z-10"
      >
        <UCard
          class="p-1 sm:p-1 shadow-xl ring-1 ring-black/5 bg-white/95 backdrop-blur rounded-2xl dark:bg-slate-900/80 dark:border-slate-700/70 dark:ring-white/10 transition-colors duration-300 animate-scale-in"
        >
          <div class="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
            <div class="flex flex-col sm:flex-row items-start gap-4">
              <UAvatar
                :src="provider?.avatar || ''"
                class="ring-4 ring-white rounded-2xl dark:ring-slate-900 w-20 h-20 mx-auto sm:mx-0"
              />
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h1 class="text-2xl sm:text-3xl font-extrabold">
                    {{ provider?.full_name }}
                  </h1>
                  <UBadge
                    v-if="provider?.is_verified"
                    color="success"
                    variant="soft"
                    class="rounded-full"
                    >{{ $t("provider.verified") }}</UBadge
                  >
                  <UBadge color="info" variant="soft" class="rounded-full">{{
                    provider?.cityTitle
                  }}</UBadge>
                </div>

                <p class="mt-1 text-gray-700 dark:text-slate-200">
                  {{ provider?.business_name }}
                </p>

                <div
                  class="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-700 dark:text-slate-200"
                >
                  <div class="flex items-center gap-1 text-amber-500">
                    <UIcon
                      v-for="i in 5"
                      :key="i"
                      name="i-heroicons-star-solid"
                      class="w-4 h-4"
                      :class="{
                        'opacity-30': i > Math.round(provider?.rating || 0),
                      }"
                    />
                    <span class="text-gray-800 dark:text-slate-100 mt-1">{{
                      provider?.rating
                    }}</span>
                  </div>

                  <span
                    v-if="provider?.done_services"
                    class="text-gray-300 dark:text-slate-600"
                    >•</span
                  >

                  <div
                    v-if="provider?.done_services"
                    class="flex items-center gap-1 text-gray-700 dark:text-slate-200"
                  >
                    <UIcon
                      name="i-heroicons-check-badge"
                      class="w-8 h-8 text-primary-500"
                    />
                    <span>{{ provider?.done_services || "1" }} سرویس موفق</span>
                  </div>

                  <span
                    v-show="provider?.done_services"
                    class="text-gray-300 dark:text-slate-600"
                    >•</span
                  >
                </div>
              </div>
            </div>

            <div class="lg:ms-auto sm:flex gap-2 hidden">
              <UButton color="primary" size="lg" @click="bookNow">رزرو</UButton>
            </div>
          </div>
        </UCard>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <section class="max-w-screen-2xl mx-auto px-4 py-8 lg:py-10">
      <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- LEFT / MAIN -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About + Work ethic -->
          <UCard
            v-if="provider?.bio || workEthic"
            class="p-6 rounded-2xl bg-white dark:bg-slate-900/60 dark:border-slate-700/70 transition-colors duration-300"
          >
            <div class="grid md:grid-cols-2 gap-6">
              <div v-if="provider?.bio">
                <h2 class="text-xl font-bold mb-2">دربارهٔ من</h2>
                <p
                  class="text-gray-700 dark:text-slate-200 leading-8 whitespace-pre-line"
                >
                  {{ provider?.bio }}
                </p>
              </div>
              <div v-if="workEthic">
                <h2 class="text-xl font-bold mb-2">اصول کاری</h2>
                <ul class="space-y-2 text-gray-700 dark:text-slate-200">
                  <li
                    v-for="e in workEthic"
                    :key="e"
                    class="flex items-start gap-2"
                  >
                    <UIcon
                      name="i-heroicons-hand-thumb-up"
                      class="mt-0.5 w-5 h-5 text-primary-600 dark:text-primary-400"
                    />
                    <span>{{ e }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </UCard>

          <!-- Gallery -->
          <UCard
            v-if="Array.isArray(gallery?.samples) && gallery.samples.length > 0"
            class="p-6 rounded-2xl bg-white dark:bg-slate-900/60 dark:border-slate-700/70 transition-colors duration-300"
          >
            <h2 class="text-xl font-bold mb-4">نمونه‌کارها</h2>
            <div
              class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              <img
                v-for="item in gallery?.samples"
                :key="item?.id"
                :src="item?.image_url"
                alt=""
                class="rounded-xl object-cover w-full aspect-4/3 hover:brightness-95 dark:hover:brightness-110 transition"
              />
            </div>
          </UCard>

          <!-- Reviews (hidden) -->
          <UCard
            class="p-6 rounded-2xl bg-white dark:bg-slate-900/60 dark:border-slate-700/70 transition-colors duration-300"
            v-show="false"
          >
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-xl font-bold">نظرات مشتریان</h2>
              <UBadge color="info" variant="soft" class="rounded-full"
                >{{ 0 }} نظر</UBadge
              >
            </div>
          </UCard>
        </div>

        <!-- RIGHT / STICKY BOOKING -->
        <div class="lg:col-span-1">
          <div class="lg:sticky lg:top-24 space-y-6">
            <UCard
              class="p-2 rounded-2xl shadow-lg bg-white dark:bg-slate-900/60 dark:border-slate-700/70"
            >
              <h2 class="text-xl font-bold mb-3">تعرفه‌ها</h2>

              <div class="space-y-3">
                <div
                  v-for="service in provider?.services"
                  :key="service.id"
                  class="flex items-center justify-between gap-3"
                >
                  <div>
                    <p class="font-semibold">
                      {{ service.title }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-slate-300">
                      {{ service.description }}
                    </p>
                  </div>

                  <div class="text-left">
                    <p class="font-bold">
                      {{
                        formatPrice(
                          service.price === undefined ? 0 : +service?.price,
                        )
                      }}
                      تومان
                    </p>
                    <p
                      v-if="service.durationMinutes"
                      class="text-xs text-gray-500 dark:text-slate-400"
                    >
                      {{ service.durationMinutes + "دقیقه" }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex gap-2">
                <UButton
                  color="primary"
                  class="flex-1 flex justify-center items-center"
                  @click="bookNow"
                  >رزرو</UButton
                >
              </div>

              <USeparator class="my-4 dark:opacity-60" />

              <div class="space-y-2 text-sm text-gray-700 dark:text-slate-200">
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-map-pin" class="w-5 h-5" />
                  <span>
                    محدودهٔ سرویس:
                    {{
                      provider?.address?.match(/^(.*?،.*?،.*?)(?=،)/)?.[0] ||
                      provider?.cityTitle
                    }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-shield-check" class="w-5 h-5" />
                  <span class="text-gray-700 dark:text-slate-200"
                    >ضمانت رضایت و بازگشت وجه</span
                  >
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky CTA (mobile) -->
    <div
      class="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 p-3 flex gap-2 sm:hidden dark:bg-slate-950/90 dark:border-slate-800"
    >
      <UButton
        class="flex-1 justify-center text-center"
        color="primary"
        size="lg"
        @click="bookNow"
        >رزرو</UButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProviderApiRepository } from "~/repositories/providers.repo";

interface GallerySample {
  id: string | number;
  image_url: string;
}

const route = useRoute();
const toast = useToast();
const providerId = computed(() => String(route.params.provider || ""));
const api = useProviderApiRepository();
// 1. Data State
const provider = ref();
const gallery = ref<{ samples: GallerySample[] }>({ samples: [] });

// 2. Pure Presentation Logic (Computed)
const workEthic = computed(() => {
  const value = provider.value?.work_ethic;
  if (!value) return [];
  return Array.isArray(value)
    ? value
    : String(value)
        .split(/[,\n]+/)
        .map((i) => i.trim())
        .filter(Boolean);
});

// 3. Normalized Fetching
const { error } = await useAsyncData(
  `profile:${providerId.value}`,
  async () => {
    const res = await api.getFullProfile(providerId.value);
    console.log(res);
    if (!res.success || !res.data) {
      if (import.meta.client)
        toast.add({ title: "خطا", description: res.message, color: "error" });
      throw new Error(res.message);
    }

    provider.value = res.data?.provider;
    gallery.value.samples = res.data?.samples || [];
    return true;
  },
);

// 4. Utility helpers
const formatPrice = (n: number) => Number(n || 0).toLocaleString("fa-IR");

function bookNow() {
  if (provider.value?.id) navigateTo(`/booking?provider=${provider.value.id}`);
}
</script>

<style scoped>
img {
  transition: transform 0.2s ease;
}
img:hover {
  transform: translateY(-2px);
}
</style>
<style>
/* ---------- shared banner layer ---------- */
.banner-base::after {
  content: "";
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.22;
}

/* ---------- category images ---------- */
.banner-barber::after {
  background-image: url("/images/barber.png");
}

.banner-nail::after {
  background-image: url("/images/nail-salon.png");
}

.banner-hair::after {
  background-image: url("/images/hair-salon.png");
}

/* ---------- dark mode tuning ---------- */
.dark .banner-base::after {
  opacity: 0.14;
}
</style>
