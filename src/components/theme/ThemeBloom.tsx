import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { easing } from '../../motion/easings';
import { duration } from '../../motion/transitions';

const ANIMATING_ATTR = 'data-theme-animating';

/**
 * Plays the theme re-light. On every theme change it:
 *  1. arms html[data-theme-animating] so the whole palette eases (globals.css),
 *  2. radiates a single soft accent wash from the toggle origin.
 * Disabled under reduced motion — the swap is then instant.
 */
export function ThemeBloom() {
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [burstId, setBurstId] = useState<number | null>(null);
  const isFirstRun = useRef(true);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (prefersReducedMotion) return;

    const root = document.documentElement;
    root.setAttribute(ANIMATING_ATTR, '');
    setBurstId((id) => (id ?? 0) + 1);

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(
      () => root.removeAttribute(ANIMATING_ATTR),
      duration.theme * 1000,
    );

    return () => window.clearTimeout(timeoutRef.current);
  }, [theme, prefersReducedMotion]);

  if (prefersReducedMotion || burstId === null) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <m.div
        key={burstId}
        className="absolute size-[120px] rounded-full will-change-transform"
        style={{
          left: 'var(--theme-origin-x, 50%)',
          top: 'var(--theme-origin-y, 50%)',
          marginLeft: -60,
          marginTop: -60,
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 50, opacity: [0, 0.85, 0] }}
        transition={{ duration: duration.theme, ease: easing.panel, times: [0, 0.4, 1] }}
        onAnimationComplete={() => setBurstId(null)}
      />
    </div>
  );
}
