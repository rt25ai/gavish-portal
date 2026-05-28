"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Compact dismissable banner for inline action results inside a list row.
 * Distinct from `StatusBanner` because rows want a narrower, denser look.
 */
export function InlineFeedback({
  kind,
  text,
  onDismiss,
}: {
  kind: "error" | "success";
  text: string;
  onDismiss: () => void;
}) {
  return (
    <div
      className={cn(
        "mt-3 flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm",
        kind === "error"
          ? "bg-topic-coral/10 text-topic-coral border border-topic-coral/30"
          : "bg-leaf-500/12 text-leaf-700 border border-leaf-500/30",
      )}
    >
      <span className="flex-1">{text}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="סגור"
        className="opacity-60 hover:opacity-100"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
