"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "java-solutions-theme";

function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener("themechange", callback);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMediaChange = () => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) {
        const nextTheme = mediaQuery.matches ? "dark" : "light";
        const root = document.documentElement;
        root.setAttribute("data-theme", nextTheme);
        if (nextTheme === "dark") {
          root.classList.add("dark");
          root.classList.remove("light");
        } else {
          root.classList.add("light");
          root.classList.remove("dark");
        }
        callback();
      }
    } catch {
      callback();
    }
  };

  mediaQuery.addEventListener("change", handleMediaChange);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("themechange", callback);
    mediaQuery.removeEventListener("change", handleMediaChange);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  const dataTheme = document.documentElement.getAttribute("data-theme") as Theme;
  if (dataTheme === "light" || dataTheme === "dark") {
    return dataTheme;
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Ignore storage errors
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

function subscribeMounted() {
  return () => {};
}

function getMountedSnapshot(): boolean {
  return true;
}

function getMountedServerSnapshot(): boolean {
  return false;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getThemeServerSnapshot);
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getMountedServerSnapshot);

  const applyTheme = useCallback((nextTheme: Theme, persist = true) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.setAttribute("data-theme", nextTheme);
      if (nextTheme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }

    if (persist && typeof window !== "undefined") {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // Handle private browsing or storage quota issues gracefully
      }
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("themechange"));
    }
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme, true);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const currentTheme = getThemeSnapshot();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
