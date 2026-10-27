export function ClubMark({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <img
      src="/bk46-logo.png"
      alt="BK-46"
      className={`${className} shrink-0 object-contain`}
    />
  );
}
