"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
const STYLES = {
    success: {
        wrapper: "bg-[var(--color-success-bg)]  border-[var(--color-success-light)]  text-[var(--color-success-dark)]",
        icon: "text-[var(--color-success)]",
        title: "text-[var(--color-success-dark)]",
        body: "text-[var(--color-success-dark)] opacity-80",
    },
    warning: {
        wrapper: "bg-[var(--color-warning-bg)]  border-[var(--color-warning-light)]  text-[var(--color-warning-dark)]",
        icon: "text-[var(--color-warning)]",
        title: "text-[var(--color-warning-dark)]",
        body: "text-[var(--color-warning-dark)] opacity-80",
    },
    danger: {
        wrapper: "bg-[var(--color-danger-bg)]   border-[var(--color-danger-light)]   text-[var(--color-danger-dark)]",
        icon: "text-[var(--color-danger)]",
        title: "text-[var(--color-danger-dark)]",
        body: "text-[var(--color-danger-dark)] opacity-80",
    },
    info: {
        wrapper: "bg-[var(--color-info-bg)]     border-[var(--color-info-light)]     text-[var(--color-info-dark)]",
        icon: "text-[var(--color-info)]",
        title: "text-[var(--color-info-dark)]",
        body: "text-[var(--color-info-dark)] opacity-80",
    },
    neutral: {
        wrapper: "bg-[var(--bg-elevated)]  border-[var(--border-base)]  text-[var(--fg-base)]",
        icon: "text-[var(--fg-muted)]",
        title: "text-[var(--fg-base)]",
        body: "text-[var(--fg-muted)]",
    },
};
const DEFAULT_ICONS = {
    success: "✓",
    warning: "⚠",
    danger: "✕",
    info: "ℹ",
    neutral: "•",
};
export function Alert({ variant = "neutral", title, icon, hideIcon = false, onDismiss, actions, children, className, ...props }) {
    const s = STYLES[variant];
    return (_jsxs("div", { role: "alert", className: cn("flex gap-3 rounded-xl border p-4", s.wrapper, className), ...props, children: [!hideIcon && (_jsx("span", { className: cn("mt-0.5 shrink-0 text-base leading-none font-bold", s.icon), "aria-hidden": "true", children: icon ?? DEFAULT_ICONS[variant] })), _jsxs("div", { className: "flex-1 min-w-0", children: [title && (_jsx("p", { className: cn("font-sans text-sm font-semibold mb-0.5", s.title), children: title })), children && (_jsx("div", { className: cn("font-sans text-sm leading-relaxed", s.body), children: children })), actions && _jsx("div", { className: "mt-3 flex gap-2", children: actions })] }), onDismiss && (_jsx("button", { onClick: onDismiss, "aria-label": "Dismiss", className: cn("shrink-0 ml-1 opacity-50 hover:opacity-100 transition-opacity text-lg leading-none font-light", s.icon), children: "\u00D7" }))] }));
}
//# sourceMappingURL=Alert.js.map