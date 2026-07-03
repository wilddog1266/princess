import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext } from '../../hooks/useTheme';
import type { Theme } from '../../types/theme';

const STORAGE_KEY = 'princess-theme';

/** Read the theme already applied to <html> by the anti-FOUC script in index.html. */
function getInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const applied = document.documentElement.getAttribute('data-theme');
    if (applied === 'light' || applied === 'dark') return applied;
  }
  return 'light';
}

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Owns theme state, mirrors it to the [data-theme] attribute and localStorage.
 * The actual re-light is driven by CSS variable transitions (themes.css).
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode / storage disabled — non-fatal, theme still applies */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  /* Keep state in sync if the attribute was set before hydration. */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
