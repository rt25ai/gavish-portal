"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/server/profiles/queries";
import { updateProfileDetails } from "@/server/profiles/mutations";
import { validateProfileDetails } from "@/server/profiles/validation";
import { validateAvatarFile } from "@/server/avatars/validation";
import { clearUserAvatar, replaceUserAvatar } from "@/server/avatars/service";
import type { FormState } from "@/server/auth/state";

export type AccountFormState = FormState;

export async function updateProfile(
  _prev: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> {
  const input = {
    fullName: String(formData.get("full_name") ?? "").trim(),
    organization: String(formData.get("organization") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
  };

  const validationError = validateProfileDetails(input);
  if (validationError) return { error: validationError };

  const user = await getCurrentUser();
  if (!user) return { error: "נדרשת התחברות." };

  const { error } = await updateProfileDetails(user.id, input);
  if (error) return { error: `שמירת הפרטים נכשלה: ${error}` };

  revalidatePath("/", "layout");
  return { success: "הפרטים נשמרו." };
}

export async function uploadAvatar(
  _prev: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> {
  const check = validateAvatarFile(formData.get("avatar"));
  if (!check.ok) return { error: check.error };

  const user = await getCurrentUser();
  if (!user) return { error: "נדרשת התחברות." };

  const { error } = await replaceUserAvatar(user.id, check.file);
  if (error) return { error };

  revalidatePath("/", "layout");
  return { success: "תמונת הפרופיל עודכנה." };
}

export async function removeAvatar(): Promise<AccountFormState> {
  const user = await getCurrentUser();
  if (!user) return { error: "נדרשת התחברות." };

  const { error } = await clearUserAvatar(user.id);
  if (error) return { error };

  revalidatePath("/", "layout");
  return { success: "התמונה הוסרה." };
}
