import type { ButtonHTMLAttributes, ReactNode } from "react";
type IconButtonVariant = "ghost" | "ghost-inverted" | "outline" | "primary" | "danger" | "subtle";
type IconButtonSize = "xs" | "sm" | "md" | "lg";
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    label: string;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
}
export declare function IconButton({ icon, label, variant, size, className, ...props }: IconButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=IconButton.d.ts.map