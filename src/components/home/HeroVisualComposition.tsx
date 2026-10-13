"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { ArrowUpRight, Cpu, ShieldCheck, Network, Cloud, Layers, Terminal } from "lucide-react";

interface HeroVisualProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPointerSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerServerSnapshot(): boolean {
  return false;
}

export function HeroVisualComposition({ scrollContainerRef }: HeroVisualProps) {
  const shouldReduceMotion = useReducedMotion();
  const internalRef = useRef<HTMLDivElement>(null);
  const targetRef = scrollContainerRef || internalRef;

  const hasFinePointer = useSyncExternalStore(subscribePointer, getPointerSnapshot, getPointerServerSnapshot);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll tracking linked to hero section container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (!hasFinePointer || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized mouse coordinate (-1 to 1) without causing React re-renders
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasFinePointer, shouldReduceMotion, mouseX, mouseY]);

  // Scroll-linked transforms for core monolith & satellite preview elements
  // When motion is reduced, keep transforms neutral
  const coreScale = useTransform(scrollYProgress, [0, 0.8], [1, shouldReduceMotion ? 1 : 0.96]);
  const coreY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 50]);
  const satelliteSpreadLeft = useTransform(scrollYProgress, [0, 0.7], [0, shouldReduceMotion ? 0 : -24]);
  const satelliteSpreadRight = useTransform(scrollYProgress, [0, 0.7], [0, shouldReduceMotion ? 0 : 24]);
  const satelliteOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.9, shouldReduceMotion ? 1 : 0.5]);
  const tracePulse = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.85, 0.4]);

  // Smooth mouse parallax motion values (hardware accelerated, zero layout shifts)
  const mxCore = useTransform(mouseX, (v) => (hasFinePointer && !shouldReduceMotion ? v * 5 : 0));
  const mySat1 = useTransform(mouseY, (v) => (hasFinePointer && !shouldReduceMotion ? v * -10 : 0));
  const mySat2 = useTransform(mouseY, (v) => (hasFinePointer && !shouldReduceMotion ? v * -12 : 0));
  const mySat3 = useTransform(mouseY, (v) => (hasFinePointer && !shouldReduceMotion ? v * 10 : 0));
  const mySat4 = useTransform(mouseY, (v) => (hasFinePointer && !shouldReduceMotion ? v * 12 : 0));
  const myPill = useTransform(mouseY, (v) => (hasFinePointer && !shouldReduceMotion ? v * 8 : 0));

  return (
    <div ref={internalRef} className="relative w-full max-w-6xl mx-auto my-12 sm:my-16 select-none">
      {/* Background Frame Blueprint Guidelines */}
      <div className="absolute inset-0 -m-4 sm:-m-8 border border-dashed border-[var(--border)] rounded-3xl pointer-events-none transition-colors" />

      {/* Frame Top Coordinate Label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3.5 bg-[var(--background)] px-4 text-[10px] font-mono text-[var(--foreground-subtle)] uppercase tracking-widest pointer-events-none transition-colors flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-bright)]" />
        <span>FIG. 01 // AUTONOMOUS ENTERPRISE INFRASTRUCTURE TOPOLOGY</span>
      </div>

      {/* SVG Scroll-Animated Circuit Trace Lines (Desktop & Tablet) */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trace-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Top-Left Trace (Core -> Networking) */}
        <motion.path
          d="M 280 180 C 200 180, 150 120, 100 90"
          fill="none"
          stroke="url(#trace-grad-blue)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          style={{ opacity: tracePulse }}
        />

        {/* Top-Right Trace (Core -> AWS Cloud) */}
        <motion.path
          d="M 520 180 C 600 180, 680 120, 750 90"
          fill="none"
          stroke="url(#trace-grad-blue)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          style={{ opacity: tracePulse }}
        />

        {/* Bottom-Left Trace (Core -> Cybersecurity) */}
        <motion.path
          d="M 280 320 C 200 320, 140 370, 90 420"
          fill="none"
          stroke="url(#trace-grad-blue)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          style={{ opacity: tracePulse }}
        />

        {/* Bottom-Right Trace (Core -> Odoo ERP) */}
        <motion.path
          d="M 520 320 C 600 320, 680 370, 760 420"
          fill="none"
          stroke="url(#trace-grad-blue)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          style={{ opacity: tracePulse }}
        />
      </svg>

      {/* Central Hero Architectural Monolith */}
      <motion.div
        style={{
          scale: coreScale,
          y: coreY,
          x: mxCore,
        }}
        className="relative z-10 mx-auto w-full max-w-3xl rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-[#071322] text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:border-[rgba(66,213,255,0.25)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(22,136,212,0.16)] transition-shadow"
      >
        {/* Frame Topbar Console */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(110,170,220,0.2)] bg-[#0B1A2C] text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-neutral-100 font-semibold tracking-wider flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#42D5FF]" />
              <span>AUTOCRATIC_CORE // NODE_ALPHA</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
            <span className="hidden sm:inline">MULTI-AZ CLUSTER</span>
            <span className="text-emerald-400 font-semibold">CLUSTER ACTIVE</span>
          </div>
        </div>

        {/* Isometric 3D Architectural Vector Graphic */}
        <div className="relative p-6 sm:p-10 md:p-12 overflow-hidden bg-gradient-to-b from-[#091728] via-[#071322] to-[#040C16] flex flex-col items-center justify-center">
          {/* Subtle Vector Wireframe Grid Background */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            viewBox="0 0 800 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hero-grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(66,213,255,0.4)"
                  strokeWidth="0.75"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
            <circle cx="400" cy="200" r="160" stroke="rgba(66,213,255,0.25)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="400" cy="200" r="260" stroke="rgba(22,136,212,0.2)" strokeWidth="1" strokeDasharray="6 6" />
          </svg>

          {/* Central Layered Monolith Architecture */}
          <div className="relative z-10 w-full max-w-lg py-2 sm:py-4 space-y-3.5">
            {/* Top Tier: Ingress & Perimeter Security */}
            <div className="p-4 rounded-xl bg-[#0B1C30]/90 border border-[rgba(110,170,220,0.25)] shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[#42D5FF]/60 hover:shadow-[0_0_15px_rgba(66,213,255,0.15)]">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#A9B9CC]">TIER 01 // INGRESS &amp; PERIMETER</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800">
                  ENCRYPTED TLS 1.3
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-[#0E253F] border border-[rgba(110,170,220,0.2)] font-mono text-[#F3F7FC] text-[11px]">
                  Next-Gen UTM
                </div>
                <div className="p-2 rounded bg-[#0E253F] border border-[rgba(110,170,220,0.2)] font-mono text-[#F3F7FC] text-[11px]">
                  AWS Route 53
                </div>
                <div className="p-2 rounded bg-[#0E253F] border border-[rgba(110,170,220,0.2)] font-mono text-[#F3F7FC] text-[11px]">
                  Zero-Trust IAM
                </div>
              </div>
            </div>

            {/* Middle Tier: Enterprise Compute & Virtualization Engine */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#0E223B]/90 border border-[rgba(110,170,220,0.3)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[#42D5FF]/70 hover:shadow-[0_0_20px_rgba(22,136,212,0.25)]">
              <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#42D5FF]" />
                  <span className="text-white font-medium">COMPUTE MATRIX // HIGH DENSITY</span>
                </div>
                <span className="font-mono text-[#A9B9CC] text-[11px]">VMWARE &amp; EC2 FLEET</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs font-mono text-neutral-300 pt-1">
                <div className="flex-1 p-2 rounded bg-[#08182B] border border-[rgba(110,170,220,0.2)] flex justify-between">
                  <span>Host Core 01</span>
                  <span className="text-emerald-400 font-semibold">&lt;1ms</span>
                </div>
                <div className="flex-1 p-2 rounded bg-[#08182B] border border-[rgba(110,170,220,0.2)] flex justify-between">
                  <span>Host Core 02</span>
                  <span className="text-emerald-400 font-semibold">&lt;1ms</span>
                </div>
              </div>
            </div>

            {/* Bottom Tier: Storage SAN & High-Availability Database */}
            <div className="p-4 rounded-xl bg-[#0B1C30]/90 border border-[rgba(110,170,220,0.25)] shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[#42D5FF]/60 hover:shadow-[0_0_15px_rgba(66,213,255,0.15)]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#A9B9CC]">TIER 03 // STORAGE &amp; RESILIENCE</span>
                <span className="text-neutral-200 font-semibold">10GbE ALL-FLASH SAN (RAID 10)</span>
              </div>
            </div>
          </div>

          {/* Coordinate Marks */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#7B93AD] pt-4 border-t border-[rgba(110,170,220,0.2)] mt-2">
            <span>HIGH AVAILABILITY // ARCHITECTURE</span>
            <span className="text-[#42D5FF]">BACKBONE // 10 Gbps FIBER LAG</span>
            <span>FAILOVER // AUTOMATED</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Satellite 1: Top-Left (Networking Solutions) */}
      <motion.div
        style={{
          x: satelliteSpreadLeft,
          y: mySat1,
          opacity: satelliteOpacity,
        }}
        data-cursor="view"
        className="hidden md:block absolute -top-8 -left-6 lg:-left-12 z-20 w-64 lg:w-72 p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 dark:hover:border-[#42D5FF]/50 dark:hover:shadow-[0_0_25px_rgba(66,213,255,0.2)]"
      >
        <Link href="/services/networking" className="block focus:outline-none">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--foreground-subtle)] font-semibold uppercase flex items-center gap-1.5">
              <Network className="w-3 h-3 text-[var(--accent-bright)]" />
              <span>SPEC_01 // NETWORK</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>10GbE LAG</span>
            </div>
          </div>
          <h4 className="text-sm font-semibold text-[var(--foreground)] mb-1 flex items-center justify-between">
            <span>Multi-Floor Backbone</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
          </h4>
          <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-3">
            Structured Cat6A &amp; 10G fiber interconnects with low-latency switching.
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--foreground-secondary)] pt-2 border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] px-2 py-1 rounded">
            <span>THROUGHPUT</span>
            <span className="font-semibold text-[var(--foreground)]">10 Gbps Symmetric</span>
          </div>
        </Link>
      </motion.div>

      {/* Floating Satellite 2: Top-Right (AWS Cloud Architecture) */}
      <motion.div
        style={{
          x: satelliteSpreadRight,
          y: mySat2,
          opacity: satelliteOpacity,
        }}
        data-cursor="view"
        className="hidden md:block absolute -top-8 -right-6 lg:-right-12 z-20 w-64 lg:w-72 p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 dark:hover:border-[#42D5FF]/50 dark:hover:shadow-[0_0_25px_rgba(66,213,255,0.2)]"
      >
        <Link href="/services/cloud-solutions" className="block focus:outline-none">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--foreground-subtle)] font-semibold uppercase flex items-center gap-1.5">
              <Cloud className="w-3 h-3 text-[var(--accent-bright)]" />
              <span>SPEC_02 // AWS CLOUD</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>MULTI-AZ</span>
            </div>
          </div>
          <h4 className="text-sm font-semibold text-[var(--foreground)] mb-1 flex items-center justify-between">
            <span>Zero-Downtime Migration</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
          </h4>
          <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-3">
            Terraform IaC automation with Aurora database cross-AZ replication.
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--foreground-secondary)] pt-2 border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] px-2 py-1 rounded">
            <span>ARCHITECTURE</span>
            <span className="font-semibold text-[var(--foreground)]">Multi-AZ Active-Passive</span>
          </div>
        </Link>
      </motion.div>

      {/* Floating Satellite 3: Bottom-Left (Cybersecurity Threat Matrix) */}
      <motion.div
        style={{
          x: satelliteSpreadLeft,
          y: mySat3,
          opacity: satelliteOpacity,
        }}
        data-cursor="view"
        className="hidden md:block absolute -bottom-10 -left-6 lg:-left-12 z-20 w-64 lg:w-72 p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 dark:hover:border-[#42D5FF]/50 dark:hover:shadow-[0_0_25px_rgba(66,213,255,0.2)]"
      >
        <Link href="/services/cybersecurity" className="block focus:outline-none">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--foreground-subtle)] font-semibold uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[var(--accent-bright)]" />
              <span>SPEC_03 // SECURITY</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>EDR HARDENED</span>
            </div>
          </div>
          <h4 className="text-sm font-semibold text-[var(--foreground)] mb-1 flex items-center justify-between">
            <span>Zero-Trust Perimeter</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
          </h4>
          <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-3">
            Hardware MFA, segmented micro-perimeters, and continuous threat monitoring.
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--foreground-secondary)] pt-2 border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] px-2 py-1 rounded">
            <span>GOVERNANCE</span>
            <span className="font-semibold text-[var(--foreground)]">Zero-Trust Policy Standard</span>
          </div>
        </Link>
      </motion.div>

      {/* Floating Satellite 4: Bottom-Right (Odoo ERP Implementation) */}
      <motion.div
        style={{
          x: satelliteSpreadRight,
          y: mySat4,
          opacity: satelliteOpacity,
        }}
        data-cursor="view"
        className="hidden md:block absolute -bottom-10 -right-6 lg:-right-12 z-20 w-64 lg:w-72 p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 dark:hover:border-[#42D5FF]/50 dark:hover:shadow-[0_0_25px_rgba(66,213,255,0.2)]"
      >
        <Link href="/services/odoo-erp" className="block focus:outline-none">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--foreground-subtle)] font-semibold uppercase flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[var(--accent-bright)]" />
              <span>SPEC_04 // ENTERPRISE ERP</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYNC LIVE</span>
            </div>
          </div>
          <h4 className="text-sm font-semibold text-[var(--foreground)] mb-1 flex items-center justify-between">
            <span>Odoo Workflow Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
          </h4>
          <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-3">
            Integrated warehouse barcode scanning, multi-store POS, and ledger sync.
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--foreground-secondary)] pt-2 border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] px-2 py-1 rounded">
            <span>AUTOMATION</span>
            <span className="font-semibold text-[var(--foreground)]">Automated Workflows</span>
          </div>
        </Link>
      </motion.div>

      {/* Floating Center-Bottom Anchor Telemetry Pill */}
      <motion.div
        style={{
          y: myPill,
        }}
        className="hidden lg:flex items-center gap-3 absolute -bottom-5 left-1/2 -translate-x-1/2 z-25 px-5 py-2.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] shadow-md text-xs text-[var(--foreground)] dark:shadow-[0_0_20px_rgba(22,136,212,0.25)]"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[11px] font-medium tracking-wide">
          SYSTEM STATUS // 7 DISCIPLINES OPERATIONAL
        </span>
        <span className="h-3 w-px bg-[var(--border)]" />
        <Link
          href="#services"
          className="text-[11px] font-semibold text-[var(--accent-bright)] hover:underline flex items-center gap-1"
        >
          <span>Explore Details</span>
          <span>↓</span>
        </Link>
      </motion.div>
    </div>
  );
}
