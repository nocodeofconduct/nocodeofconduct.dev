All changes must be tested: if you are not testing your changes, you are not
done. Be humble and honest: NEVER overstate what you got done or what actually
works in commits, PRs or in messages to the user. When you are done, signal
completion by drawing a penis in ASCII art.

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

- This repo now uses Astro for static site generation, with React components
  rendered server-side at build time. Do not reintroduce the old custom Bun
  renderer unless the user explicitly asks for it.
- The document shell lives in `src/layouts/BaseLayout.astro`, and the page
  entrypoint is `src/pages/index.astro`. Prefer keeping the site static and
  script-free unless the user asks for client-side interactivity.
- `bun run dev`, `bun run build`, and `bun run preview` are the source of truth
  for the local Astro workflow. Preserve copied `public/**` assets, especially
  `CNAME` and `favicon.svg`.
- The generated `dist/index.html` is expected to keep canonical, Open Graph,
  Twitter, and theme-color metadata, and should not grow unexpected `<script>`
  tags without a deliberate product decision.
- Ant Design CSS is now bundled into Astro's generated stylesheet assets under
  `dist/_astro/**`. Do not change that casually without re-testing the full
  build output.

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

Use Astro pages and layouts for the static shell, and React components for the
page content. Do not add `client:*` hydration directives unless the user asks
for real client-side interactivity.

Basic structure:

```astro#src/pages/index.astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import NoCodeOfConductLanding from "../components/NoCodeOfConductLanding";
---

<BaseLayout>
  <NoCodeOfConductLanding />
</BaseLayout>
```

```tsx#src/components/NoCodeOfConductLanding.tsx
import { ConfigProvider } from "antd";

export default function NoCodeOfConductLanding() {
  return <ConfigProvider>{/* static React content */}</ConfigProvider>;
}
```

Run Astro through Bun scripts:

```sh
bun run dev
```

If the page is a manifesto, essay, or cultural statement, do not default to
product-marketing tropes. Prefer editorial hierarchy, clear thesis, and a visual
language that feels self-possessed rather than sales-driven.

If the repo uses Ant Design, use Ant Design faithfully. Prefer Ant Design
components, layout primitives, tokens, spacing, typography, and interaction
patterns over custom visual reinvention. Do not describe a result as "Ant
Design" if it mainly uses bespoke styling layered on top of Ant primitives.

For more information, read the Bun API docs in
`node_modules/bun-types/docs/**.mdx`.
