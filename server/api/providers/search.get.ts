export default defineEventHandler(async (event) => {
  // forward all search params to backend exactly as received
  const query = getQuery(event);
  let res = await backendFetch(event, "/api/v1/providers/search", {
    method: "GET",
    query,
  });
  return res;
});
