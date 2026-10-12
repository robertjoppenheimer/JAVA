"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LifeBuoy } from "lucide-react";

export function SupportCTASection() {
  const shouldReduceMotion = useReducedMotion();

  const revealVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      className="py-24 sm:py-32 bg-[var(--background)] border-b border-[var(--border)] transition-colors duration-200"
      aria-labelledby="support-cta-title"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealVariant}
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface-card)] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-[var(--shadow-card)] dark:border-[rgba(110,170,220,0.25)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--pill-bg)] text-[var(--pill-text)] flex items-center justify-center">
                <LifeBuoy className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)] font-mono">
                {"// Rapid Response IT Support"}
              </span>
            </div>

            <h2
              id="support-cta-title"
              className="text-2xl sm:text-4xl font-medium tracking-tight text-[var(--foreground)] leading-[1.12] mb-4"
            >
              Need immediate technical assistance or system maintenance?
            </h2>
            <p className="text-base text-[var(--foreground-secondary)] font-normal leading-relaxed">
              We provide responsive helpdesk triage, scheduled preventative patching,
              and ongoing server administration to keep your workforce productive.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Request IT Support</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services/it-support"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--foreground)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-colors"
            >
              <span>View Support SLAs</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
