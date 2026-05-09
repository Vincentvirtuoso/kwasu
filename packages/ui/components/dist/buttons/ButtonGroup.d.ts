import type { HTMLAttributes, ReactNode } from "react";
interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    attached?: boolean;
    vertical?: boolean;
}
export declare function ButtonGroup({ children, attached, vertical, className, ...props }: ButtonGroupProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ButtonGroup.d.ts.map