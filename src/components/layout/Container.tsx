import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

/** Centered content column at the project max width with responsive gutters. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[var(--content-max)] px-6 md:px-10', className)}>
      {children}
    </div>
  );
}
