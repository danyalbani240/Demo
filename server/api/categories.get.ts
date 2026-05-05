export default defineEventHandler((event) => {
  return backendFetch(event, "/api/v1/categories", { method: "GET" });
});
