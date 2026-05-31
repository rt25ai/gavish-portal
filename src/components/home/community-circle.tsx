"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";
import { CrystalMark } from "@/components/brand/crystal-mark";

const BLUR =
  "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADQAwCdASoUAAsAPxFysFAsJqSisAgBgCIJYwC06CG/panaHYSZHwAA3ma3DcdXPoDtHsw2RlxPQpDKUC1SdbLfGqhQJbsZTWdu9J7xGaXv+Y+ofuyGcsfqCbCA7QVKoAA=";

/**
 * Cinematic full-bleed band beneath the hero.
 * The community circle photo, brand-tinted and framed with the Gavish
 * signature decor. Top edge melts into the hero's paper background;
 * bottom edge melts back out into the next section.
 */
export function CommunityCircle() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Reveal: the band wipes open from the centre on enter.
      gsap.fromTo(
        section,
        { clipPath: "inset(12% 8% round 2rem)" },
        {
          clipPath: "inset(0% 0% round 0rem)",
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );

      // Parallax: image drifts slower than the scroll.
      gsap.fromTo(
        image,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Caption rises in.
      if (captionRef.current) {
        gsap.from(captionRef.current, {
          autoAlpha: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="קהילת גביש נפגשת"
      className="relative w-full h-[52svh] min-h-[360px] sm:h-[60svh] lg:h-[72svh] overflow-hidden bg-navy-950"
    >
      {/* Photo (over-sized for parallax travel) */}
      <div ref={imageRef} className="absolute inset-0 scale-[1.18]">
        <Image
          src="/home/community-circle.webp"
          alt="מנהלות ומנהלי מחלקות הנוער יושבים במעגל בגן, במפגש קהילת גביש"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Brand navy tint - pulls the warm photo toward the Gavish palette */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/35 to-navy-900/30 mix-blend-multiply"
      />
      <div aria-hidden className="absolute inset-0 bg-navy-950/15" />

      {/* Seamless blend into hero (top) and next section (bottom) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper via-paper/60 to-transparent"
      />

      {/* Signature brand decor (echoes the hero) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <CrystalMark className="absolute -top-10 right-6 size-64 opacity-[0.12] hidden lg:block" animated />
        <div className="absolute top-24 left-16 w-40 h-56 bg-stripes-soft opacity-30 [mask-image:linear-gradient(135deg,black,transparent)] hidden lg:block" />
        {/* thin gavish-blue accent hairline */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-leaf-500 to-transparent opacity-70" />
      </div>

      {/* Overlaid kicker - bottom-right (RTL natural first-read) */}
      <div className="relative z-10 h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex items-end justify-start pb-12 lg:pb-16">
        <div ref={captionRef} className="max-w-xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="size-2 rounded-full bg-leaf-500 [animation:pulse_2s_ease-in-out_infinite]" />
            <span className="font-body text-xs lg:text-sm tracking-[0.28em] uppercase text-paper/80 font-semibold">
              מעגל הלמידה
            </span>
          </div>
          <p className="font-display font-black leading-tight text-paper text-2xl lg:text-4xl drop-shadow-[0_2px_20px_rgba(7,17,45,0.6)]">
            הקהילה נפגשת.
            <br />
            <span className="text-leaf-300">פנים אל פנים, מסביב למעגל.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
