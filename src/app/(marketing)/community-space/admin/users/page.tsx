import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Shield, Users as UsersIcon } from "lucide-react";
import { getCurrentUser, getProfileRole } from "@/server/profiles/queries";
import { listAdminUsers } from "@/server/admin/users";
import { AdminTabs } from "../admin-tabs";
import { UserRow, type UserRowData } from "./user-row";

export const metadata: Metadata = {
  title: "ניהול משתמשים",
  description: "ניהול חברי האזור הקהילתי.",
};

export default async function UsersAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/sign-in?redirect=/community-space/admin/users");

  const role = await getProfileRole(user.id);
  if (role !== "admin") redirect("/community-space");

  const adminUsers = await listAdminUsers();
  const rows: UserRowData[] = adminUsers.map((row) => ({
    ...row,
    isCurrentUser: row.id === user.id,
  }));

  const adminCount = rows.filter((r) => r.role === "admin").length;
  const userCount = rows.length;

  return (
    <section className="bg-paper-mesh min-h-screen pt-32 pb-20 lg:pt-44">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <Link
          href="/community-space"
          className="inline-flex items-center gap-2 font-body text-sm text-navy-700 hover:text-navy-900 mb-6 group"
        >
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          חזרה לפיד
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
              ניהול
            </p>
            <h1 className="font-display font-black text-display text-navy-900 leading-[0.95]">
              משתמשים.
            </h1>
            <div className="mt-5 flex items-center gap-4 font-body text-sm text-ink/70">
              <span className="inline-flex items-center gap-2">
                <UsersIcon className="size-4 text-navy-700" />
                {userCount} משתמשים
              </span>
              <span className="inline-flex items-center gap-2">
                <Shield className="size-4 text-leaf-700" />
                {adminCount} {adminCount === 1 ? "אדמין" : "אדמינים"}
              </span>
            </div>
          </div>
          <AdminTabs />
        </div>

        <div className="bg-paper rounded-3xl border border-navy-900/8 overflow-hidden">
          <div className="hidden lg:grid grid-cols-[1.5fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 bg-cream border-b border-navy-900/8 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-700">
            <div>חבר/ת קהילה</div>
            <div>אימייל</div>
            <div>תפקיד</div>
            <div>נרשם/ה</div>
            <div className="text-end">פעולות</div>
          </div>

          {rows.length === 0 ? (
            <div className="px-6 py-10 text-center font-body text-sm text-ink/60">
              אין משתמשים רשומים עדיין.
            </div>
          ) : (
            <ul className="divide-y divide-navy-900/8">
              {rows.map((row) => (
                <UserRow key={row.id} row={row} />
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 font-body text-xs text-ink/50 leading-relaxed">
          הסרת אדמין משאירה את המשתמש עם גישה לפיד אך ללא יכולת לפרסם. מחיקת
          משתמש מוחקת גם את כל הפוסטים שלו (RLS cascade).
        </p>
      </div>
    </section>
  );
}
