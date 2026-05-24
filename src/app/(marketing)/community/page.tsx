import type { Metadata } from "next";
import { ParticipantCard } from "@/components/community/participant-card";
import { participants, topics, topicColorClasses } from "@/lib/content";

export const metadata: Metadata = {
  title: "חברי הקהילה",
  description: "18 מנהלות ומנהלי מחלקות נוער מ-18 רשויות ברחבי ישראל. הכירו את המחזור הראשון של גביש.",
};

export default function CommunityPage() {
  return (
    <>
      <section className="bg-paper pt-32 pb-12 lg:pt-44 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/3 w-[40vmin] h-[40vmin] bg-topic-teal/15 blur-3xl rounded-full" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-6">
            מחזור א׳ · 2026
          </p>
          <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
            <span className="text-leaf-500">18</span> מובילות ומובילים.<br />
            <span className="outline-text">רשת אחת.</span>
          </h1>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <p className="lg:col-span-7 font-body text-xl text-ink/80 leading-relaxed">
              מנהלות ומנהלי מחלקות הנוער של 18 רשויות, מהצפון לדרום, מהמרכז לפריפריה. כל אחד הוא קול. ביחד — קהילה מקצועית.
            </p>
            <div className="lg:col-span-5">
              <p className="font-body text-sm uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-3">צוותי המחקר</p>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const c = topicColorClasses[t.color];
                  return (
                    <span key={t.slug} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${c.soft} text-navy-900 text-sm font-semibold`}>
                      <span className={`size-2 rounded-full ${c.bg}`} />
                      {t.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24 lg:pb-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
            {participants.map((p, i) => {
              const big = i % 7 === 0;
              return (
                <div
                  key={p.id}
                  className={big ? "col-span-2 row-span-2" : ""}
                >
                  <ParticipantCard p={p} size={big ? "lg" : "md"} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
