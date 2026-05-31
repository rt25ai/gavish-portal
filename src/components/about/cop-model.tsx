"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { copIntro, copPillars, type CopColor } from "@/data/cop-model";

/* ---------- puzzle geometry ---------- */
const W = 200;
const H = 200;
const M = H / 2;
const KH = 28; // knob half-height
const D = 36; // knob protrusion

function piecePath(tab: boolean, socket: boolean): string {
  let p = `M0 0 L${W} 0 `;
  // right edge: tab pushes into the neighbour on the left of it (lower x = read-next in RTL)
  p += tab
    ? `L${W} ${M - KH} C${W + D} ${M - KH} ${W + D} ${M + KH} ${W} ${M + KH} L${W} ${H} `
    : `L${W} ${H} `;
  p += `L0 ${H} `;
  // left edge: socket receives the neighbour's tab
  p += socket
    ? `L0 ${M + KH} C${D} ${M + KH} ${D} ${M - KH} 0 ${M - KH} L0 0 `
    : `L0 0 `;
  return p + "Z";
}

/* ---------- per-pillar visuals ---------- */
const fillFor: Record<CopColor, string> = {
  amber: "var(--color-topic-amber)",
  teal: "var(--color-topic-teal)",
  coral: "var(--color-topic-coral)",
};
const inkFor: Record<CopColor, string> = {
  amber: "var(--color-navy-900)",
  teal: "var(--color-paper)",
  coral: "var(--color-paper)",
};
const cardFor: Record<CopColor, string> = {
  amber: "bg-topic-amber-soft border-topic-amber/40",
  teal: "bg-topic-teal-soft border-topic-teal/40",
  coral: "bg-topic-coral-soft border-topic-coral/40",
};
const dotFor: Record<CopColor, string> = {
  amber: "bg-topic-amber",
  teal: "bg-topic-teal",
  coral: "bg-topic-coral",
};

/** Tiny line icons drawn in the piece's ink colour, centred at local (100, 52). */
function PieceIcon({ kind, color }: { kind: string; color: string }) {
  const s = { fill: "none", stroke: color, strokeWidth: 3.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "Community")
    return (
      <g transform="translate(78 32)" {...s}>
        <circle cx="22" cy="10" r="6.5" />
        <circle cx="6" cy="34" r="6.5" />
        <circle cx="38" cy="34" r="6.5" />
        <path d="M19 16 L9 28 M25 16 L35 28 M12 34 H32" />
      </g>
    );
  if (kind === "Practice")
    return (
      <g transform="translate(80 30)" {...s}>
        <path d="M20 4a14 14 0 0 0-8 25c1.5 1.2 2 2.4 2 4v1h12v-1c0-1.6.5-2.8 2-4a14 14 0 0 0-8-25Z" />
        <path d="M15 40h10 M17 45h6" />
      </g>
    );
  // Domain — open book
  return (
    <g transform="translate(76 32)" {...s}>
      <path d="M24 8C19 4 9 4 4 7v30c5-3 15-3 20 1 5-4 15-4 20-1V7c-5-3-15-3-20 1Z" />
      <path d="M24 9v30" />
    </g>
  );
}

export function CopModel() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Left-to-right SVG layout. In RTL the reader meets Community first (rightmost).
  const layout = [
    { key: "Domain", x: 10, tab: true, socket: false, from: { x: -50 } },
    { key: "Practice", x: 210, tab: true, socket: true, from: { y: 44 } },
    { key: "Community", x: 410, tab: false, socket: true, from: { x: 50 } },
  ] as const;
  const byKey = Object.fromEntries(copPillars.map((p) => [p.en, p]));

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-piece]", {
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        opacity: 0,
        x: (i: number) => (i === 0 ? -50 : i === 2 ? 50 : 0),
        y: (i: number) => (i === 1 ? 44 : 0),
        duration: 0.9,
        ease: "back.out(1.4)",
        stagger: 0.12,
      });
      gsap.from("[data-card]", {
        scrollTrigger: { trigger: "[data-cards]", start: "top 82%" },
        opacity: 0,
        y: 26,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, rootRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="bg-paper-mesh py-24 lg:py-32 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-0 w-[34vmin] h-[34vmin] bg-topic-teal/8 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[38vmin] h-[38vmin] bg-topic-coral/8 blur-3xl rounded-full" />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          {copIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-8 max-w-3xl">
          {copIntro.title}
        </h2>
        <p className="font-body text-lg lg:text-xl text-ink/80 leading-relaxed max-w-3xl mb-14 lg:mb-20">
          {copIntro.lead}
        </p>

        {/* Puzzle infographic */}
        <div className="mx-auto max-w-[760px]">
          <svg
            viewBox="0 0 620 240"
            className="w-full h-auto"
            role="img"
            aria-label="מודל הקהילה הלומדת: שלושה ממדים - קהילה, שינוי והתנסות ותחום מקצועי - שמשתלבים יחד כמו חלקי פאזל."
          >
            <defs>
              <filter id="cop-shadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#0f1e47" floodOpacity="0.18" />
              </filter>
            </defs>
            {layout.map((l, i) => {
              const pillar = byKey[l.key];
              return (
                <g key={l.key} data-piece transform={`translate(${l.x} 20)`} filter="url(#cop-shadow)">
                  <path d={piecePath(l.tab, l.socket)} fill={fillFor[pillar.color]} stroke="var(--color-paper)" strokeWidth={4} />
                  <PieceIcon kind={l.key} color={inkFor[pillar.color]} />
                  <text
                    x={100}
                    y={118}
                    textAnchor="middle"
                    fill={inkFor[pillar.color]}
                    style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 800, fontSize: 22, opacity: 0.85 }}
                  >
                    {pillar.en}
                  </text>
                  <text
                    x={100}
                    y={150}
                    textAnchor="middle"
                    direction="rtl"
                    fill={inkFor[pillar.color]}
                    style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 25 }}
                  >
                    {pillar.he}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Description cards */}
        <div data-cards className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {copPillars.map((p) => (
            <article
              key={p.en}
              data-card
              className={`rounded-3xl border p-7 lg:p-8 ${cardFor[p.color]}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-3 h-3 rounded-full ${dotFor[p.color]}`} />
                <h3 className="font-display font-black text-xl text-navy-900 leading-none">
                  {p.he}
                  <span className="font-body font-semibold text-sm text-navy-700/55 italic ms-2">{p.en}</span>
                </h3>
              </div>
              <p className="font-body text-base text-ink/75 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>

        {/* Full-PDF call to action */}
        <div className="mt-14 lg:mt-20 flex flex-col items-start gap-3">
          <a
            href={copIntro.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-navy-900 text-paper rounded-full font-display font-bold text-base lg:text-lg hover:bg-navy-700 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M9 13h6M9 17h4" />
            </svg>
            {copIntro.pdfLabel}
            <span className="transition-transform group-hover:-translate-x-1" aria-hidden>←</span>
          </a>
          <p className="font-body text-xs text-ink/50">{copIntro.pdfNote}</p>
        </div>
      </div>
    </section>
  );
}
