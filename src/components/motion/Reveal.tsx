import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { useReveal } from '../../hooks/useReveal';
import { revealVariants } from '../../motion/variants';

interface RevealProps {
  children: ReactNode;
  /** Extra delay before this element reveals (seconds). */
  delay?: number;
  className?: string;
}

/** Single-element scroll reveal: soft upward fade once it enters the viewport. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, isInView } = useReveal<HTMLDivElement>();

  return (
    <m.div
      ref={ref}
      variants={revealVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
