"use client";

import { Check } from "lucide-react";
import { powerInterestMatrix, matrixIntro } from "@/data/policy-course";
import { topicColorClasses } from "@/styles/topic-colors";
import { cn } from "@/lib/cn";
import { useReveal } from "../use-reveal";

/**
 * Power-Interest stakeholder matrix. A 2x2 grid (power = vertical axis,
 * interest = horizontal). In RTL the cards flow high-interest→low-interest
 * right-to-left, matching the data order (high/high, high/low, low/high, low/low).
 */
export function CourseMatrix() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-cream-mesh py-24 lg:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
          {matrixIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-6" data-reveal>
          {matrixIntro.title}
        </h2>
        <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl mb-12 lg:mb-16" data-reveal>
          {matrixIntro.body}
        </p>

        {/* matrix with axes (desktop) */}
        <div className="flex gap-4" data-reveal>
          {/* vertical axis label */}
          <div className="hidden lg:flex flex-col items-center justify-between py-6 shrink-0">
            <span className="font-body text-xs text-navy-700/60 font-semibold">גבוה</span>
            <span
              className="font-display font-black text-sm text-navy-900 tracking-wide"
              style={{ writingMode: "vertical-rl" }}
            >
              {matrixIntro.axisPower}
            </span>
            <span className="font-body text-xs text-navy-700/60 font-semibold">נמוך</span>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {powerInterestMatrix.map((cell) => {
                const c = topicColorClasses[cell.color];
                return (
                  <article
                    key={cell.title}
                    className="rounded-3xl bg-paper border border-navy-900/8 p-7 lg:p-8 flex flex-col"
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <h3 className={cn("font-display font-black text-2xl", c.text)}>{cell.title}</h3>
                      <span className={cn("size-3 rounded-full shrink-0", c.bg)} aria-hidden />
                    </div>
                    <p className="font-body text-xs uppercase tracking-[0.12em] text-navy-700/55 font-semibold mb-5">
                      {cell.tag}
                    </p>
                    <ul className="space-y-2.5">
                      {cell.actions.map((a) => (
                        <li key={a} className="flex items-start gap-2.5">
                          <Check className={cn("size-4 mt-1 shrink-0", c.text)} strokeWidth={3} aria-hidden />
                          <span className="font-body text-[0.95rem] text-ink/80 leading-snug">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            {/* horizontal axis label */}
            <div className="hidden lg:flex items-center justify-between mt-4 px-2">
              <span className="font-body text-xs text-navy-700/60 font-semibold">נמוך</span>
              <span className="font-display font-black text-sm text-navy-900 tracking-wide">
                {matrixIntro.axisInterest}
              </span>
              <span className="font-body text-xs text-navy-700/60 font-semibold">גבוה</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
