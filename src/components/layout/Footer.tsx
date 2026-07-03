import { Container } from './Container';
import { Divider } from '../ui/Divider';
import { NAV_LINKS } from '../../constants/navigation';
import { OPENING_HOURS, SITE, SOCIAL_LINKS } from '../../constants/site';

/** Closing footer — quiet, generous, the page's exhale. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-[var(--space-section)] pb-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-h3 text-text">{SITE.name}</p>
            <p className="mt-4 max-w-xs text-text-muted">{SITE.intro}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="w-fit text-text-muted transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <address className="flex flex-col gap-1 text-text-muted not-italic">
              <span>{SITE.address}</span>
              <a href={`tel:${SITE.phone}`} className="hover:text-text">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="hover:text-text">
                {SITE.email}
              </a>
            </address>
            <ul className="flex flex-col gap-1 text-text-muted">
              {OPENING_HOURS.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-6">
                  <span>{entry.day}</span>
                  <span>{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-12" />

        <div className="flex flex-col items-start justify-between gap-4 text-caption text-text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name} {SITE.tagline}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
