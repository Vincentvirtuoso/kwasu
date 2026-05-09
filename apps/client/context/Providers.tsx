import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "@kwasu-portal/components";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
};

export default Providers;
