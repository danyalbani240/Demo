export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore();

  if (!auth.ready && !auth.initializing) {
    await auth.init();
  }

  if (auth.isAuthed) return navigateTo(auth.next || "/dashboard");
});
