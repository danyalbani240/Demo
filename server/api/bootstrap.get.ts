export default defineEventHandler((event) => {
  return backendFetch(event, "/api/v1/bootstrap", { method: "GET" });
});
