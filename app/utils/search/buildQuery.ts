import { allCitiesValue, allCategoriesValue } from "~/constants/search";

export function buildProviderQuery({ query, sort, filters }: any) {
  const city =
    filters.city && filters.city !== allCitiesValue ? filters.city : undefined;
  const category =
    filters.category && filters.category !== allCategoriesValue
      ? filters.category
      : undefined;
  return {
    q: query,
    sort,
    rating: filters.rating,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    category,
    city,
    immediate: filters.immediate ? "true" : undefined,
    page: 1,
    pageSize: 24,
  };
}
