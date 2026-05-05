export default defineNuxtRouteMiddleware(async (to) => {
  const path = String(to.path || "").toLowerCase();
  if (!to.path.startsWith("/dashboard")) return;

  if (path === "/dashboard/setup") return;
  if (path === "/dashboard/profile") return;
  if (path.includes("defaultdayconfig")) return;
  if (path.includes("/dashboard/services")) return;

  const authStore = useAuthStore();

  if (!authStore.ready && !authStore.initializing) {
    await authStore.init();
  }

  if (!authStore.isAuthed) return;

  const isSetupCompleted = authStore.user?.onboarding === "complete";
  if (!isSetupCompleted) {
    return navigateTo({
      path: "/dashboard/setup",
      query: { next: to.fullPath, reason: "setup_required" },
    });
  }
});
