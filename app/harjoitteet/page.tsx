import Link from "next/link";
import { Suspense } from "react";
import { ExerciseCard } from "@/components/exercise-card";
import { THEMES, ageLabel, isAgeId, isThemeId } from "@/lib/catalog";
import { listPublished } from "@/lib/exercises";
import { one, parseNakyma, viewLabel, withNakyma } from "@/lib/nakyma";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function ExercisesPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<div className="px-4 py-4 text-white">Ladataan harjoitteita…</div>}>
      <ExerciseList searchParams={searchParams} />
    </Suspense>
  );
}

async function ExerciseList({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const nakyma = parseNakyma(params.nakyma);
  const age = one(params.ika);
  const themeValue = one(params.teema);
  const theme = isThemeId(themeValue) ? themeValue : undefined;
  const query = one(params.q)?.trim().slice(0, 80) || undefined;

  if (!isAgeId(age)) {
    return (
      <div className="px-4 py-6 text-white">
        <p>Valitse ikäryhmä etusivulta.</p>
        <Link href={withNakyma("/", nakyma)} className="mt-3 inline-block font-semibold underline">
          Ikäryhmät
        </Link>
      </div>
    );
  }

  const exercises = await listPublished({ nakyma, ageGroup: age, theme, query });

  return (
    <div className="px-4 py-4">
      <Link href={withNakyma("/", nakyma)} className="text-sm font-semibold text-white/90">
        ← Ikäryhmät
      </Link>
      <h2 className="mt-2 text-2xl font-semibold text-white">{ageLabel(age)}</h2>
      <p className="mb-4 text-sm text-white/80">{viewLabel(nakyma)}</p>
      <form action="/harjoitteet" className="mb-3">
        {nakyma === "valmentaja" ? <input type="hidden" name="nakyma" value="valmentaja" /> : null}
        <input type="hidden" name="ika" value={age} />
        {theme ? <input type="hidden" name="teema" value={theme} /> : null}
        <label className="sr-only" htmlFor="haku">
          Hae otsikosta
        </label>
        <input
          id="haku"
          name="q"
          defaultValue={query ?? ""}
          placeholder="Hae otsikosta"
          className="h-11 w-full rounded-full bg-white px-4 text-sm"
        />
      </form>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <ThemeLink href={withNakyma("/harjoitteet", nakyma, { ika: age, q: query })} active={!theme}>
          Kaikki
        </ThemeLink>
        {THEMES.map((item) => (
          <ThemeLink
            key={item.id}
            href={withNakyma("/harjoitteet", nakyma, { ika: age, teema: item.id, q: query })}
            active={theme === item.id}
          >
            {item.label}
          </ThemeLink>
        ))}
      </div>
      {exercises.length === 0 ? (
        <p className="rounded-2xl bg-white p-4 text-sm text-[#5c6b7a]">
          {query || theme
            ? "Ei harjoitteita näillä rajauksilla."
            : "Tähän ikäryhmään ei ole vielä julkaistuja harjoitteita."}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} nakyma={nakyma} age={age} />
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${
        active ? "bg-[#e8a317] text-white" : "bg-white text-[#1e2a36]"
      }`}
    >
      {children}
    </Link>
  );
}
