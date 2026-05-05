export default defineEventHandler((event) => {
  return backendFetch(event, "/api/v1/info/cities", { method: "GET" });
});
