export default defineEventHandler((event) => {
  const providerId = getRouterParam(event, "providerId");
  return backendFetch(event, `/api/v1/provider-samples/${providerId}`, { method: "GET" });
});
