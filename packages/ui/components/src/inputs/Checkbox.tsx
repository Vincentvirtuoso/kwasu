// Checkbox.tsx
"use client";

import React from "react";
import { cn } from "@kwasu-portal/utils-others";
import { LuCheck } from "react-icons/lu";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      indeterminate,
      disabled,
      checked,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    const id = React.useId();

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-start gap-2">
          <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              id={id}
              ref={innerRef}
              checked={checked}
              disabled={disabled}
              className={cn(
                "peer h-5 w-5 cursor-pointer appearance-none rounded border-2 transition-all",
                "border-border-base bg-bg-surface",
                "checked:border-color-gold-500 checked:bg-color-gold-500",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-gold-500",
                "disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-color-danger focus-visible:ring-color-danger",
                className,
              )}
              {...props}
            />
            <LuCheck
              className={cn(
                "pointer-events-none absolute h-3.5 w-3.5 text-white transition-opacity",
                checked ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "cursor-pointer text-sm font-medium leading-tight text-fg-base",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {label}
            </label>
          )}
        </div>

        {error ? (
          <p className="text-xs font-medium text-color-danger">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-fg-muted">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
