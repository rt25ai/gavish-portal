import "server-only";
import { createClient } from "@/server/supabase/server";
import { requireOrigin } from "./origin";

export type SignUpInput = {
  email: string;
  password: string;
  fullName: string;
  organization: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

/**
 * Pure auth operations - no FormData parsing, no redirect/revalidate.
 * Returns the raw Supabase error message on failure so the caller can
 * translate it via translateAuthError().
 */

export async function signUpUser(input: SignUpInput): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        organization: input.organization,
      },
      emailRedirectTo: `${requireOrigin()}/auth/callback`,
    },
  });
  return { error: error?.message ?? null };
}

export async function signInUser(input: SignInInput): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  return { error: error?.message ?? null };
}

export async function signOutUser(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function sendPasswordReset(email: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${requireOrigin()}/auth/callback?next=/auth/reset-password`,
  });

  // Quietly swallow "not found" - avoid email enumeration.
  if (error && !error.message.toLowerCase().includes("not found")) {
    return { error: error.message };
  }
  return { error: null };
}

export async function updateCurrentUserPassword(password: string): Promise<
  { error: string | null; sessionExpired?: boolean }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "session-expired", sessionExpired: true };

  const { error } = await supabase.auth.updateUser({ password });
  return { error: error?.message ?? null };
}
