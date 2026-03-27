import { Glob } from "bun";
import { join } from "node:path";

import { homeCanonicalUrl, siteConfig } from "../src/config/site";

function getPaths(rootDir: string) {
  return {
    distDir: join(rootDir, "dist"),
    distIndexPath: join(rootDir, "dist", "index.html"),
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

function extractAssetReferences(html: string) {
  const references = new Set<string>();

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const [_, rawReference] = match;

    if (!rawReference) {
      continue;
    }

    if (
      rawReference === "/favicon.svg" ||
      rawReference.startsWith("/_astro/")
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
  const errors: string[] = [];
  let indexHash: string | null = null;

  if (!files.includes("index.html")) {
    errors.push("dist/index.html is missing.");
  }

  if (!files.some((file) => file.startsWith("_astro/"))) {
    errors.push("dist/_astro is missing hashed build assets.");
  }

  const indexFile = Bun.file(distIndexPath);
  if (await indexFile.exists()) {
    const html = await indexFile.text();
    assetReferences = extractAssetReferences(html);
    indexHash = Bun.hash(html).toString(16);

    if (!html.includes(`<title>${siteConfig.name}</title>`)) {
      errors.push("dist/index.html is missing the expected document title.");
    }

    if (!html.includes(`content="${siteConfig.description}"`)) {
      errors.push(
        "dist/index.html is missing the shared description metadata.",
      );
    }

    if (!html.includes(`href="${homeCanonicalUrl}"`)) {
      errors.push("dist/index.html is missing the expected canonical URL.");
    }

    if (!html.includes(`content="${homeCanonicalUrl}"`)) {
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

    if (!html.includes('name="theme-color" content="#0f1720"')) {
      errors.push("dist/index.html is missing the expected theme color.");
    }

    if (!assetReferences.includes("favicon.svg")) {
      errors.push("dist/index.html is missing the expected favicon reference.");
    }

    if (!assetReferences.some((file) => file.startsWith("_astro/"))) {
      errors.push("dist/index.html is missing referenced _astro assets.");
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
