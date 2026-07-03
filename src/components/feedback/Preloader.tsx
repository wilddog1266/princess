import { useEffect, useState } from 'react';
import { useLenis } from '../../hooks/useLenis';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { SITE } from '../../constants/site';
import { cn } from '../../lib/utils';

const HOLD_MS = 1600; // brand hold before the curtain lifts

type Phase = 'show' | 'leaving' | 'done';

/**
 * First-paint preloader: a full-screen brand curtain that holds briefly, then
 * lifts to hand off to the hero's own entrance. The intro is a CSS keyframe
 * (framer mount-entrance freezes for elements in view here). Scroll is locked
 * underneath until it leaves. Skipped entirely under reduced motion.
 */
export function Preloader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>(prefersReducedMotion ? 'done' : 'show');

  useEffect(() => {
    if (phase !== 'show') return;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    window.scrollTo(0, 0);
    const timer = window.setTimeout(() => setPhase('leaving'), HOLD_MS);
    return () => window.clearTimeout(timer);
    // Runs once on mount; lenis is re-checked when the curtain leaves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'done') return;
    document.body.style.overflow = '';
    lenis?.start();
  }, [phase, lenis]);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden
      className={cn('preloader', phase === 'leaving' && 'preloader--leaving')}
      onTransitionEnd={() => setPhase('done')}
    >
      <div className="preloader__inner">
        <span className="preloader__word font-display">{SITE.name}</span>
        <span className="preloader__line" />
      </div>
    </div>
  );
}
