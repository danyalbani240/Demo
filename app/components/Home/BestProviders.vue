<template>
  <section class="py-10 bg-white dark:bg-slate-900/50 transition-colors duration-300">
    <UContainer>
      <div class="flex items-end justify-between mb-6 animate-slide-up">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
          {{ $t('home.providers.title') }}
        </h2>

        <UButton
          class="cursor-pointer hover:scale-105 transition-transform duration-300 dark:bg-primary-500/20 dark:text-primary-300"
          variant="link"
          @click="navigateTo('/search')"
        >
          {{ $t('home.providers.view_all') }}
        </UButton>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        <BaseProviderCard v-for="provider in providers" :provider="provider" :key="provider.id" />
      </div>
      <ProviderServicesModal />

      <div
        v-if="!providers || providers.length === 0"
        class="mt-6 text-sm text-gray-600 dark:text-slate-400"
      >
        {{ $t('home.providers.error_loading') }}
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { Provider } from "~/types";

const props = defineProps<{
  providers: Provider[];
}>();
</script>
