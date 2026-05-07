"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useCallback } from "react";
import { cn } from "@kwasu-portal/utils-others";
const SIDE_CLASSES = {
    right: {
        panel: "right-0 top-0 bottom-0 w-full max-w-[420px]",
        animation: "animate-[slide-in-right_300ms_var(--ease-out)_both]",
    },
    left: {
        panel: "left-0 top-0 bottom-0 w-full max-w-[420px]",
        animation: "animate-[slide-in-left_300ms_var(--ease-out)_both]",
    },
    bottom: {
        panel: "bottom-0 left-0 right-0 max-h-[90vh]",
        animation: "animate-[slide-up_300ms_var(--ease-out)_both]",
    },
};
export function Drawer({ open, onClose, side = "right", title, children, footer, className, }) {
    const handleKey = useCallback((e) => {
        if (e.key === "Escape")
            onClose();
    }, [onClose]);
    useEffect(() => {
        if (!open)
            return;
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [open, handleKey]);
    if (!open)
        return null;
    const { panel, animation } = SIDE_CLASSES[side];
    return (_jsxs("div", { className: "fixed inset-0 z-[var(--z-overlay)] animate-[fade-in_150ms_ease_both]", children: [_jsx("div", { className: "absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm", "aria-hidden": "true", onClick: onClose }), _jsxs("div", { role: "dialog", "aria-modal": "true", className: cn("absolute flex flex-col overflow-hidden", "bg-[var(--bg-surface)] shadow-[var(--shadow-2xl)]", side === "bottom" ? "rounded-t-2xl" : "rounded-none", panel, animation, className), children: [_jsxs("div", { className: "flex shrink-0 items-center justify-between gap-4 px-6 py-5 border-b border-[var(--border-base)]", children: [title ? (_jsx("h2", { className: "font-serif text-xl font-semibold text-[var(--fg-base)]", children: title })) : (_jsx("div", {})), _jsx("button", { onClick: onClose, "aria-label": "Close drawer", className: "rounded-lg p-1.5 text-[var(--fg-subtle)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg-base)] transition-colors", children: "\u2715" })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-6", children: children }), footer && (_jsx("div", { className: "shrink-0 px-6 py-4 border-t border-[var(--border-base)] bg-[var(--bg-elevated)] flex gap-3 justify-end", children: footer }))] })] }));
}
//# sourceMappingURL=Drawer.js.map