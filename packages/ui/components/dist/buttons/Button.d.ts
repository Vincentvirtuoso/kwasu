import { type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
declare const buttonVariants: (props?: ({
    variant?: "primary" | "dark" | "outline" | "ghost" | "ghost-inverted" | "subtle" | "danger" | "danger-outline" | "success" | "gold" | "link" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | null | undefined;
    fullWidth?: boolean | null | undefined;
    iconOnly?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    loading?: boolean;
    loadingText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}
export declare function Button({ variant, size, fullWidth, iconOnly, loading, loadingText, leftIcon, rightIcon, children, className, disabled, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map