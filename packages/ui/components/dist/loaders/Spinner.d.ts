type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "default" | "gold" | "white" | "muted";
interface SpinnerProps {
    size?: SpinnerSize;
    variant?: SpinnerVariant;
    label?: string;
    className?: string;
}
export declare function Spinner({ size, variant, label, className, }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
/** Full-page loading overlay */
export declare function PageSpinner({ label }: {
    label?: string;
}): import("react/jsx-runtime").JSX.Element;
/** Inline loading state for content areas */
export declare function InlineLoader({ rows, className, }: {
    rows?: number;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Spinner.d.ts.map