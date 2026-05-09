import { type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
declare const badgeVariants: (props?: ({
    variant?: "success" | "primary" | "warning" | "danger" | "info" | "gold" | "green" | "neutral" | "dark" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    dot?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    dot?: boolean;
    icon?: ReactNode;
    onRemove?: () => void;
}
export declare function Badge({ variant, size, dot, icon, onRemove, children, className, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Badge.d.ts.map