import { z } from "zod";
import { AGE_IDS, THEME_IDS, isAgeId, isThemeId } from "@/lib/catalog";
import { parseVideoUrl } from "@/lib/video";

export const exerciseSchema = z
  .object({
    title: z.string().trim().min(2, "Kirjoita otsikko.").max(120, "Otsikko on liian pitkä."),
    body: z
      .string()
      .trim()
      .min(2, "Kirjoita harjoitteen teksti.")
      .max(5000, "Teksti on liian pitkä."),
    videoUrl: z
      .string()
      .trim()
      .max(400, "Videon osoite on liian pitkä.")
      .refine((value) => parseVideoUrl(value) !== null, "Anna YouTube- tai Google Drive -linkki."),
    forPlayers: z.boolean(),
    forCoaches: z.boolean(),
    ageGroups: z.array(z.enum(AGE_IDS)).min(1, "Valitse vähintään yksi ikäryhmä."),
    themes: z.array(z.enum(THEME_IDS)).min(1, "Valitse vähintään yksi teema."),
    published: z.boolean(),
  })
  .refine((value) => value.forPlayers || value.forCoaches, {
    message: "Valitse kohderyhmä.",
  });

export function readExerciseForm(formData: FormData) {
  const ages = formData
    .getAll("ageGroup")
    .map(String)
    .filter(isAgeId);
  const themes = formData
    .getAll("theme")
    .map(String)
    .filter(isThemeId);

  return exerciseSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    videoUrl: formData.get("videoUrl"),
    forPlayers: formData.getAll("audience").includes("pelaajat"),
    forCoaches: formData.getAll("audience").includes("valmentajat"),
    ageGroups: ages,
    themes,
    published: formData.get("published") === "on",
  });
}
