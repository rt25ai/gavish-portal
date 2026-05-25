import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PostComposer } from "./post-composer";

export const metadata: Metadata = {
  title: "פוסט חדש",
  description: "פרסום עדכון לפיד הקהילתי.",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in?redirect=/community-space/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/community-space");

  return (
    <section className="bg-paper-mesh min-h-screen pt-32 pb-20 lg:pt-44">
      <div className="mx-auto max-w-[720px] px-6 lg:px-10">
        <Link
          href="/community-space"
          className="inline-flex items-center gap-2 font-body text-sm text-navy-700 hover:text-navy-900 mb-6 group"
        >
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          חזרה לפיד
        </Link>
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          פרסום
        </p>
        <h1 className="font-display font-black text-display text-navy-900 leading-[0.95] mb-10">
          פוסט חדש.
        </h1>

        <PostComposer />
      </div>
    </section>
  );
}
