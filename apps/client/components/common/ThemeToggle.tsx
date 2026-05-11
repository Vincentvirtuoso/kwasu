"use client";

import { useTheme } from "@/context/ThemeProvider";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";
import { cn } from "@kwasu-portal/utils-others";

const options = [
  { id: "light", icon: FiSun, label: "Light" },
  { id: "system", icon: FiMonitor, label: "System" },
  { id: "dark", icon: FiMoon, label: "Dark" },
] as const;

interface ThemeToggleProps {
  isCollapsed?: boolean;
  size?: "sm" | "md" | "lg";
  showSystem?: boolean;
}

export const ThemeToggle = ({
  isCollapsed = false,
  size = "md",
  showSystem = false,
}: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  const sizeConfig = {
    sm: {
      container: "p-0.5 rounded-lg gap-1",
      button: "px-2 py-1 text-xs",
      icon: "w-3 h-3",
    },
    md: {
      container: "p-1 rounded-xl gap-1",
      button: "px-3 py-1.5 text-xs",
      icon: "w-4 h-4",
    },
    lg: {
      container: "p-1.5 rounded-2xl gap-2",
      button: "px-5 py-2.5 text-sm",
      icon: "w-5 h-5",
    },
  }[size];

  return (
    <div
      className={cn(
        "flex bg-bg-surface border border-border-base shadow-inner",
        sizeConfig.container,
        isCollapsed ? "flex-col gap-1" : "flex-row",
      )}
    >
      {options
        .filter((opt) => !showSystem && opt.id !== "system")
        .map((opt) => {
          const isActive = theme === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={cn(
                "relative flex items-center justify-center font-medium z-10 rounded-lg transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                isCollapsed ? "p-2 w-full" : cn(sizeConfig.button, "flex-1"),
              )}
              title={opt.label}
            >
              <opt.icon className={cn("shrink-0", sizeConfig.icon)} />

              {!isCollapsed && (
                <motion.span
                  key={`label-${opt.id}`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="hidden md:inline-block ml-1.5 whitespace-nowrap overflow-hidden"
                  transition={{ duration: 0.2 }}
                >
                  {opt.label}
                </motion.span>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeThemeTab"
                  className="absolute inset-0 bg-fg-subtle rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
    </div>
  );
};
