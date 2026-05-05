<template>
  <header
    class="bg-gradient-to-b from-white dark:from-slate-900 dark:to-slate-950 to-gray-50 transition-colors duration-300"
  >
    <UContainer class="py-12 lg:py-16 grid lg:grid-cols-2 gap-10 items-center">
      <div class="space-y-6 animate-slide-up">
        <h1
          style="line-height: 70px"
          class="text-3xl sm:text-4xl text-justify lg:text-5xl font-extrabold leading-[1.2] text-slate-900 dark:text-white"
        >
          {{ $t('home.hero.title') }}
        </h1>

        <p class="text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-8">
          {{ $t('home.hero.subtitle') }}
        </p>

        <HomeSearch :categories="categories" :cities="cities" />

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <UBadge
            color="success"
            variant="soft"
            class="px-3 py-1 dark:bg-emerald-500/20 dark:text-emerald-300 animate-fade-in [animation-delay:400ms]"
          >
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 ml-1" />
            {{ $t('home.hero.badge_calendar') }}
          </UBadge>

          <UBadge
            color="info"
            variant="soft"
            class="px-3 py-1 dark:bg-blue-500/20 dark:text-blue-300 animate-fade-in [animation-delay:500ms]"
          >
            <UIcon name="i-heroicons-bolt" class="w-4 h-4 ml-1" />
            {{ $t('home.hero.badge_fast') }}
          </UBadge>

          <UBadge
            color="warning"
            variant="soft"
            class="px-3 py-1 dark:bg-amber-500/20 dark:text-amber-300 animate-fade-in [animation-delay:600ms]"
          >
            <UIcon name="i-heroicons-shield-check" class="w-4 h-4 ml-1" />
            {{ $t('home.hero.badge_trust') }}
          </UBadge>
        </div>
      </div>

      <div class="relative animate-scale-in">
        <UCard
          class="p-5 shadow-xl dark:shadow-2xl dark:bg-slate-800/50 dark:border-slate-700 bg-white/80"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-lg font-extrabold text-slate-900 dark:text-white">
                {{ $t('home.hero.card.title') }}
              </p>
              <p class="text-sm text-gray-600 dark:text-slate-400 mt-1 leading-7">
                {{ $t('home.hero.card.desc') }}
              </p>
            </div>

            <div class="text-center">
              <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {{ props.providersCount }}
              </p>
              <p class="text-xs text-gray-500 dark:text-slate-400">
                {{ $t('home.hero.card.active_providers') }}
              </p>
            </div>
          </div>

          <USeparator class="my-4 dark:border-slate-700" />

          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="space-y-1">
              <p class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ $t('home.hero.card.features.real_time') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-slate-400">
                {{ $t('home.hero.card.features.real_time_sub') }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ $t('home.hero.card.features.profile') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-slate-400">
                {{ $t('home.hero.card.features.profile_sub') }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ $t('home.hero.card.features.quick_booking') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-slate-400">
                {{ $t('home.hero.card.features.quick_booking_sub') }}
              </p>
            </div>
          </div>

          <USeparator class="my-4 dark:border-slate-700" />

          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 rounded-2xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-map-pin"
                class="w-5 h-5 text-primary-700 dark:text-primary-300"
              />
            </div>
            <div class="text-sm">
              <p class="font-medium dark:text-white">{{ $t('home.hero.card.city_start') }}</p>
              <p class="text-gray-600 dark:text-slate-400">
                {{ $t('home.hero.card.city_sub') }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </header>
</template>





<script setup lang="ts">
import type { Category, City } from "~/types";

const props = defineProps<{
  categories: Category[];
  providersCount: string;
  cities: City[];
}>();
</script>
