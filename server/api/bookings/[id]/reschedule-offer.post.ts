import { defineEventHandler, getRouterParam, readBody, createError } from "h3";
import { backendFetch } from "~~/server/utils/backendFetch";

export default defineEventHandler(async (event) => {
  const id = String(getRouterParam(event, "id") ?? "").trim();
  if (!id) throw createError({ statusCode: 400, statusMessage: "شناسه رزرو الزامی است" });

  const body = (await readBody(event)) || {};
  return backendFetch(event, `/api/v1/bookings/${encodeURIComponent(id)}/reschedule-offer`, {
    method: "POST",
    body,
  });
});
