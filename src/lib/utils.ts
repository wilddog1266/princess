/**
 * utils.ts — Pure, dependency-free math helpers.
 * Used by the cursor particle engine (M7) and parallax (M4/M8).
 */

/** Linear interpolation between a and b by t (0–1). */
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Constrain n to the [min, max] range. */
export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);

/** Re-map n from one range to another. */
export const mapRange = (
  n: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => ((n - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/** Random float in [min, max). */
export const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

/** Join truthy class names. Internal variant maps only — no Tailwind conflict merging. */
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');
