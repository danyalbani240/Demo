export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  return backendFetch(event, `/api/v1/providers/${id}/services`, { method: "GET" });
});
