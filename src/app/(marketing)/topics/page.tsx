import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { topics, topicColorClasses } from "@/lib/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "אתגרי שורש",
  description: "ארבעה אתגרי שורש שזיהינו במחקר: עבודה מבוססת נתונים, הון אנושי, עיצוב מדיניות בחב\"פ, והשתתפות נוער.",
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
            ארבעת אתגרי<br />
            <span className="outline-text">השורש.</span>
          </h1>
          <p className="mt-10 font-body text-xl text-ink/80 max-w-3xl leading-relaxed">
            לא תחומי דעת - אלא אתגרים בשורש המקצוע של מנהלת מחלקת נוער ברשות. כל צוות צלל לעומקו של אתגר אחד, ראיין אנשי שטח, חיבר תובנות, וייצר חומרי עומק.
          </p>
        </div>
      </section>

      <section className="bg-paper-mesh-soft pb-24 lg:pb-36 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {topics.map((t) => {
              const c = topicColorClasses[t.color];
              return (
                <Link
                  key={t.slug}
                  href={`/topics/${t.slug}`}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl p-10 lg:p-14 aspect-[4/3] lg:aspect-[5/4] flex flex-col justify-between transition-all duration-500 hover:scale-[1.01]",
                    c.bg,
                    t.color === "amber" ? "text-navy-900" : "text-paper",
                  )}
                >
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="font-display font-black text-3xl opacity-50">/{t.number}</span>
                    <span className="text-xs uppercase tracking-[0.2em] opacity-70 font-semibold">אתגר שורש</span>
                  </div>

                  <div className="relative z-10">
                    <h2 className="font-display font-black text-5xl lg:text-7xl leading-[0.9] mb-4">{t.title}</h2>
                    <p className="font-body text-lg lg:text-xl max-w-md opacity-90 mb-8">{t.tagline}</p>
                    <div className="inline-flex items-center gap-3 font-display font-bold text-base group-hover:gap-5 transition-all">
                      <span>לאתגר המלא</span>
                      <ArrowLeft className="size-5" />
                    </div>
                  </div>

                  {/* decor */}
                  <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-paper/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-paper/8 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
