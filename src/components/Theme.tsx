"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../app/theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--primary-color", theme.palette.primary.main);
    root.style.setProperty("--secondary-color", theme.palette.secondary.main);
    root.style.setProperty(
      "--background-color",
      theme.palette.background.default
    );
    root.style.setProperty("--text-primary-color", theme.palette.text.primary);
    root.style.setProperty(
      "--text-secondary-color",
      theme.palette.text.secondary
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
