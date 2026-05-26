"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AccountFormState = {
  error?: string;
  success?: string;
} | null;

const MAX_AVATAR_BYTES = 3 * 1024 * 1024; // 3MB
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

const MAX_NAME = 80;
const MAX_ORG = 120;
const MAX_TITLE = 120;

export async function updateProfile(
  _prev: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();

  if (!fullName) return { error: "שם מלא הוא שדה חובה." };
  if (fullName.length > MAX_NAME) return { error: `שם ארוך מדי (עד ${MAX_NAME} תווים).` };
  if (organization.length > MAX_ORG) return { error: `שם רשות ארוך מדי (עד ${MAX_ORG} תווים).` };
  if (title.length > MAX_TITLE) return { error: `תפקיד ארוך מדי (עד ${MAX_TITLE} תווים).` };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "נדרשת התחברות." };

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      organization: organization || null,
      title: title || null,
    })
    .eq("id", user.id);

  if (error) return { error: `שמירת הפרטים נכשלה: ${error.message}` };

  revalidatePath("/", "layout");
  return { success: "הפרטים נשמרו." };
}

export async function uploadAvatar(
  _prev: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> {
  const file = formData.get("avatar");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "לא נבחר קובץ." };
  }
  if (file.size > MAX_AVATAR_BYTES) {
    return { error: "הקובץ גדול מ-3MB." };
  }
  if (!ALLOWED_MIME.includes(file.type)) {
    return { error: "סוג קובץ לא נתמך. השתמשו ב-JPEG / PNG / WebP." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "נדרשת התחברות." };

  // מוחק קבצים קודמים בתיקיית המשתמש כדי לא לצבור גרסאות.
  const { data: existing } = await supabase.storage.from("avatars").list(user.id);
  if (existing && existing.length > 0) {
    const paths = existing.map((f) => `${user.id}/${f.name}`);
    await supabase.storage.from("avatars").remove(paths);
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) return { error: `העלאה נכשלה: ${uploadError.message}` };

  const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(path);
  const publicUrl = publicData.publicUrl;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    // ניסיון לנקות אם עדכון ה-DB נכשל.
    await supabase.storage.from("avatars").remove([path]);
    return { error: `שמירת התמונה נכשלה: ${updateError.message}` };
  }

  revalidatePath("/", "layout");
  return { success: "תמונת הפרופיל עודכנה." };
}

export async function removeAvatar(): Promise<AccountFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "נדרשת התחברות." };

  const { data: existing } = await supabase.storage.from("avatars").list(user.id);
  if (existing && existing.length > 0) {
    const paths = existing.map((f) => `${user.id}/${f.name}`);
    await supabase.storage.from("avatars").remove(paths);
  }

  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", user.id);

  if (error) return { error: `הסרת התמונה נכשלה: ${error.message}` };

  revalidatePath("/", "layout");
  return { success: "התמונה הוסרה." };
}
