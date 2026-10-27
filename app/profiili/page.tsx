import Link from "next/link";
import { Suspense } from "react";
import { logoutAction } from "@/app/actions/auth";
import { getDirector } from "@/lib/auth";
import { parseNakyma, withNakyma } from "@/lib/nakyma";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function ProfilePage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<div className="px-4 py-4 text-white">Ladataan…</div>}>
      <ProfileContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ProfileContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const nakyma = parseNakyma((await searchParams).nakyma);
  const director = await getDirector();

  return (
    <div className="px-4 py-4">
      <h2 className="mb-4 text-2xl font-semibold text-white">Profiili</h2>
      {director ? (
        <div className="rounded-2xl bg-white p-4 shadow-md">
          <p className="text-lg font-semibold">{director.name}</p>
          <p className="text-sm text-[#5c6b7a]">{director.email}</p>
          <Link
            href="/yllapito"
            className="mt-4 flex h-12 items-center justify-center rounded-full bg-[#e8a317] font-semibold text-white"
          >
            Siirry ylläpitoon
          </Link>
          <form action={logoutAction} className="mt-3">
            <button
              type="submit"
              className="h-11 w-full rounded-full border border-black/10 font-semibold"
            >
              Kirjaudu ulos
            </button>
          </form>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-4 shadow-md">
          <p className="text-sm leading-6 text-[#1e2a36]">
            Pelaajat ja valmentajat selaavat harjoitteita ilman tunnusta. Valmentajan näkymä
            valitaan yläpalkista.
          </p>
          <Link
            href={withNakyma("/kirjautuminen", nakyma)}
            className="mt-4 flex h-12 items-center justify-center rounded-full bg-[#e8a317] font-semibold text-white"
          >
            Valmennuspäällikön kirjautuminen
          </Link>
        </div>
      )}
    </div>
  );
}
