import { defineEventHandler, getQuery, createError } from "h3";
import { backendFetch } from "../../utils/backendFetch";

export default defineEventHandler(async (event) => {
  const q: any = getQuery(event);
  const pid = String(q.pid ?? "").trim();
  if (!pid) throw createError({ statusCode: 400, statusMessage: "شناسه پرداخت الزامی است" });

  const trackId = q.trackId != null ? String(q.trackId).trim() : "";
  const success = q.success != null ? String(q.success).trim() : "";
  const status = q.status != null ? String(q.status).trim() : "";

  const qs = new URLSearchParams();
  qs.set("pid", pid);
  if (trackId) qs.set("trackId", trackId);
  if (success) qs.set("success", success);
  if (status) qs.set("status", status);

  return backendFetch(event, `/api/v1/payment/verify?${qs.toString()}`, {
    method: "GET",
  });
});
