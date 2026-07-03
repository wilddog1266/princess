import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  /** Anchor id (matches NAV_LINKS hrefs). */
  id: string;
  /** Accessible name for the landmark (used as aria-label). */
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * Page section landmark with the project vertical rhythm and a scroll-margin
 * so anchored navigation lands clear of any future fixed UI. Horizontal
 * width is owned by <Container>, composed by each section as needed.
 */
export function Section({ id, label, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn('scroll-mt-24 py-[var(--space-section)]', className)}
    >
      {children}
    </section>
  );
}
