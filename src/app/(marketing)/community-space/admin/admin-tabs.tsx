"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pencil, Users } from "lucide-react";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/community-space/admin", label: "פוסט חדש", icon: Pencil },
  { href: "/community-space/admin/users", label: "משתמשים", icon: Users },
];

export function AdminTabs() {
  const pathname = usePathname();
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-paper border border-navy-900/10">
      {tabs.map((t) => {
        const active = pathname === t.href;
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm transition",
              active
                ? "bg-navy-900 text-paper font-semibold"
                : "text-navy-900 hover:bg-navy-900/5",
            )}
          >
            <Icon className="size-4" />
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
