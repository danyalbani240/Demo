import { defineStore } from "pinia";
import { useBootstrapApiRepository } from "~/repositories/bootstrap.repo";
import type { Category, City, Provider } from "~/types";

export const useBootstrapStore = defineStore("bootstrap", () => {
  const categories = ref<Category[]>([]);
  const topProviders = ref<Provider[]>([]);
  const providersCount = ref<number>();
  const cities = ref<City[]>([]);
  let api = useBootstrapApiRepository();
  const loaded = ref(false);
  const loading = ref(false);

  async function fetchBootstrap() {
    if (loaded.value || loading.value) return;

    loading.value = true;

    try {
      const res = await api.getBootstrap();

      if (res?.success || res?.status === "success") {
        categories.value = res.data?.categories ?? [];
        topProviders.value = res.data?.providers ?? [];
        providersCount.value = res.data?.providersCount ?? 3;
        cities.value = res.data?.cities ?? [];
        loaded.value = true;
      }

      return res?.success;
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      loading.value = false;
      return "none";
    }
  }
  async function getCategories() {
    if (categories.value.length > 0) {
      return categories.value;
    }
    try {
      const res: any = await api.getCategories();
      if (!res?.success && res?.status !== "success") return [];

      categories.value = res.data?.categories ?? [];
      return categories.value;
    } catch (e) {
      console.error("getCategories error", e);
      return [];
    }
  }
  async function getCities() {
    if (cities.value.length > 0) {
      return cities.value;
    }
    try {
      const res: any = await api.getCities();
      if (!res?.success && res?.status !== "success") return [];

      cities.value = res.data?.cities ?? [];
      return cities.value;
    } catch (e) {
      console.error("getCategories error", e);
      return [];
    }
  }
  function getCategoryTitleById(id: string) {
    return categories.value.find((cat) => cat._id === id || cat.id === id)
      ?.title;
  }
  return {
    categories,
    getCities,
    getCategories,
    topProviders,
    providersCount,
    cities,
    loaded,
    loading,
    fetchBootstrap,
    getCategoryTitleById,
  };
});
