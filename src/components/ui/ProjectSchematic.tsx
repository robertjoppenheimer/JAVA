import React from "react";

interface ProjectSchematicProps {
  slug: string;
  className?: string;
}

export function ProjectSchematic({ slug, className = "" }: ProjectSchematicProps) {
  const containerBase = `relative w-full aspect-[16/10] sm:aspect-[16/9] bg-white text-[var(--foreground)] border border-[var(--border)] dark:bg-[#071322] dark:border-[rgba(110,170,220,0.25)] dark:text-[#F3F7FC] rounded-xl overflow-hidden p-5 flex flex-col justify-between shadow-xs ${className}`;
  const headerBase = "flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] dark:border-neutral-800/80 text-[11px] font-mono";
  const footerBase = "pt-2 border-t border-[var(--border-subtle)] dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-400";
  const cardBase = "p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60";

  switch (slug) {
    case "network-overhaul":
      return (
        <div className={containerBase}>
          {/* Schematic Frame Header */}
          <div className={headerBase}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold tracking-wider uppercase">TOPOLOGY // CAT6A_FIBER_10GbE</span>
            </div>
            <span className="text-[var(--foreground-subtle)] dark:text-neutral-500 uppercase tracking-widest text-[10px]">REDUNDANT CORE</span>
          </div>

          {/* Schematic Graphic Layout */}
          <div className="my-auto py-2 grid grid-cols-12 gap-3 items-center">
            {/* Core Gateway & Firewall */}
            <div className={`col-span-4 ${cardBase} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">MDF-CORE</span>
                <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400">ACTIVE / STBY</span>
              </div>
              <div className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-100">Next-Gen Dual Firewall</div>
              <div className="space-y-1 text-[10px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-400 border-t border-[var(--border-subtle)] dark:border-neutral-700/50 pt-1.5">
                <div className="flex justify-between">
                  <span>WAN1 Fiber</span>
                  <span className="text-emerald-600 dark:text-emerald-400">1 Gbps Symmetric</span>
                </div>
                <div className="flex justify-between">
                  <span>WAN2 Failover</span>
                  <span className="text-[var(--foreground-subtle)] dark:text-neutral-400">Ready</span>
                </div>
              </div>
            </div>

            {/* Backbone Interconnect Line */}
            <div className="col-span-4 flex flex-col items-center justify-center space-y-1.5 px-1">
              <div className="w-full flex items-center justify-between text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400">
                <span>10G SFP+</span>
                <span>LAG TRUNK</span>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500 via-[var(--accent)] to-emerald-500" />
              <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">LINE RATE VERIFIED</span>
            </div>

            {/* Distribution IDF Stacks */}
            <div className="col-span-4 space-y-2">
              <div className={`p-2.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60 flex items-center justify-between`}>
                <div>
                  <span className="block text-[10px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 font-semibold">IDF-L1 / CORP</span>
                  <span className="text-[11px] font-medium text-[var(--foreground)] dark:text-neutral-200">VLAN 10 • 48 Ports</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">OK</span>
              </div>
              <div className={`p-2.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60 flex items-center justify-between`}>
                <div>
                  <span className="block text-[10px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 font-semibold">IDF-L2 / WI-FI 6</span>
                  <span className="text-[11px] font-medium text-[var(--foreground)] dark:text-neutral-200">VLAN 20 • PoE+ Mesh</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">OK</span>
              </div>
            </div>
          </div>

          {/* Schematic Frame Footer */}
          <div className={footerBase}>
            <span>PACKET LATENCY: OPTIMIZED</span>
            <span>ENCRYPTION: IPsec AES-256</span>
            <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">FLOORS 1–3 COVERAGE: ACTIVE</span>
          </div>
        </div>
      );

    case "odoo-retail":
      return (
        <div className={containerBase}>
          {/* Schematic Frame Header */}
          <div className={headerBase}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold tracking-wider uppercase">ERP ENGINE // ODOO_ENTERPRISE_HUB</span>
            </div>
            <span className="text-[var(--foreground-subtle)] dark:text-neutral-500 uppercase tracking-widest text-[10px]">SYNC ACTIVE</span>
          </div>

          {/* Schematic Graphic Layout */}
          <div className="my-auto py-2 grid grid-cols-3 gap-3 items-center">
            {/* Left: Input Channels */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60">
                <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 uppercase block">CHANNEL 01</span>
                <span className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-200">Multi-Store POS</span>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">Real-Time Sync</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60">
                <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 uppercase block">CHANNEL 02</span>
                <span className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-200">eCommerce Orders</span>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">Stock Reservation</span>
              </div>
            </div>

            {/* Center: Odoo Orchestrator */}
            <div className="p-4 rounded-xl bg-white border-2 border-[var(--accent)]/40 dark:bg-neutral-800 dark:border-neutral-600/80 text-center space-y-2 shadow-sm">
              <div className="inline-block px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] dark:bg-neutral-700 dark:text-neutral-200 text-[10px] font-mono font-semibold">
                ODOO CORE
              </div>
              <div className="text-xs font-medium text-[var(--foreground)] dark:text-neutral-300">Automated Reordering & Ledger Sync</div>
              <div className="pt-2 border-t border-[var(--border-subtle)] dark:border-neutral-700 text-[9px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-400 flex justify-around">
                <span>PostgreSQL DB</span>
                <span>Python Engine</span>
              </div>
            </div>

            {/* Right: Operational Destinations */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60">
                <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 uppercase block">DESTINATION 01</span>
                <span className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-200">Warehouse Barcode</span>
                <span className="text-[9px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-300 block mt-0.5">Pick / Pack / Ship</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60">
                <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 uppercase block">DESTINATION 02</span>
                <span className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-200">Financial Ledger</span>
                <span className="text-[9px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-300 block mt-0.5">Multi-Currency</span>
              </div>
            </div>
          </div>

          {/* Schematic Frame Footer */}
          <div className={footerBase}>
            <span>INVENTORY AUDIT: ACTIVE</span>
            <span>RECONCILIATION: AUTOMATED</span>
            <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">BRANCHES CONNECTED: ALL</span>
          </div>
        </div>
      );

    case "aws-cloud-migration":
      return (
        <div className={containerBase}>
          {/* Schematic Frame Header */}
          <div className={headerBase}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold tracking-wider uppercase">AWS INFRASTRUCTURE // MULTI-AZ VPC</span>
            </div>
            <span className="text-[var(--foreground-subtle)] dark:text-neutral-500 uppercase tracking-widest text-[10px]">TERRAFORM IaC</span>
          </div>

          {/* Schematic Graphic Layout */}
          <div className="my-auto py-2 space-y-3">
            {/* Ingress Layer */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/90 dark:border-neutral-700/70 text-[11px] font-mono">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-white dark:bg-neutral-700 text-[var(--foreground)] dark:text-neutral-200 font-semibold text-[10px] border border-[var(--border-subtle)]">ROUTE 53</span>
                <span className="text-[var(--foreground-subtle)] dark:text-neutral-400">→</span>
                <span className="text-[var(--foreground)] dark:text-neutral-200">CloudFront CDN + AWS WAF</span>
                <span className="text-[var(--foreground-subtle)] dark:text-neutral-400">→</span>
                <span className="text-[var(--foreground)] dark:text-neutral-200">Application Load Balancer</span>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">TLS 1.3 ENCRYPTED</span>
            </div>

            {/* Multi-AZ Tier */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[var(--background-secondary)] border border-dashed border-[var(--border)] dark:bg-neutral-800/60 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[var(--foreground)] dark:text-neutral-300 font-semibold">AZ-1A (PRIMARY)</span>
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">ONLINE</span>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="p-1.5 rounded bg-white dark:bg-neutral-900 border border-[var(--border-subtle)] dark:border-neutral-800 text-[var(--foreground)] dark:text-neutral-300 flex justify-between">
                    <span>EC2 Autoscaling Fleet</span>
                    <span className="text-[var(--foreground-subtle)] dark:text-neutral-400">Node 01</span>
                  </div>
                  <div className="p-1.5 rounded bg-white dark:bg-neutral-900 border border-[var(--border-subtle)] dark:border-neutral-800 text-[var(--foreground)] dark:text-neutral-300 flex justify-between">
                    <span>Aurora RDS (Writer)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Primary</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--background-secondary)] border border-dashed border-[var(--border)] dark:bg-neutral-800/60 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[var(--foreground)] dark:text-neutral-300 font-semibold">AZ-1B (STANDBY)</span>
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">REPLICA</span>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="p-1.5 rounded bg-white dark:bg-neutral-900 border border-[var(--border-subtle)] dark:border-neutral-800 text-[var(--foreground)] dark:text-neutral-300 flex justify-between">
                    <span>EC2 Autoscaling Fleet</span>
                    <span className="text-[var(--foreground-subtle)] dark:text-neutral-400">Node 02</span>
                  </div>
                  <div className="p-1.5 rounded bg-white dark:bg-neutral-900 border border-[var(--border-subtle)] dark:border-neutral-800 text-[var(--foreground)] dark:text-neutral-300 flex justify-between">
                    <span>Aurora RDS (Replica)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Sync Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schematic Frame Footer */}
          <div className={footerBase}>
            <span>HIGH AVAILABILITY TARGET</span>
            <span>BACKUP: IMMUTABLE S3 SNAPSHOTS</span>
            <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">FAILOVER: AUTOMATED</span>
          </div>
        </div>
      );

    case "business-website":
      return (
        <div className={containerBase}>
          {/* Schematic Frame Header */}
          <div className={headerBase}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold tracking-wider uppercase">WEB PLATFORM // SECURE_PORTAL_CORE</span>
            </div>
            <span className="text-[var(--foreground-subtle)] dark:text-neutral-500 uppercase tracking-widest text-[10px]">NEXT.JS & TYPESCRIPT</span>
          </div>

          {/* Schematic Graphic Layout */}
          <div className="my-auto py-2 grid grid-cols-12 gap-3 items-center">
            {/* UI Layer */}
            <div className={`col-span-4 ${cardBase} space-y-2`}>
              <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 uppercase block">CLIENT FRONTEND</span>
              <div className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-100">Next.js App Router</div>
              <div className="space-y-1 text-[10px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-400 border-t border-[var(--border-subtle)] dark:border-neutral-700/50 pt-1.5">
                <div className="flex justify-between">
                  <span>Server Components</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Low TTFB</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Web Vitals</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Optimized</span>
                </div>
              </div>
            </div>

            {/* Auth & Security Middle */}
            <div className="col-span-4 p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800 dark:border-neutral-700 text-center space-y-2">
              <span className="inline-block px-2 py-0.5 rounded bg-white dark:bg-neutral-700 text-[10px] font-mono text-[var(--foreground)] dark:text-neutral-200 border border-[var(--border-subtle)]">
                RBAC & IAM
              </span>
              <div className="text-xs font-medium text-[var(--foreground)] dark:text-neutral-200">MFA & Role-Based Access</div>
              <div className="text-[9px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-400 border-t border-[var(--border-subtle)] dark:border-neutral-700 pt-1">
                Zero-Trust Session Tokens
              </div>
            </div>

            {/* Secure Vault Backend */}
            <div className={`col-span-4 ${cardBase} space-y-2`}>
              <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 uppercase block">STORAGE ENGINE</span>
              <div className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-100">Encrypted Document Vault</div>
              <div className="space-y-1 text-[10px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-400 border-t border-[var(--border-subtle)] dark:border-neutral-700/50 pt-1.5">
                <div className="flex justify-between">
                  <span>Encryption</span>
                  <span className="text-emerald-600 dark:text-emerald-400">AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span>Audit Trail</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Immutable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Schematic Frame Footer */}
          <div className={footerBase}>
            <span>LIGHTHOUSE TARGET: OPTIMIZED</span>
            <span>DATA TRANSIT: TLS 1.3</span>
            <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">SECURITY: HARDENED</span>
          </div>
        </div>
      );

    case "server-infrastructure":
      return (
        <div className={containerBase}>
          {/* Schematic Frame Header */}
          <div className={headerBase}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold tracking-wider uppercase">VIRTUALIZATION // VMWARE_VSPHERE_CLUSTER</span>
            </div>
            <span className="text-[var(--foreground-subtle)] dark:text-neutral-500 uppercase tracking-widest text-[10px]">HA FAILOVER</span>
          </div>

          {/* Schematic Graphic Layout */}
          <div className="my-auto py-2 grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/70 dark:border-neutral-700 space-y-2`}>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--foreground)] dark:text-neutral-200 font-bold">NODE 01 (DUAL XEON)</span>
                <span className="text-emerald-600 dark:text-emerald-400">HOST_ONLINE</span>
              </div>
              <div className="space-y-1 text-[10px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-400">
                <div className="flex justify-between p-1 bg-white dark:bg-neutral-900 rounded border border-[var(--border-subtle)] dark:border-neutral-800">
                  <span>VM_SQL_PROD</span>
                  <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">64GB RAM</span>
                </div>
                <div className="flex justify-between p-1 bg-white dark:bg-neutral-900 rounded border border-[var(--border-subtle)] dark:border-neutral-800">
                  <span>VM_APP_SERVER</span>
                  <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">32GB RAM</span>
                </div>
              </div>
            </div>

            <div className={`p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/70 dark:border-neutral-700 space-y-2`}>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--foreground)] dark:text-neutral-200 font-bold">NODE 02 (DUAL XEON)</span>
                <span className="text-emerald-600 dark:text-emerald-400">HOST_ONLINE</span>
              </div>
              <div className="space-y-1 text-[10px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-400">
                <div className="flex justify-between p-1 bg-white dark:bg-neutral-900 rounded border border-[var(--border-subtle)] dark:border-neutral-800">
                  <span>VM_BACKUP_DC</span>
                  <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">16GB RAM</span>
                </div>
                <div className="flex justify-between p-1 bg-white dark:bg-neutral-900 rounded border border-[var(--border-subtle)] dark:border-neutral-800">
                  <span>VM_FILE_SAN</span>
                  <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">32GB RAM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shared Storage Bar */}
          <div className="p-2 rounded bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800 dark:border-neutral-700 flex items-center justify-between text-[10px] font-mono">
            <span className="text-[var(--foreground-subtle)] dark:text-neutral-400">SHARED ALL-FLASH SAN:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">10GbE DUAL iSCSI MULTIPATH</span>
            <span className="text-[var(--foreground)] dark:text-neutral-300">RAID 10</span>
          </div>

          {/* Schematic Frame Footer */}
          <div className={footerBase}>
            <span>RACK CONSOLIDATION: HIGH DENSITY</span>
            <span>STORAGE: ALL-FLASH</span>
            <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">FAILOVER: AUTOMATED</span>
          </div>
        </div>
      );

    case "security-hardening":
      return (
        <div className={containerBase}>
          {/* Schematic Frame Header */}
          <div className={headerBase}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold tracking-wider uppercase">DEFENSE MATRIX // ZERO_TRUST_EDR</span>
            </div>
            <span className="text-[var(--foreground-subtle)] dark:text-neutral-500 uppercase tracking-widest text-[10px]">MONITORING ACTIVE</span>
          </div>

          {/* Schematic Graphic Layout */}
          <div className="my-auto py-2 grid grid-cols-3 gap-3 items-center">
            <div className={`p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60 space-y-1.5`}>
              <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 uppercase block">PERIMETER</span>
              <div className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-100">Next-Gen UTM</div>
              <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Deep Packet Inspection</div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[var(--border-subtle)] dark:bg-neutral-800 dark:border-neutral-700 space-y-1.5 text-center shadow-xs">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 text-[9px] font-mono dark:border-emerald-800">
                IDENTITY
              </span>
              <div className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-100">Hardware MFA</div>
              <div className="text-[10px] font-mono text-[var(--foreground-secondary)] dark:text-neutral-300">Policy Enforced</div>
            </div>

            <div className={`p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] dark:bg-neutral-800/80 dark:border-neutral-700/60 space-y-1.5`}>
              <span className="text-[9px] font-mono text-[var(--foreground-subtle)] dark:text-neutral-400 uppercase block">ENDPOINTS</span>
              <div className="text-xs font-semibold text-[var(--foreground)] dark:text-neutral-100">EDR Threat Telemetry</div>
              <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Automated Quarantine</div>
            </div>
          </div>

          {/* Schematic Frame Footer */}
          <div className={footerBase}>
            <span>VULNERABILITY AUDIT: HARDENED</span>
            <span>MFA ENFORCEMENT: ACTIVE</span>
            <span className="text-[var(--foreground)] dark:text-neutral-300 font-semibold">SECURITY POSTURE: HARDENED</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
