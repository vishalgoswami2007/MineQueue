import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

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
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    localStorage.setItem(
      "darkMode",
      String(darkMode)
    );
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{ darkMode, setDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within ThemeProvider"
    );
  }

  return context;
}

export default ThemeProvider;