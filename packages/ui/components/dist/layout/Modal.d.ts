import React from "react";
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    className?: string;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    showCloseButton?: boolean;
}
export declare function Modal({ isOpen, onClose, children, size, className, closeOnOverlayClick, closeOnEsc, showCloseButton, }: ModalProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Modal {
    var Header: ({ children, className, }: {
        children: React.ReactNode;
        className?: string;
    }) => import("react/jsx-runtime").JSX.Element;
    var Body: ({ children, className, }: {
        children: React.ReactNode;
        className?: string;
    }) => import("react/jsx-runtime").JSX.Element;
    var Footer: ({ children, className, }: {
        children: React.ReactNode;
        className?: string;
    }) => import("react/jsx-runtime").JSX.Element;
}
interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    dangerous?: boolean;
    loading?: boolean;
}
export declare function ConfirmModal({ open, onClose, onConfirm, title, description, confirmLabel, cancelLabel, dangerous, loading, }: ConfirmModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Modal.d.ts.map