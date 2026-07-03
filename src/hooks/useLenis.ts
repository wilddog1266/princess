import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export const LenisContext = createContext<Lenis | null>(null);

/**
 * Access the shared Lenis instance (e.g. for scroll-to or scroll progress).
 * Returns null when smooth scroll is disabled (reduced-motion / touch).
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
