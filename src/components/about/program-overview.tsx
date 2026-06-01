"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { ChinuchLachaimBadge } from "./chinuch-lachaim-badge";
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

/* ----------------------------------------------------------------------------
 * CrystalIcon — every icon sits inside a cut-gem hexagon with internal facet
 * lines, echoing the Gavish (גביש = crystal) brand mark. The angular glyphs are
 * drawn in the gem's "light" colour (currentColor) so the parent can brighten
 * them on hover. Not stock line icons — bespoke to the brand language.
 * -------------------------------------------------------------------------- */
const HEX = "24,3 41.2,13 41.2,35 24,45 6.8,35 6.8,13";

function Glyph({ name }: { name: string }) {
  const s = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "resources": // faceted gem = value / budget
      return (<g {...s}><path d="M24 15l7 5-7 13-7-13z" /><path d="M17 20h14M24 15v18M20.4 20 24 33M27.6 20 24 33" /></g>);
    case "magnet": // funnel = distilling / extracting resources
      return (<g {...s}><path d="M16 17h16l-6 7v7l-4 2v-9z" /></g>);
    case "course": // angular open book
      return (<g {...s}><path d="M24 18 15 20.5v12l9-2.5 9 2.5v-12z" /><path d="M24 18v14" /></g>);
    case "mentor": // two faceted figures
      return (<g {...s}><path d="M20 17.5l2.6 2.6L20 22.7l-2.6-2.6z" /><path d="M28 17.5l2.6 2.6L28 22.7l-2.6-2.6z" /><path d="M14.5 32.5c0-3.2 2.5-5.3 5.5-5.3M28 27.2c3 0 5.5 2.1 5.5 5.3" /></g>);
    case "guidance": // faceted compass = professional guidance
      return (<g {...s}><path d="M24 14 31 24 24 34 17 24z" /><path d="M21.4 26.6 24 19l2.6 7.6L24 24.6z" /></g>);
    case "seminar": // podium / on-site monitor
      return (<g {...s}><path d="M16 16h16v11H16z" /><path d="M24 27v4M20.5 35h7M16 16l16 11" /></g>);
    case "virtual": // screen + play
      return (<g {...s}><path d="M15 18h12v10H15z" /><path d="M19.5 20.5 24.5 23l-5 2.5z" /><path d="M29 20.5 33 18.5v11L29 27.5z" /></g>);
    case "oneonone": // two linked facets
      return (<g {...s}><path d="M18 19l2.8 2.8L18 24.6l-2.8-2.8z" /><path d="M30 21.5l2.5 2.5L30 26.5l-2.5-2.5z" /><path d="M21.4 22.5h5.2" /><path d="M13.5 32c0-2.8 2-4.7 4.5-4.7M27.5 27.3c2.5 0 4.5 1.9 4.5 4.7" /></g>);
    case "between": // angular speech bubble = continuous contact
      return (<g {...s}><path d="M16 17h16v9H23.5l-4 4v-4H16z" /><path d="M21 21.5h6M21 24h4" strokeWidth={1.6} /></g>);
    default:
      return null;
  }
}

function CrystalIcon({ name, className = "w-14 h-14" }: { name: string; className?: string }) {
  const gid = `gem-${name}`;
  return (
    <svg
      viewBox="0 0 48 48"
      className={`${className} text-leaf-100 drop-shadow-[0_10px_22px_-10px_rgba(15,30,71,0.55)] transition-[color,transform] duration-300 group-hover:text-white group-hover:scale-[1.06]`}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="var(--color-navy-700)" />
          <stop offset="1" stopColor="var(--color-navy-950)" />
        </linearGradient>
      </defs>
      {/* gem body */}
      <polygon points={HEX} fill={`url(#${gid})`} stroke="var(--color-leaf-500)" strokeOpacity="0.35" strokeWidth="1.2" />
      {/* internal facets — the crystal signature */}
      <g stroke="var(--color-leaf-300)" strokeOpacity="0.22" strokeWidth="0.9">
        <line x1="24" y1="3" x2="24" y2="45" />
        <line x1="6.8" y1="13" x2="41.2" y2="35" />
        <line x1="41.2" y1="13" x2="6.8" y2="35" />
      </g>
      {/* crown highlight */}
      <polygon points="24,3 41.2,13 24,24 6.8,13" fill="white" fillOpacity="0.06" />
      <Glyph name={name} />
    </svg>
  );
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
        <p className="font-body text-base tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          {programIntro.eyebrow}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch mb-16 lg:mb-20">
          <h2 className="lg:col-span-7 lg:self-end font-display text-display font-black text-navy-900 leading-[0.98]">
            {programIntro.title}
          </h2>
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 lg:gap-10">
            {/* חינוך לחיים medallion */}
            <ChinuchLachaimBadge className="self-center" />

            <div className="relative rounded-3xl bg-crystal text-paper p-8 lg:p-9 overflow-hidden">
              <div aria-hidden className="absolute inset-0 bg-stripes-soft opacity-30 [mask-image:linear-gradient(225deg,black,transparent_70%)]" />
              <div aria-hidden className="absolute -top-12 -left-12 w-44 h-44 bg-leaf-500/20 blur-3xl rounded-full" />
              <p className="relative font-body text-xs uppercase tracking-[0.18em] text-leaf-300/85 font-bold mb-3">
                {programIntro.goalLabel}
              </p>
              <p className="relative font-display font-bold text-lg lg:text-xl leading-snug">
                {programIntro.goal}
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Audience + group + background ---------- */}
        <div data-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24 lg:mb-32">
          <article
            data-rise
            className="group lg:col-span-4 rounded-3xl border border-navy-900/8 bg-cream p-8 lg:p-9 flex flex-col"
          >
            <CrystalIcon name="mentor" className="w-14 h-14 mb-6" />
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
            <div aria-hidden className="absolute inset-0 bg-stripes-soft opacity-25 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
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
                  <CrystalIcon name={p.icon} className="w-14 h-14" />
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
            באילו תכנים <span className="text-leaf-500">נתמקד?</span>
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
                    <span className={`w-3.5 h-3.5 rounded-[3px] rotate-45 ${tone.dot}`} />
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
                <div aria-hidden className="absolute inset-0 bg-stripes-soft opacity-25 [mask-image:linear-gradient(225deg,black,transparent_70%)]" />
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
            הקבוצה תיפגש ב<span className="whitespace-nowrap text-leaf-500">ארבעה</span> סוגי מרחבים
          </h3>
          <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {meetingSpaces.map((s) => (
              <article
                key={s.kind}
                data-rise
                className="group rounded-3xl border border-navy-900/8 bg-cream p-7 flex flex-col h-full transition-colors hover:border-leaf-500/40"
              >
                <CrystalIcon name={s.icon} className="w-14 h-14 mb-6" />
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
