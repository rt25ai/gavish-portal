import "server-only";
import { getCurrentUser, getProfileRole } from "@/server/profiles/queries";

export type AdminCheck =
  | { ok: true; adminId: string }
  | { ok: false; error: string };

/**
 * Confirms the caller is signed in AND has the `admin` role on their profile.
 * Returns the caller's id on success so actions don't have to re-fetch it.
 */
export async function assertCallerIsAdmin(): Promise<AdminCheck> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "נדרשת התחברות." };

  const role = await getProfileRole(user.id);
  if (role !== "admin") return { ok: false, error: "אין הרשאה." };

  return { ok: true, adminId: user.id };
}
