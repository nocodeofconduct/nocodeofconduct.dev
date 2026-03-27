/// <reference lib="dom" />

import { describe, expect, test } from "bun:test";
import { render, screen, within } from "@testing-library/react";

import { siteConfig } from "../config/site";
import NoCodeOfConductLanding from "./NoCodeOfConductLanding";

const articles: Array<[title: string, description: string]> = [
  [
    "Assume competence",
    "Start from peerhood, not suspicion. Adults deserve context, candor, and room to correct course.",
  ],
  [
    "Speak plainly",
    "Name technical and interpersonal problems directly. Vague politeness is often just deferred conflict.",
  ],
  [
    "Repair quickly",
    "When someone crosses a line, respond proportionally, make repair visible, and turn folklore into agreement.",
  ],
  [
    "Share stewardship",
    "Everyone protects the codebase, the working relationship, and the conditions that let serious work continue.",
  ],
];

describe("NoCodeOfConductLanding", () => {
  test("renders the adult self-governance framing and footer copy", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A code of conduct adults can own.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByLabelText("Working agreement for adult self-governance"),
    ).toBeTruthy();
    expect(screen.getByText(siteConfig.footerNote)).toBeTruthy();
  });

  test.each(articles)("renders the %s article", (title, description) => {
    render(<NoCodeOfConductLanding />);

    expect(screen.getByRole("heading", { level: 3, name: title })).toBeTruthy();
    expect(screen.getByText(description)).toBeTruthy();
  });

  test("captures a stable semantic snapshot of the manifesto content", () => {
    render(<NoCodeOfConductLanding />);

    const governanceSheet = screen.getByLabelText(
      "Working agreement for adult self-governance",
    );

    expect({
      articleHeadings: screen
        .getAllByRole("heading", { level: 3 })
        .map((element) => element.textContent),
      footer: screen.getByText(siteConfig.footerNote).textContent,
      governanceTerms: within(governanceSheet)
        .getAllByText(
          /say what the problem is|assume the other person can hear it|repair damage when it happens|protect the work and the relationship together/i,
        )
        .map((element) => element.textContent),
      heading: screen.getByRole("heading", {
        level: 1,
        name: "A code of conduct adults can own.",
      }).textContent,
    }).toMatchSnapshot();
  });
});
