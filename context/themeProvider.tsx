"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const themeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  //   const handleThemeChange = () => {
  //     if (mode === "dark") {
  //       setMode("light");
  //       document.documentElement.classList.add("light");
  //     } else {
  //       setMode("dark");
  //       document.documentElement.classList.add("dark");
  //     }
  //   };

  //   useEffect(() => {
  //     handleThemeChange();
  //   }, [mode]);

  return (
    <themeContext.Provider value={{ mode, setMode }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(themeContext);

  if (context === undefined) {
    throw new Error("theme context is not defined ");
  }

  return context;
}
