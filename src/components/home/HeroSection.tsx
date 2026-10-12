"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { EditorialCanvas } from "@/components/ui/EditorialCanvas";
import { HeroVisualComposition } from "@/components/home/HeroVisualComposition";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 bg-[var(--background)] overflow-hidden border-b border-[var(--border)] transition-colors duration-200"
      aria-labelledby="hero-title"
    >
      {/* Dynamic Background Dot Matrix Canvas */}
      <EditorialCanvas dotSpacing={38} />

      {/* Dark Theme Ambient Lighting Glow */}
      <div className="pointer-events-none absolute inset-0 hero-glow-radial z-0 opacity-80" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Editorial Bar: Index, Discipline & Availability */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)] mb-10 sm:mb-14 text-xs font-mono"
        >
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[var(--foreground-subtle)]">[ 00 // OVERVIEW ]</span>
            <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden="true" />
            <span className="text-[var(--foreground-secondary)] uppercase tracking-widest text-[11px]">
              Java Solutions // Enterprise Architecture
            </span>
          </div>

          <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-tight text-[11px]">
              Accepting enterprise engagements for 2026
            </span>
          </div>
        </motion.div>

        {/* Oversized Editorial Prominent Title */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-center max-w-6xl mx-auto mb-8 sm:mb-10"
        >
          <h1
            id="hero-title"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.75rem] font-medium tracking-[-0.035em] text-[var(--foreground)] leading-[0.98] transition-colors"
          >
            Technology engineered for zero downtime.
          </h1>
        </motion.div>

        {/* Supporting Narrative & Minimal CTA Bar */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="max-w-3xl mx-auto text-center space-y-8 mb-10 sm:mb-14"
        >
          <p className="text-base sm:text-lg md:text-xl text-[var(--foreground-secondary)] font-normal leading-relaxed transition-colors">
            We architect resilient server infrastructure, deploy high-throughput
            enterprise networks, build scalable AWS cloud systems, and customize
            Odoo ERP platforms for organizations that cannot afford failure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--foreground)] bg-[var(--surface-hover)] hover:bg-[var(--surface-card)] border border-[var(--border)] transition-all duration-200"
            >
              <span>Explore Disciplines</span>
              <ArrowDown className="w-4 h-4 text-[var(--foreground-muted)]" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        {/* Central Striking Artwork with Satellite Floating Visuals & Scroll-Linked Experience */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <HeroVisualComposition scrollContainerRef={heroRef} />
        </motion.div>

        {/* Editorial Baseline Metrics Divider & Interconnect Anchor */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="pt-8 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-mono"
        >
          <div className="p-3">
            <span className="block text-xl sm:text-2xl font-bold font-sans text-[var(--foreground)] tracking-tight">
              99.99%
            </span>
            <span className="text-[var(--foreground-muted)] uppercase tracking-wider text-[10px] mt-1 block">
              Multi-AZ SLA Target
            </span>
          </div>

          <div className="p-3">
            <span className="block text-xl sm:text-2xl font-bold font-sans text-[var(--foreground)] tracking-tight">
              10 Gbps
            </span>
            <span className="text-[var(--foreground-muted)] uppercase tracking-wider text-[10px] mt-1 block">
              Fiber Backbone LAG
            </span>
          </div>

          <div className="p-3">
            <span className="block text-xl sm:text-2xl font-bold font-sans text-[var(--foreground)] tracking-tight">
              7 Core
            </span>
            <span className="text-[var(--foreground-muted)] uppercase tracking-wider text-[10px] mt-1 block">
              Technical Disciplines
            </span>
          </div>

          <div className="p-3">
            <span className="block text-xl sm:text-2xl font-bold font-sans text-[var(--foreground)] tracking-tight">
              Zero
            </span>
            <span className="text-[var(--foreground-muted)] uppercase tracking-wider text-[10px] mt-1 block">
              Proprietary Lock-in
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
