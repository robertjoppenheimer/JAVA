"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Clock, ShieldCheck, CheckCircle2, ArrowUpRight, AlertCircle, Loader2 } from "lucide-react";
import { services } from "@/data/services";

interface SubmissionResponse {
  success: boolean;
  referenceId?: string;
  name?: string;
  service?: string;
  receivedAt?: string;
  message?: string;
  error?: string;
  details?: Record<string, string>;
}

function resolveInitialService(param: string | null): string {
  if (!param) return "";
  const decoded = decodeURIComponent(param).toLowerCase();
  const matched = services.find(
    (s) =>
      s.title.toLowerCase() === decoded ||
      s.slug.toLowerCase() === decoded ||
      s.id.toLowerCase() === decoded ||
      s.category.toLowerCase() === decoded
  );
  return matched ? matched.title : param;
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialServiceParam = searchParams.get("service");

  const [formData, setFormData] = useState(() => ({
    name: "",
    email: "",
    company: "",
    service: resolveInitialService(initialServiceParam),
    message: "",
    website: "", // Honeypot field for spam prevention
  }));

  const renderedAtRef = useRef<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Initialize renderedAt timestamp once mounted on the client
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name is required (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please provide a valid business email address.";
    }

    if (!formData.service) {
      errs.service = "Please select a service area.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Please describe your project requirements (at least 10 characters).";
    }

    setClientErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          website: formData.website, // Honeypot
          renderedAt: renderedAtRef.current || Date.now(),
        }),
      });

      const data: SubmissionResponse = await response.json();

      if (!response.ok || !data.success) {
        if (data.details) {
          setClientErrors(data.details);
        }
        setServerError(data.error || "Submission failed. Please check the fields and try again.");
      } else {
        setSubmissionResult(data);
      }
    } catch {
      setServerError("A network error occurred. Please check your connection and try submitting again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
      website: "",
    });
    setSubmissionResult(null);
    setClientErrors({});
    setServerError(null);
    renderedAtRef.current = Date.now();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Form Column */}
      <div className="lg:col-span-7">
        <div className="p-8 sm:p-12 rounded-3xl border border-[var(--border)] bg-[var(--surface-card)] shadow-[var(--shadow-card)]">
          {submissionResult && submissionResult.success ? (
            <div className="py-8 text-center space-y-6" role="status" aria-live="polite">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-3">
                <span className="font-mono text-xs text-[var(--accent-bright)] font-semibold uppercase tracking-wider block">
                  Reference // {submissionResult.referenceId}
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--foreground)]">
                  Consultation Request Confirmed
                </h2>
                <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-[var(--foreground)]">{submissionResult.name}</span>. Your enquiry regarding{" "}
                  <span className="font-semibold text-[var(--foreground)]">{submissionResult.service}</span> has been logged into our engineering queue.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--foreground-secondary)] max-w-md mx-auto space-y-2 text-left font-mono">
                <div className="flex justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--foreground-subtle)]">STATUS</span>
                  <span className="text-emerald-500 font-semibold">VERIFIED &amp; QUEUED</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--foreground-subtle)]">ESTIMATED RESPONSE</span>
                  <span className="text-[var(--foreground)]">Within 1 Business Day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--foreground-subtle)]">TIMESTAMP</span>
                  <span className="text-[var(--foreground)]">
                    {submissionResult.receivedAt ? new Date(submissionResult.receivedAt).toUTCString() : "Confirmed"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[var(--foreground-muted)] max-w-sm mx-auto">
                A senior solutions engineer will review your environment and contact you via your provided email address.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-colors shadow-sm cursor-pointer"
                >
                  Submit Another Consultation Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--foreground)] mb-1">
                  Technical Consultation Request
                </h2>
                <p className="text-xs text-[var(--foreground-subtle)]">
                  Fields marked with <span className="text-[var(--accent-bright)] font-bold">*</span> are required for architecture review.
                </p>
              </div>

              {/* Honeypot field (hidden from real users, caught if bots fill it) */}
              <div className="hidden pointer-events-none" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Submission Error</span>
                    <span>{serverError}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase text-[var(--foreground-subtle)] mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (clientErrors.name) setClientErrors({ ...clientErrors, name: "" });
                    }}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      clientErrors.name ? "border-red-500" : "border-[var(--border)]"
                    } bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] text-sm focus:border-[var(--accent-bright)] focus:outline-none transition-colors`}
                    aria-invalid={Boolean(clientErrors.name)}
                    aria-describedby={clientErrors.name ? "name-error" : undefined}
                  />
                  {clientErrors.name && (
                    <span id="name-error" className="block text-xs text-red-500 mt-1 font-mono">
                      {clientErrors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase text-[var(--foreground-subtle)] mb-2"
                  >
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (clientErrors.email) setClientErrors({ ...clientErrors, email: "" });
                    }}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      clientErrors.email ? "border-red-500" : "border-[var(--border)]"
                    } bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] text-sm focus:border-[var(--accent-bright)] focus:outline-none transition-colors`}
                    aria-invalid={Boolean(clientErrors.email)}
                    aria-describedby={clientErrors.email ? "email-error" : undefined}
                  />
                  {clientErrors.email && (
                    <span id="email-error" className="block text-xs text-red-500 mt-1 font-mono">
                      {clientErrors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-mono uppercase text-[var(--foreground-subtle)] mb-2"
                  >
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Enterprise"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] text-sm focus:border-[var(--accent-bright)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-xs font-mono uppercase text-[var(--foreground-subtle)] mb-2"
                  >
                    Target Discipline *
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => {
                      setFormData({ ...formData, service: e.target.value });
                      if (clientErrors.service) setClientErrors({ ...clientErrors, service: "" });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      clientErrors.service ? "border-red-500" : "border-[var(--border)]"
                    } bg-[var(--surface)] text-[var(--foreground)] text-sm focus:border-[var(--accent-bright)] focus:outline-none transition-colors`}
                    aria-invalid={Boolean(clientErrors.service)}
                    aria-describedby={clientErrors.service ? "service-error" : undefined}
                  >
                    <option value="" disabled className="bg-[var(--surface)] text-[var(--foreground)]">
                      Select technical discipline...
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title} className="bg-[var(--surface)] text-[var(--foreground)]">
                        {s.title}
                      </option>
                    ))}
                    <option value="General IT Infrastructure Assessment" className="bg-[var(--surface)] text-[var(--foreground)]">
                      General IT Assessment &amp; Modernization
                    </option>
                  </select>
                  {clientErrors.service && (
                    <span id="service-error" className="block text-xs text-red-500 mt-1 font-mono">
                      {clientErrors.service}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono uppercase text-[var(--foreground-subtle)] mb-2"
                >
                  Project Scope &amp; Infrastructure Requirements *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (clientErrors.message) setClientErrors({ ...clientErrors, message: "" });
                  }}
                  placeholder="Describe your current IT environment, performance bottlenecks, target timeline, or cloud/software goals..."
                  className={`w-full px-4 py-3 rounded-xl border ${
                    clientErrors.message ? "border-red-500" : "border-[var(--border)]"
                  } bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] text-sm focus:border-[var(--accent-bright)] focus:outline-none transition-colors resize-y`}
                  aria-invalid={Boolean(clientErrors.message)}
                  aria-describedby={clientErrors.message ? "message-error" : undefined}
                />
                {clientErrors.message && (
                  <span id="message-error" className="block text-xs text-red-500 mt-1 font-mono">
                    {clientErrors.message}
                  </span>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--pill-text)] bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] transition-all shadow-sm disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Consultation Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
                  Target Response: &lt; 1 Business Day
                </span>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Direct Details Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-card)] space-y-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] block font-mono">
            Direct Inquiries
          </span>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 text-[var(--accent-bright)]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-subtle)]">
                  Official Communications
                </h3>
                <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">
                  Direct Intake Form
                </p>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  (Domain inbox pending DNS MX configuration)
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 text-[var(--accent-bright)]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-subtle)]">
                  Response Protocol
                </h3>
                <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">
                  Within 1 business day
                </p>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  All inquiries reviewed by a solutions engineer
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 text-[var(--accent-bright)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-subtle)]">
                  Client Confidentiality
                </h3>
                <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">
                  Standard NDA Protection
                </p>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  Technical specifications handled with strict confidentiality
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Consultation Scope Notice */}
        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-card)]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)] block mb-3 font-mono">
            Scope Areas Covered
          </span>
          <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-4">
            We provide advisory, architecture, and deployment across all seven core disciplines:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {services.map((s) => (
              <span
                key={s.id}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[var(--foreground-secondary)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)]"
              >
                {s.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      {/* Editorial Header */}
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-semibold text-[var(--foreground-subtle)]">
              [ 04 / CONTACT ]
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              Start a Conversation
            </span>
          </div>

          <div className="max-w-4xl mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-tight text-[var(--foreground)] leading-[1.05]">
              Let’s discuss your technical objectives.
            </h1>
          </div>

          <p className="max-w-2xl text-lg sm:text-xl text-[var(--foreground-secondary)] font-normal leading-relaxed">
            Tell us about your upcoming infrastructure deployment, cloud migration,
            enterprise network, or ERP software requirements.
          </p>
        </div>
      </section>

      {/* Main Contact Form & Details Grid */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Suspense fallback={<div className="py-16 text-center text-xs font-mono text-[var(--foreground-subtle)]">Loading consultation form...</div>}>
            <ContactFormInner />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
