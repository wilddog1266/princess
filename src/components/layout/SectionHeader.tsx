import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Shared section intro: tracked eyebrow, display title, optional lead. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <p className="label">{eyebrow}</p>
      <h2 className="max-w-2xl text-text">{title}</h2>
      {intro && (
        <p className={cn('text-text-muted', align === 'center' && 'mx-auto')}>{intro}</p>
      )}
    </div>
  );
}
