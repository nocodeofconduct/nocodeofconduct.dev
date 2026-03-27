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
    "Name technical and interpersonal problems directly. Vague politeness is usually deferred conflict wearing makeup.",
  ],
  [
    "Repair quickly",
    "When someone crosses a line, respond quickly, proportionally, and in a way that keeps repair available.",
  ],
  [
    "Share stewardship",
    "Everyone helps protect the codebase, the working relationship, and the conditions that keep serious work possible.",
  ],
];

describe("NoCodeOfConductLanding", () => {
  test("renders the adult self-governance framing and footer copy", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Keep the code of conduct. Lose the infantilizing theater.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("region", {
        name: "Working agreement for adult self-governance",
      }),
    ).toBeTruthy();
    expect(screen.getByText(siteConfig.footerNote)).toBeTruthy();
  });

  test.each(articles)("renders the %s article", (title, description) => {
    render(<NoCodeOfConductLanding />);

    expect(screen.getByRole("heading", { level: 3, name: title })).toBeTruthy();
    expect(screen.getByText(description)).toBeTruthy();
  });

  test("renders the compact code and section boundaries semantically", () => {
    render(<NoCodeOfConductLanding />);

    const governanceSheet = screen.getByRole("region", {
      name: "Working agreement for adult self-governance",
    });

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Short enough to use in real life.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "No symbolic adulthood.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "What a grown-up standard preserves.",
      }),
    ).toBeTruthy();
    expect(
      within(governanceSheet).getAllByText(
        /say what the problem is|assume the other person can hear it|repair damage when it happens|protect the work and the relationship together/i,
      ),
    ).toHaveLength(4);
  });
});
