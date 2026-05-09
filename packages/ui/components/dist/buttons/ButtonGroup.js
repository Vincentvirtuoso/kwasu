"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
export function ButtonGroup({ children, attached = false, vertical = false, className, ...props }) {
    return (_jsx("div", { role: "group", className: cn("inline-flex", vertical ? "flex-col" : "flex-row", attached &&
            !vertical &&
            "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:border-l-0", attached &&
            vertical &&
            "[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:border-t-0", !attached && (vertical ? "flex-col gap-2" : "gap-2"), className), ...props, children: children }));
}
//# sourceMappingURL=ButtonGroup.js.map