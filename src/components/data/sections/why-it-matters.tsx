export function WhyItMattersSection() {
  return (
    <section className="bg-cream-mesh py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
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
  );
}
