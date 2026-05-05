export const useProviderApiRepository = () => {
  return {
    async getProviderAndServices(providerId: string) {
      return await $fetch(`/api/providers/${providerId}?include=services`, {
        method: "GET",
      });
    },
  };
};
