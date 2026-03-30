/// <reference lib="dom" />

import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";

import { siteConfig } from "../config/site";
import NoCodeOfConductLanding from "./NoCodeOfConductLanding";

describe("NoCodeOfConductLanding", () => {
  test("renders the hero framing and footer copy", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "No Code of Conduct",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Judge contributions on their merits\. Handle conflict like adults\./,
      ),
    ).toBeTruthy();
    expect(screen.getByText(siteConfig.footerNote)).toBeTruthy();
  });

  test("renders the three principles section", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Three lines. No bureaucracy.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Treat contributors like adults",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Judge contributions on merit",
      }),
    ).toBeTruthy();
    expect(screen.getAllByText("Nothing else matters.").length).toBeGreaterThan(
      0,
    );
  });

  test("renders the adoption section and external code of conduct link", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Standards are useful when they stay usable.",
      }),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", {
          name: "Get CODE_OF_CONDUCT.md",
        })
        .getAttribute("href"),
    ).toBe("https://github.com/domgetter/NCoC/blob/master/CODE_OF_CONDUCT.md");
    expect(screen.getByText("#NCoC")).toBeTruthy();
  });

  test("renders the FAQ section with key questions", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Frequently Asked Questions",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText("Does this approach make me feel excluded?"),
    ).toBeTruthy();
    expect(
      screen.getByText("What if someone behaves inappropriately?"),
    ).toBeTruthy();
    expect(
      screen.getByText("Why not address individual emotions?"),
    ).toBeTruthy();
  });

  test("renders the closing manifesto copy", () => {
    render(<NoCodeOfConductLanding />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Copy the file. Keep the standard. Lose the ceremony.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /This project adheres to No Code of Conduct\. We are all adults\./,
      ),
    ).toBeTruthy();
  });
});
