import { createRoot } from 'react-dom/client';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import './styles/globals.css';
import { AppProviders } from './app/providers/AppProviders';
import App from './app/App';

// StrictMode is intentionally omitted: its dev-only double-mount interrupts
// framer-motion entrance/reveal animations mid-flight (they freeze partway).
// Production never double-mounts, so this only affects the dev experience.
createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
