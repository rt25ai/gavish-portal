"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type CreatePostState = { error?: string } | null;

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function createPost(
  _prev: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const body = String(formData.get("body") ?? "").trim();
  const image = formData.get("image");

  if (!body) return { error: "תוכן הפוסט לא יכול להיות ריק." };
  if (body.length > 5000) return { error: "הפוסט ארוך מדי (עד 5000 תווים)." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "נדרשת התחברות." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") return { error: "אין הרשאה לפרסם." };

  let imageUrl: string | null = null;

  if (image instanceof File && image.size > 0) {
    if (image.size > MAX_IMAGE_BYTES) {
      return { error: "התמונה גדולה מ-5MB." };
    }
    if (!ALLOWED_MIME.includes(image.type)) {
      return { error: "סוג קובץ לא נתמך. השתמשו ב-JPEG / PNG / WebP / GIF." };
    }

    const ext = image.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(path, image, {
        cacheControl: "31536000",
        upsert: false,
        contentType: image.type,
      });

    if (uploadError) return { error: `העלאת התמונה נכשלה: ${uploadError.message}` };

    const { data: publicData } = supabase.storage
      .from("post-images")
      .getPublicUrl(path);
    imageUrl = publicData.publicUrl;
  }

  const { error: insertError } = await supabase.from("posts").insert({
    author_id: user.id,
    body,
    image_url: imageUrl,
  });

  if (insertError) return { error: `יצירת הפוסט נכשלה: ${insertError.message}` };

  revalidatePath("/community-space");
  redirect("/community-space");
}
