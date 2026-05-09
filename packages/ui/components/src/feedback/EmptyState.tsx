"use client";
import { cn } from "@kwasu-portal/utils-others";
import type { ReactNode } from "react";

type EmptyStateVariant = "first-run" | "no-results" | "error" | "filtered";

interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
}

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: ReactNode;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
  filterLabel?: string;
  errorDetail?: string;
  onRetry?: () => void;
  onClearFilter?: () => void;
}

const DEFAULTS: Record<
  EmptyStateVariant,
  {
    icon: string;
    title: string;
    description: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  "first-run": {
    icon: "🚀",
    title: "Welcome — let's get you started",
    description: "Nothing here yet. Complete your setup to see your content.",
    iconBg: "bg-[var(--color-green-100)]",
    iconColor: "text-[var(--color-green-800)]",
  },
  "no-results": {
    icon: "📭",
    title: "Nothing here yet",
    description: "There's no content to show right now. Check back later.",
    iconBg: "bg-[var(--color-cream-200)]",
    iconColor: "text-[var(--color-green-700)]",
  },
  error: {
    icon: "⚠",
    title: "Something went wrong",
    description: "We couldn't load this content. Please try again.",
    iconBg: "bg-[var(--color-danger-bg)]",
    iconColor: "text-[var(--color-danger)]",
  },
  filtered: {
    icon: "🔍",
    title: "No matches found",
    description:
      "No results match your current filters. Try adjusting or clearing them.",
    iconBg: "bg-[var(--color-info-bg)]",
    iconColor: "text-[var(--color-info)]",
  },
};

function ActionBtn({ action }: { action: EmptyStateAction }) {
  const base =
    "inline-flex items-center gap-2 rounded-lg font-sans text-sm font-semibold transition-all duration-150 px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]";

  const variantClass = {
    primary:
      "bg-[var(--color-gold-500)] text-[var(--color-green-900)] hover:bg-[var(--color-gold-300)] hover:shadow-[var(--shadow-gold)]",
    outline:
      "border border-[var(--border-strong)] text-[var(--fg-base)] hover:bg-[var(--bg-elevated)]",
    ghost:
      "text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg-base)]",
  }[action.variant ?? "primary"];

  if (action.href) {
    return (
      <a href={action.href} className={cn(base, variantClass)}>
        {action.label}
      </a>
    );
  }

  return (
    <button onClick={action.onClick} className={cn(base, variantClass)}>
      {action.label}
    </button>
  );
}

function FirstRunContent() {
  return (
    <ul className="mt-2 space-y-1.5 text-left">
      {[
        "Complete your profile information",
        "Register your courses for the session",
        "Set your notification preferences",
      ].map((step, i) => (
        <li
          key={step}
          className="flex items-start gap-2.5 font-sans text-sm text-[var(--fg-muted)]"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-green-900)] font-mono text-[10px] font-bold text-[var(--color-gold-400)]">
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ul>
  );
}

function ErrorContent({
  detail,
  onRetry,
}: {
  detail?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mt-3 w-full space-y-3">
      {detail && (
        <div className="rounded-lg bg-[var(--color-danger-bg)] border border-[var(--color-danger-light)] px-4 py-2.5 text-left">
          <p className="font-mono text-xs text-[var(--color-danger-dark)] break-all">
            {detail}
          </p>
        </div>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-danger-light)] bg-[var(--color-danger-bg)] px-4 py-2 font-sans text-sm font-semibold text-[var(--color-danger-dark)] hover:bg-[var(--color-danger-light)] transition-colors"
        >
          ↺ Try again
        </button>
      )}
    </div>
  );
}

function FilteredContent({
  filterLabel,
  onClearFilter,
}: {
  filterLabel?: string;
  onClearFilter?: () => void;
}) {
  return (
    <div className="mt-3 flex flex-col items-center gap-3">
      {filterLabel && (
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-info-light)] bg-[var(--color-info-bg)] px-3 py-1">
          <span className="font-sans text-xs text-[var(--color-info-dark)]">
            Filter: <strong>{filterLabel}</strong>
          </span>
          {onClearFilter && (
            <button
              onClick={onClearFilter}
              aria-label="Clear filter"
              className="text-[var(--color-info)] opacity-70 hover:opacity-100 text-sm leading-none font-bold"
            >
              ×
            </button>
          )}
        </div>
      )}
      {onClearFilter && (
        <button
          onClick={onClearFilter}
          className="font-sans text-sm font-semibold text-[var(--color-green-700)] hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  variant = "no-results",
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  filterLabel,
  errorDetail,
  onRetry,
  onClearFilter,
  className,
}: EmptyStateProps) {
  const d = DEFAULTS[variant];

  const resolvedTitle = title ?? d.title;
  const resolvedDescription = description ?? d.description;
  const resolvedIcon = icon ?? d.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center px-6 py-16",
        className,
      )}
      role="status"
      aria-label={resolvedTitle}
    >
      {/* Icon */}
      <div
        className={cn(
          "mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl",
          d.iconBg,
          d.iconColor,
        )}
      >
        {typeof resolvedIcon === "string" ? (
          <span aria-hidden="true">{resolvedIcon}</span>
        ) : (
          resolvedIcon
        )}
      </div>

      {/* Text */}
      <h3 className="font-serif text-xl font-semibold text-[var(--fg-base)] mb-2 leading-snug">
        {resolvedTitle}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-[var(--fg-muted)] max-w-sm">
        {resolvedDescription}
      </p>

      {/* Variant-specific extra content */}
      {variant === "first-run" && <FirstRunContent />}
      {variant === "error" && (
        <ErrorContent detail={errorDetail} onRetry={onRetry} />
      )}
      {variant === "filtered" && (
        <FilteredContent
          filterLabel={filterLabel}
          onClearFilter={onClearFilter}
        />
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {primaryAction && <ActionBtn action={primaryAction} />}
          {secondaryAction && (
            <ActionBtn action={{ variant: "outline", ...secondaryAction }} />
          )}
        </div>
      )}
    </div>
  );
}
