"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer-driven parallax. Attach the returned ref to a container; any descendant
 * carrying a `data-speed` attribute is translated proportionally to the pointer
 * offset from the container center. Disabled under prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const layers = Array.from(
      container.querySelectorAll<HTMLElement>("[data-speed]"),
    );

    let frame = 0;

    function handleMove(event: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        for (const layer of layers) {
          const speed = Number(layer.dataset.speed ?? "0.1");
          const x = (event.clientX - centerX) * speed;
          const y = (event.clientY - centerY) * speed;
          layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    }

    function handleLeave() {
      cancelAnimationFrame(frame);
      for (const layer of layers) {
        layer.style.transform = "translate3d(0, 0, 0)";
      }
    }

    container.addEventListener("pointermove", handleMove, { passive: true });
    container.addEventListener("pointerleave", handleLeave, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return containerRef;
}
