import { ImageResponse } from "next/og";
import { CrystalMarkStatic } from "@/components/brand/crystal-mark-static";

const SIZE = 512;

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    <CrystalMarkStatic size={SIZE} background="#f4f7ec" />,
    { width: SIZE, height: SIZE },
  );
}
