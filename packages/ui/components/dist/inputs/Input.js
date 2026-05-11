import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@kwasu-portal/utils-others";
import * as React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
const Input = React.forwardRef(({ className, type, label, error, helperText, leftIcon, rightIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const togglePassword = () => setShowPassword(!showPassword);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    return (_jsxs("div", { className: "w-full flex flex-col gap-1.5", children: [label && (_jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: label })), _jsxs("div", { className: "relative flex items-center", children: [leftIcon && (_jsx("div", { className: "absolute left-3 text-muted-foreground", children: leftIcon })), _jsx("input", { type: inputType, className: cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", error && "border-destructive focus-visible:ring-destructive", className), ref: ref, style: {
                            paddingLeft: leftIcon ? "40px" : "",
                            paddingRight: rightIcon || isPassword ? "40px" : "",
                        }, ...props }), isPassword ? (_jsx("button", { type: "button", onClick: togglePassword, className: "absolute right-3 text-muted-foreground hover:text-foreground transition-colors", children: showPassword ? _jsx(LuEyeOff, { size: 18 }) : _jsx(LuEye, { size: 18 }) })) : (rightIcon && (_jsx("div", { className: "absolute right-3 text-muted-foreground", children: rightIcon })))] }), error ? (_jsx("p", { className: "text-xs font-medium text-destructive", children: error })) : helperText ? (_jsx("p", { className: "text-xs text-muted-foreground", children: helperText })) : null] }));
});
Input.displayName = "Input";
export { Input };
//# sourceMappingURL=Input.js.map