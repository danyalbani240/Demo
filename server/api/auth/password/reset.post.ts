export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return backendFetch(event, "/api/v1/auth/password/reset", {
    method: "POST",
    body,
  });
});