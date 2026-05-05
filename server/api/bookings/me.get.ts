import { defineEventHandler, getQuery, createError } from "h3";
import { backendFetch } from "~~/server/utils/backendFetch";

export default defineEventHandler(async (event) => {
  const q = getQuery(event);

  const page = String(q.page ?? "1").trim();
  const limit = String(q.limit ?? "20").trim();

  return backendFetch(event, `/api/v1/auth/me/bookings?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`, {
    method: "GET",
  });
});
