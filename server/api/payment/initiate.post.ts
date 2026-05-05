import { defineEventHandler, readBody, createError } from "h3";
import { backendFetch } from "../../utils/backendFetch";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const providerId = String(body?.providerId ?? "").trim();
  const rawServiceIds = Array.isArray(body?.serviceIds)
    ? body.serviceIds
    : String(body?.serviceIds || body?.serviceId || "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
  const serviceIds = Array.from(new Set(rawServiceIds.map((id: any) => String(id).trim()).filter(Boolean)));
  const startAt = String(body?.startAt ?? "").trim();
  const note = body?.note ? String(body.note).trim() : "";
  const discountCode = body?.discountCode ? String(body.discountCode).trim() : "";

  if (!providerId || serviceIds.length === 0 || !startAt) {
    throw createError({ statusCode: 400, statusMessage: "پارامترهای ورودی نامعتبر است" });
  }

  return backendFetch(event, "/api/v1/payment/initiate", {
    method: "POST",
    body: {
      providerId,
      serviceIds,
      startAt,
      note,
      ...(discountCode ? { discountCode } : {}),
    },
  });
});
