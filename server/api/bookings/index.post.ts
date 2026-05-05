export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return backendFetch(event, "/api/v1/bookings", { method: "POST", body });
});
