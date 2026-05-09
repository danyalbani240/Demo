<template>
  <Transition name="fade">
    <div v-show="visible" class="loader-overlay fixed h-screen w-screen">
      <div class="loader-box">
        <div class="ring"></div>
        <p class="message">ئەمە وەشانی دیمۆیە — ببورە بۆ خاوێنی</p>
        <p class="message">این یک نسخه دمو است — بابت کندی پوزش می‌خواهیم</p>
        <p class="message">This is a demo — sorry for the slowness</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { visible } = useLoader();
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: white;
  text-align: center;
}

.ring {
  width: 70px;
  height: 70px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #00dc82;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.message {
  font-size: 20px;
  max-width: 340px;
  opacity: 0.9;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
