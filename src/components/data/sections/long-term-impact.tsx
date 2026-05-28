import {
  longTermHeadlines,
  metaAnalysisBreakdown,
  metaAnalysisSource,
} from "@/data/data-page/long-term";

export function LongTermImpactSection() {
  return (
    <section className="bg-navy-900 text-paper py-20 lg:py-28 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-crystal opacity-50" />
      <div aria-hidden className="absolute inset-y-0 right-0 w-1/3 bg-stripes-soft opacity-25 [mask-image:linear-gradient(-90deg,black,transparent)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="font-body text-xs uppercase tracking-[0.18em] text-leaf-300 font-semibold mb-3">
          05 · השפעה ארוכת טווח
        </p>
        <h2 className="font-display font-black text-4xl lg:text-5xl leading-[0.95] mb-4">
          מה החב״פ עושה לחיים שלך<br />
          <span className="outline-text">20 שנה אחרי?</span>
        </h2>
        <p className="font-body text-lg text-paper/80 max-w-3xl leading-relaxed mb-12">
          מטא אנליזה של 9,553 מחקרים מצאה שמיומנויות לא-קוגניטיביות (חברתיות, רגשיות) שמפותחות בילדות - מתורגמות למוביליות בשוק העבודה ולירידה בפשיעה ובבעיות נפשיות עשרות שנים אחר כך.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {longTermHeadlines.map((item, i) => (
            <div key={i} className="bg-paper/10 backdrop-blur rounded-3xl p-7 border border-paper/15">
              <p className="font-display font-black text-5xl text-leaf-300 leading-none mb-3 tabular">{item.val}</p>
              <p className="font-body text-base text-paper/85 leading-snug">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-paper/8 backdrop-blur rounded-3xl p-8 lg:p-10 border border-paper/15">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-leaf-300 font-semibold mb-3">
            מטא-אנליזה · 9,553 מחקרים
          </p>
          <h3 className="font-display font-black text-2xl lg:text-3xl text-paper mb-6">
            עלייה של סטיית-תקן אחת בכישורים החברתיים בגיל צעיר →
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metaAnalysisBreakdown.map((item, i) => (
              <div key={i}>
                <p className="font-display font-black text-4xl text-paper leading-none mb-2 tabular">{item.val}</p>
                <p className="font-body text-sm text-paper/75 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 pt-6 border-t border-paper/15 font-body text-xs text-paper/50 uppercase tracking-wider">
            {metaAnalysisSource}
          </p>
        </div>
      </div>
    </section>
  );
}
