import { type H3Event, getRequestHeader } from "h3";
import { appendResponseHeader } from "h3";

function getSetCookieHeaders(headers: Headers): string[] {
  // Node 18 fetch: may support getSetCookie()
  const anyHeaders = headers as any;
  if (typeof anyHeaders.getSetCookie === "function") {
    return anyHeaders.getSetCookie() as string[];
  }

  const single = headers.get("set-cookie");
  if (!single) return [];

  // If your backend only sets one cookie, this is fine.
  // If it sets multiple, they might be merged and hard to split correctly.
  // Still return as one header to avoid corrupting it by naive splitting.
  return [single];
}

/**
 * Safe backend fetch that handles error responses properly
 * ALWAYS uses ignoreResponseError: true to prevent unhandled errors
 * Returns error data instead of throwing on HTTP errors
 */
export async function backendFetch<T = any>(
  event: H3Event,
  path: string,
  opts: Parameters<typeof $fetch<T>>[1] = {},
): Promise<T> {
  const config = useRuntimeConfig();
  const baseURL = config.public.backendBaseURL as string;
  const timeoutMs = Number(process.env.NUXT_BACKEND_FETCH_TIMEOUT_MS || 8000);

  const cookie = getRequestHeader(event, "cookie") || "";

  try {
    const res = await $fetch.raw<T>(path, {
      baseURL,
      // CRITICAL: Always ignore response errors to return proper error messages
      ignoreResponseError: true,
      retry: 0,
      timeout: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 8000,
      ...opts,
      headers: {
        ...(opts.headers as any),
        ...(cookie ? { cookie } : {}),
      },
    });

    const setCookies = getSetCookieHeaders(res.headers);
    if (setCookies.length) {
      // If multiple cookies, set as an array so h3 sends multiple headers

      for (const c of setCookies){
         appendResponseHeader(event, "set-cookie", c)
      };
    }

    return res._data as T;
  } catch (error: any) {
    // If there's a network error or other issue, throw it
    if (error.name === 'FetchError' || !error.response) {
      throw error;
    }
    
    // For HTTP errors, return the error data
    return error.response._data as T;
  }
}

/**
 * @deprecated Use backendFetch instead - this function ensures proper error handling
 * This is kept for backward compatibility but should not be used directly
 */
export async function unsafeBackendFetch<T = any>(
  event: H3Event,
  path: string,
  opts: Parameters<typeof $fetch<T>>[1] = {},
): Promise<T> {
  console.warn('⚠️ unsafeBackendFetch is deprecated - use backendFetch instead');
  return backendFetch<T>(event, path, opts);
}
