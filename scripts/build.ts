import { relative } from "node:path";

import { buildSite } from "./site-runtime";

const { indexHash, outDir } = await buildSite();

console.log(
  `Built static site to ${relative(process.cwd(), outDir) || "."} (hash ${indexHash}).`,
);
