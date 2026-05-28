/**
 * Hebrew relative-time formatter used in the community feed.
 * "now" / "Xm ago" / "Xh ago" / "Xd ago" then falls back to a short
 * day+month for older posts.
 */
export function formatHebrewRelativeDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "עכשיו";
  if (diffMin < 60) return `לפני ${diffMin} ד׳`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `לפני ${diffHr} שע׳`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `לפני ${diffDay} ימים`;
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long" });
}

export function formatHebrewDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
