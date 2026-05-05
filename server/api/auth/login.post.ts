// IMPORTANT:
// This file is a thin proxy to backend.
// Do NOT add business logic here.

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await backendFetch(event, "/api/v1/auth/login", { 
    method: "POST",
    body 
  });
});
