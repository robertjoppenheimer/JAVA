"use client";

import React, { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, type MotionValue } from "framer-motion";
import {
  Server,
  Network,
  Cloud,
  Layers,
  Code2,
  Headphones,
  ShieldCheck,
  ArrowUpRight,
  Activity,
  ChevronDown,
} from "lucide-react";

interface ServiceTileData {
  id: string;
  slug: string;
  category: string;
  specCode: string;
  title: string;
  description: string;
  telemetry: string;
  telemetryStatus: "live" | "nominal" | "hardened";
  chips: string[];
  icon: React.ComponentType<{ className?: string }>;
  desktopColSpan: string;
  initialOffset: {
    x: number;
    y: number;
    rotate: number;
    scale: number;
    zIndex: number;
  };
}

const SERVICE_TILES: ServiceTileData[] = [
  {
    id: "infrastructure",
    slug: "it-infrastructure",
    category: "Core Systems",
    specCode: "SPEC_01",
    title: "IT Infrastructure & Systems",
    description: "Enterprise bare-metal provisioning, VMware HA virtualization, and high-density all-flash SAN storage.",
    telemetry: "High Availability // ESXi",
    telemetryStatus: "nominal",
    chips: ["VMware ESXi", "SAN Storage", "Disaster Recovery"],
    icon: Server,
    desktopColSpan: "lg:col-span-4",
    initialOffset: { x: 75, y: 80, rotate: -4.5, scale: 0.82, zIndex: 30 },
  },
  {
    id: "networking",
    slug: "networking",
    category: "Connectivity",
    specCode: "SPEC_02",
    title: "Enterprise Networking",
    description: "Structured fiber backbones, 10GbE managed switching, VLAN security segmentation, and next-gen UTM firewalls.",
    telemetry: "10 Gbps LAG // Trunking",
    telemetryStatus: "live",
    chips: ["10G Fiber", "Managed L3", "Site-to-Site VPN"],
    icon: Network,
    desktopColSpan: "lg:col-span-4",
    initialOffset: { x: 0, y: 100, rotate: 3.5, scale: 0.85, zIndex: 25 },
  },
  {
    id: "cloud",
    slug: "cloud-solutions",
    category: "Cloud & DevOps",
    specCode: "SPEC_03",
    title: "Cloud & AWS Architecture",
    description: "Multi-AZ VPC topologies, zero-downtime workload migrations, Terraform IaC, and Aurora replication.",
    telemetry: "Multi-AZ // Terraform IaC",
    telemetryStatus: "live",
    chips: ["AWS VPC", "Terraform", "Aurora DB"],
    icon: Cloud,
    desktopColSpan: "lg:col-span-4",
    initialOffset: { x: -75, y: 85, rotate: -3.8, scale: 0.81, zIndex: 20 },
  },
  {
    id: "odoo",
    slug: "odoo-erp",
    category: "Business Software",
    specCode: "SPEC_04",
    title: "Odoo ERP Solutions",
    description: "Custom Python module engineering, multi-location warehouse barcode sync, POS, and unified ledger accounting.",
    telemetry: "Live Sync // Python Core",
    telemetryStatus: "live",
    chips: ["Custom Modules", "Barcode Sync", "POS Engine"],
    icon: Layers,
    desktopColSpan: "lg:col-span-3",
    initialOffset: { x: 80, y: -65, rotate: 4.8, scale: 0.84, zIndex: 28 },
  },
  {
    id: "web-development",
    slug: "web-development",
    category: "Software Engineering",
    specCode: "SPEC_05",
    title: "Web Engineering & Portals",
    description: "Next.js enterprise web platforms, authenticated client dashboards, REST APIs, and optimized Core Web Vitals.",
    telemetry: "Next.js 16 // Full-Stack",
    telemetryStatus: "nominal",
    chips: ["Next.js 16", "Client Portals", "REST/GraphQL"],
    icon: Code2,
    desktopColSpan: "lg:col-span-3",
    initialOffset: { x: 25, y: -75, rotate: -3.2, scale: 0.82, zIndex: 22 },
  },
  {
    id: "support",
    slug: "it-support",
    category: "Managed Services",
    specCode: "SPEC_06",
    title: "24/7 Managed IT Support",
    description: "Rapid response emergency triage, workstation fleet onboarding, OS patch orchestration, and proactive telemetry.",
    telemetry: "Priority Triage // Fleet",
    telemetryStatus: "live",
    chips: ["Helpdesk Triage", "Patch Management", "Fleet Telemetry"],
    icon: Headphones,
    desktopColSpan: "lg:col-span-3",
    initialOffset: { x: -25, y: -80, rotate: 3.6, scale: 0.80, zIndex: 18 },
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    category: "Security & Governance",
    specCode: "SPEC_07",
    title: "Cybersecurity & Hardening",
    description: "Zero-Trust perimeter architecture, EDR threat hunting, hardware MFA enforcement, and vulnerability audits.",
    telemetry: "Zero-Trust // TLS 1.3",
    telemetryStatus: "hardened",
    chips: ["EDR Hardened", "IAM & MFA", "Audit Compliant"],
    icon: ShieldCheck,
    desktopColSpan: "lg:col-span-3",
    initialOffset: { x: -80, y: -70, rotate: -4.2, scale: 0.86, zIndex: 26 },
  },
];

function subscribeMobile(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(max-width: 768px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getMobileSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

function getMobileServerSnapshot(): boolean {
  return false;
}

interface FloatingTileCardProps {
  tile: ServiceTileData;
  smoothProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
  isCategoryMatch: boolean;
  onSelectService?: (id: string) => void;
}

function FloatingTileCard({
  tile,
  smoothProgress,
  isMobile,
  shouldReduceMotion,
  isCategoryMatch,
  onSelectService,
}: FloatingTileCardProps) {
  const Icon = tile.icon;

  // Constrain X offset on mobile to completely prevent horizontal overflow
  const startX = isMobile
    ? tile.initialOffset.x > 0
      ? 8
      : tile.initialOffset.x < 0
      ? -8
      : 0
    : tile.initialOffset.x;
  const startY = isMobile ? 32 : tile.initialOffset.y;
  const startRotate = isMobile ? tile.initialOffset.rotate * 0.2 : tile.initialOffset.rotate;
  const startScale = isMobile ? 0.95 : tile.initialOffset.scale;

  // GPU-accelerated fluid scroll transforms with no layout thrashing
  const x = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 0 : startX, 0]);
  const y = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 0 : startY, 0]);
  const rotate = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 0 : startRotate, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 1 : startScale, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.7], [shouldReduceMotion ? 1 : 0.45, 1]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: tile.initialOffset.zIndex,
      }}
      className={`${tile.desktopColSpan} relative group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[var(--border)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--accent)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:bg-[#0A192C] dark:border-[rgba(110,170,220,0.22)] dark:hover:border-[#42D5FF]/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_0_30px_rgba(66,213,255,0.18)] ${
        !isCategoryMatch ? "opacity-40 hover:opacity-100" : ""
      }`}
      data-cursor="view"
    >
      {/* Top Header Strip: Index & Live Telemetry Pill */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] dark:text-[var(--accent-bright)] group-hover:scale-105 transition-transform">
              <Icon className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-[10px] font-semibold text-[var(--foreground-subtle)] uppercase tracking-wider">
              {`${tile.specCode} // ${tile.category}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border border-[var(--border-subtle)] bg-[var(--background-secondary)] text-[var(--foreground-secondary)]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                tile.telemetryStatus === "live"
                  ? "bg-emerald-500 animate-pulse"
                  : tile.telemetryStatus === "hardened"
                  ? "bg-[var(--accent-bright)]"
                  : "bg-blue-500"
              }`}
            />
            <span className="font-medium text-[10px]">{tile.telemetry}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] dark:group-hover:text-[var(--accent-bright)] transition-colors">
          {tile.title}
        </h3>

        <p className="text-xs sm:text-[13px] text-[var(--foreground-secondary)] leading-relaxed mb-4">
          {tile.description}
        </p>

        {/* Deliverable Micro-Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tile.chips.map((chip) => (
            <span
              key={chip}
              className="px-2 py-0.5 rounded text-[10px] font-mono text-[var(--foreground-secondary)] bg-[var(--background-secondary)] border border-[var(--border-subtle)]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer Bar */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
        <Link
          href={`/services/${tile.slug}`}
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent)] dark:text-[var(--accent-bright)] hover:underline group-hover:translate-x-0.5 transition-transform"
        >
          <span>Explore Specification</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {onSelectService && (
          <button
            type="button"
            onClick={() => onSelectService(tile.id)}
            className="text-[11px] font-mono text-[var(--foreground-muted)] hover:text-[var(--foreground)] flex items-center gap-1 cursor-pointer transition-colors"
            title="Expand detailed drawer below"
          >
            <span>Specs</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface FloatingServiceTilesProps {
  selectedCategory: string;
  onSelectService?: (id: string) => void;
}

export function FloatingServiceTiles({
  selectedCategory,
  onSelectService,
}: FloatingServiceTilesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);

  // Link scroll progress to this section entering and centering in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 48%"],
  });

  // Viscous fluid spring for droplet-like organic settling without lag or overshoot
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.5,
    restDelta: 0.001,
  });

  // Central droplet subtle ambient glow
  const dropletGlowScale = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 1 : 0.85, 1.15]);
  const dropletGlowOpacity = useTransform(smoothProgress, [0, 0.6, 1], [0.3, 0.2, 0.12]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-6 sm:py-10 select-none overflow-hidden"
      aria-label="Interactive Floating Service Capabilities"
    >
      {/* Central Ambient Droplet Fluid Glow */}
      <motion.div
        style={{
          scale: dropletGlowScale,
          opacity: dropletGlowOpacity,
        }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] lg:w-[640px] h-[320px] sm:h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-bright)_0%,var(--accent)_30%,transparent_70%)] blur-[50px] opacity-25 dark:opacity-40 z-0 will-change-transform"
        aria-hidden="true"
      />

      {/* Fluid Organic Coordinate Header Badge */}
      <div className="relative z-10 flex items-center justify-between pb-4 mb-6 sm:mb-8 border-b border-[var(--border)] text-xs font-mono">
        <div className="flex items-center gap-2 text-[var(--foreground-subtle)]">
          <Activity className="w-3.5 h-3.5 text-[var(--accent-bright)] animate-pulse" />
          <span className="uppercase tracking-widest text-[11px] font-semibold">
            FIG. 02 // MULTI-TIER OPERATIONAL CAPABILITIES MATRIX
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[var(--foreground-muted)] text-[11px]">
          <span>SCROLL-LINKED CONSTELLATION</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>7 ACTIVE DISCIPLINES</span>
        </div>
      </div>

      {/* Layered Floating Tiles Responsive Grid (12 Columns) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
        {SERVICE_TILES.map((tile) => {
          const isCategoryMatch =
            selectedCategory === "All" ||
            tile.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            selectedCategory.toLowerCase().includes(tile.category.toLowerCase());

          return (
            <FloatingTileCard
              key={tile.id}
              tile={tile}
              smoothProgress={smoothProgress}
              isMobile={isMobile}
              shouldReduceMotion={shouldReduceMotion}
              isCategoryMatch={isCategoryMatch}
              onSelectService={onSelectService}
            />
          );
        })}
      </div>
    </div>
  );
}
