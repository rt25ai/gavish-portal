import Image from "next/image";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

const SIZE_MAP: Record<Size, { box: string; text: string; px: number }> = {
  sm: { box: "size-8", text: "text-sm", px: 32 },
  md: { box: "size-10", text: "text-[15px]", px: 40 },
  lg: { box: "size-11", text: "text-base", px: 44 },
  xl: { box: "size-16", text: "text-2xl", px: 64 },
  "2xl": { box: "size-28", text: "text-4xl", px: 112 },
};

export function UserAvatar({
  name,
  avatarUrl,
  size = "md",
  className,
}: {
  name: string | null | undefined;
  avatarUrl: string | null | undefined;
  size?: Size;
  className?: string;
}) {
  const conf = SIZE_MAP[size];
  const initial = (name ?? "").trim().charAt(0) || "?";

  if (avatarUrl) {
    return (
      <span
        className={cn(
          conf.box,
          "relative rounded-full overflow-hidden bg-cream shrink-0",
          className,
        )}
      >
        <Image
          src={avatarUrl}
          alt={name ?? ""}
          fill
          sizes={`${conf.px}px`}
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        conf.box,
        "rounded-full bg-navy-900 text-paper grid place-items-center font-display font-black shrink-0",
        conf.text,
        className,
      )}
    >
      {initial}
    </span>
  );
}
