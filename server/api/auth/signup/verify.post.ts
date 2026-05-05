export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return backendFetch(event, "/api/v1/auth/signup/verify", { method: "POST", body });
});
