import { workforceSource, workforceStats } from "@/data/data-page/workforce";

export function WorkforceSection() {
  return (
    <section className="bg-cream-mesh py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-3">
              04 · כוח האדם בחב״פ
            </p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-[0.95]">
              מי האנשים שבונים את החב״פ?
            </h2>
            <p className="mt-6 font-body text-base text-ink/70 leading-relaxed">
              כ-25 אלף עובדים בשכר, רוב נשי, פערי שכר גבוהים, ותחלופה של 61% כל שנתיים. תמונת מצב של המגזר שמחזיק את החינוך הבלתי-פורמלי על כתפיו.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-navy-900/10 rounded-3xl overflow-hidden">
            {workforceStats.map((item, i) => (
              <div key={i} className="bg-paper p-6 lg:p-8">
                <p className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-none mb-3 tabular">{item.val}</p>
                <p className="font-body text-sm text-ink/75 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 font-body text-xs text-ink/50 uppercase tracking-wider text-end">
          {workforceSource}
        </p>
      </div>
    </section>
  );
}
