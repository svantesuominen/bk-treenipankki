"use client";

import { useActionState, useState } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = { error: null };

export function LoginForm({
  demoEmail,
  demoPassword,
}: {
  demoEmail?: string;
  demoPassword?: string;
}) {
  const [state, action, pending] = useActionState(loginAction, initialState);
  const [email, setEmail] = useState(demoEmail ?? "");
  const [password, setPassword] = useState(demoPassword ?? "");

  return (
    <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-md">
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Sähköposti
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="field"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Salasana
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="field"
        />
      </label>
      {demoEmail && demoPassword ? (
        <p className="text-sm text-[#5c6b7a]">
          Demotunnus on valmiina: {demoEmail} / {demoPassword}
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-full bg-[#e8a317] text-base font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Kirjaudutaan…" : "Kirjaudu"}
      </button>
    </form>
  );
}
