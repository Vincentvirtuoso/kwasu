import type { HTMLAttributes, ReactNode } from "react";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    bordered?: boolean;
    flat?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
}
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    heading?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
}
declare function Root({ hover, bordered, flat, padding, className, children, ...props }: CardProps): import("react/jsx-runtime").JSX.Element;
declare function Header({ heading, description, action, className, children, ...props }: CardHeaderProps): import("react/jsx-runtime").JSX.Element;
declare function Body({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare function Footer({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare function Divider({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare const Card: typeof Root & {
    Header: typeof Header;
    Body: typeof Body;
    Footer: typeof Footer;
    Divider: typeof Divider;
};
export { Card as default, Root as CardRoot, Header as CardHeader, Body as CardBody, Footer as CardFooter, Divider as CardDivider, };
//# sourceMappingURL=Card.d.ts.map