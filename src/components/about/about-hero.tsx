"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, splitText } from "@/lib/motion";

export function AboutHero() {
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGsap();
    if (!headRef.current || prefersReducedMotion()) return;
    const words = splitText(headRef.current, "words");
    const ctx = gsap.context(() => {
      gsap.from(words, { autoAlpha: 0, yPercent: 100, duration: 1.1, stagger: 0.08, ease: "power4.out" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-paper pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-1/4 w-[40vmin] h-[40vmin] bg-topic-amber/15 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 left-1/4 w-[50vmin] h-[50vmin] bg-leaf-500/15 blur-3xl rounded-full" />
      </div>
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-6">
          על התוכנית
        </p>
        <h1 ref={headRef} className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
          מה זה גביש?
        </h1>
        <p className="mt-12 font-body text-xl lg:text-2xl text-ink/85 max-w-3xl leading-relaxed">
          גביש היא תוכנית פיתוח מקצועית לדרג הבכיר במחלקות הנוער ברשויות בישראל, יוזמה של{" "}
          <strong className="text-navy-900">קרן רש״י</strong> בשיתוף{" "}
          <strong className="text-navy-900">מועצת ארגוני הילדים והנוער</strong>. במחזור הראשון: 18 מנהלות ומנהלים, 9 חודשי לימוד, 4 צוותי מחקר, ומסע אחד משותף.
        </p>
      </div>
    </section>
  );
}
