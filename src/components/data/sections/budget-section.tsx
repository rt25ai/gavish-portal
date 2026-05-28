import { budgetHeadline, positionsBreakdown } from "@/data/data-page/budget";

export function BudgetSection() {
  const h = budgetHeadline;
  const p = positionsBreakdown;

  return (
    <section className="bg-cream-mesh py-20 lg:py-28 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-12 w-40 h-60 bg-stripes-soft opacity-40 [mask-image:linear-gradient(135deg,black,transparent)]" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-3">
              02 · תקציב, תקנים ותשואה
            </p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-[0.95]">
              פחות תקציב,<br />יותר תפוקה.
            </h2>
            <p className="mt-6 font-body text-base text-ink/70 leading-relaxed">
              ארגוני הנוער מקבלים פחות מ-0.2% מתקציב משרד החינוך ומספקים יותר משעור התקצוב. תשואה לתקן של ארגוני נוער גדולה ב-67% מתקן מקביל בחינוך הפורמלי.
            </p>
          </div>
          <div className="lg:col-span-7 bg-navy-900 text-paper rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            <div aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-stripes-soft opacity-30 [mask-image:linear-gradient(90deg,black,transparent)]" />
            <p className="relative font-body text-xs uppercase tracking-[0.18em] text-leaf-300 font-semibold mb-4">
              תקציב חב״פ 2018
            </p>
            <div className="relative grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="font-display font-black text-5xl text-paper leading-none mb-1 tabular">{h.total}</p>
                <p className="font-body text-sm text-paper/70">{h.totalLabel}</p>
              </div>
              <div>
                <p className="font-display font-black text-5xl text-paper leading-none mb-1 tabular">{h.pctOfEd}</p>
                <p className="font-body text-sm text-paper/70">{h.pctOfEdLabel}</p>
              </div>
              <div>
                <p className="font-display font-black text-3xl text-paper/85 leading-none mb-1 tabular">{h.supplemental}</p>
                <p className="font-body text-sm text-paper/65">{h.supplementalLabel}</p>
              </div>
              <div>
                <p className="font-display font-black text-3xl text-paper/85 leading-none mb-1 tabular">{h.coreInformal}</p>
                <p className="font-body text-sm text-paper/65">{h.coreInformalLabel}</p>
              </div>
            </div>
            <p className="relative mt-6 pt-6 border-t border-paper/15 font-body text-xs text-paper/50 uppercase tracking-wider">
              {h.source}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-paper rounded-3xl p-7 border border-navy-900/8">
            <p className="font-display font-black text-4xl text-navy-900 mb-3 tabular">{p.positions.value}</p>
            <p className="font-body text-sm text-ink/80 leading-snug mb-2">
              <strong>תקנים</strong> לארגוני נוער (מול כ-3M תקנים בחינוך הפורמלי בכל א׳-יב׳)
            </p>
            <p className="font-body text-[10px] uppercase tracking-wider text-ink/50">{p.positions.source}</p>
          </div>
          <div className="bg-paper rounded-3xl p-7 border border-navy-900/8">
            <p className="font-display font-black text-4xl text-navy-900 mb-3 tabular">{p.hours.value}</p>
            <p className="font-body text-sm text-ink/80 leading-snug mb-2">
              <strong>שעות פעילות בשנה</strong> שמייצרים ארגוני הנוער מתוך אותם 5,200 תקנים
            </p>
            <p className="font-body text-[10px] uppercase tracking-wider text-ink/50">{p.hours.source}</p>
          </div>
          <div className="bg-leaf-500 text-paper rounded-3xl p-7 relative overflow-hidden">
            <div aria-hidden className="absolute -top-8 -left-8 w-32 h-32 bg-stripes-soft opacity-30 [mask-image:radial-gradient(closest-side,black,transparent)]" />
            <p className="relative font-display font-black text-4xl mb-3 tabular">{p.returnOnPosition.value}</p>
            <p className="relative font-body text-sm text-paper/90 leading-snug mb-2">
              <strong>תשואה לתקן</strong> של ארגוני הנוער לעומת תקן מקביל בחינוך הפורמלי
            </p>
            <p className="relative font-body text-[10px] uppercase tracking-wider text-paper/65">{p.returnOnPosition.source}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
