"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function ThemeToggle({ className = "", variant = "desktop" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // If not mounted yet, render placeholder with same dimensions to avoid layout shift
  if (!mounted) {
    if (variant === "mobile") {
      return (
        <div
          className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] opacity-70 ${className}`}
          aria-hidden="true"
        >
          <span className="text-sm font-medium">Appearance</span>
          <div className="w-8 h-8 rounded-full bg-[var(--surface-hover)]" />
        </div>
      );
    }
    return (
      <div
        className={`w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] opacity-70 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] cursor-pointer select-none ${className}`}
        aria-label={label}
        title={label}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] transition-transform duration-300">
            {isDark ? (
              <Sun className="w-4 h-4 text-[#42D5FF] transition-transform duration-300 rotate-0" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--foreground)] transition-transform duration-300 -rotate-12" aria-hidden="true" />
            )}
          </div>
          <div className="text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)] block">
              Appearance
            </span>
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {isDark ? "Deep Navy (Dark Mode)" : "Editorial (Light Mode)"}
            </span>
          </div>
        </div>

        <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--accent-bright)] border border-[var(--border)]">
          Toggle
        </span>
      </button>
    );
  }

  // Desktop Toggle
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] hover:scale-105 active:scale-95 cursor-pointer ${className}`}
      aria-label={label}
      title={label}
    >
      <span className="sr-only">{label}</span>
      {isDark ? (
        <Sun
          className="w-4 h-4 text-[#42D5FF] transition-transform duration-300 rotate-0 hover:rotate-45"
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="w-4 h-4 text-[var(--foreground)] transition-transform duration-300 -rotate-12 hover:rotate-0"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
