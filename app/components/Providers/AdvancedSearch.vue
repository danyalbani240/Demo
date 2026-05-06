<template>
  <header>
    <nav
      class="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2"
    >
      <NuxtLink to="/" class="hover:text-primary-600">
        {{ $t("search.home") }}
      </NuxtLink>
      <span>/</span>
      <NuxtLink to="/providers" class="hover:text-primary-600">
        {{ $t("search.providers") }}
      </NuxtLink>
    </nav>

    <div class="mt-3 flex flex-col gap-3 sm:gap-4">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {{ $t("search.title") }}
          </h1>
          <p
            class="mt-1 text-sm sm:text-base text-gray-600 dark:text-slate-400"
          >
            {{ $t("search.subtitle") }}
          </p>
        </div>

        <div class="hidden sm:flex items-center gap-2 shrink-0">
          <USelect
            :model-value="sort"
            @update:model-value="emit('update:sort', $event)"
            :items="sortOptions"
            class="w-52"
          />
          <UButton variant="outline" @click="resetAll">
            {{ $t("search.reset") }}
          </UButton>
        </div>
      </div>

      <div
        class="rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/50"
      >
        <div class="p-3 sm:p-4">
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <div class="sm:col-span-6">
              <UInput
                data-testid="search-input"
                :model-value="q"
                @update:model-value="emit('update:q', $event)"
                icon="i-heroicons-magnifying-glass-20-solid"
                :placeholder="$t('search.search_placeholder')"
                class="w-full"
              />
            </div>

            <div class="sm:col-span-3">
              <USelect
                :model-value="filters.category"
                @update:model-value="updateFilter('category', $event)"
                :items="categoryOptions"
                :placeholder="$t('search.category')"
                class="w-full"
              />
            </div>

            <div class="sm:col-span-3">
              <USelect
                :model-value="filters.city"
                @update:model-value="updateFilter('city', $event)"
                :items="cityOptions"
                :placeholder="$t('search.city')"
                class="w-full"
              />
            </div>

            <div class="sm:hidden grid grid-cols-2 gap-2">
              <USelect
                :model-value="sort"
                @update:model-value="emit('update:sort', $event)"
                :items="sortOptions"
                class="w-full"
              />
              <UButton variant="outline" class="w-full" @click="resetAll">
                {{ $t("search.reset") }}
              </UButton>
            </div>

            <div
              class="sm:col-span-12 flex items-center justify-between gap-2 pt-1"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400">
                <span v-if="q">
                  {{ $t("search.search_for", { q }) }}
                </span>
              </div>

              <UButton
                color="neutral"
                variant="soft"
                class="rounded-xl"
                @click="advancedOpen = true"
              >
                <UIcon
                  name="i-heroicons-adjustments-horizontal-20-solid"
                  class="w-5 h-5 ml-1"
                />
                {{ $t("search.more_filters") }}
              </UButton>
            </div>
          </div>

          <div v-if="activeChips.length" class="mt-3 flex flex-wrap gap-2">
            <UBadge
              v-for="chip in activeChips"
              :key="chip.key"
              size="md"
              color="neutral"
              variant="soft"
              class="cursor-pointer rounded-full px-3 py-1.5 hover:opacity-90 transition"
              @click="removeChip(chip.key)"
            >
              {{ chip.label }}
              <UIcon name="i-heroicons-x-mark-20-solid" class="w-4 h-4 mr-1" />
            </UBadge>
          </div>
        </div>
      </div>
    </div>

    <UModal v-model:open="advancedOpen">
      <template #body>
        <div
          class="border border-slate-200/70 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/90 rounded-t-3xl sm:rounded-3xl"
        >
          <div class="flex items-center justify-between">
            <p class="font-extrabold">
              {{ $t("search.advanced_title") }}
            </p>
            <div class="flex items-center gap-2">
              <UButton variant="outline" size="sm" @click="resetAll">
                {{ $t("search.reset") }}
              </UButton>
              <UButton variant="soft" size="sm" @click="advancedOpen = false">
                {{ $t("search.close") }}
              </UButton>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <USelect
              :model-value="filters.rating"
              @update:model-value="updateFilter('rating', $event)"
              :items="ratingOptions"
              :placeholder="$t('search.min_rating')"
            />

            <label
              class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/30"
            >
              <span class="text-sm font-semibold">
                {{ $t("search.immediate") }}
              </span>
              <input
                :checked="filters.immediate"
                @change="
                  updateFilter(
                    'immediate',
                    ($event.target as HTMLInputElement).checked,
                  )
                "
                type="checkbox"
                class="h-5 w-5"
              />
            </label>

            <UInput
              :model-value="filters.minPrice"
              @update:model-value="updateFilter('minPrice', Number($event))"
              type="number"
              :placeholder="$t('search.min_price')"
            />

            <UInput
              :model-value="filters.maxPrice"
              @update:model-value="updateFilter('maxPrice', Number($event))"
              type="number"
              :placeholder="$t('search.max_price')"
            />

            <USelect
              :model-value="sort"
              @update:model-value="emit('update:sort', $event)"
              :items="sortOptions"
              class="sm:col-span-2"
            />
          </div>

          <div class="mt-4">
            <UButton class="w-full rounded-2xl" @click="advancedOpen = false">
              {{ $t("search.apply_filters") }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </header>
</template>

<script setup lang="ts">
import { sortOptions } from "~/constants/search";
import type { Category, City } from "~/types";
import type { Filters } from "~/types/search";
import { buildSearchChips } from "~/utils/search/chips";
import { buildCategoryOptions, buildCityOptions } from "~/utils/search/options";

const props = defineProps<{
  filters?: Filters;
  sort?: string;
  q?: string;
  categories?: Category[];
  cities?: City[];
  total?: number;
  loading?: boolean;
}>();

const emit = defineEmits(["update:filters", "update:sort", "update:q"]);

const advancedOpen = ref(false);

const filters = computed(() => props.filters ?? {});
const q = computed(() => props.q ?? "");
const sort = computed(() => props.sort ?? "top");

const ratingOptions = [
  { label: "۱+", value: 1 },
  { label: "۲+", value: 2 },
  { label: "۳+", value: 3 },
  { label: "۴+", value: 4 },
  { label: "۵", value: 5 },
];

const cityOptions = computed(() => buildCityOptions(props.cities ?? []));
const categoryOptions = computed(() =>
  buildCategoryOptions(props.categories ?? []),
);

function updateFilter(key: string, value: any) {
  emit("update:filters", {
    ...filters.value,
    [key]: value,
  });
}

function resetAll() {
  emit("update:q", "");
  emit("update:sort", "top");
  emit("update:filters", {
    category: "",
    city: "",
    rating: undefined,
    minPrice: null,
    maxPrice: null,
    immediate: false,
  });
}

function removeChip(key: string) {
  if (key === "q") emit("update:q", "");
  else if (key === "sort") emit("update:sort", "top");
  else updateFilter(key, null);
}

const categoryTitleBySlug = computed<Record<string, string>>(() => {
  const map: Record<string, string> = {};
  for (const c of props.categories ?? []) {
    if (c.slug) map[String(c.slug)] = String(c.title);
  }
  return map;
});

const activeChips = computed(() =>
  buildSearchChips({
    q: q.value,
    filters: filters.value,
    sort: sort.value,
    categoryMap: categoryTitleBySlug.value,
    sortOptions,
  }),
);
</script>
