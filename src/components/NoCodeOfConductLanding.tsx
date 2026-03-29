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

// ── Tokens ────────────────────────────────────────────────────────────────────

const fg = "var(--fgColor-default, #1f2328)";
const fgMuted = "var(--fgColor-muted, #59636e)";
const bgDefault = "var(--bgColor-default, #ffffff)";
const bgMuted = "var(--bgColor-muted, #f6f8fa)";
const border = "1px solid var(--borderColor-default, #d1d9e0)";

// ── Component ─────────────────────────────────────────────────────────────────

export default function NoCodeOfConductLanding() {
  return (
    <ThemeProvider colorMode="light">
      <BaseStyles>
        <div style={{ background: bgDefault }}>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <Header role="banner" style={{ position: "sticky", top: 0, zIndex: 100 }}>
            <Header.Item>
              <Header.Link href="#top" style={{ fontWeight: 700, fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheckIcon size={18} />
                No Code of Conduct
              </Header.Link>
            </Header.Item>
            <Header.Item full />
            <Header.Item><Header.Link href="#principles">Principles</Header.Link></Header.Item>
            <Header.Item><Header.Link href="#adopt">Adopt</Header.Link></Header.Item>
            <Header.Item style={{ marginRight: 0 }}><Header.Link href="#faq">FAQ</Header.Link></Header.Item>
          </Header>

          <main>

            {/* ── Hero ────────────────────────────────────────────────── */}
            <section id="top" style={{ padding: "88px 0 80px", borderBottom: border }}>
              <div className="container-xl px-3 px-md-4 px-lg-5">

                {/* Eyebrow badges */}
                <Stack direction="horizontal" gap="condensed" wrap="wrap" style={{ marginBottom: "1.75rem" }}>
                  <Label variant="accent" size="large">
                    <PeopleIcon size={13} verticalAlign="middle" />
                    &ensp;For adults
                  </Label>
                  <Label variant="success" size="large">
                    <CheckCircleFillIcon size={13} verticalAlign="middle" />
                    &ensp;Merit-based
                  </Label>
                  <Label size="large">No drama</Label>
                </Stack>

                {/* Main headline */}
                <h1 style={{
                  fontSize: "clamp(3.25rem, 7vw, 5.25rem)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: fg,
                  margin: "0 0 1.25rem",
                  maxWidth: "14ch",
                }}>
                  No Code of Conduct
                </h1>

                <p style={{
                  fontSize: "1.3rem",
                  color: fgMuted,
                  maxWidth: "50ch",
                  lineHeight: 1.55,
                  margin: "0 0 2.5rem",
                }}>
                  Liberate your communities and projects from endless debates.
                  Focus on what truly matters.
                </p>

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

              </div>
            </section>

            {/* ── Intro ───────────────────────────────────────────────── */}
            <section style={{ background: bgMuted, padding: "64px 0", borderBottom: border }}>
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <h2 className="ncoc-title" style={{ maxWidth: "24ch", marginBottom: "2rem" }}>
                  What if we simply agreed—once and for all—to move forward?
                </h2>
                <p className="ncoc-intro-text">
                  No Code of Conduct is a fresh, practical approach designed to
                  help open-source projects and online communities stay centered
                  on meaningful contributions, constructive dialogue, and shared
                  progress. It rests on a straightforward premise: we are all
                  capable adults who can engage with one another respectfully
                  and productively without formal rules dictating every
                  interaction.
                </p>
              </div>
            </section>

            {/* ── Principles ──────────────────────────────────────────── */}
            <section id="principles" style={{ padding: "72px 0", borderBottom: border }}>
              <div className="container-xl px-3 px-md-4 px-lg-5">

                <h2 className="ncoc-title">We commit to three clear principles</h2>
                <p style={{ color: fgMuted, fontSize: "1rem", margin: "0 0 2.5rem" }}>
                  Simple, powerful, and effective.
                </p>

                <div className="ncoc-grid" style={{ maxWidth: "900px" }}>
                  {principles.map((p) => (
                    <div key={p.number} className="ncoc-card">
                      <div className="ncoc-num">{p.number}</div>
                      <p style={{ margin: 0, color: fg, lineHeight: 1.65, fontSize: "0.9375rem" }}>
                        {p.text}
                      </p>
                    </div>
                  ))}
                </div>

                <p style={{ color: fgMuted, fontSize: "0.875rem", marginTop: "2rem", marginBottom: 0 }}>
                  That is the entire philosophy—simple, powerful, and effective.
                </p>

              </div>
            </section>

            {/* ── Adopt + Promote ─────────────────────────────────────── */}
            <section id="adopt" style={{ background: bgMuted, padding: "72px 0", borderBottom: border }}>
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <div className="ncoc-twoup">

                  {/* Adopt */}
                  <div>
                    <h2 className="ncoc-title">How to Adopt</h2>
                    <p style={{ color: fgMuted, lineHeight: 1.7, fontSize: "0.9375rem", margin: "0 0 1.75rem" }}>
                      It could not be simpler. Copy the file{" "}
                      <code style={{ background: "var(--bgColor-neutral-muted, rgba(129,139,152,0.12))", padding: "0.1em 0.4em", borderRadius: "4px", fontSize: "0.9em" }}>CODE_OF_CONDUCT.md</code>{" "}
                      into the root directory of your repository. Feel free to
                      adapt the wording to suit your needs while preserving
                      these three core principles.
                    </p>
                    <LinkButton
                      href="https://github.com/domgetter/NCoC/blob/master/CODE_OF_CONDUCT.md"
                      variant="primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get CODE_OF_CONDUCT.md
                    </LinkButton>
                  </div>

                  {/* Promote */}
                  <div>
                    <h2 className="ncoc-title">How to Promote</h2>
                    <p style={{ color: fgMuted, lineHeight: 1.7, fontSize: "0.9375rem", margin: "0 0 1.75rem" }}>
                      Discuss it openly, share it freely, and promote it
                      wherever you choose. Use the hashtag{" "}
                      <strong style={{ color: fg }}>#NCoC</strong> on social
                      platforms to help the movement grow.
                    </p>
                    <Stack direction="horizontal" gap="condensed" align="center">
                      <Label variant="accent" size="large">
                        <MegaphoneIcon size={13} verticalAlign="middle" />
                        &ensp;#NCoC
                      </Label>
                    </Stack>
                  </div>

                </div>
              </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────────────────── */}
            <section id="faq" style={{ padding: "72px 0", borderBottom: border }}>
              <div className="container-xl px-3 px-md-4 px-lg-5">

                <h2 className="ncoc-title">Frequently Asked Questions</h2>
                <p style={{ color: fgMuted, fontSize: "1rem", margin: "0 0 2.5rem" }}>
                  Honest answers to common concerns.
                </p>

                <div className="ncoc-faq-list">
                  {faqs.map((faq, i) => (
                    <details key={i} className="ncoc-faq-item">
                      <summary>
                        {faq.question}
                        <ChevronDownIcon size={16} className="faq-chevron" />
                      </summary>
                      <p className="ncoc-faq-answer">{faq.answer}</p>
                    </details>
                  ))}
                </div>

              </div>
            </section>

            {/* ── Pledge ──────────────────────────────────────────────── */}
            <section id="pledge" className="ncoc-pledge">
              <div className="container-xl px-3 px-md-4 px-lg-5">
                <div className="ncoc-pledge-inner">
                  <p className="ncoc-pledge-title">
                    This project adheres to No Code of Conduct.
                  </p>
                  <p className="ncoc-pledge-body">
                    We are all adults. We accept all contributions.
                    Nothing else matters.
                  </p>
                </div>
              </div>
            </section>

          </main>

          {/* ── Footer ──────────────────────────────────────────────────── */}
          <footer style={{ borderTop: border, padding: "20px 0" }}>
            <div className="container-xl px-3 px-md-4 px-lg-5" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}>
              <span style={{ fontWeight: 600, color: fg, fontSize: "0.875rem" }}>
                No Code of Conduct
              </span>
              <span style={{ color: fgMuted, fontSize: "0.75rem" }}>
                {siteConfig.footerNote}
              </span>
            </div>
          </footer>

        </div>
      </BaseStyles>
    </ThemeProvider>
  );
}
