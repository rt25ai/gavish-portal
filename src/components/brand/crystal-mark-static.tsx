type Props = {
  size: number;
  background?: string;
  padding?: number;
};

export function CrystalMarkStatic({ size, background, padding = 0 }: Props) {
  const inner = size - padding * 2;
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: background ?? "transparent",
      }}
    >
      <svg
        width={inner}
        height={inner}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cm-grad-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#142048" />
            <stop offset="100%" stopColor="#0f1e47" />
          </linearGradient>
          <linearGradient id="cm-grad-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6fb94a" />
            <stop offset="100%" stopColor="#142048" />
          </linearGradient>
        </defs>
        <polygon points="32,4 56,22 48,52 16,52 8,22" fill="url(#cm-grad-1)" />
        <polygon
          points="32,4 56,22 32,32"
          fill="url(#cm-grad-2)"
          opacity="0.55"
        />
        <polygon points="32,32 56,22 48,52" fill="#6fb94a" opacity="0.18" />
        <polygon points="32,32 16,52 8,22" fill="#6fb94a" opacity="0.32" />
        <polygon points="32,4 8,22 32,32" fill="#f4f7ec" opacity="0.08" />
        <polyline
          points="32,4 32,32 16,52"
          fill="none"
          stroke="#f4f7ec"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />
        <polyline
          points="32,32 48,52"
          fill="none"
          stroke="#f4f7ec"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
