import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

const SIZE_MAP: Record<Size, { box: string; text: string }> = {
  sm: { box: "size-8", text: "text-sm" },
  md: { box: "size-10", text: "text-[15px]" },
  lg: { box: "size-11", text: "text-base" },
  xl: { box: "size-16", text: "text-2xl" },
  "2xl": { box: "size-28", text: "text-4xl" },
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
          "relative rounded-full overflow-hidden bg-cream shrink-0 block",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt={name ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
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
