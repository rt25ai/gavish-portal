import {
  DistrictBarChart,
  InternationalCompare,
  ParticipationRadial,
  YouthTrendChart,
} from "@/components/data/charts";

export function ChartsGrid() {
  return (
    <section className="bg-cream-mesh py-20 lg:py-28 relative overflow-hidden">
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
              השוואה בינלאומית · להקשר
            </p>
            <h3 className="font-display font-black text-3xl text-navy-900 mb-1">השתתפות בחינוך בלתי-פורמלי</h3>
            <p className="font-body text-sm text-ink/55 mb-8">OECD · Education at a Glance 2025</p>
            <InternationalCompare />
          </article>
        </div>
      </div>
    </section>
  );
}
