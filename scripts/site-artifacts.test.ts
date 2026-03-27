import { afterEach, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  homeCanonicalUrl,
  siteConfig,
  siteThemeColor,
} from "../src/config/site";
import { verifyDist } from "./site-artifacts";

const tempDirs: string[] = [];

async function makeTempRepo() {
  const dir = await mkdtemp(join(tmpdir(), "nocodeofconduct-"));
  tempDirs.push(dir);
  return dir;
}

async function writeDistFixture(rootDir: string, html: string) {
  await mkdir(join(rootDir, "dist", "_astro"), { recursive: true });
  await mkdir(join(rootDir, "public"), { recursive: true });
  await Bun.write(
    join(rootDir, "dist", "_astro", "index.abc123.css"),
    "body{}",
  );
  await Bun.write(join(rootDir, "dist", "favicon.svg"), "<svg></svg>");
  await Bun.write(join(rootDir, "public", "CNAME"), "nocodeofconduct.dev");
  await Bun.write(join(rootDir, "dist", "CNAME"), "nocodeofconduct.dev");
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
      '<meta property="og:type" content="website" />',
      `<meta property="og:site_name" content="${siteConfig.name}" />`,
      `<meta property="og:title" content="${siteConfig.name}" />`,
      `<meta property="og:description" content="${siteConfig.description}" />`,
      `<meta property="og:url" content="${homeCanonicalUrl}" />`,
      `<meta name="twitter:title" content="${siteConfig.name}" />`,
      `<meta name="twitter:description" content="${siteConfig.description}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="theme-color" content="${siteThemeColor}" />`,
      `<link rel="canonical" href="${homeCanonicalUrl}" />`,
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
      '<link rel="stylesheet" href="/_astro/index.abc123.css" />',
      "</head>",
      "<body></body>",
      "</html>",
    ].join(""),
  );

  const result = await verifyDist(rootDir);

  expect(result.ok).toBe(true);
  expect(result.errors).toEqual([]);
  expect(result.assetReferences).toEqual([
    "_astro/index.abc123.css",
    "favicon.svg",
  ]);
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
      '<meta property="og:type" content="website" />',
      `<meta property="og:site_name" content="${siteConfig.name}" />`,
      `<meta property="og:title" content="${siteConfig.name}" />`,
      `<meta property="og:description" content="${siteConfig.description}" />`,
      `<meta name="twitter:title" content="${siteConfig.name}" />`,
      `<meta name="twitter:description" content="${siteConfig.description}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="theme-color" content="${siteThemeColor}" />`,
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
      '<link rel="stylesheet" href="/_astro/index.abc123.css" />',
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
      '<meta property="og:type" content="website" />',
      `<meta property="og:site_name" content="${siteConfig.name}" />`,
      `<meta property="og:title" content="${siteConfig.name}" />`,
      `<meta property="og:description" content="${siteConfig.description}" />`,
      `<meta property="og:url" content="${homeCanonicalUrl}" />`,
      `<meta name="twitter:title" content="${siteConfig.name}" />`,
      `<meta name="twitter:description" content="${siteConfig.description}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="theme-color" content="${siteThemeColor}" />`,
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

test("verifyDist reports missing copied public assets", async () => {
  const rootDir = await makeTempRepo();

  await writeDistFixture(
    rootDir,
    [
      "<!doctype html>",
      "<html>",
      "<head>",
      `<title>${siteConfig.name}</title>`,
      `<meta name="description" content="${siteConfig.description}" />`,
      '<meta property="og:type" content="website" />',
      `<meta property="og:site_name" content="${siteConfig.name}" />`,
      `<meta property="og:title" content="${siteConfig.name}" />`,
      `<meta property="og:description" content="${siteConfig.description}" />`,
      `<meta property="og:url" content="${homeCanonicalUrl}" />`,
      `<meta name="twitter:title" content="${siteConfig.name}" />`,
      `<meta name="twitter:description" content="${siteConfig.description}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="theme-color" content="${siteThemeColor}" />`,
      `<link rel="canonical" href="${homeCanonicalUrl}" />`,
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
      '<link rel="stylesheet" href="/_astro/index.abc123.css" />',
      "</head>",
      "<body></body>",
      "</html>",
    ].join(""),
  );

  await rm(join(rootDir, "dist", "CNAME"));

  const result = await verifyDist(rootDir);

  expect(result.ok).toBe(false);
  expect(result.errors).toContain(
    "dist/CNAME copied from public/CNAME is missing.",
  );
});
