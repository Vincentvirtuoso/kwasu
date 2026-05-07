"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
export function Divider({ label, orientation = "horizontal", dashed = false, className, }) {
    if (orientation === "vertical") {
        return (_jsx("div", { "aria-hidden": "true", className: cn("self-stretch w-px bg-[var(--border-base)]", dashed &&
                "border-l border-dashed border-[var(--border-base)] bg-transparent w-0", className) }));
    }
    if (label) {
        return (_jsxs("div", { role: "separator", className: cn("flex items-center gap-4 my-6", className), children: [_jsx("div", { className: cn("flex-1 h-px bg-[var(--border-base)]", dashed &&
                        "border-t border-dashed border-[var(--border-base)] bg-transparent h-0") }), _jsx("span", { className: "font-sans text-xs font-semibold text-[var(--fg-subtle)] uppercase tracking-widest shrink-0", children: label }), _jsx("div", { className: cn("flex-1 h-px bg-[var(--border-base)]", dashed &&
                        "border-t border-dashed border-[var(--border-base)] bg-transparent h-0") })] }));
    }
    return (_jsx("hr", { "aria-hidden": "true", className: cn("border-none my-6", dashed
            ? "border-t border-dashed border-[var(--border-base)]"
            : "h-px bg-[var(--border-base)]", className) }));
}
//# sourceMappingURL=Divider.js.map