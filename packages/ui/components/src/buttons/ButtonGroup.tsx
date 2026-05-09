"use client";
import { cn } from "@kwasu-portal/utils-others";
import type { HTMLAttributes, ReactNode } from "react";

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  attached?: boolean;
  vertical?: boolean;
}

export function ButtonGroup({
  children,
  attached = false,
  vertical = false,
  className,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        vertical ? "flex-col" : "flex-row",
        attached &&
          !vertical &&
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:border-l-0",
        attached &&
          vertical &&
          "[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:border-t-0",
        !attached && (vertical ? "flex-col gap-2" : "gap-2"),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
