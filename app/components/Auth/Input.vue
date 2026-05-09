<template>
  <div class="relative">
    <input
      :inputmode="inputmode"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="peer w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3.5 text-sm text-zinc-950 outline-none transition focus:-translate-y-px focus:border-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
    />
    <label
      class="pointer-events-none absolute right-4 top-3.5 text-[12px] text-zinc-600 transition-all peer-focus:-top-2 peer-focus:right-3 peer-focus:rounded-full peer-focus:border peer-focus:border-black/10 peer-focus:bg-white/95 peer-focus:px-2 peer-focus:py-0.5 peer-focus:text-zinc-950 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:right-3 peer-[:not(:placeholder-shown)]:rounded-full peer-[:not(:placeholder-shown)]:border peer-[:not(:placeholder-shown)]:border-black/10 peer-[:not(:placeholder-shown)]:bg-white/95 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:py-0.5 peer-[:not(:placeholder-shown)]:text-zinc-950 dark:text-zinc-300/80 dark:peer-focus:border-white/10 dark:peer-focus:bg-zinc-950/95 dark:peer-focus:text-zinc-50 dark:peer-[:not(:placeholder-shown)]:border-white/10 dark:peer-[:not(:placeholder-shown)]:bg-zinc-950/95 dark:peer-[:not(:placeholder-shown)]:text-zinc-50"
      >{{ label }}</label
    >

    <slot />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>();

defineProps({
  label: String,
  type: { type: String, default: "text" },
  placeholder: { type: String, default: " " },
  inputmode: String,
  autocomplete: String,
});
</script>
