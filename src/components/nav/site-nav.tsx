"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { CrystalMark } from "@/components/brand/crystal-mark";

const links = [
  { href: "/", label: "בית" },
  { href: "/about", label: "אודות" },
  { href: "/topics", label: "תחומי המחקר" },
  { href: "/community", label: "חברי הקהילה" },
  { href: "/data", label: "נתוני נוער" },
  { href: "/community-space", label: "האזור הקהילתי" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-navy-900/8" : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <CrystalMark className="size-9 transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-display font-black text-xl tracking-tight">גביש</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1 font-body text-sm">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "px-3 py-2 rounded-full transition-colors hover:bg-navy-900/5",
                    active && "text-leaf-700 font-semibold",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/auth/sign-in"
            className="px-4 py-2 text-sm font-medium rounded-full hover:bg-navy-900/5 transition"
          >
            כניסה
          </Link>
          <Link
            href="/auth/sign-up"
            className="px-4 py-2 text-sm font-semibold bg-navy-900 text-paper rounded-full hover:bg-navy-700 transition"
          >
            הצטרפו לקהילה
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden size-10 grid place-items-center rounded-full hover:bg-navy-900/5"
          aria-label="פתח תפריט"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-paper border-t border-navy-900/10 px-6 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="flex flex-col gap-1 mb-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "block px-4 py-3 rounded-2xl font-display font-bold text-2xl",
                    pathname === l.href ? "bg-navy-900/5 text-leaf-700" : "hover:bg-navy-900/5",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <Link href="/auth/sign-in" className="text-center px-4 py-3 rounded-full border border-navy-900/15">
              כניסה
            </Link>
            <Link href="/auth/sign-up" className="text-center px-4 py-3 rounded-full bg-navy-900 text-paper font-semibold">
              הצטרפו לקהילה
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
