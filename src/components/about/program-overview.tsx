const goals = [
  {
    number: "01",
    title: "חיזוק החינוך הבלתי פורמלי",
    body: "ביסוס החינוך הבלתי פורמלי כמרכיב משמעותי במערכת החינוך היישובית.",
    color: "amber" as const,
  },
  {
    number: "02",
    title: "מוביליות חברתית",
    body: "הרחבת ההזדמנויות למוביליות חברתית של ילדים ובני נוער ברשויות בישראל.",
    color: "coral" as const,
  },
  {
    number: "03",
    title: "העצמה מקצועית",
    body: "פיתוח אישי, ניהולי ומקצועי של מובילי מחלקות הנוער ברשויות.",
    color: "teal" as const,
  },
];

const activities = [
  { title: "הכשרה מקצועית", body: "פיתוח מיומנויות ניהול ומנהיגות לדרג הבכיר במחלקות." },
  { title: "ליווי אישי ומנטורינג", body: "מנטורים בכירים מהעולם העסקי, הציבורי והחברתי." },
  { title: "מפגשים פיזיים ומקוונים", body: "ימי לימוד מרוכזים לצד מפגשי קהילה רציפים לאורך השנה." },
  { title: "למידת עמיתים ומענקי יישום", body: "תהליכי חקירה משותפים, ויישום הלכה למעשה ברשות." },
  { title: "ריווח בין-רשותי", body: "חיבור ושיתוף ידע בין מנהלי מחלקות נוער ברשויות שונות." },
];

const colorMap = {
  amber: "bg-topic-amber text-navy-900",
  coral: "bg-topic-coral text-paper",
  teal: "bg-topic-teal text-paper",
} as const;

export function ProgramOverview() {
  return (
    <section className="bg-paper py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[36vmin] h-[36vmin] bg-leaf-500/8 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[40vmin] h-[40vmin] bg-topic-coral/8 blur-3xl rounded-full" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          על תכנית גביש
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-10">
          קהילה לומדת,<br />
          <span className="outline-text">משימה אחת.</span>
        </h2>

        <p className="font-body text-lg lg:text-xl text-ink/80 leading-relaxed max-w-3xl mb-20">
          גביש מפתחת את ההון האנושי של מובילי החינוך הבלתי פורמלי ברשויות המקומיות.
          התכנית מקבצת כ-20 מנהלות ומנהלי מחלקות נוער לקהילה מקצועית של למידה, חקר ויישום משותף -
          מתוך הבנה שכשהמנהיגות החינוכית ברשות מתחזקת, נפתחות לבני הנוער הזדמנויות חדשות.
        </p>

        {/* Goals */}
        <div className="mb-24">
          <h3 className="font-display font-black text-3xl lg:text-4xl text-navy-900 mb-10">
            יעדי התכנית
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map((g) => (
              <article
                key={g.number}
                className="relative overflow-hidden rounded-3xl border border-navy-900/8 bg-cream p-8 lg:p-10"
              >
                <span
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl font-display font-black text-lg mb-6 ${colorMap[g.color]}`}
                >
                  {g.number}
                </span>
                <h4 className="font-display font-black text-2xl text-navy-900 mb-3 leading-tight">
                  {g.title}
                </h4>
                <p className="font-body text-base text-ink/75 leading-relaxed">
                  {g.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Audience + Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <aside className="lg:col-span-2 bg-navy-900 text-paper rounded-3xl p-10 lg:p-12 relative overflow-hidden">
            <div aria-hidden className="absolute -top-16 -left-16 w-56 h-56 bg-leaf-500/20 blur-3xl rounded-full" />
            <p className="relative font-body text-xs uppercase tracking-[0.18em] text-leaf-300/80 font-bold mb-6">
              קהל היעד
            </p>
            <p className="relative font-display font-black text-6xl lg:text-7xl text-leaf-300 leading-none mb-4 tabular">
              ~20
            </p>
            <p className="relative font-display font-bold text-2xl mb-6 leading-tight">
              מנהלות ומנהלי מחלקות נוער ברשויות בישראל.
            </p>
            <p className="relative font-body text-base text-paper/75 leading-relaxed">
              הדרג המקצועי הבכיר שמוביל את המפגש היומיומי בין הרשות לבני הנוער.
              גביש מחבר ביניהם לקהילת ידע משותפת.
            </p>
          </aside>

          <div className="lg:col-span-3">
            <h3 className="font-display font-black text-3xl lg:text-4xl text-navy-900 mb-8">
              מרכיבי התכנית
            </h3>
            <ul className="space-y-4">
              {activities.map((a, i) => (
                <li
                  key={i}
                  className="flex gap-5 bg-cream rounded-2xl p-6 lg:p-7 border border-navy-900/6"
                >
                  <span className="font-display font-black text-2xl text-leaf-500 leading-none shrink-0 tabular">
                    /{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-lg text-navy-900 mb-1">
                      {a.title}
                    </h4>
                    <p className="font-body text-base text-ink/70 leading-relaxed">
                      {a.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 font-body text-xs text-ink/50">
          מבוסס על המידע הרשמי באתר קרן רש״י ·{" "}
          <a
            href="https://rashi.org.il/programs/gavish/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-navy-700 transition-colors"
          >
            rashi.org.il/programs/gavish
          </a>
        </p>
      </div>
    </section>
  );
}
