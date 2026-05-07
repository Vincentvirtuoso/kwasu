"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "@kwasu-portal/utils-others";
export function Accordion({ items, multiple = false, defaultOpen = [], className, itemClassName, }) {
    const [open, setOpen] = useState(defaultOpen);
    const toggle = (key) => {
        if (open.includes(key)) {
            setOpen(open.filter((k) => k !== key));
        }
        else {
            setOpen(multiple ? [...open, key] : [key]);
        }
    };
    return (_jsx("div", { className: cn("divide-y divide-[var(--border-base)] rounded-xl border border-[var(--border-base)] overflow-hidden", className), children: items.map((item) => {
            const isOpen = open.includes(item.key);
            return (_jsxs("div", { className: cn("bg-[var(--bg-surface)]", itemClassName), children: [_jsxs("button", { onClick: () => !item.disabled && toggle(item.key), disabled: item.disabled, "aria-expanded": isOpen, "aria-controls": `accordion-${item.key}`, className: cn("flex w-full items-center justify-between gap-4 px-5 py-4", "font-sans text-sm font-semibold text-[var(--fg-base)] text-left", "hover:bg-[var(--bg-elevated)] transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--border-focus)]", "disabled:opacity-40 disabled:cursor-not-allowed"), children: [_jsx("span", { children: item.trigger }), _jsx("span", { "aria-hidden": "true", className: cn("shrink-0 text-[var(--fg-subtle)] transition-transform duration-200", isOpen && "rotate-180"), children: "\u25BE" })] }), _jsx("div", { id: `accordion-${item.key}`, role: "region", className: cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"), children: _jsx("div", { className: "px-5 pb-5 font-sans text-sm text-[var(--fg-muted)] leading-relaxed", children: item.content }) })] }, item.key));
        }) }));
}
//# sourceMappingURL=Accordion.js.map