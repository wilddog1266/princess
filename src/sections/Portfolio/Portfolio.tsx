import { useState } from 'react';
import { Section } from '../../components/layout/Section';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Reveal } from '../../components/motion/Reveal';
import { RevealGroup, RevealItem } from '../../components/motion/RevealGroup';
import { Chip } from '../../components/ui/Chip';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
} from '../../constants/portfolio';

// Warm placeholder washes per category until real imagery is wired into `image`.
const TILE_GRADIENT: Record<string, string> = {
  Hair: 'linear-gradient(150deg, #c2705a, #7c3f33)',
  Nails: 'linear-gradient(150deg, #d8a48f, #9a5e4d)',
  Brows: 'linear-gradient(150deg, #a86f57, #5c372c)',
  Makeup: 'linear-gradient(150deg, #e08e74, #a14d3e)',
};

/** Filterable gallery. Tiles use placeholder washes until photography lands. */
export function Portfolio() {
  const [active, setActive] = useState<PortfolioCategory>('All');
  const items =
    active === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === active);

  return (
    <Section id="portfolio" label="Portfolio">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Portfolio"
            title="Recent work"
            intro="A small selection of looks — hair, brows, nails and makeup, photographed in the studio's own light."
          />
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-3">
          {PORTFOLIO_CATEGORIES.map((category) => (
            <Chip
              key={category}
              active={category === active}
              onClick={() => setActive(category)}
            >
              {category}
            </Chip>
          ))}
        </Reveal>

        <RevealGroup
          key={active}
          stagger={0.05}
          className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4"
        >
          {items.map((item) => (
            <RevealItem key={item.id}>
              <div
                className="group relative aspect-[4/5] overflow-hidden rounded-md border border-border"
                style={{ backgroundImage: TILE_GRADIENT[item.category] }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                  <span className="font-display text-[1.25rem] leading-tight text-white">
                    {item.title}
                  </span>
                  <span className="label text-[0.6rem] text-white/70">{item.category}</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
