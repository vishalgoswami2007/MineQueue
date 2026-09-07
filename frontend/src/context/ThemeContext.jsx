import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext.js";

function getInitialTheme() {
  const savedTheme = localStorage.getItem("darkMode");

  if (savedTheme !== null) {
    return savedTheme === "true";
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
}

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;