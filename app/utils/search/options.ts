import { allCategoriesValue, allCitiesValue } from "~/constants/search";
import type { Category, City } from "~/types";

export function buildCategoryOptions(
  categories: Category[],
  allValue: string = allCategoriesValue,
) {
  return [
    { label: "همه دسته‌ها", value: allValue },
    ...categories
      .filter((category) => String(category?.slug || "").trim().length > 0)
      .map((category) => ({
        label: category.title,
        value: String(category.slug),
      })),
  ];
}
export function buildCityOptions(
  cities: City[],
  allValue: string = allCitiesValue,
) {
  return [
    { label: "همه شهرها", value: allValue },
    ...cities.map((city) => ({
      label: city?.fa,
      value: city?.en,
    })),
  ];
}
