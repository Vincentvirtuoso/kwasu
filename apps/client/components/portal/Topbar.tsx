"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@kwasu-portal/utils-others";

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.replace(/^\//, "").split("/");

  return segments.map((seg, i) => ({
    label: seg
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    href: "/" + segments.slice(0, i + 1).join("/"),
    last: i === segments.length - 1,
  }));
}

function SearchBar() {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={[
        "relative flex items-center gap-2.5 rounded-lg border px-3 transition-all duration-150",
        "bg-bg-elevated h-9 w-60",
        focused
          ? "border-border-focus shadow-[0_0_0_3px_rgba(201,168,76,0.12)]"
          : "border-border-base",
      ].join(" ")}
    >
      <span className="shrink-0 text-fg-placeholder text-sm" aria-hidden="true">
        ⌕
      </span>
      <input
        type="search"
        placeholder="Search anything…"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          "flex-1 bg-transparent font-sans text-sm text-fg-base",
          "placeholder:text-fg-placeholder",
          "outline-none border-none",
          "w-full",
        ].join(" ")}
        aria-label="Search portal"
      />
      <kbd
        className={[
          "hidden sm:inline-flex items-center gap-0.5 rounded border border-border-base",
          "px-1.5 font-mono text-[10px] text-fg-subtle",
          "bg-bg-surface",
        ].join(" ")}
      >
        ⌘K
      </kbd>
    </div>
  );
}

function TopbarAction({
  label,
  icon,
  badge,
  onClick,
  href,
  className,
}: {
  label: string;
  icon: string;
  badge?: number;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const cls = [
    "relative flex items-center justify-center rounded-lg",
    "w-9 h-9 text-fg-muted",
    "hover:bg-bg-elevated hover:text-fg-base",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
  ].join(" ");

  const content = (
    <>
      <span aria-hidden="true" className="text-base leading-none">
        {icon}
      </span>
      {badge !== undefined && badge > 0 && (
        <span
          aria-label={`${badge} unread`}
          className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-mono text-[9px] font-bold text-white"
          style={{ background: "var(--color-danger)", fontSize: 9 }}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </>
  );

  if (href)
    return (
      <Link href={href} className={cn(cls, className)} title={label}>
        {content}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={cn(cls, className)}
      aria-label={label}
      title={label}
    >
      {content}
    </button>
  );
}

interface TopbarProps {
  sidebarCollapsed: boolean;
  onMobileMenuOpen: () => void;
  onNotifOpen: () => void;
  unreadCount: number;
}

export function Topbar({
  sidebarCollapsed,
  onMobileMenuOpen,
  onNotifOpen,
  unreadCount,
}: TopbarProps) {
  const crumbs = useBreadcrumbs();
  const { user } = useAuth();

  return (
    <header
      className={[
        "sticky top-0 z-200 flex items-center gap-4",
        "h-16 bg-bg-surface border-b border-border-base",
        "px-6 transition-all duration-300",
      ].join(" ")}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMobileMenuOpen}
        aria-label="Open navigation"
        className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-muted hover:bg-bg-elevated transition-colors lg:hidden"
      >
        ☰
      </button>

      {/* Breadcrumb — hidden on mobile */}
      <nav
        aria-label="Breadcrumb"
        className="hidden sm:flex items-center gap-1.5 min-w-0 flex-1"
      >
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="text-fg-placeholder text-xs shrink-0"
              >
                /
              </span>
            )}
            {crumb.last ? (
              <span
                className="font-serif font-semibold text-fg-base truncate"
                style={{ fontSize: 16 }}
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="font-sans text-sm text-fg-muted hover:text-fg-base transition-colors truncate"
                style={{ textDecoration: "none" }}
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Spacer on mobile */}
      <div className="flex-1 sm:hidden" />

      {/* Right actions */}
      <div className="flex items-center gap-1 ml-auto shrink-0">
        {/* Search — desktop */}
        <div className="hidden md:block mr-2">
          <SearchBar />
        </div>

        {/* Search icon — mobile */}
        <TopbarAction label="Search" icon="⌕" className="md:hidden" />

        {/* Notifications */}
        <TopbarAction
          label="Notifications"
          icon="🔔"
          badge={unreadCount}
          onClick={onNotifOpen}
        />

        {/* Settings */}
        <TopbarAction label="Settings" icon="⚙" href="/settings" />

        {/* Avatar / profile */}
        <Link
          href="/profile"
          title="View profile"
          className={[
            "flex items-center justify-center rounded-full ml-1",
            "font-sans text-xs font-semibold",
            "w-8 h-8 shrink-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
            "transition-opacity hover:opacity-80",
          ].join(" ")}
          style={{
            background: "var(--color-green-900)",
            color: "var(--color-gold-400)",
            textDecoration: "none",
          }}
          aria-label="Profile"
        >
          {user
            ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            : "??"}
        </Link>
      </div>
    </header>
  );
}
