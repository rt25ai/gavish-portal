import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AccountForm, type AccountFormProfile } from "./account-form";

export const metadata: Metadata = {
  title: "החשבון שלי",
  description: "עריכת פרטים אישיים ותמונת פרופיל באזור הקהילתי של גביש.",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/sign-in?redirect=/community-space/account");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, organization, title, avatar_url")
    .eq("id", user.id)
    .single();

  const formProfile: AccountFormProfile = {
    fullName: profile?.full_name ?? "",
    organization: profile?.organization ?? null,
    title: profile?.title ?? null,
    avatarUrl: profile?.avatar_url ?? null,
    email: user.email ?? "",
  };

  return (
    <>
      <section className="relative bg-paper-mesh pt-32 pb-10 lg:pt-44 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-1/3 w-[40vmin] h-[40vmin] bg-leaf-500/15 blur-3xl rounded-full" />
        </div>
        <div className="relative mx-auto max-w-[820px] px-6 lg:px-10">
          <Link
            href="/community-space"
            className="inline-flex items-center gap-2 font-body text-sm text-navy-700 hover:text-navy-900 mb-6"
          >
            <ArrowRight className="size-4" />
            חזרה לפיד הקהילתי
          </Link>
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
            החשבון שלי
          </p>
          <h1 className="font-display font-black text-display text-navy-900 leading-[0.92]">
            הפרופיל<br />
            <span className="outline-text">שלך.</span>
          </h1>
        </div>
      </section>

      <section className="bg-paper py-12 lg:py-16">
        <div className="mx-auto max-w-[820px] px-6 lg:px-10">
          <AccountForm profile={formProfile} />
        </div>
      </section>
    </>
  );
}
