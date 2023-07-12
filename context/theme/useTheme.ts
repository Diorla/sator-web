import { useContext } from "react";
import themeContext from "./themeContext";

type Color = {
  main: string;
  dark: string;
  light: string;
  text: string;
};

type Font = {
  size: number;
  weight: "300" | "400" | "500" | "600" | "700" | "800" | "900";
  style?: string;
};

export interface ThemeContext {
  mode: string;
  palette: {
    primary: Color;
    secondary: Color;
    accent: Color;
    shade: Color;
    error: Color;
    warning: Color;
    success: Color;
  };
  font: {
    h1: Font;
    h2: Font;
    h3: Font;
    text: Font;
    small: Font;
  };
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  main: {
    background: string;
    text: string;
  };
}

export default function useTheme() {
  return useContext<ThemeContext>(themeContext);
}
