"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRole } from "@/hooks/useRole";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@kwasu-portal/types";

// ── Nav structure ──────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  roles?: UserRole[]; // if set, only visible to these roles
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: "⌂" }],
  },
  {
    label: "Academic",
    items: [
      { label: "Courses", href: "/academic/courses", icon: "📚" },
      { label: "Timetable", href: "/academic/timetable", icon: "🗓" },
      { label: "Results", href: "/academic/results", icon: "📊" },
      { label: "Transcript", href: "/academic/transcript", icon: "📄" },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        label: "Announcements",
        href: "/communication/announcements",
        icon: "📢",
      },
      {
        label: "Notifications",
        href: "/communication/notifications",
        icon: "🔔",
      },
      {
        label: "Post Announcement",
        href: "/communication/announcements/new",
        icon: "✏️",
        roles: [UserRole.CLASS_REP, UserRole.ASSISTANT_REP],
      },
      {
        label: "WhatsApp Links",
        href: "/communication/whatsapp-links",
        icon: "💬",
        roles: [UserRole.CLASS_REP, UserRole.ASSISTANT_REP],
      },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Fees", href: "/finance/fees", icon: "💳" },
      { label: "Receipts", href: "/finance/receipts", icon: "🧾" },
      { label: "Invoices", href: "/finance/invoices", icon: "📑" },
      { label: "Transactions", href: "/finance/transactions", icon: "↔" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Hostel", href: "/services/hostel", icon: "🏠" },
      { label: "Clearance", href: "/services/clearance", icon: "✅" },
      { label: "SIWES", href: "/services/siwes", icon: "💼" },
      {
        label: "Programme Change",
        href: "/services/programme-change",
        icon: "🔄",
      },
      { label: "Election", href: "/services/election", icon: "🗳" },
      { label: "Tickets", href: "/services/tickets", icon: "🎫" },
    ],
  },
  {
    label: "Feedback",
    items: [{ label: "Rate Lecturer", href: "/rate-lecturer", icon: "⭐" }],
  },
];

// ── Sub-components ─────────────────────────────────────────────
function SidebarLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.07] shrink-0"
      style={{ textDecoration: "none" }}
    >
      {/* Mark */}
      <div
        className="shrink-0 flex items-center justify-center rounded-lg font-serif font-bold text-[var(--color-green-900)]"
        style={{
          width: 36,
          height: 36,
          background: "var(--color-gold-500)",
          fontSize: 14,
          letterSpacing: -0.5,
          flexShrink: 0,
        }}
      >
        KW
      </div>

      {/* Wordmark — hidden when collapsed */}
      {!collapsed && (
        <div className="flex flex-col leading-tight overflow-hidden">
          <span
            className="font-serif font-semibold text-white truncate"
            style={{ fontSize: 13, letterSpacing: 0.2 }}
          >
            KWASU Portal
          </span>
          <span
            className="font-sans font-semibold uppercase text-[var(--color-gold-500)] tracking-[0.15em]"
            style={{ fontSize: 8 }}
          >
            Student
          </span>
        </div>
      )}
    </Link>
  );
}

function NavLink({
  item,
  collapsed,
  active,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={[
        "flex items-center gap-3 rounded-lg transition-all duration-150 select-none",
        "text-sm font-medium font-sans",
        collapsed ? "w-10 h-10 justify-center px-0" : "px-3 py-2.5",
        active
          ? "bg-[rgba(201,168,76,0.14)] text-[var(--color-gold-400)] font-semibold"
          : "text-white/50 hover:bg-white/[0.06] hover:text-white/85",
      ].join(" ")}
      style={{ textDecoration: "none" }}
    >
      <span className="shrink-0 text-base leading-none" aria-hidden="true">
        {item.icon}
      </span>

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && item.badge > 0 && (
            <span
              className="shrink-0 font-mono text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center"
              style={{
                background: "var(--color-danger)",
                color: "#fff",
                fontSize: 10,
              }}
            >
              {item.badge > 99 ? "99+" : item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

function UserFooter({
  collapsed,
  user,
}: {
  collapsed: boolean;
  user: {
    firstName: string;
    lastName: string;
    matricNo: string;
    role: string;
  } | null;
}) {
  if (!user) return null;

  const initials = [user.firstName[0], user.lastName[0]].join("").toUpperCase();

  return (
    <div className="shrink-0 border-t border-white/[0.07] p-3">
      <Link
        href="/profile"
        className={[
          "flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/[0.06]",
          collapsed ? "justify-center" : "",
        ].join(" ")}
        style={{ textDecoration: "none" }}
        title={collapsed ? `${user.firstName} ${user.lastName}` : undefined}
      >
        {/* Avatar */}
        <div
          className="shrink-0 flex items-center justify-center rounded-full font-sans font-semibold"
          style={{
            width: 32,
            height: 32,
            background: "var(--color-green-700)",
            color: "var(--color-gold-400)",
            fontSize: 12,
          }}
        >
          {initials}
        </div>

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="font-sans text-xs font-semibold text-white/80 truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="font-mono text-[10px] text-white/35 truncate">
              {user.matricNo}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
}

// ── Main Sidebar ───────────────────────────────────────────────
interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapse: (v: boolean) => void;
  onMobileClose: () => void;
  unreadCount: number;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onCollapse,
  onMobileClose,
  unreadCount,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { role } = useRole();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  // Inject unread badge into Notifications item
  const enriched = NAV.map((group) => ({
    ...group,
    items: group.items.map((item) =>
      item.href === "/communication/notifications"
        ? { ...item, badge: unreadCount }
        : item,
    ),
  }));

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[290] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          "fixed top-0 left-0 bottom-0 z-[300] flex flex-col",
          "bg-[var(--color-green-950)] transition-all duration-300 ease-in-out",
          // Desktop: always visible, width toggles
          "lg:translate-x-0",
          collapsed ? "lg:w-[72px]" : "lg:w-[260px]",
          // Mobile: slide in/out
          mobileOpen
            ? "translate-x-0 w-[260px]"
            : "-translate-x-full w-[260px] lg:translate-x-0",
        ].join(" ")}
      >
        <SidebarLogo collapsed={collapsed} />

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => onCollapse(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={[
            "hidden lg:flex absolute -right-3 top-[72px]",
            "w-6 h-6 rounded-full items-center justify-center",
            "bg-[var(--color-green-800)] border border-white/10",
            "text-white/50 hover:text-white hover:bg-[var(--color-green-700)]",
            "transition-all duration-150 text-xs",
            "z-10",
          ].join(" ")}
        >
          {collapsed ? "›" : "‹"}
        </button>

        {/* Nav scroll area */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-6">
          {enriched.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.roles || (role && item.roles.includes(role)),
            );
            if (!visibleItems.length) return null;

            return (
              <div key={group.label}>
                {!collapsed && (
                  <p
                    className="font-sans font-semibold uppercase tracking-[0.18em] text-white/25 mb-2 px-3"
                    style={{ fontSize: 9 }}
                  >
                    {group.label}
                  </p>
                )}
                <div className="space-y-0.5">
                  {visibleItems.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      collapsed={collapsed}
                      active={isActive(item.href)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User footer */}
        <UserFooter
          collapsed={collapsed}
          user={
            user
              ? {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  matricNo: user.matricNo,
                  role: user.role,
                }
              : null
          }
        />
      </aside>
    </>
  );
}
