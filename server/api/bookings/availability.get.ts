// app/server/api/bookings/availability.get.ts
export default defineEventHandler((event) => {
  const query = getQuery(event);

  return backendFetch(event, "/api/v1/bookings/availability", {
    method: "GET",
    query, // ✅ forward providerId/serviceId/dateKey
  });
});
