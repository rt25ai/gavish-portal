"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error?: string;
  success?: string;
} | null;

export async function signUp(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();

  if (!email || !password || !fullName) {
    return { error: "אנא מלאו שם, אימייל וסיסמה." };
  }
  if (password.length < 8) {
    return { error: "הסיסמה חייבת להכיל לפחות 8 תווים." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, organization },
      emailRedirectTo: `${requireOrigin()}/auth/callback`,
    },
  });

  if (error) {
    return { error: translateAuthError(error.message) };
  }

  return {
    success:
      "נשלח אליכם מייל לאישור החשבון. לאחר אישור - תוכלו להיכנס לאזור הקהילתי.",
  };
}

export async function signIn(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/community-space");

  if (!email || !password) {
    return { error: "אנא מלאו אימייל וסיסמה." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: translateAuthError(error.message) };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return { error: "אנא הזינו את כתובת האימייל." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${requireOrigin()}/auth/callback?next=/auth/reset-password`,
  });

  // Always show success — avoid email enumeration. Even if email doesn't
  // exist, the user sees the same message.
  if (error && !error.message.toLowerCase().includes("not found")) {
    return { error: translateAuthError(error.message) };
  }

  return {
    success:
      "אם הכתובת רשומה במערכת, נשלח אליה מייל עם קישור לאיפוס הסיסמה. בדקו את התיבה ואת תיקיית הספאם.",
  };
}

export async function updatePassword(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!password || !confirm) {
    return { error: "אנא מלאו את שני שדות הסיסמה." };
  }
  if (password.length < 8) {
    return { error: "הסיסמה חייבת להכיל לפחות 8 תווים." };
  }
  if (password !== confirm) {
    return { error: "הסיסמאות לא תואמות." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: "ה-session פג תוקף. בקשו קישור איפוס חדש.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: translateAuthError(error.message) };
  }

  revalidatePath("/", "layout");
  redirect("/community-space");
}

function requireOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "אימייל או סיסמה שגויים.";
  if (m.includes("already registered") || m.includes("already exists"))
    return "כתובת האימייל הזו כבר רשומה. נסו להיכנס.";
  if (m.includes("email not confirmed"))
    return "החשבון טרם אושר. בדקו את המייל לקישור האישור.";
  if (m.includes("rate limit"))
    return "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.";
  return "אירעה שגיאה. נסו שוב.";
}
