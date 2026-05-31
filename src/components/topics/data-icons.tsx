/**
 * Hand-drawn line illustrations for the data-driven topic infographics.
 * Same language as components/home/topic-illustrations.tsx:
 * thin 1.6 stroke, currentColor, viewBox 0 0 64 64, airy + minimal.
 */
type Props = { className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ============ Flow stages ============ */

// נתוני זהב - stacked data layers + star
export function IllGoldenData({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="נתוני זהב">
      <g {...common}>
        <ellipse cx="26" cy="16" rx="14" ry="5" />
        <path d="M12 16v14c0 2.8 6.3 5 14 5s14-2.2 14-5V16" />
        <path d="M12 23c0 2.8 6.3 5 14 5s14-2.2 14-5" />
        <path d="M49 40l2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5-3.6-3.5 5-.7z" />
      </g>
    </svg>
  );
}

// השוואה רב-מימדית - central node with radiating comparison points
export function IllCompare({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="השוואה רב-מימדית">
      <g {...common}>
        <line x1="32" y1="32" x2="32" y2="12" strokeDasharray="2 3" opacity="0.7" />
        <line x1="32" y1="32" x2="50" y2="22" strokeDasharray="2 3" opacity="0.7" />
        <line x1="32" y1="32" x2="50" y2="44" strokeDasharray="2 3" opacity="0.7" />
        <line x1="32" y1="32" x2="14" y2="44" strokeDasharray="2 3" opacity="0.7" />
        <line x1="32" y1="32" x2="14" y2="22" strokeDasharray="2 3" opacity="0.7" />
        <circle cx="32" cy="32" r="6" fill="var(--card-surface, transparent)" />
        <circle cx="32" cy="10" r="3.5" />
        <circle cx="52" cy="21" r="3.5" />
        <circle cx="52" cy="45" r="3.5" />
        <circle cx="12" cy="45" r="3.5" />
        <circle cx="12" cy="21" r="3.5" />
      </g>
    </svg>
  );
}

// מתרגמים נתון לפעולה - percent to a rising arrow
export function IllTranslate({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="מתרגמים נתון לפעולה">
      <g {...common}>
        <circle cx="16" cy="18" r="3.2" />
        <circle cx="26" cy="28" r="3.2" />
        <line x1="14" y1="30" x2="28" y2="16" />
        <line x1="10" y1="52" x2="54" y2="52" />
        <polyline points="14,46 26,40 38,30 52,18" />
        <polyline points="44,18 52,18 52,26" />
      </g>
    </svg>
  );
}

// התוצאה - impact burst / radiating spark
export function IllResult({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="התוצאה">
      <g {...common}>
        <path d="M32 14l3.2 9.6L45 27l-9.8 3.4L32 40l-3.2-9.6L19 27l9.8-3.4z" />
        <line x1="32" y1="46" x2="32" y2="52" opacity="0.8" />
        <line x1="20" y1="44" x2="17" y2="49" opacity="0.8" />
        <line x1="44" y1="44" x2="47" y2="49" opacity="0.8" />
      </g>
    </svg>
  );
}

/* ============ 9 principles ============ */

// 01 עבודה מתמשכת - cycle arrows
export function IllOngoing({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <path d="M48 24a18 18 0 1 0 3 14" />
        <polyline points="48,14 49,24 39,25" />
      </g>
    </svg>
  );
}

// 02 מאחורי כל מספר סיפור - magnifier over bars
export function IllStory({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <line x1="12" y1="46" x2="40" y2="46" />
        <rect x="15" y="36" width="6" height="10" rx="1.2" />
        <rect x="25" y="30" width="6" height="16" rx="1.2" />
        <circle cx="40" cy="26" r="10" />
        <line x1="47" y1="33" x2="54" y2="40" />
      </g>
    </svg>
  );
}

// 03 תעדוף ומיקוד - target
export function IllFocus({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <circle cx="32" cy="32" r="18" />
        <circle cx="32" cy="32" r="11" />
        <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

// 04 מדידה לאורך כל השנה - continuous wave over a baseline
export function IllYearRound({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <rect x="12" y="16" width="40" height="34" rx="3" />
        <line x1="12" y1="26" x2="52" y2="26" />
        <line x1="22" y1="12" x2="22" y2="20" />
        <line x1="42" y1="12" x2="42" y2="20" />
        <path d="M17 40c4 0 5-6 9-6s5 6 9 6 5-6 9-6" />
      </g>
    </svg>
  );
}

// 05 משאב משותף - shared nodes
export function IllShared({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <circle cx="32" cy="18" r="5" />
        <circle cx="16" cy="42" r="5" />
        <circle cx="48" cy="42" r="5" />
        <line x1="29" y1="22" x2="19" y2="38" opacity="0.7" />
        <line x1="35" y1="22" x2="45" y2="38" opacity="0.7" />
        <line x1="21" y1="42" x2="43" y2="42" opacity="0.7" />
      </g>
    </svg>
  );
}

// 06 התמדה - hourglass
export function IllPersistence({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <line x1="20" y1="14" x2="44" y2="14" />
        <line x1="20" y1="50" x2="44" y2="50" />
        <path d="M22 14c0 10 10 12 10 18s-10 8-10 18" />
        <path d="M42 14c0 10-10 12-10 18s10 8 10 18" />
        <path d="M27 44c2-3 8-3 10 0" />
      </g>
    </svg>
  );
}

// 07 יחסי אמון - linked hands / bond
export function IllTrust({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <path d="M10 28h10l6 6" />
        <path d="M54 28H44l-6 6" />
        <path d="M26 34c3 3 6 3 9 0" />
        <circle cx="32" cy="20" r="5" />
        <path d="M24 30c0-3 3-5 8-5s8 2 8 5" />
      </g>
    </svg>
  );
}

// 08 שימוש מול הנהלה - presentation board with bar + arrow
export function IllManagement({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <rect x="12" y="12" width="40" height="28" rx="2.5" />
        <line x1="32" y1="40" x2="32" y2="48" />
        <line x1="26" y1="52" x2="38" y2="52" />
        <polyline points="19,32 26,26 32,30 45,19" />
        <polyline points="39,19 45,19 45,25" />
      </g>
    </svg>
  );
}

// 09 מנגנוני עבודה - gear
export function IllMechanisms({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden>
      <g {...common}>
        <path d="M32 14v-5M32 55v-5M50 32h5M9 32h5M44.7 19.3l3.5-3.5M15.8 48.2l3.5-3.5M44.7 44.7l3.5 3.5M15.8 15.8l3.5 3.5" />
        <circle cx="32" cy="32" r="13" />
        <circle cx="32" cy="32" r="5" />
      </g>
    </svg>
  );
}
