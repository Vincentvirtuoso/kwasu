"use client";
import { useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@kwasu-portal/utils-others";

type DrawerSide = "right" | "left" | "bottom";

const SIDE_CLASSES: Record<DrawerSide, { panel: string; animation: string }> = {
  right: {
    panel: "right-0 top-0 bottom-0 w-full max-w-[420px]",
    animation: "animate-[slide-in-right_300ms_var(--ease-out)_both]",
  },
  left: {
    panel: "left-0 top-0 bottom-0 w-full max-w-[420px]",
    animation: "animate-[slide-in-left_300ms_var(--ease-out)_both]",
  },
  bottom: {
    panel: "bottom-0 left-0 right-0 max-h-[90vh]",
    animation: "animate-[slide-up_300ms_var(--ease-out)_both]",
  },
};

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  footer,
  className,
}: DrawerProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  if (!open) return null;

  const { panel, animation } = SIDE_CLASSES[side];

  return (
    <div className="fixed inset-0 z-[var(--z-overlay)] animate-[fade-in_150ms_ease_both]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute flex flex-col overflow-hidden",
          "bg-[var(--bg-surface)] shadow-[var(--shadow-2xl)]",
          side === "bottom" ? "rounded-t-2xl" : "rounded-none",
          panel,
          animation,
          className,
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 px-6 py-5 border-b border-[var(--border-base)]">
          {title ? (
            <h2 className="font-serif text-xl font-semibold text-[var(--fg-base)]">
              {title}
            </h2>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded-lg p-1.5 text-[var(--fg-subtle)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg-base)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 px-6 py-4 border-t border-[var(--border-base)] bg-[var(--bg-elevated)] flex gap-3 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
