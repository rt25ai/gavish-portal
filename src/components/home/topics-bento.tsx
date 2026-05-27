"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { topics, topicPastelClasses } from "@/lib/content";
import { TopicIllustration } from "@/components/home/topic-illustrations";
import { cn } from "@/lib/cn";

export function TopicsBento() {
  return (
    <section className="bg-cream-mesh py-24 lg:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div className="max-w-2xl">
            <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
              ארבעה אתגרים · ארבע פרספקטיבות
            </p>
            <h2 className="font-display text-display font-black text-navy-900 leading-[0.95]">
              4 האתגרים<br />
              <span className="outline-text">המרכזיים שחקרנו.</span>
            </h2>
          </div>
          <Link
            href="/topics"
            className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-navy-900 hover:bg-navy-900 hover:text-paper rounded-full font-display font-bold transition"
          >
            כל האתגרים
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-fr gap-4 lg:gap-6">
          {topics.map((t) => {
            const c = topicPastelClasses[t.color];
            const titleLong = t.title.length > 14;
            return (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-8 lg:p-12 flex flex-col justify-between min-h-[300px] lg:min-h-[340px] border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(15,30,71,0.3)]",
                  c.surface,
                  c.ring,
                )}
              >
                {/* large faint illustration as a watermark */}
                <TopicIllustration
                  slug={t.slug}
                  className={cn(
                    "pointer-events-none absolute -bottom-6 -left-6 w-48 h-48 lg:w-56 lg:h-56 opacity-[0.10]",
                    c.ink,
                  )}
                />
                {/* signature stripes, very soft */}
                <div aria-hidden className="absolute top-0 right-0 w-28 h-28 bg-stripes-soft opacity-30 [mask-image:linear-gradient(225deg,black,transparent)] pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between">
                  <span className={cn("font-display font-black text-2xl", c.ink)}>/{t.number}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-navy-700/50 font-semibold">
                    אתגר מרכזי
                  </span>
                </div>

                {/* crisp small illustration chip */}
                <div className="relative z-10 mt-6 mb-auto">
                  <span className={cn("inline-grid place-items-center size-14 rounded-2xl bg-paper/70 border", c.ring, c.ink)}>
                    <TopicIllustration slug={t.slug} className="size-8" />
                  </span>
                </div>

                <div className="relative z-10">
                  <h3
                    className={cn(
                      "font-display font-black leading-[0.95] mb-3 text-balance text-navy-900",
                      titleLong ? "text-3xl lg:text-5xl" : "text-4xl lg:text-6xl",
                    )}
                  >
                    {t.title}
                  </h3>
                  <p className="font-body text-base lg:text-lg max-w-md text-ink/70 mb-6 text-balance">
                    {t.tagline}
                  </p>
                  <div className={cn("inline-flex items-center gap-2 font-display font-bold text-sm group-hover:gap-4 transition-all", c.ink)}>
                    <span>גלו עוד</span>
                    <ArrowLeft className="size-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
