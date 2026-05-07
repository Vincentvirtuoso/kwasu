"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "@kwasu-portal/utils-others";
export function CopyButton({ text, label, size = "md", className, }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (_jsxs("button", { onClick: handleCopy, "aria-label": copied ? "Copied!" : "Copy to clipboard", title: copied ? "Copied!" : "Copy", className: cn("inline-flex items-center gap-1.5 rounded-md font-sans font-medium transition-all duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]", size === "sm" ? "h-7 px-2.5 text-xs" : "h-9 px-3 text-sm", copied
            ? "bg-[var(--color-success-bg)] text-[var(--color-success-dark)] border border-[var(--color-success-light)]"
            : "bg-[var(--bg-elevated)] text-[var(--fg-muted)] border border-[var(--border-base)] hover:border-[var(--border-focus)] hover:text-[var(--fg-base)]", className), children: [_jsx("span", { "aria-hidden": "true", children: copied ? "✓" : "⎘" }), label && _jsx("span", { children: copied ? "Copied!" : label })] }));
}
//# sourceMappingURL=CopyButton.js.map