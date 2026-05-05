export default defineEventHandler((event) => {
  return backendFetch(event, "/api/v1/auth/logout", { method: "POST" });
});
