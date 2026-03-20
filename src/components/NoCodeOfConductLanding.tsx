import PrimerBrand from "@primer/react-brand";
import {
  ChecklistIcon,
  CodeReviewIcon,
  GitPullRequestIcon,
  ShieldCheckIcon,
} from "@primer/octicons-react";

import { siteConfig } from "../config/site";

const { Grid, Hero, Label, Pillar, Section, SectionIntro, Stack, Text, ThemeProvider } =
  PrimerBrand as typeof import("@primer/react-brand");

const principles = [
  {
    color: "blue" as const,
    icon: <ShieldCheckIcon size={24} aria-hidden="true" />,
    title: "Correctness",
    description:
      "Does the change solve the stated problem without introducing a worse one?",
  },
  {
    color: "green" as const,
    icon: <CodeReviewIcon size={24} aria-hidden="true" />,
    title: "Clarity",
    description:
      "Can another maintainer read the diff, follow the reasoning, and verify the tradeoff?",
  },
  {
    color: "orange" as const,
    icon: <GitPullRequestIcon size={24} aria-hidden="true" />,
    title: "Maintainability",
    description:
      "Will this still look like a good idea after the novelty is gone and the pager goes off?",
  },
];

function MeritBoard() {
  return (
    <aside className="merit-board" aria-label="Technical merit review filter">
      <div className="merit-board__chrome">
        <div className="merit-board__lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Text as="span" size="100" font="monospace" className="merit-board__filename">
          filter.diff
        </Text>
      </div>
      <div className="merit-board__body">
        <div className="merit-board__line merit-board__line--plus">
          <span className="merit-board__marker">+</span>
          <span>correctness</span>
        </div>
        <div className="merit-board__line merit-board__line--plus">
          <span className="merit-board__marker">+</span>
          <span>clarity</span>
        </div>
        <div className="merit-board__line merit-board__line--plus">
          <span className="merit-board__marker">+</span>
          <span>maintainability</span>
        </div>
        <div className="merit-board__line merit-board__line--minus">
          <span className="merit-board__marker">-</span>
          <span>ritual</span>
        </div>
        <div className="merit-board__line merit-board__line--minus">
          <span className="merit-board__marker">-</span>
          <span>posture</span>
        </div>
        <div className="merit-board__line merit-board__line--minus">
          <span className="merit-board__marker">-</span>
          <span>ideology</span>
        </div>
      </div>
      <div className="merit-board__stamp">TECHNICAL MERIT</div>
    </aside>
  );
}

export default function NoCodeOfConductLanding() {
  return (
    <ThemeProvider colorMode="light">
      <main className="landing">
        <div className="landing__halo landing__halo--blue" aria-hidden="true" />
        <div className="landing__halo landing__halo--green" aria-hidden="true" />

        <Section
          className="landing__hero-wrap"
          paddingBlockStart={{ narrow: "normal", regular: "spacious" }}
          paddingBlockEnd={{ narrow: "normal", regular: "spacious" }}
        >
          <Hero
            align="start"
            variant="gridline-expressive"
            className="landing__hero"
            trailingComponent={MeritBoard}
          >
            <Hero.Eyebrow className="landing__eyebrow">
              <Label color="green-blue" size="large" leadingVisual={ChecklistIcon}>
                No Code of Conduct
              </Label>
            </Hero.Eyebrow>

            <Hero.Heading className="landing__heading" size="display">
              Contributions will be judged by their technical merit.
            </Hero.Heading>

            <Hero.Description className="landing__description" size="500">
              No loyalty tests. No symbolic bureaucracy. Just correctness, clarity, and
              maintainability.
            </Hero.Description>

            <Stack
              className="landing__signals"
              direction={{ narrow: "vertical", regular: "horizontal" }}
              gap="condensed"
              flexWrap="wrap"
            >
              <Label color="blue" size="large">
                Correctness
              </Label>
              <Label color="green" size="large">
                Clarity
              </Label>
              <Label color="orange" size="large">
                Maintainability
              </Label>
            </Stack>
          </Hero>
        </Section>

        <Section
          as="section"
          backgroundColor="subtle"
          rounded
          className="landing__principles"
          paddingBlockStart={{ narrow: "normal", regular: "spacious" }}
          paddingBlockEnd={{ narrow: "normal", regular: "spacious" }}
        >
          <SectionIntro className="landing__section-intro" align="start">
            <SectionIntro.Label color="blue" size="large">
              The Filter
            </SectionIntro.Label>
            <SectionIntro.Heading as="h2" size="2">
              Merit is explicit.
            </SectionIntro.Heading>
            <SectionIntro.Description>
              If a contribution is stronger on these three dimensions, it deserves a serious
              review. Everything else is noise.
            </SectionIntro.Description>
          </SectionIntro>

          <Grid className="landing__grid">
            {principles.map(principle => (
              <Grid.Column key={principle.title} span={{ small: 12, medium: 4 }}>
                <Pillar className="landing__pillar" hasBorder align="start">
                  <Pillar.Icon icon={principle.icon} color={principle.color} />
                  <Pillar.Heading as="h3" size="5">
                    {principle.title}
                  </Pillar.Heading>
                  <Pillar.Description>{principle.description}</Pillar.Description>
                </Pillar>
              </Grid.Column>
            ))}
          </Grid>
        </Section>

        <footer className="landing__footer">
          <Text as="p" size="100" variant="muted">
            No Code of Conduct
          </Text>
          <Text as="p" size="100" variant="muted">
            {siteConfig.footerNote}
          </Text>
        </footer>
      </main>
    </ThemeProvider>
  );
}
