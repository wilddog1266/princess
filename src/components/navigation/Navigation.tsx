import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { NAV_LINKS } from '../../constants/navigation';
import { SITE, SOCIAL_LINKS } from '../../constants/site';
import { useLenis } from '../../hooks/useLenis';
import { easing } from '../../motion/easings';
import { duration, stagger } from '../../motion/transitions';

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.base, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.base, ease: easing.entrance } },
};

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Slide-out navigation. A fixed trigger (top-left, mirroring the theme toggle)
 * reveals a left panel with the primary anchors over a dimmed backdrop.
 * Opening locks the page — Lenis is paused and native scroll is frozen — so the
 * panel owns the viewport until dismissed by a link, the backdrop, or Escape.
 * While open, Tab is trapped inside the panel and closing returns focus to the
 * trigger that opened it.
 */
export function Navigation() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setOpen(true);
    lenis?.stop();
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setOpen(false);
    lenis?.start();
    document.body.style.overflow = '';
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open ? closeMenu : openMenu}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="site-nav"
        className="fixed top-6 left-6 z-[60] grid size-11 place-items-center rounded-full border border-border-strong bg-bg-elev/70 text-text backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-hover)] hover:border-accent hover:shadow-[0_0_24px_-4px_var(--accent-glow)]"
      >
        <span className="relative block h-3 w-5" aria-hidden>
          <m.span
            className="absolute inset-x-0 top-0 h-px bg-current"
            animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: duration.base, ease: easing.panel }}
          />
          <m.span
            className="absolute inset-x-0 bottom-0 h-px bg-current"
            animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: duration.base, ease: easing.panel }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              aria-hidden
              onClick={closeMenu}
              className="fixed inset-0 z-[45] bg-bg/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.base, ease: easing.panel }}
            />

            <m.aside
              ref={panelRef}
              id="site-nav"
              aria-label="Primary"
              className="fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(86vw,22rem)] flex-col justify-between border-r border-border bg-bg-elev/95 px-9 pt-28 pb-10 backdrop-blur-xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: duration.panel, ease: easing.panel }}
            >
              <m.ul
                className="flex flex-col gap-1"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {NAV_LINKS.map((link) => (
                  <m.li key={link.href} variants={itemVariants}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block py-1.5 font-display text-[1.9rem] leading-tight text-text transition-colors duration-300 ease-[var(--ease-hover)] hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </m.li>
                ))}
              </m.ul>

              <m.div
                className="flex flex-col gap-5"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}
                    className="text-text-muted transition-colors duration-300 ease-[var(--ease-hover)] hover:text-accent"
                  >
                    {SITE.phone}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-text-muted transition-colors duration-300 ease-[var(--ease-hover)] hover:text-accent"
                  >
                    {SITE.email}
                  </a>
                </div>
                <div className="flex gap-5">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="label text-[0.6rem] transition-colors duration-300 ease-[var(--ease-hover)] hover:text-accent"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </m.div>
            </m.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
