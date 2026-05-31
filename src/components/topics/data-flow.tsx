import {
  IllGoldenData,
  IllCompare,
  IllTranslate,
  IllResult,
} from "./data-icons";
import type { ComponentType } from "react";

type Stage = {
  number: string;
  title: string;
  note: string;
  points: readonly string[];
  Ill: ComponentType<{ className?: string }>;
};

/* The 4 stages of how data drives planning, insight and impact. */
const stages: Stage[] = [
  {
    number: "01",
    title: "נתוני זהב",
    note: "נקודת ההתחלה",
    points: ["הסכמה רחבה", "איסוף מערכתי", "שימושיות"],
    Ill: IllGoldenData,
  },
  {
    number: "02",
    title: "השוואה רב-מימדית",
    note: "כל נתון נבחן מול",
    points: ["שנים קודמות", "ממוצע ארצי", "יישוב דומה", "בעוד 5 שנים", "בשנה הבאה"],
    Ill: IllCompare,
  },
  {
    number: "03",
    title: "מתרגמים נתון לפעולה",
    note: "מאחוז ← למספר ← לשם ← להזדמנות",
    points: ["זיהוי פערים וחסמים", "קביעת יעדים", "תכנון פעולות"],
    Ill: IllTranslate,
  },
  {
    number: "04",
    title: "התוצאה",
    note: "ההשפעה בפועל",
    points: ["פרסונליזציה", "תכנון וייעוד", "שפה משותפת", "שקיפות ופיקוח", "הרחבת ההשפעה"],
    Ill: IllResult,
  },
];

const flow = ["נתונים", "תובנות", "השפעה"] as const;

export function DataFlowSection() {
  return (
    <section className="bg-paper-mesh py-24 lg:py-32 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block absolute top-24 left-10 w-32 h-44 bg-stripes-soft opacity-70 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
        <div className="absolute -top-24 right-1/4 w-[40vmin] h-[40vmin] bg-topic-teal/8 blur-3xl rounded-full" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* heading - editorial, matches the Insights block */}
        <p className="font-body text-sm tracking-[0.18em] uppercase text-topic-teal font-semibold mb-4">
          הנתונים שמניעים
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-6">
          איך נתון אחד הופך<br />
          <span className="outline-text">להזדמנות.</span>
        </h2>
        <p className="font-body text-xl text-ink/75 max-w-3xl leading-relaxed mb-10">
          הרחבת ההשפעה החינוכית-חברתית מתחילה בנתון גולמי ונגמרת בהזדמנות חיים בשטח - מסע בארבעה שלבים.
        </p>

        {/* flow ribbon */}
        <div className="inline-flex items-center gap-3 mb-14">
          {flow.map((label, i) => (
            <span key={label} className="inline-flex items-center gap-3">
              <span className="font-display font-black text-lg lg:text-xl text-navy-900">{label}</span>
              {i < flow.length - 1 && (
                <span aria-hidden className="text-topic-teal font-display font-black text-xl">←</span>
              )}
            </span>
          ))}
        </div>

        {/* stages - numbered editorial rows with hand-drawn illustrations */}
        <ol className="space-y-0">
          {stages.map((s, i) => {
            const last = i === stages.length - 1;
            return (
              <li
                key={s.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start border-t border-navy-900/10 py-10 lg:py-12"
              >
                {/* number + illustration */}
                <div className="lg:col-span-3 flex items-center gap-5">
                  <span
                    className={
                      last
                        ? "font-display font-black text-6xl text-topic-teal"
                        : "font-display font-black text-6xl text-navy-900/20"
                    }
                  >
                    /{s.number}
                  </span>
                  <span
                    className="shrink-0 inline-grid place-items-center size-16 rounded-2xl bg-pastel-sky border border-pastel-sky-ring text-pastel-sky-ink"
                    style={{ ["--card-surface" as string]: "#e8f0fb" }}
                  >
                    <s.Ill className="size-9" />
                  </span>
                </div>

                {/* title + note */}
                <div className="lg:col-span-4">
                  <h3 className="font-display font-black text-3xl lg:text-4xl text-navy-900 leading-[0.95] mb-2">
                    {s.title}
                  </h3>
                  <p className="font-body text-base text-ink/55">{s.note}</p>
                </div>

                {/* points */}
                <ul className="lg:col-span-5 flex flex-wrap gap-2.5 lg:pt-1">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className={
                        last
                          ? "font-body text-base rounded-full px-4 py-2 bg-topic-teal-soft text-topic-teal"
                          : "font-body text-base rounded-full px-4 py-2 bg-navy-900/[0.04] text-ink/75"
                      }
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        {/* closing banner - brand crystal navy, like the long-term-impact block */}
        <div className="mt-14 rounded-3xl bg-navy-900 text-paper p-10 lg:p-14 relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 bg-crystal opacity-50" />
          <div aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-stripes-soft opacity-25 [mask-image:linear-gradient(90deg,black,transparent)]" />
          <p className="relative font-display font-black text-2xl lg:text-4xl leading-[1.1] text-balance max-w-4xl">
            הנתונים אינם רק מדידה - הם כלי לחיבור{" "}
            <span className="text-leaf-300">הזדמנויות חיים</span> לילדים ולנוער, לקבלת החלטות וליצירת השפעה חינוכית-חברתית.
          </p>
        </div>
      </div>
    </section>
  );
}
