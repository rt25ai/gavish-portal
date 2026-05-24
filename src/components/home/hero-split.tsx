"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap, prefersReducedMotion, registerGsap, splitText } from "@/lib/motion";
import { CrystalMark } from "@/components/brand/crystal-mark";

export function HeroSplit() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!wordRef.current) return;
    const reduced = prefersReducedMotion();

    const chars = splitText(wordRef.current, "chars");

    const ctx = gsap.context(() => {
      gsap.set([tagRef.current, subRef.current, ctaRef.current], { autoAlpha: 0, y: 24 });
      gsap.set(chars, { autoAlpha: 0, yPercent: 110, rotateX: -45 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(tagRef.current, { autoAlpha: 1, y: 0, duration: 0.7 })
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
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-paper">
      {/* Crystal facet decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[60vmin] h-[60vmin] bg-leaf-500/8 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[70vmin] h-[70vmin] bg-navy-900/10 blur-3xl rounded-full" />
        <CrystalMark className="absolute top-24 left-8 size-32 opacity-30 hidden lg:block" />
        <CrystalMark className="absolute bottom-24 right-12 size-44 opacity-20 hidden lg:block" />
      </div>

      <div className="relative w-full mx-auto max-w-[1400px] px-6 lg:px-10 pb-16 lg:pb-24 pt-32">
        <div ref={tagRef} className="flex items-center gap-3 mb-10">
          <span className="size-2 rounded-full bg-leaf-500 [animation:pulse_2s_ease-in-out_infinite]" />
          <span className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/80 font-semibold">
            תוכנית קרן רש״י · מחזור א׳ · 2026
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
              <span>גלו את 4 תחומי המחקר</span>
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
