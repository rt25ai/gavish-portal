import {
  IllOngoing,
  IllStory,
  IllFocus,
  IllYearRound,
  IllShared,
  IllPersistence,
  IllTrust,
  IllManagement,
  IllMechanisms,
} from "./data-icons";
import type { ComponentType } from "react";

type Principle = {
  number: string;
  title: string;
  body: string;
  Ill: ComponentType<{ className?: string }>;
};

/* 9 principles for working with data in municipal youth departments. */
const principles: Principle[] = [
  {
    number: "01",
    title: "עבודה מתמשכת ולא חד-פעמית",
    body: "איסוף נתונים אינו פעולה נקודתית. כדי לזהות מגמות ולהבין תהליכים, יש לתחזק איסוף נתונים באופן שוטף לאורך זמן.",
    Ill: IllOngoing,
  },
  {
    number: "02",
    title: "מאחורי כל מספר יש סיפור",
    body: "חשוב להבין מה עומד מאחורי המספרים - מה הם מייצגים, באיזה הקשר נאספו ומה המשמעות שלהם בפועל.",
    Ill: IllStory,
  },
  {
    number: "03",
    title: "תעדוף ומיקוד",
    body: "לא מודדים הכול. בכל תקופה נכון להגדיר מספר מצומצם של תחומים מרכזיים (עד 5) ולהתמקד בהם באופן עקבי.",
    Ill: IllFocus,
  },
  {
    number: "04",
    title: "מדידה לאורך כל השנה",
    body: "איסוף נתונים מתבצע באופן רציף - לא רק בסיכומים שנתיים. כך ניתן להגיב בזמן אמת ולא בדיעבד.",
    Ill: IllYearRound,
  },
  {
    number: "05",
    title: "נתונים הם משאב משותף",
    body: "יש לאפשר לשותפים (צוותים, מנהלים, גורמים ברשות) לעבוד עם הנתונים - כדי לייצר למידה רחבה וקבלת החלטות משותפת.",
    Ill: IllShared,
  },
  {
    number: "06",
    title: "התמדה לאורך זמן",
    body: "עבודה עם נתונים דורשת עקביות. רק התמדה מאפשרת לזהות מגמות ולהפיק תובנות משמעותיות.",
    Ill: IllPersistence,
  },
  {
    number: "07",
    title: "יחסי אמון כבסיס לאיסוף",
    body: "כדי שאנשים יסכימו לשתף פעולה ולחלוק מידע, יש לבסס יחסי אמון, שקיפות וביטחון בשימוש בנתונים.",
    Ill: IllTrust,
  },
  {
    number: "08",
    title: "שימוש בנתונים מול הנהלה",
    body: "נתונים הם כלי לניהול והשפעה. הצגה שלהם להנהלה מחזקת קבלת החלטות וממקמת את מחלקת הנוער כגורם מקצועי.",
    Ill: IllManagement,
  },
  {
    number: "09",
    title: "מנגנוני עבודה קבועים",
    body: "עבודה עם נתונים צריכה להישען על מנגנונים ברורים: איך אוספים, מתי, מי אחראי, ואיך משתמשים במידע.",
    Ill: IllMechanisms,
  },
];

export function DataPrinciplesSection() {
  return (
    <section className="bg-cream-mesh py-24 lg:py-32 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block absolute bottom-20 right-10 w-32 h-44 bg-stripes-soft opacity-70 [mask-image:linear-gradient(45deg,black,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* heading */}
        <p className="font-body text-sm tracking-[0.18em] uppercase text-topic-teal font-semibold mb-4">
          עקרונות מנחים
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-6">
          9 עקרונות<br />
          <span className="outline-text">לעבודה עם נתונים.</span>
        </h2>
        <p className="font-body text-xl text-ink/75 max-w-3xl leading-relaxed mb-16">
          כללי העבודה שגיבשו צוותי גביש - איך הופכים איסוף נתונים מפעולה חד-פעמית לתשתית ניהולית קבועה במחלקת הנוער.
        </p>

        {/* 9 cards - hairline grid, same system as the golden-stats grid */}
        <ol className="grid gap-px bg-navy-900/10 rounded-3xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <li
              key={p.number}
              className="group bg-paper p-8 lg:p-9 flex flex-col transition-colors duration-300 hover:bg-pastel-sky/40"
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="inline-grid place-items-center size-16 rounded-2xl bg-pastel-sky border border-pastel-sky-ring text-pastel-sky-ink"
                  style={{ ["--card-surface" as string]: "#e8f0fb" }}
                >
                  <p.Ill className="size-9" />
                </span>
                <span className="font-display font-black text-4xl text-navy-900/15 group-hover:text-topic-teal/30 transition-colors">
                  /{p.number}
                </span>
              </div>

              <h3 className="font-display font-black text-xl lg:text-2xl text-navy-900 leading-tight mb-3 text-balance">
                {p.title}
              </h3>
              <p className="font-body text-base text-ink/70 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
