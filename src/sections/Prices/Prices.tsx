import { Section } from '../../components/layout/Section';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Reveal } from '../../components/motion/Reveal';
import { RevealGroup, RevealItem } from '../../components/motion/RevealGroup';
import { Badge } from '../../components/ui/Badge';
import { PRICES } from '../../constants/prices';
import { cn } from '../../lib/utils';

/** Editorial price list — one row per treatment, signature tier highlighted. */
export function Prices() {
  return (
    <Section id="prices" label="Prices">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Prices"
            title="Clear, honest pricing"
            intro="No surprises. Each price covers the full appointment — preparation, the work itself, and the finishing touches."
          />
        </Reveal>

        <RevealGroup className="mt-14 flex max-w-3xl flex-col border-b border-border">
          {PRICES.map((item) => (
            <RevealItem key={item.id}>
              <div
                className={cn(
                  'flex items-baseline justify-between gap-6 border-t border-border py-6',
                  item.signature && 'border-t-accent/40',
                )}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3>{item.name}</h3>
                    {item.signature && <Badge variant="accent">Signature</Badge>}
                  </div>
                  <p className="text-text-muted">{item.description}</p>
                </div>
                <span className="shrink-0 font-display text-[1.5rem] leading-none text-text">
                  {item.price}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
