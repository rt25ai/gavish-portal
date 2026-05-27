"use client";

import type Lenis from "lenis";

// Tiny module-level holder so non-provider components (e.g. a fullscreen
// lightbox) can pause/resume the global Lenis smooth-scroll instance without
// prop-drilling or context. Safe no-ops when Lenis isn't running
// (reduced-motion users, SSR).
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function stopLenis() {
  instance?.stop();
}

export function startLenis() {
  instance?.start();
}
