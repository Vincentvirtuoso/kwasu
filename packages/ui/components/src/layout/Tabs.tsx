"use client";
import { useState, type ReactNode } from "react";
import { cn } from "@kwasu-portal/utils-others";

type TabsVariant = "underline" | "pill" | "card";

interface Tab {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: TabsVariant;
  onChange?: (key: string) => void;
  className?: string;
  listClassName?: string;
}

const VARIANT_LIST: Record<TabsVariant, string> = {
  underline: "border-b border-[var(--border-base)] gap-0",
  pill: "gap-1 bg-[var(--bg-elevated)] p-1 rounded-xl",
  card: "gap-0 border border-[var(--border-base)] rounded-xl overflow-hidden",
};

const VARIANT_TRIGGER: Record<
  TabsVariant,
  { base: string; active: string; inactive: string }
> = {
  underline: {
    base: "px-4 py-2.5 -mb-px border-b-2 font-sans text-sm font-medium transition-all duration-150",
    active:
      "border-[var(--color-green-800)] text-[var(--color-green-800)] font-semibold",
    inactive:
      "border-transparent text-[var(--fg-muted)] hover:text-[var(--fg-base)] hover:border-[var(--border-base)]",
  },
  pill: {
    base: "px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-150",
    active:
      "bg-[var(--bg-surface)] text-[var(--fg-base)] shadow-[var(--shadow-sm)] font-semibold",
    inactive: "text-[var(--fg-muted)] hover:text-[var(--fg-base)]",
  },
  card: {
    base: "px-5 py-3 font-sans text-sm font-medium border-r border-[var(--border-base)] last:border-r-0 transition-all duration-150",
    active: "bg-[var(--bg-surface)] text-[var(--fg-base)] font-semibold",
    inactive:
      "bg-[var(--bg-elevated)] text-[var(--fg-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--fg-base)]",
  },
};

export function Tabs({
  tabs,
  defaultTab,
  variant = "underline",
  onChange,
  className,
  listClassName,
}: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key ?? "");

  const handleChange = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  const s = VARIANT_TRIGGER[variant];
  const activeTab = tabs.find((t) => t.key === active);

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Tab list */}
      <div
        role="tablist"
        className={cn(
          "flex items-stretch",
          VARIANT_LIST[variant],
          listClassName,
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            aria-controls={`tabpanel-${tab.key}`}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleChange(tab.key)}
            className={cn(
              s.base,
              "inline-flex items-center gap-2 whitespace-nowrap",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              active === tab.key ? s.active : s.inactive,
            )}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-bold",
                  active === tab.key
                    ? "bg-[var(--color-green-900)] text-[var(--color-gold-400)]"
                    : "bg-[var(--color-cream-200)] text-[var(--fg-muted)]",
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Panel */}
      {activeTab && (
        <div
          id={`tabpanel-${activeTab.key}`}
          role="tabpanel"
          aria-labelledby={activeTab.key}
          className={cn(variant === "underline" ? "pt-6" : "pt-5")}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
