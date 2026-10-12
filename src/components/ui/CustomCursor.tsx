"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function CustomCursor() {
  const isClient = useIsClient();
  const { theme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isFirstMove = useRef(true);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const fineQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapability = () => {
      setEnabled(fineQuery.matches && !motionQuery.matches);
    };

    updateCapability();

    fineQuery.addEventListener("change", updateCapability);
    motionQuery.addEventListener("change", updateCapability);

    return () => {
      fineQuery.removeEventListener("change", updateCapability);
      motionQuery.removeEventListener("change", updateCapability);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (isFirstMove.current) {
        dotPos.current = { x: e.clientX, y: e.clientY };
        ringPos.current = { x: e.clientX, y: e.clientY };
        isFirstMove.current = false;
      }

      setVisible(true);

      // Check for contextual interactive hover targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("a, button, [role='button'], input, textarea, select");
        const customViewTarget = target.closest("[data-cursor='view']");

        if (customViewTarget) {
          setHovered(true);
          setCursorText("VIEW");
        } else if (interactive) {
          setHovered(true);
          setCursorText(null);
        } else {
          setHovered(false);
          setCursorText(null);
        }
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
      setHovered(false);
      setCursorText(null);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    // Smooth dual-tier interpolation (LERP) loop:
    // Dot has a subtle, controlled lag; outer ring smoothly trails behind.
    const animateCursor = () => {
      const dotEase = 0.35;
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotEase;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotEase;

      const ringEase = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringEase;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringEase;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  if (!isClient || !enabled) return null;

  const isDark = theme === "dark";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 select-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Primary Precision Dot — Bright Red (#FF0000) 14px with intentional subtle lag */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[7px] -mt-[7px] w-[14px] h-[14px] rounded-full bg-[#FF0000] shadow-[0_0_6px_rgba(255,0,0,0.65)] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />

      {/* Smooth Interpolated Follower Ring — 38px to 48px, visible against all light & dark surfaces */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-[width,height,margin,background-color,border-color,box-shadow] duration-200 ease-out will-change-transform ${
          cursorText
            ? isDark
              ? "-ml-[29px] -mt-[29px] w-[58px] h-[58px] bg-[#0E2034] text-[#42D5FF] font-mono text-[9px] font-semibold tracking-widest border border-[rgba(66,213,255,0.45)] shadow-[0_0_20px_rgba(22,136,212,0.4)]"
              : "-ml-[29px] -mt-[29px] w-[58px] h-[58px] bg-neutral-950 text-white font-mono text-[9px] font-semibold tracking-widest border border-neutral-900 shadow-md"
            : hovered
            ? isDark
              ? "-ml-[24px] -mt-[24px] w-[48px] h-[48px] bg-[#1688D4]/15 border border-[#42D5FF]/70 shadow-[0_0_15px_rgba(66,213,255,0.25)] backdrop-blur-[1px]"
              : "-ml-[24px] -mt-[24px] w-[48px] h-[48px] bg-neutral-900/[0.06] border border-neutral-500 backdrop-blur-[1px]"
            : isDark
            ? "-ml-[19px] -mt-[19px] w-[38px] h-[38px] bg-[rgba(22,136,212,0.06)] border border-[rgba(66,213,255,0.4)]"
            : "-ml-[19px] -mt-[19px] w-[38px] h-[38px] bg-neutral-900/[0.03] border border-neutral-400"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </div>
  );
}
