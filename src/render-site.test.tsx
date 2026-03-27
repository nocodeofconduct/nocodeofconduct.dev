import { describe, expect, test } from "bun:test";

import { homeCanonicalUrl, siteConfig, siteThemeColor } from "./config/site";
import { renderIndexHtml, stylesheetHrefs } from "./render-site";

describe("renderIndexHtml", () => {
  test("renders the full static HTML shell for the landing page", () => {
    const html = renderIndexHtml();

    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain("<html");
    expect(html).toContain(`<title>${siteConfig.name}</title>`);
    expect(html).toContain(
      `<meta name="description" content="${siteConfig.description}"/>`,
    );
    expect(html).toContain(
      `<link rel="canonical" href="${homeCanonicalUrl}"/>`,
    );
    expect(html).toContain(
      `<meta name="theme-color" content="${siteThemeColor}"/>`,
    );
    expect(html).toContain('property="og:type" content="website"');
    expect(html).toContain(
      `property="og:site_name" content="${siteConfig.name}"`,
    );
    expect(html).toContain("A code of conduct adults can own.");
    expect(html).toContain("Working agreement for adult self-governance");
    expect(html).not.toContain("<script");

    for (const href of stylesheetHrefs) {
      expect(html).toContain(`<link rel="stylesheet" href="${href}"/>`);
    }
  });
});
