<template>
  <div class="mt-4 sm:mt-6">
    <!-- Loading skeleton -->
    <div
      v-if="false"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <UCard
        v-for="i in 9"
        :key="i"
        class="p-4 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/70 rounded-2xl"
      >
        <div class="flex items-start gap-3">
          <div
            class="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700/40 animate-pulse"
          />
          <div class="flex-1 space-y-2">
            <div
              class="h-4 w-36 rounded bg-slate-200 dark:bg-slate-700/40 animate-pulse"
            />
            <div
              class="h-3 w-28 rounded bg-slate-200 dark:bg-slate-700/40 animate-pulse"
            />
            <div
              class="h-3 w-44 rounded bg-slate-200 dark:bg-slate-700/40 animate-pulse"
            />
            <div
              class="mt-3 h-9 w-full rounded-xl bg-slate-200 dark:bg-slate-700/40 animate-pulse"
            />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!providers.length"
      class="rounded-3xl border border-slate-200/70 bg-white/70 p-10 text-center shadow-sm backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/40"
    >
      <div class="text-4xl">🔎</div>
      <p class="mt-3 text-lg font-extrabold">متخصصی یافت نشد</p>
      <p class="mt-1 text-sm text-gray-600 dark:text-slate-400">
        فعلاً نتیجه‌ای برای این جستجو نداریم. فیلترها را بازنشانی کنید یا اگر
        ارائه‌دهنده این خدمات هستید، ثبت‌نام متخصص را شروع کنید.
      </p>
    </div>

    <!-- Results grid -->
    <div v-else>
      <div
        data-testid="result"
        :class="[
          'grid gap-4',
          providers.length <= 2
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-items-center'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        ]"
      >
        <BaseProviderCard
          v-for="provider in providers"
          :provider="provider"
          :key="provider.id"
        />
      </div>
      <ProviderServicesModal />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Provider } from "~/types";

defineProps<{
  providers: Provider[];
  loading: boolean;
}>();
</script>
