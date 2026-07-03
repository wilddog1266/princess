import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { useReveal } from '../../hooks/useReveal';
import { revealItemVariants, staggerContainer } from '../../motion/variants';

interface RevealGroupProps {
  children: ReactNode;
  /** Delay between each child (seconds). */
  stagger?: number;
  className?: string;
}

/**
 * Staggered reveal container. Wrap each child element in <RevealItem> so the
 * group animates them into view one after another when it enters the viewport.
 */
export function RevealGroup({ children, stagger, className }: RevealGroupProps) {
  const { ref, isInView } = useReveal<HTMLDivElement>();

  return (
    <m.div
      ref={ref}
      variants={staggerContainer(stagger)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </m.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

/** A single staggered child. Must be rendered inside <RevealGroup>. */
export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <m.div variants={revealItemVariants} className={className}>
      {children}
    </m.div>
  );
}
