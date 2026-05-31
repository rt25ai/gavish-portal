"use client";

import { policyChallenges, challengesIntro } from "@/data/policy-document";
import { useReveal } from "./use-reveal";

/**
 * The five fundamental challenges the framework sets out to fix, anchored by
 * the 30%-participation reality. Coral accent (this topic's color).
 */
export function PolicyChallenges() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-cream-mesh py-24 lg:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-14 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
              {challengesIntro.eyebrow}
            </p>
            <h2 className="font-display text-display font-black text-navy-900 leading-[0.95]" data-reveal>
              {challengesIntro.title}
            </h2>
          </div>
          <p className="lg:col-span-5 font-body text-lg text-ink/80 leading-relaxed" data-reveal>
            {challengesIntro.body}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {policyChallenges.map((ch, i) => (
            <article
              key={ch.title}
              data-reveal
              className="group relative rounded-2xl bg-paper border border-navy-900/8 p-7 lg:p-8 hover:border-topic-coral/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="font-display font-black text-2xl text-topic-coral tabular shrink-0 leading-none pt-0.5">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display font-black text-xl lg:text-2xl text-navy-900 leading-tight mb-2.5">
                    {ch.title}
                  </h3>
                  <p className="font-body text-base text-ink/70 leading-relaxed">{ch.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
