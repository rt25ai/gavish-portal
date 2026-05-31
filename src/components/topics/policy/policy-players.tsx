"use client";

import { policyPlayers, playersIntro } from "@/data/policy-document";
import { topicColorClasses, topicPastelClasses } from "@/styles/topic-colors";
import { cn } from "@/lib/cn";
import { useReveal } from "./use-reveal";

/**
 * "Three players, one move" - the partnership model between the State,
 * local authorities and civil society. Three numbered cards.
 */
export function PolicyPlayers() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-paper-mesh py-24 lg:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
          {playersIntro.eyebrow}
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-6" data-reveal>
          {playersIntro.title}
        </h2>
        <p className="font-body text-lg lg:text-xl text-ink/80 leading-relaxed max-w-3xl mb-14 lg:mb-16" data-reveal>
          {playersIntro.body}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {policyPlayers.map((p) => {
            const c = topicColorClasses[p.color];
            const pastel = topicPastelClasses[p.color];
            return (
              <article
                key={p.num}
                data-reveal
                className={cn(
                  "group relative overflow-hidden rounded-3xl border p-8 lg:p-9 transition-transform duration-500 hover:-translate-y-1",
                  pastel.surface,
                  pastel.ring,
                )}
              >
                <div aria-hidden className={cn("absolute -top-6 -left-6 w-28 h-28 rounded-full blur-2xl opacity-20", c.bg)} />
                <div className="relative flex items-baseline justify-between">
                  <span className={cn("font-display font-black text-5xl", c.text)}>/{p.num}</span>
                  <span className="font-body text-xs uppercase tracking-[0.16em] text-navy-700/55 font-semibold">
                    {p.role}
                  </span>
                </div>
                <h3 className="relative font-display font-black text-3xl lg:text-4xl text-navy-900 mt-8 mb-4 leading-none">
                  {p.name}
                </h3>
                <p className="relative font-body text-base lg:text-lg text-ink/75 leading-relaxed">{p.body}</p>
                <span className={cn("relative mt-7 block h-1.5 w-14 rounded-full", c.bg)} aria-hidden />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
