import { type ReactNode } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { ThemeProvider } from './ThemeProvider';
import { LenisProvider } from './LenisProvider';
import { easing } from '../../motion/easings';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Single composition point for all app-wide providers.
 * LazyMotion + the `m` component (used throughout instead of `motion`) loads
 * only the domAnimation feature set, keeping framer-motion's bundle cost down.
 * MotionConfig defers to the OS reduced-motion setting and sets the default
 * easing so any unspecified Framer transition still uses the brand curve.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user" transition={{ ease: easing.hover }}>
          <LenisProvider>{children}</LenisProvider>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
