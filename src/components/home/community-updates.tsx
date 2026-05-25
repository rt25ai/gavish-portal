import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// Linear DESIGN.md tokens — used in this widget only.
// canvas #010102, surface-1 #0f1011, surface-2 #141516, hairline #23252a,
// ink #f7f8f8, ink-muted #d0d6e0, ink-subtle #8a8f98, primary lavender #5e6ad2

type Update = {
  id: string;
  body: string;
  created_at: string;
  profiles: { full_name: string | null; organization: string | null } | null;
};

export async function CommunityUpdates() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, body, created_at, profiles(full_name, organization)")
    .order("created_at", { ascending: false })
    .limit(3)
    .returns<Update[]>();

  const updates = posts ?? [];
  const hasContent = updates.length > 0;

  return (
    <section className="bg-paper py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Link
          href={user ? "/community-space" : "/auth/sign-up"}
          className="block relative overflow-hidden rounded-[24px] bg-[#010102] border border-[#23252a] p-7 lg:p-12 group transition-shadow hover:shadow-[0_30px_80px_-30px_rgba(94,106,210,0.4)]"
        >
          {/* faint top-edge highlight — Linear signature */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* subtle radial accent in corner */}
          <div className="absolute -top-32 -left-32 w-[40vmin] h-[40vmin] bg-[#5e6ad2]/20 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-start justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="relative flex size-2.5">
                  <span className="absolute inset-0 rounded-full bg-[#5e6ad2] opacity-75 [animation:ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <span className="relative rounded-full size-2.5 bg-[#5e6ad2]" />
                </span>
                <span className="font-body text-[13px] font-medium tracking-[0.18em] uppercase text-[#d0d6e0]">
                  עדכוני קהילה · LIVE
                </span>
              </div>
              <h2
                className="font-display font-semibold text-[#f7f8f8] leading-[1.05] text-[clamp(2rem,5vw,3.5rem)]"
                style={{ letterSpacing: "-0.04em" }}
              >
                מה חדש בקהילה.
              </h2>
              <p className="mt-4 font-body text-[16px] lg:text-[18px] text-[#8a8f98] leading-[1.50] max-w-xl">
                {hasContent
                  ? "העדכונים האחרונים מבוגרות ובוגרי מחזור א׳ של גביש."
                  : "האזור הקהילתי הוא המרחב הפנימי של חברי הקהילה."}
              </p>
            </div>

            <span className="hidden sm:flex shrink-0 items-center gap-2 px-4 py-2 rounded-[8px] bg-[#141516] border border-[#23252a] font-body text-[13px] font-medium text-[#f7f8f8] group-hover:bg-[#18191a] transition-colors">
              <span>לפיד המלא</span>
              <ArrowLeft className="size-4 text-[#5e6ad2] transition-transform group-hover:-translate-x-1" />
            </span>
          </div>

          {/* Content */}
          <div className="relative">
            {hasContent ? (
              <ul
                className={`grid gap-3 ${
                  updates.length === 1
                    ? "grid-cols-1"
                    : updates.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-3"
                }`}
              >
                {updates.map((post) => (
                  <UpdateCard key={post.id} post={post} />
                ))}
              </ul>
            ) : (
              <EmptyState authenticated={Boolean(user)} />
            )}
          </div>

          {/* mobile CTA */}
          <div className="sm:hidden mt-6 flex items-center justify-center gap-2 font-body text-[14px] font-medium text-[#5e6ad2]">
            <span>{user ? "פתח את הפיד המלא" : "הצטרפו לקהילה"}</span>
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </div>
        </Link>
      </div>
    </section>
  );
}

function UpdateCard({ post }: { post: Update }) {
  const name = post.profiles?.full_name ?? "חבר/ת קהילה";
  const initial = name.charAt(0) || "·";
  const org = post.profiles?.organization;
  const when = formatHebrewRelative(post.created_at);

  return (
    <li className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-5 lg:p-6 hover:bg-[#141516] hover:border-[#34343a] transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <span className="size-9 rounded-full bg-[#5e6ad2] text-white grid place-items-center font-display font-semibold text-[14px] shrink-0">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="font-display text-[14px] font-medium text-[#f7f8f8] leading-tight truncate">
            {name}
          </p>
          <p className="font-body text-[12px] text-[#8a8f98] truncate">
            {org ? `${org} · ${when}` : when}
          </p>
        </div>
      </div>
      <p className="font-body text-[14px] text-[#d0d6e0] leading-[1.55] line-clamp-4 whitespace-pre-wrap">
        {post.body}
      </p>
    </li>
  );
}

function EmptyState({ authenticated }: { authenticated: boolean }) {
  return (
    <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-8 lg:p-12 text-center">
      <div className="inline-flex size-12 rounded-full bg-[#141516] border border-[#23252a] text-[#5e6ad2] items-center justify-center mb-5">
        <Activity className="size-5" />
      </div>
      <p className="font-display text-[20px] lg:text-[22px] font-medium text-[#f7f8f8] leading-[1.25] mb-2"
         style={{ letterSpacing: "-0.4px" }}>
        {authenticated
          ? "אין עדיין עדכונים."
          : "האזור הקהילתי פתוח לחברי קהילה רשומים."}
      </p>
      <p className="font-body text-[14px] text-[#8a8f98] leading-[1.50] max-w-md mx-auto">
        {authenticated
          ? "כאן יופיעו ההודעות הראשונות שיפורסמו בפיד הקהילתי."
          : "צרו חשבון כדי לראות את הפיד, להתעדכן באירועים ולהתחבר עם בוגרי המחזור."}
      </p>
    </div>
  );
}

function formatHebrewRelative(iso: string): string {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "עכשיו";
  if (diffMin < 60) return `לפני ${diffMin} ד׳`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `לפני ${diffHr} שע׳`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `לפני ${diffDay} ימים`;
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long" });
}
