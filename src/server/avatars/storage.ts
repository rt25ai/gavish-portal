import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

const AVATARS_BUCKET = "avatars";

/**
 * Storage-level helpers for the user's avatar folder. Accepts a Supabase
 * client so callers can pick the regular or admin instance.
 */

export async function clearUserAvatarFolder(
  client: SupabaseClient,
  userId: string,
): Promise<void> {
  const { data } = await client.storage.from(AVATARS_BUCKET).list(userId);
  if (!data || data.length === 0) return;
  const paths = data.map((f) => `${userId}/${f.name}`);
  await client.storage.from(AVATARS_BUCKET).remove(paths);
}

export async function uploadUserAvatar(
  client: SupabaseClient,
  userId: string,
  file: File,
): Promise<{ publicUrl: string | null; path: string | null; error: string | null }> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${userId}/${Date.now()}.${ext}`;

  const { error } = await client.storage.from(AVATARS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) return { publicUrl: null, path: null, error: error.message };

  const { data } = client.storage.from(AVATARS_BUCKET).getPublicUrl(path);
  return { publicUrl: data.publicUrl, path, error: null };
}

export async function removeAvatarPath(
  client: SupabaseClient,
  path: string,
): Promise<void> {
  await client.storage.from(AVATARS_BUCKET).remove([path]);
}
