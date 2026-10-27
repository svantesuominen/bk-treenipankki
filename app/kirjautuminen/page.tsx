import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";
import { getDirector } from "@/lib/auth";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="px-4 py-4 text-white">Ladataan…</div>}>
      <LoginContent />
    </Suspense>
  );
}

async function LoginContent() {
  const director = await getDirector();
  if (director) redirect("/yllapito");

  const demo =
    process.env.NODE_ENV === "development"
      ? {
          email: process.env.DIRECTOR_EMAIL,
          password: process.env.DIRECTOR_PASSWORD,
        }
      : {};

  return (
    <div className="px-4 py-4">
      <h2 className="mb-1 text-2xl font-semibold text-white">Ylläpito</h2>
      <p className="mb-4 text-sm text-white/80">
        Vain valmennuspäällikkö kirjautuu. Pelaajat ja valmentajat selaavat ilman tunnusta.
      </p>
      <LoginForm demoEmail={demo.email} demoPassword={demo.password} />
    </div>
  );
}
