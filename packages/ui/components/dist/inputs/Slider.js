"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@kwasu-portal/utils-others";
export const Slider = React.forwardRef(({ className, label, showValue = false, formatValue = (v) => String(v), vertical = false, trackClass, rangeClass, thumbClass, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(props.defaultValue ?? props.value ?? [0]);
    React.useEffect(() => {
        if (props.value !== undefined)
            setLocalValue(props.value);
    }, [props.value]);
    const handleValueChange = (val) => {
        setLocalValue(val);
        props.onValueChange?.(val);
    };
    return (_jsxs("div", { className: cn("flex items-center gap-2", vertical && "flex-col"), children: [label && (_jsx("span", { className: "text-xs font-medium text-fg-muted", children: label })), _jsxs(SliderPrimitive.Root, { ref: ref, className: cn("relative flex touch-none select-none group", vertical
                    ? "h-24 w-5 flex-col items-center"
                    : "h-5 w-full items-center", className), onValueChange: handleValueChange, ...props, children: [_jsx(SliderPrimitive.Track, { className: cn("relative grow rounded-full", vertical ? "h-full w-[3px]" : "h-[3px] w-full", trackClass ?? "bg-white/15"), children: _jsx(SliderPrimitive.Range, { className: cn("absolute rounded-full", vertical ? "bottom-0 left-0 w-full" : "left-0 top-0 h-full", rangeClass ?? "bg-gold-500") }) }), _jsx(SliderPrimitive.Thumb, { className: cn("block h-3 w-3 rounded-full transition-all duration-150", "opacity-0 group-hover:opacity-100", "hover:scale-125 focus-visible:opacity-100 focus-visible:outline-none", "shadow-[0_0_0_2px_rgba(201,168,76,0.4)]", thumbClass ?? "bg-white") })] }), showValue && (_jsx("span", { className: "text-[11px] font-mono text-white/35 min-w-[28px]", children: formatValue(localValue[0] ?? 0) }))] }));
});
Slider.displayName = "Slider";
//# sourceMappingURL=Slider.js.map