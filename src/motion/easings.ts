/**
 * easings.ts — Named cubic-bezier curves for Framer Motion.
 * Mirrors the --ease-* CSS tokens so JS and CSS motion stay identical.
 * No default ease-in-out is used anywhere in the project.
 */

type Bezier = [number, number, number, number];

export const easing = {
  /** easeOutExpo — entrances, scroll reveals. */
  entrance: [0.16, 1, 0.3, 1] as Bezier,
  /** easeInOutQuart — panels, theme transition (symmetric, weighted). */
  panel: [0.76, 0, 0.24, 1] as Bezier,
  /** easeOut — hovers, micro-interactions. */
  hover: [0.22, 1, 0.36, 1] as Bezier,
};

export type EasingName = keyof typeof easing;
