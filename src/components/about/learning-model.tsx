"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import {
  learningModelIntro,
  modelGoals,
  modelFindings,
  modelDocs,
} from "@/data/learning-model";

export function LearningModel() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-goal]", {
        scrollTrigger: { trigger: "[data-goals]", start: "top 80%" },
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.from("[data-finding]", {
        scrollTrigger: { trigger: "[data-findings]", start: "top 82%" },
        opacity: 0,
        x: 24,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.08,
      });
    }, rootRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="bg-crystal text-paper py-24 lg:py-32 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[44vmin] h-[44vmin] bg-leaf-500/15 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40vmin] h-[40vmin] bg-topic-teal/12 blur-3xl rounded-full" />
        <div className="hidden lg:block absolute top-24 left-12 w-40 h-56 bg-stripes-soft opacity-40 [mask-image:linear-gradient(135deg,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-leaf-300/85 font-semibold mb-4">
          {learningModelIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black leading-[0.95] mb-8 max-w-3xl">
          {learningModelIntro.title}
        </h2>
        <p className="font-body text-lg lg:text-xl text-paper/80 leading-relaxed max-w-3xl mb-16 lg:mb-20">
          {learningModelIntro.lead}
        </p>

        {/* Goals */}
        <p className="font-body text-xs uppercase tracking-[0.18em] text-paper/45 font-bold mb-6">
          יעדי המודל
        </p>
        <div data-goals className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-20">
          {modelGoals.map((g) => (
            <article
              key={g.num}
              data-goal
              className="relative rounded-3xl border border-paper/12 bg-paper/[0.04] backdrop-blur-sm p-7 lg:p-8"
            >
              <span className="font-display font-black text-5xl text-leaf-300/90 leading-none tabular block mb-5">
                {g.num}
              </span>
              <h3 className="font-display font-black text-xl lg:text-2xl leading-tight mb-3">
                {g.title}
              </h3>
              <p className="font-body text-base text-paper/70 leading-relaxed">{g.body}</p>
            </article>
          ))}
        </div>

        {/* Key findings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-paper/45 font-bold mb-4">
              ממצאי המחקר
            </p>
            <h3 className="font-display font-black text-3xl lg:text-4xl leading-tight">
              מה הראתה
              <br />
              <span className="text-leaf-300">ההערכה?</span>
            </h3>
          </div>
          <ul data-findings className="lg:col-span-8 space-y-3">
            {modelFindings.map((f, i) => (
              <li
                key={i}
                data-finding
                className="flex gap-4 items-start rounded-2xl bg-paper/[0.04] border border-paper/10 p-5 lg:p-6"
              >
                <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-leaf-500/90 text-paper grid place-items-center">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <p className="font-body text-base text-paper/85 leading-relaxed">{f}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* PDF documents */}
        <div className="mt-16 lg:mt-20 pt-10 border-t border-paper/12">
          <p className="font-body text-sm text-paper/60 mb-5">המסמכים המלאים של מחקר ההערכה:</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {modelDocs.map((d) => (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 inline-flex items-center gap-4 px-6 py-5 rounded-2xl bg-paper/[0.06] border border-paper/15 hover:bg-paper/[0.12] hover:border-paper/30 transition-colors"
              >
                <span className="shrink-0 w-11 h-11 rounded-xl bg-leaf-500/90 text-paper grid place-items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M9 13h6M9 17h4" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-bold text-base lg:text-lg leading-tight">
                    {d.label}
                  </span>
                  <span className="block font-body text-sm text-paper/55 mt-0.5">{d.sub}</span>
                </span>
                <span className="ms-auto text-paper/50 transition-transform group-hover:-translate-x-1" aria-hidden>
                  ←
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
