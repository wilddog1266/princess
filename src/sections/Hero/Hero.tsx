import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { HeroPortrait } from './HeroPortrait';
import { SITE } from '../../constants/site';

const FEATURED_IN = ['Vogue', 'Harper’s Bazaar', 'Elle', 'Allure', 'Tatler'] as const;

/**
 * Hero — the visual centerpiece. The portrait bleeds full-height down the right
 * half and melts into the page on its left; copy cascades up over it on the
 * left, anchored by an oversized wordmark watermark. (Preloader hand-off: M9.)
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-label="Home"
      className="relative isolate flex min-h-dvh items-center overflow-hidden lg:items-start"
    >
      {/* Full-bleed portrait panel, right half */}
      <div className="absolute inset-y-0 right-0 z-0 w-[72%] sm:w-[64%] lg:w-[58%]">
        {/* Warm accent glow, low and to the inner edge of the portrait */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[16%] left-[-12%] size-[42vw] max-w-xl rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_68%)] blur-3xl"
        />
        <HeroPortrait />
      </div>

      {/* Oversized wordmark watermark, behind the portrait */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[4%] z-0 px-6 text-center font-display leading-none text-[26vw] font-light tracking-tight text-text/[0.12] select-none lg:pr-[6%] lg:text-right lg:text-[18vw]"
      >
        {SITE.name}
      </span>

      {/* Soft vertical dissolve so the portrait melts into the next section
          instead of ending on a hard cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[26%] bg-gradient-to-b from-transparent to-bg"
      />

      {/* Floating credential card, upper-right over the portrait */}
      <aside className="pointer-events-none absolute right-[7%] top-[13vh] z-20 hidden w-[16.5rem] items-center gap-3.5 rounded-2xl border border-border bg-surface/70 p-3 shadow-md backdrop-blur-md lg:flex">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-text text-bg">
          <Sparkle />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="label text-[0.6rem]">Signature Care</span>
          <span className="font-display text-[1.35rem] leading-tight text-text">
            Crafted to glow.
          </span>
        </span>
      </aside>

      {/* "As featured in" — right side, below the card (reference placement) */}
      <div className="pointer-events-none absolute right-[7%] top-[31vh] z-20 hidden w-[15rem] flex-col items-end gap-3 text-right [text-shadow:0_1px_14px_var(--bg),0_0_5px_var(--bg)] lg:flex">
        <span className="label text-[0.6rem] text-text-muted">As featured in</span>
        <div className="flex flex-wrap justify-end gap-x-5 gap-y-2 font-display text-[1.05rem] text-text">
          {FEATURED_IN.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>

      <Container className="pointer-events-none relative z-10 lg:pt-[16vh]">
        <div className="hero-rise pointer-events-auto flex max-w-xl flex-col items-start gap-7">
          <p className="label">{SITE.tagline}</p>

          <h1 className="font-display text-text">
            Beauty,
            <br />
            unhurried.
          </h1>

          <div className="flex items-center gap-3 text-text-muted">
            <Stars />
            <span className="text-caption tracking-wide">600+ five-star guests</span>
          </div>

          <p className="max-w-md text-text-muted">{SITE.intro}</p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="primary" href="#contacts">
              Book Appointment
              <Arrow />
            </Button>
            <Button variant="secondary" href="#services">
              View Services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} width="14" height="14" viewBox="0 0 24 24" className="fill-accent">
          <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.5l-5.91 3.11 1.13-6.57L2.45 9.44l6.6-.96L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

function Sparkle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current" aria-hidden>
      <path d="M12 2c.5 4.6 2.4 6.5 7 7-4.6.5-6.5 2.4-7 7-.5-4.6-2.4-6.5-7-7 4.6-.5 6.5-2.4 7-7z" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
