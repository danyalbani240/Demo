export interface Category {
  _id: string;
  id?: string;
  title: string;
  icon: string;
  desc: string;
  slug: string;
}
export interface BookingPayload {
  providerId: string;
  serviceIds: string[];
  startAt: string;
  discountCode?: string;
  note?: string;
}
export type ServiceItem = {
  id?: number | string;
  _id?: string;
  title?: string | null;
  description?: string | null;
  price?: number;
  durationMinutes?: number | string | null;
  category?: string | number | null;
};

export interface Provider {
  _id?: string;
  id?: string;
  full_name: string;
  business_name?: string;
  city?: string | null;
  cityTitle?: string;
  avatar?: string | null;
  is_verified?: boolean;
  rating?: number | null;
  done_services?: number;
  bio?: string;
  work_ethic?: string[];
  address?: string;
  category: Category | string;
  is_active?: boolean;
  preview_services?: any[];
  immediate_24h?: boolean;
  minPrice?: number;
  categoryTitle?: string;
  services?: ServiceItem[];
}
export interface City {
  _id: string;
  fa: string;
  en: string;
}
