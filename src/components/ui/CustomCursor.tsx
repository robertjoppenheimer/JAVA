"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/**
 * CustomCursor
 *
 * Implements a refined, premium solid red dot (#FF0000) design accent:
 * - 8px diameter solid red circle with a subtle dual-layer shadow visible on dark & light backgrounds
 * - Fixed 12px diagonal offset (+12px X, +12px Y) from the native pointer
 * - Frame-rate-independent exponential damping (lerp factor ~0.12 at 60 FPS) via requestAnimationFrame
 * - Complete absence of surrounding rings, reticles, or outlines
 * - Fully unblocking: pointer-events: none, no interaction interception
 * - Clean viewport enter/exit tracking
 * - Disabled automatically on touch/coarse pointers and prefers-reduced-motion
 * - Zero React state updates on mousemove; direct DOM transforms with will-change: transform
 */
export function CustomCursor() {
  const isClient = useIsClient();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);

  // Target mouse position (viewport coordinates)
  const mousePos = useRef({ x: -100, y: -100 });
  // Interpolated position of the red dot
  const dotPos = useRef({ x: -100, y: -100 });
  // Timestamp of last animation frame for delta-time calculations
  const lastTimeRef = useRef<number | null>(null);
  const isFirstMove = useRef(true);
  const rafId = useRef<number | null>(null);

  // Desired diagonal offset from native cursor: 12px right, 12px down
  const OFFSET_X = 12;
  const OFFSET_Y = 12;

  // Detect pointer capability and reduced motion preferences
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
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (isFirstMove.current) {
        dotPos.current.x = e.clientX + OFFSET_X;
        dotPos.current.y = e.clientY + OFFSET_Y;
        isFirstMove.current = false;
      }

      setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    // Frame-rate-independent interpolation:
    // At 60 FPS (dt ≈ 16.67ms), 1 - Math.exp(-k * dt) with k = 7.5 yields an effective factor of ~0.118
    // This provides a smooth, perceptible delay that naturally glides to rest without oscillation.
    const DAMPING_K = 7.5;

    const animateCursor = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }
      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1); // clamp to max 100ms
      lastTimeRef.current = currentTime;

      const targetX = mousePos.current.x + OFFSET_X;
      const targetY = mousePos.current.y + OFFSET_Y;

      const lerpFactor = 1 - Math.exp(-DAMPING_K * dt);

      dotPos.current.x += (targetX - dotPos.current.x) * lerpFactor;
      dotPos.current.y += (targetY - dotPos.current.y) * lerpFactor;

      if (dotRef.current) {
        // -4px centers the 8px diameter dot at dotPos coordinates
        const renderX = Math.round((dotPos.current.x - 4) * 10) / 10;
        const renderY = Math.round((dotPos.current.y - 4) * 10) / 10;
        dotRef.current.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;
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
      lastTimeRef.current = null;
    };
  }, [enabled]);

  if (!isClient || !enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Refined 8px solid red dot with subtle drop shadow for crisp visibility on light & dark backgrounds */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF0000] will-change-transform shadow-[0_1px_3px_rgba(0,0,0,0.45),0_0_4px_rgba(255,0,0,0.6)]"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </div>
  );
}
