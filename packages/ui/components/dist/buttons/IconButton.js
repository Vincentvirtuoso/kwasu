"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
const VARIANT_CLASSES = {
    ghost: "text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg-base)]",
    "ghost-inverted": "text-white/60 hover:bg-white/10 hover:text-white",
    outline: "border border-[var(--border-base)] text-[var(--fg-muted)] hover:border-[var(--border-focus)] hover:text-[var(--fg-base)]",
    primary: "bg-[var(--color-gold-500)] text-[var(--color-green-900)] hover:bg-[var(--color-gold-300)]",
    danger: "text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)]",
    subtle: "bg-[var(--color-cream-200)] text-[var(--color-green-900)] hover:bg-[var(--color-cream-300)]",
};
const SIZE_CLASSES = {
    xs: "h-6  w-6  rounded-md  text-xs",
    sm: "h-8  w-8  rounded-md  text-sm",
    md: "h-10 w-10 rounded-lg  text-base",
    lg: "h-12 w-12 rounded-xl  text-lg",
};
export function IconButton({ icon, label, variant = "ghost", size = "md", className, ...props }) {
    return (_jsx("button", { "aria-label": label, title: label, className: cn("inline-flex shrink-0 items-center justify-center", "transition-all duration-150 select-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]", "disabled:opacity-50 disabled:cursor-not-allowed", "active:scale-95", VARIANT_CLASSES[variant], SIZE_CLASSES[size], className), ...props, children: _jsx("span", { "aria-hidden": "true", children: icon }) }));
}
//# sourceMappingURL=IconButton.js.map