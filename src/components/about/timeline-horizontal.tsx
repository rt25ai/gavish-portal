"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";
import { timeline } from "@/lib/content";

export function TimelineHorizontal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth + 80;
      gsap.to(track, {
        x: () => -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => "+=" + distance,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="bg-cream-mesh overflow-hidden">
      <div className="pt-24 lg:pt-32 px-6 lg:px-10 mx-auto max-w-[1400px]">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          המסע
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-16">
          9 חודשים, נקודה אחר נקודה.
        </h2>
      </div>
      <div ref={trackRef} className="flex gap-6 lg:gap-10 px-6 lg:px-10 pb-32 will-change-transform">
        {timeline.map((item, i) => (
          <article
            key={i}
            className="shrink-0 w-[78vw] sm:w-[420px] bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8 shadow-[0_20px_60px_-30px_rgba(15,30,71,0.25)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-black text-2xl text-leaf-500">/{(i + 1).toString().padStart(2, "0")}</span>
              <span className="font-body text-sm uppercase tracking-[0.18em] text-navy-700/70 font-semibold">{item.date}</span>
            </div>
            <h3 className="font-display font-black text-4xl text-navy-900 leading-[0.95] mb-4">{item.title}</h3>
            <p className="font-body text-base text-ink/75 leading-relaxed">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
