export default defineNuxtPlugin(async () => {
  let bootStrapStore = useBootstrapStore();
  const auth = useAuthStore();
  try {
    await bootStrapStore.fetchBootstrap();
    if (auth.ready || auth.initializing) return;
    await auth.init();
  } catch (e) {
    console.log(e);
  }
});
