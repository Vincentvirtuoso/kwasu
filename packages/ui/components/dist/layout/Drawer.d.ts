import { type ReactNode } from "react";
type DrawerSide = "right" | "left" | "bottom";
interface DrawerProps {
    open: boolean;
    onClose: () => void;
    side?: DrawerSide;
    title?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    className?: string;
}
export declare function Drawer({ open, onClose, side, title, children, footer, className, }: DrawerProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=Drawer.d.ts.map