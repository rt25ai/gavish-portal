"use client";

import { courseChallenges, challengesIntro } from "@/data/policy-course";
import { useReveal } from "../use-reveal";

/**
 * The 7 challenges of youth-department managers - the starting point of the
 * module. Framed as features of the arena, not personal management failures.
 */
export function CourseChallenges() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-paper-mesh py-24 lg:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
          {challengesIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-6" data-reveal>
          {challengesIntro.title}
        </h2>
        <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl mb-14 lg:mb-16" data-reveal>
          {challengesIntro.body}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {courseChallenges.map((ch, i) => (
            <article
              key={ch.title}
              data-reveal
              className="group relative rounded-2xl bg-paper border border-navy-900/8 p-6 lg:p-7 hover:-translate-y-0.5 hover:border-topic-coral/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="grid place-items-center size-9 rounded-xl bg-topic-coral/10 text-topic-coral font-display font-black text-base tabular shrink-0">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="font-display font-black text-lg lg:text-xl text-navy-900 leading-tight">{ch.title}</h3>
              </div>
              <p className="font-body text-[0.95rem] text-ink/70 leading-relaxed">{ch.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
