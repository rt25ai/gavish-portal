import { genderSplit, householdSpending } from "@/data/data-page/household";

export function HouseholdSection() {
  const h = householdSpending;
  const g = genderSplit;

  return (
    <section className="bg-paper py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-3">
          03 · משתתפים, פערים והוצאה
        </p>
        <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-[0.95] mb-12">
          רוב התשלום נופל על משקי הבית.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-cream-mesh rounded-3xl p-8 lg:p-10 border border-navy-900/8 relative overflow-hidden">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-3">
              הוצאה חודשית על תרבות, בידור וספורט
            </p>
            <h3 className="font-display font-black text-2xl text-navy-900 mb-8">
              פער של פי 5 בין העשירונים
            </h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-body text-sm text-ink/70">{h.top.label}</span>
                  <span className="font-display font-black text-3xl text-navy-900 tabular">{h.top.amount}</span>
                </div>
                <div className="h-3 bg-navy-900/8 rounded-full overflow-hidden">
                  <div className="h-full bg-navy-900 rounded-full" style={{ width: `${h.top.widthPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-body text-sm text-ink/70">{h.bottom.label}</span>
                  <span className="font-display font-black text-3xl text-leaf-500 tabular">{h.bottom.amount}</span>
                </div>
                <div className="h-3 bg-navy-900/8 rounded-full overflow-hidden">
                  <div className="h-full bg-leaf-500 rounded-full" style={{ width: `${h.bottom.widthPct}%` }} />
                </div>
              </div>
            </div>
            <p className="mt-6 pt-6 border-t border-navy-900/10 font-body text-xs text-ink/50 uppercase tracking-wider">
              {h.source}
            </p>
          </div>

          <div className="bg-navy-900 text-paper rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            <div aria-hidden className="absolute -top-12 -left-12 w-44 h-44 bg-leaf-500/20 blur-3xl rounded-full" />
            <p className="relative font-body text-xs uppercase tracking-[0.18em] text-leaf-300 font-semibold mb-3">
              פער מגדרי במשתתפים
            </p>
            <h3 className="relative font-display font-black text-2xl mb-8">
              בנות מובילות, בנים מאחור
            </h3>
            <div className="relative grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="font-display font-black text-7xl text-leaf-300 leading-none mb-3 tabular">{g.female.pct}</p>
                <p className="font-body text-sm text-paper/80">{g.female.label}</p>
              </div>
              <div className="text-center">
                <p className="font-display font-black text-7xl text-paper/60 leading-none mb-3 tabular">{g.male.pct}</p>
                <p className="font-body text-sm text-paper/60">{g.male.label}</p>
              </div>
            </div>
            <p className="relative mt-8 pt-6 border-t border-paper/15 font-body text-xs text-paper/50 uppercase tracking-wider">
              {g.source}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
