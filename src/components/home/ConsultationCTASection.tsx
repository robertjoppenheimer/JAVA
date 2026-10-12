"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function ConsultationCTASection() {
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
      className="relative py-24 sm:py-36 bg-[var(--background-secondary)] text-[var(--foreground)] dark:bg-[#050B14] dark:text-white overflow-hidden border-t border-[var(--border)] dark:border-[rgba(110,170,220,0.2)] transition-colors duration-200"
      aria-labelledby="consultation-cta-title"
    >
      {/* Cinematic Radial Accent Lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-60"
        style={{
          background: "radial-gradient(circle at 85% 40%, rgba(22, 136, 212, 0.25) 0%, rgba(66, 213, 255, 0.08) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealVariant}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-16 border-b border-[var(--border)] dark:border-[rgba(110,170,220,0.2)]"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs font-semibold text-[var(--accent)] dark:text-[#42D5FF]">
                [ 07 // INITIATE ]
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] dark:text-[#A9B9CC]">
                Start a Conversation
              </span>
            </div>

            <h2
              id="consultation-cta-title"
              className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-[-0.035em] text-[var(--foreground)] dark:text-[#F3F7FC] leading-[1.04]"
            >
              Let’s build something dependable together.
            </h2>
          </div>

          <div className="max-w-md space-y-6">
            <p className="text-base sm:text-lg text-[var(--foreground-secondary)] dark:text-[#A9B9CC] font-normal leading-relaxed">
              Tell us about your upcoming infrastructure migration, networking setup,
              ERP deployment, or custom web platform.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] dark:text-[#050B14] dark:bg-[#42D5FF] dark:hover:bg-[#6BDFFF] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Schedule a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Details Row */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-[var(--foreground-secondary)] dark:text-[#A9B9CC]">
          <div>
            <span className="block text-xs uppercase tracking-wider text-[var(--foreground-subtle)] dark:text-[#7B93AD] font-mono mb-1">
              Location
            </span>
            <span className="text-[var(--foreground)] dark:text-[#F3F7FC] font-medium">Remote &amp; On-Site Deployments</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-[var(--foreground-subtle)] dark:text-[#7B93AD] font-mono mb-1">
              Inquiries
            </span>
            <span className="text-[var(--foreground)] dark:text-[#F3F7FC] font-medium">contact@javasolutions.com</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-[var(--foreground-subtle)] dark:text-[#7B93AD] font-mono mb-1">
              Response Time
            </span>
            <span className="text-[var(--foreground)] dark:text-[#F3F7FC] font-medium">Within 1 Business Day</span>
          </div>
        </div>
      </div>
    </section>
  );
}
