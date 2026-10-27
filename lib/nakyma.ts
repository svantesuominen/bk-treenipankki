export const NAKYMAT = ["pelaaja", "valmentaja"] as const;
export type Nakyma = (typeof NAKYMAT)[number];

export function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseNakyma(value: string | string[] | undefined): Nakyma {
  return one(value) === "valmentaja" ? "valmentaja" : "pelaaja";
}

export function viewLabel(nakyma: Nakyma) {
  return nakyma === "valmentaja" ? "Valmentajan näkymä" : "Pelaajan näkymä";
}

export function withNakyma(
  path: string,
  nakyma: Nakyma,
  extra?: Record<string, string | undefined>,
) {
  const search = new URLSearchParams();
  if (nakyma === "valmentaja") search.set("nakyma", "valmentaja");
  for (const [key, value] of Object.entries(extra ?? {})) {
    if (value) search.set(key, value);
  }
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}
