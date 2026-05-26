import { ImageResponse } from "next/og";

export const alt = "גביש - קהילת מנהלי הנוער של קרן רש״י";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 70% 60% at 30% 25%, rgba(111,185,74,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(111,185,74,0.10), transparent 60%), linear-gradient(135deg, #0f1e47 0%, #142048 55%, #07112d 100%)",
        }}
      >
        <svg
          width="520"
          height="520"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cm-grad-1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1b2c5c" />
              <stop offset="100%" stopColor="#0f1e47" />
            </linearGradient>
            <linearGradient id="cm-grad-2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93cf6f" />
              <stop offset="100%" stopColor="#1b2c5c" />
            </linearGradient>
          </defs>
          <polygon
            points="32,4 56,22 48,52 16,52 8,22"
            fill="url(#cm-grad-1)"
            stroke="#6fb94a"
            strokeOpacity="0.45"
            strokeWidth="0.4"
          />
          <polygon
            points="32,4 56,22 32,32"
            fill="url(#cm-grad-2)"
            opacity="0.7"
          />
          <polygon points="32,32 56,22 48,52" fill="#6fb94a" opacity="0.25" />
          <polygon points="32,32 16,52 8,22" fill="#6fb94a" opacity="0.42" />
          <polygon points="32,4 8,22 32,32" fill="#f4f7ec" opacity="0.12" />
          <polyline
            points="32,4 32,32 16,52"
            fill="none"
            stroke="#f4f7ec"
            strokeOpacity="0.5"
            strokeWidth="0.4"
          />
          <polyline
            points="32,32 48,52"
            fill="none"
            stroke="#f4f7ec"
            strokeOpacity="0.5"
            strokeWidth="0.4"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
