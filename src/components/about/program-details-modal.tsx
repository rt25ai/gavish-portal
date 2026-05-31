"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CrystalMark } from "@/components/brand/crystal-mark";

/**
 * Program details dialog - the "וואן פייגר" (one-pager) of גביש, rendered as a
 * designed in-app modal. Copy is the canonical Gavish one-pager (קרן רש״י, 10/24),
 * mirroring the hero and program-overview sections so the whole site stays in sync.
 */

const lead =
  "פיתוח, תקצוע ורישות ההון האנושי שמוביל את החינוך הבלתי פורמלי ברשויות המקומיות - להרחבת ההשפעה והקיימוּת של המערך בשלטון המקומי.";

const about =
  "גביש מפתחת את ההון האנושי של מובילי החינוך הבלתי פורמלי ברשויות המקומיות. התכנית מקבצת 17 מנהלות ומנהלי מחלקות נוער לקהילה מקצועית של למידה, חקר ויישום משותף - מתוך הבנה שכשהמנהיגות החינוכית ברשות מתחזקת, נפתחות לבני הנוער הזדמנויות חדשות.";

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

const components = [
  { title: "הכשרה מקצועית", body: "פיתוח מיומנויות ניהול ומנהיגות לדרג הבכיר במחלקות." },
  { title: "ליווי אישי ומנטורינג", body: "מנטורים בכירים מהעולם העסקי, הציבורי והחברתי." },
  { title: "מפגשים פיזיים ומקוונים", body: "ימי לימוד מרוכזים לצד מפגשי קהילה רציפים לאורך השנה." },
  { title: "למידת עמיתים ומענקי יישום", body: "תהליכי חקירה משותפים, ויישום הלכה למעשה ברשות." },
  { title: "ריווח בין-רשותי", body: "חיבור ושיתוף ידע בין מנהלי מחלקות נוער ברשויות שונות." },
];

const goalColor = {
  amber: "bg-topic-amber text-navy-900",
  coral: "bg-topic-coral text-paper",
  teal: "bg-topic-teal text-paper",
} as const;

const registerHref = "https://wkf.ms/3XACjRP";

export function ProgramDetailsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cardRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gavish-onepager-title"
    >
      <style>{`
        @keyframes gvFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes gvPop  { from { opacity: 0; transform: translateY(22px) scale(.97) } to { opacity: 1; transform: none } }
        .gv-fade { animation: gvFade .25s ease-out both }
        .gv-pop  { animation: gvPop .4s cubic-bezier(.16,1,.3,1) both }
        @media (prefers-reduced-motion: reduce) { .gv-fade, .gv-pop { animation: none } }
      `}</style>

      {/* Scrim */}
      <button
        type="button"
        aria-label="סגירת החלון"
        onClick={onClose}
        className="gv-fade absolute inset-0 cursor-default bg-navy-900/65 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        ref={cardRef}
        tabIndex={-1}
        className="gv-pop relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-paper shadow-[0_40px_120px_-30px_rgba(15,30,71,0.6)] outline-none ring-1 ring-navy-900/10"
      >
        {/* Header - dark, with centred crystal mark like the one-pager */}
        <header className="relative shrink-0 overflow-hidden bg-navy-900 px-6 pb-10 pt-12 text-center text-paper">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-leaf-500/20 blur-3xl" />
            <div className="absolute -bottom-20 right-[12%] h-48 w-48 rounded-full bg-topic-teal/15 blur-3xl" />
            <div className="absolute top-8 left-10 hidden h-40 w-28 bg-stripes-soft opacity-30 [mask-image:linear-gradient(135deg,black,transparent)] sm:block" />
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="סגירה"
            className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-[1] flex flex-col items-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-1.5 font-body text-xs font-semibold tracking-wide text-paper/85">
              <span className="h-2 w-2 rounded-full bg-leaf-500" />
              ה"וואן פייג'ר" · יוזמה של קרן רש״י
            </span>

            <div className="relative mb-4">
              <div aria-hidden className="absolute inset-0 -m-4 rounded-full bg-leaf-500/15 blur-2xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-paper shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)]">
                <CrystalMark className="h-16 w-16" />
              </div>
            </div>

            <h2 id="gavish-onepager-title" className="font-display text-5xl font-black leading-none">
              גביש
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-display text-lg font-bold leading-snug text-paper/90 sm:text-xl">
              מהלך ליווי מקצועי למנהלות ומנהלי מחלקות נוער ברשויות המקומיות
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="space-y-12 overflow-y-auto px-6 py-10 sm:px-10">
          {/* Lead */}
          <p className="text-center font-body text-base leading-relaxed text-ink/80 sm:text-lg">
            {lead}
          </p>

          {/* About + audience */}
          <section className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h3 className="mb-3 font-display text-2xl font-black text-navy-900">על התכנית</h3>
              <p className="font-body text-base leading-relaxed text-ink/75">{about}</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-7 text-paper lg:col-span-2">
              <div aria-hidden className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-leaf-500/20 blur-3xl" />
              <p className="relative font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-leaf-300/80">
                קהל היעד
              </p>
              <p className="relative mt-2 font-display text-6xl font-black leading-none tabular text-leaf-300">
                17
              </p>
              <p className="relative mt-3 font-display text-lg font-bold leading-tight">
                מנהלות ומנהלי מחלקות נוער ברשויות בישראל.
              </p>
            </div>
          </section>

          {/* Goals */}
          <section>
            <h3 className="mb-6 font-display text-2xl font-black text-navy-900">יעדי התכנית</h3>
            <div className="grid gap-5 sm:grid-cols-3">
              {goals.map((g) => (
                <article key={g.number} className="rounded-3xl border border-navy-900/8 bg-cream p-6">
                  <span className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl font-display text-lg font-black ${goalColor[g.color]}`}>
                    {g.number}
                  </span>
                  <h4 className="mb-2 font-display text-xl font-black leading-tight text-navy-900">
                    {g.title}
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-ink/75">{g.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Components */}
          <section>
            <h3 className="mb-6 font-display text-2xl font-black text-navy-900">מרכיבי התכנית</h3>
            <ul className="space-y-3">
              {components.map((c, i) => (
                <li key={c.title} className="flex gap-5 rounded-2xl border border-navy-900/6 bg-cream p-5">
                  <span className="shrink-0 font-display text-2xl font-black leading-none tabular text-leaf-500">
                    /{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="mb-1 font-display text-lg font-bold text-navy-900">{c.title}</h4>
                    <p className="font-body text-sm leading-relaxed text-ink/70">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className="relative overflow-hidden rounded-3xl bg-navy-900 px-7 py-9 text-center text-paper">
            <div aria-hidden className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 h-52 w-52 rounded-full bg-leaf-500/15 blur-3xl" />
            <div className="relative z-[1] flex flex-col items-center">
              <CrystalMark className="mb-4 h-12 w-12" />
              <h3 className="font-display text-2xl font-black">רוצים להיות חלק מהקהילה?</h3>
              <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-paper/75">
                יוזמה של קרן רש״י בשיתוף קרן Samueli ואיגוד מנהלי מחלקות הנוער.
              </p>
              <a
                href={registerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 font-display text-base font-bold text-navy-900 shadow-[0_18px_50px_-18px_rgba(43,121,245,0.75)] transition-colors hover:bg-leaf-300 hover:text-navy-900"
              >
                למילוי שאלון ההרשמה
                <span aria-hidden>←</span>
              </a>
              <a
                href="https://rashi.org.il/programs/gavish/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 font-body text-xs text-paper/50 underline transition-colors hover:text-paper/80"
              >
                rashi.org.il/programs/gavish
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
}
