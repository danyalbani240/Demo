<template>
  <Transition name="success">
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
const props = defineProps<{ success: boolean; successText: string }>();
</script>

<style scoped>
/* success burst */
.success-enter-active,
.success-leave-active {
  transition: opacity 0.25s ease;
}
.success-enter-from,
.success-leave-to {
  opacity: 0;
}
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
