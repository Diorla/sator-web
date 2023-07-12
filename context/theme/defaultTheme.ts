import { ThemeContext } from "./useTheme";
import colors from "../../constants/colors";

const defaultTheme: ThemeContext = {
  mode: "light",
  palette: {
    ...colors,
  },
  font: {
    h1: {
      size: 28,
      weight: "300",
    },
    h2: {
      size: 24,
      weight: "500",
    },
    h3: {
      size: 20,
      weight: "700",
    },
    text: {
      size: 16,
      weight: "400",
    },
    small: {
      size: 14,
      weight: "400",
    },
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  main: {
    background: "#ffffff",
    text: "#000000",
  },
};
export default defaultTheme;
