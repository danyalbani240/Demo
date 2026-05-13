<template>
  <div class="relative min-h-screen overflow-hidden isolate dark:bg-zinc-950">
    <div
      class="auth-bg absolute inset-0 -z-10 dark:bg-zinc-950!"
      aria-hidden="true"
    >
      <div class="blob b1" />
      <div class="blob b2" />
      <div class="blob b3" />
      <div class="noise" />
    </div>

    <div
      class="relative z-10 flex min-h-screen items-center justify-center px-4 py-7"
    >
      <div
        class="w-full max-w-105 rounded-[28px] p-px shadow-[0_40px_110px_-60px_rgba(0,0,0,.35)] dark:shadow-[0_40px_110px_-60px_rgba(0,0,0,.75)] form-container"
        :class="shake ? 'animate-shake' : ''"
      >
        <div
          class="rounded-[27px] border border-black/10 bg-white/95 p-5 text-zinc-950 dark:border-white/10 dark:bg-zinc-950/95 dark:text-zinc-50"
        >
          <!-- header -->
          <AuthFormHeader :role="form.role" :mode="form.mode" />

          <!-- segmented -->
          <AuthModeSwitch v-if="step === 'form'" v-model="form.mode" />

          <!-- role -->
          <LazyAuthRolePicker
            v-model="form.role"
            v-if="step === 'form' && form.mode === 'register'"
          />
          <!-- form / otp -->
          <div autocomplete="off" class="mt-3 grid gap-2.5">
            <AuthForm
              v-if="step === 'form'"
              :form="form"
              :isLoading="isLoading"
              @submit="handleSubmit"
            />

            <AuthOtpForm
              v-else
              v-model:otp="otpCode"
              :phone="form.phone"
              :isLoading="isLoading"
              @verify="handleVerifyOtp"
              @resend="handleResendOtp"
              @back="resetOtp"
            />
          </div>
          <!-- success overlay -->
          <BaseSuccessOverlay :success="success" :successText="successText" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "guest-only",
  layout: "auth",
});

type Role = "customer" | "provider";
type Mode = "login" | "register";

const form = reactive({
  name: <string>"",
  phone: <string>"",
  password: <string>"",
  role: <Role>"customer",
  mode: <Mode>"login",
});

const {
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
} = useAuthPage(form);

useAuthPersistence(form);
let toast = useToast();

onMounted(() => {
  toast.add({
    title: "This is a demo",
    description:
      "please check My telegram channel (@smokingDev) Auth section for more info  Thank you .",
    duration: 600000,
    ui: { description: "text-center", title: "text-2xl text-center " },
  });
});
</script>
<style scoped>
/* background gradients must be CSS (Tailwind can't express this well) */
.auth-bg {
  background:
    radial-gradient(
      1200px 800px at 15% 10%,
      rgba(99, 102, 241, 0.18),
      transparent 55%
    ),
    radial-gradient(
      900px 700px at 80% 30%,
      rgba(217, 70, 239, 0.14),
      transparent 55%
    ),
    radial-gradient(
      1000px 900px at 30% 95%,
      rgba(34, 211, 238, 0.12),
      transparent 55%
    ),
    #f7f7fb;
}
:global(html.dark) .auth-bg {
  background:
    radial-gradient(
      1200px 800px at 15% 10%,
      rgba(99, 102, 241, 0.2),
      transparent 55%
    ),
    radial-gradient(
      900px 700px at 80% 30%,
      rgba(217, 70, 239, 0.18),
      transparent 55%
    ),
    radial-gradient(
      1000px 900px at 30% 95%,
      rgba(34, 211, 238, 0.14),
      transparent 55%
    ),
    #05050a;
}

.blob {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.28;
  animation: floaty 10s ease-in-out infinite;
}
.b1 {
  left: -160px;
  top: -150px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.9), transparent 60%);
}
.b2 {
  right: -200px;
  top: 120px;
  background: radial-gradient(circle, rgba(217, 70, 239, 0.8), transparent 60%);
  animation-delay: 1.4s;
}
.b3 {
  left: 40px;
  bottom: -220px;
  background: radial-gradient(
    circle,
    rgba(34, 211, 238, 0.65),
    transparent 60%
  );
  animation-delay: 2.2s;
}
@keyframes floaty {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(18px, 22px, 0) scale(1.05);
  }
}

.noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
  opacity: 0.1;
  mix-blend-mode: overlay;
}

/* autofill fix (must be CSS) */
:global(html) input:-webkit-autofill,
:global(html) input:-webkit-autofill:hover,
:global(html) input:-webkit-autofill:focus {
  -webkit-text-fill-color: inherit !important;
  caret-color: inherit !important;
  transition: background-color 9999s ease-out 0s;
}
:global(html:not(.dark)) input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.8) inset !important;
  box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.8) inset !important;
}
:global(html.dark) input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.06) inset !important;
  box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.06) inset !important;
}

/* animations */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(8px);
  }
  40% {
    transform: translateX(-7px);
  }
  60% {
    transform: translateX(5px);
  }
  80% {
    transform: translateX(-4px);
  }
}
.animate-shake {
  animation: shake 0.45s ease;
}

.form-container {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.35),
    rgba(217, 70, 239, 0.18),
    rgba(34, 211, 238, 0.18)
  );
}
</style>
