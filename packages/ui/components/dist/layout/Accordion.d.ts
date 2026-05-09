import { type ReactNode } from "react";
interface AccordionItem {
    key: string;
    trigger: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}
interface AccordionProps {
    items: AccordionItem[];
    multiple?: boolean;
    defaultOpen?: string[];
    className?: string;
    itemClassName?: string;
}
export declare function Accordion({ items, multiple, defaultOpen, className, itemClassName, }: AccordionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Accordion.d.ts.map