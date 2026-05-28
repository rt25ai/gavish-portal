"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertCallerIsAdmin } from "@/server/admin/guards";
import { insertPost, uploadPostImage } from "@/server/posts/mutations";
import { validatePostBody, validatePostImage } from "@/server/posts/validation";

export type CreatePostState = { error?: string } | null;

export async function createPost(
  _prev: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const body = String(formData.get("body") ?? "").trim();
  const bodyError = validatePostBody(body);
  if (bodyError) return { error: bodyError };

  const auth = await assertCallerIsAdmin();
  if (!auth.ok) return { error: auth.error };

  const imageCheck = validatePostImage(formData.get("image"));
  if (!imageCheck.ok) return { error: imageCheck.error };

  let imageUrl: string | null = null;
  if (imageCheck.file) {
    const upload = await uploadPostImage(auth.adminId, imageCheck.file);
    if (upload.error) return { error: `העלאת התמונה נכשלה: ${upload.error}` };
    imageUrl = upload.publicUrl;
  }

  const insert = await insertPost({
    authorId: auth.adminId,
    body,
    imageUrl,
  });
  if (insert.error) return { error: `יצירת הפוסט נכשלה: ${insert.error}` };

  revalidatePath("/community-space");
  redirect("/community-space");
}
