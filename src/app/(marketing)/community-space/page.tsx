import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Plus, MessageCircle, Calendar, FolderOpen, Users, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "האזור הקהילתי",
  description: "המרחב הסגור של חברי קהילת גביש — פיד עדכונים, אירועים וקבצים.",
};

const upcomingFeatures = [
  { icon: Calendar, title: "לוח אירועים", body: "מפגשי המשך וכנסים" },
  { icon: FolderOpen, title: "ספריית קבצים", body: "מסמכים, מחקרים, מצגות" },
  { icon: Users, title: "פרופילים מקצועיים", body: "קישוריות בין חברי הקהילה" },
];

type PostRow = {
  id: string;
  body: string;
  image_url: string | null;
  created_at: string;
  profiles: { full_name: string | null; organization: string | null } | null;
};

export default async function CommunitySpacePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/sign-in?redirect=/community-space");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  const { data: posts } = await supabase
    .from("posts")
    .select("id, body, image_url, created_at, profiles(full_name, organization)")
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<PostRow[]>();

  const feed = posts ?? [];

  return (
    <>
      <section className="relative bg-paper-mesh pt-32 pb-10 lg:pt-44 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/3 w-[40vmin] h-[40vmin] bg-topic-amber/15 blur-3xl rounded-full" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
                שלום, {profile?.full_name?.split(" ")[0] ?? "חבר/ת קהילה"}
              </p>
              <h1 className="font-display font-black text-display text-navy-900 leading-[0.92]">
                האזור<br />
                <span className="outline-text">הקהילתי.</span>
              </h1>
            </div>
            {isAdmin && (
              <Link
                href="/community-space/admin"
                className="inline-flex items-center gap-3 px-6 py-3 bg-navy-900 text-paper rounded-full font-display font-bold text-base hover:bg-navy-700 transition w-fit"
              >
                <Plus className="size-5" />
                פוסט חדש
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 lg:py-16">
        <div className="mx-auto max-w-[820px] px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-8">
            <MessageCircle className="size-6 text-navy-700" />
            <h2 className="font-display font-black text-2xl text-navy-900">
              פיד עדכונים
            </h2>
          </div>

          {feed.length === 0 ? (
            <EmptyFeed isAdmin={isAdmin} />
          ) : (
            <ul className="space-y-6">
              {feed.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-cream-mesh py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4 text-center">
            בקרוב באזור הקהילתי
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-black text-navy-900 mb-12 text-center">
            עוד מרחבים בדרך.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <article
                  key={f.title}
                  className="bg-paper rounded-2xl p-6 border border-navy-900/8 relative overflow-hidden"
                >
                  <div className="size-12 rounded-xl bg-leaf-500/15 grid place-items-center text-leaf-700 mb-4">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display font-black text-lg text-navy-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="font-body text-sm text-ink/70 leading-relaxed">
                    {f.body}
                  </p>
                  <div className="absolute top-4 left-4 size-7 rounded-full bg-navy-900/90 text-paper grid place-items-center">
                    <Lock className="size-3.5" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function PostCard({ post }: { post: PostRow }) {
  const author = post.profiles?.full_name ?? "חבר/ת קהילה";
  const org = post.profiles?.organization;
  const when = formatHebrewDate(post.created_at);

  return (
    <li className="bg-paper rounded-3xl border border-navy-900/8 overflow-hidden">
      <div className="p-6 lg:p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-11 rounded-full bg-navy-900 text-paper grid place-items-center font-display font-black text-base">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-display font-bold text-navy-900 text-base leading-tight">
              {author}
            </p>
            <p className="font-body text-xs text-ink/55">
              {org ? `${org} · ` : ""}
              {when}
            </p>
          </div>
        </div>
        <p className="font-body text-base text-ink/85 whitespace-pre-wrap leading-relaxed">
          {post.body}
        </p>
      </div>
      {post.image_url && (
        <div className="relative w-full aspect-[16/9] bg-cream">
          <Image
            src={post.image_url}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 820px) 100vw, 820px"
          />
        </div>
      )}
    </li>
  );
}

function EmptyFeed({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="bg-paper rounded-3xl border border-dashed border-navy-900/20 p-10 text-center">
      <div className="size-14 rounded-full bg-leaf-500/15 text-leaf-700 grid place-items-center mx-auto mb-4">
        <MessageCircle className="size-7" />
      </div>
      <h3 className="font-display font-black text-xl text-navy-900 mb-2">
        אין עדיין עדכונים
      </h3>
      <p className="font-body text-base text-ink/70 mb-6">
        {isAdmin
          ? "אתם הראשונים — פרסמו את הפוסט הראשון של הקהילה."
          : "הפיד יתמלא ככל שמנהלי הקהילה יפרסמו עדכונים."}
      </p>
      {isAdmin && (
        <Link
          href="/community-space/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-paper rounded-full font-display font-bold text-sm hover:bg-navy-700 transition"
        >
          <Plus className="size-4" />
          פוסט חדש
        </Link>
      )}
    </div>
  );
}

function formatHebrewDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "עכשיו";
  if (diffMin < 60) return `לפני ${diffMin} ד׳`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `לפני ${diffHr} שע׳`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `לפני ${diffDay} ימים`;
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long" });
}
