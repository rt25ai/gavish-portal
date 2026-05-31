"use client";

import { Check } from "lucide-react";
import { actionPillars, actionsIntro, nowChecklist } from "@/data/policy-document";
import { topicColorClasses } from "@/styles/topic-colors";
import { cn } from "@/lib/cn";
import { useReveal } from "./use-reveal";

/**
 * Operative recommendations: three action pillars (resources / profession /
 * diverse responses), each with its concrete action list, followed by the
 * "what's needed now" checklist as a closing summary band.
 */
export function PolicyActions() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-paper-mesh-soft py-24 lg:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
          {actionsIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-6" data-reveal>
          {actionsIntro.title}
        </h2>
        <p className="font-body text-lg lg:text-xl text-ink/80 leading-relaxed max-w-3xl mb-14 lg:mb-16" data-reveal>
          {actionsIntro.body}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {actionPillars.map((pillar) => {
            const c = topicColorClasses[pillar.color];
            return (
              <article
                key={pillar.num}
                data-reveal
                className="flex flex-col rounded-3xl bg-paper border border-navy-900/8 overflow-hidden"
              >
                <header className={cn("p-7 lg:p-8 border-b border-navy-900/8")}>
                  <span className={cn("font-display font-black text-4xl", c.text)}>/{pillar.num}</span>
                  <h3 className="font-display font-black text-2xl lg:text-3xl text-navy-900 mt-4 leading-none">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-base text-ink/65 mt-3 leading-snug">{pillar.lead}</p>
                </header>
                <ul className="flex-1 p-7 lg:p-8 space-y-4">
                  {pillar.actions.map((a, i) => (
                    <li key={i} className="flex gap-3">
                      <span className={cn("mt-1.5 size-2 rounded-full shrink-0", c.bg)} aria-hidden />
                      <span className="font-body text-[0.95rem] text-ink/80 leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* "What's needed now" checklist */}
        <div className="mt-16 lg:mt-20 rounded-3xl bg-navy-900 text-paper p-8 lg:p-12 relative overflow-hidden" data-reveal>
          <div aria-hidden className="absolute inset-0 bg-crystal opacity-50" />
          <div className="relative">
            <h3 className="font-display font-black text-2xl lg:text-3xl mb-8">תקציר: מה נדרש עכשיו.</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {nowChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid place-items-center size-6 rounded-full bg-topic-coral/20 text-topic-coral shrink-0">
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="font-body text-base lg:text-lg text-paper/85 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
