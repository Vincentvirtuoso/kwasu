"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useCallback } from "react";
import { cn } from "@kwasu-portal/utils-others";
const SIZE_CLASSES = {
    sm: "max-w-sm",
    md: "max-w-[560px]",
    lg: "max-w-[720px]",
    xl: "max-w-[920px]",
    full: "max-w-[calc(100vw-48px)] max-h-[calc(100vh-48px)]",
};
export function Modal({ open, onClose, title, description, size = "md", children, footer, closeOnOverlay = true, className, }) {
    // Close on Escape
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
    return (_jsxs("div", { className: cn("fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-6", "animate-[fade-in_150ms_ease_both]"), children: [_jsx("div", { className: "absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm", "aria-hidden": "true", onClick: closeOnOverlay ? onClose : undefined }), _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": title ? "modal-title" : undefined, "aria-describedby": description ? "modal-desc" : undefined, className: cn("relative z-10 w-full flex flex-col", "max-h-[90vh] overflow-hidden", "rounded-2xl bg-[var(--bg-surface)] shadow-[var(--shadow-2xl)]", "animate-[scale-in_200ms_var(--ease-bounce)_both]", SIZE_CLASSES[size], className), children: [(title || description) && (_jsxs("div", { className: "flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0", children: [_jsxs("div", { children: [title && (_jsx("h2", { id: "modal-title", className: "font-serif text-2xl font-semibold text-[var(--fg-base)] leading-snug", children: title })), description && (_jsx("p", { id: "modal-desc", className: "font-sans text-sm text-[var(--fg-muted)] mt-1", children: description }))] }), _jsx("button", { onClick: onClose, "aria-label": "Close modal", className: "shrink-0 mt-0.5 rounded-lg p-1.5 text-[var(--fg-subtle)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg-base)] transition-colors", children: "\u2715" })] })), _jsx("div", { className: "flex-1 overflow-y-auto px-6 pb-6 pt-2", children: children }), footer && (_jsx("div", { className: "shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]", children: footer }))] })] }));
}
export function ConfirmModal({ open, onClose, onConfirm, title = "Are you sure?", description = "This action cannot be undone.", confirmLabel = "Confirm", cancelLabel = "Cancel", dangerous = false, loading = false, }) {
    return (_jsx(Modal, { open: open, onClose: onClose, title: title, description: description, size: "sm", footer: _jsxs(_Fragment, { children: [_jsx("button", { onClick: onClose, disabled: loading, className: "rounded-lg border border-[var(--border-base)] px-5 py-2.5 font-sans text-sm font-semibold text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] transition-colors disabled:opacity-50", children: cancelLabel }), _jsxs("button", { onClick: onConfirm, disabled: loading, className: cn("inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-sans text-sm font-semibold transition-all disabled:opacity-50", dangerous
                        ? "bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-dark)]"
                        : "bg-[var(--color-gold-500)] text-[var(--color-green-900)] hover:bg-[var(--color-gold-300)]"), children: [loading && (_jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" })), confirmLabel] })] }), children: _jsx("div", {}) }));
}
//# sourceMappingURL=Modal.js.map