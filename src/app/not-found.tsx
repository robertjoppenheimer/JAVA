import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] pt-32 pb-24 bg-[var(--background)] text-[var(--foreground)] flex items-center transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-3xl">
          {/* Editorial Index Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
              [ 404 // ERROR ]
            </span>
            <span className="h-px w-8 bg-[var(--border-strong)]" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              Route Not Found
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[var(--foreground)] leading-[1.05] mb-6">
            The requested system path does not exist.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--foreground-secondary)] font-normal leading-relaxed mb-10">
            The endpoint or resource you are attempting to reach has either been
            relocated, renamed, or is unavailable in the current production environment.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--foreground)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-colors"
            >
              <span>Contact Support</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Route Directory */}
          <div className="pt-8 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] block mb-4 font-mono">
              Available System Routes
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/services"
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] hover:border-[var(--accent-bright)] transition-all text-xs font-medium text-[var(--foreground)] flex items-center justify-between"
              >
                <span>Services</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
              </Link>
              <Link
                href="/projects"
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] hover:border-[var(--accent-bright)] transition-all text-xs font-medium text-[var(--foreground)] flex items-center justify-between"
              >
                <span>Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
              </Link>
              <Link
                href="/about"
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] hover:border-[var(--accent-bright)] transition-all text-xs font-medium text-[var(--foreground)] flex items-center justify-between"
              >
                <span>About</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
              </Link>
              <Link
                href="/contact"
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] hover:border-[var(--accent-bright)] transition-all text-xs font-medium text-[var(--foreground)] flex items-center justify-between"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
