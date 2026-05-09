"use client";
import { useState } from "react";
import { cn } from "@kwasu-portal/utils-others";

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

export function CopyButton({
  text,
  label,
  size = "md",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md font-sans font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]",
        size === "sm" ? "h-7 px-2.5 text-xs" : "h-9 px-3 text-sm",
        copied
          ? "bg-[var(--color-success-bg)] text-[var(--color-success-dark)] border border-[var(--color-success-light)]"
          : "bg-[var(--bg-elevated)] text-[var(--fg-muted)] border border-[var(--border-base)] hover:border-[var(--border-focus)] hover:text-[var(--fg-base)]",
        className,
      )}
    >
      <span aria-hidden="true">{copied ? "✓" : "⎘"}</span>
      {label && <span>{copied ? "Copied!" : label}</span>}
    </button>
  );
}
