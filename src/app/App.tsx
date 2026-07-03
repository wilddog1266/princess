import { ThemeBloom } from '../components/theme/ThemeBloom';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { Navigation } from '../components/navigation/Navigation';
import { CursorEffect } from '../components/cursor/CursorEffect';
import { Preloader } from '../components/feedback/Preloader';
import { Footer } from '../components/layout/Footer';
import { useAnchorScroll } from '../hooks/useAnchorScroll';
import { About, Contacts, Hero, Portfolio, Prices, Reviews, Services } from '../sections';

/**
 * Page shell. Scroll reveals (M4) wrap the sections; atmosphere layers (grain,
 * vignette) and the first-paint preloader (M9) sit above the page.
 */
function App() {
  useAnchorScroll();

  return (
    <>
      <ThemeBloom />
      <Navigation />
      <ThemeToggle />
      <CursorEffect />

      <div aria-hidden className="vignette" />
      <div aria-hidden className="grain" />
      <Preloader />

      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Prices />
        <Reviews />
        <About />
        <Contacts />
      </main>

      <Footer />
    </>
  );
}

export default App;
