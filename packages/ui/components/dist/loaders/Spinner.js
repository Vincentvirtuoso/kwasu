"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
const SIZE_CLASSES = {
    xs: "h-3 w-3 border",
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-9 w-9 border-[3px]",
    xl: "h-12 w-12 border-4",
};
const VARIANT_CLASSES = {
    default: "border-[var(--color-green-200)] border-t-[var(--color-green-800)]",
    gold: "border-[var(--color-gold-200)]  border-t-[var(--color-gold-500)]",
    white: "border-white/20                 border-t-white",
    muted: "border-[var(--border-base)]     border-t-[var(--fg-muted)]",
};
export function Spinner({ size = "md", variant = "default", label = "Loading…", className, }) {
    return (_jsxs("span", { role: "status", "aria-label": label, className: "inline-flex", children: [_jsx("span", { className: cn("animate-spin rounded-full", SIZE_CLASSES[size], VARIANT_CLASSES[variant], className) }), _jsx("span", { className: "sr-only", children: label })] }));
}
/** Full-page loading overlay */
export function PageSpinner({ label = "Loading…" }) {
    return (_jsx("div", { className: "fixed inset-0 z-[var(--z-overlay)] flex flex-col items-center justify-center gap-4 bg-[var(--bg-overlay)] backdrop-blur-sm", children: _jsxs("div", { className: "flex flex-col items-center gap-4 rounded-2xl bg-[var(--bg-surface)] px-10 py-8 shadow-[var(--shadow-2xl)]", children: [_jsx(Spinner, { size: "lg", variant: "gold" }), _jsx("p", { className: "font-sans text-sm font-medium text-[var(--fg-muted)]", children: label })] }) }));
}
/** Inline loading state for content areas */
export function InlineLoader({ rows = 1, className, }) {
    return (_jsxs("div", { className: cn("flex flex-col items-center gap-3 py-10", className), children: [_jsx(Spinner, { size: "md", variant: "default" }), rows > 1 && (_jsx("div", { className: "space-y-2 w-48", children: Array.from({ length: rows - 1 }).map((_, i) => (_jsx("div", { className: "h-2 rounded-full bg-[var(--color-cream-300)] animate-pulse", style: { width: `${70 + (i % 2) * 20}%` } }, i))) }))] }));
}
//# sourceMappingURL=Spinner.js.map