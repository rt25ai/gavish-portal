"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/motion";
import { CrystalMark } from "@/components/brand/crystal-mark";
import { ProgramDetailsModal } from "@/components/about/program-details-modal";

/** Canonical program copy, from the official Gavish one-pager (קרן רש״י, 10/24). */
const hero = {
  eyebrow: "מהלך ליווי מקצועי · יוזמה של קרן רש״י",
  wordmark: "גביש",
  tagline: "מהלך ליווי מקצועי למנהלות ומנהלי מחלקות נוער ברשויות המקומיות",
  goal:
    "פיתוח, תקצוע ורישות ההון האנושי שמוביל את החינוך הבלתי פורמלי ברשויות המקומיות - להרחבת ההשפעה והקיימוּת של המערך בשלטון המקומי.",
  registerHref: "https://wkf.ms/3XACjRP",
  registerLabel: "למילוי שאלון ההרשמה",
  partners: "יוזמה של קרן רש״י בשיתוף קרן Samueli ואיגוד מנהלי מחלקות הנוער",
};

export function AboutHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-mark]", { scale: 0.55, rotate: -45, autoAlpha: 0, duration: 1.2, ease: "back.out(1.5)" })
        .from("[data-reveal]", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, "-=0.6");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-paper-mesh overflow-hidden pt-36 pb-24 lg:pt-48 lg:pb-32"
    >
      {/* atmosphere */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[60vmin] h-[60vmin] bg-leaf-500/12 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 right-[12%] w-[42vmin] h-[42vmin] bg-topic-teal/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 left-[10%] w-[40vmin] h-[40vmin] bg-leaf-700/10 blur-3xl rounded-full" />
        <div className="hidden lg:block absolute top-40 left-20 w-40 h-64 bg-stripes-soft opacity-60 [mask-image:linear-gradient(135deg,black,transparent)]" />
        <div className="hidden lg:block absolute top-52 right-24 w-36 h-56 bg-stripes-navy opacity-50 [mask-image:linear-gradient(225deg,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center flex flex-col items-center">
        {/* eyebrow */}
        <span
          data-reveal
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper/70 border border-navy-900/10 text-navy-700 font-body text-sm font-semibold mb-10 backdrop-blur-sm shadow-[0_8px_30px_-12px_rgba(15,30,71,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-leaf-500" />
          {hero.eyebrow}
        </span>

        {/* crystal mark - the logo, centred like the one-pager */}
        <div data-mark className="relative mb-6">
          <div aria-hidden className="absolute inset-0 -m-10 bg-leaf-500/20 blur-3xl rounded-full" />
          <div aria-hidden className="absolute inset-0 -m-2 bg-topic-teal/10 blur-2xl rounded-full" />
          <CrystalMark animated className="relative size-40 lg:size-52 drop-shadow-[0_18px_40px_rgba(37,69,144,0.28)]" />
        </div>

        {/* wordmark */}
        <h1 data-reveal className="font-display font-black text-navy-900 leading-[0.85] text-jumbo">
          {hero.wordmark}
        </h1>

        {/* tagline */}
        <p
          data-reveal
          className="mt-6 font-display font-bold text-xl sm:text-2xl lg:text-3xl text-navy-700 leading-snug max-w-2xl text-balance"
        >
          {hero.tagline}
        </p>

        {/* goal */}
        <p
          data-reveal
          className="mt-6 font-body text-base lg:text-lg text-ink/75 leading-relaxed max-w-2xl"
        >
          {hero.goal}
        </p>

        {/* CTAs */}
        <div data-reveal className="mt-11 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={hero.registerHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-navy-900 text-paper rounded-full font-display font-bold text-base lg:text-lg hover:bg-navy-700 transition-colors shadow-[0_18px_50px_-18px_rgba(15,30,71,0.6)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M9 13l2 2 4-4" />
            </svg>
            {hero.registerLabel}
            <span className="transition-transform group-hover:-translate-x-1" aria-hidden>←</span>
          </a>
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-navy-900/15 text-navy-900 font-display font-bold text-base lg:text-lg hover:bg-navy-900/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
          >
            לפרטי התוכנית
            <span aria-hidden>↓</span>
          </button>
        </div>

        {/* partners line */}
        <p data-reveal className="mt-10 font-body text-xs text-ink/50 tracking-wide">
          {hero.partners}
        </p>
      </div>

      <ProgramDetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} />
    </section>
  );
}
