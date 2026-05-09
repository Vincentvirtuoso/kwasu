import type { ReactNode } from "react";
type ToastVariant = "success" | "warning" | "danger" | "info" | "neutral";
export interface ToastProps {
    variant?: ToastVariant;
    title: string;
    body?: string;
    icon?: ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    onDismiss?: () => void;
    className?: string;
}
export declare function Toast({ variant, title, body, icon, action, onDismiss, className, }: ToastProps): import("react/jsx-runtime").JSX.Element;
/** Fixed container — place once in your layout */
export declare function ToastContainer({ children, className, }: {
    children: ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Toast.d.ts.map