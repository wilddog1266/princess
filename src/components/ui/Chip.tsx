import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  active?: boolean;
  className?: string;
  children: ReactNode;
}

/** Selectable pill — portfolio filters and similar single-choice rows. */
export function Chip({ active = false, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'rounded-pill border px-4 py-2 text-caption font-medium tracking-wide transition-[color,background-color,border-color] duration-200 ease-[var(--ease-hover)]',
        active
          ? 'border-accent bg-accent-soft text-accent-strong'
          : 'border-border text-text-muted hover:border-border-strong hover:text-text',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
