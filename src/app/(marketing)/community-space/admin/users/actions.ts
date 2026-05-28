"use server";

import { revalidatePath } from "next/cache";
import { assertCallerIsAdmin } from "@/server/admin/guards";
import { deleteUserCascade, setUserRoleById } from "@/server/admin/users";
import type { ProfileRole } from "@/server/profiles/types";

export type AdminActionState = { error?: string; success?: string } | null;

export async function setUserRole(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const targetId = String(formData.get("target_id") ?? "");
  const newRole = String(formData.get("role") ?? "");

  if (!targetId) return { error: "חסר מזהה משתמש." };
  if (newRole !== "user" && newRole !== "admin") {
    return { error: "תפקיד לא תקין." };
  }

  const auth = await assertCallerIsAdmin();
  if (!auth.ok) return { error: auth.error };

  if (auth.adminId === targetId) {
    return { error: "אי אפשר לשנות את התפקיד של עצמך מהממשק. בקשו מאדמין אחר." };
  }

  const { error } = await setUserRoleById(targetId, newRole as ProfileRole);
  if (error) return { error: `עדכון התפקיד נכשל: ${error}` };

  revalidatePath("/community-space/admin/users");
  return {
    success:
      newRole === "admin"
        ? "המשתמש הוגדר כאדמין."
        : "הרשאת האדמין הוסרה.",
  };
}

export async function deleteUser(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const targetId = String(formData.get("target_id") ?? "");
  if (!targetId) return { error: "חסר מזהה משתמש." };

  const auth = await assertCallerIsAdmin();
  if (!auth.ok) return { error: auth.error };

  if (auth.adminId === targetId) {
    return { error: "אי אפשר למחוק את עצמך." };
  }

  const { error } = await deleteUserCascade(targetId);
  if (error) return { error: `מחיקת המשתמש נכשלה: ${error}` };

  revalidatePath("/community-space/admin/users");
  revalidatePath("/community-space");
  return { success: "המשתמש נמחק." };
}
