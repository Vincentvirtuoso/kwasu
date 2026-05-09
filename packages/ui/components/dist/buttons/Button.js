"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
import { cva } from "class-variance-authority";
const buttonVariants = cva([
    "inline-flex items-center justify-center gap-2 rounded-lg font-sans font-semibold",
    "transition-all duration-200 select-none whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "active:scale-[0.97]",
].join(" "), {
    variants: {
        variant: {
            primary: [
                "bg-[var(--color-gold-500)] text-[var(--color-green-900)]",
                "hover:bg-[var(--color-gold-300)] hover:shadow-[var(--shadow-gold)]",
                "border border-transparent",
            ].join(" "),
            dark: [
                "bg-[var(--color-green-900)] text-white",
                "hover:bg-[var(--color-green-800)] hover:shadow-[var(--shadow-md)]",
                "border border-transparent",
            ].join(" "),
            outline: [
                "bg-transparent border border-[var(--border-strong)] text-[var(--fg-base)]",
                "hover:bg-[var(--bg-elevated)] hover:border-[var(--border-focus)]",
            ].join(" "),
            ghost: [
                "bg-transparent border border-transparent text-[var(--fg-muted)]",
                "hover:bg-[var(--bg-elevated)] hover:text-[var(--fg-base)]",
            ].join(" "),
            "ghost-inverted": [
                "bg-transparent border border-white/20 text-white/80",
                "hover:bg-white/5 hover:border-white/40 hover:text-white",
            ].join(" "),
            subtle: [
                "bg-[var(--color-cream-200)] text-[var(--color-green-900)]",
                "hover:bg-[var(--color-cream-300)]",
                "border border-transparent",
            ].join(" "),
            danger: [
                "bg-[var(--color-danger)] text-white",
                "hover:bg-[var(--color-danger-dark)] hover:shadow-md",
                "border border-transparent",
            ].join(" "),
            "danger-outline": [
                "bg-transparent border border-[var(--color-danger)] text-[var(--color-danger)]",
                "hover:bg-[var(--color-danger-bg)]",
            ].join(" "),
            success: [
                "bg-[var(--color-success)] text-white",
                "hover:bg-[var(--color-success-dark)]",
                "border border-transparent",
            ].join(" "),
            gold: [
                "bg-[var(--color-gold-500)] text-[var(--color-green-900)]",
                "hover:bg-[var(--color-gold-300)]",
                "border border-transparent",
            ].join(" "),
            link: [
                "bg-transparent border-none text-[var(--color-green-700)]",
                "hover:text-[var(--color-green-900)] hover:underline",
                "p-0 h-auto font-medium",
            ].join(" "),
        },
        size: {
            xs: "h-7  px-2.5 text-xs  rounded-md  gap-1.5",
            sm: "h-8  px-3.5 text-sm  rounded-md",
            md: "h-10 px-5   text-sm",
            lg: "h-12 px-7   text-base rounded-xl",
            xl: "h-14 px-9   text-lg  rounded-xl",
        },
        fullWidth: {
            true: "w-full",
        },
        iconOnly: {
            true: "px-0",
        },
    },
    compoundVariants: [
        { size: "xs", iconOnly: true, className: "w-7" },
        { size: "sm", iconOnly: true, className: "w-8" },
        { size: "md", iconOnly: true, className: "w-10" },
        { size: "lg", iconOnly: true, className: "w-12" },
        { size: "xl", iconOnly: true, className: "w-14" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
});
export function Button({ variant, size, fullWidth, iconOnly, loading, loadingText, leftIcon, rightIcon, children, className, disabled, ...props }) {
    const isDisabled = disabled || loading;
    return (_jsx("button", { className: cn(buttonVariants({ variant, size, fullWidth, iconOnly }), className), disabled: isDisabled, "aria-busy": loading, ...props, children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent", "aria-hidden": "true" }), loadingText ?? children] })) : (_jsxs(_Fragment, { children: [leftIcon && (_jsx("span", { className: "shrink-0", "aria-hidden": "true", children: leftIcon })), children, rightIcon && (_jsx("span", { className: "shrink-0", "aria-hidden": "true", children: rightIcon }))] })) }));
}
//# sourceMappingURL=Button.js.map