"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Quiz" },
    { href: "/past", label: "Past" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 flex items-center h-14 gap-8">
        <Link href="/" className="text-lg font-bold text-white tracking-tight">
          EnglishMate
        </Link>
        <div className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
