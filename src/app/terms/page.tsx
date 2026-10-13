import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Autocratic website and preliminary engagements.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      {/* Header */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <span className="font-mono text-xs text-[var(--accent-bright)] block mb-2">
            [ LEGAL // ENGAGEMENT TERMS ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--foreground)] leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-base text-[var(--foreground-muted)] font-normal">
            Last updated: October 2026. Terms and conditions governing this website.
          </p>
        </div>
      </section>

      {/* Prose Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-10 text-[var(--foreground-secondary)] leading-relaxed text-base font-normal">
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              1. Informational Scope
            </h2>
            <p>
              The content provided across this website is presented for general informational
              and introductory purposes. Concrete technical specifications, service level agreements (SLAs),
              pricing schedules, and support commitments are formalized through individually executed
              Statements of Work (SOW) with our clients.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              2. Intellectual Property
            </h2>
            <p>
              All branding marks, logos, technical blueprints, and written documentation published
              on this site are the intellectual property of Autocratic unless attributed
              to third-party frameworks. You may not reproduce or republish materials without prior
              written consent.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              3. Service Delivery & Engagements
            </h2>
            <p>
              Professional IT infrastructure provisioning, cloud deployments, network implementations,
              and Odoo ERP configurations are conducted strictly pursuant to negotiated service contracts
              containing explicit security, warranty, and liability provisions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              4. Governing Inquiries
            </h2>
            <p>
              For inquiries regarding contractual terms, please reach our administrative team via our contact page at{" "}
              <Link href="/contact" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent-bright)] underline">
                autocratic.in/contact
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
