import { Section } from '../../components/layout/Section';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Reveal } from '../../components/motion/Reveal';
import { RevealGroup, RevealItem } from '../../components/motion/RevealGroup';
import { Card } from '../../components/ui/Card';
import { SERVICES } from '../../constants/services';

/** The studio's menu of care — one card per service, wired from constants. */
export function Services() {
  return (
    <Section id="services" label="Services">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="A considered menu of care"
            intro="Every treatment is shaped to you — your features, your colouring, the way you want to feel walking out the door."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <Card interactive className="flex h-full flex-col gap-4">
                <h3>{service.title}</h3>
                <p className="text-text-muted">{service.description}</p>
                <span className="label mt-auto pt-2 text-accent-strong">
                  From {service.priceFrom}
                </span>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
