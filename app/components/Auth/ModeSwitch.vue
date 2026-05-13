<template>
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
      {{ $t("auth.login") }}
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
      {{ $t("auth.register") }}
    </button>

    <span
      class="absolute inset-y-1 w-[calc(50%-8px)] rounded-xl border border-black/10 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] dark:border-white/10 dark:bg-white/10 start-[4px]"
      :class="mode === 'register' ? 'start-[calc(50%+4px)]' : 'start-[4px]'"
    />
  </div>
</template>
<script setup lang="ts">
const mode = defineModel<string>({
  default: "register",
});
</script>
