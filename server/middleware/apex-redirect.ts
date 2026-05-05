export default defineEventHandler((event) => {
  if (import.meta.dev) return;

  const host = getRequestHost(event, { xForwardedHost: true });
  if (host !== "service-hub.ir") return;

  const protocol = getRequestProtocol(event, { xForwardedProto: true }) || "https";
  const url = getRequestURL(event);
  const target = `${protocol}://www.service-hub.ir${url.pathname}${url.search}`;

  return sendRedirect(event, target, 301);
});
