"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ClubMark } from "@/components/club-mark";
import { parseNakyma } from "@/lib/nakyma";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nakyma = parseNakyma(searchParams.get("nakyma") ?? undefined);

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "valmentaja") params.set("nakyma", "valmentaja");
    else params.delete("nakyma");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <header className="bg-[#d21f2a] px-4 pb-3 pt-4 text-white">
      <div className="flex items-center justify-center gap-2">
        <ClubMark className="h-9 w-9" />
        <h1 className="text-xl font-semibold">Treenipankki</h1>
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Näkymä</span>
        <select
          value={nakyma}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full rounded-full bg-white px-3 text-sm font-semibold text-[#1e2a36]"
        >
          <option value="pelaaja">Pelaajan näkymä</option>
          <option value="valmentaja">Valmentajan näkymä</option>
        </select>
      </label>
    </header>
  );
}

export function HeaderFallback() {
  return (
    <header className="bg-[#d21f2a] px-4 pb-3 pt-4 text-white">
      <div className="flex items-center justify-center gap-2">
        <ClubMark className="h-9 w-9" />
        <h1 className="text-xl font-semibold">Treenipankki</h1>
      </div>
      <div className="mt-3 h-10 rounded-full bg-white/80" />
    </header>
  );
}
