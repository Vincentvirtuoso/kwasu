"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { UserRole } from "@kwasu-portal/types";
import { cn } from "@kwasu-portal/utils-others";
import {
  LuLayoutDashboard as LayoutDashboard,
  LuBookOpen as BookOpen,
  LuCalendar as Calendar,
  LuFileText as FileText,
  LuMegaphone as Megaphone,
  LuBell as Bell,
  LuSquarePen as PenSquare,
  LuMessageCircle as MessageCircle,
  LuCreditCard as CreditCard,
  LuReceipt as Receipt,
  LuFileText as FileText2,
  LuArrowLeftRight as ArrowLeftRight,
  LuBuilding2 as Building2,
  LuCircleCheck as CheckCircle,
  LuBriefcase as Briefcase,
  LuRefreshCw as RefreshCw,
  LuVote as Vote,
  LuTicket as Ticket,
  LuStar as Star,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
} from "react-icons/lu";
import { FiBarChart2 } from "react-icons/fi";
import { BrandMark } from "@kwasu-portal/components";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  roles?: UserRole[];
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Academic",
    items: [
      {
        label: "Courses",
        href: "/academic/courses",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        label: "Timetable",
        href: "/academic/timetable",
        icon: <Calendar className="w-5 h-5" />,
      },
      {
        label: "Results",
        href: "/academic/results",
        icon: <FiBarChart2 className="w-5 h-5" />,
      },
      {
        label: "Transcript",
        href: "/academic/transcript",
        icon: <FileText className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        label: "Announcements",
        href: "/communication/announcements",
        icon: <Megaphone className="w-5 h-5" />,
      },
      {
        label: "Notifications",
        href: "/communication/notifications",
        icon: <Bell className="w-5 h-5" />,
      },
      {
        label: "Post Announcement",
        href: "/communication/announcements/new",
        icon: <PenSquare className="w-5 h-5" />,
        roles: [UserRole.CLASS_REP, UserRole.ASSISTANT_REP],
      },
      {
        label: "WhatsApp Links",
        href: "/communication/whatsapp-links",
        icon: <MessageCircle className="w-5 h-5" />,
        roles: [UserRole.CLASS_REP, UserRole.ASSISTANT_REP],
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        label: "Fees",
        href: "/finance/fees",
        icon: <CreditCard className="w-5 h-5" />,
      },
      {
        label: "Receipts",
        href: "/finance/receipts",
        icon: <Receipt className="w-5 h-5" />,
      },
      {
        label: "Invoices",
        href: "/finance/invoices",
        icon: <FileText2 className="w-5 h-5" />,
      },
      {
        label: "Transactions",
        href: "/finance/transactions",
        icon: <ArrowLeftRight className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Services",
    items: [
      {
        label: "Hostel",
        href: "/services/hostel",
        icon: <Building2 className="w-5 h-5" />,
      },
      {
        label: "Clearance",
        href: "/services/clearance",
        icon: <CheckCircle className="w-5 h-5" />,
      },
      {
        label: "SIWES",
        href: "/services/siwes",
        icon: <Briefcase className="w-5 h-5" />,
      },
      {
        label: "Programme Change",
        href: "/services/programme-change",
        icon: <RefreshCw className="w-5 h-5" />,
      },
      {
        label: "Election",
        href: "/services/election",
        icon: <Vote className="w-5 h-5" />,
      },
      {
        label: "Tickets",
        href: "/services/tickets",
        icon: <Ticket className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Feedback",
    items: [
      {
        label: "Rate Lecturer",
        href: "/rate-lecturer",
        icon: <Star className="w-5 h-5" />,
      },
    ],
  },
];

function SidebarLogo({ collapsed }: { collapsed: boolean }) {
  return <BrandMark href="/dashboard" logoOnly={collapsed} className="py-3" />;
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
      className={cn(
        "flex items-center gap-3 rounded-lg transition-all duration-150 select-none text-sm font-medium font-sans",
        collapsed ? "w-10 h-10 justify-center px-0" : "px-3 py-2.5",
        active
          ? "bg-[rgba(201,168,76,0.14)] text-gold-400 font-semibold"
          : "text-white/50 hover:bg-white/6 hover:text-white/85",
      )}
      style={{ textDecoration: "none" }}
    >
      <span className="shrink-0" aria-hidden="true">
        {item.icon}
      </span>

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && item.badge > 0 && (
            <span className="shrink-0 font-mono text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-4.5 text-center bg-danger text-white">
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
        className={cn(
          "flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/6",
          collapsed && "justify-center",
        )}
        style={{ textDecoration: "none" }}
        title={collapsed ? `${user.firstName} ${user.lastName}` : undefined}
      >
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
      {mobileOpen && (
        <div
          className="fixed inset-0 z-290 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-300 flex flex-col pr-0.75",
          "bg-green-950 transition-all duration-300 ease-in-out",
          "lg:translate-x-0",
          collapsed ? "lg:w-18" : "lg:w-65",
          mobileOpen
            ? "translate-x-0 w-65"
            : "-translate-x-full w-65 lg:translate-x-0",
        )}
      >
        <SidebarLogo collapsed={collapsed} />

        <button
          onClick={() => onCollapse(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "hidden lg:flex absolute -right-3 top-18",
            "w-6 h-6 rounded-full items-center justify-center",
            "bg-green-800 border border-white/10",
            "text-white/50 hover:text-white hover:bg-green-700",
            "transition-all duration-150",
            "z-10",
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-6">
          {enriched.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.roles || (role && item.roles.includes(role)),
            );
            if (!visibleItems.length) return null;

            return (
              <div key={group.label}>
                {!collapsed && (
                  <p className="font-sans font-semibold uppercase tracking-[0.18em] text-white/25 mb-2 px-3 text-[9px]">
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
