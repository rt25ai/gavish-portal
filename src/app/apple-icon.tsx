import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
            "linear-gradient(135deg, #f4f7ec 0%, #ebefdc 60%, #dde3ca 100%)",
        }}
      >
        <svg
          width="148"
          height="148"
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
          <polygon points="32,4 56,22 32,32" fill="url(#cm-grad-2)" opacity="0.55" />
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
    ),
    { ...size },
  );
}
