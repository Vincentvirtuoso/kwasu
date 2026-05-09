import { type ReactNode } from "react";
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    description?: string;
    size?: ModalSize;
    children: ReactNode;
    footer?: ReactNode;
    closeOnOverlay?: boolean;
    className?: string;
}
export declare function Modal({ open, onClose, title, description, size, children, footer, closeOnOverlay, className, }: ModalProps): import("react/jsx-runtime").JSX.Element | null;
/** Confirm dialog shorthand */
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