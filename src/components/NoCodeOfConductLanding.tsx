import PrimerBrand from "@primer/react-brand";
import {
  ChecklistIcon,
  CodeReviewIcon,
  GitPullRequestIcon,
  ShieldCheckIcon,
} from "@primer/octicons-react";

import { siteConfig } from "../config/site";

const { Grid, Hero, Label, Section, SectionIntro, Stack, Text, ThemeProvider } =
  PrimerBrand as typeof import("@primer/react-brand");

const articles = [
  {
    icon: <ShieldCheckIcon size={24} aria-hidden="true" />,
    title: "Assume competence",
    description:
      "Start from peerhood, not suspicion. Adults deserve context, candor, and room to correct course.",
  },
  {
    icon: <CodeReviewIcon size={24} aria-hidden="true" />,
    title: "Speak plainly",
    description:
      "Name technical and interpersonal problems directly. Vague politeness is often just deferred conflict.",
  },
  {
    icon: <GitPullRequestIcon size={24} aria-hidden="true" />,
    title: "Repair quickly",
    description:
      "When someone crosses a line, respond proportionally, make repair visible, and turn folklore into agreement.",
  },
  {
    icon: <ChecklistIcon size={24} aria-hidden="true" />,
    title: "Share stewardship",
    description:
      "Everyone protects the codebase, the working relationship, and the conditions that let serious work continue.",
  },
];

const refusals = [
  "symbolic compliance in place of judgment",
  "ideological slogans during technical disagreement",
  "managerial theater pretending to be care",
  "rules nobody can interpret without an authority figure",
] as const;

const protections = [
  "direct feedback without humiliation",
  "proportionate consequences when trust is broken",
  "visible repair instead of silent resentment",
  "a culture contributors can genuinely co-own",
] as const;

const workingAgreement = [
  "Say what the problem is.",
  "Assume the other person can hear it.",
  "Repair damage when it happens.",
  "Protect the work and the relationship together.",
] as const;

function GovernanceSheet() {
  return (
    <aside
      className="governance-sheet"
      aria-label="Working agreement for adult self-governance"
    >
      <div className="governance-sheet__header">
        <Text
          as="span"
          size="100"
          font="monospace"
          className="governance-sheet__kicker"
        >
          Working Agreement
        </Text>
        <Text
          as="span"
          size="100"
          font="monospace"
          className="governance-sheet__meta"
        >
          SELF-GOVERNED
        </Text>
      </div>
      <Text as="p" size="300" className="governance-sheet__intro">
        A real code of conduct assumes judgment. It names obligations without
        outsourcing adulthood.
      </Text>
      <div className="governance-sheet__body">
        {workingAgreement.map((line, index) => (
          <div key={line} className="governance-sheet__row">
            <Text
              as="span"
              size="100"
              font="monospace"
              className="governance-sheet__index"
            >
              {String(index + 1).padStart(2, "0")}
            </Text>
            <Text as="p" size="200" className="governance-sheet__line">
              {line}
            </Text>
          </div>
        ))}
      </div>
      <div className="governance-sheet__footer">
        <span className="governance-sheet__signature-line" aria-hidden="true" />
        <Text
          as="span"
          size="100"
          font="monospace"
          className="governance-sheet__signature"
        >
          maintained by adults, not ceremony
        </Text>
      </div>
    </aside>
  );
}

export default function NoCodeOfConductLanding() {
  return (
    <ThemeProvider colorMode="light">
      <main className="landing">
        <div className="landing__halo landing__halo--blue" aria-hidden="true" />
        <div
          className="landing__halo landing__halo--green"
          aria-hidden="true"
        />

        <Section
          className="landing__hero-wrap"
          paddingBlockStart={{ narrow: "normal", regular: "spacious" }}
          paddingBlockEnd={{ narrow: "normal", regular: "spacious" }}
        >
          <Hero
            align="start"
            variant="gridline-expressive"
            className="landing__hero"
            trailingComponent={GovernanceSheet}
          >
            <Hero.Eyebrow className="landing__eyebrow">
              <Label color="blue" size="large" leadingVisual={ChecklistIcon}>
                No Code of Conduct
              </Label>
            </Hero.Eyebrow>

            <Hero.Heading className="landing__heading" size="display">
              A code of conduct adults can own.
            </Hero.Heading>

            <Hero.Description className="landing__description" size="500">
              No slogans, no loyalty theater, no paternalistic scripts. Healthy
              technical communities can state expectations plainly, enforce them
              proportionally, and repair harm in the open.
            </Hero.Description>

            <Text as="p" size="300" className="landing__lede">
              The point is not the absence of norms. It is the presence of norms
              serious enough to be interpreted, upheld, and revised by the
              people doing the work.
            </Text>

            <Stack
              className="landing__signals"
              direction={{ narrow: "vertical", regular: "horizontal" }}
              gap="condensed"
              flexWrap="wrap"
            >
              <Text as="span" size="200" className="landing__signal">
                direct speech
              </Text>
              <Text as="span" size="200" className="landing__signal">
                reciprocal respect
              </Text>
              <Text as="span" size="200" className="landing__signal">
                repair over ritual
              </Text>
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
              Adult Code
            </SectionIntro.Label>
            <SectionIntro.Heading as="h2" size="2">
              Four articles for a self-governed team.
            </SectionIntro.Heading>
            <SectionIntro.Description>
              A serious code can fit on one page because it assumes judgment,
              context, and reciprocal obligation instead of ritual performance.
            </SectionIntro.Description>
          </SectionIntro>

          <div className="landing__articles">
            {articles.map((article, index) => (
              <article key={article.title} className="article-card">
                <div className="article-card__header">
                  <span className="article-card__icon" aria-hidden="true">
                    {article.icon}
                  </span>
                  <Text
                    as="span"
                    size="100"
                    font="monospace"
                    className="article-card__eyebrow"
                  >
                    Article {index + 1}
                  </Text>
                </div>
                <h3 className="article-card__title">{article.title}</h3>
                <Text as="p" size="200" className="article-card__description">
                  {article.description}
                </Text>
              </article>
            ))}
          </div>
        </Section>

        <Section
          as="section"
          className="landing__stances"
          paddingBlockStart={{ narrow: "normal", regular: "spacious" }}
          paddingBlockEnd={{ narrow: "normal", regular: "spacious" }}
        >
          <SectionIntro className="landing__section-intro" align="start">
            <SectionIntro.Label color="green" size="large">
              No Ritual
            </SectionIntro.Label>
            <SectionIntro.Heading as="h2" size="2">
              What this refuses and what it protects.
            </SectionIntro.Heading>
            <SectionIntro.Description>
              “No Code of Conduct” is not a shrug. It is a refusal to replace
              adult responsibility with ceremony, while keeping the obligations
              that make collaboration livable.
            </SectionIntro.Description>
          </SectionIntro>

          <Grid className="landing__stance-grid">
            <Grid.Column span={{ small: 12, medium: 6 }}>
              <article className="stance-card">
                <Text
                  as="span"
                  size="100"
                  font="monospace"
                  className="stance-card__eyebrow"
                >
                  Refuses
                </Text>
                <h3 className="stance-card__title">No symbolic adulthood.</h3>
                <ul className="stance-card__list">
                  {refusals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Grid.Column>

            <Grid.Column span={{ small: 12, medium: 6 }}>
              <article className="stance-card stance-card--affirmative">
                <Text
                  as="span"
                  size="100"
                  font="monospace"
                  className="stance-card__eyebrow"
                >
                  Protects
                </Text>
                <h3 className="stance-card__title">
                  A culture people can co-own.
                </h3>
                <ul className="stance-card__list">
                  {protections.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Grid.Column>
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
