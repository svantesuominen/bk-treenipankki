export const AGE_IDS = ["7-9", "10-13", "14-18"] as const;
export const THEME_IDS = [
  "tekniikka",
  "taktiikka",
  "fysiikka",
  "maalivahti",
  "pelinrakentaminen",
] as const;

export type AgeId = (typeof AGE_IDS)[number];
export type ThemeId = (typeof THEME_IDS)[number];

export const AGE_GROUPS: { id: AgeId; label: string }[] = [
  { id: "7-9", label: "7–9 vuotta" },
  { id: "10-13", label: "10–13 vuotta" },
  { id: "14-18", label: "14–18 vuotta" },
];

export const THEMES: { id: ThemeId; label: string }[] = [
  { id: "tekniikka", label: "Tekniikka" },
  { id: "taktiikka", label: "Taktiikka" },
  { id: "fysiikka", label: "Fysiikka" },
  { id: "maalivahti", label: "Maalivahti" },
  { id: "pelinrakentaminen", label: "Pelinrakentaminen" },
];

export function isAgeId(value: string | undefined): value is AgeId {
  return AGE_IDS.some((id) => id === value);
}

export function isThemeId(value: string | undefined): value is ThemeId {
  return THEME_IDS.some((id) => id === value);
}

export function ageLabel(id: string) {
  return AGE_GROUPS.find((age) => age.id === id)?.label ?? id;
}

export function themeLabel(id: string) {
  return THEMES.find((theme) => theme.id === id)?.label ?? id;
}

export function exerciseCount(count: number) {
  return count === 1 ? "1 harjoite" : `${count} harjoitetta`;
}

export function sortByCatalog<T extends string>(ids: readonly T[], order: readonly T[]) {
  return order.filter((id) => ids.includes(id));
}
