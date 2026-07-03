import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'text';
type ButtonSize = 'sm' | 'md';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

const base =
  'relative inline-flex items-center justify-center overflow-hidden rounded-pill font-medium tracking-wide whitespace-nowrap transition-[color,border-color,box-shadow] duration-300 ease-[var(--ease-hover)] disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-caption',
  md: 'px-7 py-3.5 text-[0.9375rem]',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-contrast hover:shadow-[0_8px_30px_-8px_var(--accent-glow)]',
  secondary: 'border border-border-strong text-text hover:border-accent hover:bg-accent-soft',
  text: 'group rounded-none px-1 text-text',
};

/**
 * Primary CTA / secondary / text link. Premium motion only:
 * primary wipes a warmer accent from the left, text draws an underline.
 * No pulsing, no bounce. Renders <a> when `href` is set, else <button>.
 */
export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  const content = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-[101%] bg-accent-strong transition-transform duration-300 ease-[var(--ease-hover)] group-hover:translate-x-0"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {variant === 'text' && (
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[var(--ease-hover)] group-hover:scale-x-100" />
        )}
      </span>
    </>
  );

  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    variant === 'primary' && 'group',
    className,
  );

  if (rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
