"use client";

import { policyPartners, partnersIntro, partnersCredit } from "@/data/policy-document";
import { cn } from "@/lib/cn";
import { useReveal } from "./use-reveal";

/**
 * Wall of the 22 signatory organizations, with קרן רש"י (the portal sponsor)
 * highlighted, plus the process-author credit.
 */
export function PolicyPartners() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-cream-mesh py-24 lg:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
          {partnersIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-6" data-reveal>
          {partnersIntro.title}
        </h2>
        <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl mb-12 lg:mb-14" data-reveal>
          {partnersIntro.body}
        </p>

        <div className="flex flex-wrap gap-3" data-reveal>
          {policyPartners.map((p) => (
            <span
              key={p.name}
              className={cn(
                "font-body text-sm lg:text-base rounded-full px-5 py-2.5 border transition-colors",
                p.highlight
                  ? "bg-topic-coral text-paper border-topic-coral font-bold shadow-[0_10px_30px_-12px_rgba(233,75,42,0.6)]"
                  : "bg-paper text-navy-900/80 border-navy-900/10 hover:border-navy-900/25",
              )}
            >
              {p.name}
            </span>
          ))}
        </div>

        <div className="mt-14 inline-flex items-center gap-4 rounded-2xl bg-paper border border-navy-900/8 px-6 py-4" data-reveal>
          <div className="size-11 rounded-full bg-navy-900 text-paper grid place-items-center font-display font-black" aria-hidden>
            לכ
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-[0.16em] text-navy-700/55 font-semibold">
              {partnersCredit.label}
            </p>
            <p className="font-display font-bold text-lg text-navy-900">{partnersCredit.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
