type Props = {
  size: number;
  background?: string;
  padding?: number;
};

/**
 * Static (server-rendered, no animation) version of the Gavish mark.
 * Used in opengraph/twitter images and icons. Pure SVG strings - no css classes.
 */
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
        viewBox="640 20 580 740"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g stroke="#2b79f5">
            <polygon
              points="891.43 576.75 915.85 459.46 741.47 508.3 662.4 743.62 797.71 690.4 891.43 576.75"
              strokeWidth="6"
            />
            <polyline
              points="662.4 743.62 854.74 525.68 918.36 455.82"
              strokeWidth="6"
            />
            <line x1="741.47" y1="508.3" x2="854.74" y2="525.68" strokeWidth="6" />
          </g>
          <g stroke="#2b79f5">
            <polygon
              points="1191.34 195.34 1201.74 88.37 953.37 224.68 918.36 459.16 1055.82 415.95 1191.34 195.34"
              strokeWidth="6"
            />
            <line x1="1201.74" y1="88.37" x2="1055.82" y2="415.95" strokeWidth="6" />
            <line x1="953.37" y1="224.68" x2="1055.82" y2="415.95" strokeWidth="6" />
          </g>
          <g stroke="#254590">
            <line x1="951.27" y1="538.36" x2="1064.28" y2="477.51" strokeWidth="6" />
            <polygon
              points="1042.55 601.39 1185.98 540.53 1064.28 477.51 917.02 461.17 951.27 538.36 1042.55 601.39"
              strokeWidth="6"
            />
          </g>
          <g stroke="#254590">
            <polygon
              points="861.26 143.79 680.88 33.43 679.53 332.26 774.07 436.58 918.07 457.48 901.21 335.52 861.26 143.79"
              strokeWidth="6"
            />
            <line x1="861.26" y1="143.79" x2="774.07" y2="436.58" strokeWidth="6" />
          </g>
        </g>
      </svg>
    </div>
  );
}
