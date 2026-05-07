import React from "react";
import { ThemeProvider } from "./ThemeProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Provider;
