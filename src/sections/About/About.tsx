import { Section } from '../../components/layout/Section';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Reveal } from '../../components/motion/Reveal';
import { RevealGroup, RevealItem } from '../../components/motion/RevealGroup';
import { ABOUT, ABOUT_STATS } from '../../constants/about';

/** Founder statement and the studio's quiet numbers. */
export function About() {
  return (
    <Section id="about" label="About">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="About"
            title="A small studio, by design"
            intro="Fewer guests, deeper attention. Princess was built around the idea that beauty should feel like being cared for."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <p className="max-w-none font-display text-[1.6rem] leading-snug text-text">
              {ABOUT.statement}
            </p>
          </Reveal>

          <RevealGroup className="flex flex-col gap-8 lg:border-l lg:border-border lg:pl-12">
            {ABOUT_STATS.map((stat) => (
              <RevealItem key={stat.label} className="flex flex-col gap-1">
                <span className="font-display text-[3rem] leading-none text-accent-strong">
                  {stat.value}
                </span>
                <span className="label">{stat.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
