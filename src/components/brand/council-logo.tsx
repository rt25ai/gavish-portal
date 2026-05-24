import Image from "next/image";
import { cn } from "@/lib/cn";

export function CouncilLogo({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Image
      src="/logos/council.png"
      alt="מועצת ארגוני הילדים והנוער - The Israeli Council for Youth Organizations"
      width={920}
      height={671}
      className={cn("h-auto w-auto object-contain", invert && "brightness-0 invert", className)}
    />
  );
}
