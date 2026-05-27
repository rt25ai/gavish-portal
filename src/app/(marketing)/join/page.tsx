import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Mail, MapPin, Phone, User, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "הצטרפות לקהילת גביש",
  description: "קהילה מקצועית לומדת למנהלי ומנהלות מחלקות הנוער ברשויות המקומיות. ההרשמה תיפתח באוקטובר 2026.",
};

export default function JoinPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-44 pb-16 lg:pb-24 overflow-hidden bg-paper-mesh">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 right-12 w-[42vmin] h-[42vmin] bg-leaf-500/12 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 left-1/4 w-[34vmin] h-[34vmin] bg-leaf-700/12 blur-3xl rounded-full" />
          {/* signature stripes panel - mirroring the Gavish brand design */}
          <div aria-hidden className="hidden lg:block absolute top-20 left-16 w-44 h-60 bg-stripes-soft [mask-image:linear-gradient(135deg,black,transparent)]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-10 opacity-70 hover:opacity-100 font-body text-sm text-navy-900">
            <ArrowLeft className="size-4 rotate-180" />
            חזרה לדף הבית
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-leaf-500/12 border border-leaf-500/40 text-leaf-700 font-body text-sm font-semibold mb-8">
            <CalendarClock className="size-4" />
            ההרשמה תיפתח באוקטובר 2026
          </div>

          <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
            הצטרפו<br />
            <span className="outline-text">לקהילה.</span>
          </h1>

          <p className="mt-10 font-body text-xl text-ink/80 max-w-3xl leading-relaxed">
            גביש היא קהילה מקצועית לומדת למנהלות ומנהלי מחלקות הנוער ברשויות המקומיות בישראל.
            ביוזמת קרן רש״י ואיגוד מנהלי מחלקות הנוער. השנה השנייה תיפתח במחזור חדש - וגם תפתח קהילה רחבה לבוגרי המחזור הראשון, ולחברים חדשים שמעוניינים להצטרף.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-cream-mesh py-20 lg:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
            מה כוללת ההצטרפות
          </p>
          <h2 className="font-display font-black text-display text-navy-900 leading-[0.95] mb-12">
            למה להצטרף.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "01", t: "קהילה מקצועית", b: "מפגש חודשי עם עמיתים מכל הארץ. ראש לראש על מה שעובד, מה שלא, ולמה." },
              { n: "02", t: "מחקרי שטח", b: "מסמכי תובנות, פודקאסטים, ומקורות מקצועיים שמיוצרים בקהילה - לשימוש חופשי." },
              { n: "03", t: "ימי לימוד", b: "מומחים מהאקדמיה, מהממשלה ומהמגזר השלישי - פעמיים בשנה, פנים אל פנים." },
              { n: "04", t: "פורום ממוקד", b: "אזור דיון פנימי באתר זה - שאלות, התלבטויות, ושיתוף ידע בין הפגישות." },
            ].map((item) => (
              <article key={item.n} className="bg-paper rounded-3xl p-7 border border-navy-900/8 relative overflow-hidden group">
                <div aria-hidden className="absolute -top-6 -left-6 w-24 h-24 bg-stripes-soft opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
                <p className="relative font-display font-black text-3xl text-leaf-500 mb-3">/{item.n}</p>
                <h3 className="relative font-display font-bold text-xl text-navy-900 mb-2">{item.t}</h3>
                <p className="relative font-body text-sm text-ink/70 leading-relaxed">{item.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Registration form (disabled until Oct 2026) */}
      <section id="form" className="bg-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
                טופס הרשמה
              </p>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-[0.95] mb-6">
                השאירו פרטים.
              </h2>
              <p className="font-body text-lg text-ink/75 leading-relaxed mb-6">
                ההרשמה הרשמית תיפתח באוקטובר 2026 ביחד עם פרסום הקול הקורא הרשמי. השאירו פרטים עכשיו, ואנחנו ניצור איתכם קשר ברגע שזה נפתח.
              </p>
              <div className="bg-leaf-500/8 border border-leaf-500/25 rounded-2xl p-5 font-body text-sm text-ink/80 leading-relaxed">
                <p className="font-semibold text-navy-900 mb-1">מי יכול להירשם?</p>
                <p>מנהלות ומנהלי מחלקות נוער ברשויות מקומיות, וכן רכזות ורכזי נוער בכירים. ההצטרפות מותנית באישור מקצועי של ועדת ההגיוי של גביש.</p>
              </div>
            </div>

            <form
              className="lg:col-span-7 bg-cream-mesh rounded-3xl p-8 lg:p-10 border border-navy-900/8 space-y-5"
              aria-label="טופס הרשמה לקהילת גביש"
              method="post"
              action="/api/join"
            >
              <fieldset disabled className="space-y-5 opacity-95">
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-semibold text-navy-900 mb-2">
                    <span className="inline-flex items-center gap-1.5"><User className="size-4" /> שם מלא</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="שם פרטי ומשפחה"
                    className="w-full bg-paper rounded-2xl border border-navy-900/10 px-4 py-3 font-body text-navy-900 placeholder:text-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block font-body text-sm font-semibold text-navy-900 mb-2">
                    <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> רשות מקומית</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    required
                    placeholder="שם הרשות בה אתם פועלים"
                    className="w-full bg-paper rounded-2xl border border-navy-900/10 px-4 py-3 font-body text-navy-900 placeholder:text-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block font-body text-sm font-semibold text-navy-900 mb-2">
                      <span className="inline-flex items-center gap-1.5"><Phone className="size-4" /> טלפון</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      inputMode="tel"
                      required
                      placeholder="050-0000000"
                      className="w-full bg-paper rounded-2xl border border-navy-900/10 px-4 py-3 font-body text-navy-900 placeholder:text-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-sm font-semibold text-navy-900 mb-2">
                      <span className="inline-flex items-center gap-1.5"><Mail className="size-4" /> אימייל</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="name@city.gov.il"
                      className="w-full bg-paper rounded-2xl border border-navy-900/10 px-4 py-3 font-body text-navy-900 placeholder:text-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-start gap-2 font-body text-sm text-ink/75">
                    <input type="checkbox" name="about" className="mt-1 shrink-0 size-4 accent-leaf-500" />
                    <span>
                      אני מעוניין/ת לקבל מידע נוסף על תוכנית גביש לפני ההרשמה.{" "}
                      <Link href="/about" className="text-leaf-700 underline hover:text-navy-900">
                        קראו עוד על התוכנית
                      </Link>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-navy-900 text-paper font-semibold rounded-full py-4 font-body hover:bg-navy-700 transition disabled:cursor-not-allowed disabled:opacity-80"
                >
                  ההרשמה תיפתח באוקטובר 2026
                </button>
              </fieldset>

              <p className="text-center font-body text-xs text-ink/55 pt-2">
                בכפוף ל<Link href="/privacy" className="underline">מדיניות הפרטיות</Link> ו<Link href="/terms" className="underline">תנאי השימוש</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
