"use client";

import { useCallback, type PointerEvent } from "react";

/**
 * Returns a pointer handler that feeds the hovered element's local cursor
 * position into the `--glow-x` / `--glow-y` custom properties consumed by the
 * `.mouse-glow` utility. Pair with `className="mouse-glow"` and
 * `onPointerMove={handleGlow}`.
 */
export function useMouseGlow() {
  return useCallback((event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--glow-x", `${x}%`);
    target.style.setProperty("--glow-y", `${y}%`);
  }, []);
}
