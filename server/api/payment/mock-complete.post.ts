import { defineEventHandler, readBody, createError } from "h3";
import { backendFetch } from "../../utils/backendFetch";

type Result = "success" | "cancel";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pid = String(body?.pid ?? "").trim();
  const result = String(body?.result ?? "").trim() as Result;

  if (!pid) throw createError({ statusCode: 400, statusMessage: "شناسه پرداخت الزامی است" });
  if (!["success", "cancel"].includes(result)) {
    throw createError({ statusCode: 400, statusMessage: "نتیجه پرداخت نامعتبر است" });
  }

  return backendFetch(event, "/api/v1/payment/mock/complete", {
    method: "POST",
    body: { pid, result },
  });
});