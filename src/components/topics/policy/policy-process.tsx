"use client";

import { policyProcess, processIntro } from "@/data/policy-document";
import { useReveal } from "./use-reveal";

/**
 * The collaborative process behind the document - a four-step horizontal
 * timeline from listening to the field (Dec 2023) to drafting the agreements.
 */
export function PolicyProcess() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-paper-mesh py-24 lg:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
          {processIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-14 lg:mb-16 max-w-3xl" data-reveal>
          {processIntro.title}
        </h2>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {policyProcess.map((step, i) => (
            <li key={step.period} className="relative" data-reveal>
              {/* connector line (desktop) */}
              {i < policyProcess.length - 1 && (
                <span
                  aria-hidden
                  className="hidden lg:block absolute top-3 right-0 left-6 h-px bg-navy-900/12"
                />
              )}
              <span className="relative grid place-items-center size-7 rounded-full bg-topic-coral text-paper font-display font-black text-sm tabular">
                {i + 1}
              </span>
              <p className="font-body text-xs uppercase tracking-[0.14em] text-topic-coral font-semibold mt-5">
                {step.period}
              </p>
              <h3 className="font-display font-black text-xl text-navy-900 mt-1.5 mb-2 leading-tight">{step.title}</h3>
              <p className="font-body text-[0.95rem] text-ink/70 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
