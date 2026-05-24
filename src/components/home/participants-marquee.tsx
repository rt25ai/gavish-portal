"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/motion";
import { participants } from "@/lib/content";

const row1 = participants.slice(0, 9);
const row2 = participants.slice(9);

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-paper rounded-full border border-navy-900/8 whitespace-nowrap">
      <div className="size-9 rounded-full bg-navy-900 text-paper grid place-items-center font-display font-bold text-xs">
        {initials}
      </div>
      <span className="font-display font-bold text-sm">{name}</span>
    </div>
  );
}

export function ParticipantsMarquee() {
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (r1.current) gsap.to(r1.current, { xPercent: -50, duration: 60, repeat: -1, ease: "none" });
      if (r2.current) gsap.to(r2.current, { xPercent: 50, duration: 60, repeat: -1, ease: "none" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-cream-mesh py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 gap-8 flex-wrap">
          <div className="max-w-2xl">
            <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
              18 רשויות · 18 מובילים
            </p>
            <h2 className="font-display text-display font-black text-navy-900 leading-[0.95]">
              הקהילה<br />
              <span className="outline-text">שלנו.</span>
            </h2>
          </div>
          <Link
            href="/community"
            className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-navy-900 hover:bg-navy-900 hover:text-paper rounded-full font-display font-bold transition"
          >
            הכירו את כולם
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div ref={r1} className="flex gap-4 will-change-transform">
            {[...row1, ...row1].map((p, i) => (<Avatar key={`r1-${i}`} name={p.name} />))}
          </div>
        </div>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div ref={r2} className="flex gap-4 will-change-transform" style={{ transform: "translateX(-50%)" }}>
            {[...row2, ...row2].map((p, i) => (<Avatar key={`r2-${i}`} name={p.name} />))}
          </div>
        </div>
      </div>
    </section>
  );
}
