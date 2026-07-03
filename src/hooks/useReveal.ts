import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Reveal trigger built on Framer's IntersectionObserver (useInView).
 * Returns a typed ref to attach and whether the element has entered view.
 * Fires slightly before the element is fully visible, once by default.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(once = true) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -12% 0px' });
  return { ref, isInView };
}
