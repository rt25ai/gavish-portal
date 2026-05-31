"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/**
 * Subtle scroll-reveal for a section. Animates every `[data-reveal]` descendant
 * up + fade with a stagger when the section scrolls into view.
 * Respects prefers-reduced-motion (elements stay visible, no motion).
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      });
    }, ref);
    return () => {
      ctx.revert();
    };
  }, []);

  return ref;
}
