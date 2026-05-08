<template>
  <UModal
    v-model:open="open"
    :ui="{
      overlay: 'bg-black/50 dark:bg-black/80 backdrop-blur-lg',
      content: 'items-center p-0',
      wrapper: 'max-w-sm mx-auto rounded-3xl',
    }"
    :transition="false"
  >
    <template #content>
      <Transition
        appear
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 scale-90 translate-y-8"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div class="relative overflow-hidden bg-white dark:bg-zinc-950 w-full">
          <!-- Premium gradient background -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-fuchsia-50/50 dark:from-indigo-900/20 dark:via-transparent dark:to-fuchsia-900/20 pointer-events-none"
          ></div>

          <!-- Animated gradient glow elements -->
          <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              class="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-3xl animate-pulse"
              style="animation-duration: 4s"
            ></div>
            <div
              class="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-fuchsia-400/10 dark:bg-fuchsia-500/10 blur-3xl animate-pulse"
              style="animation-duration: 5s; animation-delay: 1s"
            ></div>
          </div>

          <!-- Border gradient effect -->
          <div
            class="absolute inset-0 rounded-3xl pointer-events-none"
            style="
              background: linear-gradient(
                135deg,
                transparent,
                transparent 50%,
                rgba(79, 70, 229, 0.2),
                transparent
              );
              padding: 1px;
            "
          ></div>

          <div
            v-if="step === 'form' && (mode == 'signup' || mode === 'login')"
            class="relative z-10"
          >
            <!-- HEADER -->

            <div
              class="relative px-8 pt-8 pb-6 border-b border-zinc-200/50 dark:border-zinc-800/50"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <Transition
                    mode="out-in"
                    enter-active-class="transition-all duration-300"
                    enter-from-class="opacity-0 -translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-2"
                  >
                    <div :key="mode">
                      <h2
                        class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400 bg-clip-text text-transparent"
                      >
                        {{
                          mode === "login" ? "خوش برگشتی 👋" : "ساخت حساب ✨"
                        }}
                      </h2>
                      <p
                        class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
                      >
                        {{
                          mode === "login"
                            ? "برای ادامه رزرو وارد شو"
                            : "کمتر از یک دقیقه طول می‌کشه"
                        }}
                      </p>
                    </div>
                  </Transition>
                </div>

                <button
                  class="shrink-0 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-indigo-900/30 rounded-xl transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="loading || stage !== 'form'"
                  @click="toggleMode"
                >
                  {{ mode === "login" ? "ثبت‌نام" : "ورود" }}
                </button>
              </div>
            </div>

            <!-- BODY -->
            <div class="relative px-8 py-8 space-y-6">
              <!-- ERROR MESSAGE -->
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 -translate-y-3 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition-all duration-200"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-2 scale-95"
              >
                <div
                  v-if="error"
                  class="px-4 py-3 rounded-xl bg-red-50/80 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20 text-sm text-red-700 dark:text-red-400 font-medium shadow-sm"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-lg">⚠️</span>
                    <span>{{ error }}</span>
                  </div>
                </div>
              </Transition>

              <!-- FORM -->
              <Transition
                mode="out-in"
                enter-active-class="transition-all duration-400 ease-out"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="stage === 'form'" class="space-y-4">
                  <!-- Full Name Input (Signup only) -->
                  <Transition
                    enter-active-class="transition-all duration-300"
                    enter-from-class="opacity-0 translate-x-4"
                    enter-to-class="opacity-100 translate-x-0"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 translate-x-0"
                    leave-to-class="opacity-0 -translate-x-2"
                  >
                    <div
                      v-if="mode === 'signup'"
                      class="space-y-2 flex flex-col"
                    >
                      <label
                        class="text-base font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                      >
                        نام و نام خانوادگی
                      </label>
                      <UInput
                        v-model="form.name"
                        size="lg"
                        placeholder="مثال: علی محمدی"
                        :ui="inputUIConfig"
                        :disabled="loading"
                        class="auth-input"
                      />
                    </div>
                  </Transition>

                  <!-- Phone Input -->
                  <div class="space-y-2 flex flex-col">
                    <label
                      class="text-base font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                    >
                      شماره موبایل
                    </label>
                    <UInput
                      v-model="form.phone"
                      size="lg"
                      autocomplete="off"
                      placeholder="09xxxxxxxxx"
                      inputmode="tel"
                      :ui="inputUIConfig"
                      :disabled="loading"
                      class="auth-input"
                    />
                  </div>

                  <!-- Password Input -->
                  <div class="space-y-2 flex flex-col">
                    <label
                      class="text-base font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                    >
                      رمز عبور
                    </label>
                    <div class="relative">
                      <UInput
                        v-model="form.password"
                        size="lg"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="حداقل 6 کاراکتر"
                        :ui="inputUIConfig"
                        :disabled="loading"
                        class="auth-input"
                      />
                      <button
                        type="button"
                        class="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl border border-black/10 bg-black/5 text-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-white/10"
                        @click="showPassword = !showPassword"
                      >
                        {{ showPassword ? "🙈" : "👁️" }}
                      </button>
                    </div>
                  </div>

                  <!-- Password Strength Indicator -->
                  <Transition
                    enter-active-class="transition-all duration-300"
                    enter-from-class="opacity-0 -translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-2"
                  >
                    <div
                      v-if="form.password"
                      class="rounded-xl border border-black/10 bg-black/[0.03] px-3 py-2 text-center text-xs text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                    >
                      <span class="font-extrabold">قدرت رمز:</span>
                      <span
                        class="mx-1 font-black"
                        :class="
                          passwordStrength.level === 1
                            ? 'text-amber-600'
                            : passwordStrength.level === 2
                              ? 'text-blue-600'
                              : passwordStrength.level === 3
                                ? 'text-green-600'
                                : ''
                        "
                      >
                        {{ passwordStrength.label }}
                      </span>
                      <span class="opacity-80"
                        >(حداقل ۶ کاراکتر + عدد/علامت بهتره)</span
                      >
                    </div>
                  </Transition>

                  <!-- Submit Button -->
                  <button
                    type="button"
                    class="w-full mt-6 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ease-out relative overflow-hidden group"
                    :class="[
                      loading
                        ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/30'
                        : 'bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95',
                    ]"
                    :disabled="loading"
                    @click="submit"
                  >
                    <!-- Button background animation -->
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-indigo-400 to-fuchsia-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                    ></div>

                    <span
                      class="relative flex items-center justify-center gap-2"
                    >
                      <span v-if="loading" class="inline-block">
                        <span
                          class="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                        ></span>
                      </span>
                      <span>
                        {{
                          loading
                            ? "درحال پردازش…"
                            : mode === "login"
                              ? "ورود و ادامه"
                              : "ساخت حساب و ادامه"
                        }}
                      </span>
                    </span>
                  </button>
                </div>
              </Transition>

              <!-- SUCCESS STATE -->
              <Transition
                mode="out-in"
                enter-active-class="transition-all duration-500 ease-out"
                enter-from-class="opacity-0 scale-75 rotate-12"
                enter-to-class="opacity-100 scale-100 rotate-0"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-50 rotate-12"
              >
                <div v-if="stage === 'success'" class="py-12 text-center">
                  <div
                    class="mx-auto mb-4 flex items-center justify-center"
                    style="width: 80px; height: 80px"
                  >
                    <div
                      class="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 animate-pulse w-full"
                      style="animation-duration: 2s"
                    ></div>
                    <div
                      class="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-xl shadow-indigo-500/50 animate-float"
                    >
                      <UIcon
                        name="i-heroicons-check-20-solid"
                        class="text-white w-10 h-10"
                      />
                    </div>
                  </div>

                  <h3
                    class="text-xl font-bold text-zinc-900 dark:text-white animate-fade-in"
                  >
                    انجام شد! 🎉
                  </h3>
                  <p
                    class="mt-3 text-sm text-zinc-600 dark:text-zinc-400 animate-fade-in"
                    style="animation-delay: 200ms"
                  >
                    درحال انتقال به پرداخت...
                  </p>
                </div>
              </Transition>
            </div>
          </div>
          <UCard v-else class="p-5 rounded-2xl">
            <div class="flex flex-col items-center justify-center">
              <p class="mb-5">
                کد چهار رقتی ارسال شده را برای شماره {{ form.phone }} وارد کنید.
              </p>
              <UInput
                v-model="otp.code"
                placeholder="کد تایید"
                inputmode="numeric"
                autocomplete="one-time-code"
                size="lg"
                class="w-full mb-4"
                :ui="inputUIConfig"
                :disabled="loading"
              />
              <p v-if="otpError" class="text-sm text-red-600 mt-3">
                {{ otpError }}
              </p>
              <button
                class="mt-3 text-sm text-blue-600 underline"
                :class="{ 'cursor-pointer': otpCooldown == 0 }"
                @click="resendCode"
                :disabled="otpCooldown > 0"
              >
                {{
                  otpCooldown > 0
                    ? `ارسال مجدد کد تایید در ${otpCooldown} ثانیه`
                    : "ارسال مجدد کد تایید"
                }}
              </button>
              <button
                class="mt-3 text-sm text-gray-600 underline"
                @click="goBackToForm"
                :disabled="loading"
              >
                تغییر شماره
              </button>
              <UButton
                class="mt-5"
                @click="handleOtp([])"
                label="ادامه"
                :loading="loading"
              />
            </div>
          </UCard>
        </div>
      </Transition>
    </template>
  </UModal>

  <!-- Success Overlay -->
  <Transition
    appear
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 scale-90"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-90"
  >
    <div
      v-if="success"
      class="fixed inset-0 z-9999 grid place-items-center bg-black/30 backdrop-blur-xl"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        class="relative w-[min(340px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/85 p-4 text-center text-zinc-50 shadow-2xl"
      >
        <div class="absolute inset-[-60%] success-burst" />
        <div
          class="relative z-10 mx-auto mb-2 grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-2xl"
        >
          ✅
        </div>
        <div class="relative z-10 text-sm font-black">{{ successText }}</div>
        <div class="relative z-10 mt-1 text-xs text-white/70">یک لحظه…</div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
const open = defineModel<boolean>("open", { required: true });
const emit = defineEmits<{ (e: "success"): void }>();

const props = defineProps<{
  otp?: boolean; // if true, open directly on otp stage (optional)
}>();

type Mode = "login" | "signup";
type Stage = "form" | "success";
type Step = "form" | "otp";

// UI state
const mode = ref<Mode>("login");
const step = ref<Step>("form");
const stage = ref<Stage>("form");
const loading = ref(false);
const error = ref("");
const shake = ref(false);

// success overlay
const success = ref(false);
const successText = ref("");

// OTP state
const otpCooldown = ref(0);
const otpError = ref("");
const code = ref<string[]>([]);

// form fields
const phone = ref("");
const password = ref("");
const fullName = ref("");
const showPassword = ref(false);

// form reactive objects (matching auth page)
const form = reactive({
  name: "",
  phone: "",
  password: "",
});

const otp = reactive({
  code: "",
});

// store
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

// constants
const STORAGE_KEY = "servicehub_auth_pref_v1";

// remember last start payload to support resend
const lastStart = ref<
  | null
  | {
      kind: "login";
      phone: string;
      password: string;
    }
  | {
      kind: "signup";
      phone: string;
      password: string;
      fullName: string;
      role: "user"; // Always customer for AuthGateModal
    }
>(null);

// computed properties (matching auth page)
const passwordStrength = computed(() => {
  const p = form.password || "";
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  if (p.length >= 12) score++;

  if (!p) return { label: "—", level: 0 };
  if (score <= 1) return { label: "ضعیف", level: 1 };
  if (score <= 3) return { label: "متوسط", level: 2 };
  return { label: "قوی", level: 3 };
});

// UI config (unchanged)
const inputUIConfig = {
  base: "peer rounded-xl border-2 border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-50/50 dark:bg-zinc-900/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all duration-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
  rounded: "rounded-xl",
};

// validation (matching auth page)
const validatePhone = (value: string): boolean =>
  /^09\d{9}$/.test(normalizeUserInput(value));
const validatePassword = (value: string): boolean =>
  normalizeUserInput(value).length >= 6; // backend uses 6 chars min
const validateFullName = (value: string): boolean =>
  normalizeUserInput(value).trim().length >= 3;

const validateForm = (): string | null => {
  const p = normalizeUserInput(form.phone);
  if (!validatePhone(p)) return "شماره موبایل معتبر نیست";
  if (!validatePassword(form.password)) return "رمز عبور حداقل ۶ کاراکتر";
  if (mode.value === "signup" && !validateFullName(form.name))
    return "نام را وارد کنید";
  return null;
};

// Convert Persian digits to English digits
function normalizeDigits(input: string): string {
  if (!input) return input;

  const digitMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  } as const;

  return input.split("").reduce((result, char) => {
    return result + (digitMap[char as keyof typeof digitMap] || char);
  }, "");
}

// Normalize all user inputs (convert Persian digits to English)
function normalizeUserInput(input: string): string {
  return normalizeDigits(String(input || "").trim());
}

function persistPref() {
  if (!import.meta.client) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: mode.value }));
}

function loadPref() {
  if (!process.client) return;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.mode === "login" || parsed?.mode === "signup")
      mode.value = parsed.mode;
  } catch {}
}

function pulseError(message?: string) {
  shake.value = true;
  setTimeout(() => (shake.value = false), 450);
  if (message)
    toast.add({
      title: "خطا",
      description: message,
      color: "error",
    });
}

async function showSuccessThenGo(next: string) {
  success.value = true;
  successText.value = next.includes("dashboard")
    ? "ورود موفق ✨"
    : "ثبت‌نام موفق ✨";
  await new Promise((r) => setTimeout(r, 650));
  await router.push(next);
}

// helpers
function startCooldown(seconds = 60) {
  otpCooldown.value = seconds;
  const interval = setInterval(() => {
    if (otpCooldown.value > 0) otpCooldown.value--;
    else clearInterval(interval);
  }, 1000);
}

function resetForm() {
  form.name = "";
  form.phone = "";
  form.password = "";
  otp.code = "";
  error.value = "";
  otpError.value = "";
  stage.value = "form";
  step.value = "form";
  mode.value = "login";
  lastStart.value = null;
  success.value = false;
  successText.value = "";
}

function handleSuccess() {
  stage.value = "success";
  setTimeout(() => {
    open.value = false;
    resetForm();
    emit("success");
  }, 800);
}

function computeNext(authNext?: string) {
  if (authNext) return authNext;
  return "/dashboard";
}

function handleError(err: any) {
  const msg =
    err?.data?.message ||
    err?.message ||
    "خطایی در سرور رخ داد. لطفاً دوباره تلاش کنید";

  // soften common auth errors
  if (String(msg).toLowerCase().includes("invalid")) {
    error.value = "شماره موبایل یا رمز عبور اشتباه است";
    return;
  }
  error.value = msg;
}

function toggleMode() {
  error.value = "";
  otpError.value = "";
  otp.code = "";
  mode.value = mode.value === "login" ? "signup" : "login";
  step.value = "form";
  persistPref();
}

// -----------------------------
// Backend-driven auth flow (matching auth page exactly)
// -----------------------------

async function startAuth() {
  const phone = normalizeUserInput(form.phone);
  const password = normalizeUserInput(form.password);
  const name = normalizeUserInput(form.name).trim();

  if (!phone || !password || (mode.value === "signup" && !name)) {
    pulseError("لطفاً اطلاعات را کامل وارد کنید.");
    return;
  }

  loading.value = true;
  try {
    // ---------------- LOGIN ----------------
    if (mode.value === "login") {
      const res: any = await authStore.login({ phone, password });

      if (!res?.ok) {
        pulseError(res?.message || "خطا در ورود");
        return;
      }

      // needs OTP step (only when backend says so)
      if (res?.needsOtp) {
        step.value = "otp";
        lastStart.value = { kind: "login", phone, password };
        startCooldown(60);
        toast.add({
          title: "OTP",
          description: "کد تایید ارسال شد.",
          color: "primary",
        });
        return;
      }

      toast.add({
        title: "Success",
        description: "ورود با موفقیت انجام شد.",
        color: "success",
      });

      successText.value = "ورود موفق ✨";
      await showSuccessThenGo(computeNext(authStore.next || "/dashboard"));
      return;
    }

    // ---------------- REGISTER ----------------
    lastStart.value = {
      kind: "signup",
      phone,
      password,
      fullName: name,
      role: "user", // Always user for AuthGateModal
    };

    const res: any = await authStore.signupStart({
      full_name: name,
      phone,
      password,
      role: "user", // Backend role for customer
    });

    if (!res?.ok) {
      pulseError(res?.message || "خطا در ثبت‌نام");
      return;
    }

    // If backend OTP is ON, store returns needsOtp=true
    if (res?.needsOtp) {
      step.value = "otp";
      startCooldown(60);
      toast.add({
        title: "OTP",
        description: "کد تایید ارسال شد.",
        color: "primary",
      });
      return;
    }

    // OTP is OFF => user already logged in via cookie and store has user/next
    toast.add({
      title: "Success",
      description: "ثبت‌نام با موفقیت انجام شد.",
      color: "success",
    });

    successText.value = "ثبت‌نام موفق ✨"; // Always customer message

    await showSuccessThenGo(computeNext(authStore.next || "/dashboard"));
  } catch {
    pulseError("خطای غیرمنتظره رخ داد.");
  } finally {
    loading.value = false;
  }
}

async function verifyOtp() {
  const phone = normalizeUserInput(form.phone);
  const code = normalizeUserInput(otp.code).trim();

  if (!phone || !code) {
    pulseError("کد تایید را وارد کنید.");
    return;
  }

  loading.value = true;
  try {
    const res: any = await authStore.verifyOtp({
      phone,
      code,
      purpose: mode.value === "signup" ? "signup" : "login",
    });

    if (!res?.ok) {
      pulseError(res?.message || "کد تایید نامعتبر است.");
      return;
    }

    toast.add({
      title: "Success",
      description: "تایید با موفقیت انجام شد.",
      color: "success",
    });

    successText.value =
      mode.value === "signup"
        ? "ثبت‌نام موفق ✨" // Always customer for AuthGateModal
        : "ورود موفق ✨";

    await showSuccessThenGo(computeNext(authStore.next || "/dashboard"));
  } catch {
    pulseError("خطای غیرمنتظره رخ داد.");
  } finally {
    loading.value = false;
  }
}

async function resendCode() {
  // backend owns resend throttling; we just call the correct start endpoint again.
  const phone = normalizeUserInput(form.phone);
  const password = normalizeUserInput(form.password);
  const name = normalizeUserInput(form.name).trim();

  if (!phone) {
    pulseError("شماره تلفن را وارد کنید.");
    return;
  }

  if (otpCooldown.value > 0) return;

  loading.value = true;
  try {
    if (mode.value === "login") {
      // calling login again triggers OTP (when needed)
      const res: any = await authStore.login({ phone, password });
      if (!res?.ok) {
        pulseError(res?.message || "ارسال مجدد ناموفق بود");
        return;
      }
    } else {
      const res: any = await authStore.signupStart({
        full_name: name,
        phone,
        password,
        role: "user", // Always user for AuthGateModal
      });
      if (!res?.ok) {
        pulseError(res?.message || "ارسال مجدد ناموفق بود");
        return;
      }
    }

    startCooldown(60);
    toast.add({
      title: "OTP",
      description: "کد تایید دوباره ارسال شد.",
      color: "primary",
    });
  } catch {
    pulseError("ارسال مجدد ناموفق بود.");
  } finally {
    loading.value = false;
  }
}

async function submit() {
  error.value = "";

  const validationError = validateForm();
  if (validationError) {
    error.value = validationError;
    pulseError(validationError);
    return;
  }

  if (loading.value) return;

  await startAuth();
}

// Watchers
watch(open, (isOpen) => {
  if (!isOpen) {
    resetForm();
  } else {
    // if parent asks OTP-only modal
    if (props.otp) {
      step.value = "otp";
    } else {
      loadPref();
      persistPref();
    }
  }
});

watch([mode], () => {
  persistPref();
  // switching mode should reset otp step
  step.value = "form";
  otp.code = "";
});

// expose handlers used by template
// (template calls: submit, handleOtp(code), resendCode)
const handleOtp = async (_entered: string[]) => {
  await verifyOtp();
};

function goBackToForm() {
  step.value = "form";
  otp.code = "";
}
</script>

<style scoped>
@keyframes pop {
  0% {
    transform: scale(0.85);
  }
  60% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
.animate-pop {
  animation: pop 0.4s ease-out;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.auth-input :deep(input):focus {
  box-shadow: 0 0 0 3px rgb(99, 102, 241, 0.1);
}

.auth-input :deep(input) {
  transition: all 0.3s ease;
}

.auth-input :deep(input):hover {
  border-color: rgb(129, 140, 248);
}

/* success burst */
.success-burst {
  background:
    radial-gradient(
      circle at 35% 35%,
      rgba(99, 102, 241, 0.35),
      transparent 45%
    ),
    radial-gradient(
      circle at 70% 45%,
      rgba(217, 70, 239, 0.28),
      transparent 45%
    ),
    radial-gradient(
      circle at 45% 75%,
      rgba(34, 211, 238, 0.22),
      transparent 45%
    );
  filter: blur(10px);
}
</style>
