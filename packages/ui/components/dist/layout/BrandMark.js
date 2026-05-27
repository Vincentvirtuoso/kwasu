import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
const sizeConfig = {
    sm: { image: "40px", title: "12px", tagline: "7px" },
    md: { image: "48px", title: "15px", tagline: "9px" },
    lg: { image: "60px", title: "20px", tagline: "10px" },
};
export function BrandMark({ logoOnly = false, size = "md", direction = "horizontal", className, src = "/kwasu-logo.png", alt = "Kwara State University logo", title = "Kwara State University", subtitle = "The Green University", href, }) {
    const sizes = sizeConfig[size];
    if (logoOnly) {
        return href ? (_jsx("div", { style: {
                height: sizes.image,
                width: sizes.image,
                textDecoration: "none",
            }, className: cn("flex items-center justify-center place-self-center", className), children: _jsx("a", { href: href, "aria-label": alt, children: _jsx("img", { src: src, alt: alt, className: "object-contain rounded-lg" }) }) })) : (_jsx("img", { src: src, alt: alt, className: cn("object-contain rounded-lg", className), style: { height: sizes.image, width: sizes.image } }));
    }
    const isVertical = direction === "vertical";
    const content = (_jsxs(_Fragment, { children: [_jsx("img", { src: src, alt: alt, className: "object-contain rounded-lg flex-shrink-0", style: { height: sizes.image, width: sizes.image } }), _jsxs("div", { className: isVertical ? "" : "min-w-0", children: [_jsx("div", { className: cn("font-serif font-semibold leading-tight truncate text-fg-muted"), style: { letterSpacing: 0.3, fontSize: sizes.title }, children: title }), _jsx("div", { className: cn("font-sans font-bold text-gold-500 tracking-[0.2em] uppercase"), style: { fontSize: sizes.tagline }, children: subtitle })] })] }));
    if (href) {
        return (_jsx("a", { href: href, className: cn("flex", isVertical
                ? "flex-col items-center text-center gap-2"
                : "flex-row items-center gap-1", className), style: { textDecoration: "none" }, children: content }));
    }
    return (_jsx("div", { className: cn("flex", isVertical
            ? "flex-col items-center text-center gap-2"
            : "flex-row items-center gap-1", className), children: content }));
}
//# sourceMappingURL=BrandMark.js.map