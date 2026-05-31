"use client";

import { policyVsPolitics, managerRole } from "@/data/policy-course";
import { useReveal } from "../use-reveal";

/**
 * The core conceptual distinction of the module - policy vs politics - plus the
 * youth-department manager's unique value in translating need into investment.
 */
export function CoursePolicyPolitics() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-navy-900 text-paper py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 bg-crystal opacity-55" />
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-topic-coral font-semibold mb-4" data-reveal>
          {policyVsPolitics.eyebrow}
        </p>
        <h2 className="font-display text-display font-black leading-[0.95] mb-12 lg:mb-14" data-reveal>
          {policyVsPolitics.title}
        </h2>

        {/* two definitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {[policyVsPolitics.politics, policyVsPolitics.policy].map((d) => (
            <div key={d.term} className="rounded-3xl border border-paper/12 bg-paper/[0.06] p-8 lg:p-10" data-reveal>
              <h3 className="font-display font-black text-2xl lg:text-3xl text-topic-coral mb-4">{d.term}</h3>
              <p className="font-body text-lg lg:text-xl text-paper/85 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>

        {/* bridge insight */}
        <p
          className="mt-8 rounded-3xl border-r-4 border-topic-coral bg-paper/[0.04] p-8 lg:p-10 font-body text-lg lg:text-xl text-paper/85 leading-relaxed max-w-4xl"
          data-reveal
        >
          {policyVsPolitics.insight}
        </p>

        {/* manager's unique value */}
        <h3 className="mt-16 lg:mt-20 font-display font-black text-2xl lg:text-3xl mb-8" data-reveal>
          {managerRole.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {managerRole.points.map((p, i) => (
            <div key={p.title} className="rounded-2xl bg-paper/[0.06] border border-paper/10 p-7" data-reveal>
              <span className="font-display font-black text-3xl text-topic-coral/70 tabular">/{i + 1}</span>
              <h4 className="font-display font-bold text-xl text-paper mt-4 mb-2 leading-tight">{p.title}</h4>
              <p className="font-body text-base text-paper/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
