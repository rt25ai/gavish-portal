import {
  Database,
  Network,
  Calculator,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ---- Header flow badge: נתונים ← תובנות ← השפעה ---- */
const flowBadge = ["נתונים", "תובנות", "השפעה"] as const;

type Stage = {
  number: string;
  title: string;
  Icon: LucideIcon;
  note: string;
  points: readonly string[];
  highlight?: boolean;
};

/* ---- The 4 stages of how data drives planning, insight & impact ---- */
const stages: Stage[] = [
  {
    number: "01",
    title: "נתוני זהב",
    Icon: Database,
    note: "נקודת ההתחלה",
    points: ["הסכמה רחבה", "איסוף מערכתי", "שימושיות"],
  },
  {
    number: "02",
    title: "השוואה רב-מימדית",
    Icon: Network,
    note: "כל נתון נבחן מול",
    points: ["שנים קודמות", "ממוצע ארצי", "יישוב דומה", "בעוד 5 שנים", "בשנה הבאה"],
  },
  {
    number: "03",
    title: "מתרגמים נתון לפעולה",
    Icon: Calculator,
    note: "מאחוז ← למספר ← לשם ← להזדמנות",
    points: ["זיהוי פערים וחסמים", "קביעת יעדים", "תכנון פעולות"],
  },
  {
    number: "04",
    title: "התוצאה",
    Icon: Sparkles,
    note: "ההשפעה בפועל",
    points: ["פרסונליזציה", "תכנון וייעוד", "שפה משותפת", "שקיפות ופיקוח", "הרחבת ההשפעה"],
    highlight: true,
  },
];

export function DataFlowSection() {
  return (
    <section className="bg-paper py-16 lg:py-28 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-[40vmin] h-[40vmin] bg-leaf-500/10 blur-3xl rounded-full" />
        <div className="hidden lg:block absolute top-24 right-8 w-32 h-44 bg-stripes-soft opacity-60 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* heading */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-5">
            הנתונים שמניעים
          </p>
          <h2 className="font-display font-black text-4xl lg:text-6xl text-navy-900 leading-[0.92] mb-6">
            איך הנתונים מניעים<br />
            <span className="outline-text">תכנון, תובנות והשפעה?</span>
          </h2>
          <p className="font-body text-lg text-ink/75 leading-relaxed">
            הרחבת יכולת ההשפעה החינוכית-חברתית באמצעות שימוש בנתונים וקבלת החלטות מבוססות נתונים - מסע בארבעה שלבים, מהמספר הגולמי ועד ההזדמנות שנוצרת בשטח.
          </p>
        </div>

        {/* flow badge */}
        <div className="inline-flex items-center gap-3 rounded-full bg-navy-900 px-6 py-3 mb-10 lg:mb-14">
          {flowBadge.map((label, i) => (
            <span key={label} className="inline-flex items-center gap-3">
              <span className="font-display font-bold text-base lg:text-lg text-paper">{label}</span>
              {i < flowBadge.length - 1 && (
                <ArrowLeft className="size-4 text-leaf-400" aria-hidden />
              )}
            </span>
          ))}
        </div>

        {/* stages */}
        <ol className="grid gap-5 lg:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((s, i) => (
            <li
              key={s.number}
              className={`group relative flex flex-col rounded-3xl border p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 ${
                s.highlight
                  ? "border-leaf-500/40 bg-leaf-500/[0.06]"
                  : "border-navy-900/10 bg-paper-mesh-soft"
              }`}
            >
              {/* connector arrow to the next stage (visible from xl up, RTL: points left) */}
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="hidden xl:flex absolute top-1/2 -left-6 -translate-y-1/2 z-10 size-9 items-center justify-center rounded-full bg-paper border border-navy-900/10 shadow-sm"
                >
                  <ArrowLeft className="size-4 text-navy-700/60" />
                </span>
              )}

              <div className="flex items-center justify-between mb-6">
                <span
                  className={`inline-grid place-items-center size-14 rounded-2xl ${
                    s.highlight
                      ? "bg-leaf-500 text-paper"
                      : "bg-navy-900/[0.06] text-navy-800"
                  }`}
                >
                  <s.Icon className="size-7" aria-hidden />
                </span>
                <span
                  className={`font-display font-black text-3xl tabular ${
                    s.highlight ? "text-leaf-600/40" : "text-navy-900/15"
                  }`}
                >
                  {s.number}
                </span>
              </div>

              <h3 className="font-display font-black text-xl lg:text-2xl text-navy-900 leading-tight mb-1.5 text-balance">
                {s.title}
              </h3>
              <p className="font-body text-sm text-ink/55 mb-5">{s.note}</p>

              <ul className="mt-auto flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className={`font-body text-sm rounded-full px-3 py-1.5 ${
                      s.highlight
                        ? "bg-leaf-500/12 text-leaf-800"
                        : "bg-navy-900/[0.04] text-ink/75"
                    }`}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* closing banner */}
        <div className="mt-12 lg:mt-16 rounded-3xl bg-navy-900 px-8 py-10 lg:px-14 lg:py-12 relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[30vmin] h-[30vmin] bg-leaf-500/20 blur-3xl rounded-full" />
          </div>
          <p className="relative font-display font-bold text-xl lg:text-3xl text-paper leading-snug text-balance">
            הנתונים אינם רק מדידה - הם כלי לחיבור{" "}
            <span className="text-leaf-400">הזדמנויות חיים</span> לילדים ולנוער, לקבלת החלטות וליצירת השפעה חינוכית-חברתית.
          </p>
        </div>
      </div>
    </section>
  );
}
