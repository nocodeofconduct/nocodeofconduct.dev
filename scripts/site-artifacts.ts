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

export type DistVerificationResult = {
  errors: string[];
  files: string[];
  ok: boolean;
};

export async function verifyDist(
  rootDir = process.cwd(),
): Promise<DistVerificationResult> {
  const { distIndexPath } = getPaths(rootDir);
  const files = await listDistFiles(rootDir).catch(() => [] as string[]);
  const errors: string[] = [];

  if (!files.includes("index.html")) {
    errors.push("dist/index.html is missing.");
  }

  if (!files.some((file) => file.startsWith("_astro/"))) {
    errors.push("dist/_astro is missing hashed build assets.");
  }

  const indexFile = Bun.file(distIndexPath);
  if (await indexFile.exists()) {
    const html = await indexFile.text();

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
  }

  return {
    errors,
    files,
    ok: errors.length === 0,
  };
}
