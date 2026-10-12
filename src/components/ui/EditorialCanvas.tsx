"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface EditorialCanvasProps {
  className?: string;
  dotSpacing?: number;
}

export function EditorialCanvas({
  className = "",
  dotSpacing = 36,
}: EditorialCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check for touch device
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140,
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      if (prefersReducedMotion || isTouchDevice) {
        renderStatic();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === "dark";
      ctx.fillStyle = isDark
        ? "rgba(66, 213, 255, 0.08)"
        : "rgba(10, 10, 11, 0.045)";

      const cols = Math.floor(width / dotSpacing);
      const rows = Math.floor(height / dotSpacing);
      const offsetX = (width - cols * dotSpacing) / 2;
      const offsetY = (height - rows * dotSpacing) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = offsetX + i * dotSpacing;
          const y = offsetY + j * dotSpacing;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      if (!isVisible) return;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === "dark";
      const cols = Math.floor(width / dotSpacing);
      const rows = Math.floor(height / dotSpacing);
      const offsetX = (width - cols * dotSpacing) / 2;
      const offsetY = (height - rows * dotSpacing) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const baseX = offsetX + i * dotSpacing;
          const baseY = offsetY + j * dotSpacing;

          const dx = mouse.x - baseX;
          const dy = mouse.y - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let x = baseX;
          let y = baseY;
          let radius = 1;
          let alpha = isDark ? 0.07 : 0.04;

          // Subtle interactive proximity reaction
          if (dist < mouse.radius && mouse.x > -500) {
            const factor = 1 - dist / mouse.radius;
            const angle = Math.atan2(dy, dx);
            const displace = factor * 4;
            x -= Math.cos(angle) * displace;
            y -= Math.sin(angle) * displace;

            radius = 1 + factor * 1.2;
            alpha = isDark
              ? 0.07 + factor * 0.35
              : 0.04 + factor * 0.22;
          }

          ctx.fillStyle = isDark
            ? `rgba(66, 213, 255, ${alpha})`
            : `rgba(10, 10, 11, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Pause when canvas is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !prefersReducedMotion && !isTouchDevice) {
            cancelAnimationFrame(animationFrameId);
            animate();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    handleResize();
    window.addEventListener("resize", handleResize);

    if (!prefersReducedMotion && !isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.body.addEventListener("mouseleave", handleMouseLeave);
      animate();
    } else {
      renderStatic();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dotSpacing, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
