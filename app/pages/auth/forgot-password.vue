<template>
  <div
    class="relative min-h-[100dvh] overflow-hidden bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-50"
  >
    <!-- soft background -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl"
      />
      <div
        class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl"
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
            <h1 class="text-xl font-extrabold">بازیابی رمز عبور</h1>
            <p class="mt-1 text-xs text-gray-600 dark:text-zinc-300/80">
              شماره موبایل را وارد کنید تا کد تایید ارسال شود.
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
            v-model="phone"
            inputmode="tel"
            placeholder="مثلاً 09123456789"
            :disabled="loading"
            class="rounded-2xl"
          />

          <UButton
            :loading="loading"
            :disabled="loading"
            class="w-full rounded-2xl"
            @click="submit"
          >
            ارسال کد تایید
          </UButton>

          <UAlert v-if="errorMsg" color="error" variant="soft" class="mt-1">
            {{ errorMsg }}
          </UAlert>

          <div
            class="mt-1 text-center text-xs text-gray-600 dark:text-zinc-300/80"
          >
            کد را دریافت کردید؟
            <NuxtLink
              to="/auth/reset-password"
              class="font-extrabold text-primary-700 dark:text-primary-300"
            >
              تغییر رمز
            </NuxtLink>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });

const toast = useToast();
const router = useRouter();

const phone = ref("");
const loading = ref(false);
const errorMsg = ref("");

function normalizePhone(v: string) {
  return String(v || "").trim();
}
function isValidIranPhone(v: string) {
  return /^09\d{9}$/.test(normalizePhone(v));
}

async function submit() {
  errorMsg.value = "";
  const p = normalizePhone(phone.value);

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
      errorMsg.value = String(res?.message || "ارسال کد ناموفق بود");
      return;
    }

    toast.add({
      title: "کد ارسال شد",
      description: `کد تایید به ${p} ارسال شد.`,
      color: "success",
    });

    await router.push({ path: "/auth/reset-password", query: { phone: p } });
  } catch (e: any) {
    errorMsg.value = String(
      e?.data?.message || e?.statusMessage || "ارسال کد ناموفق بود",
    );
  } finally {
    loading.value = false;
  }
}
</script>
