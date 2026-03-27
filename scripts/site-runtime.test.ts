import { afterEach, describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { buildSite, serveStaticDirectory } from "./site-runtime";

const tempDirs: string[] = [];

async function makeTempDir() {
  const dir = await mkdtemp(join(tmpdir(), "nocodeofconduct-build-"));
  tempDirs.push(dir);
  return dir;
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

describe("buildSite", () => {
  test("renders the landing page and copies static assets", async () => {
    const outDir = await makeTempDir();
    const { indexHash } = await buildSite({
      outDir,
      rootDir: process.cwd(),
    });

    expect(indexHash).toBeTruthy();
    expect(await Bun.file(join(outDir, "index.html")).exists()).toBe(true);
    expect(await Bun.file(join(outDir, "_assets", "antd.css")).exists()).toBe(
      true,
    );
    expect(await Bun.file(join(outDir, "_assets", "global.css")).exists()).toBe(
      true,
    );
    expect(await Bun.file(join(outDir, "favicon.svg")).exists()).toBe(true);
    expect(await Bun.file(join(outDir, "CNAME")).exists()).toBe(true);

    const html = await Bun.file(join(outDir, "index.html")).text();

    expect(html).toContain("A code of conduct adults can own.");
    expect(html).toContain('rel="stylesheet" href="/_assets/antd.css"');
    expect(html).not.toContain("<script");
  });

  test("serves the generated index from disk", async () => {
    const outDir = await makeTempDir();
    await buildSite({
      outDir,
      rootDir: process.cwd(),
    });

    const response = await serveStaticDirectory(
      new Request("https://nocodeofconduct.dev/"),
      {
        cacheControl: "no-store",
        rootDir: outDir,
      },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("content-type")).toBe(
      "text/html; charset=utf-8",
    );
    expect(await response.text()).toContain("No Code of Conduct");
  });
});
