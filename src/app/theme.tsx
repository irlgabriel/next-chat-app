"use client";
import { deepPurple, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5c6bc0",
    },
    secondary: {
      main: "#7986cb",
    },
    background: { paper: "#ffffff", default: "#F8F7FA" },
  },
});

export default theme;
