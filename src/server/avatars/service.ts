import "server-only";
import { createClient } from "@/server/supabase/server";
import { setProfileAvatarUrl } from "@/server/profiles/mutations";
import {
  clearUserAvatarFolder,
  removeAvatarPath,
  uploadUserAvatar,
} from "./storage";

/**
 * High-level avatar operations that combine storage and profile updates.
 * One round-trip per logical step, all errors surfaced as messages.
 */

export async function replaceUserAvatar(
  userId: string,
  file: File,
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  // Wipe previous versions so the bucket doesn't keep growing per user.
  await clearUserAvatarFolder(supabase, userId);

  const upload = await uploadUserAvatar(supabase, userId, file);
  if (upload.error || !upload.publicUrl || !upload.path) {
    return { error: `העלאה נכשלה: ${upload.error ?? "שגיאה לא ידועה"}` };
  }

  const update = await setProfileAvatarUrl(userId, upload.publicUrl);
  if (update.error) {
    await removeAvatarPath(supabase, upload.path);
    return { error: `שמירת התמונה נכשלה: ${update.error}` };
  }

  return { error: null };
}

export async function clearUserAvatar(userId: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  await clearUserAvatarFolder(supabase, userId);
  const update = await setProfileAvatarUrl(userId, null);
  if (update.error) return { error: `הסרת התמונה נכשלה: ${update.error}` };
  return { error: null };
}
