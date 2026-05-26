import { ImageResponse } from "next/og";
import { CrystalMarkStatic } from "@/components/brand/crystal-mark-static";

const SIZE = 512;
const PADDING = 102;

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    <CrystalMarkStatic size={SIZE} background="#0f1e47" padding={PADDING} />,
    { width: SIZE, height: SIZE },
  );
}
