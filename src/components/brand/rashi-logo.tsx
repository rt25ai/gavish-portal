export function RashiLogo({ className = "", monochrome = false }: { className?: string; monochrome?: boolean }) {
  const navy = monochrome ? "currentColor" : "var(--color-navy-900)";
  const leaf = monochrome ? "currentColor" : "var(--color-leaf-500)";
  return (
    <svg
      viewBox="0 0 220 90"
      className={className}
      role="img"
      aria-label="קרן רש״י — Rashi Foundation"
    >
      {/* Leaf cluster */}
      <g transform="translate(180 8)">
        <path d="M0 18 C6 4, 18 0, 28 4 C24 14, 14 22, 4 22 Z" fill={leaf} opacity="0.95" />
        <path d="M10 26 C16 12, 28 8, 38 12 C34 22, 24 30, 14 30 Z" fill={leaf} opacity="0.7" />
        <path d="M-6 26 C0 16, 12 12, 22 16 C18 26, 8 32, -2 32 Z" fill={leaf} opacity="0.85" />
      </g>
      {/* Hebrew wordmark "קרן רש"י" */}
      <text x="170" y="58" textAnchor="end" fontFamily="var(--font-display)" fontWeight="900" fontSize="34" fill={navy} letterSpacing="-0.04em">
        קרן רש״י
      </text>
      {/* Latin */}
      <text x="170" y="80" textAnchor="end" fontFamily="var(--font-body)" fontWeight="700" fontSize="11" fill={navy} letterSpacing="0.18em">
        RASHI FOUNDATION
      </text>
    </svg>
  );
}
