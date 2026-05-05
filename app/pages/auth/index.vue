<template>
  <div
    dir="rtl"
    class="relative min-h-[100dvh] overflow-hidden isolate dark:bg-zinc-950"
  >
    <!-- background (Tailwind theme-aware) -->
    <div
      class="auth-bg absolute inset-0 -z-10 dark:!bg-zinc-950"
      aria-hidden="true"
    >
      <div class="blob b1" />
      <div class="blob b2" />
      <div class="blob b3" />
      <div class="noise" />
    </div>

    <!-- success overlay -->
    <Transition name="success">
      <div
        v-if="success"
        class="fixed inset-0 z-[9999] grid place-items-center bg-black/30 backdrop-blur-xl"
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

    <div
      class="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-7"
    >
      <div
        class="w-full max-w-[420px] rounded-[28px] p-[1px] shadow-[0_40px_110px_-60px_rgba(0,0,0,.35)] dark:shadow-[0_40px_110px_-60px_rgba(0,0,0,.75)]"
        :class="shake ? 'animate-shake' : ''"
        style="
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.35),
            rgba(217, 70, 239, 0.18),
            rgba(34, 211, 238, 0.18)
          );
        "
      >
        <div
          class="rounded-[27px] border border-black/10 bg-white/95 p-5 text-zinc-950 dark:border-white/10 dark:bg-zinc-950/95 dark:text-zinc-50"
        >
          <!-- header -->
          <div class="text-center">
            <div
              class="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[12px] text-zinc-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
            >
              <span
                class="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,.14)]"
              />
              <span>ServiceHub • ورود / ثبت‌نام</span>
            </div>

            <h1 class="mt-3 text-[26px] font-black tracking-tight">
              {{ mode === "login" ? "خوش اومدی 👋" : "شروع کنیم 🚀" }}
            </h1>

            <p
              class="mt-2 text-[13px] leading-7 text-zinc-600 dark:text-zinc-300/80"
            >
              {{ introText }}
            </p>
          </div>

          <!-- segmented -->
          <div
            class="relative mt-4 grid grid-cols-2 rounded-2xl bg-black/5 p-1 dark:bg-white/10"
          >
            <button
              type="button"
              class="relative z-10 rounded-xl py-2.5 text-sm font-extrabold transition-colors"
              :class="
                mode === 'login'
                  ? 'text-zinc-950 dark:text-zinc-50'
                  : 'text-zinc-600 dark:text-zinc-300/80'
              "
              @click="mode = 'login'"
            >
              ورود
            </button>

            <button
              type="button"
              class="relative z-10 rounded-xl py-2.5 text-sm font-extrabold transition-colors"
              :class="
                mode === 'register'
                  ? 'text-zinc-950 dark:text-zinc-50'
                  : 'text-zinc-600 dark:text-zinc-300/80'
              "
              @click="mode = 'register'"
            >
              ثبت‌نام
            </button>

            <span
              class="absolute inset-y-1 w-[calc(50%-8px)] rounded-xl border border-black/10 bg-white/95 shadow-sm backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)] dark:border-white/10 dark:bg-white/10"
              :class="
                mode === 'register' ? 'translate-x-[-100%]' : 'translate-x-0'
              "
              style="right: 4px"
            />
          </div>

          <!-- role -->
          <Transition name="soft">
            <div
              v-if="mode === 'register'"
              class="mt-3 grid grid-cols-2 gap-2.5"
            >
              <button
                type="button"
                class="rounded-2xl border px-3 py-3 text-right transition-transform active:scale-[0.99]"
                :class="
                  role === 'customer'
                    ? 'border-indigo-500/50 bg-indigo-500/10'
                    : 'border-black/10 bg-white/70 hover:-translate-y-[1px] dark:border-white/10 dark:bg-white/5'
                "
                @click="role = 'customer'"
              >
                <div class="text-base">👤</div>
                <div class="mt-1 font-black">مشتری</div>
                <div class="text-xs text-zinc-600 dark:text-zinc-300/70">
                  رزرو خدمات
                </div>
              </button>

              <button
                type="button"
                class="rounded-2xl border px-3 py-3 text-right transition-transform active:scale-[0.99]"
                :class="
                  role === 'provider'
                    ? 'border-indigo-500/50 bg-indigo-500/10'
                    : 'border-black/10 bg-white/70 hover:-translate-y-[1px] dark:border-white/10 dark:bg-white/5'
                "
                @click="role = 'provider'"
              >
                <div class="text-base">✂️</div>
                <div class="mt-1 font-black">ارائه‌دهنده</div>
                <div class="text-xs text-zinc-600 dark:text-zinc-300/70">
                  ثبت کسب‌وکار
                </div>
              </button>
            </div>
          </Transition>

          <!-- form / otp -->
          <div autocomplete="off" class="mt-3 grid gap-2.5">
            <!-- ====== FORM STEP ====== -->
            <template v-if="step === 'form'">
              <TransitionGroup name="stagger">
                <div v-if="mode === 'register'" key="name" class="relative">
                  <!-- (unchanged) name input -->
                  <input
                    v-model="form.name"
                    placeholder=" "
                    autocomplete="new-password"
                    class="peer w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3.5 text-sm text-zinc-950 outline-none transition focus:-translate-y-[1px] focus:border-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
                  />
                  <label
                    class="pointer-events-none absolute right-4 top-3.5 text-[12px] text-zinc-600 transition-all peer-focus:-top-2 peer-focus:right-3 peer-focus:rounded-full peer-focus:border peer-focus:border-black/10 peer-focus:bg-white/95 peer-focus:px-2 peer-focus:py-0.5 peer-focus:text-zinc-950 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:right-3 peer-[&:not(:placeholder-shown)]:rounded-full peer-[&:not(:placeholder-shown)]:border peer-[&:not(:placeholder-shown)]:border-black/10 peer-[&:not(:placeholder-shown)]:bg-white/95 peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:py-0.5 peer-[&:not(:placeholder-shown)]:text-zinc-950 dark:text-zinc-300/80 dark:peer-focus:border-white/10 dark:peer-focus:bg-zinc-950/95 dark:peer-focus:text-zinc-50 dark:peer-[&:not(:placeholder-shown)]:border-white/10 dark:peer-[&:not(:placeholder-shown)]:bg-zinc-950/95 dark:peer-[&:not(:placeholder-shown)]:text-zinc-50"
                  >
                    نام کامل
                  </label>
                </div>

                <div key="email" class="relative">
                  <!-- (unchanged) phone input -->
                  <input
                    v-model="form.phone"
                    placeholder=" "
                    autocomplete="new-password"
                    inputmode="tel"
                    class="peer w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3.5 text-sm text-zinc-950 outline-none transition focus:-translate-y-[1px] focus:border-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
                  />
                  <label
                    class="pointer-events-none absolute right-4 top-3.5 text-[12px] text-zinc-600 transition-all peer-focus:-top-2 peer-focus:right-3 peer-focus:rounded-full peer-focus:border peer-focus:border-black/10 peer-focus:bg-white/95 peer-focus:px-2 peer-focus:py-0.5 peer-focus:text-zinc-950 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:right-3 peer-[&:not(:placeholder-shown)]:rounded-full peer-[&:not(:placeholder-shown)]:border peer-[&:not(:placeholder-shown)]:border-black/10 peer-[&:not(:placeholder-shown)]:bg-white/95 peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:py-0.5 peer-[&:not(:placeholder-shown)]:text-zinc-950 dark:text-zinc-300/80 dark:peer-focus:border-white/10 dark:peer-focus:bg-zinc-950/95 dark:peer-focus:text-zinc-50 dark:peer-[&:not(:placeholder-shown)]:border-white/10 dark:peer-[&:not(:placeholder-shown)]:bg-zinc-950/95 dark:peer-[&:not(:placeholder-shown)]:text-zinc-50"
                  >
                    تلفن
                  </label>
                </div>

                <div key="password" class="relative">
                  <!-- (unchanged) password input -->
                  <input
                    v-model="form.password"
                    @keydown.enter="submit"
                    placeholder=" "
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    class="peer w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3.5 pl-12 text-sm text-zinc-950 outline-none transition focus:-translate-y-[1px] focus:border-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
                  />
                  <label
                    class="pointer-events-none absolute right-4 top-3.5 text-[12px] text-zinc-600 transition-all peer-focus:-top-2 peer-focus:right-3 peer-focus:rounded-full peer-focus:border peer-focus:border-black/10 peer-focus:bg-white/95 peer-focus:px-2 peer-focus:py-0.5 peer-focus:text-zinc-950 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:right-3 peer-[&:not(:placeholder-shown)]:rounded-full peer-[&:not(:placeholder-shown)]:border peer-[&:not(:placeholder-shown)]:border-black/10 peer-[&:not(:placeholder-shown)]:bg-white/95 peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:py-0.5 peer-[&:not(:placeholder-shown)]:text-zinc-950 dark:text-zinc-300/80 dark:peer-focus:border-white/10 dark:peer-focus:bg-zinc-950/95 dark:peer-focus:text-zinc-50 dark:peer-[&:not(:placeholder-shown)]:border-white/10 dark:peer-[&:not(:placeholder-shown)]:bg-zinc-950/95 dark:peer-[&:not(:placeholder-shown)]:text-zinc-50"
                  >
                    رمز عبور
                  </label>

                  <button
                    type="button"
                    class="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl border border-black/10 bg-black/5 text-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-white/10"
                    @click="showPassword = !showPassword"
                  >
                    {{ showPassword ? "🙈" : "👁️" }}
                  </button>
                </div>
              </TransitionGroup>

              <Transition name="soft">
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
                    >(حداقل ۸ کاراکتر + عدد/علامت بهتره)</span
                  >
                </div>
              </Transition>

              <button
                @click="submit"
                type="button"
                class="relative mt-1 w-full overflow-hidden rounded-2xl py-3.5 text-sm font-black text-white transition active:scale-[0.985] disabled:opacity-75"
                :disabled="isLoading"
                style="
                  background: linear-gradient(
                    135deg,
                    rgba(79, 70, 229, 1),
                    rgba(168, 85, 247, 0.95)
                  );
                "
              >
                <span class="submit-glow absolute inset-[-40%]" />
                <span
                  class="relative z-10 inline-flex items-center justify-center gap-2"
                >
                  <span v-if="!isLoading">{{
                    mode === "login" ? "ورود" : "ثبت‌نام"
                  }}</span>
                  <span v-else class="inline-flex items-center gap-2">
                    <span
                      class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    در حال انجام...
                  </span>
                </span>
              </button>

              <p
                class="mt-1 text-center text-[11px] text-zinc-600 dark:text-zinc-300/80"
              >
                با ادامه دادن، با
                <span class="font-black text-zinc-900 dark:text-zinc-50"
                  >قوانین و حریم خصوصی</span
                >
                موافقت می‌کنید.
              </p>

              <p class="text-center text-[11px] text-zinc-600 dark:text-zinc-300/80">
                رمز عبور را فراموش کرده‌اید؟
                <NuxtLink to="/auth/forgot-password" class="font-black text-primary-700 dark:text-primary-300">
                  بازیابی رمز
                </NuxtLink>
              </p>
            </template>

            <!-- ====== OTP STEP ====== -->
            <template v-else>
              <div
                class="rounded-2xl border border-black/10 bg-black/[0.03] px-3 py-2 text-center text-xs text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
              >
                کد تایید به
                <span class="font-black text-zinc-900 dark:text-zinc-50">{{
                  form.phone
                }}</span>
                ارسال شد.
              </div>

              <div class="relative mt-1">
                <input
                  v-model="otp.code"
                  placeholder=" "
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  class="peer w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3.5 text-sm text-zinc-950 outline-none transition focus:-translate-y-[1px] focus:border-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
                />
                <label
                  class="pointer-events-none absolute right-4 top-3.5 text-[12px] text-zinc-600 transition-all peer-focus:-top-2 peer-focus:right-3 peer-focus:rounded-full peer-focus:border peer-focus:border-black/10 peer-focus:bg-white/95 peer-focus:px-2 peer-focus:py-0.5 peer-focus:text-zinc-950 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:right-3 peer-[&:not(:placeholder-shown)]:rounded-full peer-[&:not(:placeholder-shown)]:border peer-[&:not(:placeholder-shown)]:border-black/10 peer-[&:not(:placeholder-shown)]:bg-white/95 peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:py-0.5 peer-[&:not(:placeholder-shown)]:text-zinc-950 dark:text-zinc-300/80 dark:peer-focus:border-white/10 dark:peer-focus:bg-zinc-950/95 dark:peer-focus:text-zinc-50 dark:peer-[&:not(:placeholder-shown)]:border-white/10 dark:peer-[&:not(:placeholder-shown)]:bg-zinc-950/95 dark:peer-[&:not(:placeholder-shown)]:text-zinc-50"
                >
                  کد تایید
                </label>
              </div>

              <button
                @click="verifyOtp"
                type="button"
                class="relative mt-1 w-full overflow-hidden rounded-2xl py-3.5 text-sm font-black text-white transition active:scale-[0.985] disabled:opacity-75"
                :disabled="isLoading"
                style="
                  background: linear-gradient(
                    135deg,
                    rgba(79, 70, 229, 1),
                    rgba(168, 85, 247, 0.95)
                  );
                "
              >
                <span class="submit-glow absolute inset-[-40%]" />
                <span
                  class="relative z-10 inline-flex items-center justify-center gap-2"
                >
                  <span v-if="!isLoading">تایید</span>
                  <span v-else class="inline-flex items-center gap-2">
                    <span
                      class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    در حال انجام...
                  </span>
                </span>
              </button>

              <div class="mt-2 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  class="rounded-2xl border border-black/10 bg-white/70 px-3 py-3 text-center text-xs font-black transition active:scale-[0.99] dark:border-white/10 dark:bg-white/5"
                  :disabled="isLoading"
                  @click="resendOtp"
                >
                  ارسال مجدد
                </button>

                <button
                  type="button"
                  class="rounded-2xl border border-black/10 bg-white/70 px-3 py-3 text-center text-xs font-black transition active:scale-[0.99] dark:border-white/10 dark:bg-white/5"
                  :disabled="isLoading"
                  @click="goBackToForm"
                >
                  تغییر شماره
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { siteCopy } from "~/constants/site";

definePageMeta({
  middleware: "guest-only",
  layout: "auth",
});

type Role = "customer" | "provider";
type Mode = "login" | "register";
type Step = "form" | "otp";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const STORAGE_KEY = "servicehub_auth_pref_v1";

const mode = ref<Mode>("login");
const role = ref<Role>("customer");
const step = ref<Step>("form");

const form = reactive({
  name: "",
  phone: "",
  password: "",
});

const otp = reactive({
  code: "",
});

const showPassword = ref(false);
const isLoading = ref(false);
const shake = ref(false);

// success overlay
const success = ref(false);
const successText = ref("");

const returnTo = computed(() => {
  const q = route.query.redirect;
  if (typeof q === "string" && q.startsWith("/")) return q;
  return "";
});

const introText = computed(() => {
  if (mode.value === "login") {
    return returnTo.value
      ? "با شماره موبایل و رمز عبور وارد شوید تا به همان صفحه برگردید. اگر تایید پیامکی فعال باشد، کد هم برایتان ارسال می‌شود."
      : siteCopy.authMethod;
  }

  return role.value === "provider"
    ? "برای حساب متخصص، شماره موبایل و رمز عبور را ثبت می‌کنید و در صورت نیاز، تایید پیامکی هم انجام می‌شود."
    : "برای ساخت حساب مشتری، شماره موبایل و رمز عبور را وارد می‌کنید و در بعضی حساب‌ها مرحله تایید پیامکی هم وجود دارد.";
});

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

function persistPref() {
  if (!import.meta.client) return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ mode: mode.value, role: role.value }),
  );
}
function loadPref() {
  if (!process.client) return;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.mode === "login" || parsed?.mode === "register")
      mode.value = parsed.mode;
    if (parsed?.role === "customer" || parsed?.role === "provider")
      role.value = parsed.role;
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
  await new Promise((r) => setTimeout(r, 650));
  await router.push(next);
}

function computeNext(authNext?: string) {
  if (returnTo.value) return returnTo.value;
  if (authNext) return authNext;
  return "/dashboard";
}

function normalizePhone(v: string) {
  return String(v || "").trim();
}

function mapRoleToBackend(r: Role): "user" | "provider" {
  return r === "provider" ? "provider" : "user";
}

onMounted(() => {
  loadPref();

  // deep link support
  if (route.query.role === "provider") {
    mode.value = "register";
    role.value = "provider";
  }

  persistPref();
});
watch([mode, role], () => {
  persistPref();
  // switching mode/role should reset otp step
  step.value = "form";
  otp.code = "";
});

function goBackToForm() {
  step.value = "form";
  otp.code = "";
}

async function submit() {
  const authStore = useAuthStore();

  const phone = normalizePhone(form.phone);
  const password = form.password || "";
  const name = String(form.name || "").trim();

  if (!phone || !password || (mode.value === "register" && !name)) {
    pulseError("لطفاً اطلاعات را کامل وارد کنید.");
    return;
  }

  isLoading.value = true;
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
    const res: any = await authStore.signupStart({
      full_name: name,
      phone,
      password,
      role: mapRoleToBackend(role.value),
    });

    if (!res?.ok) {
      pulseError(res?.message || "خطا در ثبت‌نام");
      return;
    }

    // If backend OTP is ON, store returns needsOtp=true
    if (res?.needsOtp) {
      step.value = "otp";
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

    successText.value =
      role.value === "provider" ? "ثبت‌نام موفق! بریم داشبورد 🚀" : "ثبت‌نام موفق ✨";

    await showSuccessThenGo(computeNext(authStore.next || "/dashboard"));
  } catch {
    pulseError("خطای غیرمنتظره رخ داد.");
  } finally {
    isLoading.value = false;
  }
}

async function verifyOtp() {
  const authStore = useAuthStore();
  const phone = normalizePhone(form.phone);
  const code = String(otp.code || "").trim();

  if (!phone || !code) {
    pulseError("کد تایید را وارد کنید.");
    return;
  }

  isLoading.value = true;
  try {
    const res: any = await authStore.verifyOtp({
      phone,
      code,
      purpose: mode.value === "register" ? "signup" : "login",
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
      mode.value === "register"
        ? role.value === "provider"
          ? "ثبت‌نام موفق! بریم داشبورد 🚀"
          : "ثبت‌نام موفق ✨"
        : "ورود موفق ✨";

    await showSuccessThenGo(computeNext(authStore.next || "/dashboard"));
  } catch {
    pulseError("خطای غیرمنتظره رخ داد.");
  } finally {
    isLoading.value = false;
  }
}

async function resendOtp() {
  // backend owns resend throttling; we just call the correct start endpoint again.
  const authStore = useAuthStore();
  const phone = normalizePhone(form.phone);
  const password = form.password || "";
  const name = String(form.name || "").trim();

  if (!phone) {
    pulseError("شماره تلفن را وارد کنید.");
    return;
  }

  isLoading.value = true;
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
        role: mapRoleToBackend(role.value),
      });
      if (!res?.ok) {
        pulseError(res?.message || "ارسال مجدد ناموفق بود");
        return;
      }
    }

    toast.add({
      title: "OTP",
      description: "کد تایید دوباره ارسال شد.",
      color: "primary",
    });
  } catch {
    pulseError("ارسال مجدد ناموفق بود.");
  } finally {
    isLoading.value = false;
  }
}
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
.success-enter-active,
.success-leave-active {
  transition: opacity 0.25s ease;
}
.success-enter-from,
.success-leave-to {
  opacity: 0;
}
.soft-enter-active,
.soft-leave-active {
  transition: all 0.28s ease;
}
.soft-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.soft-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.stagger-enter-active {
  transition: all 0.22s ease;
}
.stagger-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

/* button glow */
.submit-glow {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.35),
    transparent 40%
  );
  animation: shimmer 2.4s ease-in-out infinite;
}
@keyframes shimmer {
  0%,
  100% {
    transform: translateX(-6%) translateY(-4%);
    opacity: 0.7;
  }
  50% {
    transform: translateX(8%) translateY(6%);
    opacity: 1;
  }
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
  opacity: 0.9;
}
</style>
