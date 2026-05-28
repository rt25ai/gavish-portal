import "server-only";
import { createClient } from "@/server/supabase/server";
import type { ProfileDetailsInput } from "./validation";

/**
 * Pure DB updates for profiles. Returns Supabase error message or null;
 * does not redirect/revalidate (callers handle that).
 */

export async function updateProfileDetails(
  userId: string,
  input: ProfileDetailsInput,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: input.fullName,
      organization: input.organization || null,
      title: input.title || null,
    })
    .eq("id", userId);
  return { error: error?.message ?? null };
}

export async function setProfileAvatarUrl(
  userId: string,
  avatarUrl: string | null,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", userId);
  return { error: error?.message ?? null };
}
