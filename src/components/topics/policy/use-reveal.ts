"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Subtle scroll-reveal for a section. Animates every `[data-reveal]` descendant
 * up + fade as it enters the viewport, using IntersectionObserver.
 *
 * IntersectionObserver (not GSAP ScrollTrigger) is used on purpose: ScrollTrigger
 * caches absolute scroll positions and desyncs from Lenis smooth-scroll on long
 * pages, which left content stuck at opacity:0. IO reacts to real layout
 * intersection and is immune to that. Respects prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    // Reduced motion (or no IO support): leave everything visible, no animation.
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;

    gsap.set(els, { opacity: 0, y: 28 });

    const io = new IntersectionObserver(
      (entries, obs) => {
        const shown = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        if (!shown.length) return;
        // preserve document order so the stagger reads top-to-bottom
        shown.sort((a, b) => els.indexOf(a) - els.indexOf(b));
        gsap.to(shown, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 });
        shown.forEach((el) => obs.unobserve(el));
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}
