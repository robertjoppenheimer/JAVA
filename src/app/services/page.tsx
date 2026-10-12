import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise IT Services",
  description:
    "Explore our complete enterprise IT services: infrastructure, enterprise networking, AWS cloud, Odoo ERP, web engineering, support, and cybersecurity.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      {/* Editorial Page Header */}
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
              [ 01 / CATALOG ]
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              Service Catalog
            </span>
          </div>

          <div className="max-w-4xl mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-tight text-[var(--foreground)] leading-[1.05]">
              Comprehensive IT solutions for modern operations.
            </h1>
          </div>

          <p className="max-w-2xl text-lg sm:text-xl text-[var(--foreground-secondary)] font-normal leading-relaxed">
            From physical server hardware and high-throughput networking backbones
            to custom ERP workflows and cloud architecture, we engineer dependable solutions.
          </p>
        </div>
      </section>

      {/* Editorial Service Roster */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">
            {services.map((service, index) => {
              const indexStr = String(index + 1).padStart(2, "0");
              return (
                <article
                  key={service.id}
                  id={service.slug}
                  className="p-8 sm:p-12 rounded-3xl border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start dark:hover:border-[#42D5FF]/40 dark:hover:shadow-[0_0_30px_rgba(22,136,212,0.2)]"
                >
                  {/* Left Column: Number & Title */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-[var(--accent-bright)]">
                        {indexStr}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                        {service.category}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--foreground)] leading-snug">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed font-normal">
                      {service.description}
                    </p>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-all duration-200 shadow-sm"
                      >
                        <span>Consult on Discipline</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-bright)] hover:underline transition-colors px-2 py-1"
                      >
                        <span>Specifications &amp; SLAs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Features & Deliverables Checklist */}
                  <div className="lg:col-span-7 bg-[var(--surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border)] space-y-6 shadow-sm">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)] font-mono block mb-4">
                        Core Capabilities
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((f) => (
                          <div
                            key={f}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[var(--foreground)]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[var(--accent-bright)] mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[var(--border-subtle)]">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)] font-mono block mb-3">
                        Standard Deliverables
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((d) => (
                          <span
                            key={d}
                            className="px-3 py-1 rounded-md text-xs font-mono text-[var(--foreground-secondary)] bg-[var(--background-secondary)] border border-[var(--border-subtle)]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Consultation CTA */}
      <section className="pt-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="p-10 sm:p-14 rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] dark:bg-[#081525] dark:border-[rgba(110,170,220,0.25)] dark:text-[#F3F7FC] shadow-[var(--shadow-elevated)] flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] dark:text-[#42D5FF] block mb-3 font-mono">
                {"// Custom Requirement?"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2 text-[var(--foreground)] dark:text-[#F3F7FC]">
                Need a multi-disciplinary technical deployment?
              </h3>
              <p className="text-sm text-[var(--foreground-secondary)] dark:text-[#A9B9CC] leading-relaxed">
                We design tailored scopes combining on-premise networking, AWS cloud,
                and custom ERP implementations.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] dark:text-[#050B14] dark:bg-[#42D5FF] dark:hover:bg-[#6BDFFF] transition-all duration-200 flex-shrink-0 shadow-md hover:scale-[1.02]"
            >
              <span>Discuss Requirements</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
