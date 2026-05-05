import { ref, onMounted } from "vue";

export const useDarkMode = () => {
  const isDark = ref(false);

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("darkMode", "true");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
      }
    }
  };

  const initDarkMode = () => {
    if (!process.client) return;

    const stored = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    isDark.value = stored === "true" || (stored === null && prefersDark);

    if (isDark.value) {
      document.documentElement.classList.add("dark");
    }
  };

  onMounted(() => {
    initDarkMode();
  });

  return { isDark, toggleDarkMode, initDarkMode };
};
