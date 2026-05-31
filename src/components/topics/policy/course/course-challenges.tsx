"use client";

import { HelpCircle, Landmark, ArrowLeftRight, Gauge, HeartPulse, Network, Flame, type LucideIcon } from "lucide-react";
import { courseChallenges, challengesIntro, challengesTakeaway } from "@/data/policy-course";
import { useReveal } from "../use-reveal";

const icons: Record<string, LucideIcon> = {
  HelpCircle,
  Landmark,
  ArrowLeftRight,
  Gauge,
  HeartPulse,
  Network,
  Flame,
};

/**
 * The 7 challenges of youth-department managers, as a connected "spine"
 * infographic: a vertical line threads through icon nodes, each opening into a
 * titled card. Closes with a reframe pull-quote (systemic, not personal).
 */
export function CourseChallenges() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-paper-mesh py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute -top-10 left-0 w-[40vmin] h-[40vmin] bg-topic-coral/8 blur-3xl rounded-full pointer-events-none"
      />
      <div ref={ref} className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
        {/* header with oversized numeral */}
        <div className="relative mb-16 lg:mb-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 left-0 lg:-top-24 font-display font-black text-topic-coral/10 leading-none select-none"
            style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
          >
            7
          </span>
          <div className="relative">
            <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4" data-reveal>
              {challengesIntro.eyebrow}
            </p>
            <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] max-w-2xl" data-reveal>
              {challengesIntro.title}
            </h2>
            <p className="mt-6 font-body text-lg text-ink/80 leading-relaxed max-w-2xl" data-reveal>
              {challengesIntro.body}
            </p>
          </div>
        </div>

        {/* spine infographic */}
        <ol className="relative">
          {/* vertical thread */}
          <span
            aria-hidden
            className="absolute top-7 bottom-7 right-[27px] w-0.5 bg-gradient-to-b from-topic-coral/60 via-topic-coral/30 to-topic-coral/10 lg:right-[31px]"
          />
          {courseChallenges.map((ch, i) => {
            const Icon = icons[ch.icon] ?? HelpCircle;
            return (
              <li key={ch.title} className="relative flex items-start gap-5 lg:gap-7 pb-6 last:pb-0" data-reveal>
                {/* node */}
                <span className="relative z-10 grid place-items-center size-14 lg:size-16 rounded-2xl bg-topic-coral text-paper shrink-0 shadow-[0_12px_30px_-12px_rgba(233,75,42,0.7)]">
                  <Icon className="size-6 lg:size-7" strokeWidth={2} aria-hidden />
                  <span className="absolute -top-2 -left-2 grid place-items-center size-6 rounded-full bg-navy-900 text-paper font-display font-black text-[0.7rem] tabular">
                    {i + 1}
                  </span>
                </span>
                {/* card */}
                <div className="flex-1 rounded-2xl bg-paper border border-navy-900/8 p-5 lg:p-6 hover:border-topic-coral/40 hover:-translate-y-0.5 transition-all">
                  <h3 className="font-display font-black text-xl lg:text-2xl text-navy-900 leading-tight mb-1.5">
                    {ch.title}
                  </h3>
                  <p className="font-body text-[0.95rem] lg:text-base text-ink/70 leading-relaxed">{ch.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* reframe takeaway */}
        <div
          className="mt-14 lg:mt-16 rounded-3xl bg-navy-900 text-paper p-8 lg:p-10 relative overflow-hidden"
          data-reveal
        >
          <div aria-hidden className="absolute inset-0 bg-crystal opacity-50" />
          <p className="relative font-display font-black text-2xl lg:text-3xl leading-snug text-balance">
            <span className="text-topic-coral">״</span>
            {challengesTakeaway}
            <span className="text-topic-coral">״</span>
          </p>
        </div>
      </div>
    </section>
  );
}
