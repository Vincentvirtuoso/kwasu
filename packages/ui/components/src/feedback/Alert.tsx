"use client";
import { cn } from "@kwasu-portal/utils-others";
import type { HTMLAttributes, ReactNode } from "react";
import { LuCheck, LuDot, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";

type AlertVariant = "success" | "warning" | "danger" | "info" | "neutral";

const STYLES: Record<
  AlertVariant,
  { wrapper: string; icon: string; title: string; body: string }
> = {
  success: {
    wrapper: "bg-success-bg  border-success-light  text-success-dark",
    icon: "text-success",
    title: "text-success-dark",
    body: "text-success-dark opacity-80",
  },
  warning: {
    wrapper: "bg-warning-bg  border-warning-light  text-warning-dark",
    icon: "text-warning",
    title: "text-warning-dark",
    body: "text-warning-dark opacity-80",
  },
  danger: {
    wrapper: "bg-danger-bg   border-danger-light   text-danger-dark",
    icon: "text-danger",
    title: "text-danger-dark",
    body: "text-danger-dark opacity-80",
  },
  info: {
    wrapper: "bg-info-bg     border-info-light     text-info-dark",
    icon: "text-info",
    title: "text-info-dark",
    body: "text-info-dark opacity-80",
  },
  neutral: {
    wrapper: "bg-bg-elevated  border-border-base  text-fg-base",
    icon: "text-fg-muted",
    title: "text-fg-base",
    body: "text-fg-muted",
  },
};

const DEFAULT_ICONS: Record<AlertVariant, ReactNode> = {
  success: <LuCheck />,
  warning: <LuTriangleAlert />,
  danger: <LuX />,
  info: <LuInfo />,
  neutral: <LuDot />,
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
      className={cn(
        "flex gap-3 rounded-xl border p-4 items-center",
        s.wrapper,
        className,
      )}
      {...props}
    >
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

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn(
            "shrink-0 ml-1 opacity-50 hover:opacity-100 transition-opacity text-lg leading-none font-light",
            s.icon,
          )}
        >
          <LuX />
        </button>
      )}
    </div>
  );
}
