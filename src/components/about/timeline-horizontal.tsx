"use client";

import { useEffect, useRef, useState } from "react";
import { timeline } from "@/data/about";

export function TimelineHorizontal() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    // RTL: scrollLeft is 0 at start (right edge) and goes negative (or positive in some browsers) toward left edge.
    const maxScroll = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setCanRight(pos > 2);
    setCanLeft(pos < maxScroll - 2);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    // Drag-to-scroll with mouse
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDown = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      isDown = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const scrollByPage = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 600);
    // In RTL, "right" means going back to start (positive direction visually), "left" means forward.
    el.scrollBy({ left: dir === "left" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="bg-cream-mesh overflow-hidden">
      <div className="pt-24 lg:pt-32 px-6 lg:px-10 mx-auto max-w-[1400px]">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          המסע
        </p>
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
          <h2 className="font-display text-display font-black text-navy-900 leading-[0.95]">
            9 חודשים, נקודה אחר נקודה.
          </h2>
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollByPage("right")}
              disabled={!canRight}
              aria-label="הקודם"
              className="w-12 h-12 rounded-full border border-navy-900/15 bg-paper text-navy-900 flex items-center justify-center transition-all hover:bg-navy-900 hover:text-paper disabled:opacity-30 disabled:hover:bg-paper disabled:hover:text-navy-900 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByPage("left")}
              disabled={!canLeft}
              aria-label="הבא"
              className="w-12 h-12 rounded-full border border-navy-900/15 bg-paper text-navy-900 flex items-center justify-center transition-all hover:bg-navy-900 hover:text-paper disabled:opacity-30 disabled:hover:bg-paper disabled:hover:text-navy-900 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 lg:gap-10 px-6 lg:px-10 pb-24 lg:pb-32 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth cursor-grab select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ overscrollBehaviorX: "contain", overscrollBehaviorY: "auto" }}
      >
        {timeline.map((item, i) => (
          <article
            key={i}
            className="shrink-0 snap-start w-[78vw] sm:w-[420px] bg-paper rounded-3xl p-8 lg:p-10 border border-navy-900/8 shadow-[0_20px_60px_-30px_rgba(15,30,71,0.25)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-black text-2xl text-leaf-500">/{(i + 1).toString().padStart(2, "0")}</span>
              <span className="font-body text-sm uppercase tracking-[0.18em] text-navy-700/70 font-semibold">{item.date}</span>
            </div>
            <h3 className="font-display font-black text-4xl text-navy-900 leading-[0.95] mb-4">{item.title}</h3>
            <p className="font-body text-base text-ink/75 leading-relaxed">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
