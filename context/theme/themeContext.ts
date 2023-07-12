import { createContext } from "react";
import { ThemeContext } from "./useTheme";
import defaultTheme from "./defaultTheme";

const themeContext = createContext<ThemeContext>(defaultTheme);

export default themeContext;
