import { Glob } from "bun";
import { stat } from "node:fs/promises";
import { join } from "node:path";

import {
  homeCanonicalUrl,
  siteConfig,
  siteThemeColor,
} from "../src/config/site";

function getPaths(rootDir: string) {
  return {
    distDir: join(rootDir, "dist"),
    distIndexPath: join(rootDir, "dist", "index.html"),
    publicDir: join(rootDir, "public"),
  };
}

export async function listDistFiles(rootDir = process.cwd()) {
  const { distDir } = getPaths(rootDir);
  const glob = new Glob("**/*");
  const files: string[] = [];

  for await (const file of glob.scan({ cwd: distDir, onlyFiles: true })) {
    files.push(file);
  }

  return files.sort();
}

export async function listPublicFiles(rootDir = process.cwd()) {
  const { publicDir } = getPaths(rootDir);
  const publicDirectory = await stat(publicDir).catch(() => null);

  if (!publicDirectory?.isDirectory()) {
    return [];
  }

  const glob = new Glob("**/*");
  const files: string[] = [];

  for await (const file of glob.scan({ cwd: publicDir, onlyFiles: true })) {
    files.push(file);
  }

  return files.sort();
}

function extractAssetReferences(html: string) {
  const references = new Set<string>();

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const [_, rawReference] = match;

    if (!rawReference) {
      continue;
    }

    if (
      rawReference === "/favicon.svg" ||
      rawReference.startsWith("/_assets/")
    ) {
      references.add(rawReference.slice(1));
    }
  }

  return [...references].sort();
}

export type DistVerificationResult = {
  assetReferences: string[];
  errors: string[];
  files: string[];
  indexHash: string | null;
  ok: boolean;
};

export async function verifyDist(
  rootDir = process.cwd(),
): Promise<DistVerificationResult> {
  const { distIndexPath } = getPaths(rootDir);
  let assetReferences: string[] = [];
  const files = await listDistFiles(rootDir).catch(() => [] as string[]);
  const publicFiles = await listPublicFiles(rootDir).catch(
    () => [] as string[],
  );
  const errors: string[] = [];
  let indexHash: string | null = null;

  if (!files.includes("index.html")) {
    errors.push("dist/index.html is missing.");
  }

  if (
    !files.some((file) => file.startsWith("_assets/") && file.endsWith(".css"))
  ) {
    errors.push("dist/_assets is missing expected stylesheet assets.");
  }

  for (const publicFile of publicFiles) {
    if (!files.includes(publicFile)) {
      errors.push(
        `dist/${publicFile} copied from public/${publicFile} is missing.`,
      );
    }
  }

  const indexFile = Bun.file(distIndexPath);
  if (await indexFile.exists()) {
    const html = await indexFile.text();
    assetReferences = extractAssetReferences(html);
    indexHash = Bun.hash(html).toString(16);

    if (!html.includes(`<title>${siteConfig.name}</title>`)) {
      errors.push("dist/index.html is missing the expected document title.");
    }

    if (
      !html.includes(
        `<meta name="description" content="${siteConfig.description}"`,
      )
    ) {
      errors.push(
        "dist/index.html is missing the shared description metadata.",
      );
    }

    if (!html.includes(`href="${homeCanonicalUrl}"`)) {
      errors.push("dist/index.html is missing the expected canonical URL.");
    }

    if (!html.includes('property="og:type" content="website"')) {
      errors.push("dist/index.html is missing the expected Open Graph type.");
    }

    if (
      !html.includes(`property="og:site_name" content="${siteConfig.name}"`)
    ) {
      errors.push(
        "dist/index.html is missing the expected Open Graph site name.",
      );
    }

    if (!html.includes(`property="og:url" content="${homeCanonicalUrl}"`)) {
      errors.push("dist/index.html is missing the expected Open Graph URL.");
    }

    if (!html.includes(`property="og:title" content="${siteConfig.name}"`)) {
      errors.push("dist/index.html is missing the expected Open Graph title.");
    }

    if (
      !html.includes(
        `property="og:description" content="${siteConfig.description}"`,
      )
    ) {
      errors.push(
        "dist/index.html is missing the expected Open Graph description.",
      );
    }

    if (!html.includes(`name="twitter:title" content="${siteConfig.name}"`)) {
      errors.push("dist/index.html is missing the expected Twitter title.");
    }

    if (
      !html.includes(
        `name="twitter:description" content="${siteConfig.description}"`,
      )
    ) {
      errors.push(
        "dist/index.html is missing the expected Twitter description.",
      );
    }

    if (!html.includes('name="twitter:card" content="summary_large_image"')) {
      errors.push("dist/index.html is missing the expected Twitter card.");
    }

    if (!html.includes(`name="theme-color" content="${siteThemeColor}"`)) {
      errors.push("dist/index.html is missing the expected theme color.");
    }

    if (/<script\b/i.test(html)) {
      errors.push("dist/index.html unexpectedly includes script tags.");
    }

    if (!assetReferences.includes("favicon.svg")) {
      errors.push("dist/index.html is missing the expected favicon reference.");
    }

    if (!assetReferences.some((file) => file.startsWith("_assets/"))) {
      errors.push("dist/index.html is missing referenced _assets stylesheets.");
    }

    for (const assetReference of assetReferences) {
      if (!files.includes(assetReference)) {
        errors.push(
          `dist/${assetReference} is referenced from dist/index.html but missing.`,
        );
      }
    }
  }

  return {
    assetReferences,
    errors,
    files,
    indexHash,
    ok: errors.length === 0,
  };
}
