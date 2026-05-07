"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
const ACCENT = {
    success: "border-l-[var(--color-success)]",
    warning: "border-l-[var(--color-warning)]",
    danger: "border-l-[var(--color-danger)]",
    info: "border-l-[var(--color-info)]",
    neutral: "border-l-[var(--border-strong)]",
};
const ICON_COLOR = {
    success: "text-[var(--color-success)]",
    warning: "text-[var(--color-warning)]",
    danger: "text-[var(--color-danger)]",
    info: "text-[var(--color-info)]",
    neutral: "text-[var(--fg-muted)]",
};
const DEFAULT_ICONS = {
    success: "✓",
    warning: "⚠",
    danger: "✕",
    info: "ℹ",
    neutral: "•",
};
export function Toast({ variant = "neutral", title, body, icon, action, onDismiss, className, }) {
    return (_jsxs("div", { role: "status", "aria-live": "polite", className: cn("flex items-start gap-3 rounded-xl border border-l-4 p-4", "bg-[var(--bg-surface)] shadow-[var(--shadow-xl)]", "w-[360px] max-w-[calc(100vw-48px)]", "animate-[notif-enter_0.35s_var(--ease-bounce)_both]", ACCENT[variant], className), children: [_jsx("span", { className: cn("mt-0.5 shrink-0 text-base font-bold leading-none", ICON_COLOR[variant]), "aria-hidden": "true", children: icon ?? DEFAULT_ICONS[variant] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-sans text-sm font-semibold text-[var(--fg-base)]", children: title }), body && (_jsx("p", { className: "font-sans text-xs text-[var(--fg-muted)] mt-0.5 leading-relaxed", children: body })), action && (_jsx("button", { onClick: action.onClick, className: "mt-2 font-sans text-xs font-semibold text-[var(--color-green-700)] hover:underline", children: action.label }))] }), onDismiss && (_jsx("button", { onClick: onDismiss, "aria-label": "Dismiss notification", className: "shrink-0 ml-1 text-lg leading-none font-light text-[var(--fg-subtle)] opacity-50 hover:opacity-100 transition-opacity", children: "\u00D7" }))] }));
}
/** Fixed container — place once in your layout */
export function ToastContainer({ children, className, }) {
    return (_jsx("div", { "aria-label": "Notifications", className: cn("fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col gap-2 items-end", className), children: children }));
}
//# sourceMappingURL=Toast.js.map