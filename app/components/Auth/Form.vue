<template>
  <TransitionGroup name="stagger">
    <div v-if="form.mode === 'register'" key="name" class="relative">
      <AuthInput :label="$t('auth.full_name')" v-model="form.name" />
    </div>

    <div key="email" class="relative">
      <AuthInput :label="$t('auth.phone')" v-model="form.phone" />
    </div>
    <div key="password" class="relative">
      <AuthPasswordInput v-model="form.password" />
    </div>
  </TransitionGroup>

  <AuthSubmitButton
    :loading="isLoading"
    :text="form.mode === 'login' ? $t('auth.login') : $t('auth.register')"
    @click="$emit('submit')"
  />
  <p class="mt-1 text-center text-[11px] text-zinc-600 dark:text-zinc-300/80">
    {{ $t("auth.terms_text") }}
  </p>

  <p class="text-center text-[11px] text-zinc-600 dark:text-zinc-300/80">
    {{ $t("auth.forgot_password") }}
    <NuxtLink
      to="/auth/forgot-password"
      class="font-black text-primary-700 dark:text-primary-300"
    >
      {{ $t("auth.recover_password") }}
    </NuxtLink>
  </p>
</template>

<script lang="ts" setup>
const props = defineProps({
  form: { type: Object, required: true },
  isLoading: { type: Boolean, default: false },
});

const emit = defineEmits(["update:form", "submit"]);
</script>

<style scoped>
.stagger-enter-active {
  transition: all 0.22s ease;
}
.stagger-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
</style>
