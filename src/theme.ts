import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B8B8",
    },
    secondary: {
      main: "#3f51b5",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "2.3rem",
    },
    h3: {
      fontSize: "2.1rem",
    },
    h4: {
      fontSize: "1.9rem",
    },
    h5: {
      fontSize: "1.7rem",
    },
    h6: {
      fontSize: "1.5rem",
    },
  },
});

export default theme;
