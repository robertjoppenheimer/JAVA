"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function FeaturedSolutionsSection() {
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

  const solutions = [
    {
      category: "Cloud Engineering",
      title: "Amazon Web Services (AWS) Architecture",
      desc: "Multi-AZ VPC topologies, elastic EC2 compute, automated Aurora/RDS database replication, and Terraform Infrastructure as Code for high-availability workloads.",
      link: "/services/cloud-solutions",
      spec: "High Availability // Multi-AZ",
    },
    {
      category: "Enterprise Software",
      title: "Odoo ERP Business Operations",
      desc: "Unify warehouse inventory, multi-channel point of sale, purchase order workflows, and real-time financial reporting into an integrated business platform.",
      link: "/services/odoo-erp",
      spec: "Open Source // Python Core",
    },
    {
      category: "Connectivity & Security",
      title: "Enterprise Networking & Firewall Hardening",
      desc: "Structured fiber backbones, high-density Wi-Fi 6 coverage maps, isolated VLAN boundaries, and redundant next-generation firewall perimeter protection.",
      link: "/services/networking",
      spec: "10GbE Backbone // VLAN Segmented",
    },
    {
      category: "Digital Platforms",
      title: "Custom Web Application Engineering",
      desc: "Modern Next.js and TypeScript web applications featuring authenticated client portals, end-to-end encrypted storage, and Sub-second Core Web Vitals.",
      link: "/services/web-development",
      spec: "TypeScript // Next.js // API-first",
    },
  ];

  return (
    <section
      className="py-24 sm:py-32 lg:py-36 bg-[var(--background)] border-b border-[var(--border)] transition-colors duration-200"
      aria-labelledby="featured-solutions-title"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealVariant}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border)] mb-12 lg:mb-16"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
                [ 05 // ARCHITECTURES ]
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
                Featured Implementations
              </span>
            </div>
            <h2
              id="featured-solutions-title"
              className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--foreground)] leading-[1.04]"
            >
              Proven architectural implementations.
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
            Engineered systems designed to resolve complex technical challenges
            across cloud, infrastructure, and enterprise software.
          </p>
        </motion.div>

        {/* Asymmetrical 2x2 Editorial Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={revealVariant}
              data-cursor="view"
              className="group p-8 sm:p-10 rounded-3xl border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] shadow-[var(--shadow-card)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between dark:hover:border-[#42D5FF]/45 dark:hover:shadow-[0_0_30px_rgba(22,136,212,0.2)]"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--border-subtle)]">
                  <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
                    {`0${index + 1} // ${item.category}`}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--accent-bright)] uppercase">
                    {item.spec}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-medium text-[var(--foreground)] mb-3 tracking-tight group-hover:translate-x-0.5 transition-transform">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-6 font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-bright)] hover:underline transition-colors"
                >
                  <span>Explore Architecture &amp; Specifications</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
