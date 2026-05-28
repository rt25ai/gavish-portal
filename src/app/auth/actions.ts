"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { translateAuthError } from "@/server/auth/errors";
import {
  sendPasswordReset,
  signInUser,
  signOutUser,
  signUpUser,
  updateCurrentUserPassword,
} from "@/server/auth/service";
import type { FormState } from "@/server/auth/state";

export type AuthFormState = FormState;

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

  const { error } = await signUpUser({ email, password, fullName, organization });
  if (error) return { error: translateAuthError(error) };

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

  const { error } = await signInUser({ email, password });
  if (error) return { error: translateAuthError(error) };

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signOut() {
  await signOutUser();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "אנא הזינו את כתובת האימייל." };

  const { error } = await sendPasswordReset(email);
  if (error) return { error: translateAuthError(error) };

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

  const result = await updateCurrentUserPassword(password);
  if (result.sessionExpired) {
    return { error: "ה-session פג תוקף. בקשו קישור איפוס חדש." };
  }
  if (result.error) return { error: translateAuthError(result.error) };

  revalidatePath("/", "layout");
  redirect("/community-space");
}
