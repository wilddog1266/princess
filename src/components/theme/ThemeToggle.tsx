import { useId, type MouseEvent } from 'react';
import { m } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { easing } from '../../motion/easings';
import { duration } from '../../motion/transitions';

/**
 * Fixed theme switch. A single disc that morphs between a full disc (light)
 * and a crescent (dark) via a moving mask — abstract, not a literal sun/moon.
 * On activation it records the click origin so ThemeBloom can radiate the
 * re-light from exactly this control.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const maskId = useId();
  const isDark = theme === 'dark';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty('--theme-origin-x', `${rect.left + rect.width / 2}px`);
    root.style.setProperty('--theme-origin-y', `${rect.top + rect.height / 2}px`);
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="fixed top-6 right-6 z-[40] grid size-11 place-items-center rounded-full border border-border-strong bg-bg-elev/70 text-text backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-hover)] hover:border-accent hover:shadow-[0_0_24px_-4px_var(--accent-glow)]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <m.circle
            cy="9"
            r="8"
            fill="black"
            initial={false}
            animate={{ cx: isDark ? 17 : 31 }}
            transition={{ duration: duration.base, ease: easing.hover }}
          />
        </mask>
        <circle cx="12" cy="12" r="7" fill="currentColor" mask={`url(#${maskId})`} />
      </svg>
    </button>
  );
}
