/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/portal/Sidebar";
import { Topbar } from "@/components/portal/Topbar";
import { NotificationPanel } from "@/components/portal/NotificationPanel";
import { useNotifications } from "@/hooks/useNotifications";
import { PageSpinner } from "@kwasu-portal/components";
import { useAuth } from "@/context/AuthContext";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading: loading } = useAuth();
  const { unreadCount } = useNotifications(user?.id);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (e.matches) {
        setSidebarCollapsed(true);
      } else {
      }
    };

    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarCollapsed(false);
  }, [isMobile]);

  if (loading) return <PageSpinner label="Loading portal…" />;

  if (!user) return null;

  const sidebarWidth = isMobile ? 0 : sidebarCollapsed ? 72 : 260;

  return (
    <div className="min-h-screen bg-bg-base">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onCollapse={setSidebarCollapsed}
        onMobileClose={() => setMobileMenuOpen(false)}
        unreadCount={unreadCount}
      />

      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Topbar
          sidebarCollapsed={sidebarCollapsed}
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
          onNotifOpen={() => setNotifOpen(true)}
          unreadCount={unreadCount}
          isMobile={isMobile}
        />

        <main
          // id="main-content"
          className="flex-1 p-6 lg:p-8"
        >
          {children}
        </main>

        <footer className="shrink-0 px-8 py-4 border-t border-border-subtle bg-bg-surface">
          <p className="font-sans text-xs text-fg-subtle">
            © {new Date().getFullYear()} Kwara State University · Student Portal
            <span className="mx-2 opacity-40">·</span>
            <a
              href="/services/tickets"
              className="hover:text-fg-base transition-colors"
              style={{ textDecoration: "none" }}
            >
              Support
            </a>
            <span className="mx-2 opacity-40">·</span>
            <a
              href="/settings"
              className="hover:text-fg-base transition-colors"
              style={{ textDecoration: "none" }}
            >
              Settings
            </a>
          </p>
        </footer>
      </div>

      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
}
