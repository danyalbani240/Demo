<template>
  <TransitionGroup name="stagger">
    <div v-if="form.mode === 'register'" key="name" class="relative">
      <AuthInput label="نام کامل" v-model="form.name" />
    </div>

    <div key="email" class="relative">
      <AuthInput label="تلفن" v-model="form.phone" />
    </div>

    <AuthPasswordInput v-model="form.password" />
  </TransitionGroup>

  <AuthSubmitButton
    :loading="isLoading"
    :text="form.mode === 'login' ? 'ورود' : 'ثبت‌نام'"
    @click="$emit('submit')"
  />
  <p class="mt-1 text-center text-[11px] text-zinc-600 dark:text-zinc-300/80">
    با ادامه دادن، با
    <span class="font-black text-zinc-900 dark:text-zinc-50"
      >قوانین و حریم خصوصی</span
    >
    موافقت می‌کنید.
  </p>

  <p class="text-center text-[11px] text-zinc-600 dark:text-zinc-300/80">
    رمز عبور را فراموش کرده‌اید؟
    <NuxtLink
      to="/auth/forgot-password"
      class="font-black text-primary-700 dark:text-primary-300"
    >
      بازیابی رمز
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
