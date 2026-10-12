import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and client data handling practices for Java Solutions.",
};

export default function PrivacyPolicyPage() {
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
            [ LEGAL // PRIVACY PROTOCOL ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--foreground)] leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-[var(--foreground-muted)] font-normal">
            Last updated: October 2026. How Java Solutions protects and handles client information.
          </p>
        </div>
      </section>

      {/* Legal Prose Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-10 text-[var(--foreground-secondary)] leading-relaxed text-base font-normal">
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              1. Information We Collect
            </h2>
            <p>
              When you submit a consultation request or communicate with Java Solutions,
              we collect basic contact and technical scope details including your name,
              business email address, organization name, and descriptive notes regarding your
              IT infrastructure requirements.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              2. Purpose and Use of Data
            </h2>
            <p>
              Information gathered through this website is utilized exclusively to assess technical scopes,
              deliver architectural proposals, and conduct contracted engineering engagements. We do not
              monetize, sell, or distribute visitor or client information to third-party marketing entities.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              3. Client Infrastructure Confidentiality
            </h2>
            <p>
              We treat all client infrastructure configurations, network topology diagrams,
              cloud credentials, and ERP database contents as strictly confidential. Engagements
              are executed under standard non-disclosure terms, and data is managed using
              hardened, access-controlled repositories.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              4. Cookies and Analytical Tools
            </h2>
            <p>
              This website uses only essential session utilities and privacy-conscious anonymous
              traffic analytics to monitor site reliability and performance. No invasive tracking
              pixels or third-party behavioral trackers are loaded.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
              5. Communications & Data Inquiries
            </h2>
            <p>
              For inquiries regarding data privacy or to request the deletion of preliminary inquiry
              records, please contact us at <span className="font-semibold text-[var(--foreground)]">contact@javasolutions.com</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
