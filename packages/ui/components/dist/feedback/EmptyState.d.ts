import type { ReactNode } from "react";
type EmptyStateVariant = "first-run" | "no-results" | "error" | "filtered";
interface EmptyStateAction {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "outline" | "ghost";
}
interface EmptyStateProps {
    variant?: EmptyStateVariant;
    title?: string;
    description?: string;
    icon?: ReactNode;
    primaryAction?: EmptyStateAction;
    secondaryAction?: EmptyStateAction;
    className?: string;
    /** For "filtered" variant — what filter is active */
    filterLabel?: string;
    /** For "error" variant — technical detail */
    errorDetail?: string;
    onRetry?: () => void;
    onClearFilter?: () => void;
}
export declare function EmptyState({ variant, title, description, icon, primaryAction, secondaryAction, filterLabel, errorDetail, onRetry, onClearFilter, className, }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EmptyState.d.ts.map