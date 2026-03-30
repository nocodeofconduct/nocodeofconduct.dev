import {
  ArrowRightIcon,
  CheckCircleFillIcon,
  ChevronDownIcon,
  MegaphoneIcon,
  PeopleIcon,
  ShieldCheckIcon,
} from "@primer/octicons-react";
import { BaseStyles, Label, LinkButton, ThemeProvider } from "@primer/react";

import { siteConfig } from "../config/site";

const navLinks = [
  { href: "#principles", label: "Principles" },
  { href: "#adopt", label: "Adopt" },
  { href: "#faq", label: "FAQ" },
] as const;

const heroSignals = [
  {
    detail:
      "Name the issue, the scope, and the repair without wrapping it in ceremony.",
    title: "Speak plainly",
  },
  {
    detail:
      "Judge patches, arguments, and decisions by the quality of the work itself.",
    title: "Keep merit visible",
  },
  {
    detail:
      "If a line is crossed, respond proportionally or use the host platform's own rules.",
    title: "Escalate only when needed",
  },
] as const;

const principles = [
  {
    number: "01",
    text: "We are all adults, fully able to conduct frank, mature, and respectful discussions.",
    title: "Treat contributors like adults",
  },
  {
    number: "02",
    text: "We welcome every contribution on its merits. We do not care about political views, background, gender, or any other personal characteristic. We neither raise nor consider such matters; our sole focus is the quality of the work.",
    title: "Judge contributions on merit",
  },
  {
    number: "03",
    text: "Nothing else matters.",
    title: "Keep the standard brutally short",
  },
] as const;

const practicePoints = [
  {
    detail:
      "Copy CODE_OF_CONDUCT.md into the repository root and keep it short enough to read before a pull request is opened.",
    title: "Start with the repo, not the ritual",
  },
  {
    detail:
      "Use direct conversation first. Most friction gets smaller when expectations are specific, timely, and visible.",
    title: "Prefer repair over performance",
  },
  {
    detail:
      "If conduct violates GitHub or another host platform, report it there instead of inventing a parallel bureaucracy.",
    title: "Let the platform handle platform-level abuse",
  },
] as const;

const faqs = [
  {
    answer:
      "Not at all. The absence of a formal code of conduct does not imply a lack of respect. It simply means we choose to direct our energy toward creation and constructive exchange rather than constant oversight of personal interactions. We trust in the maturity of every participant.",
    question: "Does this approach make me feel excluded?",
  },
  {
    answer:
      "In the same way one participates in any adult discussion space on the internet: by contributing thoughtfully, addressing misunderstandings directly and privately, and focusing on the work itself. The internet is vast and diverse; we invite you to engage with confidence in what you bring to the project.",
    question: "How can I feel safe in a community without a code of conduct?",
  },
  {
    answer:
      "We encourage direct, private communication to resolve issues. If the behavior violates the hosting platform's terms of service (such as GitHub's), report it directly to the platform. We do not serve as mediators or arbitrators; each individual is responsible for their own conduct.",
    question: "What if someone behaves inappropriately?",
  },
  {
    answer:
      "Certainly. Physical or workplace settings often require tailored guidelines. No Code of Conduct is intended primarily for online communities and open-source projects, where the emphasis remains on the quality of contributions.",
    question:
      "Is this philosophy compatible with in-person events or professional environments?",
  },
  {
    answer:
      "By setting a clear example. We believe a sufficient number of level-headed adults naturally creates a healthy, stimulating environment. We value open discussion, constructive feedback, and the genuine goodwill that arises from mutual respect.",
    question: "How does this approach welcome newcomers?",
  },
  {
    answer:
      "We discourage off-topic conversation without resorting to censorship. Should a thread stray from the project's purpose, we calmly refocus on the shared objective.",
    question:
      "What happens if discussion drifts off-topic or becomes unproductive?",
  },
  {
    answer:
      "We are not a support group for personal feelings; we are a community organized around a specific purpose. By concentrating on contributions and ideas, we create a space where everyone can express themselves freely and advance together.",
    question: "Why not address individual emotions?",
  },
] as const;

export default function NoCodeOfConductLanding() {
  return (
    <ThemeProvider colorMode="light">
      <BaseStyles>
        <div className="ncoc-shell">
          <header className="ncoc-header">
            <div className="ncoc-frame ncoc-header__inner">
              <a className="ncoc-brand" href="#top">
                <ShieldCheckIcon aria-hidden="true" size={18} />
                <span>No Code of Conduct</span>
              </a>

              <nav aria-label="Primary" className="ncoc-nav">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    className="ncoc-nav__link"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <main>
            <section className="ncoc-hero" id="top">
              <div className="ncoc-frame ncoc-hero__inner">
                <div className="ncoc-hero__content">
                  <div className="ncoc-label-row">
                    <Label size="large" variant="accent">
                      <span className="ncoc-label__content">
                        <PeopleIcon aria-hidden="true" size={13} />
                        For adults
                      </span>
                    </Label>
                    <Label size="large" variant="success">
                      <span className="ncoc-label__content">
                        <CheckCircleFillIcon aria-hidden="true" size={13} />
                        Merit first
                      </span>
                    </Label>
                    <Label size="large">No supervision theater</Label>
                  </div>

                  <p className="ncoc-kicker">
                    A stripped-down standard for projects that prefer clarity to
                    performance.
                  </p>
                  <h1 className="ncoc-hero__title">No Code of Conduct</h1>
                  <p className="ncoc-hero__lede">
                    Judge contributions on their merits. Handle conflict like
                    adults. Keep the work moving without turning every
                    disagreement into a ceremony.
                  </p>

                  <div className="ncoc-hero__actions">
                    <LinkButton
                      href="#principles"
                      size="large"
                      trailingVisual={ArrowRightIcon}
                      variant="primary"
                    >
                      Read the three principles
                    </LinkButton>
                    <a className="ncoc-inline-link" href="#adopt">
                      Adopt it for your repo
                    </a>
                  </div>
                </div>

                <aside
                  aria-label="Operating premise"
                  className="ncoc-hero__aside"
                >
                  <p className="ncoc-panel-kicker">Operating premise</p>
                  <h2 className="ncoc-panel-title">
                    Keep the standard. Lose the performance.
                  </h2>
                  <p className="ncoc-panel-copy">
                    No Code of Conduct does not remove responsibility. It keeps
                    the bar visible: say what matters, protect the work, and
                    leave the rest to adult judgment.
                  </p>

                  <ol className="ncoc-signal-list">
                    {heroSignals.map((signal) => (
                      <li key={signal.title} className="ncoc-signal">
                        <span className="ncoc-signal__title">
                          {signal.title}
                        </span>
                        <p className="ncoc-signal__copy">{signal.detail}</p>
                      </li>
                    ))}
                  </ol>
                </aside>
              </div>
            </section>

            <section
              className="ncoc-section ncoc-section--paper"
              id="principles"
            >
              <div className="ncoc-frame ncoc-principles">
                <div className="ncoc-principles__intro">
                  <p className="ncoc-kicker ncoc-kicker--dark">
                    Three principles
                  </p>
                  <h2 className="ncoc-section-title">
                    Three lines. No bureaucracy.
                  </h2>
                  <p className="ncoc-section-lede">
                    The philosophy is intentionally small: short enough to
                    remember, direct enough to use under pressure, and clear
                    enough to keep power games out of the room.
                  </p>
                </div>

                <ol className="ncoc-principles__list">
                  {principles.map((principle) => (
                    <li
                      key={principle.number}
                      className="ncoc-principles__item"
                    >
                      <p className="ncoc-principles__number">
                        {principle.number}
                      </p>
                      <div>
                        <h3 className="ncoc-principles__heading">
                          {principle.title}
                        </h3>
                        <p className="ncoc-principles__copy">
                          {principle.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="ncoc-section ncoc-section--practice" id="adopt">
              <div className="ncoc-frame ncoc-practice">
                <div className="ncoc-practice__copy">
                  <p className="ncoc-kicker">Adopt it</p>
                  <h2 className="ncoc-section-title ncoc-section-title--light">
                    Standards are useful when they stay usable.
                  </h2>
                  <p className="ncoc-section-lede ncoc-section-lede--light">
                    Copy the file, keep the three commitments, and let the
                    repository stay focused on the work. When someone crosses a
                    real line, address the scope directly or use the host
                    platform&apos;s own reporting path.
                  </p>

                  <div className="ncoc-manifesto">
                    <p className="ncoc-manifesto__label">Starter text</p>
                    <p className="ncoc-manifesto__body">
                      We are all adults. We accept all contributions on their
                      merits. Nothing else matters.
                    </p>
                  </div>
                </div>

                <div className="ncoc-practice__rail">
                  <ul className="ncoc-practice__list">
                    {practicePoints.map((point, index) => (
                      <li key={point.title} className="ncoc-practice__item">
                        <p className="ncoc-practice__index">{`0${index + 1}`}</p>
                        <div>
                          <h3 className="ncoc-practice__heading">
                            {point.title}
                          </h3>
                          <p className="ncoc-practice__detail">
                            {point.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="ncoc-practice__actions">
                    <LinkButton
                      href="https://github.com/domgetter/NCoC/blob/master/CODE_OF_CONDUCT.md"
                      rel="noopener noreferrer"
                      size="large"
                      target="_blank"
                      trailingVisual={ArrowRightIcon}
                      variant="primary"
                    >
                      Get CODE_OF_CONDUCT.md
                    </LinkButton>

                    <div className="ncoc-promote">
                      <Label size="large" variant="accent">
                        <span className="ncoc-label__content">
                          <MegaphoneIcon aria-hidden="true" size={13} />
                          #NCoC
                        </span>
                      </Label>
                      <p>
                        Share it where it belongs, not as a mood board but as a
                        clean working standard for serious collaborators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="ncoc-section ncoc-section--faq" id="faq">
              <div className="ncoc-frame ncoc-faq">
                <div className="ncoc-faq__intro">
                  <p className="ncoc-kicker ncoc-kicker--dark">FAQ</p>
                  <h2 className="ncoc-section-title">
                    Frequently Asked Questions
                  </h2>
                  <p className="ncoc-section-lede">
                    Honest answers to the concerns people usually raise when a
                    community chooses directness over bureaucracy.
                  </p>
                </div>

                <div className="ncoc-faq-list">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="ncoc-faq-item">
                      <summary>
                        <span>{faq.question}</span>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="ncoc-faq__chevron"
                          size={16}
                        />
                      </summary>
                      <p className="ncoc-faq-answer">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            <section className="ncoc-section ncoc-section--closing">
              <div className="ncoc-frame">
                <div className="ncoc-closing">
                  <div className="ncoc-closing__copy">
                    <p className="ncoc-kicker">Final note</p>
                    <h2 className="ncoc-section-title ncoc-section-title--light">
                      Copy the file. Keep the standard. Lose the ceremony.
                    </h2>
                    <p className="ncoc-section-lede ncoc-section-lede--light">
                      No Code of Conduct is not less responsibility. It is fewer
                      euphemisms, fewer rituals, and a much sharper focus on the
                      work people are actually here to do.
                    </p>
                  </div>

                  <div className="ncoc-closing__meta">
                    <Label size="large" variant="success">
                      <span className="ncoc-label__content">
                        <CheckCircleFillIcon aria-hidden="true" size={13} />
                        Ready for repositories
                      </span>
                    </Label>
                    <p className="ncoc-closing__pledge">
                      This project adheres to No Code of Conduct. We are all
                      adults. We accept all contributions. Nothing else matters.
                    </p>
                    <a
                      className="ncoc-inline-link ncoc-inline-link--light"
                      href="#top"
                    >
                      Back to the manifesto
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="ncoc-footer">
            <div className="ncoc-frame ncoc-footer__inner">
              <span className="ncoc-footer__brand">No Code of Conduct</span>
              <span>{siteConfig.footerNote}</span>
            </div>
          </footer>
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
}
