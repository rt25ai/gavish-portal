"use client";

import { GraduationCap, Quote } from "lucide-react";
import { courseMeta } from "@/data/policy-course";
import { useReveal } from "../use-reveal";

/**
 * Opening band of the course module. Clearly marks the block as course content
 * (not the original presentation), with the framing question and author credit.
 */
export function CourseIntro() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-cream-mesh py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute top-0 right-0 w-44 h-60 bg-stripes-soft opacity-50 [mask-image:linear-gradient(225deg,black,transparent)]"
      />
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <span
          className="inline-flex items-center gap-2 rounded-full bg-topic-coral/12 text-topic-coral border border-topic-coral/25 px-4 py-1.5 font-body text-sm font-semibold mb-8"
          data-reveal
        >
          <GraduationCap className="size-4" aria-hidden />
          {courseMeta.eyebrow}
        </span>

        <h2 className="font-display text-display font-black text-navy-900 leading-[0.92]" data-reveal>
          {courseMeta.title}
        </h2>
        <p className="mt-3 font-display font-bold text-xl lg:text-2xl text-navy-700/80" data-reveal>
          {courseMeta.subtitle}
        </p>

        <p className="mt-8 font-body text-lg lg:text-xl text-ink/80 leading-relaxed max-w-3xl" data-reveal>
          {courseMeta.lead}
        </p>

        {/* framing question */}
        <figure
          className="mt-12 relative rounded-3xl bg-paper border border-navy-900/8 p-8 lg:p-10 max-w-4xl"
          data-reveal
        >
          <Quote className="absolute -top-4 right-8 size-9 text-topic-coral/30 rotate-180" aria-hidden />
          <blockquote className="font-display font-black text-2xl lg:text-3xl text-navy-900 leading-snug text-balance">
            {courseMeta.framing}
          </blockquote>
          <figcaption className="mt-6 font-body text-sm text-ink/55">
            מתוך המודול של <span className="font-semibold text-navy-900">{courseMeta.author}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
