import type { Provider } from "~/types";
import type { ApiResult } from "~/types/auth";

export const useProviderApiRepository = () => {
  return {
    async getProviderAndServices(providerId: string) {
      try {
        return await $fetch(`/api/providers/${providerId}?include=services`, {
          method: "GET",
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getFullProfile(
      id: string,
    ): Promise<ApiResult<{ provider: Provider; samples: any[] }>> {
      try {
        const [pRes, gRes] = await Promise.all([
          $fetch<ApiResult<{ provider: Provider }>>(
            `/api/providers/${id}?include=services`,
          ),
          $fetch<ApiResult<{ samples: any[] }>>(`/api/provider-samples/${id}`),
        ]);

        if (!pRes.success || !pRes.data?.provider) {
          return {
            success: false,
            data: null,
            message: pRes.message || "Provider not found",
          };
        }

        // Standardize gallery samples (handles different backend formats)
        const rawSamples = gRes.success ? (gRes.data?.samples ?? []) : [];

        return {
          success: true,
          data: {
            provider: pRes.data.provider,
            samples: Array.isArray(rawSamples) ? rawSamples : [],
          },
        };
      } catch (e: any) {
        return {
          success: false,
          data: null,
          message: e?.data?.message || "Internal connection error",
        };
      }
    },
  };
};
