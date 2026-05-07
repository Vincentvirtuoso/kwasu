"use client";
import { useState, type ReactNode } from "react";
import { cn } from "@kwasu-portal/utils-others";

interface AccordionItem {
  key: string;
  trigger: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  itemClassName?: string;
}

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className,
  itemClassName,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const toggle = (key: string) => {
    if (open.includes(key)) {
      setOpen(open.filter((k) => k !== key));
    } else {
      setOpen(multiple ? [...open, key] : [key]);
    }
  };

  return (
    <div
      className={cn(
        "divide-y divide-[var(--border-base)] rounded-xl border border-[var(--border-base)] overflow-hidden",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = open.includes(item.key);
        return (
          <div
            key={item.key}
            className={cn("bg-[var(--bg-surface)]", itemClassName)}
          >
            <button
              onClick={() => !item.disabled && toggle(item.key)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.key}`}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-5 py-4",
                "font-sans text-sm font-semibold text-[var(--fg-base)] text-left",
                "hover:bg-[var(--bg-elevated)] transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--border-focus)]",
                "disabled:opacity-40 disabled:cursor-not-allowed",
              )}
            >
              <span>{item.trigger}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "shrink-0 text-[var(--fg-subtle)] transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              >
                ▾
              </span>
            </button>
            <div
              id={`accordion-${item.key}`}
              role="region"
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="px-5 pb-5 font-sans text-sm text-[var(--fg-muted)] leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
