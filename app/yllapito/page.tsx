import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AGE_IDS, ageLabel, sortByCatalog, themeLabel, THEME_IDS } from "@/lib/catalog";
import { getDirector } from "@/lib/auth";
import { listAllExercises, type ExerciseWithTags } from "@/lib/exercises";

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="px-4 py-4 text-white">Ladataan ylläpitoa…</div>}>
      <AdminList />
    </Suspense>
  );
}

async function AdminList() {
  const director = await getDirector();
  if (!director) redirect("/kirjautuminen");
  const exercises = await listAllExercises();

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-semibold text-white">Ylläpito</h2>
      <p className="mb-4 text-sm text-white/80">{director.name}</p>
      <Link
        href="/yllapito/uusi"
        className="mb-4 flex h-12 items-center justify-center rounded-full bg-[#e8a317] font-semibold text-white"
      >
        Uusi harjoite
      </Link>
      <div className="flex flex-col gap-3">
        {exercises.map((exercise) => (
          <AdminRow key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}

function AdminRow({ exercise }: { exercise: ExerciseWithTags }) {
  const ages = sortByCatalog(
    exercise.ageGroups.map((group) => group.ageGroup),
    AGE_IDS,
  ).map(ageLabel);
  const themes = sortByCatalog(
    exercise.themes.map((theme) => theme.theme),
    THEME_IDS,
  ).map(themeLabel);
  const audience = [
    exercise.forPlayers ? "Pelaajat" : null,
    exercise.forCoaches ? "Valmentajat" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link href={`/yllapito/${exercise.id}`} className="rounded-2xl bg-white p-4 shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-[#1e2a36]">{exercise.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
            exercise.published ? "bg-[#e7f6ea] text-[#1d7a3a]" : "bg-[#fff4d8] text-[#8a5a00]"
          }`}
        >
          {exercise.published ? "Julkaistu" : "Luonnos"}
        </span>
      </div>
      <p className="mt-1 text-sm text-[#5c6b7a]">
        {audience} · {ages.join(", ")}
      </p>
      <p className="text-sm text-[#5c6b7a]">{themes.join(" · ")}</p>
    </Link>
  );
}
