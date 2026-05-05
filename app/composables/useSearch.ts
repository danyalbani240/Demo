import { hash } from "ohash";
import { useDebounce } from "@vueuse/core";
import { useSearchApiRepository } from "~/repositories/search.reop";
import { buildProviderQuery } from "~/utils/search/buildQuery";
import {
  parseString,
  parseNumber,
  parseNullableNumber,
  parseBooleanFlag,
} from "~/utils/url/queryParsers";
import { cleanQuery } from "~/utils/url/cleanQuery";

import type { Provider } from "~/types";

interface ProviderFilters {
  category: string;
  city: string;
  rating?: number;
  minPrice: number | null;
  maxPrice: number | null;
  immediate: boolean;
}

export function useProviderSearch() {
  const route = useRoute();
  const router = useRouter();
  const api = useSearchApiRepository();

  /*
  HYDRATE FROM URL
  */

  const q = ref(parseString(route.query.q));
  const sort = ref(parseString(route.query.sort, "top"));

  const filters = reactive<ProviderFilters>({
    category: parseString(route.query.category),
    city: parseString(route.query.city),
    rating: parseNumber(route.query.rating),
    minPrice: parseNullableNumber(route.query.minPrice),
    maxPrice: parseNullableNumber(route.query.maxPrice),
    immediate: parseBooleanFlag(route.query.immediate),
  });

  /*
  SEARCH QUERY
  */

  const debouncedQ = useDebounce(q, 350);

  const apiQuery = computed(() =>
    buildProviderQuery({
      query: debouncedQ.value,
      sort: sort.value,
      filters: { ...filters },
    }),
  );

  /*
  URL SYNC
  */

  const urlQuery = computed(() =>
    cleanQuery({
      ...route.query,
      q: q.value || undefined,
      sort: sort.value !== "top" ? sort.value : undefined,
      category: filters.category,
      city: filters.city,
      rating: filters.rating,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      immediate: filters.immediate ? "1" : undefined,
    }),
  );

  watch(
    urlQuery,
    (newQuery) => {
      if (hash(route.query) !== hash(newQuery)) {
        router.replace({ query: newQuery });
      }
    },
    { deep: true },
  );

  /*
  FETCH DATA
  */

  const {
    data: response,
    pending,
    error,
    refresh,
  } = useAsyncData(
    () => `providers-search:${hash(apiQuery.value)}`,
    () => api.search(apiQuery.value),
    {
      watch: [apiQuery],
      default: () => null,
    },
  );

  /*
  DERIVED STATE
  */

  const items = computed<Provider[]>(() => response.value?.data?.items ?? []);

  const meta = computed(() => response.value?.data?.meta ?? { total: 0 });

  /*
  ACTIONS
  */

  function updateFilters(partial: Partial<ProviderFilters>) {
    Object.assign(filters, partial);
  }

  function resetFilters() {
    filters.category = "";
    filters.city = "";
    filters.rating = undefined;
    filters.minPrice = null;
    filters.maxPrice = null;
    filters.immediate = false;
  }

  return {
    q,
    sort,
    filters,

    items,
    meta,

    pending,
    error,

    updateFilters,
    resetFilters,
    refresh,
  };
}
