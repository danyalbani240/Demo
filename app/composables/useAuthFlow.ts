import { mapRoleToBackend } from "~/utils/auth/mapRole";
import { normalizePhone } from "~/utils/auth/normalizePhone";

export type Step = "form" | "otp";
type OtpPurpose = "signup" | "login";

interface OtpContext {
  phone: string;
  purpose: OtpPurpose;
}

export interface AuthFormState {
  name: string;
  phone: string;
  password: string;
  role: "customer" | "provider";
  mode: "login" | "register";
}

export interface AuthResult {
  ok: boolean;
  needsOtp?: boolean;
  message?: string;
}

export function useAuthFlow(form: AuthFormState) {
  const authStore = useAuthStore();

  const step = ref<Step>("form");

  const isLoading = ref(false);

  const otpCode = ref("");
  const otpContext = ref<OtpContext | null>(null);

  async function submit(): Promise<AuthResult> {
    const phone = normalizePhone(form.phone);

    const password = form.password || "";

    const name = String(form.name || "").trim();

    isLoading.value = true;

    try {
      // ---------------- LOGIN ----------------
      if (form.mode === "login") {
        const res: any = await authStore.login({
          phone,
          password,
        });

        if (!res?.ok) {
          return {
            ok: false,
            message: res?.message || "خطا در ورود",
          };
        }

        if (res?.needsOtp) {
          step.value = "otp";
          otpContext.value = {
            phone,
            purpose: "login",
          };

          return {
            ok: true,
            needsOtp: true,
            message: "کد تایید ارسال شد.",
          };
        }

        return {
          ok: true,
          message: "ورود با موفقیت انجام شد.",
        };
      }

      // ---------------- REGISTER ----------------
      const res: any = await authStore.signupStart({
        full_name: name,
        phone,
        password,
        role: mapRoleToBackend(form.role),
      });

      if (!res?.ok) {
        return {
          ok: false,
          message: res?.message || "خطا در ثبت‌نام",
        };
      }

      if (res?.needsOtp) {
        step.value = "otp";
        otpContext.value = {
          phone,
          purpose: "signup",
        };

        return {
          ok: true,
          needsOtp: true,
          message: "کد تایید ارسال شد.",
        };
      }

      return {
        ok: true,
        message: "ثبت‌نام با موفقیت انجام شد.",
      };
    } catch {
      return {
        ok: false,
        message: "خطای غیرمنتظره رخ داد.",
      };
    } finally {
      isLoading.value = false;
    }
  }

  async function verifyOtp(): Promise<AuthResult> {
    const context = otpContext.value;

    const code = String(otpCode.value || "").trim();

    if (!context?.phone) {
      return {
        ok: false,
        message: "درخواست تایید معتبر نیست. دوباره تلاش کنید.",
      };
    }

    if (!code) {
      return {
        ok: false,
        message: "کد تایید را وارد کنید.",
      };
    }

    isLoading.value = true;

    try {
      const res: any = await authStore.verifyOtp({
        phone: context.phone,
        code,
        purpose: context.purpose,
      });

      if (!res?.ok) {
        return {
          ok: false,
          message: res?.message || "کد تایید نامعتبر است.",
        };
      }

      return {
        ok: true,
        message: "تایید با موفقیت انجام شد.",
      };
    } catch {
      return {
        ok: false,
        message: "خطای غیرمنتظره رخ داد.",
      };
    } finally {
      isLoading.value = false;
    }
  }

  async function resendOtp(): Promise<AuthResult> {
    const context = otpContext.value;
    const phone = context?.phone || normalizePhone(form.phone);

    const password = form.password || "";

    const name = String(form.name || "").trim();

    if (!context?.phone || !phone) {
      return {
        ok: false,
        message: "درخواست تایید معتبر نیست. دوباره تلاش کنید.",
      };
    }

    isLoading.value = true;

    try {
      if (context.purpose === "login") {
        const res: any = await authStore.login({
          phone,
          password,
        });

        if (!res?.ok) {
          return {
            ok: false,
            message: res?.message || "ارسال مجدد ناموفق بود",
          };
        }
      } else {
        const res: any = await authStore.signupStart({
          full_name: name,
          phone,
          password,
          role: mapRoleToBackend(form.role),
        });

        if (!res?.ok) {
          return {
            ok: false,
            message: res?.message || "ارسال مجدد ناموفق بود",
          };
        }
      }

      return {
        ok: true,
        message: "کد تایید دوباره ارسال شد.",
      };
    } catch {
      return {
        ok: false,
        message: "ارسال مجدد ناموفق بود.",
      };
    } finally {
      isLoading.value = false;
    }
  }

  function resetOtp() {
    otpCode.value = "";
    otpContext.value = null;
    step.value = "form";
  }

  return {
    step,
    isLoading,

    otpCode,

    submit,
    verifyOtp,
    resendOtp,

    resetOtp,
  };
}
