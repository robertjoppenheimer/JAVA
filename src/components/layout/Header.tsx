"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--header-scrolled-bg)] backdrop-blur-md border-b border-[var(--header-scrolled-border)] py-4 shadow-xs"
            : "bg-[var(--header-bg)] backdrop-blur-sm border-b border-[var(--header-border)] py-5 sm:py-6"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity */}
            <Link
              href="/"
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] rounded-md"
              aria-label="Java Solutions — Home"
            >
              <Logo variant="full" size={26} />
            </Link>

            {/* Center: Desktop Navigation Bar */}
            <nav
              className="hidden md:flex items-center gap-8 text-[0.875rem] font-medium tracking-tight text-[var(--foreground-secondary)]"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 transition-colors duration-200 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-bright)] rounded-sm ${
                      active ? "text-[var(--foreground)] font-semibold" : ""
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--accent-bright)] rounded-full transition-all"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Availability Badge, Theme Switcher & Direct Action */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              <div
                className="hidden lg:flex items-center gap-2 text-xs text-[var(--foreground-secondary)] tracking-tight font-mono"
                title="Systems operational"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for projects</span>
              </div>

              {/* Theme Toggle Button */}
              <ThemeToggle />

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)]"
              >
                <span>Let’s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Controls: Theme Toggle & Hamburger Trigger */}
            <div className="flex md:hidden items-center gap-2.5">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded-lg text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] cursor-pointer"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Editorial Drawer */}
      <nav
        id="mobile-navigation"
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] md:hidden bg-[var(--background)] text-[var(--foreground)] flex flex-col transition-transform duration-300 ease-out shadow-2xl border-l border-[var(--border)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-subtle)]">
          <Logo variant="full" size={24} />
          <button
            onClick={closeMobile}
            className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] rounded-lg cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {/* Mobile Theme Toggle Card */}
          <div className="pb-2">
            <ThemeToggle variant="mobile" />
          </div>

          <div className="flex flex-col space-y-4 pt-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] font-mono">
              Navigation
            </span>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`text-xl font-medium tracking-tight transition-colors ${
                    active
                      ? "text-[var(--accent-bright)] font-semibold"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-8 border-t border-[var(--border-subtle)] space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] font-mono">
              Status
            </span>
            <div className="flex items-center gap-2 text-xs text-[var(--foreground)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for new projects</span>
            </div>
            <p className="text-xs text-[var(--foreground-muted)]">
              Inquiries: contact@javasolutions.com
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--background-secondary)]">
          <Link
            href="/contact"
            onClick={closeMobile}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full text-sm font-semibold text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-colors shadow-sm"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </>
  );
}
