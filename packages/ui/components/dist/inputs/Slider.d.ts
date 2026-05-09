import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    label?: string;
    showValue?: boolean;
    formatValue?: (value: number) => string;
    vertical?: boolean;
    trackClass?: string;
    rangeClass?: string;
    thumbClass?: string;
}
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>>;
export {};
//# sourceMappingURL=Slider.d.ts.map