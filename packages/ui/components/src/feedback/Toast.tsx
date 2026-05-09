"use client";
import { cn } from "@kwasu-portal/utils-others";
import type { ReactNode } from "react";

type ToastVariant = "success" | "warning" | "danger" | "info" | "neutral";

const ACCENT: Record<ToastVariant, string> = {
  success: "border-l-[var(--color-success)]",
  warning: "border-l-[var(--color-warning)]",
  danger: "border-l-[var(--color-danger)]",
  info: "border-l-[var(--color-info)]",
  neutral: "border-l-[var(--border-strong)]",
};

const ICON_COLOR: Record<ToastVariant, string> = {
  success: "text-[var(--color-success)]",
  warning: "text-[var(--color-warning)]",
  danger: "text-[var(--color-danger)]",
  info: "text-[var(--color-info)]",
  neutral: "text-[var(--fg-muted)]",
};

const DEFAULT_ICONS: Record<ToastVariant, string> = {
  success: "✓",
  warning: "⚠",
  danger: "✕",
  info: "ℹ",
  neutral: "•",
};

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  body?: string;
  icon?: ReactNode;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  className?: string;
}

export function Toast({
  variant = "neutral",
  title,
  body,
  icon,
  action,
  onDismiss,
  className,
}: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-l-4 p-4",
        "bg-[var(--bg-surface)] shadow-[var(--shadow-xl)]",
        "w-[360px] max-w-[calc(100vw-48px)]",
        "animate-[notif-enter_0.35s_var(--ease-bounce)_both]",
        ACCENT[variant],
        className,
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          "mt-0.5 shrink-0 text-base font-bold leading-none",
          ICON_COLOR[variant],
        )}
        aria-hidden="true"
      >
        {icon ?? DEFAULT_ICONS[variant]}
      </span>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-semibold text-[var(--fg-base)]">
          {title}
        </p>
        {body && (
          <p className="font-sans text-xs text-[var(--fg-muted)] mt-0.5 leading-relaxed">
            {body}
          </p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 font-sans text-xs font-semibold text-[var(--color-green-700)] hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 ml-1 text-lg leading-none font-light text-[var(--fg-subtle)] opacity-50 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      )}
    </div>
  );
}

/** Fixed container — place once in your layout */
export function ToastContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-label="Notifications"
      className={cn(
        "fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col gap-2 items-end",
        className,
      )}
    >
      {children}
    </div>
  );
}
