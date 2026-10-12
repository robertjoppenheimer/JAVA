"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function AboutSection() {
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

  const pillars = [
    {
      title: "Direct Engineering Stewardship",
      desc: "Work directly with senior systems specialists, not account middlemen or sales intermediaries.",
    },
    {
      title: "Reliability Over Novelty",
      desc: "We deploy proven enterprise architectures and tested runbooks rather than fragile, unvetted experimental stacks.",
    },
    {
      title: "Clear Ownership & Handover",
      desc: "Full administrative credentials, documentation, and source code belong entirely to your organization from day one.",
    },
  ];

  return (
    <section
      className="py-24 sm:py-32 lg:py-36 bg-[var(--background-secondary)] border-b border-[var(--border)] transition-colors duration-200"
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Index */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealVariant}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
            [ 02 // PHILOSOPHY ]
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
            About Java Solutions
          </span>
        </motion.div>

        {/* Big Editorial Split Composition */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealVariant}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16"
        >
          <div className="lg:col-span-7">
            <h2
              id="about-title"
              className="text-3xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-[var(--foreground)] leading-[1.08]"
            >
              We engineer dependable technology foundations that give businesses room to grow.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-6 text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
            <p>
              Java Solutions is an enterprise IT consultancy built on technical clarity.
              Modern businesses rely heavily on seamless network connectivity, dependable
              cloud infrastructure, and integrated enterprise software to operate effectively.
            </p>
            <p className="text-sm sm:text-base text-[var(--foreground-muted)]">
              Rather than selling generic packages, we audit your environment, architect
              the appropriate solution, deploy it cleanly, and maintain it with vigilance.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-bright)] hover:underline transition-colors"
              >
                <span>Read our complete company profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 3 Editorial Pillar Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[var(--border)]">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={revealVariant}
              className="bg-[var(--surface-elevated)] p-8 rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 dark:hover:border-[#42D5FF]/40 dark:hover:shadow-[0_0_20px_rgba(22,136,212,0.15)]"
            >
              <div>
                <span className="font-mono text-xs text-[var(--foreground-subtle)] font-semibold block mb-4">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-bright)]" />
                <span>Verified Engineering Standard</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
