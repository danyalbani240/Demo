<template>
  <div
    class="relative min-h-[100dvh] overflow-hidden bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-50"
  >
    <!-- soft background -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        class="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5"
      />
    </div>

    <div
      class="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-8"
    >
      <UCard
        class="w-full max-w-md rounded-[28px] border border-black/10 bg-white/95 p-5 shadow-xl dark:border-white/10 dark:bg-zinc-950/85"
      >
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-extrabold">تغییر رمز عبور</h1>
            <p class="mt-1 text-xs text-gray-600 dark:text-zinc-300/80">
              شماره موبایل + کد تایید + رمز جدید را وارد کنید.
            </p>
          </div>
          <UButton
            to="/auth"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            class="rounded-full"
          />
        </div>

        <div class="mt-4 grid gap-3">
          <UInput
            v-model="form.phone"
            inputmode="tel"
            placeholder="شماره موبایل"
            :disabled="loading || phoneLocked"
            class="rounded-2xl"
          />

          <UInput
            v-model="form.code"
            inputmode="numeric"
            placeholder="کد تایید"
            :disabled="loading"
            class="rounded-2xl"
          />

          <UInput
            v-model="form.newPassword"
            type="password"
            placeholder="رمز جدید (حداقل ۶ کاراکتر)"
            :disabled="loading"
            class="rounded-2xl"
          />

          <UInput
            v-model="form.confirm"
            type="password"
            placeholder="تکرار رمز جدید"
            :disabled="loading"
            class="rounded-2xl"
          />

          <UButton
            :loading="loading"
            :disabled="loading"
            class="w-full rounded-2xl"
            @click="submit"
          >
            تایید و تغییر رمز
          </UButton>

          <div class="flex items-center justify-between">
            <UButton
              variant="soft"
              icon="i-heroicons-paper-airplane"
              class="rounded-2xl"
              :disabled="loading || resendCooldown > 0"
              @click="resend"
            >
              {{
                resendCooldown > 0
                  ? `ارسال مجدد (${resendCooldown})`
                  : "ارسال مجدد کد"
              }}
            </UButton>

            <NuxtLink
              to="/auth/forgot-password"
              class="text-xs font-extrabold text-primary-700 dark:text-primary-300"
            >
              شروع دوباره
            </NuxtLink>
          </div>

          <UAlert v-if="errorMsg" color="error" variant="soft" class="mt-1">
            {{ errorMsg }}
          </UAlert>

          <UAlert v-if="successMsg" color="success" variant="soft" class="mt-1">
            {{ successMsg }}
          </UAlert>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });

const toast = useToast();
const router = useRouter();
const route = useRoute();

const form = reactive({
  phone: "",
  code: "",
  newPassword: "",
  confirm: "",
});

const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");
const resendCooldown = ref(0);
let resendTimer: any = null;

const phoneLocked = computed(() => Boolean(route.query.phone));

function normalizePhone(v: string) {
  return String(v || "").trim();
}
function isValidIranPhone(v: string) {
  return /^09\d{9}$/.test(normalizePhone(v));
}

onMounted(() => {
  const qPhone = String(route.query.phone || "").trim();
  if (qPhone) form.phone = qPhone;
});

function startCooldown(seconds: number) {
  resendCooldown.value = Math.max(0, Math.floor(seconds));
  if (resendTimer) clearInterval(resendTimer);
  resendTimer = setInterval(() => {
    resendCooldown.value -= 1;
    if (resendCooldown.value <= 0) {
      resendCooldown.value = 0;
      clearInterval(resendTimer);
      resendTimer = null;
    }
  }, 1000);
}

onBeforeUnmount(() => {
  if (resendTimer) clearInterval(resendTimer);
});

async function resend() {
  errorMsg.value = "";
  successMsg.value = "";
  const p = normalizePhone(form.phone);

  if (!isValidIranPhone(p)) {
    errorMsg.value = "شماره موبایل معتبر نیست";
    return;
  }

  loading.value = true;
  try {
    const res: any = await $fetch("/api/auth/password/forgot", {
      method: "POST",
      body: { phone: p },
    });

    if (!res?.success) {
      errorMsg.value = String(res?.message || "ارسال مجدد ناموفق بود");
      return;
    }

    toast.add({
      title: "کد ارسال شد",
      description: `کد تایید به ${p} ارسال شد.`,
      color: "success",
    });
    startCooldown(30);
  } catch (e: any) {
    errorMsg.value = String(
      e?.data?.message || e?.statusMessage || "ارسال مجدد ناموفق بود",
    );
  } finally {
    loading.value = false;
  }
}

async function submit() {
  errorMsg.value = "";
  successMsg.value = "";

  const p = normalizePhone(form.phone);
  const code = String(form.code || "").trim();
  const pass = String(form.newPassword || "");
  const confirm = String(form.confirm || "");

  if (!isValidIranPhone(p)) {
    errorMsg.value = "شماره موبایل معتبر نیست";
    return;
  }
  if (!code) {
    errorMsg.value = "کد تایید الزامی است";
    return;
  }
  if (pass.length < 6) {
    errorMsg.value = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    return;
  }
  if (pass !== confirm) {
    errorMsg.value = "تکرار رمز عبور با رمز جدید یکسان نیست";
    return;
  }

  loading.value = true;
  try {
    const res: any = await $fetch("/api/auth/password/reset", {
      method: "POST",
      body: { phone: p, code, new_password: pass },
    });

    if (!res?.success) {
      errorMsg.value = String(res?.message || "تغییر رمز ناموفق بود");
      return;
    }

    successMsg.value = "رمز عبور با موفقیت تغییر کرد.";
    toast.add({
      title: "انجام شد",
      description: "اکنون می‌توانید وارد شوید.",
      color: "success",
    });

    await new Promise((r) => setTimeout(r, 600));
    await router.push("/auth");
  } catch (e: any) {
    errorMsg.value = String(
      e?.data?.message || e?.statusMessage || "تغییر رمز ناموفق بود",
    );
  } finally {
    loading.value = false;
  }
}
</script>
