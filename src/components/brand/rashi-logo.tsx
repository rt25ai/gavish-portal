import Image from "next/image";
import { cn } from "@/lib/cn";

export function RashiLogo({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Image
      src="/logos/rashi.png"
      alt="קרן רש״י - Rashi Foundation"
      width={528}
      height={264}
      className={cn("h-auto w-auto object-contain", invert && "brightness-0 invert", className)}
      priority
    />
  );
}
