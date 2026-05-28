import { serviceImpactStats } from "@/data/data-page/service-impact";

export function ServiceImpactSection() {
  return (
    <section className="bg-paper py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-3">
              01 · חב״פ ושירות משמעותי
            </p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-[0.95]">
              מי שגדל בחב״פ - משרת יותר.
            </h2>
            <p className="mt-6 font-body text-base text-ink/70 leading-relaxed">
              בני נוער שהשתתפו לפחות שלוש שנים בתנועות נוער מגיעים בשיעורים גבוהים משמעותית לתפקידי לחימה וקצונה - וההפרש גדל ככל שיורדים באשכול החברתי-כלכלי.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceImpactStats.map((item, i) => (
              <div key={i} className="bg-cream rounded-3xl p-7 border border-navy-900/8 relative overflow-hidden">
                <div aria-hidden className="absolute -top-6 -right-6 w-20 h-20 bg-stripes-soft opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
                <p className="relative font-display font-black text-4xl text-leaf-500 leading-none mb-4 tabular">{item.val}</p>
                <p className="relative font-body text-sm text-ink/85 leading-snug mb-3">{item.label}</p>
                <p className="relative font-body text-[10px] uppercase tracking-wider text-ink/50">{item.src}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
