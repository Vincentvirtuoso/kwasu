import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { cn } from "@kwasu-portal/utils-others";
const sizeConfig = {
    sm: { image: "40px", title: "12px", tagline: "7px" },
    md: { image: "48px", title: "15px", tagline: "9px" },
    lg: { image: "60px", title: "20px", tagline: "10px" },
};
export function BrandMark({ logoOnly = false, size = "md", className, src = "/kwasu-logo.png", alt = "Kwara State University logo", }) {
    const sizes = sizeConfig[size];
    if (logoOnly) {
        return (_jsx("img", { src: src, alt: alt, className: cn("object-contain rounded-lg", className), style: { height: sizes.image, width: sizes.image } }));
    }
    return (_jsxs("div", { className: cn("flex items-center gap-3", className), children: [_jsx("img", { src: src, alt: alt, className: cn("object-contain rounded-lg flex-shrink-0"), style: { height: sizes.image, width: sizes.image } }), _jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: cn("font-serif font-semibold leading-tight truncate text-fg-muted"), style: { letterSpacing: 0.3, fontSize: sizes.title }, children: "Kwara State University" }), _jsx("div", { className: cn("font-sans font-bold text-gold-500 tracking-[0.2em] uppercase"), style: { fontSize: sizes.tagline }, children: "The Green University" })] })] }));
}
//# sourceMappingURL=BrandMark.js.map