import { useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { LenisContext } from '../../hooks/useLenis';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface LenisProviderProps {
  children: ReactNode;
}

/**
 * Initializes a single shared Lenis instance and drives its rAF loop.
 * Smooth scroll is disabled entirely under prefers-reduced-motion, in which
 * case the context provides null and native scrolling is used.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLenis(null);
      return;
    }

    const instance = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    setLenis(instance);

    let rafId = requestAnimationFrame(function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [prefersReducedMotion]);

  return <LenisContext value={lenis}>{children}</LenisContext>;
}
