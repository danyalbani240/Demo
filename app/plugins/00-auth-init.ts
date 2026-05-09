export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  if (auth.ready || auth.initializing) return;
  await auth.init();
});
