import type { Metadata } from "next";
import { YouthTrendChart, DistrictBarChart, ParticipationRadial, InternationalCompare, DigitalGapChart } from "@/components/data/charts";
import { stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "נתוני נוער בישראל",
  description: "אטלס נתונים: בני נוער בישראל, השתתפות במסגרות, פערים גיאוגרפיים והשוואה בינלאומית.",
};

function fmt(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + "M";
  if (v >= 1000) return (v / 1000).toFixed(0) + "K";
  return v.toString();
}

export default function DataPage() {
  return (
    <>
      <section className="bg-paper pt-32 pb-16 lg:pt-44 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-1/4 w-[40vmin] h-[40vmin] bg-topic-teal/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-32 left-1/4 w-[40vmin] h-[40vmin] bg-leaf-500/15 blur-3xl rounded-full" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-6">
            אטלס נתוני נוער
          </p>
          <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
            המגרש,<br />
            <span className="outline-text">במספרים.</span>
          </h1>
          <p className="mt-10 font-body text-xl text-ink/80 max-w-3xl leading-relaxed">
            הנתונים הם נקודת ההתחלה של כל שיחה מקצועית. כל המספרים כאן מקורם בלמ״ס, OECD, ומנהל חברה ונוער. תוכן הדגמה — ייעודכן בקרוב לנתונים החיים ביותר.
          </p>
        </div>
      </section>

      {/* Big number row */}
      <section className="bg-paper pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-navy-900/10 rounded-3xl overflow-hidden">
            {stats.slice(0, 6).map((s, i) => (
              <div key={i} className="bg-paper p-8 lg:p-10">
                <p className="font-display font-black text-5xl lg:text-7xl text-navy-900 leading-none mb-4 tabular">
                  {s.prefix}{fmt(s.value)}{s.suffix}
                </p>
                <p className="font-body text-base text-ink/80 mb-2">{s.label}</p>
                <p className="font-body text-xs text-ink/45 uppercase tracking-wider">{s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts grid */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-8 lg:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <article className="lg:col-span-7 bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
                מגמת הגידול
              </p>
              <h3 className="font-display font-black text-3xl text-navy-900 mb-1">בני נוער בישראל</h3>
              <p className="font-body text-sm text-ink/55 mb-8">גילאי 12-18 · באלפים · תחזית 2030</p>
              <YouthTrendChart />
            </article>
            <article className="lg:col-span-5 bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
                שיעור השתתפות
              </p>
              <h3 className="font-display font-black text-3xl text-navy-900 mb-1">במסגרות נוער</h3>
              <p className="font-body text-sm text-ink/55 mb-8">סקר שימוש בזמן 2023</p>
              <ParticipationRadial />
            </article>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <article className="lg:col-span-6 bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
                התפלגות גיאוגרפית
              </p>
              <h3 className="font-display font-black text-3xl text-navy-900 mb-1">בני נוער במחוזות</h3>
              <p className="font-body text-sm text-ink/55 mb-8">למ״ס 2024 · באלפים</p>
              <DistrictBarChart />
            </article>
            <article className="lg:col-span-6 bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
                השוואה בינלאומית
              </p>
              <h3 className="font-display font-black text-3xl text-navy-900 mb-1">השתתפות במסגרות</h3>
              <p className="font-body text-sm text-ink/55 mb-8">OECD 2023</p>
              <InternationalCompare />
            </article>
          </div>

          <article className="bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
              פער דיגיטלי
            </p>
            <h3 className="font-display font-black text-3xl text-navy-900 mb-1">גישה למחשב אישי בבית</h3>
            <p className="font-body text-sm text-ink/55 mb-8">מרכז מול פריפריה · באחוזים · 2020-2024</p>
            <DigitalGapChart />
          </article>
        </div>
      </section>
    </>
  );
}
