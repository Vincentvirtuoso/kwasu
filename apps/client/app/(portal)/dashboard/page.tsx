// app/dashboard/page.tsx (or wherever your route is)
"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { UserRole } from "@kwasu-portal/types";
import { cn } from "@kwasu-portal/utils-others";
import {
  LuBookOpen as BookOpen,
  LuCreditCard as CreditCard,
  LuBell as Bell,
  LuCalendarClock as CalendarClock,
  LuMegaphone as Megaphone,
  LuArrowUpRight as ArrowUpRight,
  LuClock as Clock,
  LuCircleCheck as CheckCircle,
  LuCircleAlert as AlertCircle,
  LuLoader as Loader2,
} from "react-icons/lu";
import Link from "next/link";
import { CardRoot } from "@kwasu-portal/components";
import { useAuth } from "@/context/AuthContext";

interface DashboardStats {
  enrolledCourses: number;
  feesOutstanding: number;
  unreadNotices: number;
  nextClass: string | null;
}

interface Announcement {
  id: string;
  title: string;
  date: string;
  urgent: boolean;
}

interface ClassSession {
  course: string;
  time: string;
  venue: string;
}

function getDummyStats(role: UserRole): DashboardStats {
  return {
    enrolledCourses: role === UserRole.CLASS_REP ? 7 : 6,
    feesOutstanding: role === UserRole.STUDENT ? 15000 : 0,
    unreadNotices: 3,
    nextClass: "CSC 301 – 10:00 AM (Hall A)",
  };
}

const dummyAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Mid‑Semester break schedule released",
    date: "2 hours ago",
    urgent: true,
  },
  {
    id: "2",
    title: "Course registration deadline extended",
    date: "Yesterday",
    urgent: false,
  },
  {
    id: "3",
    title: "Maintenance: Portal downtime on Friday",
    date: "2 days ago",
    urgent: false,
  },
];

const dummyTimetable: ClassSession[] = [
  { course: "CSC 301", time: "10:00 AM – 12:00 PM", venue: "Hall A" },
  { course: "MTH 201", time: "01:00 PM – 03:00 PM", venue: "Lab 2" },
  { course: "GST 101", time: "03:30 PM – 05:30 PM", venue: "Auditorium" },
];

function StatCard({
  label,
  value,
  icon,
  href,
  accent,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  href?: string;
  accent: "default" | "success" | "warning" | "danger";
  sub?: string;
}) {
  const accentStyles = {
    default: "border-l-4 border-l-gold-500 bg-bg-surface",
    success: "border-l-4 border-l-success)]g-bg-surface",
    warning: "border-l-4 border-l-warning)]g-bg-surface",
    danger: "border-l-4 border-l-danger)]g-bg-surface",
  };

  const cardProps = href
    ? {
        href,
        className: cn(
          "block rounded-xl p-5 shadow-sm transition hover:shadow-md",
          accentStyles[accent],
        ),
      }
    : { className: cn("rounded-xl p-5 shadow-sm", accentStyles[accent]) };

  return (
    <CardRoot {...cardProps} style={{ textDecoration: "none" }}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-fg-muted mb-1">
            {label}
          </p>
          <p className="font-sans text-2xl font-bold text-fg-base">{value}</p>
          {sub && (
            <p className="font-sans text-xs text-fg-subtle mt-1">{sub}</p>
          )}
        </div>
        <div className="shrink-0 p-2 rounded-lg bg-bg-elevated text-fg-muted">
          {icon}
        </div>
      </div>
      {href && (
        <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-gold-600 hover:underline">
          View details <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      )}
    </CardRoot>
  );
}

function AnnouncementItem({ item }: { item: Announcement }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b border-border-subtle last:border-b-0">
      <div
        className={cn(
          "shrink-0 mt-0.5",
          item.urgent ? "text-danger" : "text-fg-muted",
        )}
      >
        {item.urgent ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Megaphone className="w-4 h-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-sans text-sm font-medium truncate",
            item.urgent && "text-fg-base font-semibold",
          )}
        >
          {item.title}
        </p>
        <p className="font-sans text-xs text-fg-placeholder mt-0.5">
          {item.date}
        </p>
      </div>
    </div>
  );
}

function TimetableItem({ session }: { session: ClassSession }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border-subtle last:border-b-0">
      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.12)] text-gold-600">
        <Clock className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-semibold text-fg-base">
          {session.course}
        </p>
        <p className="font-sans text-xs text-fg-subtle">{session.time}</p>
        <p className="font-sans text-xs text-fg-placeholder">{session.venue}</p>
      </div>
    </div>
  );
}

function ClassRepQuickActions() {
  return (
    <div className="rounded-xl border border-border-base bg-bg-surface p-5">
      <h3 className="font-serif text-base font-semibold text-fg-base mb-3">
        Class Rep Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/communication/announcements/new"
          className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-bg-elevated hover:border-gold-400 transition-colors"
          style={{ textDecoration: "none" }}
        >
          <Megaphone className="w-5 h-5 text-gold-600" />
          <span className="font-sans text-sm font-medium text-fg-base">
            Post Announcement
          </span>
        </Link>
        <Link
          href="/communication/whatsapp-links"
          className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-bg-elevated hover:border-gold-400 transition-colors"
          style={{ textDecoration: "none" }}
        >
          <Bell className="w-5 h-5 text-gold-600" />
          <span className="font-sans text-sm font-medium text-fg-base">
            Update WhatsApp Links
          </span>
        </Link>
        <Link
          href="/services/election"
          className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-bg-elevated hover:border-gold-400 transition-colors"
          style={{ textDecoration: "none" }}
        >
          <CheckCircle className="w-5 h-5 text-gold-600" />
          <span className="font-sans text-sm font-medium text-fg-base">
            Manage Elections
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { role } = useRole();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (role) {
        setStats(getDummyStats(role));
      }
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [role]);

  if (!user || !role) return null;

  const isClassRep =
    role === UserRole.CLASS_REP || role === UserRole.ASSISTANT_REP;

  return (
    <div className="space-y-6">
      <div className="bg-bg-surface border border-border-base rounded-xl p-6 shadow-sm">
        <h1 className="font-serif text-xl sm:text-2xl font-semibold text-fg-base">
          Welcome back, {user.firstName} 👋
        </h1>
        <p className="font-sans text-sm text-fg-muted mt-1">
          {user.matricNo} · {role.replace("-", " ")}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
          <span className="ml-2 text-fg-muted">Loading dashboard…</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Enrolled Courses"
              value={stats?.enrolledCourses ?? 0}
              icon={<BookOpen className="w-5 h-5" />}
              href="/academic/courses"
              accent="default"
              sub="View all courses"
            />
            <StatCard
              label="Fees"
              value={
                stats?.feesOutstanding === 0
                  ? "All Paid"
                  : `₦ ${stats?.feesOutstanding?.toLocaleString()}`
              }
              icon={<CreditCard className="w-5 h-5" />}
              href="/finance/fees"
              accent={stats?.feesOutstanding === 0 ? "success" : "danger"}
              sub={stats?.feesOutstanding === 0 ? "No dues" : "Outstanding"}
            />
            <StatCard
              label="Notifications"
              value={stats?.unreadNotices ?? 0}
              icon={<Bell className="w-5 h-5" />}
              href="/communication/notifications"
              accent="warning"
              sub="unread"
            />
            <StatCard
              label="Next Class"
              value={stats?.nextClass?.split("–")[0]?.trim() ?? "None"}
              icon={<CalendarClock className="w-5 h-5" />}
              href="/academic/timetable"
              accent="default"
              sub={stats?.nextClass?.split("–")[1]?.trim()}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border-base bg-bg-surface shadow-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
                  <h2 className="font-serif text-lg font-semibold text-fg-base">
                    Recent Announcements
                  </h2>
                  <Link
                    href="/communication/announcements"
                    className="text-xs font-semibold text-gold-600 hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="divide-y divide-border-subtle">
                  {dummyAnnouncements.map((a) => (
                    <AnnouncementItem key={a.id} item={a} />
                  ))}
                </div>
              </div>

              {isClassRep && (
                <div className="mt-6">
                  <ClassRepQuickActions />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border-base bg-bg-surface shadow-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
                  <h2 className="font-serif text-lg font-semibold text-fg-base">
                    Today’s Timetable
                  </h2>
                  <Link
                    href="/academic/timetable"
                    className="text-xs font-semibold text-gold-600 hover:underline"
                  >
                    Full schedule
                  </Link>
                </div>
                <div>
                  {dummyTimetable.length > 0 ? (
                    dummyTimetable.map((s) => (
                      <TimetableItem key={s.course} session={s} />
                    ))
                  ) : (
                    <div className="p-6 text-center text-fg-muted text-sm">
                      No classes today 🎉
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
