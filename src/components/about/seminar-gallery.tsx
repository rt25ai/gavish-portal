"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { startLenis, stopLenis } from "@/lib/lenis-store";
import { seminarPhotos } from "./seminar-gallery.data";

export function SeminarGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* ---------- RTL-aware arrow availability ---------- */
  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setCanRight(pos > 2);
    setCanLeft(pos < maxScroll - 2);
  }, []);

  /* ---------- Drag-to-scroll + entrance reveal ---------- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      isDown = false;
      el.style.cursor = "";
    };
    // Swallow the click that ends a drag so it doesn't open the lightbox.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClickCapture, true);

    let ctx: gsap.Context | undefined;
    if (!prefersReducedMotion() && sectionRef.current) {
      registerGsap();
      ctx = gsap.context(() => {
        gsap.from(el.querySelectorAll("[data-gallery-card]"), {
          autoAlpha: 0,
          y: 48,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }, sectionRef);
    }

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClickCapture, true);
      ctx?.revert();
      ScrollTrigger.refresh();
    };
  }, [updateArrows]);

  const scrollByPage = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 640);
    el.scrollBy({ left: dir === "left" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="bg-paper-mesh overflow-hidden">
      <div className="pt-24 lg:pt-32 px-6 lg:px-10 mx-auto max-w-[1400px]">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          גלריה · סמינר הפתיחה
        </p>
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
          <h2 className="font-display text-display font-black text-navy-900 leading-[0.95]">
            איך זה נראה<br />
            <span className="outline-text">כשהקהילה נפגשת.</span>
          </h2>
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollByPage("right")}
              disabled={!canRight}
              aria-label="הקודם"
              className="w-12 h-12 rounded-full border border-navy-900/15 bg-paper text-navy-900 flex items-center justify-center transition-all hover:bg-navy-900 hover:text-paper disabled:opacity-30 disabled:hover:bg-paper disabled:hover:text-navy-900 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage("left")}
              disabled={!canLeft}
              aria-label="הבא"
              className="w-12 h-12 rounded-full border border-navy-900/15 bg-paper text-navy-900 flex items-center justify-center transition-all hover:bg-navy-900 hover:text-paper disabled:opacity-30 disabled:hover:bg-paper disabled:hover:text-navy-900 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 lg:gap-7 px-6 lg:px-10 pb-24 lg:pb-32 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth cursor-grab select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ overscrollBehaviorX: "contain", overscrollBehaviorY: "auto" }}
      >
        {seminarPhotos.map((photo, i) => (
          <button
            key={photo.id}
            data-gallery-card
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`הגדלת תמונה ${i + 1} מתוך ${seminarPhotos.length} מסמינר הפתיחה`}
            className="group relative shrink-0 snap-start w-[80vw] sm:w-[460px] lg:w-[520px] aspect-[3/2] rounded-3xl overflow-hidden border border-navy-900/8 bg-cream shadow-[0_20px_60px_-30px_rgba(15,30,71,0.4)] cursor-zoom-in focus-visible:outline-none"
          >
            <img
              src={photo.thumb}
              width={photo.width}
              height={photo.height}
              alt={`רגע מסמינר הפתיחה של תוכנית גביש - תמונה ${i + 1}`}
              loading={i < 3 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            {/* Hover veil */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/0 to-navy-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            {/* Zoom affordance */}
            <span
              aria-hidden
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-paper/95 backdrop-blur px-3.5 py-2 text-navy-900 text-sm font-body font-semibold translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"
            >
              <ZoomIn className="w-4 h-4" strokeWidth={2.2} />
              הגדלה
            </span>
            {/* Index chip */}
            <span
              aria-hidden
              className="absolute top-4 right-4 font-display font-black text-sm text-paper/90 tabular bg-navy-950/30 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center"
            >
              {photo.id}
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}

/* ============================================================= */
/* Lightbox                                                       */
/* ============================================================= */
function Lightbox({
  index,
  onClose,
  onIndexChange,
}: {
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const total = seminarPhotos.length;
  const isOpen = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + total) % total);
    },
    [index, total, onIndexChange]
  );

  /* Scroll-lock + Lenis pause + focus management while open */
  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
    stopLenis();
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      startLenis();
      window.clearTimeout(t);
      triggerRef.current?.focus?.();
    };
  }, [isOpen]);

  /* Keyboard navigation (RTL: → previous, ← next) */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(-1);
      else if (e.key === "ArrowLeft") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go, onClose]);

  /* Preload neighbours for snappy navigation */
  useEffect(() => {
    if (index === null) return;
    [(index + 1) % total, (index - 1 + total) % total].forEach((n) => {
      const img = new Image();
      img.src = seminarPhotos[n].full;
    });
  }, [index, total]);

  /* Entrance + per-image transition */
  useEffect(() => {
    if (index === null || prefersReducedMotion()) return;
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { autoAlpha: 0, scale: 0.96 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [index]);

  /* Touch swipe */
  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -50) go(1);
    else if (dx > 50) go(-1);
  };

  if (index === null) return null;
  const photo = seminarPhotos[index];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`תמונה ${index + 1} מתוך ${total} מסמינר הפתיחה`}
      data-lenis-prevent
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-navy-950/92 backdrop-blur-md animate-[fadeIn_0.25s_ease-out] p-4 sm:p-8"
    >
      {/* Close */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="סגירה"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 w-12 h-12 rounded-full bg-paper/10 hover:bg-paper/20 text-paper flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        <X className="w-6 h-6" strokeWidth={2.2} />
      </button>

      {/* Counter */}
      <div
        dir="ltr"
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 font-display font-black text-paper/90 tabular text-lg select-none"
      >
        {index + 1}
        <span className="text-paper/40"> / {total}</span>
      </div>

      {/* Previous (RTL: right side) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="התמונה הקודמת"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-paper/10 hover:bg-paper/20 text-paper flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="w-7 h-7" strokeWidth={2.2} />
      </button>

      {/* Next (RTL: left side) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="התמונה הבאה"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-paper/10 hover:bg-paper/20 text-paper flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="w-7 h-7" strokeWidth={2.2} />
      </button>

      {/* Image */}
      <figure className="relative max-w-[92vw] max-h-[82vh] sm:max-h-[86vh]" onClick={(e) => e.stopPropagation()}>
        <img
          ref={imgRef}
          key={photo.id}
          src={photo.full}
          width={photo.width}
          height={photo.height}
          alt={`רגע מסמינר הפתיחה של תוכנית גביש - תמונה ${index + 1}`}
          draggable={false}
          className="max-w-[92vw] max-h-[82vh] sm:max-h-[86vh] w-auto h-auto object-contain rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]"
        />
      </figure>

      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>,
    document.body
  );
}
