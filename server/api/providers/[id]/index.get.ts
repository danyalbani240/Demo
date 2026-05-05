export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const query = getQuery(event);
  
  const queryString = query.include ? `?include=${encodeURIComponent(String(query.include))}` : "";
  
  return backendFetch(event, `/api/v1/providers/${id}${queryString}`, { method: "GET" });
});