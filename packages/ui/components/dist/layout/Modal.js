"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
import React, { useRef, createContext, useContext, useEffect, useCallback, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";
const ModalContext = createContext(null);
const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx)
        throw new Error("Modal subcomponents must be used within Modal");
    return ctx;
};
const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] h-[90vh]",
};
export function Modal({ isOpen, onClose, children, size = "md", className, closeOnOverlayClick = true, closeOnEsc = true, showCloseButton = true, }) {
    const overlayRef = useRef(null);
    // Memoize onClose to prevent unnecessary effect re-runs
    const handleClose = useCallback(() => onClose(), [onClose]);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (closeOnEsc && e.key === "Escape" && isOpen)
                handleClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden"; // Prevent background scroll
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, closeOnEsc, handleClose]);
    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === overlayRef.current) {
            handleClose();
        }
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6", children: [_jsx(motion.div, { ref: overlayRef, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/60 backdrop-blur-sm", onClick: handleOverlayClick }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 10 }, transition: { type: "spring", duration: 0.4, bounce: 0.3 }, className: cn("relative z-50 flex flex-col w-full bg-bg-surface shadow-2xl rounded-2xl overflow-hidden", "max-h-[calc(100vh-2rem)]", // Ensure it never exceeds screen height
                    sizeClasses[size], className), role: "dialog", "aria-modal": "true", children: [showCloseButton && (_jsx("button", { onClick: handleClose, className: "absolute top-4 right-4 z-[60] p-2 rounded-full text-fg-muted hover:text-fg-base hover:bg-bg-elevated transition-all active:scale-90", "aria-label": "Close modal", children: _jsx(LuX, { size: 20 }) })), _jsx(ModalContext.Provider, { value: { onClose: handleClose }, children: children })] })] })) }));
}
Modal.Header = function ModalHeader({ children, className, }) {
    return (_jsx("div", { className: cn("px-6 py-5 border-b border-border-base shrink-0", className), children: _jsx("h2", { className: "font-serif text-xl font-bold text-fg-base leading-tight", children: children }) }));
};
Modal.Body = function ModalBody({ children, className, }) {
    return (_jsx("div", { className: cn("px-6 py-4 text-fg-base overflow-y-auto custom-scrollbar flex-1", // flex-1 allows it to grow/shrink
        className), children: children }));
};
Modal.Footer = function ModalFooter({ children, className, }) {
    return (_jsx("div", { className: cn("px-6 py-4 border-t border-border-base bg-bg-elevated/50 flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0", className), children: children }));
};
export function ConfirmModal({ open, onClose, onConfirm, title = "Confirm Action", description = "Are you sure you want to proceed? This action cannot be undone.", confirmLabel = "Confirm", cancelLabel = "Cancel", dangerous = false, loading = false, }) {
    return (_jsxs(Modal, { isOpen: open, onClose: onClose, size: "sm", children: [_jsx(Modal.Header, { children: title }), _jsx(Modal.Body, { children: description }), _jsx(Modal.Footer, { children: _jsxs(_Fragment, { children: [_jsx("button", { onClick: onClose, disabled: loading, className: "rounded-lg border border-[var(--border-base)] px-5 py-2.5 font-sans text-sm font-semibold text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] transition-colors disabled:opacity-50", children: cancelLabel }), _jsxs("button", { onClick: onConfirm, disabled: loading, className: cn("inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-sans text-sm font-semibold transition-all disabled:opacity-50", dangerous
                                ? "bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-dark)]"
                                : "bg-[var(--color-gold-500)] text-[var(--color-green-900)] hover:bg-[var(--color-gold-300)]"), children: [loading && (_jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" })), confirmLabel] })] }) })] }));
}
//# sourceMappingURL=Modal.js.map