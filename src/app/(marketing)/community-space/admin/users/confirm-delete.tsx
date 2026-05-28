"use client";

import { Trash2 } from "lucide-react";
import type { UserRowData } from "./user-row";

export function ConfirmDelete({
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
