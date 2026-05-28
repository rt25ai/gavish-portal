import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { topics } from "@/data/topics";
import { topicPastelClasses } from "@/styles/topic-colors";
import { TopicIllustration } from "@/components/home/topic-illustrations";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "4 האתגרים המרכזיים",
  description: "ארבעת האתגרים המרכזיים שזיהינו במחקר: עבודה מבוססת נתונים, הון אנושי, עיצוב מדיניות בחב\"פ, והשתתפות נוער.",
};

export default function TopicsHubPage() {
  return (
    <>
      <section className="bg-paper-mesh pt-32 pb-12 lg:pt-44 lg:pb-16 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/3 w-[42vmin] h-[42vmin] bg-leaf-500/10 blur-3xl rounded-full" />
          <div className="hidden lg:block absolute top-32 right-12 w-32 h-44 bg-stripes-soft opacity-70 [mask-image:linear-gradient(135deg,black,transparent)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-6">
            ארבעה צוותים · תשעה חודשי מחקר
          </p>
          <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
            4 האתגרים<br />
            <span className="outline-text">המרכזיים.</span>
          </h1>
          <p className="mt-10 font-body text-xl text-ink/80 max-w-3xl leading-relaxed">
            ארבעה אתגרים מרכזיים בלב המקצוע של מנהלת מחלקת נוער ברשות. כל צוות צלל לעומקו של אתגר אחד, ראיין אנשי שטח, חיבר תובנות, וייצר חומרי עומק.
          </p>
        </div>
      </section>

      <section className="bg-paper-mesh-soft pb-24 lg:pb-36 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-fr gap-4 lg:gap-6">
            {topics.map((t) => {
              const c = topicPastelClasses[t.color];
              // longer titles get a smaller display size so the card stays balanced
              const titleLong = t.title.length > 14;
              return (
                <Link
                  key={t.slug}
                  href={`/topics/${t.slug}`}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl p-10 lg:p-14 min-h-[24rem] lg:min-h-[26rem] flex flex-col justify-between border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(15,30,71,0.3)]",
                    c.surface,
                    c.ring,
                  )}
                >
                  {/* large faint illustration watermark */}
                  <TopicIllustration
                    slug={t.slug}
                    className={cn(
                      "pointer-events-none absolute -bottom-8 -left-8 w-56 h-56 lg:w-64 lg:h-64 opacity-[0.10]",
                      c.ink,
                    )}
                  />
                  <div aria-hidden className="absolute top-0 right-0 w-32 h-32 bg-stripes-soft opacity-30 [mask-image:linear-gradient(225deg,black,transparent)] pointer-events-none" />

                  <div className="relative z-10 flex items-start justify-between">
                    <span className={cn("font-display font-black text-3xl", c.ink)}>/{t.number}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-navy-700/50 font-semibold">אתגר מרכזי</span>
                  </div>

                  {/* crisp illustration chip */}
                  <div className="relative z-10 mt-8">
                    <span className={cn("inline-grid place-items-center size-16 rounded-2xl bg-paper/70 border", c.ring, c.ink)}>
                      <TopicIllustration slug={t.slug} className="size-9" />
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto pt-8">
                    <h2
                      className={cn(
                        "font-display font-black leading-[0.9] mb-4 text-balance text-navy-900",
                        titleLong ? "text-4xl lg:text-5xl" : "text-5xl lg:text-7xl",
                      )}
                    >
                      {t.title}
                    </h2>
                    <p className="font-body text-lg lg:text-xl max-w-md text-ink/70 mb-8 text-balance">{t.tagline}</p>
                    <div className={cn("inline-flex items-center gap-3 font-display font-bold text-base group-hover:gap-5 transition-all", c.ink)}>
                      <span>לאתגר המלא</span>
                      <ArrowLeft className="size-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
