"use client";

import { Server, Network, Cloud, Layers, Code2, HeadphonesIcon, ShieldCheck, Activity, Database } from "lucide-react";

interface ServiceVisualTreatmentProps {
  serviceId: string;
}

export function ServiceVisualTreatment({ serviceId }: ServiceVisualTreatmentProps) {
  switch (serviceId) {
    case "infrastructure":
      return (
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>CLUSTER // VMWARE_VSPHERE_HA</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              DUAL HOSTS ONLINE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-2">
              <div className="flex justify-between font-semibold text-[var(--foreground)]">
                <span>NODE 01 // XEON</span>
                <span className="text-emerald-600 dark:text-emerald-400">ONLINE</span>
              </div>
              <div className="space-y-1 text-[10px] text-[var(--foreground-secondary)]">
                <div className="flex justify-between">
                  <span>RAM ALLOCATION</span>
                  <span className="text-[var(--foreground)] font-semibold">128 GB ECC</span>
                </div>
                <div className="w-full bg-[var(--border-subtle)] dark:bg-[var(--surface-hover)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--accent)] dark:bg-[var(--accent-bright)] h-full w-[42%]" />
                </div>
                <div className="flex justify-between pt-1">
                  <span>VMs RUNNING</span>
                  <span className="text-[var(--foreground)] font-semibold">14 Active</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-2">
              <div className="flex justify-between font-semibold text-[var(--foreground)]">
                <span>NODE 02 // XEON</span>
                <span className="text-emerald-600 dark:text-emerald-400">ONLINE</span>
              </div>
              <div className="space-y-1 text-[10px] text-[var(--foreground-secondary)]">
                <div className="flex justify-between">
                  <span>RAM ALLOCATION</span>
                  <span className="text-[var(--foreground)] font-semibold">128 GB ECC</span>
                </div>
                <div className="w-full bg-[var(--border-subtle)] dark:bg-[var(--surface-hover)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--accent)] dark:bg-[var(--accent-bright)] h-full w-[38%]" />
                </div>
                <div className="flex justify-between pt-1">
                  <span>VMs RUNNING</span>
                  <span className="text-[var(--foreground)] font-semibold">12 Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--accent)] dark:text-[var(--accent-bright)]" />
              <span className="text-[var(--foreground)] font-medium">ALL-FLASH SAN ARRAY</span>
            </div>
            <span className="text-[var(--foreground-secondary)] font-mono text-[10px]">
              RAID 10 • 10GbE iSCSI • LOW LATENCY
            </span>
          </div>
        </div>
      );

    case "networking":
      return (
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold flex items-center gap-2">
              <Network className="w-4 h-4" />
              <span>TOPOLOGY // BACKBONE_10GbE_LAG</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              LOW LATENCY VERIFIED
            </span>
          </div>

          <div className="space-y-2.5 text-[11px]">
            <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[var(--foreground)] block">MDF CORE SWITCH STACK</span>
                <span className="text-[10px] text-[var(--foreground-secondary)]">48x 10G SFP+ Trunking • Dual PSU</span>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">LINE RATE ACTIVE</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--foreground-subtle)] block">VLAN 10 // CORP LAN</span>
                <span className="text-[var(--foreground)] font-semibold">1000 Mbps Full Duplex</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Strict 802.1X IAM</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--foreground-subtle)] block">VLAN 20 // WI-FI 6 MESH</span>
                <span className="text-[var(--foreground)] font-semibold">PoE+ Multi-AP Array</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Seamless Roaming</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--foreground-secondary)]">
            <span>PERIMETER FIREWALL: DUAL HA</span>
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold">THROUGHPUT: 10 Gbps SYMMETRIC</span>
          </div>
        </div>
      );

    case "cloud":
      return (
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              <span>AWS TOPOLOGY // MULTI-AZ ARCHITECTURE</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              MULTI-AZ ACTIVE
            </span>
          </div>

          <div className="space-y-2.5 text-[11px]">
            <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[var(--foreground)] block">CLOUDFRONT CDN + WAF INGRESS</span>
                <span className="text-[10px] text-[var(--foreground-secondary)]">TLS 1.3 Termination • DDoS Shield</span>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">HEALTHY</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold">AZ 1A (PRIMARY)</span>
                <span className="text-[var(--foreground)] font-semibold block">EC2 Autoscaling</span>
                <span className="text-[10px] text-[var(--foreground-secondary)] block">Aurora DB (Writer)</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold">AZ 1B (REPLICA)</span>
                <span className="text-[var(--foreground)] font-semibold block">EC2 Autoscaling</span>
                <span className="text-[10px] text-[var(--foreground-secondary)] block">Aurora DB (Sync Active)</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--foreground-secondary)]">
            <span>PROVISIONING: TERRAFORM IaC</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">CROSS-AZ REDUNDANCY</span>
          </div>
        </div>
      );

    case "odoo":
      return (
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>ODOO HUB // ENTERPRISE ERP RUNTIME</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              SYNC ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-2.5 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)]">
              <span className="text-[var(--foreground-subtle)] block">SOURCE</span>
              <span className="font-semibold text-[var(--foreground)] block mt-0.5">Multi-Store POS</span>
              <span className="text-emerald-600 dark:text-emerald-400 block mt-1">Real-Time</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border-2 border-[var(--accent)]/40 dark:bg-[var(--surface-elevated)] dark:border-[var(--accent-bright)]/40">
              <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold block">ODOO CORE</span>
              <span className="font-semibold text-[var(--foreground)] block mt-0.5">PostgreSQL Engine</span>
              <span className="text-[var(--foreground-secondary)] block mt-1">Automated PO</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)]">
              <span className="text-[var(--foreground-subtle)] block">TARGET</span>
              <span className="font-semibold text-[var(--foreground)] block mt-0.5">Finance Ledger</span>
              <span className="text-emerald-600 dark:text-emerald-400 block mt-1">Reconciled</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[var(--foreground)] font-medium">INVENTORY RECONCILIATION</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">AUTOMATED WORKFLOW</span>
            </div>
            <div className="w-full bg-[var(--border-subtle)] dark:bg-[var(--surface-hover)] h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[95%]" />
            </div>
          </div>
        </div>
      );

    case "web-development":
      return (
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>WEB RUNTIME // NEXT.JS ENTERPRISE PORTAL</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              OPTIMIZED RUNTIME
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] text-[var(--foreground-subtle)] block">ARCHITECTURE</span>
              <span className="font-semibold text-[var(--foreground)] block">Next.js App Router</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Server Components &amp; Edge</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] text-[var(--foreground-subtle)] block">SECURITY VAULT</span>
              <span className="font-semibold text-[var(--foreground)] block">AES-256 Encrypted</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">RBAC &amp; Session Tokens</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[var(--foreground)] font-medium">CORE WEB VITALS</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-[10px]">
              FAST LCP • ZERO CLS • LOW LATENCY
            </span>
          </div>
        </div>
      );

    case "support":
      return (
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold flex items-center gap-2">
              <HeadphonesIcon className="w-4 h-4" />
              <span>SLA PROTOCOL // 24/7 FLEET MONITORING</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              PRIORITY TRIAGE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] text-[var(--foreground-subtle)] block">PATCH COMPLIANCE</span>
              <span className="font-semibold text-[var(--foreground)] text-sm">Automated</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Fleet Up to Date</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] text-[var(--foreground-subtle)] block">DIRECT ESCALATION</span>
              <span className="font-semibold text-[var(--foreground)] text-sm">Tier 2/3</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Senior Engineers Only</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--foreground-secondary)]">
            <span>TELEMETRY BEAT: CONTINUOUS</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SCHEDULED BACKUPS VERIFIED</span>
          </div>
        </div>
      );

    case "cybersecurity":
      return (
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>SECURITY MATRIX // ZERO-TRUST GOVERNANCE</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              POLICY VERIFIED
            </span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-[var(--foreground)] font-medium">NEXT-GEN UTM DEEP PACKET INSPECTION</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">INSPECTION ACTIVE</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-[var(--foreground)] font-medium">HARDWARE MFA &amp; CONDITIONAL ACCESS</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ENFORCED</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[var(--border)] dark:bg-[var(--surface-elevated)] dark:border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-[var(--foreground)] font-medium">EDR AUTOMATED THREAT QUARANTINE</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ACTIVE</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--foreground-secondary)]">
            <span>IDENTITY PROVIDER: ZERO-TRUST</span>
            <span className="text-[var(--accent)] dark:text-[var(--accent-bright)] font-semibold">SECURITY STANDARD: CIS BENCHMARK</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
