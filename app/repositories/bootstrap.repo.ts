export const useBootstrapApiRepository = () => {
  return {
    async getBootstrap() {
      return await $fetch("/api/bootstrap", { method: "GET" });
    },
    async getCategories() {
      return await $fetch("/api/categories", { method: "GET" });
    },
    async getCities() {
      return await $fetch("/api/cities", { method: "GET" });
    },
  };
};
