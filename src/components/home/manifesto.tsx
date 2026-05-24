"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";

const lines = [
  { weight: "font-light", text: "אנחנו מאמינים ש—" },
  { weight: "font-black", text: "מנהלי מחלקות נוער", color: true },
  { weight: "font-light", text: "הם נושאי הדגל השקטים" },
  { weight: "font-black", text: "של החברה הישראלית.", color: true },
  { weight: "font-light", text: "תוכנית גביש נוסדה כדי" },
  { weight: "font-black", text: "להאיר את המקצוע,", color: true },
  { weight: "font-light", text: "לחבר בין המובילות והמובילים" },
  { weight: "font-light", text: "וליצור" },
  { weight: "font-black", text: "תשתית של ידע חי", color: true },
  { weight: "font-light", text: "שמשתפת, מעצימה וצומחת —" },
  { weight: "font-black", text: "ביחד.", color: true },
];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-paper py-32 lg:py-44">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-display text-display lg:text-[6rem] leading-[1.05] tracking-tight">
          {lines.map((l, i) => (
            <span
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={`inline-block mx-[0.18em] ${l.weight} ${l.color ? "text-navy-900" : "text-ink/70"}`}
            >
              {l.text}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
