import type { AuthFormState, AuthResult } from "./useAuthFlow";

export function useAuthPage(form: AuthFormState) {
  const router = useRouter();
  const route = useRoute();

  const toast = useToast();

  const { shake, pulseError } = usePulseError();

  const success = ref(false);

  const successText = ref("");

  const {
    submit,
    verifyOtp,
    resendOtp,

    step,
    isLoading,
    otpCode,

    resetOtp,
  } = useAuthFlow(form);

  const returnTo = computed(() => {
    const q = route.query.redirect;

    if (typeof q === "string" && q.startsWith("/")) {
      return q;
    }

    return "";
  });

  function computeNext(authNext?: string) {
    if (returnTo.value) return returnTo.value;

    if (authNext) return authNext;

    return "/dashboard";
  }

  async function showSuccessThenGo() {
    successText.value =
      form.role === "provider"
        ? "ثبت‌نام موفق! بریم داشبورد 🚀"
        : "ثبت‌نام موفق ✨";

    success.value = true;

    await new Promise((r) => setTimeout(r, 650));

    const authStore = useAuthStore();

    await navigateTo(computeNext(authStore.next || "/dashboard"), {
      external: authStore.next.includes("http"),
    });
  }

  function handleResult(
    result: AuthResult,
    options?: {
      successTitle?: string;
      successColor?: string;
    },
  ) {
    if (!result.ok) {
      pulseError(result.message || "خطا");

      return false;
    }

    if (result.message) {
      toast.add({
        title: options?.successTitle || "Success",

        description: result.message,

        color: (options?.successColor as any) || "success",
      });
    }

    return true;
  }

  async function handleSubmit() {
    if (
      !form.phone.trim() ||
      !form.password.trim() ||
      (form.mode === "register" && !form.name.trim())
    ) {
      pulseError("لطفاً اطلاعات را کامل وارد کنید.");

      return;
    }

    const result = await submit();

    const ok = handleResult(result, {
      successTitle: result.needsOtp ? "OTP" : "Success",
      successColor: result.needsOtp ? "primary" : "success",
    });

    if (!ok || result.needsOtp) {
      return;
    }

    await showSuccessThenGo();
  }

  async function handleVerifyOtp() {
    const result = await verifyOtp();

    const ok = handleResult(result);

    if (!ok) return;

    await showSuccessThenGo();
  }

  async function handleResendOtp() {
    const result = await resendOtp();

    handleResult(result, {
      successTitle: "OTP",
      successColor: "primary",
    });
  }

  return {
    step,
    isLoading,

    otpCode,

    success,
    successText,

    shake,

    handleSubmit,
    handleVerifyOtp,
    handleResendOtp,

    resetOtp,
  };
}
