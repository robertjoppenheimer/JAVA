"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Cpu, Clock, Layers } from "lucide-react";

export function WhyWorkWithUsSection() {
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

  const differentiators = [
    {
      index: "01",
      icon: ShieldCheck,
      title: "Security-Hardened by Default",
      description:
        "Every deployment — whether a local subnet, an AWS VPC, or an Odoo ERP database — adheres to strict least-privilege access, encrypted transit, and perimeter firewall policies.",
    },
    {
      index: "02",
      icon: Cpu,
      title: "Pragmatic Architecture",
      description:
        "We build solutions proportional to your exact needs and budget. We never introduce unnecessary complexity or proprietary vendor lock-in that restricts future agility.",
    },
    {
      index: "03",
      icon: Clock,
      title: "Predictable Delivery Timelines",
      description:
        "Phased implementation schedules with clear milestones, regular progress reviews, and thorough pre-production staging before any cutover is executed.",
    },
    {
      index: "04",
      icon: Layers,
      title: "End-to-End System Integration",
      description:
        "We bridge physical hardware with cloud infrastructure and application software, ensuring that all components of your technology ecosystem communicate seamlessly.",
    },
  ];

  return (
    <section
      className="py-24 sm:py-32 lg:py-36 bg-[var(--background)] border-b border-[var(--border)] transition-colors duration-200"
      aria-labelledby="why-work-title"
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
              [ 03 // STANDARDS ]
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              Why Partner With Us
            </span>
          </div>
          <h2
            id="why-work-title"
            className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--foreground)] leading-[1.04] mb-4"
          >
            Built on accountability, clarity, and precision.
          </h2>
          <p className="text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
            Our operational principles govern every system we deploy, ensuring that
            your investment yields lasting stability and demonstrable peace of mind.
          </p>
        </motion.div>

        {/* 4-Item Restrained Grid with Delicate Hairline Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--border)]">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={revealVariant}
                className="p-8 sm:p-12 border-b border-r border-[var(--border)] transition-colors duration-200 hover:bg-[var(--surface-hover)]/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
                      {item.index}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--accent-bright)]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-[var(--foreground)] mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
