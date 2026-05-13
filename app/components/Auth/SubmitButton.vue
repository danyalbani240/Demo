<template>
  <button
    type="button"
    :disabled="loading"
    @click="$emit('click')"
    class="relative mt-1 w-full overflow-hidden rounded-2xl py-3.5 text-sm font-black text-white transition active:scale-[0.985] disabled:opacity-75"
    style="
      background: linear-gradient(
        135deg,
        rgba(79, 70, 229, 1),
        rgba(168, 85, 247, 0.95)
      );
    "
  >
    <span class="submit-glow absolute inset-[-40%]" />

    <span class="relative z-10 inline-flex items-center justify-center gap-2">
      <span v-if="!loading">
        {{ text }}
      </span>

      <span v-else class="inline-flex items-center gap-2">
        <span
          class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        />

        {{ $t("auth.submit_loading") }}
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  loading: Boolean,
  text: String,
});

defineEmits(["click"]);
</script>

<style scoped>
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
</style>
