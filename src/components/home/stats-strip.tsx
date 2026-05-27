"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";
import { stats } from "@/lib/content";

function formatValue(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1000) return Math.round(v / 1000) + "K";
  return v.toString();
}

function Counter({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    if (reduced) {
      el.textContent = formatValue(value);
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => { if (el) el.textContent = formatValue(obj.n); },
      });
    });
    return () => ctx.revert();
  }, [value]);
  return (
    <span className="tabular">
      {prefix}<span ref={ref}>0</span>{suffix}
    </span>
  );
}

export function StatsStrip() {
  const featured = stats.slice(0, 3);
  return (
    <section className="bg-navy-900 text-paper py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-crystal opacity-60" />
      {/* signature stripes - brand pattern */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-stripes-soft opacity-30 pointer-events-none [mask-image:linear-gradient(90deg,black,transparent)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-leaf-300/80 font-semibold mb-4">
            נתוני זהב · 2026
          </p>
          <h2 className="font-display text-display font-black leading-[0.95]">
            נוער בישראל,<br />במספרים.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-12">
          {featured.map((s) => (
            <div key={s.label} className="border-t border-paper/20 pt-6">
              <p className="font-display font-black text-6xl lg:text-8xl text-paper leading-none mb-4">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="font-body text-lg text-paper/85 mb-2">{s.label}</p>
              <p className="font-body text-xs text-paper/40 uppercase tracking-wider">{s.source}</p>
            </div>
          ))}
        </div>

        <Link
          href="/data"
          className="group inline-flex items-center gap-3 px-7 py-4 bg-leaf-500 text-paper hover:bg-leaf-700 rounded-full font-display font-bold text-lg transition"
        >
          לנתוני הזהב המלאים
          <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
