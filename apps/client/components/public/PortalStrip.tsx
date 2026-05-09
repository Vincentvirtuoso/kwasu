"use client";
import { cn } from "@kwasu-portal/utils-others";
import Link from "next/link";

const PORTALS = [
  { label: "Student Portal", href: "/login", primary: true },
  { label: "Staff Portal", href: "/admin/login", primary: false },
  { label: "Postgraduate", href: "/pg/login", primary: false },
  { label: "Alumni →", href: "/alumni", primary: false },
];

export function PortalStrip() {
  return (
    <div className="bg-gold-500 border-t border-green-900/10 px-[clamp(20px,5vw,80px)] py-7 flex flex-wrap items-center justify-between gap-6">
      <div className="shrink-0">
        <h2 className="font-serif text-[clamp(18px,2vw,24px)] font-bold text-green-900 leading-tight">
          Access Your Portal
        </h2>
        <p className="font-sans text-[13px] text-green-800 mt-1">
          Students, Staff &amp; Postgraduates — everything in one place
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {PORTALS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={cn(
              "inline-flex items-center px-6 py-2.5 rounded-lg font-sans text-[13px] font-semibold transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
              p.primary
                ? "bg-green-900 text-gold-400 font-bold"
                : "bg-green-900/0.12 text-green-900",
            )}
          >
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
