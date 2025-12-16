export function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function normalizeFlavorText(text: string): string {
  return text.replace(/\f/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

export function formatHeightDmToM(heightDm: number): string {
  return `${(heightDm / 10).toFixed(1)} m`;
}

export function formatWeightHgToKg(weightHg: number): string {
  return `${(weightHg / 10).toFixed(1)} kg`;
}
