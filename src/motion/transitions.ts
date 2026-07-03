/**
 * transitions.ts — Duration & delay constants (seconds, for Framer Motion).
 * Mirrors the --dur-* CSS tokens. Single source for all JS-side timing.
 */

export const duration = {
  fast: 0.2,
  base: 0.3,
  slow: 0.6,
  reveal: 0.7,
  panel: 0.5,
  theme: 0.8,
} as const;

/** Stagger delay between revealed children. */
export const stagger = {
  tight: 0.04,
  base: 0.06,
  loose: 0.07,
} as const;
