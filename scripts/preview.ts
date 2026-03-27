import { join } from "node:path";

import { serveStaticDirectory } from "./site-runtime";

const rootDir = join(process.cwd(), "dist");
const port = Number(Bun.env.PORT ?? 4173);

if (!(await Bun.file(join(rootDir, "index.html")).exists())) {
  console.error("dist/index.html is missing. Run `bun run build` first.");
  process.exit(1);
}

const server = Bun.serve({
  fetch: (request) =>
    serveStaticDirectory(request, {
      cacheControl: "public, max-age=60",
      rootDir,
    }),
  port,
});

console.log(`[preview] Listening on http://localhost:${server.port}`);
