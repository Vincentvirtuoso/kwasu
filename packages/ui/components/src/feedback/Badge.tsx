"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@kwasu-portal/utils-others";
import type { HTMLAttributes, ReactNode } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border font-sans font-semibold uppercase tracking-wide whitespace-nowrap",
  {
    variants: {
      variant: {
        success:
          "bg-[var(--color-success-bg)]  border-[var(--color-success-light)]  text-[var(--color-success-dark)]",
        primary: "bg-black/65 backdrop-blur-md text-gold-400",
        warning:
          "bg-[var(--color-warning-bg)]  border-[var(--color-warning-light)]  text-[var(--color-warning-dark)]",
        danger:
          "bg-[var(--color-danger-bg)]   border-[var(--color-danger-light)]   text-[var(--color-danger-dark)]",
        info: "bg-[var(--color-info-bg)]      border-[var(--color-info-light)]     text-[var(--color-info-dark)]",
        gold: "bg-[var(--color-gold-50)]      border-[var(--color-gold-200)]       text-[var(--color-gold-800)]",
        green:
          "bg-[var(--color-green-100)]    border-[var(--color-green-200)]      text-[var(--color-green-800)]",
        neutral:
          "bg-[var(--color-neutral-100)]  border-[var(--color-neutral-200)]    text-[var(--color-neutral-700)]",
        dark: "bg-[var(--color-green-900)]    border-[var(--color-green-900)]      text-[var(--color-gold-400)]",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] leading-4",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1   text-xs",
      },
      dot: {
        true: "",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
  icon?: ReactNode;
  onRemove?: () => void;
}

const DOT_COLORS: Record<string, string> = {
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  danger: "bg-[var(--color-danger)]",
  info: "bg-[var(--color-info)]",
  gold: "bg-[var(--color-gold-500)]",
  green: "bg-[var(--color-green-700)]",
  neutral: "bg-[var(--color-neutral-400)]",
  dark: "bg-[var(--color-gold-400)]",
};

export function Badge({
  variant = "neutral",
  size,
  dot,
  icon,
  onRemove,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-block rounded-full shrink-0",
            size === "lg" ? "h-2 w-2" : "h-1.5 w-1.5",
            DOT_COLORS[variant ?? "neutral"],
          )}
        />
      )}
      {icon && (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      )}
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="ml-0.5 shrink-0 rounded-full opacity-60 hover:opacity-100 transition-opacity leading-none"
        ></button>
      )}
    </span>
  );
}
