"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
function Root({ hover = false, bordered = true, flat = false, padding = "none", className, children, ...props }) {
    return (_jsx("div", { className: cn("rounded-xl bg-[var(--bg-surface)] overflow-hidden", bordered && "border border-[var(--border-base)]", !flat && "shadow-[var(--shadow-sm)]", hover &&
            "transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-[var(--border-focus)]", padding === "sm" && "p-4", padding === "md" && "p-6", padding === "lg" && "p-8", className), ...props, children: children }));
}
function Header({ heading, description, action, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex items-start justify-between gap-4", "px-6 py-5 border-b border-[var(--border-subtle)]", className), ...props, children: [_jsxs("div", { className: "min-w-0 flex-1", children: [heading && (_jsx("h3", { className: "font-serif text-lg font-semibold text-[var(--fg-base)] truncate", children: heading })), description && (_jsx("p", { className: "font-sans text-sm text-[var(--fg-muted)] mt-0.5", children: description })), children] }), action && _jsx("div", { className: "shrink-0", children: action })] }));
}
function Body({ className, children, ...props }) {
    return (_jsx("div", { className: cn("px-6 py-5", className), ...props, children: children }));
}
function Footer({ className, children, ...props }) {
    return (_jsx("div", { className: cn("px-6 py-4 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)]", "flex items-center justify-between gap-4", className), ...props, children: children }));
}
function Divider({ className }) {
    return (_jsx("hr", { className: cn("border-t border-[var(--border-subtle)] mx-6", className) }));
}
const Card = Object.assign(Root, {
    Header,
    Body,
    Footer,
    Divider,
});
export { Card as default, Root as CardRoot, Header as CardHeader, Body as CardBody, Footer as CardFooter, Divider as CardDivider, };
//# sourceMappingURL=Card.js.map