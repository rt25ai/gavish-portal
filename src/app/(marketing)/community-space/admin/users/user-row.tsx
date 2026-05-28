"use client";

import { useActionState, useEffect, useState } from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { UserAvatar } from "@/components/community/user-avatar";
import { formatHebrewDate } from "@/lib/format-date";
import { deleteUser, setUserRole, type AdminActionState } from "./actions";
import { ConfirmDelete } from "./confirm-delete";
import { InlineFeedback } from "./inline-feedback";
import { UserRowMenu } from "./user-row-menu";

export type UserRowData = {
  id: string;
  fullName: string;
  organization: string | null;
  avatarUrl: string | null;
  role: "user" | "admin";
  createdAt: string;
  email: string;
  lastSignIn: string | null;
  confirmed: boolean;
  isCurrentUser: boolean;
};

export function UserRow({ row }: { row: UserRowData }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [feedback, setFeedback] = useState<AdminActionState>(null);

  const [roleState, roleAction, rolePending] = useActionState<AdminActionState, FormData>(
    setUserRole,
    null,
  );
  const [delState, delAction, delPending] = useActionState<AdminActionState, FormData>(
    deleteUser,
    null,
  );

  useEffect(() => {
    if (roleState) setFeedback(roleState);
  }, [roleState]);
  useEffect(() => {
    if (delState) {
      setFeedback(delState);
      setConfirmDelete(false);
    }
  }, [delState]);

  const isAdmin = row.role === "admin";

  return (
    <li className="px-4 lg:px-6 py-4">
      <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1.5fr_1.5fr_1fr_1fr_auto] gap-4 items-center">
        {/* identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <UserAvatar
              name={row.fullName || row.email}
              avatarUrl={row.avatarUrl}
              size="md"
            />
            {isAdmin && (
              <span className="absolute -bottom-1 -end-1 size-5 rounded-full bg-leaf-500 text-paper grid place-items-center ring-2 ring-paper">
                <ShieldCheck className="size-3" />
              </span>
            )}
          </div>
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
          {formatHebrewDate(row.createdAt)}
        </div>

        <UserRowMenu
          isAdmin={isAdmin}
          disabled={row.isCurrentUser || rolePending || delPending}
          targetId={row.id}
          roleAction={roleAction}
          rolePending={rolePending}
          onDeleteRequested={() => setConfirmDelete(true)}
        />
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
        <InlineFeedback kind="error" text={feedback.error} onDismiss={() => setFeedback(null)} />
      )}
      {feedback?.success && (
        <InlineFeedback kind="success" text={feedback.success} onDismiss={() => setFeedback(null)} />
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
