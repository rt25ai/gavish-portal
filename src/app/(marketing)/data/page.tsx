import type { Metadata } from "next";
import { YouthTrendChart, DistrictBarChart, ParticipationRadial, InternationalCompare } from "@/components/data/charts";
import { stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "נתוני נוער בישראל 2026",
  description: "אטלס נתונים מעודכן: בני נוער בישראל, השתתפות במסגרות, פערים גיאוגרפיים והשוואה בינלאומית. מקורות: למ״ס, OECD, מינהל חברה ונוער.",
};

function fmt(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + "M";
  if (v >= 1000) return (v / 1000).toFixed(0) + "K";
  return v.toString();
}

export default function DataPage() {
  return (
    <>
      <section className="bg-paper-mesh pt-32 pb-16 lg:pt-44 lg:pb-20 relative overflow-hidden">
        {/* signature diagonal stripes panel */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-1/4 w-[40vmin] h-[40vmin] bg-leaf-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-32 left-1/4 w-[40vmin] h-[40vmin] bg-leaf-700/12 blur-3xl rounded-full" />
          <div aria-hidden className="hidden lg:block absolute top-10 left-10 w-32 h-44 bg-stripes-soft opacity-80 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-6">
            אטלס נתוני נוער · נתוני זהב 2026
          </p>
          <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
            המגרש,<br />
            <span className="outline-text">במספרים.</span>
          </h1>
          <p className="mt-10 font-body text-xl text-ink/80 max-w-3xl leading-relaxed">
            הנתונים הם נקודת ההתחלה של כל שיחה מקצועית. כל המספרים כאן מקורם בלמ״ס, OECD, מינהל חברה ונוער, מרכז המחקר והמידע של הכנסת, ומכון ברוקדייל. הנתונים מתעדכנים בכל רבעון.
          </p>
        </div>
      </section>

      {/* Big number row - 9 golden stats */}
      <section className="bg-paper-mesh-soft pb-16 lg:pb-24 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-navy-900/10 rounded-3xl overflow-hidden">
            {stats.map((s, i) => (
              <div key={i} className="bg-paper p-8 lg:p-10">
                <p className="font-display font-black text-5xl lg:text-6xl text-navy-900 leading-none mb-4 tabular">
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
      <section className="bg-cream-mesh py-24 lg:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-8 lg:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <article className="lg:col-span-7 bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
                מגמת הגידול
              </p>
              <h3 className="font-display font-black text-3xl text-navy-900 mb-1">בני נוער בישראל</h3>
              <p className="font-body text-sm text-ink/55 mb-8">גילאי 12-17 · באלפים · למ״ס + תחזית 2030</p>
              <YouthTrendChart />
            </article>
            <article className="lg:col-span-5 bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8 relative overflow-hidden">
              <div aria-hidden className="absolute -bottom-10 -left-10 w-44 h-44 bg-stripes-soft opacity-60 [mask-image:radial-gradient(closest-side,black,transparent)] pointer-events-none" />
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
                שיעור השתתפות בחב״פ
              </p>
              <h3 className="font-display font-black text-3xl text-navy-900 mb-1">1 מכל 3</h3>
              <p className="font-body text-sm text-ink/55 mb-8">מינהל חברה ונוער · 2025</p>
              <ParticipationRadial />
            </article>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <article className="lg:col-span-6 bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
                התפלגות גיאוגרפית
              </p>
              <h3 className="font-display font-black text-3xl text-navy-900 mb-1">בני נוער במחוזות</h3>
              <p className="font-body text-sm text-ink/55 mb-8">למ״ס 2026 · באלפים · גילאי 12-17</p>
              <DistrictBarChart />
            </article>
            <article className="lg:col-span-6 bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/60 font-semibold mb-2">
                השוואה בינלאומית
              </p>
              <h3 className="font-display font-black text-3xl text-navy-900 mb-1">השתתפות בחינוך בלתי-פורמלי</h3>
              <p className="font-body text-sm text-ink/55 mb-8">OECD · Education at a Glance 2025</p>
              <InternationalCompare />
            </article>
          </div>

          {/* Gold-data callout - "מה זה אומר?" */}
          <article className="bg-navy-900 text-paper rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            <div aria-hidden className="absolute inset-y-0 left-0 w-1/2 bg-stripes-soft opacity-30 pointer-events-none [mask-image:linear-gradient(90deg,black,transparent)]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <p className="font-body text-xs uppercase tracking-[0.18em] text-leaf-300 font-semibold mb-3">
                  נתוני זהב · ההקשר
                </p>
                <h3 className="font-display font-black text-4xl leading-[0.95]">למה זה חשוב</h3>
              </div>
              <div className="lg:col-span-8 space-y-6 font-body text-lg leading-relaxed text-paper/85">
                <p>
                  <strong className="text-paper">76% מעובדי ההייטק</strong> בישראל השתתפו בפעילות חינוך בלתי-פורמלי בנעוריהם.
                  השתתפות בתנועות נוער מעלה ב-7 נקודות אחוז את הסיכוי לסיים 5 יח״ל מתמטיקה, וחוגי ספורט - ב-20 נקודות אחוז.
                </p>
                <p>
                  ועדיין - רק <strong className="text-paper">30% מבני הנוער</strong> משתתפים במסגרת בלתי-פורמלית (1 מתוך 3),
                  ופחות מזה ברשויות חלשות. הפער המגדרי גם הוא דרמטי: 70% מהמשתתפים הן בנות, רק 30% בנים.
                </p>
                <p>
                  התשואה לתקן של ארגוני נוער גדולה ב-67% מתקן מקביל בחינוך הפורמלי -
                  5,200 תקנים מייצרים 4 מיליון שעות פעילות בשנה. ולמרות זאת, רק 2% מתקציב משרד החינוך הולכים לתחום הבלתי-פורמלי.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
