"use client";
import { cn } from "@kwasu-portal/utils-others";
import type { HTMLAttributes, ReactNode } from "react";

type AlertVariant = "success" | "warning" | "danger" | "info" | "neutral";

const STYLES: Record<
  AlertVariant,
  { wrapper: string; icon: string; title: string; body: string }
> = {
  success: {
    wrapper:
      "bg-[var(--color-success-bg)]  border-[var(--color-success-light)]  text-[var(--color-success-dark)]",
    icon: "text-[var(--color-success)]",
    title: "text-[var(--color-success-dark)]",
    body: "text-[var(--color-success-dark)] opacity-80",
  },
  warning: {
    wrapper:
      "bg-[var(--color-warning-bg)]  border-[var(--color-warning-light)]  text-[var(--color-warning-dark)]",
    icon: "text-[var(--color-warning)]",
    title: "text-[var(--color-warning-dark)]",
    body: "text-[var(--color-warning-dark)] opacity-80",
  },
  danger: {
    wrapper:
      "bg-[var(--color-danger-bg)]   border-[var(--color-danger-light)]   text-[var(--color-danger-dark)]",
    icon: "text-[var(--color-danger)]",
    title: "text-[var(--color-danger-dark)]",
    body: "text-[var(--color-danger-dark)] opacity-80",
  },
  info: {
    wrapper:
      "bg-[var(--color-info-bg)]     border-[var(--color-info-light)]     text-[var(--color-info-dark)]",
    icon: "text-[var(--color-info)]",
    title: "text-[var(--color-info-dark)]",
    body: "text-[var(--color-info-dark)] opacity-80",
  },
  neutral: {
    wrapper:
      "bg-[var(--bg-elevated)]  border-[var(--border-base)]  text-[var(--fg-base)]",
    icon: "text-[var(--fg-muted)]",
    title: "text-[var(--fg-base)]",
    body: "text-[var(--fg-muted)]",
  },
};

const DEFAULT_ICONS: Record<AlertVariant, string> = {
  success: "✓",
  warning: "⚠",
  danger: "✕",
  info: "ℹ",
  neutral: "•",
};

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode;
  hideIcon?: boolean;
  onDismiss?: () => void;
  actions?: ReactNode;
}

export function Alert({
  variant = "neutral",
  title,
  icon,
  hideIcon = false,
  onDismiss,
  actions,
  children,
  className,
  ...props
}: AlertProps) {
  const s = STYLES[variant];

  return (
    <div
      role="alert"
      className={cn("flex gap-3 rounded-xl border p-4", s.wrapper, className)}
      {...props}
    >
      {/* Icon */}
      {!hideIcon && (
        <span
          className={cn(
            "mt-0.5 shrink-0 text-base leading-none font-bold",
            s.icon,
          )}
          aria-hidden="true"
        >
          {icon ?? DEFAULT_ICONS[variant]}
        </span>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn("font-sans text-sm font-semibold mb-0.5", s.title)}>
            {title}
          </p>
        )}
        {children && (
          <div className={cn("font-sans text-sm leading-relaxed", s.body)}>
            {children}
          </div>
        )}
        {actions && <div className="mt-3 flex gap-2">{actions}</div>}
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn(
            "shrink-0 ml-1 opacity-50 hover:opacity-100 transition-opacity text-lg leading-none font-light",
            s.icon,
          )}
        >
          ×
        </button>
      )}
    </div>
  );
}
