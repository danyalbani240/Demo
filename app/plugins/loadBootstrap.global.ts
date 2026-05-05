export default defineNuxtPlugin(async () => {
    let bootStrapStore = useBootstrapStore();
    await bootStrapStore.fetchBootstrap()
});