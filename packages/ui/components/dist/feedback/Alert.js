"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
import { LuCheck, LuDot, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";
const STYLES = {
    success: {
        wrapper: "bg-success-bg  border-success-light  text-success-dark",
        icon: "text-success",
        title: "text-success-dark",
        body: "text-success-dark opacity-80",
    },
    warning: {
        wrapper: "bg-warning-bg  border-warning-light  text-warning-dark",
        icon: "text-warning",
        title: "text-warning-dark",
        body: "text-warning-dark opacity-80",
    },
    danger: {
        wrapper: "bg-danger-bg   border-danger-light   text-danger-dark",
        icon: "text-danger",
        title: "text-danger-dark",
        body: "text-danger-dark opacity-80",
    },
    info: {
        wrapper: "bg-info-bg     border-info-light     text-info-dark",
        icon: "text-info",
        title: "text-info-dark",
        body: "text-info-dark opacity-80",
    },
    neutral: {
        wrapper: "bg-bg-elevated  border-border-base  text-fg-base",
        icon: "text-fg-muted",
        title: "text-fg-base",
        body: "text-fg-muted",
    },
};
const DEFAULT_ICONS = {
    success: _jsx(LuCheck, {}),
    warning: _jsx(LuTriangleAlert, {}),
    danger: _jsx(LuX, {}),
    info: _jsx(LuInfo, {}),
    neutral: _jsx(LuDot, {}),
};
export function Alert({ variant = "neutral", title, icon, hideIcon = false, onDismiss, actions, children, className, ...props }) {
    const s = STYLES[variant];
    return (_jsxs("div", { role: "alert", className: cn("flex gap-3 rounded-xl border p-4 items-center", s.wrapper, className), ...props, children: [!hideIcon && (_jsx("span", { className: cn("mt-0.5 shrink-0 text-base leading-none font-bold", s.icon), "aria-hidden": "true", children: icon ?? DEFAULT_ICONS[variant] })), _jsxs("div", { className: "flex-1 min-w-0", children: [title && (_jsx("p", { className: cn("font-sans text-sm font-semibold mb-0.5", s.title), children: title })), children && (_jsx("div", { className: cn("font-sans text-sm leading-relaxed", s.body), children: children })), actions && _jsx("div", { className: "mt-3 flex gap-2", children: actions })] }), onDismiss && (_jsx("button", { onClick: onDismiss, "aria-label": "Dismiss", className: cn("shrink-0 ml-1 opacity-50 hover:opacity-100 transition-opacity text-lg leading-none font-light", s.icon), children: _jsx(LuX, {}) }))] }));
}
//# sourceMappingURL=Alert.js.map