"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/**
 * Floating "חינוך לחיים" (Rashi Foundation) medallion for the About hero row.
 * A white rounded medallion sits over a slowly rotating colour halo (the
 * "special effect"); GSAP plays a back-eased entrance, then a gentle, endless
 * bob + tilt. Motion is skipped entirely for reduced-motion users.
 */
export function ChinuchLachaimBadge({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const card = rootRef.current!.querySelector("[data-medallion]");
      if (!card) return;
      gsap.from(card, {
        scrollTrigger: { trigger: rootRef.current, start: "top 90%" },
        autoAlpha: 0,
        scale: 0.6,
        rotate: -12,
        y: 26,
        duration: 1.1,
        ease: "back.out(1.5)",
        onComplete: () => {
          gsap.to(card, {
            keyframes: [
              { y: -14, rotate: 2.4, duration: 3.4 },
              { y: 0, rotate: 0, duration: 3.4 },
            ],
            ease: "sine.inOut",
            repeat: -1,
          });
        },
      });
    }, rootRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative w-fit ${className}`}>
      {/* ambient glow bed */}
      <div aria-hidden className="absolute -inset-8 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-leaf-500/20 blur-3xl rounded-full" />
        <div className="absolute inset-8 bg-topic-teal/15 blur-2xl rounded-full" />
      </div>

      <div data-medallion className="group relative will-change-transform">
        {/* rotating colour halo behind the badge — glows through its transparent edges */}
        <div
          aria-hidden
          className="absolute inset-2 rounded-full opacity-45 blur-xl [animation:spin_18s_linear_infinite] [background:conic-gradient(from_0deg,var(--color-leaf-500),transparent_110deg,var(--color-topic-teal),transparent_220deg,var(--color-gavish-navy),transparent_330deg,var(--color-leaf-500))]"
        />
        {/* transparent logo, floating free */}
        <Image
          src="/logos/chinuch-lachaim.png"
          alt="חינוך לחיים - קרן רש״י"
          width={269}
          height={258}
          priority
          className="relative w-44 lg:w-52 h-auto object-contain select-none drop-shadow-[0_22px_36px_rgba(15,30,71,0.28)] transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
    </div>
  );
}
