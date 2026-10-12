import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Java Solutions",
  description:
    "Java Solutions is an enterprise IT services consultancy focused on helping modern organizations engineer reliable, scalable, and secure technology foundations.",
};

export default function AboutPage() {
  const standards = [
    {
      label: "Technical Transparency",
      desc: "We provide comprehensive architecture documentation and full administrative ownership to our clients.",
    },
    {
      label: "Security by Architecture",
      desc: "Every system is designed with least-privilege identity access, segmentation, and encryption in mind.",
    },
    {
      label: "Pragmatic Tool Selection",
      desc: "We recommend tested enterprise platforms and open architectures rather than unnecessary custom overhead.",
    },
    {
      label: "Continuous Handover",
      desc: "We train internal teams and furnish operations manuals to ensure smooth long-term sustainability.",
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      {/* Editorial Header */}
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
              [ 02 / ABOUT ]
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              Company Overview
            </span>
          </div>

          <div className="max-w-4xl mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-tight text-[var(--foreground)] leading-[1.05]">
              A technology partner built for reliability and precision.
            </h1>
          </div>

          <p className="max-w-2xl text-lg sm:text-xl text-[var(--foreground-secondary)] font-normal leading-relaxed">
            Java Solutions advises, architects, and implements dependable IT environments
            that keep operations running seamlessly and securely.
          </p>
        </div>
      </section>

      {/* Main Philosophy Narrative */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)] block mb-3 font-mono">
                {"// OUR ETHOS"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[var(--foreground)] leading-tight">
                Eliminating complexity from enterprise IT deployments.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
              <p>
                Founded on the belief that mission-critical technology should be straightforward,
                robust, and properly documented, Java Solutions operates as an extension of
                our clients’ internal operations.
              </p>
              <p>
                Too often, organizations struggle with fragmented vendors: one provider for cabling,
                another for AWS hosting, a separate team for ERP software, and an external agency for web.
                Java Solutions provides a cohesive engineering partner across all seven disciplines.
              </p>
              <p className="text-sm sm:text-base text-[var(--foreground-muted)]">
                We believe that good engineering is quiet. When your networks are properly tuned,
                your servers redundant, and your ERP automated, technology gets out of the way
                so you can focus on building your enterprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="py-16 bg-[var(--background-secondary)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-[var(--shadow-card)] space-y-4">
              <span className="font-mono text-xs text-[var(--accent-bright)] uppercase tracking-wider block">
                01 // MISSION
              </span>
              <h3 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
                Simplify Enterprise Operations
              </h3>
              <p className="text-base text-[var(--foreground-secondary)] leading-relaxed font-normal">
                To simplify enterprise operations by deploying resilient IT architectures
                that enhance workforce velocity, safeguard company data, and ensure business continuity.
              </p>
            </div>

            <div className="p-8 sm:p-12 rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-[var(--shadow-card)] space-y-4">
              <span className="font-mono text-xs text-[var(--accent-bright)] uppercase tracking-wider block">
                02 // VISION
              </span>
              <h3 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
                The Trusted IT Standard
              </h3>
              <p className="text-base text-[var(--foreground-secondary)] leading-relaxed font-normal">
                To be the primary trusted technical authority for ambitious enterprises by delivering
                uncompromising quality, open standards, and reliable stewardship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Engineering Standards */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="font-mono text-xs text-[var(--foreground-subtle)] uppercase tracking-wider block mb-2">
              [ STANDARDS ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--foreground)] leading-tight">
              Our Core Operational Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standards.map((s) => (
              <div
                key={s.label}
                className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] transition-colors space-y-3"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-bright)] flex-shrink-0" />
                  <h3 className="text-lg font-medium text-[var(--foreground)] tracking-tight">
                    {s.label}
                  </h3>
                </div>
                <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed pl-8">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="mt-16 p-10 rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] dark:bg-[#081525] dark:border-[rgba(110,170,220,0.25)] dark:text-[#F3F7FC] shadow-[var(--shadow-elevated)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-1 text-[var(--foreground)] dark:text-[#F3F7FC]">
                Ready to review your technical environment?
              </h3>
              <p className="text-sm text-[var(--foreground-secondary)] dark:text-[#A9B9CC]">
                Schedule a preliminary discovery consultation with our technical team.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-colors flex-shrink-0 shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
