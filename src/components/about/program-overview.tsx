"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import {
  programIntro,
  audienceCard,
  groupCard,
  background,
  envelopePillars,
  trainingClusters,
  meetingFlow,
  meetingSpaces,
  sourceNote,
} from "@/data/about-program";

/* ---------- inline icon set (stroke, currentColor) ---------- */
function Icon({ name, className = "size-6" }: { name: string; className?: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (name) {
    case "resources":
      return (<svg {...common}><path d="M12 2v20M2 7l10 5 10-5M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>);
    case "magnet":
      return (<svg {...common}><path d="M6 3v8a6 6 0 0 0 12 0V3M6 7h4M14 7h4" /></svg>);
    case "course":
      return (<svg {...common}><path d="M4 5h11a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H4zM20 5h0a3 3 0 0 0-3 3v8" /></svg>);
    case "mentor":
      return (<svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M21 20a6 6 0 0 0-4-5.6" /></svg>);
    case "guidance":
      return (<svg {...common}><path d="M12 2 4 6v6c0 5 3.5 7.5 8 10 4.5-2.5 8-5 8-10V6z" /><path d="m9 12 2 2 4-4" /></svg>);
    case "seminar":
      return (<svg {...common}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>);
    case "virtual":
      return (<svg {...common}><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 10 6-3v10l-6-3z" /></svg>);
    case "oneonone":
      return (<svg {...common}><circle cx="8" cy="9" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 19a5 5 0 0 1 10 0M14 19a4.5 4.5 0 0 1 7 0" /></svg>);
    case "between":
      return (<svg {...common}><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" /></svg>);
    default:
      return null;
  }
}

const clusterTone = {
  amber: { dot: "bg-topic-amber", ring: "group-hover:border-topic-amber/50", glow: "bg-topic-amber/20" },
  coral: { dot: "bg-topic-coral", ring: "group-hover:border-topic-coral/50", glow: "bg-topic-coral/20" },
  teal: { dot: "bg-topic-teal", ring: "group-hover:border-topic-teal/50", glow: "bg-topic-teal/20" },
  moss: { dot: "bg-topic-moss", ring: "group-hover:border-topic-moss/50", glow: "bg-topic-moss/20" },
} as const;

export function ProgramOverview() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.querySelectorAll("[data-rise]"), {
          scrollTrigger: { trigger: group, start: "top 82%" },
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.09,
        });
      });
    }, rootRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="program"
      ref={rootRef}
      className="bg-paper py-24 lg:py-36 relative overflow-hidden scroll-mt-20"
    >
      {/* atmosphere */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[12%] left-0 w-[36vmin] h-[36vmin] bg-leaf-500/8 blur-3xl rounded-full" />
        <div className="absolute bottom-[8%] right-0 w-[40vmin] h-[40vmin] bg-topic-coral/8 blur-3xl rounded-full" />
        <div className="hidden lg:block absolute top-32 right-10 w-36 h-56 bg-stripes-soft opacity-50 [mask-image:linear-gradient(225deg,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* ---------- Heading + goal ---------- */}
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          {programIntro.eyebrow}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
          <h2 className="lg:col-span-7 font-display text-display font-black text-navy-900 leading-[0.98]">
            {programIntro.title}
          </h2>
          <div className="lg:col-span-5 relative rounded-3xl bg-navy-900 text-paper p-8 lg:p-9 overflow-hidden">
            <div aria-hidden className="absolute -top-12 -left-12 w-44 h-44 bg-leaf-500/20 blur-3xl rounded-full" />
            <p className="relative font-body text-xs uppercase tracking-[0.18em] text-leaf-300/85 font-bold mb-3">
              {programIntro.goalLabel}
            </p>
            <p className="relative font-display font-bold text-lg lg:text-xl leading-snug">
              {programIntro.goal}
            </p>
          </div>
        </div>

        {/* ---------- Audience + group + background ---------- */}
        <div data-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24 lg:mb-32">
          <article
            data-rise
            className="lg:col-span-4 rounded-3xl border border-navy-900/8 bg-cream p-8 lg:p-9 flex flex-col"
          >
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-leaf-500/12 text-leaf-700 mb-6">
              <Icon name="mentor" className="size-5" />
            </span>
            <h3 className="font-display font-black text-xl text-navy-900 mb-3">{audienceCard.label}</h3>
            <p className="font-body text-base text-ink/75 leading-relaxed">{audienceCard.body}</p>
          </article>

          <article
            data-rise
            className="lg:col-span-4 rounded-3xl border border-navy-900/8 bg-cream p-8 lg:p-9 flex flex-col"
          >
            <p className="font-body text-xs uppercase tracking-[0.16em] text-navy-700/60 font-bold mb-4">
              {groupCard.label}
            </p>
            <p className="font-display font-black text-navy-900 leading-none mb-3 flex items-baseline gap-1">
              <span className="text-2xl text-navy-700/70">{groupCard.statSuffix}</span>
              <span className="text-6xl lg:text-7xl text-leaf-500 tabular">{groupCard.stat}</span>
            </p>
            <p className="font-display font-bold text-lg text-navy-900 leading-tight mb-3">
              {groupCard.statLine}
            </p>
            <p className="font-body text-base text-ink/70 leading-relaxed">{groupCard.body}</p>
          </article>

          <aside
            data-rise
            className="lg:col-span-4 rounded-3xl bg-crystal text-paper p-8 lg:p-9 relative overflow-hidden flex flex-col"
          >
            <div aria-hidden className="absolute -bottom-14 -right-10 w-48 h-48 bg-topic-teal/15 blur-3xl rounded-full" />
            <p className="relative font-body text-xs uppercase tracking-[0.18em] text-leaf-300/80 font-bold mb-4">
              {background.label}
            </p>
            <p className="relative font-body text-base text-paper/85 leading-relaxed">
              {background.body}
            </p>
          </aside>
        </div>

        {/* ---------- Envelope program (pillars) ---------- */}
        <div className="mb-24 lg:mb-32">
          <div className="flex items-baseline gap-4 mb-10">
            <h3 className="font-display font-black text-3xl lg:text-5xl text-navy-900 leading-none">
              מה כוללת תכנית המעטפת?
            </h3>
          </div>
          <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {envelopePillars.map((p, i) => (
              <article
                key={p.title}
                data-rise
                className="group relative overflow-hidden rounded-3xl border border-navy-900/8 bg-cream p-7 lg:p-8 transition-colors hover:border-leaf-500/40"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-navy-900 text-leaf-300 transition-colors group-hover:bg-leaf-500 group-hover:text-paper">
                    <Icon name={p.icon} className="size-6" />
                  </span>
                  <span className="font-display font-black text-2xl text-navy-900/12 tabular leading-none">
                    /{(i + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <h4 className="font-display font-black text-lg lg:text-xl text-navy-900 mb-3 leading-tight">
                  {p.title}
                </h4>
                <p className="font-body text-[15px] text-ink/72 leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- Training clusters ---------- */}
        <div className="mb-24 lg:mb-32">
          <p className="font-body text-sm tracking-[0.16em] uppercase text-navy-700/60 font-semibold mb-3">
            אשכולות ההכשרה
          </p>
          <h3 className="font-display font-black text-3xl lg:text-5xl text-navy-900 leading-[0.98] mb-10">
            באילו תכנים <span className="outline-text">נתמקד?</span>
          </h3>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {trainingClusters.map((c, i) => {
              const tone = clusterTone[c.color];
              return (
                <article
                  key={c.title}
                  data-rise
                  className={`group relative overflow-hidden rounded-3xl border border-navy-900/8 bg-paper p-7 lg:p-8 transition-colors ${tone.ring}`}
                >
                  <div aria-hidden className={`absolute -top-10 -left-10 w-32 h-32 ${tone.glow} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative flex items-center gap-4 mb-4">
                    <span className={`w-3.5 h-3.5 rounded-full ${tone.dot}`} />
                    <span className="font-display font-black text-xl text-navy-900/15 tabular">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="relative font-display font-black text-xl lg:text-2xl text-navy-900 mb-2 leading-tight">
                    {c.title}
                  </h4>
                  <p className="relative font-body text-base text-ink/70 leading-relaxed">{c.note}</p>
                </article>
              );
            })}
          </div>
        </div>

        {/* ---------- How it works (TOP DOWN / BOTTOM UP) ---------- */}
        <div className="mb-24 lg:mb-32">
          <h3 className="font-display font-black text-3xl lg:text-5xl text-navy-900 leading-none mb-10">
            איך זה יעבוד?
          </h3>
          <div data-stagger className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {meetingFlow.map((m) => (
              <article
                key={m.tag}
                data-rise
                className="relative overflow-hidden rounded-3xl bg-crystal text-paper p-8 lg:p-10"
              >
                <div aria-hidden className="absolute -top-16 -right-12 w-52 h-52 bg-leaf-500/15 blur-3xl rounded-full" />
                <div className="relative flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper/8 border border-paper/15 font-display font-bold text-sm tracking-[0.12em] text-leaf-300">
                    {m.tag}
                  </span>
                  <span className="font-display font-black text-4xl text-paper/12 tabular leading-none">
                    {m.num}
                  </span>
                </div>
                <p className="relative font-display font-bold text-lg lg:text-xl leading-snug text-paper/90">
                  {m.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- Meeting spaces ---------- */}
        <div>
          <p className="font-body text-sm tracking-[0.16em] uppercase text-navy-700/60 font-semibold mb-3">
            מבנה המפגשים
          </p>
          <h3 className="font-display font-black text-3xl lg:text-5xl text-navy-900 leading-[0.98] mb-10 max-w-2xl">
            הקבוצה תיפגש ב<span className="outline-text">ארבעה</span> סוגי מרחבים
          </h3>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {meetingSpaces.map((s) => (
              <article
                key={s.kind}
                data-rise
                className="group rounded-3xl border border-navy-900/8 bg-cream p-7 flex flex-col h-full transition-colors hover:border-leaf-500/40"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-leaf-500/12 text-leaf-700 mb-6 transition-colors group-hover:bg-leaf-500 group-hover:text-paper">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <h4 className="font-display font-black text-lg text-navy-900 mb-2">{s.kind}</h4>
                <p className="font-body text-[15px] text-ink/72 leading-relaxed flex-1">{s.detail}</p>
                <span className="mt-5 inline-flex w-fit items-center px-3 py-1 rounded-full bg-navy-900/5 font-body text-xs font-semibold text-navy-700 tabular">
                  {s.meta}
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- Source ---------- */}
        <p className="mt-16 font-body text-xs text-ink/50">
          {sourceNote.text} ·{" "}
          <a
            href={sourceNote.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-navy-700 transition-colors"
          >
            {sourceNote.hrefLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
