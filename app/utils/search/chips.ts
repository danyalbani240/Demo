import { allCitiesValue } from "~/constants/search";
interface chip {
  key: string;
  label: string;
}
export function buildSearchChips({
  q,
  filters,
  sort,
  categoryMap,
  sortOptions,
}: any) {
  const chips: chip[] = [];

  if (q) chips.push({ key: "q", label: `جستجو: ${q}` });

  if (filters.category && categoryMap[filters.category]) {
    chips.push({
      key: "category",
      label: `دسته: ${categoryMap[filters.category]}`,
    });
  }

  if (filters.city) {
    chips.push({
      key: "city",
      label: `شهر: ${filters.city === allCitiesValue ? "همه شهر ها" : filters.city}`,
    });
  }

  if (filters.rating != null) {
    chips.push({ key: "rating", label: `امتیاز: ${filters.rating}+` });
  }

  if (filters.minPrice != null) {
    chips.push({ key: "minPrice", label: `حداقل: ${filters.minPrice} تومان` });
  }

  if (filters.maxPrice != null) {
    chips.push({ key: "maxPrice", label: `حداکثر: ${filters.maxPrice} تومان` });
  }

  if (filters.immediate) {
    chips.push({ key: "immediate", label: "نوبت فوری" });
  }

  if (sort !== "top") {
    chips.push({
      key: "sort",
      label: `مرتب‌سازی: ${
        sortOptions.find((s: any) => s.value === sort)?.label || "—"
      }`,
    });
  }

  return chips;
}
