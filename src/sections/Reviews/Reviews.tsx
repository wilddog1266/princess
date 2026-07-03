import { Section } from '../../components/layout/Section';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Reveal } from '../../components/motion/Reveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { REVIEWS } from '../../constants/reviews';
import type { Review } from '../../types/content';
import { cn } from '../../lib/utils';

function Quote({ review, className }: { review: Review; className?: string }) {
  return (
    <figure
      className={cn(
        'flex flex-col gap-5 rounded-md border border-border bg-surface p-7 shadow-[var(--shadow-md)]',
        className,
      )}
    >
      <blockquote className="font-display text-[1.2rem] leading-snug text-text">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-auto flex flex-col gap-0.5">
        <span className="text-text">{review.author}</span>
        <span className="label text-[0.6rem]">{review.service}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Testimonials. By default they drift sideways in a seamless marquee (the row is
 * doubled and translated −50%); under reduced motion they settle into a calm,
 * legible grid instead.
 */
export function Reviews() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Section id="reviews" label="Reviews">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Reviews"
            title="In their words"
            intro="The studio grows almost entirely by word of mouth. Here is some of what our guests have shared."
          />
        </Reveal>
      </Container>

      {prefersReducedMotion ? (
        <Container>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {REVIEWS.map((review) => (
              <Quote key={review.id} review={review} className="h-full" />
            ))}
          </div>
        </Container>
      ) : (
        <div className="reviews-marquee mt-14">
          <div className="reviews-track flex w-max gap-6">
            {[...REVIEWS, ...REVIEWS].map((review, index) => (
              <Quote
                key={`${review.id}-${index}`}
                review={review}
                className="w-[20rem] shrink-0 sm:w-[24rem]"
              />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
