import "server-only";
import { createClient } from "@/server/supabase/server";

const POST_IMAGES_BUCKET = "post-images";

export async function uploadPostImage(
  userId: string,
  image: File,
): Promise<{ publicUrl: string | null; error: string | null }> {
  const supabase = await createClient();
  const ext = image.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${userId}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(POST_IMAGES_BUCKET)
    .upload(path, image, {
      cacheControl: "31536000",
      upsert: false,
      contentType: image.type,
    });
  if (error) return { publicUrl: null, error: error.message };

  const { data } = supabase.storage.from(POST_IMAGES_BUCKET).getPublicUrl(path);
  return { publicUrl: data.publicUrl, error: null };
}

export async function insertPost(input: {
  authorId: string;
  body: string;
  imageUrl: string | null;
}): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").insert({
    author_id: input.authorId,
    body: input.body,
    image_url: input.imageUrl,
  });
  return { error: error?.message ?? null };
}
