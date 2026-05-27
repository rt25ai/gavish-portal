import Image from "next/image";
import { cn } from "@/lib/cn";

export function IgudLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logos/igud.svg"
      alt="איגוד מנהלי מחלקות הנוער ברשויות המקומיות"
      width={400}
      height={400}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
