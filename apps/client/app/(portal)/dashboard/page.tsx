"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LuBookOpen,
  LuCreditCard,
  LuBell,
  LuCalendarClock,
  LuMegaphone,
  LuArrowUpRight,
  LuClock,
  LuCircleCheck,
  LuCircleAlert,
  LuDownload,
  LuExternalLink,
  LuMoreHorizontal,
  LuTrendingUp,
  LuBriefcase,
  LuGraduationCap,
  LuChevronDown,
} from "react-icons/lu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// ── Dummy data ────────────────────────────────────────────────────────────────

const user = {
  firstName: "Fatimah",
  lastName: "Aliyu",
  matricNo: "21/52HS/01432",
  role: "class-rep",
  department: "Computer Science",
  level: 300,
  avatarUrl: null as string | null,
};

const gpaData = [
  { semester: "1st Sem", gpa: 3.2, average: 2.9 },
  { semester: "2nd Sem", gpa: 3.5, average: 3.0 },
  { semester: "3rd Sem", gpa: 3.1, average: 3.1 },
  { semester: "4th Sem", gpa: 3.8, average: 3.2 },
  { semester: "5th Sem", gpa: 3.6, average: 3.0 },
  { semester: "6th Sem", gpa: 4.1, average: 3.3 },
];

const payments = [
  { id: "INV-2024-009", category: "2024/2025 School Fees", date: "14 Jan 2025", amount: 95000, status: "pending" },
  { id: "INV-2024-008", category: "2023/2024 School Fees", date: "20 Sep 2023", amount: 90000, status: "paid" },
  { id: "INV-2023-007", category: "Accommodation Fee",     date: "18 Sep 2023", amount: 35000, status: "paid" },
  { id: "INV-2023-006", category: "2022/2023 School Fees", date: "10 Oct 2022", amount: 85000, status: "paid" },
];

const notifications = [
  {
    id: "1", type: "material",
    actor: "Dr. Emeka Okafor",
    action: "uploaded course material",
    resource: "Data Structures – Week 11 Slides",
    resourceType: "PPT · 8.4 MB",
    time: "Today, 9:14 AM",
    read: false,
    avatarColor: "#2d6e47",
    emoji: "👨‍💻",
  },
  {
    id: "2", type: "assignment",
    actor: "Prof. Aisha Bello-Adamu",
    action: "posted a new assignment",
    resource: "Lab Report – Ecosystem Analysis",
    resourceType: "Due: 30 May 2026",
    time: "Yesterday, 3:40 PM",
    read: false,
    avatarColor: "#1a4a2e",
    emoji: "👩‍🔬",
  },
  {
    id: "3", type: "announcement",
    actor: "Level Adviser",
    action: "approved announcement",
    resource: "Mid-Semester Exam Timetable Released",
    resourceType: "Announcement",
    time: "2 days ago",
    read: true,
    avatarColor: "#8a6f2e",
    emoji: "📢",
  },
];

const todayCourses = [
  {
    code: "CSC 301", title: "Data Structures & Algorithms",
    time: "08:00 AM – 10:00 AM", venue: "CBT Lab 1",
    lecturer: "Dr. Emeka Okafor", credits: 3,
    lecturerColor: "#2d6e47",
  },
  {
    code: "MTH 303", title: "Numerical Methods",
    time: "11:00 AM – 01:00 PM", venue: "Lecture Hall B",
    lecturer: "Prof. Yusuf Lawal", credits: 3,
    lecturerColor: "#1a3d4a",
  },
  {
    code: "CSC 305", title: "Software Engineering",
    time: "02:00 PM – 04:00 PM", venue: "Room 204",
    lecturer: "Dr. Amina Sule", credits: 2,
    lecturerColor: "#4a2e1a",
  },
];

const announcements = [
  { id: "1", title: "Mid-Semester break schedule released", date: "2 hours ago",  urgent: true  },
  { id: "2", title: "Course registration deadline extended to June 5", date: "Yesterday", urgent: false },
  { id: "3", title: "Portal maintenance scheduled for Friday 11 PM", date: "2 days ago", urgent: false },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

function formatNGN(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  paid:    { bg: "rgba(22,163,74,0.1)",  color: "#15803d", label: "Completed"      },
  pending: { bg: "rgba(217,119,6,0.1)",  color: "#b45309", label: "On-Verification"},
  failed:  { bg: "rgba(220,38,38,0.1)",  color: "#b91c1c", label: "Failed"         },
};

// ── Custom tooltip for chart ──────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0d2818", border: "1px solid rgba(201,168,76,0.3)",
      borderRadius: 10, padding: "10px 16px", fontSize: 12,
    }}>
      <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color, fontFamily: "var(--font-sans)", fontWeight: 600 }}>
          {p.name === "gpa" ? "Your GPA" : "Dept Avg"}: {p.value.toFixed(2)}
        </p>
      ))}
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon, accent, href,
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ReactNode; accent: string; href?: string;
}) {
  const accentMap: Record<string, string> = {
    gold:    "#c9a84c",
    green:   "#2d6e47",
    danger:  "#dc2626",
    warning: "#d97706",
  };
  const color = accentMap[accent] ?? "#c9a84c";

  const inner = (
    <div style={{
      background: "#fff",
      border: "1px solid var(--color-cream-300)",
      borderLeft: `4px solid ${color}`,
      borderRadius: 12,
      padding: "20px 22px",
      boxShadow: "var(--shadow-xs)",
      transition: "all 0.2s",
      height: "100%",
      cursor: href ? "pointer" : "default",
    }}
    onMouseEnter={e => { if (href) { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; } }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xs)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: 6 }}>
            {label}
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "var(--fg-base)", lineHeight: 1 }}>
            {value}
          </p>
          {sub && <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fg-subtle)", marginTop: 5 }}>{sub}</p>}
        </div>
        <div style={{ padding: 10, borderRadius: 10, background: `${color}18`, color }}>
          {icon}
        </div>
      </div>
      {href && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 16, fontSize: 11, fontWeight: 700, color, fontFamily: "var(--font-sans)" }}>
          View details <LuArrowUpRight size={13} />
        </div>
      )}
    </div>
  );

  return href ? <Link href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</Link> : inner;
}

// ── Notification tab pills ────────────────────────────────────────────────────
const NOTIF_TABS = ["All Updates", "Assignments", "Materials", "Announcements"];

// ── Main component ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [notifTab, setNotifTab] = useState("All Updates");
  const [gpaRange, setGpaRange] = useState("All Semesters");
  const isRep = user.role === "class-rep" || user.role === "assistant-rep";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "28px 32px", background: "var(--color-cream-100)", minHeight: "100vh" }}>

      {/* ── Welcome banner ── */}
      <div style={{
        background: "linear-gradient(135deg, var(--color-green-900) 0%, var(--color-green-800) 100%)",
        borderRadius: 16,
        padding: "24px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
        boxShadow: "var(--shadow-md)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Avatar */}
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "var(--color-gold-500)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 20,
            color: "var(--color-green-900)",
            border: "3px solid rgba(201,168,76,0.4)",
            flexShrink: 0,
          }}>
            {initials(user.firstName, user.lastName)}
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
              Welcome back, {user.firstName} 👋
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>
              {user.matricNo} · {user.department} · {user.level}L
              {isRep && (
                <span style={{ marginLeft: 8, background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 999, padding: "2px 10px", color: "var(--color-gold-400)", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Class Rep
                </span>
              )}
            </p>
          </div>
        </div>
        {/* Quick CGPA */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Current CGPA</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 700, color: "var(--color-gold-400)", lineHeight: 1 }}>4.10</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.4)" }}>/5.00</span>
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(22,163,74,0.9)", marginTop: 3, fontWeight: 600 }}>
            ↑ First Class Honours
          </div>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <StatCard
          label="Enrolled Courses" value={6} sub="2024/2025 · 2nd Sem"
          icon={<LuBookOpen size={20} />} accent="gold" href="/academic/courses"
        />
        <StatCard
          label="Outstanding Fees" value="₦95,000" sub="Due: 31 May 2026"
          icon={<LuCreditCard size={20} />} accent="danger" href="/finance/fees"
        />
        <StatCard
          label="Unread Notices" value={3} sub="2 urgent"
          icon={<LuBell size={20} />} accent="warning" href="/communication/notifications"
        />
        <StatCard
          label="Next Class" value="CSC 301" sub="08:00 AM · CBT Lab 1"
          icon={<LuCalendarClock size={20} />} accent="green" href="/academic/timetable"
        />
      </div>

      {/* ── Main content: chart + notifications ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>

        {/* LEFT: GPA Chart */}
        <div style={{
          background: "#fff",
          border: "1px solid var(--color-cream-300)",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "var(--shadow-xs)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 24px 0", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: "var(--fg-base)" }}>Grade Point Average</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-muted)", marginTop: 3 }}>
                Your GPA vs department average across semesters
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["All Semesters", "This Session"].map(opt => (
                <button key={opt} onClick={() => setGpaRange(opt)} style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontFamily: "var(--font-sans)",
                  fontSize: 12, fontWeight: 600,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: gpaRange === opt ? "var(--color-green-900)" : "transparent",
                  borderColor: gpaRange === opt ? "var(--color-green-900)" : "var(--color-cream-300)",
                  color: gpaRange === opt ? "#fff" : "var(--fg-muted)",
                }}>{opt}</button>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div style={{ display: "flex", gap: 0, padding: "16px 24px", borderBottom: "1px solid var(--color-cream-200)" }}>
            {[
              { label: "Highest GPA", value: "4.10", color: "var(--color-green-700)", semester: "6th Sem" },
              { label: "Dept Average", value: "3.30", color: "var(--color-gold-700)", semester: "6th Sem" },
              { label: "Improvement", value: "+0.80",color: "var(--color-success)",    semester: "vs Dept" },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, paddingInline: 16, borderLeft: i > 0 ? "1px solid var(--color-cream-200)" : "none" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--fg-subtle)", marginTop: 3 }}>{s.semester}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "8px 8px 20px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={gpaData} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,40,24,0.06)" />
                <XAxis dataKey="semester" tick={{ fontFamily: "var(--font-sans)", fontSize: 11, fill: "#8aab95" }} axisLine={false} tickLine={false} />
                <YAxis domain={[2.0, 5.0]} tick={{ fontFamily: "var(--font-sans)", fontSize: 11, fill: "#8aab95" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={4.5} stroke="rgba(201,168,76,0.3)" strokeDasharray="4 4" label={{ value: "First Class", position: "right", fontSize: 10, fill: "#c9a84c", fontFamily: "var(--font-sans)" }} />
                <Line type="monotone" dataKey="gpa" name="gpa" stroke="#2d6e47" strokeWidth={2.5} dot={{ fill: "#2d6e47", r: 4, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="average" name="average" stroke="#c9a84c" strokeWidth={2} strokeDasharray="5 4" dot={{ fill: "#c9a84c", r: 3, strokeWidth: 2, stroke: "#fff" }} />
                <Legend formatter={(v) => v === "gpa" ? "Your GPA" : "Dept Average"} wrapperStyle={{ fontFamily: "var(--font-sans)", fontSize: 12, paddingTop: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Notifications panel */}
        <div style={{
          background: "#fff",
          border: "1px solid var(--color-cream-300)",
          borderRadius: 14,
          display: "flex", flexDirection: "column",
          boxShadow: "var(--shadow-xs)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ padding: "18px 20px 0", borderBottom: "1px solid var(--color-cream-200)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: "var(--fg-base)" }}>Notifications</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "var(--color-green-700)", background: "none", border: "none", cursor: "pointer" }}>Mark all read</button>
                <button style={{ color: "var(--fg-muted)", background: "none", border: "none", cursor: "pointer" }}><LuMoreHorizontal size={16} /></button>
              </div>
            </div>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 0 }}>
              {NOTIF_TABS.map(tab => (
                <button key={tab} onClick={() => setNotifTab(tab)} style={{
                  padding: "7px 12px",
                  fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600,
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: notifTab === tab ? "2px solid var(--color-green-800)" : "2px solid transparent",
                  color: notifTab === tab ? "var(--color-green-800)" : "var(--fg-muted)",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}>{tab}</button>
              ))}
            </div>
          </div>

          {/* Notification list */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {notifications.map((n) => (
              <div key={n.id} style={{
                display: "flex", gap: 12, padding: "14px 20px",
                borderBottom: "1px solid var(--color-cream-200)",
                background: n.read ? "#fff" : "rgba(201,168,76,0.04)",
                borderLeft: n.read ? "3px solid transparent" : "3px solid var(--color-gold-500)",
                cursor: "pointer", transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--color-cream-50)")}
              onMouseLeave={e => (e.currentTarget.style.background = n.read ? "#fff" : "rgba(201,168,76,0.04)")}
              >
                {/* Avatar */}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: n.avatarColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                }}>{n.emoji}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 700, color: "var(--fg-base)" }}>{n.actor}</span>
                    {" "}{n.action}
                  </p>
                  {/* Resource pill */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginTop: 6,
                    background: "var(--color-cream-100)",
                    borderRadius: 8, padding: "6px 10px",
                    border: "1px solid var(--color-cream-300)",
                  }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--fg-base)" }}>{n.resource}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--fg-subtle)", marginTop: 1 }}>{n.resourceType}</p>
                    </div>
                    <button style={{ color: "var(--fg-subtle)", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
   <LuDownload size={14} />
                    </button>
                  </div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--fg-placeholder)", marginTop: 5 }}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding: "12px 20px", borderTop: "1px solid var(--color-cream-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Link href="/communication/notifications" style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--color-green-700)", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
              View all notifications <LuChevronDown size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom row: Payments + Timetable + Announcements ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

        {/* Payment table */}
        <div style={{
          background: "#fff",
          border: "1px solid var(--color-cream-300)",
          borderRadius: 14,
          boxShadow: "var(--shadow-xs)",
          overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid var(--color-cream-200)" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: "var(--fg-base)" }}>Payment & Fee History</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>Complete record of your tuition and levy payments</p>
            </div>
            <Link href="/finance/fees" style={{
              fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
              color: "var(--color-green-900)", background: "var(--color-cream-100)",
              border: "1px solid var(--color-cream-300)", borderRadius: 8,
              padding: "7px 14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5,
            }}>View All <LuArrowUpRight size={13} /></Link>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-cream-50)" }}>
                {["Payment ID", "Category", "Date", "Amount", "Status", ""].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px", textAlign: "left",
                    fontFamily: "var(--font-sans)", fontSize: 10,
                    fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--fg-subtle)",
                    borderBottom: "1px solid var(--color-cream-200)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => {
                const s = STATUS_STYLE[p.status];
                return (
                  <tr key={p.id} style={{ borderBottom: i < payments.length - 1 ? "1px solid var(--color-cream-100)" : "none", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--color-cream-50)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                  >
                    <td style={{ padding: "13px 16px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)" }}>{p.id}</td>
                    <td style={{ padding: "13px 16px", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--fg-base)" }}>{p.category}</td>
                    <td style={{ padding: "13px 16px", fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-muted)" }}>{p.date}</td>
                    <td style={{ padding: "13px 16px", fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--fg-base)" }}>{formatNGN(p.amount)}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{
                        background: s.bg, color: s.color,
                        fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                        borderRadius: 999, padding: "4px 12px",
                        display: "inline-block",
                      }}>{s.label}</span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <button style={{ color: "var(--fg-subtle)", background: "none", border: "none", cursor: "pointer" }}>
                        <LuExternalLink size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right column: Timetable + Announcements */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Today's timetable */}
          <div style={{
            background: "#fff",
            border: "1px solid var(--color-cream-300)",
            borderRadius: 14,
            boxShadow: "var(--shadow-xs)",
            overflow: "hidden",
            flex: 1,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", borderBottom: "1px solid var(--color-cream-200)" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: "var(--fg-base)" }}>Today's Classes</h2>
              <Link href="/academic/timetable" style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "var(--color-green-700)", textDecoration: "none" }}>Full schedule</Link>
            </div>
            <div>
              {todayCourses.map((c, i) => (
                <div key={c.code} style={{
                  display: "flex", gap: 12, padding: "13px 18px",
                  borderBottom: i < todayCourses.length - 1 ? "1px solid var(--color-cream-100)" : "none",
                  transition: "background 0.15s", cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--color-cream-50)")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                >
                  {/* Time indicator */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: "rgba(201,168,76,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--color-gold-600)",
                  }}>
                    <LuClock size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--color-green-800)" }}>{c.code}</p>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--fg-subtle)", background: "var(--color-cream-100)", borderRadius: 4, padding: "2px 6px" }}>{c.credits} CU</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: "var(--fg-base)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fg-subtle)", marginTop: 2 }}>{c.time} · {c.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div style={{
            background: "#fff",
            border: "1px solid var(--color-cream-300)",
            borderRadius: 14,
            boxShadow: "var(--shadow-xs)",
            overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--color-cream-200)" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: "var(--fg-base)" }}>Announcements</h2>
              <Link href="/communication/announcements" style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "var(--color-green-700)", textDecoration: "none" }}>View all</Link>
            </div>
            {announcements.map((a, i) => (
              <div key={a.id} style={{
                display: "flex", gap: 10, padding: "11px 18px",
                borderBottom: i < announcements.length - 1 ? "1px solid var(--color-cream-100)" : "none",
                cursor: "pointer", transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--color-cream-50)")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                <div style={{ marginTop: 2, flexShrink: 0, color: a.urgent ? "var(--color-danger)" : "var(--fg-muted)" }}>
                  {a.urgent ? <LuCircleAlert size={15} /> : <LuMegaphone size={14} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "var(--font-sans)", fontSize: 12,
                    fontWeight: a.urgent ? 700 : 500,
                    color: "var(--fg-base)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{a.title}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--fg-placeholder)", marginTop: 2 }}>{a.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Class rep quick actions */}
          {isRep && (
            <div style={{
              background: "var(--color-green-900)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 14,
              padding: "16px 18px",
              boxShadow: "var(--shadow-xs)",
            }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 600, color: "var(--color-gold-400)", marginBottom: 12 }}>Rep Actions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { href: "/communication/announcements/new", icon: <LuMegaphone size={14} />, label: "Post Announcement" },
                  { href: "/communication/whatsapp-links",    icon: <LuBell size={14} />,      label: "Update WhatsApp Links" },
                  { href: "/services/election",               icon: <LuCircleCheck size={14} />,label: "Manage Elections" },
                ].map(a => (
                  <Link key={a.href} href={a.href} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 12px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)"; (e.currentTarget as HTMLElement).style.color = "var(--color-gold-300)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
                  >
                    {a.icon} {a.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}