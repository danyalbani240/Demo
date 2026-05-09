import type { AuthFormState } from "./useAuthFlow";

const STORAGE_KEY = "servicehub_auth_pref_v1";

export function useAuthPersistence(form: AuthFormState) {
  const route = useRoute();

  function persistPref() {
    if (!import.meta.client) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        mode: form.mode,
        role: form.role,
      }),
    );
  }

  function loadPref() {
    if (!import.meta.client) return;

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      if (parsed?.mode === "login" || parsed?.mode === "register") {
        form.mode = parsed.mode;
      }

      if (parsed?.role === "customer" || parsed?.role === "provider") {
        form.role = parsed.role;
      }
    } catch {}
  }

  onMounted(() => {
    loadPref();

    if (route.query.role === "provider") {
      form.mode = "register";
      form.role = "provider";
    }

    persistPref();
  });

  watch(() => [form.mode, form.role], persistPref);
}
