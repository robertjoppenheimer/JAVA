import React from "react";

interface SectionHeadingProps {
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "split";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  if (align === "split") {
    return (
      <div
        className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border)] mb-12 lg:mb-16 ${className}`}
      >
        <div className="max-w-2xl">
          {(eyebrow || index) && (
            <div className="flex items-center gap-2 mb-4">
              {index && (
                <span className="font-mono text-xs text-[var(--accent-bright)] font-semibold tracking-wider">
                  [{index}]
                </span>
              )}
              {eyebrow && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
                  {eyebrow}
                </span>
              )}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--foreground)] leading-[1.08]">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="max-w-md text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed lg:pb-1">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  const isCenter = align === "center";

  return (
    <div
      className={`mb-12 lg:mb-16 ${
        isCenter ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl"
      } ${className}`}
    >
      {(eyebrow || index) && (
        <div
          className={`flex items-center gap-2 mb-4 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          {index && (
            <span className="font-mono text-xs text-[var(--accent-bright)] font-semibold tracking-wider">
              [{index}]
            </span>
          )}
          {eyebrow && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--foreground)] leading-[1.08] mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--foreground-secondary)] font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
