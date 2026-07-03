import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'outline' | 'accent';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  outline: 'border border-border text-text-muted',
  accent: 'bg-accent-soft text-accent-strong',
};

/** Small tracked-uppercase pill — "signature" tier, "new", category tags. */
export function Badge({ variant = 'outline', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-3 py-1 text-caption font-medium tracking-[0.16em] uppercase',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
