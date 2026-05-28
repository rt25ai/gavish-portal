export const MAX_AVATAR_BYTES = 3 * 1024 * 1024;
export const ALLOWED_AVATAR_MIME = ["image/jpeg", "image/png", "image/webp"] as const;

export type AvatarValidation =
  | { ok: true; file: File }
  | { ok: false; error: string };

export function validateAvatarFile(file: unknown): AvatarValidation {
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "לא נבחר קובץ." };
  }
  if (file.size > MAX_AVATAR_BYTES) {
    return { ok: false, error: "הקובץ גדול מ-3MB." };
  }
  if (!ALLOWED_AVATAR_MIME.includes(file.type as (typeof ALLOWED_AVATAR_MIME)[number])) {
    return { ok: false, error: "סוג קובץ לא נתמך. השתמשו ב-JPEG / PNG / WebP." };
  }
  return { ok: true, file };
}
