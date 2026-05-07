"use client";
import { cn } from "@kwasu-portal/utils-others";
import type { ReactNode } from "react";

interface DividerProps {
  label?: ReactNode;
  orientation?: "horizontal" | "vertical";
  dashed?: boolean;
  className?: string;
}

export function Divider({
  label,
  orientation = "horizontal",
  dashed = false,
  className,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "self-stretch w-px bg-[var(--border-base)]",
          dashed &&
            "border-l border-dashed border-[var(--border-base)] bg-transparent w-0",
          className,
        )}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn("flex items-center gap-4 my-6", className)}
      >
        <div
          className={cn(
            "flex-1 h-px bg-[var(--border-base)]",
            dashed &&
              "border-t border-dashed border-[var(--border-base)] bg-transparent h-0",
          )}
        />
        <span className="font-sans text-xs font-semibold text-[var(--fg-subtle)] uppercase tracking-widest shrink-0">
          {label}
        </span>
        <div
          className={cn(
            "flex-1 h-px bg-[var(--border-base)]",
            dashed &&
              "border-t border-dashed border-[var(--border-base)] bg-transparent h-0",
          )}
        />
      </div>
    );
  }

  return (
    <hr
      aria-hidden="true"
      className={cn(
        "border-none my-6",
        dashed
          ? "border-t border-dashed border-[var(--border-base)]"
          : "h-px bg-[var(--border-base)]",
        className,
      )}
    />
  );
}
