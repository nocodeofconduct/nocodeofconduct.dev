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

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map(dir =>
      rm(dir, {
        force: true,
        recursive: true,
      }),
    ),
  );
});

test("verifyDist passes for a build with the expected site metadata", async () => {
  const rootDir = await makeTempRepo();

  await mkdir(join(rootDir, "dist", "_astro"), { recursive: true });
  await Bun.write(join(rootDir, "dist", "_astro", "entry.css"), "body{}");
  await Bun.write(
    join(rootDir, "dist", "index.html"),
    [
      "<!doctype html>",
      "<html>",
      "<head>",
      `<title>${siteConfig.name}</title>`,
      `<meta name="description" content="${siteConfig.description}" />`,
      `<meta property="og:url" content="${homeCanonicalUrl}" />`,
      `<link rel="canonical" href="${homeCanonicalUrl}" />`,
      "</head>",
      "<body></body>",
      "</html>",
    ].join(""),
  );

  const result = await verifyDist(rootDir);

  expect(result.ok).toBe(true);
  expect(result.errors).toEqual([]);
});

test("verifyDist reports missing canonical metadata", async () => {
  const rootDir = await makeTempRepo();

  await mkdir(join(rootDir, "dist", "_astro"), { recursive: true });
  await Bun.write(join(rootDir, "dist", "_astro", "entry.css"), "body{}");
  await Bun.write(
    join(rootDir, "dist", "index.html"),
    [
      "<!doctype html>",
      "<html>",
      "<head>",
      `<title>${siteConfig.name}</title>`,
      `<meta name="description" content="${siteConfig.description}" />`,
      "</head>",
      "<body></body>",
      "</html>",
    ].join(""),
  );

  const result = await verifyDist(rootDir);

  expect(result.ok).toBe(false);
  expect(result.errors).toContain("dist/index.html is missing the expected canonical URL.");
  expect(result.errors).toContain("dist/index.html is missing the expected Open Graph URL.");
});
