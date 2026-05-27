import React from "react";
import { ToastProvider } from "@kwasu-portal/components";
import { AuthProvider } from "./AuthContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
};

export default Providers;
