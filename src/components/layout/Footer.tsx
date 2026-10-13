"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] pt-20 pb-12 transition-colors duration-200"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Large Editorial Headline Callout */}
        <div className="pb-16 border-b border-[var(--border)] mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)] font-mono block mb-3">
              {"// Get Started"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--foreground)] leading-[1.08]">
              Ready to elevate your IT infrastructure?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-all duration-200 shadow-sm self-start md:self-auto hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Let’s Talk</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* 4-Column Editorial Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-5 pr-0 lg:pr-8">
            <Link
              href="/"
              aria-label="Autocratic — Home"
              className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] rounded-sm"
            >
              <Logo variant="full" size={28} />
            </Link>
            <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed mb-6 max-w-sm">
              Complete enterprise IT solutions designed for modern organizations.
              From high-resilience systems administration and secure cloud architecture
              to custom ERP deployment and digital engineering.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--surface-hover)] border border-[var(--border)] text-xs text-[var(--foreground-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Security-first enterprise technology standards</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] font-mono block mb-5">
              Navigation
            </span>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] font-mono block mb-5">
              Capabilities
            </span>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Communications */}
          <div className="lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] font-mono block mb-5">
              Contact
            </span>
            <ul className="space-y-4 text-sm text-[var(--foreground-secondary)]">
              <li>
                <span className="text-xs text-[var(--foreground-subtle)] block uppercase tracking-wider mb-0.5 font-mono">
                  Direct Inquiries
                </span>
                <Link
                  href="/contact"
                  className="font-medium text-[var(--foreground)] hover:text-[var(--accent-bright)] transition-colors block"
                >
                  Consultation Form
                </Link>
                <span className="text-[11px] text-[var(--foreground-subtle)]">(Direct submission)</span>
              </li>
              <li>
                <span className="text-xs text-[var(--foreground-subtle)] block uppercase tracking-wider mb-0.5 font-mono">
                  Availability
                </span>
                <span className="text-[var(--foreground)] block font-medium">
                  Mon – Fri, 9am – 6pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--foreground-muted)]">
          <p>© {year} Autocratic. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
