import { createTheme } from "@mui/material";

const primaryColor = "#0072E5";
const secondaryColor = "#C70011";
const disabledColor = "#ccc";

const fontFamily = "Enriqueta";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      dark: "#003A75",
      light: "#3399FF",
    },
    secondary: { main: secondaryColor, dark: "#570007", light: "#FF505F" },
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
          textTransform: "uppercase",
        },

        text: ({ ownerState, theme }) => ({
          "& span svg": {
            color: !ownerState.disabled
              ? ownerState.color !== "inherit" && ownerState.color
                ? theme.palette[ownerState.color].main
                : "inherit"
              : disabledColor,
          },
          "&:hover": {
            backgroundColor:
              ownerState.color !== "inherit" && ownerState.color
                ? theme.palette[ownerState.color].main
                : "inherit",
            color: "white",
            "& span svg": {
              color: "#ccd825",
            },
          },
        }),
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
