import { afterEach, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { homeCanonicalUrl, siteConfig } from "../src/config/site";
import { verifyDist } from "./site-artifacts";

const tempDirs: string[] = [];

async function makeTempRepo() {
  const dir = await mkdtemp(join(tmpdir(), "nocodeofconduct-"));
  tempDirs.push(dir);
  return dir;
}

async function writeDistFixture(rootDir: string, html: string) {
  await mkdir(join(rootDir, "dist", "_astro"), { recursive: true });
  await Bun.write(join(rootDir, "dist", "_astro", "entry.css"), "body{}");
  await Bun.write(join(rootDir, "dist", "favicon.svg"), "<svg></svg>");
  await Bun.write(join(rootDir, "dist", "index.html"), html);
}

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map((dir) =>
      rm(dir, {
        force: true,
        recursive: true,
      }),
    ),
  );
});

test("verifyDist passes for a build with the expected site metadata", async () => {
  const rootDir = await makeTempRepo();

  await writeDistFixture(
    rootDir,
    [
      "<!doctype html>",
      "<html>",
      "<head>",
      `<title>${siteConfig.name}</title>`,
      `<meta name="description" content="${siteConfig.description}" />`,
      `<meta property="og:title" content="${siteConfig.name}" />`,
      `<meta property="og:description" content="${siteConfig.description}" />`,
      `<meta property="og:url" content="${homeCanonicalUrl}" />`,
      `<meta name="twitter:title" content="${siteConfig.name}" />`,
      `<meta name="twitter:description" content="${siteConfig.description}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      '<meta name="theme-color" content="#0f1720" />',
      `<link rel="canonical" href="${homeCanonicalUrl}" />`,
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
      '<link rel="stylesheet" href="/_astro/entry.css" />',
      "</head>",
      "<body></body>",
      "</html>",
    ].join(""),
  );

  const result = await verifyDist(rootDir);

  expect(result.ok).toBe(true);
  expect(result.errors).toEqual([]);
  expect(result.assetReferences).toEqual(["_astro/entry.css", "favicon.svg"]);
  expect(result.indexHash).toBeTruthy();
});

test("verifyDist reports missing canonical metadata", async () => {
  const rootDir = await makeTempRepo();

  await writeDistFixture(
    rootDir,
    [
      "<!doctype html>",
      "<html>",
      "<head>",
      `<title>${siteConfig.name}</title>`,
      `<meta name="description" content="${siteConfig.description}" />`,
      `<meta property="og:title" content="${siteConfig.name}" />`,
      `<meta property="og:description" content="${siteConfig.description}" />`,
      `<meta name="twitter:title" content="${siteConfig.name}" />`,
      `<meta name="twitter:description" content="${siteConfig.description}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      '<meta name="theme-color" content="#0f1720" />',
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
      '<link rel="stylesheet" href="/_astro/entry.css" />',
      "</head>",
      "<body></body>",
      "</html>",
    ].join(""),
  );

  const result = await verifyDist(rootDir);

  expect(result.ok).toBe(false);
  expect(result.errors).toContain(
    "dist/index.html is missing the expected canonical URL.",
  );
  expect(result.errors).toContain(
    "dist/index.html is missing the expected Open Graph URL.",
  );
});

test("verifyDist reports missing referenced assets", async () => {
  const rootDir = await makeTempRepo();

  await writeDistFixture(
    rootDir,
    [
      "<!doctype html>",
      "<html>",
      "<head>",
      `<title>${siteConfig.name}</title>`,
      `<meta name="description" content="${siteConfig.description}" />`,
      `<meta property="og:title" content="${siteConfig.name}" />`,
      `<meta property="og:description" content="${siteConfig.description}" />`,
      `<meta property="og:url" content="${homeCanonicalUrl}" />`,
      `<meta name="twitter:title" content="${siteConfig.name}" />`,
      `<meta name="twitter:description" content="${siteConfig.description}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      '<meta name="theme-color" content="#0f1720" />',
      `<link rel="canonical" href="${homeCanonicalUrl}" />`,
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
      '<link rel="stylesheet" href="/_astro/missing.css" />',
      "</head>",
      "<body></body>",
      "</html>",
    ].join(""),
  );

  const result = await verifyDist(rootDir);

  expect(result.ok).toBe(false);
  expect(result.errors).toContain(
    "dist/_astro/missing.css is referenced from dist/index.html but missing.",
  );
});
