import { cn } from '../../lib/utils';

type DividerVariant = 'plain' | 'dot';

interface DividerProps {
  variant?: DividerVariant;
  className?: string;
}

/** Quiet section separator: a hairline, optionally broken by a small accent dot. */
export function Divider({ variant = 'plain', className }: DividerProps) {
  if (variant === 'dot') {
    return (
      <div className={cn('flex w-full items-center gap-4', className)} role="separator">
        <span className="h-px flex-1 bg-border" />
        <span className="size-1 rounded-full bg-accent" />
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return <div className={cn('h-px w-full bg-border', className)} role="separator" />;
}
