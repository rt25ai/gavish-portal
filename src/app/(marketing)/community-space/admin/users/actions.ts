"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type AdminActionState = { error?: string; success?: string } | null;

async function assertCallerIsAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "נדרשת התחברות.", admin: null as never };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") {
    return { error: "אין הרשאה.", admin: null as never };
  }
  return { error: null, admin: { id: user.id } };
}

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
  if (auth.error) return { error: auth.error };

  if (auth.admin.id === targetId) {
    return { error: "אי אפשר לשנות את התפקיד של עצמך מהממשק. בקשו מאדמין אחר." };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({ role: newRole })
    .eq("id", targetId);

  if (error) return { error: `עדכון התפקיד נכשל: ${error.message}` };

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
  if (auth.error) return { error: auth.error };

  if (auth.admin.id === targetId) {
    return { error: "אי אפשר למחוק את עצמך." };
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(targetId);
  if (error) return { error: `מחיקת המשתמש נכשלה: ${error.message}` };

  revalidatePath("/community-space/admin/users");
  revalidatePath("/community-space");
  return { success: "המשתמש נמחק." };
}
