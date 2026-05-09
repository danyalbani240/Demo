import type {
  ApiResult,
  AuthResponse,
  OtpPayload,
  SignUpPayload,
} from "~/types/auth";

export const useAuthApiRepository = () => {
  return {
    async getUserData() {
      const headers = import.meta.server
        ? useRequestHeaders(["cookie"])
        : undefined;
      try {
        return await $fetch<ApiResult<AuthResponse>>("/api/auth/me", {
          method: "GET",
          headers,
        });
      } catch (e) {
        console.log(e);
      }
    },
    async login(phone: string, password: string) {
      try {
        return await $fetch<ApiResult<AuthResponse>>("/api/auth/login", {
          method: "POST",
          body: { phone, password },
        });
      } catch (e) {
        console.log(e);
      }
    },
    async signUpStart(payload: SignUpPayload) {
      try {
        return await $fetch<ApiResult<AuthResponse>>("/api/auth/signup/start", {
          method: "POST",
          body: payload,
        });
      } catch (e) {
        console.log(e);
      }
    },
    async verifyOtp(payload: OtpPayload) {
      try {
        const endpoint =
          payload.purpose === "signup"
            ? "/api/auth/signup/verify"
            : "/api/auth/login/verify";
        $fetch<ApiResult<AuthResponse>>(endpoint, {
          method: "POST",
          body: { phone: payload.phone, code: payload.code },
        });
      } catch (e) {
        console.log(e);
      }
    },
  };
};
