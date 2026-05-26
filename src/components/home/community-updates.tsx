import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CommunityPulse, type PulseItem } from "./community-pulse";

type Row = {
  id: string;
  body: string;
  created_at: string;
  profiles: {
    full_name: string | null;
    organization: string | null;
    avatar_url: string | null;
  } | null;
};

export async function CommunityUpdates() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, body, created_at, profiles(full_name, organization, avatar_url)")
    .order("created_at", { ascending: false })
    .limit(4)
    .returns<Row[]>();

  const items: PulseItem[] = (posts ?? []).map((p) => ({
    id: p.id,
    body: p.body,
    created_at: p.created_at,
    authorName: p.profiles?.full_name ?? "חבר/ת קהילה",
    organization: p.profiles?.organization ?? null,
    avatarUrl: p.profiles?.avatar_url ?? null,
  }));

  const href = user ? "/community-space" : "/auth/sign-up";

  return (
    <section className="bg-paper-mesh-soft py-12 lg:py-16 relative overflow-hidden">
      {/* faint ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-[40vmin] h-[40vmin] bg-leaf-500/8 blur-3xl rounded-full" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-[40vmin] h-[40vmin] bg-topic-amber/8 blur-3xl rounded-full" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {items.length > 0 ? (
          <CommunityPulse items={items} href={href} />
        ) : (
          <EmptyTeaser authenticated={Boolean(user)} />
        )}
      </div>
    </section>
  );
}

function EmptyTeaser({ authenticated }: { authenticated: boolean }) {
  return (
    <Link
      href={authenticated ? "/community-space" : "/auth/sign-up"}
      className="group relative block max-w-2xl mx-auto rounded-[24px] bg-paper border border-navy-900/8 shadow-[0_30px_60px_-30px_rgba(15,30,71,0.25)] overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-l from-leaf-500 via-topic-amber to-topic-coral" />
      <div className="p-7 lg:p-8 flex items-center gap-5">
        <span className="size-12 rounded-2xl bg-leaf-500/12 text-leaf-700 grid place-items-center shrink-0">
          <Sparkles className="size-5" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-navy-900 text-[17px] leading-tight mb-1">
            {authenticated ? "אין עדיין עדכונים" : "הצטרפו לקהילה"}
          </p>
          <p className="font-body text-[14px] text-ink/70 leading-snug">
            {authenticated
              ? "כשמנהלי הקהילה יפרסמו, יופיע כאן."
              : "צרו חשבון כדי לראות את עדכוני הפיד הקהילתי."}
          </p>
        </div>
        <ArrowLeft className="size-5 text-navy-900 shrink-0 group-hover:-translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
