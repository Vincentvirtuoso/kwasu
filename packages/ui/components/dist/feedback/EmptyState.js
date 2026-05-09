"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
const DEFAULTS = {
    "first-run": {
        icon: "🚀",
        title: "Welcome — let's get you started",
        description: "Nothing here yet. Complete your setup to see your content.",
        iconBg: "bg-[var(--color-green-100)]",
        iconColor: "text-[var(--color-green-800)]",
    },
    "no-results": {
        icon: "📭",
        title: "Nothing here yet",
        description: "There's no content to show right now. Check back later.",
        iconBg: "bg-[var(--color-cream-200)]",
        iconColor: "text-[var(--color-green-700)]",
    },
    error: {
        icon: "⚠",
        title: "Something went wrong",
        description: "We couldn't load this content. Please try again.",
        iconBg: "bg-[var(--color-danger-bg)]",
        iconColor: "text-[var(--color-danger)]",
    },
    filtered: {
        icon: "🔍",
        title: "No matches found",
        description: "No results match your current filters. Try adjusting or clearing them.",
        iconBg: "bg-[var(--color-info-bg)]",
        iconColor: "text-[var(--color-info)]",
    },
};
function ActionBtn({ action }) {
    const base = "inline-flex items-center gap-2 rounded-lg font-sans text-sm font-semibold transition-all duration-150 px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]";
    const variantClass = {
        primary: "bg-[var(--color-gold-500)] text-[var(--color-green-900)] hover:bg-[var(--color-gold-300)] hover:shadow-[var(--shadow-gold)]",
        outline: "border border-[var(--border-strong)] text-[var(--fg-base)] hover:bg-[var(--bg-elevated)]",
        ghost: "text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg-base)]",
    }[action.variant ?? "primary"];
    if (action.href) {
        return (_jsx("a", { href: action.href, className: cn(base, variantClass), children: action.label }));
    }
    return (_jsx("button", { onClick: action.onClick, className: cn(base, variantClass), children: action.label }));
}
function FirstRunContent() {
    return (_jsx("ul", { className: "mt-2 space-y-1.5 text-left", children: [
            "Complete your profile information",
            "Register your courses for the session",
            "Set your notification preferences",
        ].map((step, i) => (_jsxs("li", { className: "flex items-start gap-2.5 font-sans text-sm text-[var(--fg-muted)]", children: [_jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-green-900)] font-mono text-[10px] font-bold text-[var(--color-gold-400)]", children: i + 1 }), step] }, step))) }));
}
function ErrorContent({ detail, onRetry, }) {
    return (_jsxs("div", { className: "mt-3 w-full space-y-3", children: [detail && (_jsx("div", { className: "rounded-lg bg-[var(--color-danger-bg)] border border-[var(--color-danger-light)] px-4 py-2.5 text-left", children: _jsx("p", { className: "font-mono text-xs text-[var(--color-danger-dark)] break-all", children: detail }) })), onRetry && (_jsx("button", { onClick: onRetry, className: "inline-flex items-center gap-2 rounded-lg border border-[var(--color-danger-light)] bg-[var(--color-danger-bg)] px-4 py-2 font-sans text-sm font-semibold text-[var(--color-danger-dark)] hover:bg-[var(--color-danger-light)] transition-colors", children: "\u21BA Try again" }))] }));
}
function FilteredContent({ filterLabel, onClearFilter, }) {
    return (_jsxs("div", { className: "mt-3 flex flex-col items-center gap-3", children: [filterLabel && (_jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--color-info-light)] bg-[var(--color-info-bg)] px-3 py-1", children: [_jsxs("span", { className: "font-sans text-xs text-[var(--color-info-dark)]", children: ["Filter: ", _jsx("strong", { children: filterLabel })] }), onClearFilter && (_jsx("button", { onClick: onClearFilter, "aria-label": "Clear filter", className: "text-[var(--color-info)] opacity-70 hover:opacity-100 text-sm leading-none font-bold", children: "\u00D7" }))] })), onClearFilter && (_jsx("button", { onClick: onClearFilter, className: "font-sans text-sm font-semibold text-[var(--color-green-700)] hover:underline", children: "Clear all filters" }))] }));
}
export function EmptyState({ variant = "no-results", title, description, icon, primaryAction, secondaryAction, filterLabel, errorDetail, onRetry, onClearFilter, className, }) {
    const d = DEFAULTS[variant];
    const resolvedTitle = title ?? d.title;
    const resolvedDescription = description ?? d.description;
    const resolvedIcon = icon ?? d.icon;
    return (_jsxs("div", { className: cn("flex flex-col items-center justify-center text-center px-6 py-16", className), role: "status", "aria-label": resolvedTitle, children: [_jsx("div", { className: cn("mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl", d.iconBg, d.iconColor), children: typeof resolvedIcon === "string" ? (_jsx("span", { "aria-hidden": "true", children: resolvedIcon })) : (resolvedIcon) }), _jsx("h3", { className: "font-serif text-xl font-semibold text-[var(--fg-base)] mb-2 leading-snug", children: resolvedTitle }), _jsx("p", { className: "font-sans text-sm leading-relaxed text-[var(--fg-muted)] max-w-sm", children: resolvedDescription }), variant === "first-run" && _jsx(FirstRunContent, {}), variant === "error" && (_jsx(ErrorContent, { detail: errorDetail, onRetry: onRetry })), variant === "filtered" && (_jsx(FilteredContent, { filterLabel: filterLabel, onClearFilter: onClearFilter })), (primaryAction || secondaryAction) && (_jsxs("div", { className: "mt-7 flex flex-wrap items-center justify-center gap-3", children: [primaryAction && _jsx(ActionBtn, { action: primaryAction }), secondaryAction && (_jsx(ActionBtn, { action: { variant: "outline", ...secondaryAction } }))] }))] }));
}
//# sourceMappingURL=EmptyState.js.map