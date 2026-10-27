import Link from "next/link";
import { Suspense } from "react";
import { ClubMark } from "@/components/club-mark";
import { AGE_GROUPS, exerciseCount } from "@/lib/catalog";
import { getDirector } from "@/lib/auth";
import { countByAge } from "@/lib/exercises";
import { parseNakyma, viewLabel, withNakyma } from "@/lib/nakyma";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}

async function HomeContent({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const nakyma = parseNakyma((await searchParams).nakyma);
  const [director, rows] = await Promise.all([getDirector(), countByAge(nakyma)]);
  const counts = new Map<string, number>(AGE_GROUPS.map((age) => [age.id, 0]));
  for (const row of rows) {
    for (const age of row.ageGroups) {
      counts.set(age.ageGroup, (counts.get(age.ageGroup) ?? 0) + 1);
    }
  }

  return (
    <div className="px-4 py-4">
      <p className="mb-1 text-lg font-semibold text-white">BK-46 Fotboll rf</p>
      <p className="mb-4 text-sm text-white/80">{viewLabel(nakyma)}</p>
      <div className="flex flex-col gap-3">
        {AGE_GROUPS.map((age) => (
          <Link
            key={age.id}
            href={withNakyma("/harjoitteet", nakyma, { ika: age.id })}
            className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-md"
          >
            <ClubMark />
            <span>
              <span className="block text-xs text-[#5c6b7a]">BK-46 Fotboll rf</span>
              <span className="block text-lg font-semibold text-[#1e2a36]">{age.label}</span>
              <span className="block text-sm text-[#5c6b7a]">
                Jalkapallo · {exerciseCount(counts.get(age.id) ?? 0)}
              </span>
            </span>
          </Link>
        ))}
      </div>
      {director ? (
        <Link
          href="/yllapito"
          className="mt-5 flex h-12 items-center justify-center rounded-full bg-[#e8a317] text-base font-semibold text-white shadow"
        >
          Siirry ylläpitoon
        </Link>
      ) : null}
    </div>
  );
}

function PageFallback() {
  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <div className="h-6 w-40 rounded bg-white/30" />
      <div className="h-24 rounded-2xl bg-white/70" />
      <div className="h-24 rounded-2xl bg-white/70" />
      <div className="h-24 rounded-2xl bg-white/70" />
    </div>
  );
}
