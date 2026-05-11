"use client";

import React from "react";
import { cn } from "@kwasu-portal/utils-others";

export interface RadioCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioCard({
  value,
  label,
  description,
  icon,
  selected = false,
  disabled = false,
  onChange,
  className,
}: RadioCardProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200",
        selected
          ? "border-color-gold-500 bg-color-gold-50 dark:bg-color-gold-950/20"
          : "border-border-base bg-bg-surface hover:border-color-gold-300",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <div className="flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
        <div
          className={cn(
            "h-4 w-4 rounded-full border-2 transition-colors",
            selected
              ? "border-color-gold-500 bg-color-gold-500"
              : "border-border-base bg-transparent",
          )}
        >
          {selected && (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          {icon && <span className="text-fg-muted">{icon}</span>}
          <span
            className={cn(
              "font-medium text-fg-base",
              selected && "text-color-gold-700",
            )}
          >
            {label}
          </span>
        </div>
        {description && (
          <p className="mt-1 text-sm text-fg-muted">{description}</p>
        )}
      </div>
    </button>
  );
}

// Group wrapper for RadioCards to manage selection
interface RadioCardGroupProps {
  name: string;
  options: RadioCardProps[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioCardGroup({
  name,
  options,
  value,
  onChange,
  className,
}: RadioCardGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {options.map((option) => (
        <RadioCard
          key={option.value}
          {...option}
          selected={value === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
