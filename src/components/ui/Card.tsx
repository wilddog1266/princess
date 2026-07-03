import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enables hover lift + accent border. Use for clickable cards only. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Material surface: subtle raised background, hairline border, layered shadow.
 * Interactive cards lift on hover and warm their border to the accent.
 */
export function Card({ interactive = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-border bg-surface p-8 shadow-[var(--shadow-md)]',
        interactive &&
          'transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-hover)] hover:-translate-y-1.5 hover:border-accent hover:shadow-[var(--shadow-lg)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
