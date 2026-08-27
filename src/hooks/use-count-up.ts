"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
}

/**
 * Animates a number from 0 to `end` once the element scrolls into view.
 * Respects prefers-reduced-motion by jumping straight to the final value.
 */
export function useCountUp({ end, duration = 1800 }: UseCountUpOptions) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      queueMicrotask(() => setValue(end));
      return;
    }

    let animationFrame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration, shouldReduceMotion]);

  return { ref, value };
}
