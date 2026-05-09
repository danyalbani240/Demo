export default defineNuxtPlugin(async () => {
  let bootStrapStore = useBootstrapStore();
  try {
    await bootStrapStore.fetchBootstrap();
  } catch (e) {
    console.log(e);
  }
});
