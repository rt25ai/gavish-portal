"use client";

import { storylineSteps, storylineIntro, closingInsights } from "@/data/policy-course";
import { topicColorClasses } from "@/styles/topic-colors";
import { cn } from "@/lib/cn";
import { useReveal } from "../use-reveal";

/**
 * "From decision to impact" - the four-question execution storyline
 * (why / where to / how / how much), followed by two closing insights
 * (momentum as a lever, adaptive vision).
 */
export function CourseStoryline() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-paper-mesh-soft py-24 lg:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
          {storylineIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-6" data-reveal>
          {storylineIntro.title}
        </h2>
        <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl mb-14 lg:mb-16" data-reveal>
          {storylineIntro.body}
        </p>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {storylineSteps.map((step) => {
            const c = topicColorClasses[step.color];
            return (
              <li
                key={step.num}
                data-reveal
                className="relative rounded-3xl bg-paper border border-navy-900/8 p-7 flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-5">
                  <span className={cn("grid place-items-center size-10 rounded-full text-paper font-display font-black tabular", c.bg, step.color === "amber" && "text-navy-900")}>
                    {step.num}
                  </span>
                  <span className="font-body text-xs uppercase tracking-[0.14em] text-navy-700/55 font-semibold">
                    {step.label}
                  </span>
                </div>
                <h3 className={cn("font-display font-black text-4xl mb-5", c.text)}>{step.q}</h3>
                <ul className="space-y-2.5 mt-auto">
                  {step.questions.map((q) => (
                    <li key={q} className="font-body text-[0.9rem] text-ink/75 leading-snug border-r-2 border-navy-900/10 pr-3">
                      {q}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        {/* closing insights */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {closingInsights.map((ins) => (
            <article
              key={ins.title}
              data-reveal
              className="rounded-3xl bg-paper border border-navy-900/8 p-8 lg:p-10"
            >
              <h3 className="font-display font-black text-2xl text-navy-900 mb-4 flex items-center gap-3">
                <span className="h-6 w-1.5 rounded-full bg-topic-coral" aria-hidden />
                {ins.title}
              </h3>
              <p className="font-body text-lg text-ink/75 leading-relaxed">{ins.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
