import { join } from "node:path";

import {
  buildSite,
  getLatestSourceMtime,
  serveStaticDirectory,
} from "./site-runtime";

const rootDir = process.cwd();
const outDir = join(rootDir, "dist");
const port = Number(Bun.env.PORT ?? 3000);

let latestSourceMtime = 0;

async function rebuildSite(reason: string) {
  const { indexHash } = await buildSite({ outDir, rootDir });
  latestSourceMtime = await getLatestSourceMtime(rootDir);
  console.log(`[dev] ${reason} -> rebuilt dist (hash ${indexHash}).`);
}

await rebuildSite("initial build");

const server = Bun.serve({
  development: {
    console: true,
    hmr: false,
  },
  fetch: async (request) => {
    try {
      const currentMtime = await getLatestSourceMtime(rootDir);

      if (currentMtime > latestSourceMtime) {
        await rebuildSite("source change");
      }

      return await serveStaticDirectory(request, {
        cacheControl: "no-store",
        rootDir: outDir,
      });
    } catch (error) {
      console.error(error);
      return new Response("Build failed", { status: 500 });
    }
  },
  port,
});

console.log(`[dev] Listening on http://localhost:${server.port}`);
