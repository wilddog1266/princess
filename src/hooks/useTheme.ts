import { createContext, useContext } from 'react';
import type { ThemeContextValue } from '../types/theme';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Access the active theme and its setters. Must be used within <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
