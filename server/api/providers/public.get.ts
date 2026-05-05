// IMPORTANT:
// This file is a thin proxy to backend.
// Do NOT add business logic here.

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = String(query.id || "");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "شناسه ارائه‌دهنده الزامی است",
    });
  }

  // Map to existing backend provider endpoint
  return backendFetch(event, `/api/v1/providers/${id}`, { 
    method: "GET" 
  });
});
