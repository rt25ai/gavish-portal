import "server-only";
import { createAdminClient } from "@/server/supabase/admin";
import { clearUserAvatarFolder } from "@/server/avatars/storage";
import type { ProfileRole } from "@/server/profiles/types";

const AVATARS_BUCKET = "avatars";

export async function setUserRoleById(
  targetId: string,
  role: ProfileRole,
): Promise<{ error: string | null }> {
  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({ role })
    .eq("id", targetId);
  return { error: error?.message ?? null };
}

/**
 * Removes the user's auth row and any orphaned avatar files. The `posts`
 * table is cleaned up by ON DELETE CASCADE on author_id, so we only need
 * to manage storage paths explicitly.
 */
export async function deleteUserCascade(targetId: string): Promise<{ error: string | null }> {
  const admin = createAdminClient();

  // Storage isn't part of the auth cascade - clean the user's folder first.
  void AVATARS_BUCKET;
  await clearUserAvatarFolder(admin, targetId);

  const { error } = await admin.auth.admin.deleteUser(targetId);
  return { error: error?.message ?? null };
}

export type AdminUserRow = {
  id: string;
  fullName: string;
  organization: string | null;
  avatarUrl: string | null;
  role: ProfileRole;
  createdAt: string;
  email: string;
  lastSignIn: string | null;
  confirmed: boolean;
};

/**
 * Joins the public.profiles table with auth.users via service role,
 * exposing the data the admin users page needs in one shape.
 */
export async function listAdminUsers(): Promise<AdminUserRow[]> {
  const admin = createAdminClient();
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, full_name, organization, role, created_at, avatar_url")
    .order("created_at", { ascending: false });

  const { data: authData } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  const emailById = new Map(
    (authData?.users ?? []).map((u) => [
      u.id,
      {
        email: u.email ?? "",
        lastSignIn: u.last_sign_in_at ?? null,
        confirmed: Boolean(u.email_confirmed_at),
      },
    ]),
  );

  return (profiles ?? []).map((p) => ({
    id: p.id,
    fullName: p.full_name,
    organization: p.organization,
    avatarUrl: p.avatar_url ?? null,
    role: p.role as ProfileRole,
    createdAt: p.created_at,
    email: emailById.get(p.id)?.email ?? "",
    lastSignIn: emailById.get(p.id)?.lastSignIn ?? null,
    confirmed: emailById.get(p.id)?.confirmed ?? false,
  }));
}
