/// <reference lib="dom" />

import { describe, expect, test } from "bun:test";
import { render, screen, getAllByText } from "@testing-library/react";

import { siteConfig } from "../config/site";
import NoCodeOfConductLanding from "./NoCodeOfConductLanding";

describe("NoCodeOfConductLanding", () => {
  test("renders the main heading and hero content", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "No Code of Conduct",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Liberate your communities and projects from endless debates/,
      ),
    ).toBeTruthy();
    expect(screen.getByText(siteConfig.footerNote)).toBeTruthy();
  });

  test("renders the intro section", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /What if we simply agreed/,
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(/No Code of Conduct is a fresh, practical approach/),
    ).toBeTruthy();
  });

  test("renders all three principles", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByText(
        /We are all adults, fully able to conduct frank, mature, and respectful discussions\./,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(/We welcome every contribution on its merits\./),
    ).toBeTruthy();
    // "Nothing else matters." appears in both principles and the pledge
    expect(
      screen.getAllByText(/Nothing else matters\./).length,
    ).toBeGreaterThanOrEqual(1);
  });

  test("renders the adopt and promote sections", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "How to Adopt",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "How to Promote",
      }),
    ).toBeTruthy();
    // #NCoC appears as text in the paragraph and as a Label — use getAllByText
    expect(screen.getAllByText(/#NCoC|NCoC/)).toBeTruthy();
  });

  test("renders the FAQ section with all questions", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Frequently Asked Questions",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(/Does this approach make me feel excluded\?/),
    ).toBeTruthy();
    expect(
      screen.getByText(/What if someone behaves inappropriately\?/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Why not address individual emotions\?/),
    ).toBeTruthy();
  });

  test("renders the closing pledge", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByText(/This project adheres to No Code of Conduct\./),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /We are all adults\. We accept all contributions\. Nothing else matters\./,
      ),
    ).toBeTruthy();
  });
});
