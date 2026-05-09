<template>
  <Transition name="soft">
    <div class="mt-3 grid grid-cols-2 gap-2.5">
      <button
        type="button"
        class="rounded-2xl border px-3 py-3 text-right transition-transform active:scale-[0.99]"
        :class="
          role === 'customer'
            ? 'border-indigo-500/50 bg-indigo-500/10'
            : 'border-black/10 bg-white/70 hover:-translate-y-px dark:border-white/10 dark:bg-white/5'
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
            : 'border-black/10 bg-white/70 hover:-translate-y-px dark:border-white/10 dark:bg-white/5'
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
</template>
<script setup lang="ts">
const role = defineModel<string>({
  default: "register",
});
</script>
