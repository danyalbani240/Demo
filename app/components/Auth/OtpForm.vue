<template>
  <div
    class="rounded-2xl border border-black/10 bg-black/3 px-3 py-2 text-center text-xs text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
  >
    {{ $t("auth.otp_sent") }}

    <span class="font-black text-zinc-900 dark:text-zinc-50">
      {{ phone }}
    </span>
  </div>

  <div class="mt-1">
    <AuthInput
      v-model="otp"
      :label="$t('auth.verify')"
      inputmode="numeric"
      autocomplete="one-time-code"
    />
  </div>

  <AuthSubmitButton
    :text="$t('auth.verify')"
    :loading="isLoading"
    @click="$emit('verify')"
  />

  <div class="mt-2 grid grid-cols-2 gap-2.5">
    <button
      type="button"
      :disabled="isLoading"
      @click="$emit('resend')"
      class="rounded-2xl border border-black/10 bg-white/70 px-3 py-3 text-center text-xs font-black transition active:scale-[0.99] dark:border-white/10 dark:bg-white/5"
    >
      {{ $t("auth.resend") }}
    </button>

    <button
      type="button"
      :disabled="isLoading"
      @click="$emit('back')"
      class="rounded-2xl border border-black/10 bg-white/70 px-3 py-3 text-center text-xs font-black transition active:scale-[0.99] dark:border-white/10 dark:bg-white/5"
    >
      {{ $t("auth.change_number") }}
    </button>
  </div>
</template>

<script setup lang="ts">
const otp = defineModel<string>("otp");

defineProps({
  phone: String,
  isLoading: Boolean,
});

defineEmits(["verify", "resend", "back"]);
</script>
