import { Glob } from "bun";
import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { basename, extname, join, resolve, sep } from "node:path";

import { renderIndexHtml } from "../src/render-site";

type BuildSiteOptions = {
  outDir?: string;
  rootDir?: string;
};

type ServeStaticDirectoryOptions = {
  cacheControl?: string;
  rootDir: string;
};

const rootInputs = ["package.json", "tsconfig.json", "bunfig.toml"] as const;
const sourceDirectories = ["src", "public", "scripts"] as const;

async function copyDirectory(sourceDir: string, targetDir: string) {
  const sourceStat = await stat(sourceDir).catch(() => null);

  if (!sourceStat?.isDirectory()) {
    return;
  }

  await mkdir(targetDir, { recursive: true });

  for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
    const sourcePath = join(sourceDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    if (entry.isFile()) {
      await mkdir(targetDir, { recursive: true });
      await copyFile(sourcePath, targetPath);
    }
  }
}

async function getPathMtime(path: string): Promise<number> {
  const pathStat = await stat(path).catch(() => null);

  if (!pathStat) {
    return 0;
  }

  let latestMtime = pathStat.mtimeMs;

  if (!pathStat.isDirectory()) {
    return latestMtime;
  }

  for (const entry of await readdir(path, { withFileTypes: true })) {
    const childPath = join(path, entry.name);
    latestMtime = Math.max(latestMtime, await getPathMtime(childPath));
  }

  return latestMtime;
}

function getContentType(path: string) {
  if (basename(path) === "CNAME") {
    return "text/plain; charset=utf-8";
  }

  switch (extname(path)) {
    case ".css":
      return "text/css; charset=utf-8";
    case ".html":
      return "text/html; charset=utf-8";
    case ".ico":
      return "image/x-icon";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".xml":
      return "application/xml; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function resolveStaticPath(rootDir: string, request: Request) {
  const { pathname } = new URL(request.url);
  const relativePath =
    pathname === "/"
      ? "index.html"
      : pathname.replace(/^\/+/, "").replace(/\/$/, "/index.html");
  const absoluteRootDir = resolve(rootDir);
  const absolutePath = resolve(absoluteRootDir, relativePath);

  if (
    absolutePath !== absoluteRootDir &&
    !absolutePath.startsWith(`${absoluteRootDir}${sep}`)
  ) {
    return null;
  }

  return absolutePath;
}

export async function buildSite({
  rootDir = process.cwd(),
  outDir = join(rootDir, "dist"),
}: BuildSiteOptions = {}) {
  const assetDir = join(outDir, "_assets");

  await rm(outDir, { force: true, recursive: true });
  await mkdir(assetDir, { recursive: true });
  await copyDirectory(join(rootDir, "public"), outDir);
  await copyFile(
    join(rootDir, "node_modules", "antd", "dist", "antd.css"),
    join(assetDir, "antd.css"),
  );
  await copyFile(
    join(rootDir, "src", "styles", "global.css"),
    join(assetDir, "global.css"),
  );
  await Bun.write(join(outDir, "index.html"), renderIndexHtml());

  const html = await Bun.file(join(outDir, "index.html")).text();

  return {
    indexHash: Bun.hash(html).toString(16),
    outDir,
  };
}

export async function getLatestSourceMtime(rootDir = process.cwd()) {
  let latestMtime = 0;

  for (const directory of sourceDirectories) {
    latestMtime = Math.max(
      latestMtime,
      await getPathMtime(join(rootDir, directory)),
    );
  }

  for (const file of rootInputs) {
    latestMtime = Math.max(
      latestMtime,
      await getPathMtime(join(rootDir, file)),
    );
  }

  return latestMtime;
}

export async function listSourceFiles(rootDir = process.cwd()) {
  const files = new Set<string>();

  for (const directory of sourceDirectories) {
    const cwd = join(rootDir, directory);
    const directoryExists = await stat(cwd).catch(() => null);

    if (!directoryExists?.isDirectory()) {
      continue;
    }

    const glob = new Glob("**/*");

    for await (const file of glob.scan({ cwd, onlyFiles: true })) {
      files.add(join(directory, file));
    }
  }

  for (const file of rootInputs) {
    const fileExists = await stat(join(rootDir, file)).catch(() => null);

    if (fileExists?.isFile()) {
      files.add(file);
    }
  }

  return [...files].sort();
}

export async function serveStaticDirectory(
  request: Request,
  {
    rootDir,
    cacheControl = "public, max-age=0, must-revalidate",
  }: ServeStaticDirectoryOptions,
) {
  const filePath = resolveStaticPath(rootDir, request);

  if (!filePath) {
    return new Response("Not found", { status: 404 });
  }

  const file = Bun.file(filePath);

  if (!(await file.exists())) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(file.stream(), {
    headers: {
      "cache-control": cacheControl,
      "content-type": getContentType(filePath),
    },
  });
}
