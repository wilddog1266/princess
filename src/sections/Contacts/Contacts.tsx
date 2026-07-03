import { useState, type FormEvent } from 'react';
import { Section } from '../../components/layout/Section';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Reveal } from '../../components/motion/Reveal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { SITE, OPENING_HOURS, SOCIAL_LINKS } from '../../constants/site';

/** Booking form (front-end only) alongside the studio's contact details. */
export function Contacts() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <Section id="contacts" label="Contacts">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Contacts"
            title="Book your appointment"
            intro="Tell us what you have in mind and when suits you. We will confirm your visit personally."
          />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            {sent ? (
              <div className="flex h-full flex-col justify-center gap-3 rounded-md border border-border bg-surface p-10 text-center">
                <p className="font-display text-[1.6rem] text-text">Thank you.</p>
                <p className="text-text-muted">
                  Your request is in — we’ll be in touch personally to confirm your visit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Input id="name" label="Your name" name="name" type="text" autoComplete="name" />
                <Input
                  id="email"
                  label="Email or phone"
                  name="contact"
                  type="text"
                  autoComplete="email"
                />

                <div className="relative pt-6">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder=" "
                    className="peer w-full resize-none border-b border-border bg-transparent pb-2 text-text outline-none transition-colors duration-200 ease-[var(--ease-hover)] focus:border-transparent"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-0 top-6 origin-left text-text-muted transition-all duration-200 ease-[var(--ease-hover)] peer-focus:top-0 peer-focus:text-caption peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-caption peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.12em]"
                  >
                    What are you looking for?
                  </label>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[var(--ease-hover)] peer-focus:scale-x-100"
                  />
                </div>

                <Button type="submit" className="mt-6 self-start">
                  Request appointment
                </Button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <span className="label">Studio</span>
                <p className="text-text">{SITE.address}</p>
                <div className="flex flex-col">
                  <a
                    href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}
                    className="text-text-muted transition-colors duration-200 ease-[var(--ease-hover)] hover:text-accent"
                  >
                    {SITE.phone}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-text-muted transition-colors duration-200 ease-[var(--ease-hover)] hover:text-accent"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="label">Hours</span>
                <ul className="flex flex-col gap-1">
                  {OPENING_HOURS.map((row) => (
                    <li key={row.day} className="flex justify-between gap-8 text-text-muted">
                      <span>{row.day}</span>
                      <span className="text-text">{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <span className="label">Follow</span>
                <div className="flex gap-5">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text-muted transition-colors duration-200 ease-[var(--ease-hover)] hover:text-accent"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
