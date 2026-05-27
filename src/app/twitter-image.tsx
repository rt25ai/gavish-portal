import { ImageResponse } from "next/og";
import { CrystalMarkStatic } from "@/components/brand/crystal-mark-static";

export const alt = "גביש - קהילה מקצועית לומדת למנהלי מחלקות הנוער";
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
            "radial-gradient(ellipse 70% 60% at 30% 25%, rgba(43,121,245,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(37,69,144,0.12), transparent 60%), linear-gradient(135deg, #f4f7ec 0%, #ebefdc 60%, #dde3ca 100%)",
        }}
      >
        <CrystalMarkStatic size={520} />
      </div>
    ),
    { ...size },
  );
}
