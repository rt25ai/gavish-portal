import {
  Repeat,
  ScanSearch,
  Target,
  LineChart,
  Users,
  Hourglass,
  Handshake,
  Presentation,
  Settings2,
  ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Principle = {
  number: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

/* 9 principles for working with data in municipal youth departments */
const principles: Principle[] = [
  {
    number: "01",
    title: "עבודה מתמשכת ולא חד-פעמית",
    body: "איסוף נתונים אינו פעולה נקודתית. כדי לזהות מגמות ולהבין תהליכים, יש לתחזק איסוף נתונים באופן שוטף לאורך זמן.",
    Icon: Repeat,
  },
  {
    number: "02",
    title: "מאחורי כל מספר יש סיפור",
    body: "חשוב להבין מה עומד מאחורי המספרים - מה הם מייצגים, באיזה הקשר נאספו ומה המשמעות שלהם בפועל.",
    Icon: ScanSearch,
  },
  {
    number: "03",
    title: "תעדוף ומיקוד",
    body: "לא מודדים הכול. בכל תקופה נכון להגדיר מספר מצומצם של תחומים מרכזיים (עד 5) ולהתמקד בהם באופן עקבי.",
    Icon: Target,
  },
  {
    number: "04",
    title: "מדידה לאורך כל השנה",
    body: "איסוף נתונים מתבצע באופן רציף - לא רק בסיכומים שנתיים. כך ניתן להגיב בזמן אמת ולא בדיעבד.",
    Icon: LineChart,
  },
  {
    number: "05",
    title: "נתונים הם משאב משותף",
    body: "יש לאפשר לשותפים (צוותים, מנהלים, גורמים ברשות) לעבוד עם הנתונים - כדי לייצר למידה רחבה וקבלת החלטות משותפת.",
    Icon: Users,
  },
  {
    number: "06",
    title: "התמדה לאורך זמן",
    body: "עבודה עם נתונים דורשת עקביות. רק התמדה מאפשרת לזהות מגמות ולהפיק תובנות משמעותיות.",
    Icon: Hourglass,
  },
  {
    number: "07",
    title: "יחסי אמון כבסיס לאיסוף נתונים",
    body: "כדי שאנשים יסכימו לשתף פעולה ולחלוק מידע, יש לבסס יחסי אמון, שקיפות וביטחון בשימוש בנתונים.",
    Icon: Handshake,
  },
  {
    number: "08",
    title: "שימוש בנתונים מול הנהלה",
    body: "נתונים הם כלי לניהול והשפעה. הצגה שלהם להנהלה מחזקת קבלת החלטות מבוססת וממקמת את מחלקת הנוער כגורם מקצועי.",
    Icon: Presentation,
  },
  {
    number: "09",
    title: "מנגנוני עבודה קבועים",
    body: "עבודה עם נתונים צריכה להישען על מנגנונים ברורים: איך אוספים, מתי, מי אחראי, ואיך משתמשים במידע.",
    Icon: Settings2,
  },
];

const flowBadge = ["נתונים", "תובנות", "השפעה"] as const;

export function DataPrinciplesSection() {
  return (
    <section className="bg-paper-mesh py-16 lg:py-28 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-24 right-1/4 w-[42vmin] h-[42vmin] bg-leaf-700/10 blur-3xl rounded-full" />
        <div className="hidden lg:block absolute bottom-20 left-10 w-32 h-44 bg-stripes-soft opacity-60 [mask-image:linear-gradient(45deg,black,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* heading */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-5">
            עקרונות מנחים
          </p>
          <h2 className="font-display font-black text-4xl lg:text-6xl text-navy-900 leading-[0.92] mb-6">
            9 עקרונות לעבודה<br />
            <span className="outline-text">עם נתונים.</span>
          </h2>
          <p className="font-body text-lg text-ink/75 leading-relaxed">
            כללי העבודה שגיבשו צוותי גביש - איך הופכים איסוף נתונים מפעולה חד-פעמית לתשתית ניהולית קבועה במחלקת הנוער ברשות.
          </p>
        </div>

        {/* 9 cards */}
        <ol className="grid gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <li
              key={p.number}
              className="group relative overflow-hidden rounded-3xl border border-navy-900/10 bg-paper p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-500/40 hover:shadow-[0_24px_60px_-30px_rgba(15,30,71,0.35)]"
            >
              {/* faint giant number watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-5 -left-2 font-display font-black text-8xl text-navy-900/[0.04] tabular select-none transition-colors group-hover:text-leaf-500/10"
              >
                {p.number}
              </span>

              <div className="relative flex items-start justify-between mb-5">
                <span className="inline-grid place-items-center size-14 rounded-2xl bg-leaf-500/10 text-leaf-700 transition-colors group-hover:bg-leaf-500 group-hover:text-paper">
                  <p.Icon className="size-7" aria-hidden />
                </span>
                <span className="font-display font-black text-2xl text-navy-900/20 tabular">
                  {p.number}
                </span>
              </div>

              <h3 className="relative font-display font-black text-lg lg:text-xl text-navy-900 leading-tight mb-3 text-balance">
                {p.title}
              </h3>
              <p className="relative font-body text-[0.95rem] text-ink/70 leading-relaxed">
                {p.body}
              </p>
            </li>
          ))}
        </ol>

        {/* footer flow badge */}
        <div className="mt-12 lg:mt-14 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-navy-900/15 bg-paper px-7 py-3.5 shadow-sm">
            {flowBadge.map((label, i) => (
              <span key={label} className="inline-flex items-center gap-3">
                <span className="font-display font-bold text-base lg:text-lg text-navy-900">{label}</span>
                {i < flowBadge.length - 1 && (
                  <ArrowLeft className="size-4 text-leaf-500" aria-hidden />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
