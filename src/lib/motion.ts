"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Flip, Observer);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Splits text into char/word spans for stagger animation.
 * Lightweight alternative to GSAP's paid SplitText plugin.
 */
export function splitText(el: HTMLElement, type: "chars" | "words" = "chars") {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.textContent = "";

  if (type === "words") {
    const words = text.split(/(\s+)/);
    const spans: HTMLSpanElement[] = [];
    words.forEach((word) => {
      if (/\s+/.test(word)) {
        el.appendChild(document.createTextNode(word));
      } else {
        const span = document.createElement("span");
        span.className = "inline-block will-change-transform";
        span.setAttribute("aria-hidden", "true");
        span.textContent = word;
        el.appendChild(span);
        spans.push(span);
      }
    });
    return spans;
  }

  // chars
  const spans: HTMLSpanElement[] = [];
  for (const ch of Array.from(text)) {
    if (ch === " ") {
      el.appendChild(document.createTextNode(" "));
      continue;
    }
    const span = document.createElement("span");
    span.className = "inline-block will-change-transform";
    span.setAttribute("aria-hidden", "true");
    span.textContent = ch;
    el.appendChild(span);
    spans.push(span);
  }
  return spans;
}

export { gsap, ScrollTrigger, Flip, Observer };
