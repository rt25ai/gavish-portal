import Link from "next/link";
import { MessageCircle, Plus } from "lucide-react";

export function EmptyFeed({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="bg-paper rounded-3xl border border-dashed border-navy-900/20 p-10 text-center">
      <div className="size-14 rounded-full bg-leaf-500/15 text-leaf-700 grid place-items-center mx-auto mb-4">
        <MessageCircle className="size-7" />
      </div>
      <h3 className="font-display font-black text-xl text-navy-900 mb-2">
        אין עדיין עדכונים
      </h3>
      <p className="font-body text-base text-ink/70 mb-6">
        {isAdmin
          ? "אתם הראשונים — פרסמו את הפוסט הראשון של הקהילה."
          : "הפיד יתמלא ככל שמנהלי הקהילה יפרסמו עדכונים."}
      </p>
      {isAdmin && (
        <Link
          href="/community-space/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-paper rounded-full font-display font-bold text-sm hover:bg-navy-700 transition"
        >
          <Plus className="size-4" />
          פוסט חדש
        </Link>
      )}
    </div>
  );
}
