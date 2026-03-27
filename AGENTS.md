All changes must be tested: if you are not testing your changes, you are not
done. Be humble and honest: NEVER overstate what you got done or what actually
works in commits, PRs or in messages to the user. When you are done, signal
completion by singing `Tirelipimpon sur le chihuahua`.

Prefer small, testable patches over one giant rewrite when the worktree is dirty
or package-manager side effects are still settling.

If you touch tooling, CI, test setup, or build verification, validate both the
local and CI-oriented paths before claiming success. In this repo that usually
means `bun run quality`, `bun run quality:ci`, and `bun run build`.

If `bun audit` still reports upstream transitive vulnerabilities, say so plainly
and do not imply they were fixed just because the rest of the patch is green.

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or
  `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads .env, so don't use dotenv.

## Project Notes

- This repo is a custom Bun static site generator now. Do not reintroduce
  Astro, Vite, or another framework build pipeline unless the user explicitly
  asks for that migration.
- The HTML shell is rendered in `src/render-site.tsx` with
  `react-dom/server`. Prefer keeping the site static and script-free unless the
  user asks for client-side interactivity.
- `scripts/site-runtime.ts` is the source of truth for build/dev/preview. If
  you touch it, preserve copied `public/**` assets, especially `CNAME` and
  `favicon.svg`.
- The generated `dist/index.html` is expected to keep canonical, Open Graph,
  Twitter, and theme-color metadata, and should not grow unexpected `<script>`
  tags without a deliberate product decision.
- For now, Ant Design CSS is copied into `dist/_assets/antd.css` instead of
  being rebundled by Bun's CSS pipeline. Do not switch that back casually
  without re-testing the full build output.

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

If you change test setup, coverage, or reporters, also run the relevant Bun
flows such as `bun run test:coverage` and `bun run quality:ci`.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully
support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // optional websocket support
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // handle close
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will
transpile & bundle automatically. `<link>` tags can point to stylesheets and
Bun's CSS bundler will bundle.

If the page is a manifesto, essay, or cultural statement, do not default to
product-marketing tropes. Prefer editorial hierarchy, clear thesis, and a visual
language that feels self-possessed rather than sales-driven.

If the repo uses Ant Design, use Ant Design faithfully. Prefer Ant Design
components, layout primitives, tokens, spacing, typography, and interaction
patterns over custom visual reinvention. Do not describe a result as "Ant
Design" if it mainly uses bespoke styling layered on top of Ant primitives.

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";
import { createRoot } from "react-dom/client";

// import .css files directly and it works
import './index.css';

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in
`node_modules/bun-types/docs/**.mdx`.
