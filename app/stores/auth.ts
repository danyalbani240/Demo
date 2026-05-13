import { defineStore } from "pinia";
import { useAuthApiRepository } from "~/repositories/auth.repo";
import type { OtpPayload, SignUpPayload } from "~/types/auth";
import { isValidIranPhone } from "~/utils/auth/normalizePhone";

type OtpPurpose = "signup" | "login" | "reset";
type PublicUser = any;

const api = useAuthApiRepository();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    ready: false,
    loading: false,
    initializing: false,

    user: null as PublicUser | null,
    next: "" as string,

    pendingOtp: null as null | {
      phone: string;
      purpose: OtpPurpose;
      mode: "login" | "signup" | "reset";
    },
  }),

  getters: {
    isAuthed: (state) => !!state.user,
    role: (state) => state.user?.role || null,
  },

  actions: {
    async init(force = false) {
      // if already ready, don't refetch
      if ((this.ready || this.initializing) && !force) return null;

      this.initializing = true;
      try {
        const res = await api.getUserData();
        if (res?.success) {
          this.user = res.data?.user ?? null;
          this.next = res.data?.next ?? "";
        } else {
          this.user = null;
          this.next = "";
        }
        return res;
      } catch {
        this.user = null;
        this.next = "";
      } finally {
        this.initializing = false;
        this.ready = true;
      }

      return null;
    },

    async login(payload: { phone: string; password: string }) {
      if (!isValidIranPhone(payload.phone))
        return { ok: false as const, message: "شماره موبایل معتبر نیست" };
      if (!payload.password)
        return { ok: false as const, message: "رمز عبور الزامی است" };

      this.loading = true;
      try {
        const res = await api.login(payload.phone, payload.password);

        if (!!res && res.success && res.data) {
          if (res.data.needsOtp) {
            this.pendingOtp = {
              phone: res.data.phone!,
              purpose: "login",
              mode: "login",
            };
          } else {
            // using sso token to redirect to dashboard and the reall app in general
            this.next = `https://service-hub-demo.vercel.app/auth/sso?token=${res.data.ssoToken}`;
            this.user = res.data.user;
            this.pendingOtp = null;
          }
        }
        return res;
      } catch (e: any) {
        return {
          ok: false as const,
          message: e?.data?.message || e?.statusMessage || "ورود ناموفق بود",
        };
      } finally {
        this.loading = false;
      }
    },

    // stores/auth.ts (replace only signupStart action)
    async signupStart(payload: SignUpPayload) {
      if (!isValidIranPhone(payload.phone))
        return { ok: false as const, message: "شماره موبایل معتبر نیست" };
      if (payload.password.length < 6)
        return {
          ok: false as const,
          message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
        };

      this.loading = true;
      try {
        const res = await api.signUpStart(payload);

        if (!res?.success) {
          return {
            ok: false as const,
            message: res?.message || "ثبت‌نام ناموفق بود",
          };
        }

        // ✅ OTP mode (backend returns phone/purpose)
        if (res.success && res.data) {
          if (
            res.data?.purpose === "signup" &&
            !res.data?.user &&
            res.data.phone
          ) {
            this.pendingOtp = {
              phone: res.data.phone,
              purpose: "signup",
              mode: "signup",
            };
            return { ok: true as const, needsOtp: true as const };
          }
          if (!res.data.user) {
            return { ok: false as const, message: "پاسخ سرور نامعتبر است" };
          }
        }

        // ✅ No-OTP mode (backend returns user+next)
        const user = res.data?.user ?? null;

        // this is for backward compatibility :
        // const next = String(res.data?.next ?? "");

        this.user = user;
        this.next = `https://service-hub-demo.vercel.app/auth/sso?token=${res.data?.ssoToken}`;
        this.pendingOtp = null;

        return { ok: true as const, needsOtp: false as const, next: this.next };
      } catch (e: any) {
        return {
          ok: false as const,
          message: e?.data?.message || e?.statusMessage || "ثبت‌نام ناموفق بود",
        };
      } finally {
        this.loading = false;
      }
    },

    async verifyOtp(payload: OtpPayload) {
      this.loading = true;
      try {
        const res: any = await api.verifyOtp(payload);

        if (res?.success && res.data) {
          this.user = res.data?.user ?? null;
          this.next = res.data?.next ?? "";
          this.pendingOtp = null;

          return { ok: true as const };
        }
        return {
          ok: false as const,
          message: res?.message || "تایید ناموفق بود",
        };
      } catch (e: any) {
        return {
          ok: false as const,
          message: e?.data?.message || e?.statusMessage || "تایید ناموفق بود",
        };
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await $fetch("/api/auth/logout", { method: "POST" });
      } finally {
        this.user = null;
        this.next = "";
        this.pendingOtp = null;
        this.ready = false; // optional: forces re-init after logout if page wants
        this.loading = false;
      }
    },
  },
});
