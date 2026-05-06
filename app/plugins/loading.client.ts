export default defineNuxtPlugin((nuxtApp) => {
  const loader = useLoader();

  nuxtApp.hook("page:start", () => {
    loader.show();
  });

  nuxtApp.hook("page:finish", () => {
    if (document.readyState === "complete") {
      loader.hide();
    } else {
      window.addEventListener("load", () => loader.hide(), { once: true });
    }
  });
});
