import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function useCountUp(
  target: number,
  decimals: number = 0,
  duration: number = 1100
): string | number {
  const [value, setValue] = useState<number>(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    let rafId: number;
    const startTime = performance.now();

    const tick = (currentTime: number): void => {
      const progress = Math.min(1, (currentTime - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, reduced]);

  return decimals ? value.toFixed(decimals) : Math.round(value);
}
