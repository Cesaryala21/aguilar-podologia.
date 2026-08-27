import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past a given threshold.
 * Uses a passive scroll listener with rAF throttling to avoid layout thrash.
 */
export function useScrollPosition(threshold = 80): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
