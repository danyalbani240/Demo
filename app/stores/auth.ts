import { defineStore } from "pinia";

type OtpPurpose = "signup" | "login" | "reset";
type PublicUser = any;

function isValidIranPhone(phone: string) {
  return /^09\d{9}$/.test(String(phone || "").trim());
}

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
      let returnValue = null;
      this.initializing = true;
      try {
        const headers = import.meta.server
          ? useRequestHeaders(["cookie"])
          : undefined;

        const res: any = await $fetch("/api/auth/me", {
          method: "GET",
          headers,
        });
        if (res?.success) {
          this.user = res.data?.user ?? null;
          this.next = res.data?.next ?? "";
        } else {
          this.user = null;
          this.next = "";
        }
        returnValue = res;
      } catch {
        this.user = null;
        this.next = "";
      } finally {
        this.initializing = false;
        this.ready = true;
      }

      return returnValue;
    },

    async login(payload: { phone: string; password: string }) {
      const phone = String(payload.phone || "").trim();
      const password = String(payload.password || "");

      if (!isValidIranPhone(phone))
        return { ok: false as const, message: "شماره موبایل معتبر نیست" };
      if (!password)
        return { ok: false as const, message: "رمز عبور الزامی است" };

      this.loading = true;
      try {
        const res: any = await $fetch("/api/auth/login", {
          method: "POST",
          body: { phone, password },
        });

        if (!res?.success) {
          return {
            ok: false as const,
            message: res?.message || "ورود ناموفق بود",
          };
        }

        const data = res.data;

        if (data?.needsOtp) {
          this.pendingOtp = {
            phone: data.phone,
            purpose: "login",
            mode: "login",
          };
          return { ok: true as const, needsOtp: true as const };
        }

        this.user = data?.user ?? null;
        this.next = data?.next ?? "";
        this.pendingOtp = null;

        return { ok: true as const, needsOtp: false as const };
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
    async signupStart(payload: {
      full_name: string;
      phone: string;
      password: string;
      role: "user" | "provider";
    }) {
      const full_name = String(payload.full_name || "").trim();
      const phone = String(payload.phone || "").trim();
      const password = String(payload.password || "");
      const role = payload.role;

      if (!full_name) return { ok: false as const, message: "نام الزامی است" };
      if (!isValidIranPhone(phone))
        return { ok: false as const, message: "شماره موبایل معتبر نیست" };
      if (password.length < 6)
        return {
          ok: false as const,
          message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
        };

      this.loading = true;
      try {
        const res: any = await $fetch("/api/auth/signup/start", {
          method: "POST",
          body: { full_name, phone, password, role },
        });

        if (!res?.success) {
          return {
            ok: false as const,
            message: res?.message || "ثبت‌نام ناموفق بود",
          };
        }

        const data = res.data || {};

        // ✅ OTP mode (backend returns phone/purpose)
        if (data?.phone && data?.purpose === "signup" && !data?.user) {
          this.pendingOtp = {
            phone: data.phone,
            purpose: "signup",
            mode: "signup",
          };
          return { ok: true as const, needsOtp: true as const };
        }

        // ✅ No-OTP mode (backend returns user+next)
        const user = data?.user ?? null;
        const next = String(data?.next ?? "");

        if (!user) {
          return { ok: false as const, message: "پاسخ سرور نامعتبر است" };
        }

        this.user = user;
        this.next = next;
        this.pendingOtp = null;

        return { ok: true as const, needsOtp: false as const, next };
      } catch (e: any) {
        return {
          ok: false as const,
          message: e?.data?.message || e?.statusMessage || "ثبت‌نام ناموفق بود",
        };
      } finally {
        this.loading = false;
      }
    },

    async verifyOtp(payload: {
      phone: string;
      code: string;
      purpose: "login" | "signup";
    }) {
      const phone = String(payload.phone || "").trim();
      const code = String(payload.code || "").trim();

      if (!isValidIranPhone(phone))
        return { ok: false as const, message: "شماره موبایل معتبر نیست" };
      if (!code) return { ok: false as const, message: "کد تایید الزامی است" };

      this.loading = true;
      try {
        const endpoint =
          payload.purpose === "signup"
            ? "/api/auth/signup/verify"
            : "/api/auth/login/verify";

        const res: any = await $fetch(endpoint, {
          method: "POST",
          body: { phone, code },
        });

        if (!res?.success) {
          return {
            ok: false as const,
            message: res?.message || "تایید ناموفق بود",
          };
        }

        this.user = res.data?.user ?? null;
        this.next = res.data?.next ?? "";
        this.pendingOtp = null;

        return { ok: true as const };
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

    async updateProfile(payload: any) {
      this.loading = true;
      try {
        const res: any = await $fetch("/api/auth/me", {
          method: "PATCH",
          body: payload,
        });

        if (!res?.success) {
          return {
            ok: false as const,
            message: res?.message || "بروزرسانی پروفایل ناموفق بود",
          };
        }

        // refresh
        this.ready = false;
        await this.init();
        return { ok: true as const };
      } catch (e: any) {
        return {
          ok: false as const,
          message:
            e?.data?.message ||
            e?.statusMessage ||
            "بروزرسانی پروفایل ناموفق بود",
        };
      } finally {
        this.loading = false;
      }
    },
  },
});
