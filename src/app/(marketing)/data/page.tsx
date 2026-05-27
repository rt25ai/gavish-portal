import type { Metadata } from "next";
import { YouthTrendChart, DistrictBarChart, ParticipationRadial, InternationalCompare } from "@/components/data/charts";
import { stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "נתוני זהב",
  description: "נתוני זהב על חינוך בלתי פורמלי בישראל: השתתפות, תקציב, השפעה כלכלית-חברתית, ומיומנויות לא קוגניטיביות. מקורות: למ״ס, OECD, ממ\"מ הכנסת, מכון ברוקדייל, מכון דיאלוג.",
};

function fmt(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + "M";
  if (v >= 1000) return (v / 1000).toFixed(0) + "K";
  return v.toString();
}

export default function DataPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper-mesh pt-32 pb-16 lg:pt-44 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-1/4 w-[40vmin] h-[40vmin] bg-leaf-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-32 left-1/4 w-[40vmin] h-[40vmin] bg-leaf-700/12 blur-3xl rounded-full" />
          <div aria-hidden className="hidden lg:block absolute top-10 left-10 w-32 h-44 bg-stripes-soft opacity-80 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-6">
            נתוני זהב · חינוך בלתי-פורמלי בישראל
          </p>
          <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
            המגרש,<br />
            <span className="outline-text">במספרים.</span>
          </h1>
          <p className="mt-10 font-body text-xl text-ink/80 max-w-3xl leading-relaxed">
            הנתונים הם נקודת ההתחלה של כל שיחה מקצועית. כל המספרים כאן מקורם בלמ״ס, OECD, מינהל חברה ונוער, מרכז המחקר והמידע של הכנסת, מכון ברוקדייל, ומכון דיאלוג. הנתונים מתעדכנים בכל רבעון.
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

      {/* SECTION: חב"פ ושירות משמעותי */}
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
              {[
                { val: "71%", label: "ממסיימי קורס הטיס יוני 2017 (מחזור 174) - בוגרי תנועות נוער", src: "חיל האוויר" },
                { val: "48%", label: "מאותם בוגרי קורס טיס - גם בוגרי שנת שירות או מכינה קדם-צבאית", src: "חיל האוויר" },
                { val: "פי 2 / 4", label: "שיעור המשרתים בקרבי בקרב גברים / נשים בוגרי תנועות נוער (3+ שנים)", src: "מכון דיאלוג, 2018" },
                { val: "פי 1.8 / 2.3", label: "שיעור היציאה לקורס קצינים בקרב גברים / נשים בוגרי תנועות נוער", src: "מכון דיאלוג, 2018" },
                { val: "פי 3.7", label: "פער היציאה לקצונה (גברים) בקרב בוגרי תנועות נוער באשכול חברתי-כלכלי נמוך", src: "מכון דיאלוג, 2018" },
                { val: "פי 3.4", label: "פער היציאה לקצונה (נשים) באשכול חברתי-כלכלי נמוך", src: "מכון דיאלוג, 2018" },
              ].map((item, i) => (
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

      {/* SECTION: תקציב + תשואה לתקן */}
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
                  <p className="font-display font-black text-5xl text-paper leading-none mb-1 tabular">₪1.77B</p>
                  <p className="font-body text-sm text-paper/70">סה״כ תקציב חב״פ</p>
                </div>
                <div>
                  <p className="font-display font-black text-5xl text-paper leading-none mb-1 tabular">2%</p>
                  <p className="font-body text-sm text-paper/70">מתקציב משרד החינוך</p>
                </div>
                <div>
                  <p className="font-display font-black text-3xl text-paper/85 leading-none mb-1 tabular">₪1.2B</p>
                  <p className="font-body text-sm text-paper/65">תכניות תוספתיות (קייטנות, צהרונים)</p>
                </div>
                <div>
                  <p className="font-display font-black text-3xl text-paper/85 leading-none mb-1 tabular">₪800M</p>
                  <p className="font-body text-sm text-paper/65">לחב״פ גרידא (מתוך ~₪52B תקציב חינוך)</p>
                </div>
              </div>
              <p className="relative mt-6 pt-6 border-t border-paper/15 font-body text-xs text-paper/50 uppercase tracking-wider">
                מקור: מרכז המחקר והמידע של הכנסת, 2020
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-paper rounded-3xl p-7 border border-navy-900/8">
              <p className="font-display font-black text-4xl text-navy-900 mb-3 tabular">5,200</p>
              <p className="font-body text-sm text-ink/80 leading-snug mb-2">
                <strong>תקנים</strong> לארגוני נוער (מול כ-3M תקנים בחינוך הפורמלי בכל א׳-יב׳)
              </p>
              <p className="font-body text-[10px] uppercase tracking-wider text-ink/50">משרד החינוך, 2017</p>
            </div>
            <div className="bg-paper rounded-3xl p-7 border border-navy-900/8">
              <p className="font-display font-black text-4xl text-navy-900 mb-3 tabular">4M</p>
              <p className="font-body text-sm text-ink/80 leading-snug mb-2">
                <strong>שעות פעילות בשנה</strong> שמייצרים ארגוני הנוער מתוך אותם 5,200 תקנים
              </p>
              <p className="font-body text-[10px] uppercase tracking-wider text-ink/50">משרד החינוך, 2017</p>
            </div>
            <div className="bg-leaf-500 text-paper rounded-3xl p-7 relative overflow-hidden">
              <div aria-hidden className="absolute -top-8 -left-8 w-32 h-32 bg-stripes-soft opacity-30 [mask-image:radial-gradient(closest-side,black,transparent)]" />
              <p className="relative font-display font-black text-4xl mb-3 tabular">+67%</p>
              <p className="relative font-body text-sm text-paper/90 leading-snug mb-2">
                <strong>תשואה לתקן</strong> של ארגוני הנוער לעומת תקן מקביל בחינוך הפורמלי
              </p>
              <p className="relative font-body text-[10px] uppercase tracking-wider text-paper/65">חישוב על בסיס נתוני משרד החינוך</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: הוצאת משקי בית + פער מגדרי */}
      <section className="bg-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-3">
            03 · משתתפים, פערים והוצאה
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-[0.95] mb-12">
            רוב התשלום נופל על משקי הבית.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Household spending */}
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
                    <span className="font-body text-sm text-ink/70">עשירון עליון</span>
                    <span className="font-display font-black text-3xl text-navy-900 tabular">₪1,212</span>
                  </div>
                  <div className="h-3 bg-navy-900/8 rounded-full overflow-hidden">
                    <div className="h-full bg-navy-900 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-body text-sm text-ink/70">עשירון תחתון</span>
                    <span className="font-display font-black text-3xl text-leaf-500 tabular">₪239</span>
                  </div>
                  <div className="h-3 bg-navy-900/8 rounded-full overflow-hidden">
                    <div className="h-full bg-leaf-500 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
              </div>
              <p className="mt-6 pt-6 border-t border-navy-900/10 font-body text-xs text-ink/50 uppercase tracking-wider">
                למ״ס · שנת 2019
              </p>
            </div>

            {/* Gender gap */}
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
                  <p className="font-display font-black text-7xl text-leaf-300 leading-none mb-3 tabular">70%</p>
                  <p className="font-body text-sm text-paper/80">בנות מתוך המשתתפים</p>
                </div>
                <div className="text-center">
                  <p className="font-display font-black text-7xl text-paper/60 leading-none mb-3 tabular">30%</p>
                  <p className="font-body text-sm text-paper/60">בנים מתוך המשתתפים</p>
                </div>
              </div>
              <p className="relative mt-8 pt-6 border-t border-paper/15 font-body text-xs text-paper/50 uppercase tracking-wider">
                מינהל חברה ונוער
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: מועסקים בחב"פ */}
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
              {[
                { val: "25K", label: "עובדים בשכר בחב״פ" },
                { val: "68%", label: "נשים מתוך העובדים" },
                { val: "61%", label: "תחלופת עובדים כל שנתיים" },
                { val: "91%", label: "מהעובדים יהודים" },
              ].map((item, i) => (
                <div key={i} className="bg-paper p-6 lg:p-8">
                  <p className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-none mb-3 tabular">{item.val}</p>
                  <p className="font-body text-sm text-ink/75 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 font-body text-xs text-ink/50 uppercase tracking-wider text-end">
            מקור: מכון ברוקדייל-JDC · נתוני 2019, פורסם 2024
          </p>
        </div>
      </section>

      {/* SECTION: השפעה ארוכת טווח (מיומנויות לא-קוגניטיביות + הייטק) */}
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
            {[
              { val: "76%", label: "מעובדי ההייטק בישראל השתתפו בפעילות חב״פ בנעוריהם" },
              { val: "+20pp", label: "סיכוי לסיים 5 יח״ל מתמטיקה לחניכי חוגי ספורט" },
              { val: "+7pp", label: "סיכוי לסיים 5 יח״ל מתמטיקה לחניכי תנועות נוער" },
            ].map((item, i) => (
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
              <div>
                <p className="font-display font-black text-4xl text-paper leading-none mb-2 tabular">+4pp</p>
                <p className="font-body text-sm text-paper/75 leading-snug">סבירות להישאר בבית הספר אחרי גיל 16</p>
              </div>
              <div>
                <p className="font-display font-black text-4xl text-paper leading-none mb-2 tabular">+2pp</p>
                <p className="font-body text-sm text-paper/75 leading-snug">סבירות לסיים תואר בהשכלה גבוהה</p>
              </div>
              <div>
                <p className="font-display font-black text-4xl text-paper leading-none mb-2 tabular">+2.4pp</p>
                <p className="font-body text-sm text-paper/75 leading-snug">סבירות להיות מועסק/ת בגיל 42 (+8 חודשי ניסיון תעסוקתי)</p>
              </div>
              <div>
                <p className="font-display font-black text-4xl text-paper leading-none mb-2 tabular">-20%</p>
                <p className="font-body text-sm text-paper/75 leading-snug">סבירות לבעיות נפשיות בגיל 42, וירידה של 7% בסבירות לפשיעה (גילאי 33-42)</p>
              </div>
            </div>
            <p className="mt-8 pt-6 border-t border-paper/15 font-body text-xs text-paper/50 uppercase tracking-wider">
              מקור: מטא-אנליזה כלכלית של 9,553 מחקרים על מיומנויות לא-קוגניטיביות
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: אין גורם מתכלל - ציטוט מהכנסת */}
      <section className="bg-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-3">
            06 · אין גורם מתכלל
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-[0.95] mb-10">
            אין חובה חוקית בישראל<br />
            <span className="outline-text">לחינוך בלתי-פורמלי.</span>
          </h2>
          <blockquote className="border-r-4 border-leaf-500 pr-6 lg:pr-10 mb-10">
            <p className="font-body text-xl lg:text-2xl text-ink/90 leading-relaxed mb-6">
              &ldquo;משרד החינוך הוא בעל האחריות הכוללת על שירותי חינוך בישראל, לרבות חינוך בלתי-פורמלי,
              אך לא מוטלת עליו חובה חוקית לספק שירותי חינוך בלתי-פורמלי, אלא חובת פיקוח בלבד בתחומים מסוימים (צהרונים, קייטנות).&rdquo;
            </p>
            <footer className="font-body text-sm text-ink/60 uppercase tracking-wider">
              — מרכז המחקר והמידע של הכנסת, 2020
            </footer>
          </blockquote>
          <blockquote className="border-r-4 border-navy-900/30 pr-6 lg:pr-10">
            <p className="font-body text-lg text-ink/85 leading-relaxed mb-4">
              &ldquo;אנחנו לא רוצים להשאיר את שיקול הדעת שראש עיר יצטרך לבחור בין אדנית לבין רכז נוער. אז צריך שיהיה פה אדניות, אבל צריך שיהיה גם סטנדרט מינימלי של חינוך בלתי-פורמלי ברשויות המקומיות. סטנדרט בעניין של החינוך הבלתי-פורמלי חייב להיות בישראל, חייב.&rdquo;
            </p>
            <footer className="font-body text-sm text-ink/60 uppercase tracking-wider">
              — יואל חסון, יו״ר הוועדה לענייני ביקורת המדינה, 2011
            </footer>
          </blockquote>
        </div>
      </section>

      {/* SECTION CTA: למה זה חשוב */}
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
    </>
  );
}
