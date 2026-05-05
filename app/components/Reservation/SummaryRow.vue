<template>
  <div class="flex justify-between gap-3">
    <span :class="bold ? 'font-bold' : 'font-semibold'">{{ label }}</span>
    <span class="text-slate-300">
      {{ value || "—" }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  value?: string;
  bold?: boolean;
}>();
</script>
