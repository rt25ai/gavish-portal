import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = { title: "סיסמה חדשה" };

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <ExpiredLink />;
  }

  return <ResetPasswordForm email={user.email ?? ""} />;
}

function ExpiredLink() {
  return (
    <div>
      <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
        איפוס סיסמה
      </p>
      <h1 className="font-display font-black text-display text-navy-900 leading-[0.95] mb-4">
        הקישור לא תקף.
      </h1>
      <p className="font-body text-lg text-ink/70 mb-8">
        ה-session פג תוקף או שהקישור כבר נוצל. בקשו קישור איפוס חדש.
      </p>
      <Link
        href="/auth/forgot-password"
        className="inline-flex items-center justify-between gap-4 px-7 py-4 bg-navy-900 text-paper rounded-full font-display font-bold text-lg hover:bg-navy-700 transition"
      >
        בקשת קישור חדש
      </Link>
    </div>
  );
}
