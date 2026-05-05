import { backendFetch } from "../../utils/backendFetch";
import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const res = await backendFetch(event, "/api/v1/auth/me", { method: "GET" });
  return res;
});
