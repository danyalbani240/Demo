// IMPORTANT:
// This file is a thin proxy to backend.
// Do NOT add business logic here.

export default defineEventHandler(async (event) => {
  const { id: providerId } = event.context.params as { id: string };
  const body = await readBody(event);

  if (!providerId) {
    throw createError({ statusCode: 400, statusMessage: "شناسه ارائه‌دهنده الزامی است" });
  }

  // Map to backend provider service creation endpoint
  return backendFetch(event, `/api/v1/providers/${providerId}/services`, {
    method: "POST",
    body
  });
});
