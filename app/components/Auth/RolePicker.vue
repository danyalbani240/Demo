<template>
  <Transition name="soft">
    <div
      :dir="locale.code.value === 'en' ? 'ltr' : 'rtl'"
      class="mt-3 grid grid-cols-2 gap-2.5"
    >
      <button
        type="button"
        class="rounded-2xl border px-3 py-3 text-left rtl:text-right transition-transform active:scale-[0.99]"
        :class="
          role === 'customer'
            ? 'border-indigo-500/50 bg-indigo-500/10'
            : 'border-black/10 bg-white/70 hover:-translate-y-px dark:border-white/10 dark:bg-white/5'
        "
        @click="role = 'customer'"
      >
        <div class="text-base">👤</div>
        <div class="mt-1 font-black">
          {{ $t("auth.customer") }}
        </div>
        <div class="text-xs text-zinc-600 dark:text-zinc-300/70">
          {{ $t("auth.customer_desc") }}
        </div>
      </button>

      <button
        type="button"
        class="rounded-2xl border px-3 py-3 text-left rtl:text-right transition-transform active:scale-[0.99]"
        :class="
          role === 'provider'
            ? 'border-indigo-500/50 bg-indigo-500/10'
            : 'border-black/10 bg-white/70 hover:-translate-y-px dark:border-white/10 dark:bg-white/5'
        "
        @click="role = 'provider'"
      >
        <div class="text-base">✂️</div>
        <div class="mt-1 font-black">{{ $t("auth.provider") }}</div>
        <div class="text-xs text-zinc-600 dark:text-zinc-300/70">
          {{ $t("auth.provider_desc") }}
        </div>
      </button>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { useLocale } from "@nuxt/ui/runtime/composables/useLocale.js";

const locale = useLocale();
const role = defineModel<string>({
  default: "register",
});
</script>
