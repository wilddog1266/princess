import type { Variants } from 'framer-motion';
import { easing } from './easings';
import { duration, stagger } from './transitions';

/**
 * Shared reveal variants. Under prefers-reduced-motion, MotionConfig
 * ("user") drops the transform (y) and keeps a plain opacity fade.
 */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easing.entrance },
  },
};

/** Child item for staggered groups — slightly shorter travel than a lone reveal. */
export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easing.entrance },
  },
};

/** Container that staggers its RevealItem children into view. */
export const staggerContainer = (staggerChildren: number = stagger.base): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});

