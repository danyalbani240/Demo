export function cleanQuery(query: Record<string, any>) {
  const cleaned: Record<string, any> = {};

  for (const key in query) {
    const value = query[key];
    if (
      value !== undefined &&
      value !== "" &&
      value !== null &&
      value !== false
    ) {
      cleaned[key] = value;
    }
  }

  return cleaned;
}
