<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div class="w-full flex justify-center items-center flex-column text-xl flex-col  h-screen">
    <h1 style="font-size: 50px;" class="text-bold "> {{ error?.statusCode }}</h1>
    <h2 class="my-4">{{ error?.message }}</h2>
    <UButton size="xl" to="/">بازگشت به صفحه اصلی</UButton>
  </div>
</template>
