<template>
  <div
    class="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-50"
  >
    <UContainer class="py-6">
      <ProvidersAdvancedSearch
        :filters="filters"
        :sort="sort"
        :cities="cities"
        :categories="categories"
        :q="q"
        :total="meta?.total || 0"
        @update:filters="updateFilters"
        @update:sort="(v: any) => (sort = v)"
        @update:q="(v: string) => (q = v)"
      />

      <ProvidersResult :providers="items" :loading="false" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useProviderSearch } from "~/composables/useSearch";

const bootstrapStore = useBootstrapStore();

const categories = computed(() => bootstrapStore.categories || []);
const cities = computed(() => bootstrapStore.cities || []);

const { q, sort, filters, items, meta, updateFilters } = useProviderSearch();
</script>
