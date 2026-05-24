/**
 * Crystal/Gavish geometric mark — used as portal logotype.
 * Faceted shape that represents the program name "גביש" (crystal).
 */
export function CrystalMark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="גביש">
      <defs>
        <linearGradient id="cm-grad-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-navy-700)" />
          <stop offset="100%" stopColor="var(--color-navy-900)" />
        </linearGradient>
        <linearGradient id="cm-grad-2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-leaf-500)" />
          <stop offset="100%" stopColor="var(--color-navy-700)" />
        </linearGradient>
      </defs>
      <g className={animated ? "origin-center [animation:spin_30s_linear_infinite]" : ""}>
        <polygon points="32,4 56,22 48,52 16,52 8,22" fill="url(#cm-grad-1)" />
        <polygon points="32,4 56,22 32,32" fill="url(#cm-grad-2)" opacity="0.55" />
        <polygon points="32,32 56,22 48,52" fill="var(--color-leaf-500)" opacity="0.18" />
        <polygon points="32,32 16,52 8,22" fill="var(--color-leaf-500)" opacity="0.32" />
        <polygon points="32,4 8,22 32,32" fill="var(--color-paper)" opacity="0.08" />
        <polyline points="32,4 32,32 16,52" fill="none" stroke="var(--color-paper)" strokeOpacity="0.35" strokeWidth="0.5" />
        <polyline points="32,32 48,52" fill="none" stroke="var(--color-paper)" strokeOpacity="0.35" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
