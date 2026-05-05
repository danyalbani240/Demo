export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (!auth.ready && !auth.initializing) {
    await auth.init();
  }

  if (!auth.isAuthed) {
    return navigateTo(`/auth?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
