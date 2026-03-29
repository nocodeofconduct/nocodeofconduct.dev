import React from "react";
import {
  BaseStyles,
  Details,
  Flash,
  Header,
  Heading,
  Label,
  LinkButton,
  Stack,
  Text,
  ThemeProvider,
} from "@primer/react";
import {
  ArrowRightIcon,
  CheckCircleFillIcon,
  ChevronDownIcon,
  HashIcon,
  MegaphoneIcon,
  PeopleIcon,
  ShieldCheckIcon,
} from "@primer/octicons-react";
import { siteConfig } from "../config/site";

// ── Content ──────────────────────────────────────────────────────────────────

const principles = [
  {
    number: 1,
    text: "We are all adults, fully able to conduct frank, mature, and respectful discussions.",
  },
  {
    number: 2,
    text: "We welcome every contribution on its merits. We do not care about political views, background, gender, or any other personal characteristic. We neither raise nor consider such matters; our sole focus is the quality of the work.",
  },
  {
    number: 3,
    text: "Nothing else matters.",
  },
] as const;

const faqs = [
  {
    question: "Does this approach make me feel excluded?",
    answer:
      "Not at all. The absence of a formal code of conduct does not imply a lack of respect. It simply means we choose to direct our energy toward creation and constructive exchange rather than constant oversight of personal interactions. We trust in the maturity of every participant.",
  },
  {
    question: "How can I feel safe in a community without a code of conduct?",
    answer:
      "In the same way one participates in any adult discussion space on the internet: by contributing thoughtfully, addressing misunderstandings directly and privately, and focusing on the work itself. The internet is vast and diverse; we invite you to engage with confidence in what you bring to the project.",
  },
  {
    question: "What if someone behaves inappropriately?",
    answer:
      "We encourage direct, private communication to resolve issues. If the behavior violates the hosting platform's terms of service (such as GitHub's), report it directly to the platform. We do not serve as mediators or arbitrators; each individual is responsible for their own conduct.",
  },
  {
    question:
      "Is this philosophy compatible with in-person events or professional environments?",
    answer:
      "Certainly. Physical or workplace settings often require tailored guidelines. No Code of Conduct is intended primarily for online communities and open-source projects, where the emphasis remains on the quality of contributions.",
  },
  {
    question: "How does this approach welcome newcomers?",
    answer:
      "By setting a clear example. We believe a sufficient number of level-headed adults naturally creates a healthy, stimulating environment. We value open discussion, constructive feedback, and the genuine goodwill that arises from mutual respect.",
  },
  {
    question:
      "What happens if discussion drifts off-topic or becomes unproductive?",
    answer:
      "We discourage off-topic conversation without resorting to censorship. Should a thread stray from the project's purpose, we calmly refocus on the shared objective.",
  },
  {
    question: "Why not address individual emotions?",
    answer:
      "We are not a support group for personal feelings; we are a community organized around a specific purpose. By concentrating on contributions and ideas, we create a space where everyone can express themselves freely and advance together.",
  },
] as const;

// ── Tokens ───────────────────────────────────────────────────────────────────

const borderDefault = "1px solid var(--borderColor-default, #d1d9e0)";
const fgDefault = "var(--fgColor-default, #1f2328)";
const fgMuted = "var(--fgColor-muted, #59636e)";
const bgMuted = "var(--bgColor-muted, #f6f8fa)";
const bgDefault = "var(--bgColor-default, #ffffff)";

// ── Component ─────────────────────────────────────────────────────────────────

export default function NoCodeOfConductLanding() {
  return (
    <ThemeProvider colorMode="light">
      <BaseStyles>
        <div style={{ minHeight: "100vh", background: bgDefault }}>
          {/* ── Sticky Header ───────────────────────────────────────────── */}
          <Header
            role="banner"
            style={{ position: "sticky", top: 0, zIndex: 100 }}
          >
            <Header.Item>
              <Header.Link
                href="#top"
                style={{ fontWeight: 700, fontSize: "1rem", gap: "0.5rem" }}
              >
                <ShieldCheckIcon size={20} />
                No Code of Conduct
              </Header.Link>
            </Header.Item>

            <Header.Item full />

            <Header.Item>
              <Header.Link href="#principles">Principles</Header.Link>
            </Header.Item>
            <Header.Item>
              <Header.Link href="#adopt">Adopt</Header.Link>
            </Header.Item>
            <Header.Item style={{ marginRight: 0 }}>
              <Header.Link href="#faq">FAQ</Header.Link>
            </Header.Item>
          </Header>

          <main>
            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section
              id="top"
              style={{
                background: bgMuted,
                borderBottom: borderDefault,
                padding: "72px 0 80px",
              }}
            >
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <Stack direction="vertical" gap="spacious">
                  {/* Badges */}
                  <Stack direction="horizontal" gap="condensed" wrap="wrap">
                    <Label variant="accent" size="large">
                      <PeopleIcon size={14} />
                      &ensp;open source
                    </Label>
                    <Label variant="success" size="large">
                      <CheckCircleFillIcon size={14} />
                      &ensp;meritocracy
                    </Label>
                    <Label size="large">no drama</Label>
                  </Stack>

                  {/* Title */}
                  <div>
                    <Heading
                      as="h1"
                      style={{
                        fontSize: "clamp(2.8rem, 6vw, 4.75rem)",
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: "-0.025em",
                        marginBottom: "1rem",
                        color: fgDefault,
                      }}
                    >
                      No Code of Conduct
                    </Heading>
                    <Text
                      as="p"
                      size="large"
                      style={{
                        color: fgMuted,
                        maxWidth: "52ch",
                        lineHeight: 1.6,
                        margin: 0,
                        fontSize: "1.2rem",
                      }}
                    >
                      Liberate your communities and projects from endless
                      debates. Focus on what truly matters.
                    </Text>
                  </div>

                  {/* CTA buttons */}
                  <Stack direction="horizontal" gap="normal" wrap="wrap">
                    <LinkButton
                      href="#principles"
                      variant="primary"
                      size="large"
                      trailingVisual={ArrowRightIcon}
                    >
                      Read the principles
                    </LinkButton>
                    <LinkButton href="#adopt" size="large">
                      How to adopt
                    </LinkButton>
                  </Stack>
                </Stack>
              </div>
            </section>

            {/* ── Intro ────────────────────────────────────────────────── */}
            <section
              style={{
                borderBottom: borderDefault,
                padding: "56px 0",
              }}
            >
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <Heading
                  as="h2"
                  variant="large"
                  style={{ marginBottom: "1.25rem", color: fgDefault }}
                >
                  What if we simply agreed—once and for all—to move forward?
                </Heading>
                <Text
                  as="p"
                  size="large"
                  style={{
                    color: fgMuted,
                    maxWidth: "72ch",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  No Code of Conduct is a fresh, practical approach designed to
                  help open-source projects and online communities stay centered
                  on meaningful contributions, constructive dialogue, and shared
                  progress. It rests on a straightforward premise: we are all
                  capable adults who can engage with one another respectfully
                  and productively without formal rules dictating every
                  interaction.
                </Text>
              </div>
            </section>

            {/* ── Principles ───────────────────────────────────────────── */}
            <section
              id="principles"
              style={{ borderBottom: borderDefault, padding: "56px 0" }}
            >
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <div className="Subhead" style={{ maxWidth: "72ch" }}>
                  <Heading as="h2" className="Subhead-heading">
                    We commit to three clear principles
                  </Heading>
                  <Text as="p" className="Subhead-description">
                    Simple, powerful, and effective.
                  </Text>
                </div>

                <div className="Box" style={{ maxWidth: "72ch" }}>
                  {principles.map((p) => (
                    <div
                      key={p.number}
                      className="Box-row"
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <Label
                        variant="accent"
                        size="large"
                        style={{
                          flexShrink: 0,
                          minWidth: "1.75rem",
                          textAlign: "center",
                          fontWeight: 700,
                          marginTop: "2px",
                        }}
                      >
                        {p.number}
                      </Label>
                      <Text
                        as="p"
                        size="large"
                        style={{
                          margin: 0,
                          lineHeight: 1.65,
                          color: fgDefault,
                        }}
                      >
                        {p.text}
                      </Text>
                    </div>
                  ))}
                  <div className="Box-footer">
                    <Text
                      style={{ color: fgMuted, fontSize: "0.875rem" }}
                    >
                      That is the entire philosophy—simple, powerful, and
                      effective.
                    </Text>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Adopt + Promote ──────────────────────────────────────── */}
            <section
              id="adopt"
              style={{ borderBottom: borderDefault, padding: "56px 0" }}
            >
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <Stack
                  direction={{ narrow: "vertical", regular: "horizontal" }}
                  gap="spacious"
                >
                  {/* How to adopt */}
                  <Stack
                    direction="vertical"
                    gap="normal"
                    style={{ flex: 1 }}
                  >
                    <div className="Subhead">
                      <Heading as="h2" className="Subhead-heading">
                        How to Adopt No Code of Conduct
                      </Heading>
                    </div>
                    <Text
                      as="p"
                      size="large"
                      style={{
                        color: fgMuted,
                        maxWidth: "48ch",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      It could not be simpler. Copy the file{" "}
                      <code>CODE_OF_CONDUCT.md</code> into the root directory
                      of your repository. Feel free to adapt the wording to
                      suit your needs while preserving these three core
                      principles.
                    </Text>
                    <div>
                      <LinkButton
                        href="https://github.com/domgetter/NCoC/blob/master/CODE_OF_CONDUCT.md"
                        variant="primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get CODE_OF_CONDUCT.md
                      </LinkButton>
                    </div>
                  </Stack>

                  {/* How to promote */}
                  <Stack
                    direction="vertical"
                    gap="normal"
                    style={{ flex: 1 }}
                  >
                    <div className="Subhead">
                      <Heading as="h2" className="Subhead-heading">
                        How to Promote This Approach
                      </Heading>
                    </div>
                    <Text
                      as="p"
                      size="large"
                      style={{
                        color: fgMuted,
                        maxWidth: "48ch",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      Discuss it openly, share it freely, and promote it
                      wherever you choose. Use the hashtag{" "}
                      <strong style={{ color: fgDefault }}>#NCoC</strong> on
                      social platforms to help the movement grow.
                    </Text>
                    <Stack
                      direction="horizontal"
                      gap="condensed"
                      align="center"
                    >
                      <HashIcon
                        size={20}
                        style={{
                          color: "var(--fgColor-accent, #0969da)",
                          verticalAlign: "middle",
                        }}
                      />
                      <Label variant="accent" size="large">
                        NCoC
                      </Label>
                      <MegaphoneIcon
                        size={20}
                        style={{ color: fgMuted, verticalAlign: "middle" }}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────────────── */}
            <section
              id="faq"
              style={{ borderBottom: borderDefault, padding: "56px 0" }}
            >
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <div className="Subhead">
                  <Heading as="h2" className="Subhead-heading">
                    Frequently Asked Questions
                  </Heading>
                  <Text as="p" className="Subhead-description">
                    Honest answers to common concerns.
                  </Text>
                </div>

                <div className="Box" style={{ maxWidth: "72ch" }}>
                  {faqs.map((faq, index) => (
                    <Details
                      key={index}
                      className="Box-row faq-item"
                      style={{ padding: 0 }}
                    >
                      <Details.Summary
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "1rem",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: fgDefault,
                          listStyle: "none",
                          userSelect: "none",
                        }}
                      >
                        {faq.question}
                        <ChevronDownIcon
                          size={16}
                          className="faq-chevron"
                          style={{ marginLeft: "auto", flexShrink: 0 }}
                        />
                      </Details.Summary>
                      <div
                        style={{
                          padding: "0 1rem 1.25rem",
                          color: fgMuted,
                          fontSize: "1rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.answer}
                      </div>
                    </Details>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Pledge ───────────────────────────────────────────────── */}
            <section id="pledge" style={{ padding: "56px 0 80px" }}>
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <Flash
                  variant="success"
                  style={{ maxWidth: "72ch", padding: "24px 28px" }}
                >
                  <Stack direction="vertical" gap="condensed">
                    <Text
                      as="p"
                      weight="semibold"
                      size="large"
                      style={{ margin: 0 }}
                    >
                      This project adheres to No Code of Conduct.
                    </Text>
                    <Text
                      as="p"
                      style={{ margin: 0, color: fgMuted }}
                    >
                      We are all adults. We accept all contributions. Nothing
                      else matters.
                    </Text>
                  </Stack>
                </Flash>
              </div>
            </section>
          </main>

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <footer
            style={{ borderTop: borderDefault, padding: "24px 0" }}
          >
            <div className="container-xl px-3 px-md-4 px-lg-5">
              <Stack
                direction="horizontal"
                gap="normal"
                align="center"
                justify="space-between"
                wrap="wrap"
              >
                <Text weight="semibold" style={{ color: fgDefault }}>
                  No Code of Conduct
                </Text>
                <Text
                  style={{ color: fgMuted, fontSize: "0.75rem" }}
                >
                  {siteConfig.footerNote}
                </Text>
              </Stack>
            </div>
          </footer>
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
}
