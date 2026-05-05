<template>
  <div class="space-y-3">
    <div>
      <label
        for="discount-code"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        کد تخفیف
      </label>

      <div class="flex gap-2">
        <div class="flex-1 relative">
          <UInput
            id="discount-code"
            v-model="discountCode"
            size="lg"
            placeholder="مثال: SAVE200"
            :disabled="loading"
            class="rounded-xl"
          />

          <UButton
            v-if="discountCode.trim() && !loading"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark"
            class="absolute left-2 top-1/2 -translate-y-1/2"
            @click="discountCode = ''"
          />
        </div>

        <UButton
          :loading="loading"
          :disabled="!discountCode.trim() || loading"
          class="rounded-xl bg-blue-600 text-white px-6"
          @click="emit('apply')"
        >
          اعمال
        </UButton>
      </div>
    </div>

    <!-- States -->
    <p v-if="loading" class="text-sm flex items-center gap-2">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
      در حال محاسبه مبلغ...
    </p>

    <div
      v-else-if="discountAmount > 0"
      class="text-sm text-emerald-600 bg-emerald-50 rounded-lg p-3 flex gap-2"
    >
      <UIcon name="i-heroicons-check-circle" />
      <p class="text-xs mt-1">
        تخفیف: {{ formatPrice(String(discountAmount)) }} تومان
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Todo : remove in demo complete in dev
import { formatPrice } from "#imports";
defineProps<{
  loading: boolean;
  discountAmount: number;
}>();
const discountCode = defineModel<string>({
  default: () => "",
});

const emit = defineEmits(["update:discountCode", "apply", "clear"]);
</script>
