"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Three-dot actions menu shown on each admin row. Owns its own
 * open/closed state and click-outside dismissal. The role-toggle form is
 * embedded inside; deletion is handed off to a parent callback so the
 * confirm UI can live next to the row.
 */
export function UserRowMenu({
  isAdmin,
  disabled,
  targetId,
  roleAction,
  rolePending,
  onDeleteRequested,
}: {
  isAdmin: boolean;
  disabled: boolean;
  targetId: string;
  roleAction: (formData: FormData) => void;
  rolePending: boolean;
  onDeleteRequested: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={menuRef} className="relative justify-self-end">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        aria-label="פעולות"
        className={cn(
          "size-9 grid place-items-center rounded-full transition",
          disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-navy-900/8",
        )}
      >
        <MoreHorizontal className="size-5 text-navy-900" />
      </button>

      {open && (
        <div className="absolute end-0 mt-2 w-56 bg-paper border border-navy-900/10 rounded-2xl shadow-[0_20px_60px_-20px_rgba(15,30,71,0.35)] overflow-hidden z-10">
          <form action={roleAction}>
            <input type="hidden" name="target_id" value={targetId} />
            <input type="hidden" name="role" value={isAdmin ? "user" : "admin"} />
            <button
              type="submit"
              disabled={rolePending}
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2 px-4 py-3 font-body text-sm text-navy-900 hover:bg-navy-900/5 text-right disabled:opacity-50"
            >
              {isAdmin ? (
                <>
                  <ShieldOff className="size-4 text-ink/60" />
                  הסר הרשאת אדמין
                </>
              ) : (
                <>
                  <ShieldCheck className="size-4 text-leaf-700" />
                  הפוך לאדמין
                </>
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDeleteRequested();
            }}
            className="w-full flex items-center gap-2 px-4 py-3 font-body text-sm text-topic-coral hover:bg-topic-coral/5 text-right border-t border-navy-900/8"
          >
            <Trash2 className="size-4" />
            מחיקת משתמש
          </button>
        </div>
      )}
    </div>
  );
}
