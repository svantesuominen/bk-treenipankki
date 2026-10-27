import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { VideoEmbed } from "@/components/video-embed";
import { AGE_IDS, THEME_IDS, ageLabel, sortByCatalog, themeLabel } from "@/lib/catalog";
import { getDirector } from "@/lib/auth";
import { getExercise } from "@/lib/exercises";
import { one, parseNakyma, withNakyma } from "@/lib/nakyma";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function ExercisePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<div className="px-4 py-4 text-white">Ladataan harjoitetta…</div>}>
      <ExerciseDetail params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function ExerciseDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const [{ id }, query, director] = await Promise.all([params, searchParams, getDirector()]);
  const exercise = await getExercise(id);
  if (!exercise || (!exercise.published && !director)) notFound();

  const nakyma = parseNakyma(query.nakyma);
  const requestedAge = one(query.ika);
  const age =
    requestedAge && exercise.ageGroups.some((group) => group.ageGroup === requestedAge)
      ? requestedAge
      : exercise.ageGroups[0]?.ageGroup;
  const themes = sortByCatalog(
    exercise.themes.map((theme) => theme.theme),
    THEME_IDS,
  ).map(themeLabel);
  const ages = sortByCatalog(
    exercise.ageGroups.map((group) => group.ageGroup),
    AGE_IDS,
  ).map(ageLabel);

  return (
    <div className="px-4 py-4">
      <Link
        href={withNakyma("/harjoitteet", nakyma, { ika: age })}
        className="text-sm font-semibold text-white/90"
      >
        ← Harjoitteet
      </Link>
      <div className="mt-3">
        <VideoEmbed url={exercise.videoUrl} title={exercise.title} />
      </div>
      <article className="mt-4 rounded-2xl bg-white p-4 shadow-md">
        {!exercise.published ? (
          <p className="mb-2 inline-block rounded-full bg-[#e8a317] px-2 py-0.5 text-xs font-semibold text-white">
            Luonnos
          </p>
        ) : null}
        <p className="text-xs font-semibold text-[#d21f2a]">{themes.join(" · ")}</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#1e2a36]">{exercise.title}</h2>
        <p className="mt-1 text-sm text-[#5c6b7a]">{ages.join(", ")}</p>
        <p className="mt-4 whitespace-pre-wrap text-[15px] leading-6 text-[#1e2a36]">
          {exercise.body}
        </p>
      </article>
    </div>
  );
}
