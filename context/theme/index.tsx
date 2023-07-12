import React, { useState, useEffect } from "react";
import UserContext from "./themeContext";
import defaultTheme from "./defaultTheme";
import { ThemeContext } from "./useTheme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [theme, setTheme] = useState(defaultTheme);
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  useEffect(() => {
    // if (
    //   window.matchMedia &&
    //   window.matchMedia("(prefers-color-scheme: dark)").matches
    // ) {
    //   const allTheme = {
    //     ...defaultTheme,
    //     mode: "dark",
    //     main: { background: "#101010", text: "#ffffff" },
    //   };
    //   setCurrentTheme(allTheme);
    // }
  }, []);

  return (
    <UserContext.Provider value={currentTheme}>
      {children}
      <style jsx global>{`
        body {
          margin: 0;

          background: ${currentTheme.main.background};
          color: ${currentTheme.main.text};
          margin: 0;
          padding: 0;
        }
      `}</style>
    </UserContext.Provider>
  );
}
