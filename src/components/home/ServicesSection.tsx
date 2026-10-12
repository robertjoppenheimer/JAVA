"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { ArrowUpRight, Plus, Minus, CheckCircle2 } from "lucide-react";
import { ServiceVisualTreatment } from "@/components/home/ServiceVisualTreatment";
import { FloatingServiceTiles } from "@/components/home/FloatingServiceTiles";

export function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>("infrastructure");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const shouldReduceMotion = useReducedMotion();

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSelectFromTile = (id: string) => {
    setExpandedId(id);
    const element = document.getElementById(`service-item-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const categories = ["All", "Core Systems", "Connectivity", "Cloud & DevOps", "Business Software", "Security & Governance"];

  const filteredServices = selectedCategory === "All"
    ? services
    : services.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(s.category.toLowerCase()));

  const revealVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="services"
      className="py-24 sm:py-32 lg:py-36 bg-[var(--background)] border-b border-[var(--border)] transition-colors duration-200"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealVariant}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border)] mb-10 lg:mb-14"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
                [ 01 // SERVICES ]
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)] font-mono">
                Core Disciplines
              </span>
            </div>
            <h2
              id="services-title"
              className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--foreground)] leading-[1.04]"
            >
              Tailored capabilities for modern enterprises.
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
            We deliver seven foundational technical disciplines, eliminating the need
            to coordinate multiple fragmented IT agencies.
          </p>
        </motion.div>

        {/* Editorial Category Filter Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={revealVariant}
          className="flex flex-wrap items-center gap-2 pb-8 mb-8 border-b border-[var(--border-subtle)]"
          role="tablist"
          aria-label="Filter services by discipline category"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[var(--pill-bg)] text-[var(--pill-text)] font-semibold shadow-xs"
                    : "bg-[var(--surface-hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--border-subtle)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Signature Scroll-Driven Floating Service Tiles Constellation */}
        <div className="mb-14 sm:mb-20">
          <FloatingServiceTiles
            selectedCategory={selectedCategory}
            onSelectService={handleSelectFromTile}
          />
        </div>

        {/* Editorial Sub-Header: Deep-Dive Technical Specifications */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)] mb-6 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[var(--foreground-subtle)]">
              [ DETAILED SPECIFICATIONS // RUNBOOKS ]
            </span>
            <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden="true" />
            <span className="text-[var(--foreground-secondary)] uppercase tracking-wider text-[11px]">
              Interactive Schematics &amp; Deliverables
            </span>
          </div>
          <span className="text-[var(--foreground-muted)] text-[11px]">
            Expand any discipline below to view technical diagrams
          </span>
        </div>

        {/* Editorial Numbered Roster with Bespoke Visual Treatments */}
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {filteredServices.map((service, index) => {
            const isExpanded = expandedId === service.id;
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.id}
                id={`service-item-${service.id}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={revealVariant}
                className="group py-8 sm:py-10 transition-colors duration-200 hover:bg-[var(--surface-hover)]/40"
              >
                {/* Clickable Header Row */}
                <button
                  type="button"
                  className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] rounded-lg p-2"
                  onClick={() => toggleExpand(service.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`service-details-${service.id}`}
                >
                  <div className="flex items-start md:items-center gap-6 sm:gap-10">
                    <span className="font-mono text-sm sm:text-base font-semibold text-[var(--foreground-subtle)] group-hover:text-[var(--accent-bright)] transition-colors">
                      {indexStr}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[var(--foreground)] group-hover:translate-x-1 transition-transform duration-200">
                        {service.title}
                      </h3>
                      <span className="inline-block mt-1 text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-12 md:pl-0">
                    <span className="hidden sm:inline-block text-xs text-[var(--foreground-subtle)] font-mono">
                      {isExpanded ? "COLLAPSE SPEC" : "EXPAND SPEC"}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] group-hover:border-[var(--accent-bright)] group-hover:text-[var(--accent-bright)] transition-colors">
                      {isExpanded ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Editorial Content Drawer with Bespoke Visual */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`service-details-${service.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 pt-8 border-t border-[var(--border-subtle)] pl-0 md:pl-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                        {/* Left: Narrative Overview & Key Capabilities */}
                        <div className="lg:col-span-6 space-y-6">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] font-mono block mb-2">
                              Operational Scope
                            </span>
                            <p className="text-base sm:text-lg text-[var(--foreground)] leading-relaxed font-normal mb-3">
                              {service.description}
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                              {service.longDescription}
                            </p>
                          </div>

                          <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)] font-mono block">
                              Engineering Capabilities
                            </span>
                            <ul className="space-y-2 text-sm text-[var(--foreground)]">
                              {service.features.map((f) => (
                                <li key={f} className="flex items-start gap-2.5">
                                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-bright)] mt-0.5 flex-shrink-0" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Direct Actions: Preselected Consultation & Full Specification */}
                          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <Link
                              href={`/contact?service=${encodeURIComponent(service.title)}`}
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-all shadow-sm"
                            >
                              <span>Consult on {service.category}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>

                            <Link
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--accent-bright)] hover:underline py-2 sm:py-0 transition-colors"
                            >
                              <span>Full Documentation &amp; Runbooks</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>

                        {/* Right: Bespoke Visual Schematic Treatment for this Specific Discipline */}
                        <div className="lg:col-span-6 space-y-4">
                          <ServiceVisualTreatment serviceId={service.id} />

                          {/* Standard Deliverables Badge Strip */}
                          <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)] font-mono block">
                              Standard Deliverables Provided
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {service.deliverables.map((d) => (
                                <span
                                  key={d}
                                  className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[var(--foreground-secondary)] bg-[var(--background-secondary)] border border-[var(--border-subtle)]"
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Catalog Link */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] bg-[var(--surface-hover)] hover:bg-[var(--surface-card)] border border-[var(--border)] transition-colors shadow-sm"
          >
            <span>View Complete Service Catalog &amp; Standards</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
