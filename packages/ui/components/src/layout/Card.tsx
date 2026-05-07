"use client";
import { cn } from "@kwasu-portal/utils-others";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  bordered?: boolean;
  flat?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

function Root({
  hover = false,
  bordered = true,
  flat = false,
  padding = "none",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[var(--bg-surface)] overflow-hidden",
        bordered && "border border-[var(--border-base)]",
        !flat && "shadow-[var(--shadow-sm)]",
        hover &&
          "transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-[var(--border-focus)]",
        padding === "sm" && "p-4",
        padding === "md" && "p-6",
        padding === "lg" && "p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Header({
  heading,
  description,
  action,
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4",
        "px-6 py-5 border-b border-[var(--border-subtle)]",
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {heading && (
          <h3 className="font-serif text-lg font-semibold text-[var(--fg-base)] truncate">
            {heading}
          </h3>
        )}
        {description && (
          <p className="font-sans text-sm text-[var(--fg-muted)] mt-0.5">
            {description}
          </p>
        )}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function Body({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-5", className)} {...props}>
      {children}
    </div>
  );
}

function Footer({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-6 py-4 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)]",
        "flex items-center justify-between gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Divider({ className }: { className?: string }) {
  return (
    <hr
      className={cn("border-t border-[var(--border-subtle)] mx-6", className)}
    />
  );
}

const Card = Object.assign(Root, {
  Header,
  Body,
  Footer,
  Divider,
});

export {
  Card as default,
  Root as CardRoot,
  Header as CardHeader,
  Body as CardBody,
  Footer as CardFooter,
  Divider as CardDivider,
};
