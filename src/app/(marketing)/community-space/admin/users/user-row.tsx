"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ShieldCheck, ShieldOff, Trash2, MoreHorizontal, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { deleteUser, setUserRole, type AdminActionState } from "./actions";

export type UserRowData = {
  id: string;
  fullName: string;
  organization: string | null;
  role: "user" | "admin";
  createdAt: string;
  email: string;
  lastSignIn: string | null;
  confirmed: boolean;
  isCurrentUser: boolean;
};

export function UserRow({ row }: { row: UserRowData }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState<AdminActionState>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [roleState, roleAction, rolePending] = useActionState<
    AdminActionState,
    FormData
  >(setUserRole, null);
  const [delState, delAction, delPending] = useActionState<
    AdminActionState,
    FormData
  >(deleteUser, null);

  useEffect(() => {
    if (roleState) {
      setFeedback(roleState);
      setMenuOpen(false);
    }
  }, [roleState]);
  useEffect(() => {
    if (delState) {
      setFeedback(delState);
      setMenuOpen(false);
      setConfirmDelete(false);
    }
  }, [delState]);

  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const initial = row.fullName.charAt(0) || row.email.charAt(0) || "?";
  const isAdmin = row.role === "admin";

  return (
    <li className="px-4 lg:px-6 py-4">
      <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1.5fr_1.5fr_1fr_1fr_auto] gap-4 items-center">
        {/* identity */}
        <div className="flex items-center gap-3 min-w-0">
          <span className={cn(
            "size-10 rounded-full grid place-items-center font-display font-black text-[15px] shrink-0",
            isAdmin ? "bg-leaf-500 text-paper" : "bg-navy-900 text-paper",
          )}>
            {initial}
          </span>
          <div className="min-w-0">
            <p className="font-display font-bold text-navy-900 text-[15px] leading-tight truncate">
              {row.fullName || "(ללא שם)"}
              {row.isCurrentUser && (
                <span className="ms-2 font-body text-[11px] font-normal text-navy-700/60">(אתם)</span>
              )}
            </p>
            <p className="font-body text-[12px] text-ink/55 truncate">
              {row.organization || "—"}
            </p>
          </div>
        </div>

        {/* email — desktop only */}
        <div className="hidden lg:block min-w-0">
          <p className="font-body text-[13px] text-ink/85 truncate">{row.email}</p>
          {!row.confirmed && (
            <span className="inline-flex items-center gap-1 mt-1 font-body text-[10px] text-topic-coral">
              <AlertCircle className="size-3" />
              לא אומת
            </span>
          )}
        </div>

        {/* role badge — desktop only */}
        <div className="hidden lg:block">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-[12px] font-semibold",
            isAdmin
              ? "bg-leaf-500/15 text-leaf-700"
              : "bg-navy-900/8 text-navy-900",
          )}>
            {isAdmin && <ShieldCheck className="size-3" />}
            {isAdmin ? "אדמין" : "חבר"}
          </span>
        </div>

        {/* joined — desktop only */}
        <div className="hidden lg:block font-body text-[13px] text-ink/60">
          {formatDate(row.createdAt)}
        </div>

        {/* actions */}
        <div ref={menuRef} className="relative justify-self-end">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            disabled={row.isCurrentUser || rolePending || delPending}
            aria-label="פעולות"
            className={cn(
              "size-9 grid place-items-center rounded-full transition",
              row.isCurrentUser
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-navy-900/8",
            )}
          >
            <MoreHorizontal className="size-5 text-navy-900" />
          </button>

          {menuOpen && !row.isCurrentUser && (
            <div className="absolute end-0 mt-2 w-56 bg-paper border border-navy-900/10 rounded-2xl shadow-[0_20px_60px_-20px_rgba(15,30,71,0.35)] overflow-hidden z-10">
              <form action={roleAction}>
                <input type="hidden" name="target_id" value={row.id} />
                <input type="hidden" name="role" value={isAdmin ? "user" : "admin"} />
                <button
                  type="submit"
                  disabled={rolePending}
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
                  setMenuOpen(false);
                  setConfirmDelete(true);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 font-body text-sm text-topic-coral hover:bg-topic-coral/5 text-right border-t border-navy-900/8"
              >
                <Trash2 className="size-4" />
                מחיקת משתמש
              </button>
            </div>
          )}
        </div>
      </div>

      {/* mobile-only: email + role row */}
      <div className="lg:hidden mt-3 ms-13 flex items-center gap-3 font-body text-[12px] text-ink/65">
        <span className="truncate">{row.email}</span>
        <span className={cn(
          "shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold",
          isAdmin
            ? "bg-leaf-500/15 text-leaf-700"
            : "bg-navy-900/8 text-navy-900",
        )}>
          {isAdmin ? "אדמין" : "חבר"}
        </span>
      </div>

      {feedback?.error && (
        <FeedbackBanner kind="error" text={feedback.error} onDismiss={() => setFeedback(null)} />
      )}
      {feedback?.success && (
        <FeedbackBanner kind="success" text={feedback.success} onDismiss={() => setFeedback(null)} />
      )}

      {confirmDelete && (
        <ConfirmDelete
          row={row}
          pending={delPending}
          action={delAction}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </li>
  );
}

function ConfirmDelete({
  row,
  action,
  pending,
  onCancel,
}: {
  row: UserRowData;
  action: (formData: FormData) => void;
  pending: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="mt-3 p-4 rounded-2xl bg-topic-coral/8 border border-topic-coral/30">
      <p className="font-body text-sm text-navy-900 mb-3">
        למחוק את <span className="font-bold">{row.fullName || row.email}</span>?
        כל הפוסטים של המשתמש ימחקו גם. פעולה לא הפיכה.
      </p>
      <div className="flex items-center gap-2">
        <form action={action}>
          <input type="hidden" name="target_id" value={row.id} />
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-4 py-2 bg-topic-coral text-paper rounded-full font-body text-sm font-semibold hover:bg-topic-coral/85 transition disabled:opacity-60"
          >
            <Trash2 className="size-4" />
            {pending ? "מוחק..." : "כן, מחק"}
          </button>
        </form>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 rounded-full font-body text-sm text-navy-900 hover:bg-navy-900/5 transition"
        >
          ביטול
        </button>
      </div>
    </div>
  );
}

function FeedbackBanner({
  kind,
  text,
  onDismiss,
}: {
  kind: "error" | "success";
  text: string;
  onDismiss: () => void;
}) {
  return (
    <div className={cn(
      "mt-3 flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm",
      kind === "error"
        ? "bg-topic-coral/10 text-topic-coral border border-topic-coral/30"
        : "bg-leaf-500/12 text-leaf-700 border border-leaf-500/30",
    )}>
      <span className="flex-1">{text}</span>
      <button type="button" onClick={onDismiss} aria-label="סגור" className="opacity-60 hover:opacity-100">
        <X className="size-4" />
      </button>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
