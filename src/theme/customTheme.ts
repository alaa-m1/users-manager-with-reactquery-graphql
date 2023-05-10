import { createTheme } from "@mui/material";

const primaryColor = "#1976d2";
const secondaryColor = "#9c27b0";
const disabledColor = "#ccc";

const fontFamily = "Enriqueta";

declare module "@mui/material/styles" {
  interface Palette {
    Error: {
      main: React.CSSProperties["color"];
      dark: React.CSSProperties["color"];
      light: React.CSSProperties["color"];
    };
  }
  interface PaletteOptions {
    Error: {
      main: React.CSSProperties["color"];
      dark: React.CSSProperties["color"];
      light: React.CSSProperties["color"];
    };
  }
}

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#1565c0",
      light: "#42a5f5",
    },
    secondary: { main: "#9c27b0", dark: "#7b1fa2", light: "#ba68c8" },
    success: { main: "#2e7d32", dark: "#1b5e20", light: "#4caf50" },
    info: { main: "#0288d1", dark: "#01579b", light: "#03a9f4" },
    warning: { main: "#ed6c02", dark: "#e65100", light: "#ff9800" },
    Error: { main: "#d32f2f", dark: "#c62828", light: "#ef5350" },
  },
  typography: {
    fontFamily: fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
        disableRipple: true,
        size: "medium",
      },
      styleOverrides: {
        root: {
          border: "1px solid #ccd825",
          fontFamily: fontFamily,
          padding: "5px 10px",
          fontSize: "12px",
          fontWeight: 600,
          alignItems: "center",
          textTransform:'unset'
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          border: "1px solid #ccd825",
          borderRadius: "4px",
          color: primaryColor,
          margin: "5px 0px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
        },
      },
    },
  },
});
