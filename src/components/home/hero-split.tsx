"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap, prefersReducedMotion, registerGsap, splitText } from "@/lib/motion";
import { CrystalMark } from "@/components/brand/crystal-mark";
import { RashiLogo } from "@/components/brand/rashi-logo";

export function HeroSplit() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const patronageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!wordRef.current) return;
    const reduced = prefersReducedMotion();

    const chars = splitText(wordRef.current, "chars");

    const ctx = gsap.context(() => {
      gsap.set([tagRef.current, subRef.current, ctaRef.current], { autoAlpha: 0, y: 24 });
      gsap.set(patronageRef.current, { autoAlpha: 0, y: -20, scale: 0.92 });
      gsap.set(chars, { autoAlpha: 0, yPercent: 110, rotateX: -45 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(patronageRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)" }, 0.1)
        .to(tagRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(
          chars,
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: reduced ? 0.3 : 1.4,
            stagger: reduced ? 0 : 0.05,
          },
          "-=0.4",
        )
        .to(subRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.8")
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-paper-mesh">
      {/* Crystal facet decor + brand stripes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[60vmin] h-[60vmin] bg-leaf-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[70vmin] h-[70vmin] bg-leaf-700/12 blur-3xl rounded-full" />
        <CrystalMark className="absolute -top-12 -left-20 w-[36rem] h-[36rem] opacity-[0.08] hidden lg:block" />
        <CrystalMark className="absolute bottom-12 right-8 size-72 opacity-25 hidden lg:block" animated />
        {/* signature diagonal stripes - the brand pattern */}
        <div aria-hidden className="hidden lg:block absolute top-40 right-24 w-48 h-72 bg-stripes-soft opacity-70 [mask-image:linear-gradient(135deg,black,transparent)]" />
        <div aria-hidden className="hidden lg:block absolute bottom-24 left-32 w-32 h-48 bg-stripes-navy opacity-50 [mask-image:linear-gradient(45deg,black,transparent)]" />
      </div>

      <div className="relative w-full mx-auto max-w-[1400px] px-6 lg:px-10 pb-16 lg:pb-24 pt-10 lg:pt-16">
        {/* Foundation patronage card - prominent, anchored to the right (RTL natural first-read) */}
        <div
          ref={patronageRef}
          className="mb-12 lg:mb-16 flex justify-start"
        >
          <Link
            href="https://www.rashi.org.il"
            target="_blank"
            rel="noopener"
            aria-label="קרן רש״י - אתר הקרן"
            className="group relative inline-flex items-stretch overflow-hidden rounded-3xl border border-navy-900/10 bg-paper/90 backdrop-blur-md shadow-[0_30px_80px_-30px_rgba(15,30,71,0.4)] hover:shadow-[0_36px_100px_-30px_rgba(111,185,74,0.55)] hover:border-leaf-500/60 transition-all duration-500"
          >
            {/* Glow accents */}
            <div aria-hidden className="absolute -top-16 -left-12 w-44 h-44 bg-leaf-500/30 blur-3xl rounded-full transition-opacity duration-700 group-hover:opacity-90" />
            <div aria-hidden className="absolute -bottom-16 -right-12 w-44 h-44 bg-navy-900/15 blur-3xl rounded-full" />
            <div aria-hidden className="absolute top-0 left-0 w-28 h-28 bg-leaf-500/15 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
            <div aria-hidden className="absolute bottom-3 left-3 size-2 rounded-full bg-leaf-500/70 [animation:pulse_3s_ease-in-out_infinite]" />

            {/* Side accent stripe */}
            <span aria-hidden className="relative hidden sm:block w-1.5 bg-gradient-to-b from-leaf-500 via-leaf-700 to-navy-900" />

            {/* Content */}
            <div className="relative flex items-center gap-4 lg:gap-6 px-5 sm:px-7 py-4 lg:py-5">
              <div className="flex flex-col items-end gap-0.5 leading-none">
                <span className="font-body text-[10px] lg:text-[11px] tracking-[0.32em] uppercase text-navy-700/60 font-semibold">
                  תוכנית של
                </span>
                <span className="font-display font-black text-base lg:text-lg text-navy-900 tracking-tight">
                  קרן רש״י
                </span>
              </div>
              <span aria-hidden className="h-12 lg:h-14 w-px bg-navy-900/10" />
              <RashiLogo className="h-12 lg:h-14 w-auto relative z-10 transition-transform duration-700 group-hover:scale-105" />
              <ArrowLeft className="size-4 text-navy-900/40 group-hover:text-leaf-700 transition-all group-hover:-translate-x-1 hidden sm:block" />
            </div>
          </Link>
        </div>

        <div ref={tagRef} className="flex items-center gap-3 mb-10">
          <span className="size-2 rounded-full bg-leaf-500 [animation:pulse_2s_ease-in-out_infinite]" />
          <span className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/80 font-semibold">
            מחזור א׳ · 2026
          </span>
        </div>

        <h1 className="font-display font-black leading-none">
          <span
            ref={wordRef}
            className="block text-mega text-navy-900 [perspective:1000px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            גביש
          </span>
        </h1>

        <p className="mt-2 font-body text-base lg:text-lg text-navy-700/80 max-w-2xl">
          קהילה מקצועית לומדת למנהלות ומנהלי מחלקות הנוער
        </p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <p
            ref={subRef}
            className="lg:col-span-7 font-body text-2xl lg:text-3xl leading-tight text-ink"
          >
            הקהילה המקצועית של{" "}
            <span className="font-display font-black text-navy-900">מנהלות ומנהלי</span>{" "}
            מחלקות הנוער ברשויות בישראל. תכנים. מחקר. השפעה.
          </p>

          <div ref={ctaRef} className="lg:col-span-5 lg:pt-2 flex flex-col gap-3 self-end">
            <Link
              href="/topics"
              className="group inline-flex items-center justify-between gap-4 px-8 py-5 bg-navy-900 text-paper rounded-full font-display font-bold text-lg hover:bg-navy-700 transition"
            >
              <span>4 האתגרים המרכזיים</span>
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/join"
              className="group inline-flex items-center justify-between gap-4 px-8 py-5 bg-leaf-500 text-paper rounded-full font-display font-bold text-lg hover:bg-leaf-700 transition"
            >
              <span>הצטרפות לקהילה</span>
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/community"
              className="group inline-flex items-center justify-between gap-4 px-8 py-5 border-2 border-navy-900/15 hover:border-navy-900 rounded-full font-display font-bold text-lg transition"
            >
              <span>הכירו את הקהילה</span>
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
