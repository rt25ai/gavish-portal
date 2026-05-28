import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Headphones, Newspaper, BookOpen, Play } from "lucide-react";
import { topics, getTopic, getParticipantsByTopic } from "@/data/topics";
import type { TopicSlug } from "@/data/types";
import { topicColorClasses } from "@/styles/topic-colors";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = topics.find((x) => x.slug === slug);
  if (!t) return { title: "תחום לא נמצא" };
  return { title: t.title, description: t.tagline };
}

const resourceIcon = { article: Newspaper, research: BookOpen, podcast: Headphones };
const resourceLabel = { article: "מאמר", research: "מחקר", podcast: "פודקאסט" };

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!topics.find((t) => t.slug === slug)) notFound();
  const topic = getTopic(slug as TopicSlug);
  const team = getParticipantsByTopic(topic.slug);
  const c = topicColorClasses[topic.color];
  const onLight = topic.color === "amber";

  return (
    <>
      {/* Hero */}
      <section className={cn("relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden", c.bg, onLight ? "text-navy-900" : "text-paper")}>
        <div className="absolute -bottom-32 -left-32 w-[60vmin] h-[60vmin] bg-paper/15 blur-3xl rounded-full pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Link href="/topics" className="inline-flex items-center gap-2 mb-10 opacity-70 hover:opacity-100 font-body text-sm">
            <ArrowLeft className="size-4 rotate-180" />
            כל התחומים
          </Link>
          <p className="font-body text-sm tracking-[0.18em] uppercase font-semibold opacity-70 mb-6">
            תחום /{topic.number}
          </p>
          <h1 className="font-display font-black text-jumbo leading-[0.85]">{topic.title}</h1>
          <p className="mt-10 font-body text-2xl lg:text-3xl max-w-3xl opacity-90 leading-tight">{topic.tagline}</p>
          <p className="mt-6 font-body text-lg max-w-3xl opacity-80 leading-relaxed">{topic.description}</p>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-paper-mesh py-24 lg:py-32 relative overflow-hidden">
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
            התובנות שלנו
          </p>
          <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-16">
            מה גילינו.
          </h2>
          <div className="space-y-10">
            {topic.insights.map((ins, i) => (
              <article key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start border-t border-navy-900/10 pt-10">
                <div className="lg:col-span-2">
                  <span className={cn("font-display font-black text-5xl", c.text)}>/{(i + 1).toString().padStart(2, "0")}</span>
                </div>
                <h3 className="lg:col-span-4 font-display font-black text-3xl lg:text-4xl text-navy-900 leading-[0.95]">{ins.title}</h3>
                <p className="lg:col-span-6 font-body text-xl text-ink/80 leading-relaxed">{ins.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section className="bg-navy-900 text-paper py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-crystal opacity-50" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-leaf-300/80 font-semibold mb-4">
            תוכן AI · פודקאסט
          </p>
          <h2 className="font-display text-display font-black leading-[0.95] mb-12">{topic.podcast.title}</h2>
          <div className="bg-paper/10 backdrop-blur rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <button
              type="button"
              className={cn("size-24 rounded-full grid place-items-center transition shrink-0", c.bg, onLight ? "text-navy-900" : "text-paper", "hover:scale-105")}
              aria-label="נגן פודקאסט"
            >
              <Play className="size-10 pr-1" />
            </button>
            <div className="flex-1">
              <p className="font-body text-lg text-paper/85 leading-relaxed mb-4">{topic.podcast.description}</p>
              <p className="font-body text-sm text-paper/50 uppercase tracking-wider">
                משך: {topic.podcast.duration} · נוצר עם AI על בסיס המחקר
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-cream-mesh py-24 lg:py-32 relative overflow-hidden">
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
            הפלט שלנו
          </p>
          <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-12">
            המסמכים<br />שיצרנו.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.documents.map((d, i) => (
              <div key={i} className="bg-paper rounded-2xl p-6 lg:p-8 flex items-center justify-between gap-4 border border-navy-900/8 hover:border-navy-900/30 transition group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={cn("size-14 rounded-xl grid place-items-center", c.soft, c.text)}>
                    <FileText className="size-7" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg text-navy-900">{d.title}</p>
                    <p className="font-body text-sm text-ink/55">PDF · {d.size}</p>
                  </div>
                </div>
                <ArrowLeft className="size-5 text-navy-900 opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External resources */}
      <section className="bg-paper-mesh-soft py-24 lg:py-32 relative overflow-hidden">
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
            ספרייה מקצועית
          </p>
          <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-12">
            חומרים מהעולם.
          </h2>
          <div className="space-y-3">
            {topic.externalResources.map((r, i) => {
              const Icon = resourceIcon[r.type];
              return (
                <a
                  key={i}
                  href={r.href}
                  className="flex items-center gap-6 p-6 bg-cream rounded-2xl hover:bg-bone transition group"
                >
                  <div className={cn("size-12 rounded-xl grid place-items-center", c.soft, c.text)}>
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-1">
                      {resourceLabel[r.type]} · {r.source}
                    </p>
                    <p className="font-display font-bold text-xl text-navy-900 truncate">{r.title}</p>
                  </div>
                  <ArrowLeft className="size-5 text-navy-900 opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream-mesh py-24 lg:py-32 relative overflow-hidden">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
            הצוות שחקר
          </p>
          <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-12">
            האנשים מאחורי המחקר.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {team.map((p) => {
              const initials = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("");
              return (
                <div key={p.id} className="bg-paper rounded-2xl p-5 text-center border border-navy-900/8">
                  <div className={cn("mx-auto size-20 rounded-full grid place-items-center mb-4 font-display font-black text-xl", c.bg, onLight ? "text-navy-900" : "text-paper")}>
                    {initials}
                  </div>
                  <p className="font-display font-bold text-base text-navy-900 mb-1">{p.name}</p>
                  <p className="font-body text-xs text-ink/55">{p.city}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
