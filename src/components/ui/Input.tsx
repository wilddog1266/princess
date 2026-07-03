import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  label: string;
  /** Validation message; switches the field to a muted terracotta state. */
  error?: string;
  className?: string;
}

/**
 * Hairline-underline field with a CSS-only floating label and an accent
 * underline that draws in on focus. No box, no harsh borders.
 */
export function Input({ id, label, error, className, ...rest }: InputProps) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;

  return (
    <div className={cn('relative pt-6', className)}>
      <input
        id={id}
        placeholder=" "
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={cn(
          'peer w-full border-b bg-transparent pb-2 text-text outline-none transition-colors duration-200 ease-[var(--ease-hover)]',
          hasError ? 'border-error' : 'border-border focus:border-transparent',
        )}
        {...rest}
      />

      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-0 top-6 origin-left text-text-muted transition-all duration-200 ease-[var(--ease-hover)]',
          'peer-focus:top-0 peer-focus:text-caption peer-focus:tracking-[0.12em] peer-focus:uppercase peer-focus:text-accent',
          'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-caption peer-[:not(:placeholder-shown)]:tracking-[0.12em] peer-[:not(:placeholder-shown)]:uppercase',
          hasError && 'text-error peer-focus:text-error',
        )}
      >
        {label}
      </label>

      {/* Underline draw — sits over the hairline on focus */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[var(--ease-hover)] peer-focus:scale-x-100"
      />

      {hasError && (
        <p id={errorId} className="mt-2 text-caption text-error">
          {error}
        </p>
      )}
    </div>
  );
}
