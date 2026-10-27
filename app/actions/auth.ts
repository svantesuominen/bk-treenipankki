"use server";

import { AuthError } from "next-auth";
import { unstable_rethrow } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";

export type LoginState = { error: string | null };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/yllapito",
    });
    return { error: null };
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return { error: "Sähköposti tai salasana ei täsmää." };
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
