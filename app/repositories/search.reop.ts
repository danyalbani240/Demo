export const useSearchApiRepository = () => {
  return {
    async search(query: any) {
      return await $fetch("/api/providers/search", { query });
    },
  };
};
