"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProjectSchematic } from "@/components/ui/ProjectSchematic";

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();

  const revealVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const featuredProject1 = projects[0]; // Network Overhaul
  const featuredProject2 = projects[2]; // AWS Cloud Migration
  const gridProjects = [projects[1], projects[3]]; // Odoo ERP & Secure Client Portal

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 lg:py-36 bg-[var(--background-secondary)] border-b border-[var(--border)] transition-colors duration-200"
      aria-labelledby="projects-title"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Editorial Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealVariant}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border)] mb-16 sm:mb-20"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
                [ 06 // PORTFOLIO ]
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
                Selected Work &amp; Blueprints
              </span>
            </div>
            <h2
              id="projects-title"
              className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--foreground)] leading-[1.04]"
            >
              Architectural blueprints &amp; deployment scenarios.
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
              Demonstration systems and deployment scenarios illustrating our engineering disciplines.
            </p>
            <span className="inline-block font-mono text-xs text-[var(--foreground-subtle)]">
              * Production client accounts protected under strict non-disclosure terms.
            </span>
          </div>
        </motion.div>

        {/* Feature 01: Large Asymmetrical Editorial Showcase (Visual Left, Narrative Right) */}
        {featuredProject1 && (
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={revealVariant}
            data-cursor="view"
            className="group mb-16 sm:mb-20 rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-10 lg:p-12 shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 dark:hover:border-[#42D5FF]/45 dark:hover:shadow-[0_0_35px_rgba(22,136,212,0.25)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual Preview */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[var(--border-strong)] shadow-sm transition-transform duration-500 group-hover:scale-[1.015]">
                <ProjectSchematic slug={featuredProject1.slug} />
              </div>

              {/* Narrative & Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)] font-mono text-xs">
                    <span className="text-[var(--accent-bright)] font-semibold">CASE // 01</span>
                    <span className="text-[var(--foreground-muted)] uppercase tracking-wider">{featuredProject1.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium text-[var(--foreground)] mb-3 tracking-tight group-hover:translate-x-1 transition-transform">
                    {featuredProject1.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-6 font-normal">
                    {featuredProject1.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-[var(--background-secondary)] mb-6 border border-[var(--border-subtle)]">
                    {featuredProject1.metrics.map((m) => (
                      <div key={m.label}>
                        <span className="block text-xs font-semibold text-[var(--foreground)] truncate">
                          {m.value}
                        </span>
                        <span className="text-[10px] text-[var(--foreground-muted)] font-mono block truncate">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredProject1.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[var(--foreground-secondary)] bg-[var(--surface-hover)] border border-[var(--border-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--foreground-subtle)]">{featuredProject1.clientType}</span>
                  <Link
                    href={`/projects#${featuredProject1.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-bright)] hover:underline transition-colors"
                  >
                    <span>Inspect Architecture Blueprint</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Feature 02: Large Inverted Asymmetrical Showcase (Narrative Left, Visual Right) */}
        {featuredProject2 && (
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={revealVariant}
            data-cursor="view"
            className="group mb-16 sm:mb-20 rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-10 lg:p-12 shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 dark:hover:border-[#42D5FF]/45 dark:hover:shadow-[0_0_35px_rgba(22,136,212,0.25)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Narrative & Metrics */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)] font-mono text-xs">
                    <span className="text-[var(--accent-bright)] font-semibold">CASE // 02</span>
                    <span className="text-[var(--foreground-muted)] uppercase tracking-wider">{featuredProject2.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium text-[var(--foreground)] mb-3 tracking-tight group-hover:translate-x-1 transition-transform">
                    {featuredProject2.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-6 font-normal">
                    {featuredProject2.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-[var(--background-secondary)] mb-6 border border-[var(--border-subtle)]">
                    {featuredProject2.metrics.map((m) => (
                      <div key={m.label}>
                        <span className="block text-xs font-semibold text-[var(--foreground)] truncate">
                          {m.value}
                        </span>
                        <span className="text-[10px] text-[var(--foreground-muted)] font-mono block truncate">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredProject2.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[var(--foreground-secondary)] bg-[var(--surface-hover)] border border-[var(--border-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--foreground-subtle)]">{featuredProject2.clientType}</span>
                  <Link
                    href={`/projects#${featuredProject2.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-bright)] hover:underline transition-colors"
                  >
                    <span>Inspect Architecture Blueprint</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Visual Preview */}
              <div className="lg:col-span-7 order-1 lg:order-2 rounded-2xl overflow-hidden border border-[var(--border-strong)] shadow-sm transition-transform duration-500 group-hover:scale-[1.015]">
                <ProjectSchematic slug={featuredProject2.slug} />
              </div>
            </div>
          </motion.article>
        )}

        {/* Dual Secondary Projects Grid (Odoo ERP & Web Document Portal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {gridProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={revealVariant}
              data-cursor="view"
              className="group bg-[var(--surface-elevated)] rounded-3xl border border-[var(--border)] p-6 sm:p-8 flex flex-col justify-between shadow-[var(--shadow-card)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:hover:border-[#42D5FF]/45 dark:hover:shadow-[0_0_30px_rgba(22,136,212,0.2)]"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)] font-mono text-xs">
                  <span className="text-[var(--accent-bright)] font-semibold">CASE // 0{idx + 3}</span>
                  <span className="text-[var(--foreground-muted)] uppercase tracking-wider">{project.category}</span>
                </div>

                <div className="mb-6 rounded-xl overflow-hidden border border-[var(--border-strong)] shadow-sm group-hover:scale-[1.015] transition-transform duration-300">
                  <ProjectSchematic slug={project.slug} />
                </div>

                <h3 className="text-xl sm:text-2xl font-medium text-[var(--foreground)] mb-2.5 tracking-tight group-hover:translate-x-0.5 transition-transform">
                  {project.title}
                </h3>

                <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[var(--background-secondary)] mb-6 border border-[var(--border-subtle)]">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="block text-xs font-semibold text-[var(--foreground)] truncate">
                        {m.value}
                      </span>
                      <span className="text-[10px] text-[var(--foreground-muted)] font-mono block truncate">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-bright)]" />
                  <span>Verified Blueprint</span>
                </div>

                <Link
                  href={`/projects#${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-bright)] hover:underline transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Projects Portfolio Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={revealVariant}
          className="mt-16 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] bg-[var(--surface-elevated)] hover:bg-[var(--pill-bg)] hover:text-[var(--pill-text)] border border-[var(--border)] shadow-sm transition-all duration-300"
          >
            <span>View Full Portfolio &amp; Technical Specifications</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
