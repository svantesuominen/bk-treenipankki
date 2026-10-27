"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { parseNakyma, withNakyma } from "@/lib/nakyma";

export function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nakyma = parseNakyma(searchParams.get("nakyma") ?? undefined);
  const exercisesActive = pathname === "/" || pathname.startsWith("/harjoitteet");
  const profileActive = pathname === "/profiili" || pathname === "/kirjautuminen";

  return (
    <nav className="grid grid-cols-2 border-t border-black/5 bg-white pb-[env(safe-area-inset-bottom)]">
      <NavLink href={withNakyma("/", nakyma)} active={exercisesActive} label="Harjoitteet">
        <BallIcon />
      </NavLink>
      <NavLink href={withNakyma("/profiili", nakyma)} active={profileActive} label="Profiili">
        <PersonIcon />
      </NavLink>
    </nav>
  );
}

function NavLink({
  href,
  active,
  label,
  children,
}: {
  href: string;
  active: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex flex-col items-center gap-1 py-2 text-xs font-medium ${
        active ? "text-[#e39a12]" : "text-[#6b7785]"
      }`}
    >
      {children}
      {label}
    </Link>
  );
}

function BallIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 4.5 14.2 8.2 12 10.2 9.8 8.2 12 4.5ZM8.2 9.2 6 12.5 8.2 15.2 10.4 12.5 8.2 9.2ZM15.8 9.2 13.6 12.5 15.8 15.2 18 12.5 15.8 9.2ZM12 13.8 9.8 16.2 12 19.5 14.2 16.2 12 13.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6.5 18.5c1.2-2.4 3.1-3.5 5.5-3.5s4.3 1.1 5.5 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
