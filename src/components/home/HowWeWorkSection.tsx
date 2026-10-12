"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HowWeWorkSection() {
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

  const steps = [
    {
      step: "01",
      title: "Discovery & Infrastructure Audit",
      description:
        "We evaluate your current network topology, server environments, cloud spend, and operational software to identify bottlenecks and vulnerabilities.",
    },
    {
      step: "02",
      title: "Architectural Planning & Blueprint",
      description:
        "Our engineers design a clear technical specification detailing hardware allocations, cloud topology, security rules, and cutover milestones.",
    },
    {
      step: "03",
      title: "Staging, Deployment & Cutover",
      description:
        "We configure and test solutions in isolated staging environments before executing phased, zero-downtime production cutovers.",
    },
    {
      step: "04",
      title: "Telemetry, Handover & Support",
      description:
        "We provide comprehensive documentation, train internal stakeholders, and establish automated monitoring alarms for long-term health.",
    },
  ];

  return (
    <section
      className="py-24 sm:py-32 lg:py-36 bg-[var(--background-secondary)] border-b border-[var(--border)] transition-colors duration-200"
      aria-labelledby="how-we-work-title"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealVariant}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
              [ 04 // METHODOLOGY ]
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              How We Work
            </span>
          </div>
          <h2
            id="how-we-work-title"
            className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--foreground)] leading-[1.04] mb-4"
          >
            A disciplined engineering process.
          </h2>
          <p className="text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
            From initial audit to long-term operational health, every engagement follows
            a transparent, four-phase structured methodology.
          </p>
        </motion.div>

        {/* 4-Step Linear Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <motion.div
              key={item.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={revealVariant}
              className="bg-[var(--surface-elevated)] p-8 sm:p-9 rounded-3xl border border-[var(--border)] shadow-[var(--shadow-card)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 dark:hover:border-[#42D5FF]/40 dark:hover:shadow-[0_0_20px_rgba(22,136,212,0.15)]"
            >
              <div>
                <span className="font-mono text-xs text-[var(--accent-bright)] font-semibold block mb-8">
                  PHASE {item.step}
                </span>
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--foreground-subtle)] font-mono">
                <span>STAGE {item.step} / 04</span>
                <span className="text-[var(--accent-bright)]">INSPECTION</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
