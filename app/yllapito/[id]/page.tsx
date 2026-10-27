import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { ExerciseForm } from "@/components/exercise-form";
import { getDirector } from "@/lib/auth";
import { getExercise } from "@/lib/exercises";

export default function EditExercisePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="px-4 py-4 text-white">Ladataan harjoitetta…</div>}>
      <EditExercise params={params} />
    </Suspense>
  );
}

async function EditExercise({ params }: { params: Promise<{ id: string }> }) {
  const director = await getDirector();
  if (!director) redirect("/kirjautuminen");
  const { id } = await params;
  const exercise = await getExercise(id);
  if (!exercise) notFound();

  return (
    <div className="px-4 py-4">
      <Link href="/yllapito" className="text-sm font-semibold text-white/90">
        ← Ylläpito
      </Link>
      <h2 className="mb-4 mt-2 text-2xl font-semibold text-white">Muokkaa harjoitetta</h2>
      <ExerciseForm
        values={{
          id: exercise.id,
          title: exercise.title,
          body: exercise.body,
          videoUrl: exercise.videoUrl,
          forPlayers: exercise.forPlayers,
          forCoaches: exercise.forCoaches,
          ageGroups: exercise.ageGroups.map((group) => group.ageGroup),
          themes: exercise.themes.map((theme) => theme.theme),
          published: exercise.published,
        }}
      />
      <Link
        href={`/harjoitteet/${exercise.id}`}
        className="mt-3 block text-center text-sm font-semibold text-white underline"
      >
        Esikatsele
      </Link>
    </div>
  );
}
