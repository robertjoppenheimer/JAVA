import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowUpRight, FlaskConical, CheckCircle2 } from "lucide-react";
import { ProjectSchematic } from "@/components/ui/ProjectSchematic";

export const metadata: Metadata = {
  title: "Technical Scenarios & Blueprints",
  description:
    "Explore illustrative deployment blueprints and technical scenarios across enterprise networking, cloud migration, Odoo ERP, and web engineering.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-24 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      {/* Editorial Header */}
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
              [ 03 / PORTFOLIO ]
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              Demonstration Scenarios
            </span>
          </div>

          <div className="max-w-4xl mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-tight text-[var(--foreground)] leading-[1.05]">
              Architectural blueprints & deployment scenarios.
            </h1>
          </div>

          <p className="max-w-2xl text-lg sm:text-xl text-[var(--foreground-secondary)] font-normal leading-relaxed mb-6">
            Explore illustrative technical implementations showing how we resolve
            complex networking, virtualization, cloud migration, and ERP modernization challenges.
          </p>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface-hover)] text-xs text-[var(--foreground-secondary)]">
            <FlaskConical className="w-4 h-4 text-[var(--accent-bright)]" />
            <span>
              Concept & demonstration scenarios // Client production accounts protected under strict NDA.
            </span>
          </div>
        </div>
      </section>

      {/* Projects Roster */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {projects.map((project, index) => {
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <article
                key={project.id}
                id={project.slug}
                className="p-8 sm:p-12 lg:p-14 rounded-3xl border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] transition-all duration-300 dark:hover:border-[#42D5FF]/40 dark:hover:shadow-[0_0_35px_rgba(22,136,212,0.2)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Index, Category, Title, Overview & Schematic */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-[var(--accent-bright)]">
                          {indexStr}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                          {project.category}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[var(--foreground-subtle)]">
                        {`${project.year} // ${project.clientType}`}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[var(--foreground)] leading-tight">
                      {project.title}
                    </h2>

                    <p className="text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
                      {project.description}
                    </p>

                    {/* Integrated Architectural Schematic Visual */}
                    <div className="rounded-xl overflow-hidden border border-[var(--border-strong)] shadow-sm">
                      <ProjectSchematic slug={project.slug} />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
                      <div>
                        <span className="text-xs font-mono uppercase text-[var(--accent-bright)] block mb-1">
                          The Operational Challenge
                        </span>
                        <p className="text-sm text-[var(--foreground)] leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>

                      <div>
                        <span className="text-xs font-mono uppercase text-[var(--accent-bright)] block mb-1">
                          The Engineered Solution
                        </span>
                        <p className="text-sm text-[var(--foreground)] leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-md text-xs font-mono text-[var(--foreground-secondary)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Technical Metrics Box */}
                  <div className="lg:col-span-5 bg-[var(--surface-elevated)] p-8 rounded-2xl border border-[var(--border)] space-y-6 shadow-sm lg:sticky lg:top-28">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)] block font-mono">
                      Target Architectural Metrics
                    </span>

                    <div className="space-y-4">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-subtle)] flex items-center justify-between"
                        >
                          <span className="text-xs text-[var(--foreground-muted)] font-mono">
                            {m.label}
                          </span>
                          <span className="text-sm font-semibold text-[var(--foreground)]">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>
                        Verified architectural design pattern. Can be provisioned and customized for client environments.
                      </span>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-subtle)]">
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-colors shadow-sm"
                      >
                        <span>Request Architecture Discussion</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="p-10 sm:p-14 rounded-3xl bg-[#081525] border border-[rgba(110,170,220,0.25)] text-[#F3F7FC] shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#42D5FF] block mb-3 font-mono">
                {"// Custom Scope"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">
                Have a unique infrastructure or software requirement?
              </h3>
              <p className="text-sm text-[#A9B9CC] leading-relaxed">
                Contact our engineering team to review your specific environment and build a tailored technical plan.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-tight text-[#050B14] bg-[#42D5FF] hover:bg-[#6BDFFF] transition-all duration-200 flex-shrink-0 shadow-[0_0_20px_rgba(66,213,255,0.3)] hover:scale-[1.02]"
            >
              <span>Initiate Scope Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
