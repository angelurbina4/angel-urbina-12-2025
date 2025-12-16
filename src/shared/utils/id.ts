export function extractIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  if (!parts.length) return -1;
  const maybeId = parts[parts.length - 1] ?? "";
  const id = Number.parseInt(maybeId, 10);
  return Number.isNaN(id) ? -1 : id;
}
