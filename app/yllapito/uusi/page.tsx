import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ExerciseForm } from "@/components/exercise-form";
import { getDirector } from "@/lib/auth";

export default function NewExercisePage() {
  return (
    <Suspense fallback={<div className="px-4 py-4 text-white">Ladataan lomaketta…</div>}>
      <NewExercise />
    </Suspense>
  );
}

async function NewExercise() {
  const director = await getDirector();
  if (!director) redirect("/kirjautuminen");

  return (
    <div className="px-4 py-4">
      <Link href="/yllapito" className="text-sm font-semibold text-white/90">
        ← Ylläpito
      </Link>
      <h2 className="mb-4 mt-2 text-2xl font-semibold text-white">Uusi harjoite</h2>
      <ExerciseForm
        values={{
          title: "",
          body: "",
          videoUrl: "",
          forPlayers: true,
          forCoaches: false,
          ageGroups: [],
          themes: [],
          published: true,
        }}
      />
    </div>
  );
}
