import { type ReactNode } from "react";
type TabsVariant = "underline" | "pill" | "card";
interface Tab {
    key: string;
    label: ReactNode;
    icon?: ReactNode;
    badge?: string | number;
    disabled?: boolean;
    content: ReactNode;
}
interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
    variant?: TabsVariant;
    onChange?: (key: string) => void;
    className?: string;
    listClassName?: string;
}
export declare function Tabs({ tabs, defaultTab, variant, onChange, className, listClassName, }: TabsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Tabs.d.ts.map