// plugins/00-auth-init.ts
import { getRequestHeader } from "h3";

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  if (auth.ready || auth.initializing) return;

  auth.initializing = true;
  try {
    // ✅ IMPORTANT: get the incoming request event during SSR
    const event = useRequestEvent();

    // ✅ Forward browser cookies to the internal /api call
    const cookie = event ? getRequestHeader(event, "cookie") : "";

    const { data } = await useAsyncData("auth_me", () =>
      $fetch("/api/auth/me", {
        method: "GET",
        headers: cookie ? { cookie } : undefined,
      })
    );

    const res: any = data.value;

    if (res?.success) {
      auth.user = res.data?.user ?? null;
      auth.next = res.data?.next ?? "";
    } else {
      auth.user = null;
      auth.next = "";
    }
  } catch {
    auth.user = null;
    auth.next = "";
  } finally {
    auth.ready = true;
    auth.initializing = false;
  }
});
