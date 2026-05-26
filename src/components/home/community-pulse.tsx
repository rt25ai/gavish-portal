"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/motion";
import { UserAvatar } from "@/components/community/user-avatar";

export type PulseItem = {
  id: string;
  body: string;
  created_at: string;
  authorName: string;
  organization: string | null;
  avatarUrl: string | null;
};

export function CommunityPulse({
  items,
  href,
}: {
  items: PulseItem[];
  href: string;
}) {
  const [index, setIndex] = useState(0);
  const rootRef = useRef<HTMLAnchorElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const hoverRef = useRef(false);

  // Entry animation
  useEffect(() => {
    registerGsap();
    if (!rootRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.set(rootRef.current, { autoAlpha: 0, y: 24 });
      gsap.to(rootRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: reduced ? 0.3 : 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (items.length < 2) return;
    if (prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      if (hoverRef.current) return;
      setIndex((i) => (i + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [items.length]);

  // Slide fade-in on index change
  useEffect(() => {
    if (!slideRef.current) return;
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      slideRef.current,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  }, [index]);

  // Progress ring on the active dot
  useEffect(() => {
    if (!ringRef.current) return;
    if (prefersReducedMotion()) return;
    if (items.length < 2) return;
    gsap.fromTo(
      ringRef.current,
      { strokeDashoffset: 88 },
      { strokeDashoffset: 0, duration: 5, ease: "none" },
    );
  }, [index, items.length]);

  if (items.length === 0) return null;

  const current = items[index];
  const meta = current.organization
    ? `${current.organization} · ${formatRelative(current.created_at)}`
    : formatRelative(current.created_at);

  return (
    <Link
      ref={rootRef}
      href={href}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
      className="group relative block max-w-2xl mx-auto rounded-[24px] bg-paper border border-navy-900/8 shadow-[0_30px_60px_-30px_rgba(15,30,71,0.25)] overflow-hidden transition-shadow hover:shadow-[0_40px_80px_-30px_rgba(15,30,71,0.4)]"
    >
      {/* gavish crystal gradient strip */}
      <div className="h-1 bg-gradient-to-l from-leaf-500 via-topic-amber to-topic-coral" />

      <div className="p-6 lg:p-7">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-leaf-500 opacity-75 [animation:ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <span className="relative rounded-full size-2.5 bg-leaf-500" />
            </span>
            <span className="font-body text-[11px] tracking-[0.22em] uppercase text-navy-700 font-bold">
              עדכוני קהילה · Live
            </span>
          </div>

          <span className="flex items-center gap-1.5 font-body text-[13px] font-semibold text-navy-900 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <span>פתח את הפיד</span>
            <ArrowLeft className="size-4" />
          </span>
        </div>

        {/* Slide */}
        <div ref={slideRef}>
          <div className="flex items-center gap-3 mb-3">
            <UserAvatar
              name={current.authorName}
              avatarUrl={current.avatarUrl}
              size="md"
            />
            <div className="min-w-0">
              <p className="font-display font-bold text-navy-900 text-[15px] leading-tight truncate">
                {current.authorName}
              </p>
              <p className="font-body text-[12px] text-ink/55 truncate">{meta}</p>
            </div>
          </div>

          <p className="font-body text-[15px] text-ink/85 leading-[1.55] line-clamp-2 whitespace-pre-wrap">
            {current.body}
          </p>
        </div>

        {/* Dots */}
        {items.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {items.map((it, i) => {
              const active = i === index;
              return (
                <button
                  key={it.id}
                  type="button"
                  aria-label={`עדכון ${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className="relative size-7 grid place-items-center group/dot"
                >
                  <span
                    className={`block rounded-full transition-all ${active ? "size-2.5 bg-navy-900" : "size-1.5 bg-navy-900/25 group-hover/dot:bg-navy-900/50"}`}
                  />
                  {active && (
                    <svg className="absolute inset-0 size-7 -rotate-90" viewBox="0 0 32 32">
                      <circle
                        ref={ringRef}
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-leaf-500"
                        strokeDasharray="88"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const diffMin = Math.floor((Date.now() - d.getTime()) / 60000);
  if (diffMin < 1) return "עכשיו";
  if (diffMin < 60) return `לפני ${diffMin} ד׳`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `לפני ${diffHr} שע׳`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `לפני ${diffDay} ימים`;
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long" });
}
