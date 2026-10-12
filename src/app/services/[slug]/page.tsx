import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, services } from "@/data/services";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProjectSchematic } from "@/components/ui/ProjectSchematic";

interface Props {
  params: Promise<{ slug: string }>;
}

const serviceToSchematicMap: Record<string, string> = {
  "it-infrastructure": "server-infrastructure",
  "networking": "network-overhaul",
  "cloud-solutions": "aws-cloud-migration",
  "odoo-erp": "odoo-retail",
  "web-development": "business-website",
  "it-support": "server-infrastructure",
  "cybersecurity": "security-hardening",
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} — Java Solutions`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Find other services for related navigation
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const schematicSlug = serviceToSchematicMap[service.slug];

  return (
    <div className="pt-28 pb-24 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      {/* Editorial Header */}
      <section className="pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] hover:text-[var(--accent-bright)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-semibold text-[var(--accent-bright)]">
              [ SERVICE // {service.category.toUpperCase()} ]
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              Enterprise Specification
            </span>
          </div>

          <div className="max-w-4xl mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-tight text-[var(--foreground)] leading-[1.05]">
              {service.title}
            </h1>
          </div>

          <p className="max-w-3xl text-lg sm:text-xl text-[var(--foreground-secondary)] font-normal leading-relaxed">
            {service.longDescription}
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Consult on {service.title}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="#deliverables"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-tight text-[var(--foreground)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-colors"
            >
              <span>Review Deliverables</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Breakdown Section */}
      <section id="deliverables" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Detailed Overview */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] block mb-3 font-mono">
                  [ 01 // OVERVIEW ]
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--foreground)] mb-4">
                  Engineering Scope & Technical Approach
                </h2>
                <p className="text-base sm:text-lg text-[var(--foreground-secondary)] leading-relaxed font-normal mb-6">
                  {service.description}
                </p>

                {/* Architectural Schematic Visual */}
                {schematicSlug && (
                  <div className="rounded-xl overflow-hidden border border-[var(--border-strong)] shadow-sm mb-6">
                    <ProjectSchematic slug={schematicSlug} />
                  </div>
                )}
              </div>

              {/* Core Features */}
              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-4 tracking-tight">
                  Core Implementation Disciplines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-bright)] mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Deliverables Card */}
            <div className="lg:col-span-5 bg-[var(--surface-elevated)] p-8 rounded-3xl border border-[var(--border)] shadow-[var(--shadow-card)] space-y-6 lg:sticky lg:top-28">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)] block font-mono">
                [ 02 // DELIVERABLES ]
              </span>
              <h3 className="text-xl font-medium text-[var(--foreground)] tracking-tight">
                Standard Project Artifacts
              </h3>
              <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                Upon project completion, our engineers provide complete documentation,
                source assets, and handover runbooks.
              </p>

              <div className="space-y-3 pt-2">
                {service.deliverables.map((deliv, idx) => (
                  <div
                    key={deliv}
                    className="p-3.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-subtle)] flex items-center justify-between"
                  >
                    <span className="text-xs sm:text-sm font-medium text-[var(--foreground)]">
                      {deliv}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--foreground-subtle)]">
                      DOC_0{idx + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-colors shadow-sm"
                >
                  <span>Request Technical Proposal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 sm:py-24 border-t border-[var(--border)] bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-[var(--border)]">
            <div>
              <span className="font-mono text-xs text-[var(--foreground-subtle)] block mb-1">
                [ RELATED // DISCIPLINES ]
              </span>
              <h3 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
                Explore Complementary Capabilities
              </h3>
            </div>
            <Link
              href="/services"
              className="text-xs font-semibold text-[var(--accent-bright)] hover:underline transition-colors"
            >
              All Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.slug}`}
                className="group p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent-bright)] transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <span className="font-mono text-xs text-[var(--foreground-subtle)] block mb-3">
                    {other.category}
                  </span>
                  <h4 className="text-base font-semibold text-[var(--foreground)] mb-2 group-hover:translate-x-0.5 transition-transform">
                    {other.title}
                  </h4>
                  <p className="text-xs text-[var(--foreground-secondary)] line-clamp-2 leading-relaxed">
                    {other.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--accent-bright)]">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
