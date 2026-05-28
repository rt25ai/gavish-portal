export const MAX_POST_BODY = 5000;
export const MAX_POST_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_POST_IMAGE_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export function validatePostBody(body: string): string | null {
  if (!body) return "תוכן הפוסט לא יכול להיות ריק.";
  if (body.length > MAX_POST_BODY) return `הפוסט ארוך מדי (עד ${MAX_POST_BODY} תווים).`;
  return null;
}

export type PostImageValidation =
  | { ok: true; file: File | null }
  | { ok: false; error: string };

/**
 * `file: null` with ok: true means no image was provided (legitimate -
 * post images are optional). ok: false carries the error message.
 */
export function validatePostImage(image: unknown): PostImageValidation {
  if (!(image instanceof File) || image.size === 0) {
    return { ok: true, file: null };
  }
  if (image.size > MAX_POST_IMAGE_BYTES) {
    return { ok: false, error: "התמונה גדולה מ-5MB." };
  }
  if (!ALLOWED_POST_IMAGE_MIME.includes(image.type as (typeof ALLOWED_POST_IMAGE_MIME)[number])) {
    return { ok: false, error: "סוג קובץ לא נתמך. השתמשו ב-JPEG / PNG / WebP / GIF." };
  }
  return { ok: true, file: image };
}
