import { connection } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { Nakyma } from "@/lib/nakyma";

export const exerciseInclude = {
  ageGroups: true,
  themes: true,
} satisfies Prisma.ExerciseInclude;

export type ExerciseWithTags = Prisma.ExerciseGetPayload<{
  include: typeof exerciseInclude;
}>;

export async function listPublished(input: {
  nakyma: Nakyma;
  ageGroup: string;
  theme?: string;
  query?: string;
}) {
  await connection();
  return prisma.exercise.findMany({
    where: {
      published: true,
      ...(input.nakyma === "pelaaja" ? { forPlayers: true } : { forCoaches: true }),
      ageGroups: { some: { ageGroup: input.ageGroup } },
      ...(input.theme ? { themes: { some: { theme: input.theme } } } : {}),
      ...(input.query ? { title: { contains: input.query } } : {}),
    },
    include: exerciseInclude,
    orderBy: { title: "asc" },
  });
}

export async function countByAge(nakyma: Nakyma) {
  await connection();
  return prisma.exercise.findMany({
    where: {
      published: true,
      ...(nakyma === "pelaaja" ? { forPlayers: true } : { forCoaches: true }),
    },
    select: { ageGroups: { select: { ageGroup: true } } },
  });
}

export async function getExercise(id: string) {
  await connection();
  return prisma.exercise.findUnique({
    where: { id },
    include: exerciseInclude,
  });
}

export async function listAllExercises() {
  await connection();
  return prisma.exercise.findMany({
    include: exerciseInclude,
    orderBy: { updatedAt: "desc" },
  });
}
