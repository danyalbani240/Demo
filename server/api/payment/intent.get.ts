import { defineEventHandler, getQuery, createError } from "h3";
import { backendFetch } from "../../utils/backendFetch";

export default defineEventHandler(async (event) => {
  const pid = String(getQuery(event).pid ?? "").trim();
  if (!pid) throw createError({ statusCode: 400, statusMessage: "شناسه پرداخت الزامی است" });

  return backendFetch(
    event,
    `/api/v1/payment/intent?pid=${encodeURIComponent(pid)}`,
    { method: "GET" },
  );
});
