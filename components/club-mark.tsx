export function ClubMark() {
  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
      <div className="absolute inset-0 flex" aria-hidden>
        <span className="flex-1 bg-[#d21f2a]" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-[#d21f2a]" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-[#d21f2a]" />
      </div>
      <span className="relative rounded bg-white/95 px-1 text-[11px] font-extrabold tracking-tight text-[#1e2a36]">
        BK-46
      </span>
    </div>
  );
}
