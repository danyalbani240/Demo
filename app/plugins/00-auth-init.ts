export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  if (auth.ready || auth.initializing) return;
  try {
    await auth.init();
  } catch (e) {
    console.log(e);
  }
});
