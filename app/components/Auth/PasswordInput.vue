<template>
  <div key="password" class="relative">
    <input
      v-model="model"
      placeholder=" "
      :type="showPassword ? 'text' : 'password'"
      autocomplete="new-password"
      class="peer w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3.5 pl-12 text-sm text-zinc-950 outline-none transition focus:-translate-y-px focus:border-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
    />
    <label
      class="pointer-events-none absolute right-4 top-3.5 text-[12px] text-zinc-600 transition-all peer-focus:-top-2 peer-focus:right-3 peer-focus:rounded-full peer-focus:border peer-focus:border-black/10 peer-focus:bg-white/95 peer-focus:px-2 peer-focus:py-0.5 peer-focus:text-zinc-950 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:right-3 peer-[:not(:placeholder-shown)]:rounded-full peer-[:not(:placeholder-shown)]:border peer-[:not(:placeholder-shown)]:border-black/10 peer-[:not(:placeholder-shown)]:bg-white/95 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:py-0.5 peer-[:not(:placeholder-shown)]:text-zinc-950 dark:text-zinc-300/80 dark:peer-focus:border-white/10 dark:peer-focus:bg-zinc-950/95 dark:peer-focus:text-zinc-50 dark:peer-[:not(:placeholder-shown)]:border-white/10 dark:peer-[:not(:placeholder-shown)]:bg-zinc-950/95 dark:peer-[:not(:placeholder-shown)]:text-zinc-50"
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
  <Transition name="soft">
    <div
      v-if="model"
      class="rounded-xl border border-black/10 bg-black/3 px-3 py-2 text-center text-xs text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 mt-3"
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
      <span class="opacity-80">(حداقل ۸ کاراکتر + عدد/علامت بهتره)</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { getPasswordStrength } from "~/utils/auth/passwordStrength";

const model = defineModel<string>();
const showPassword = ref(false);
const passwordStrength = computed(() => getPasswordStrength(model.value ?? ""));

defineProps({
  label: String,
  type: { type: String, default: "text" },
  placeholder: { type: String, default: " " },
  inputmode: String,
  autocomplete: String,
});
</script>

<style>
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
</style>
