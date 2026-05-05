import type { ServiceItem } from "~/types";
// TODO : check if it is better as a composable or not
export function toIdSet(ids: readonly string[]): Set<string> {
  return new Set(ids.filter(Boolean));
}

export function pickSelectedById<T extends { _id: string | undefined }>(
  items: ServiceItem[],
  selectedIdSet: ReadonlySet<string>,
) {
  if (!selectedIdSet.size) return [];
  return items.filter((item) => selectedIdSet.has(String(item?._id || "")));
}

// export function sanitizeSelectedIds<T extends { _id: string }>(
//   selectedIds: readonly string[],
//   availableItems: readonly T[],
// ): string[] {
//   const availableIdSet = new Set(
//     availableItems.map((item) => String(item._id || "")).filter(Boolean),
//   );
//   return selectedIds.filter((id) => availableIdSet.has(String(id || "")));
// }

export function toggleId(selectedIds: readonly string[], id: string): string[] {
  const normalizedId = String(id || "");
  if (!normalizedId) return [...selectedIds];
  if (selectedIds.includes(normalizedId)) {
    return selectedIds.filter((currentId) => currentId !== normalizedId);
  }
  return [...selectedIds, normalizedId];
}
