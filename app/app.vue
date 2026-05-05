<template>
  <UApp>
    <NuxtLayout />

  </UApp>
  
</template>
<script setup>
import { useDarkMode } from "~/composables/useDarkMode";
const { locale, localeProperties } = useI18n()
useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    dir: localeProperties.value.dir || 'rtl'
  },
  meta: [
    { name: "theme-color", content: "#10b981" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "apple-mobile-web-app-title", content: "سرویس‌ هاب" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
  ],
  link: [{ rel: "apple-touch-icon", href: "/pwa/apple-touch-icon.png" }],
}));
const { initDarkMode } = useDarkMode();

onMounted(() => {
  initDarkMode();
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<!--  
1- we have the page after login 

this page includes categories of services that people can choose from 
and now i am thinking i should think about the data


so first i am gonna create a login page using nuxt ui so i can keep my hands ready


and before login we also have some kind of data which shows user what we provide 





-->
