import type { HTMLAttributes, ReactNode } from "react";
type AlertVariant = "success" | "warning" | "danger" | "info" | "neutral";
interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    title?: string;
    icon?: ReactNode;
    hideIcon?: boolean;
    onDismiss?: () => void;
    actions?: ReactNode;
}
export declare function Alert({ variant, title, icon, hideIcon, onDismiss, actions, children, className, ...props }: AlertProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Alert.d.ts.map