import { useEffect } from 'react';
import { useLenis } from './useLenis';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Delegates clicks on in-page anchor links (href="#id") to Lenis for a smooth,
 * inertial scroll. Falls back to native instant scroll when Lenis is disabled
 * (reduced motion). Attach once near the app root.
 */
export function useAnchorScroll() {
  const lenis = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement);
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [lenis, prefersReducedMotion]);
}
