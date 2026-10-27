"use server";

import { redirect } from "next/navigation";
import { getDirector } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { readExerciseForm } from "@/lib/exercise-schema";

export type ExerciseFormState = { error: string | null };

export async function saveExercise(
  _prev: ExerciseFormState,
  formData: FormData,
): Promise<ExerciseFormState> {
  const director = await getDirector();
  if (!director) return { error: "Kirjaudu valmennuspäällikkönä." };

  const parsed = readExerciseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Tarkista lomake." };
  }

  const data = parsed.data;
  const tags = {
    ageGroups: {
      create: data.ageGroups.map((ageGroup) => ({ ageGroup })),
    },
    themes: {
      create: data.themes.map((theme) => ({ theme })),
    },
  };
  const fields = {
    title: data.title,
    body: data.body,
    videoUrl: data.videoUrl,
    forPlayers: data.forPlayers,
    forCoaches: data.forCoaches,
    published: data.published,
  };

  const id = String(formData.get("id") ?? "");
  if (id) {
    const existing = await prisma.exercise.findUnique({ where: { id } });
    if (!existing) return { error: "Harjoitetta ei löydy." };
    await prisma.exercise.update({
      where: { id },
      data: {
        ...fields,
        ageGroups: { deleteMany: {}, ...tags.ageGroups },
        themes: { deleteMany: {}, ...tags.themes },
      },
    });
  } else {
    await prisma.exercise.create({ data: { ...fields, ...tags } });
  }

  redirect("/yllapito");
}
