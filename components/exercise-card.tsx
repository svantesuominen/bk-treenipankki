import Image from "next/image";
import Link from "next/link";
import { ageLabel, sortByCatalog, themeLabel, AGE_IDS, THEME_IDS } from "@/lib/catalog";
import type { ExerciseWithTags } from "@/lib/exercises";
import type { Nakyma } from "@/lib/nakyma";
import { withNakyma } from "@/lib/nakyma";
import { parseVideoUrl } from "@/lib/video";

export function excerpt(body: string, max = 110) {
  const line = body.replace(/\s+/g, " ").trim();
  if (line.length <= max) return line;
  return `${line.slice(0, max - 1).trimEnd()}…`;
}

export function ExerciseCard({
  exercise,
  nakyma,
  age,
}: {
  exercise: ExerciseWithTags;
  nakyma: Nakyma;
  age: string;
}) {
  const video = parseVideoUrl(exercise.videoUrl);
  const themes = sortByCatalog(
    exercise.themes.map((theme) => theme.theme),
    THEME_IDS,
  ).map(themeLabel);
  const ages = sortByCatalog(
    exercise.ageGroups.map((group) => group.ageGroup),
    AGE_IDS,
  ).map(ageLabel);

  return (
    <Link
      href={withNakyma(`/harjoitteet/${exercise.id}`, nakyma, { ika: age })}
      className="flex gap-3 rounded-2xl bg-white p-3 shadow-md"
    >
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f8d6d8]">
        {video?.kind === "youtube" ? (
          <Image
            src={video.thumbnailUrl}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <span className="grid h-full place-items-center text-xs font-semibold text-[#d21f2a]">
            {video?.kind === "drive" ? "Drive" : "Video"}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#d21f2a]">{themes.join(" · ")}</p>
        <h2 className="text-base font-semibold leading-snug text-[#1e2a36]">{exercise.title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-[#5c6b7a]">{excerpt(exercise.body)}</p>
        <p className="mt-1 text-xs text-[#5c6b7a]">{ages.join(", ")}</p>
      </div>
    </Link>
  );
}
