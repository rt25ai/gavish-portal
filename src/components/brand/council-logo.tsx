export function CouncilLogo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <svg
      viewBox="0 0 280 120"
      className={className}
      role="img"
      aria-label="מועצת ארגוני הילדים והנוער"
    >
      {/* Lotus petals - 7 colors from the actual logo */}
      <g transform="translate(140 50)">
        {/* center petal (top - yellow) */}
        <path d="M0 -38 C-14 -38, -22 -22, -16 -4 C-8 -2, 8 -2, 16 -4 C22 -22, 14 -38, 0 -38 Z" fill="#FBC02D" opacity="0.95" />
        {/* upper-right (orange) */}
        <g transform="rotate(28)">
          <path d="M0 -38 C-14 -38, -22 -22, -16 -4 C-8 -2, 8 -2, 16 -4 C22 -22, 14 -38, 0 -38 Z" fill="#F57C00" opacity="0.85" />
        </g>
        {/* upper-left (orange/red) */}
        <g transform="rotate(-28)">
          <path d="M0 -38 C-14 -38, -22 -22, -16 -4 C-8 -2, 8 -2, 16 -4 C22 -22, 14 -38, 0 -38 Z" fill="#E53935" opacity="0.85" />
        </g>
        {/* right (red-pink) */}
        <g transform="rotate(58)">
          <path d="M0 -38 C-14 -38, -22 -22, -16 -4 C-8 -2, 8 -2, 16 -4 C22 -22, 14 -38, 0 -38 Z" fill="#C62828" opacity="0.85" />
        </g>
        {/* left (green) */}
        <g transform="rotate(-58)">
          <path d="M0 -38 C-14 -38, -22 -22, -16 -4 C-8 -2, 8 -2, 16 -4 C22 -22, 14 -38, 0 -38 Z" fill="#388E3C" opacity="0.85" />
        </g>
        {/* far-right (blue) */}
        <g transform="rotate(85)">
          <path d="M0 -38 C-14 -38, -22 -22, -16 -4 C-8 -2, 8 -2, 16 -4 C22 -22, 14 -38, 0 -38 Z" fill="#1976D2" opacity="0.8" />
        </g>
        {/* far-left (teal) */}
        <g transform="rotate(-85)">
          <path d="M0 -38 C-14 -38, -22 -22, -16 -4 C-8 -2, 8 -2, 16 -4 C22 -22, 14 -38, 0 -38 Z" fill="#00838F" opacity="0.8" />
        </g>
      </g>
      {showText && (
        <>
          <text x="140" y="92" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="14" fill="#222" letterSpacing="-0.02em">
            מועצת ארגוני הילדים והנוער
          </text>
          <text x="140" y="108" textAnchor="middle" fontFamily="var(--font-body)" fontWeight="500" fontSize="9" fill="#555" letterSpacing="0.05em">
            The Israeli Council for Youth Organizations
          </text>
        </>
      )}
    </svg>
  );
}
