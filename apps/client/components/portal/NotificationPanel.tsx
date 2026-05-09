"use client";
import { useEffect, useRef } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/hooks/useAuth";
import { formatTimeAgo } from "@kwasu-portal/utils-others";
import type { Notification } from "@kwasu-portal/types";
import { NotificationEvent } from "@kwasu-portal/types";

function getEventMeta(event: NotificationEvent): {
  icon: string;
  bg: string;
  color: string;
} {
  const academic = {
    icon: "📚",
    bg: "rgba(37,99,235,0.10)",
    color: "var(--color-info)",
  };
  const finance = {
    icon: "💳",
    bg: "rgba(22,163,74,0.10)",
    color: "var(--color-success)",
  };
  const announce = {
    icon: "📢",
    bg: "rgba(201,168,76,0.12)",
    color: "var(--color-gold-600)",
  };
  const service = {
    icon: "🔔",
    bg: "rgba(217,119,6,0.10)",
    color: "var(--color-warning)",
  };
  const alert = {
    icon: "⚠",
    bg: "rgba(220,38,38,0.10)",
    color: "var(--color-danger)",
  };

  const map: Partial<Record<NotificationEvent, typeof academic>> = {
    [NotificationEvent.MATERIAL_UPLOADED]: academic,
    [NotificationEvent.ASSIGNMENT_POSTED]: academic,
    [NotificationEvent.ASSIGNMENT_GRADED]: academic,
    [NotificationEvent.RESULT_PUBLISHED]: academic,
    [NotificationEvent.TIMETABLE_UPDATED]: academic,
    [NotificationEvent.COURSE_UPDATED]: academic,
    [NotificationEvent.CLASS_CANCELLED]: alert,
    [NotificationEvent.CLASS_RESCHEDULED]: alert,
    [NotificationEvent.ANNOUNCEMENT_APPROVED]: announce,
    [NotificationEvent.ANNOUNCEMENT_PENDING]: announce,
    [NotificationEvent.ANNOUNCEMENT_REJECTED]: alert,
    [NotificationEvent.FEE_REMINDER]: finance,
    [NotificationEvent.PAYMENT_CONFIRMED]: finance,
    [NotificationEvent.INVOICE_GENERATED]: finance,
    [NotificationEvent.CLEARANCE_UPDATE]: service,
    [NotificationEvent.HOSTEL_ALLOCATED]: service,
    [NotificationEvent.ELECTION_OPEN]: announce,
    [NotificationEvent.ELECTION_CLOSED]: announce,
    [NotificationEvent.TICKET_UPDATE]: service,
    [NotificationEvent.SIWES_UPDATE]: service,
  };

  return map[event] ?? service;
}

function NotifItem({
  notif,
  onRead,
}: {
  notif: Notification;
  onRead: (id: string) => void;
}) {
  const meta = getEventMeta(notif.event);

  return (
    <button
      onClick={() => !notif.read && onRead(notif.id)}
      className={`
        w-full flex items-start gap-3 px-6 py-4 text-left
        border-b border-border-subtle last:border-b-0
        transition-colors duration-100
        ${
          notif.read
            ? "hover:bg-bg-elevated"
            : "bg-[rgba(201,168,76,0.04)] border-l-2 border-l-color-gold-500 hover:bg-[rgba(201,168,76,0.07)]"
        }
      `}
    >
      {/* Icon */}
      <div
        className="shrink-0 mt-0.5 flex items-center justify-center rounded-xl text-base"
        style={{
          width: 38,
          height: 38,
          background: meta.bg,
          color: meta.color,
        }}
        aria-hidden="true"
      >
        {meta.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`
              font-sans text-sm leading-snug truncate
              ${notif.read ? "font-medium text-fg-base" : "font-semibold text-fg-base"}
            `}
          >
            {notif.title}
          </p>
          {!notif.read && (
            <span
              aria-label="Unread"
              className="shrink-0 mt-1 h-2 w-2 rounded-full bg-color-gold-500"
            />
          )}
        </div>
        <p className="font-sans text-xs text-fg-subtle mt-0.5 leading-relaxed line-clamp-2">
          {notif.body}
        </p>
        <time
          dateTime={new Date(notif.createdAt).toISOString()}
          className="font-mono text-[10px] text-fg-placeholder mt-1.5 block"
        >
          {formatTimeAgo(notif.createdAt)}
        </time>
      </div>
    </button>
  );
}

function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div
        className="mb-4 flex items-center justify-center rounded-2xl text-3xl"
        style={{ width: 64, height: 64, background: "var(--bg-elevated)" }}
        aria-hidden="true"
      >
        🔔
      </div>
      <h3 className="font-serif text-lg font-semibold text-fg-base mb-1">
        All caught up!
      </h3>
      <p className="font-sans text-sm text-fg-muted">
        No new notifications right now.
      </p>
    </div>
  );
}

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const { user } = useAuth();
  const { notifications, unreadCount, markRead } = useNotifications(user?.id);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Focus trap — focus panel on open
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-390 bg-black/20 backdrop-blur-[2px] animate-[fade-in_150ms_ease_both]"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
        className={`
          fixed top-0 right-0 bottom-0 z-400
          flex flex-col w-full max-w-100
          bg-bg-surface border-l border-border-base
          shadow-shadow-2xl
          animate-[slide-in-right_300ms_var(--ease-out)_both]
          outline-none
        `}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-5 border-b border-border-base">
          <div>
            <h2 className="font-serif text-xl font-semibold text-fg-base">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <p className="font-sans text-xs text-fg-muted mt-0.5">
                {unreadCount} unread
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={() => unread.forEach((n) => markRead(n.id))}
                className="font-sans text-xs font-semibold text-color-green-700 hover:underline"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close notifications"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-fg-subtle hover:bg-bg-elevated hover:text-fg-base transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <EmptyNotifications />
          ) : (
            <>
              {/* Unread */}
              {unread.length > 0 && (
                <div>
                  <div className="sticky top-0 px-6 py-2.5 bg-bg-elevated border-b border-border-subtle">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-fg-subtle">
                      New
                    </span>
                  </div>
                  {unread.map((n) => (
                    <NotifItem key={n.id} notif={n} onRead={markRead} />
                  ))}
                </div>
              )}

              {/* Earlier */}
              {read.length > 0 && (
                <div>
                  <div className="sticky top-0 px-6 py-2.5 bg-bg-elevated border-b border-border-subtle">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-fg-subtle">
                      Earlier
                    </span>
                  </div>
                  {read.map((n) => (
                    <NotifItem key={n.id} notif={n} onRead={markRead} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border-base px-6 py-4 bg-bg-elevated">
          <a
            href="/communication/notifications"
            className="font-sans text-sm font-semibold text-color-green-700 hover:underline"
            onClick={onClose}
          >
            View all notifications →
          </a>
        </div>
      </div>
    </>
  );
}
