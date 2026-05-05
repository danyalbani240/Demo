<template>
  <section class="py-10 bg-white dark:bg-slate-900/50 transition-colors duration-300">
    <UContainer>
      <div class="flex items-end justify-between mb-6 animate-slide-up">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
          {{ $t('home.categories.title') }}
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        <div
          v-for="(category, idx) in categories"
          :key="category.id"
          class="animate-slide-up"
          :style="{ 'animation-delay': `${idx * 100}ms` }"
        >
          <BaseCategory :slug="category.slug" :category="category" />
        </div>
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { Category } from "~/types";

const props = defineProps<{
  categories: Category[];
}>();
</script>
