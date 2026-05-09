export function getClientIp(event: any) {
  const xff = getRequestHeader(event, "x-forwarded-for");
  if (xff && !!xff) return String(xff)?.split(",")[0]?.trim();
  const xri = getRequestHeader(event, "x-real-ip");
  if (xri) return String(xri).trim();
  // fallback (may be empty in some deployments)
  // @ts-ignore
  return (event?.node?.req?.socket?.remoteAddress as string) || "unknown";
}
