<template>
  <UCard
    class="p-5 shadow-xl dark:shadow-2xl dark:bg-slate-800/50 dark:border-slate-700 backdrop-blur-xs bg-white/80 animate-slide-up [animation-delay:200ms]"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <USelect
        v-model="query.categorySlug"
        :items="categoryOptions"
        :placeholder="$t('home.hero.service_name')"
        class="dark:bg-slate-900 dark:border-slate-700"
      />

      <USelect
        v-model="query.city"
        :items="cityOptions"
        :placeholder="$t('home.hero.city')"
        class="dark:bg-slate-900 dark:border-slate-700"
      />
      <UButton
        size="lg"
        class="w-full cursor-pointer bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 hover:shadow-lg dark:hover:shadow-primary-500/50 transition-all duration-300 active:scale-95"
        @click="onSearch"
      >
        <UIcon
          name="i-heroicons-magnifying-glass-20-solid"
          class="w-5 h-5 ml-1"
        />
        {{ $t("home.hero.search") }}
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { allCategoriesValue, allCitiesValue } from "~/constants/search";
import type { Category, City } from "~/types";

import { buildCategoryOptions, buildCityOptions } from "~/utils/search/options";
const props = defineProps<{
  categories: Category[];
  cities: City[];
}>();

const categoryOptions = computed(() =>
  buildCategoryOptions(props.categories, allCategoriesValue),
);
const cityOptions = computed(() =>
  buildCityOptions(props.cities, allCitiesValue),
);

const query = reactive({
  categorySlug: "",
  city: "",
  sort: "top",
});

function onSearch() {
  const path =
    "/search" + "?category=" + query.categorySlug + "&city=" + query.city;

  navigateTo(path);
}
</script>
