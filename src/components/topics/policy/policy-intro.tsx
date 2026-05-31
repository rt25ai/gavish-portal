"use client";

import { policyMeta, policyStat } from "@/data/policy-document";
import { useReveal } from "./use-reveal";

/**
 * Opening band of the policy framework: the founding manifesto statement,
 * process facts, and the "3 million children" statistic. Dark crystal surface
 * to set this national-framework block apart from the lighter topic sections.
 */
export function PolicyIntro() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-navy-900 text-paper py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 bg-crystal opacity-60" />
      <div
        aria-hidden
        className="absolute top-16 left-10 w-40 h-56 bg-stripes-soft opacity-40 [mask-image:linear-gradient(135deg,black,transparent)]"
      />

      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-topic-coral font-semibold mb-8" data-reveal>
          {policyMeta.eyebrow}
        </p>

        {/* manifesto statement */}
        <blockquote
          className="font-display font-black text-3xl sm:text-4xl lg:text-[3.4rem] leading-[1.08] max-w-5xl text-balance"
          data-reveal
        >
          {policyMeta.manifesto}
        </blockquote>

        <p className="mt-10 font-body text-lg lg:text-xl text-paper/70 leading-relaxed max-w-3xl" data-reveal>
          {policyMeta.lead}
        </p>

        {/* process facts */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-paper/12 bg-paper/8">
          {policyMeta.facts.map((f) => (
            <div key={f.label} className="bg-navy-900/40 backdrop-blur-sm p-7 lg:p-8" data-reveal>
              <p className="font-display font-black text-3xl lg:text-4xl text-paper tabular leading-none">{f.value}</p>
              <p className="font-display font-bold text-base text-paper/90 mt-3">{f.label}</p>
              <p className="font-body text-sm text-paper/55 mt-1 leading-snug">{f.note}</p>
            </div>
          ))}
        </div>

        {/* founding statistic */}
        <div className="mt-8 rounded-3xl border border-topic-coral/30 bg-topic-coral/10 p-8 lg:p-12" data-reveal>
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            <div>
              <p className="font-display font-black text-mega leading-[0.8] text-topic-coral">{policyStat.big}</p>
              <p className="font-body text-base text-paper/70 mt-2">{policyStat.unit}</p>
            </div>
            <div className="flex gap-8 pb-2">
              <div>
                <p className="font-display font-black text-3xl lg:text-4xl text-paper leading-none">{policyStat.fraction}</p>
                <p className="font-body text-sm text-paper/55 mt-1">{policyStat.fractionLabel}</p>
              </div>
              <div className="w-px self-stretch bg-paper/15" aria-hidden />
              <div>
                <p className="font-display font-black text-3xl lg:text-4xl text-topic-coral leading-none">{policyStat.future}</p>
                <p className="font-body text-sm text-paper/55 mt-1">{policyStat.futureLabel}</p>
              </div>
            </div>
          </div>
          <p className="mt-8 font-body text-lg text-paper/80 leading-relaxed max-w-3xl">{policyStat.body}</p>
        </div>
      </div>
    </section>
  );
}
