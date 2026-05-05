export default defineEventHandler((event) => {
  // forward all search params to backend exactly as received
  const query = getQuery(event);
  let res = backendFetch(event, "/api/v1/providers/search", {
    method: "GET",
    query,
  });
  return  res;
});
