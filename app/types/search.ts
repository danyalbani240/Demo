export interface Filters {
  category?: string;
  city?: string;
  rating?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  immediate?: boolean;
}
