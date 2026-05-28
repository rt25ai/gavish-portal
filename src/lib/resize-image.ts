/**
 * Client-side image downscaler used to avoid uploading huge avatars
 * to Supabase storage. Accepts File/Blob, returns JPEG <= maxSize x maxSize.
 *
 * Prefers OffscreenCanvas (no DOM touch). Falls back to a regular canvas.
 */
export async function resizeImageToSquare(
  file: File,
  maxSize: number,
  quality: number,
): Promise<Blob> {
  if (typeof createImageBitmap !== "function") {
    throw new Error("דפדפן ישן מדי לעיבוד תמונות.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("פורמט הקובץ לא נתמך.");
  }

  try {
    const ratio = Math.min(maxSize / bitmap.width, maxSize / bitmap.height, 1);
    const w = Math.max(1, Math.round(bitmap.width * ratio));
    const h = Math.max(1, Math.round(bitmap.height * ratio));

    if (typeof OffscreenCanvas !== "undefined") {
      const off = new OffscreenCanvas(w, h);
      const ctx = off.getContext("2d");
      if (!ctx) throw new Error("canvas context לא זמין.");
      ctx.drawImage(bitmap, 0, 0, w, h);
      return await off.convertToBlob({ type: "image/jpeg", quality });
    }

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas context לא זמין.");
    ctx.drawImage(bitmap, 0, 0, w, h);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("הקובץ ריק."))),
        "image/jpeg",
        quality,
      );
    });
  } finally {
    bitmap.close();
  }
}
