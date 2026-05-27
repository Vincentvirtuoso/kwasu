"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@kwasu-portal/utils-others";
import {
  LuSearch as Search,
  LuBell as Bell,
  LuSettings as Settings,
  LuMenu as Menu,
  LuX as X,
  LuCornerDownLeft as EnterIcon,
  LuArrowRight as ArrowRight,
} from "react-icons/lu";
import { Input } from "@kwasu-portal/components";

// ── Breadcrumb hook ──────────────────────────────────────────────
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

// ── Dummy search suggestions ─────────────────────────────────────
interface SearchSuggestion {
  label: string;
  href: string;
  description?: string;
}

const QUICK_SUGGESTIONS: SearchSuggestion[] = [
  {
    label: "Courses",
    href: "/academic/courses",
    description: "View enrolled courses",
  },
  {
    label: "Timetable",
    href: "/academic/timetable",
    description: "Today's schedule",
  },
  {
    label: "Results",
    href: "/academic/results",
    description: "Check your grades",
  },
  { label: "Fees", href: "/finance/fees", description: "Payment status" },
  { label: "Hostel", href: "/services/hostel", description: "Accommodation" },
  {
    label: "Clearance",
    href: "/services/clearance",
    description: "Clearance status",
  },
];

// ── Search bar sub‑component ─────────────────────────────────────
function SearchBar({
  mobile = false,
  onClose,
  className,
}: {
  mobile?: boolean;
  onClose?: () => void;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  const filteredSuggestions = value
    ? QUICK_SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(value.toLowerCase()),
      )
    : QUICK_SUGGESTIONS;

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto‑focus on mount for mobile
  useEffect(() => {
    if (mobile && inputRef.current) inputRef.current.focus();
  }, [mobile]);

  const clearSearch = useCallback(() => {
    setValue("");
    inputRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center gap-2.5 rounded-full border transition-all duration-200",
        "bg-bg-elevated backdrop-blur-sm",
        mobile
          ? "h-10 w-full border-border-base"
          : "h-9 w-64 border-border-base",
        focused
          ? "border-gold-400 shadow-[0_0_0_3px_rgba(201,168,76,0.15)] bg-bg-base"
          : "hover:border-border-strong",
        className,
      )}
    >
      <Input
        leftIcon={<Search className="w-4 h-4 text-fg-placeholder shrink-0" />}
        rightIcon={
          <>
            {!mobile && (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border-base px-1.5 font-mono text-[10px] text-fg-subtle bg-bg-surface shrink-0">
                ⌘K
              </kbd>
            )}
            {mobile && onClose && (
              <button
                onClick={onClose}
                className="shrink-0 p-1 rounded-full hover:bg-bg-surface text-fg-muted"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        }
        className="border-0 rounded-full"
        placeholder="Search…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          setFocused(true);
          setShowSuggestions(true);
        }}
      />

      {showSuggestions && (focused || value) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-surface border border-border-base rounded-xl shadow-xl z-50 overflow-hidden animate-[fade-in_120ms_ease-out]">
          {filteredSuggestions.length > 0 ? (
            <div className="py-1">
              {filteredSuggestions.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setShowSuggestions(false)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-bg-elevated transition-colors group"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-fg-base group-hover:text-fg-strong truncate">
                      {s.label}
                    </p>
                    {s.description && (
                      <p className="font-sans text-xs text-fg-subtle mt-0.5 truncate">
                        {s.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-fg-placeholder shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-3" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-center font-sans text-sm text-fg-muted">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Action button (bell, settings, etc.) ────────────────────────
function TopbarAction({
  label,
  icon,
  badge,
  onClick,
  href,
  className,
}: {
  label: string;
  icon: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const baseClass =
    "relative flex items-center justify-center rounded-lg w-9 h-9 text-fg-muted hover:bg-bg-elevated hover:text-fg-base transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus";

  const content = (
    <>
      <span aria-hidden="true" className="text-base">
        {icon}
      </span>
      {badge !== undefined && badge > 0 && (
        <span
          aria-label={`${badge} unread`}
          className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-mono text-[9px] font-bold text-white bg-danger"
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </>
  );

  if (href)
    return (
      <Link href={href} className={cn(baseClass, className)} title={label}>
        {content}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={cn(baseClass, className)}
      aria-label={label}
      title={label}
    >
      {content}
    </button>
  );
}

// ── Topbar ───────────────────────────────────────────────────────
interface TopbarProps {
  sidebarCollapsed: boolean;
  onMobileMenuOpen: () => void;
  onNotifOpen: () => void;
  unreadCount: number;
  isMobile: boolean;
}

export function Topbar({
  sidebarCollapsed,
  onMobileMenuOpen,
  onNotifOpen,
  unreadCount,
  isMobile,
}: TopbarProps) {
  const crumbs = useBreadcrumbs();
  const { user } = useAuth();
  const currentPage = crumbs[crumbs.length - 1]?.label ?? "Dashboard";
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K global shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const desktopInput = document.querySelector<HTMLInputElement>(
          '[data-search="desktop"] input[type="search"]',
        );
        if (desktopInput) {
          desktopInput.focus();
        } else {
          setMobileSearchOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isMobile && mobileSearchOpen) setMobileSearchOpen(false);
  }, [isMobile]);

  return (
    <header className="sticky top-0 z-200 flex items-center gap-4 h-16 bg-bg-surface border-b border-border-base px-6 transition-all duration-300">
      <button
        onClick={onMobileMenuOpen}
        aria-label="Open navigation"
        className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg text-fg-muted hover:bg-bg-elevated transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        {mobileSearchOpen ? (
          <SearchBar
            mobile
            onClose={() => setMobileSearchOpen(false)}
            className="animate-[slide-in-right_200ms_ease-out]"
          />
        ) : (
          <>
            <span className="hidden sm:flex items-center gap-1.5 min-w-0">
              {crumbs.map((crumb, i) => (
                <span
                  key={crumb.href}
                  className="flex items-center gap-1.5 min-w-0"
                >
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
                      className="font-serif font-semibold text-fg-base truncate text-base"
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
            </span>
            <span
              className="sm:hidden font-serif font-semibold text-fg-base truncate text-base"
              aria-current="page"
            >
              {currentPage}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-1 ml-auto shrink-0">
        <div className="hidden md:block mr-2" data-search="desktop">
          <SearchBar />
        </div>

        {!mobileSearchOpen && (
          <TopbarAction
            label="Search"
            icon={<Search className="w-5 h-5" />}
            onClick={() => setMobileSearchOpen(true)}
            className="md:hidden"
          />
        )}

        <TopbarAction
          label="Notifications"
          icon={<Bell className="w-5 h-5" />}
          badge={unreadCount}
          onClick={onNotifOpen}
        />

        <TopbarAction
          label="Settings"
          icon={<Settings className="w-5 h-5" />}
          href="/settings"
        />

        <Link
          href="/profile"
          title="View profile"
          className="flex items-center justify-center rounded-full ml-1 font-sans text-xs font-semibold w-8 h-8 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus transition-opacity hover:opacity-80"
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
