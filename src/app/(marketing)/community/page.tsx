import type { Metadata } from "next";
import { ParticipantCard } from "@/components/community/participant-card";
import { participants } from "@/data/participants";
import { topics } from "@/data/topics";
import { topicColorClasses } from "@/styles/topic-colors";

export const metadata: Metadata = {
  title: "חברי הקהילה",
  description: "17 מנהלות ומנהלי מחלקות נוער ברחבי ישראל. הכירו את המחזור הראשון של גביש.",
};

export default function CommunityPage() {
  const community = participants.filter((p) => p.status === "community");
  const alumni = participants.filter((p) => p.status === "alumni");

  return (
    <>
      <section className="bg-paper-mesh pt-32 pb-12 lg:pt-44 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/3 w-[40vmin] h-[40vmin] bg-leaf-500/15 blur-3xl rounded-full" />
          <div aria-hidden className="hidden lg:block absolute top-32 right-12 w-32 h-44 bg-stripes-soft opacity-70 [mask-image:linear-gradient(135deg,black,transparent)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-6">
            מחזור א׳ · 2026
          </p>
          <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
            <span className="text-leaf-500">{community.length}</span> מובילות ומובילים.<br />
            <span className="outline-text">קהילה אחת.</span>
          </h1>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <p className="lg:col-span-7 font-body text-xl text-ink/80 leading-relaxed">
              מנהלות ומנהלי מחלקות הנוער מ-17 רשויות, מהצפון לדרום, מהמרכז לפריפריה. כל אחד הוא קול. ביחד - קהילה מקצועית לומדת.
            </p>
            <div className="lg:col-span-5">
              <p className="font-body text-sm uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-3">האתגרים המרכזיים</p>
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

      {/* Active community members */}
      <section className="bg-paper-mesh-soft pb-16 lg:pb-24 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-2">
                סטטוס · ממשיכים לקהילה הלומדת
              </p>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900">חברי הקהילה</h2>
            </div>
            <p className="font-body text-sm text-ink/60 max-w-md">
              משתתפי המחזור הראשון שממשיכים אל הקהילה הלומדת הרחבה החל מאוקטובר 2026.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
            {community.map((p, i) => {
              const big = i % 7 === 0;
              return (
                <div key={p.id} className={big ? "col-span-2 row-span-2" : ""}>
                  <ParticipantCard p={p} size={big ? "lg" : "md"} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alumni section - shown only when there are alumni */}
      {alumni.length > 0 && (
        <section className="bg-cream-mesh py-20 lg:py-28 relative overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-2">
                  סטטוס · בוגרים
                </p>
                <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900">בוגרי המחזור</h2>
              </div>
              <p className="font-body text-sm text-ink/60 max-w-md">
                משתתפים שסיימו את התוכנית ואינם ממשיכים לקהילה הלומדת בשלב זה - חלק מהדור הראשון של גביש.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
              {alumni.map((p) => (
                <ParticipantCard key={p.id} p={p} size="md" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
