import React from "react";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
  size?: number;
  light?: boolean;
}

export function Logo({
  variant = "full",
  className = "",
  size = 28,
  light,
}: LogoProps) {
  // If light prop is explicitly provided, use fixed colors.
  // Otherwise, use CSS variables for instant, hydration-safe theme switching.
  const markColor = light === true ? "#F3F7FC" : light === false ? "#101114" : "var(--foreground)";
  const textColor = light === true ? "#F3F7FC" : light === false ? "#101114" : "var(--foreground)";
  const subtextColor = light === true ? "#A9B9CC" : light === false ? "#626A75" : "var(--foreground-secondary)";
  const dotColor = light === true ? "#42D5FF" : light === false ? "#1677D2" : "var(--accent-bright)";

  if (variant === "icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Autocratic emblem"
        role="img"
      >
        {/* Geometric Monogram */}
        <rect
          x="3"
          y="3"
          width="26"
          height="26"
          rx="6"
          stroke={markColor}
          strokeWidth="1.75"
        />
        <path
          d="M16 8L9.5 23H13L16 16L19 23H22.5L16 8Z"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="12.5"
          y1="18.5"
          x2="19.5"
          y2="18.5"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="21" cy="9.5" r="1.5" fill={dotColor} />
      </svg>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      aria-label="Autocratic"
      role="img"
    >
      {/* Precision Monogram Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="26"
          height="26"
          rx="6"
          stroke={markColor}
          strokeWidth="1.75"
        />
        <path
          d="M16 8L9.5 23H13L16 16L19 23H22.5L16 8Z"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="12.5"
          y1="18.5"
          x2="19.5"
          y2="18.5"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="21" cy="9.5" r="1.5" fill={dotColor} />
      </svg>

      {/* Confident Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className="text-[0.9375rem] font-bold tracking-tight transition-colors duration-200"
          style={{ color: textColor, letterSpacing: "-0.015em" }}
        >
          AUTOCRATIC
        </span>
        <span
          className="text-[0.5625rem] font-medium tracking-[0.2em] uppercase mt-0.5 transition-colors duration-200"
          style={{ color: subtextColor }}
        >
          ENTERPRISE IT
        </span>
      </div>
    </div>
  );
}
