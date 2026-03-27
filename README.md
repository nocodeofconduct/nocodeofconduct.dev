# nocodeofconduct.dev

Landing page for `https://nocodeofconduct.dev`, built with Bun, a custom static
site generator, and Ant Design.

## Architecture

- `src/render-site.tsx` renders the React landing page to static HTML with the
  production metadata, canonical URL, and stylesheet links.
- `scripts/site-runtime.ts` builds `dist/`, copies `public/`, stages
  `dist/_assets/antd.css` and `dist/_assets/global.css`, and serves the static
  output for local development and preview.
- `scripts/dev.ts` rebuilds the site when source files change and serves the
  generated `dist/` through `Bun.serve()`.
- `scripts/preview.ts` serves the already-built `dist/` directory.

The current production output is intentionally simple: one static HTML page,
copied public assets like `CNAME` and `favicon.svg`, and no client-side script
tags by default.

## Development

Install dependencies:

```bash
bun install
```

Start the Bun dev server:

```bash
bun run dev
```

Run the test suite:

```bash
bun run test
```

Run the Bun-powered quality sweep:

```bash
bun run quality
```

Build the static site:

```bash
bun run build
```

The build renders the React landing page to static HTML, copies public assets,
stages CSS into `dist/_assets/`, and verifies the generated `dist/` output
afterward using Bun-native file I/O, globbing, metadata checks, and asset
reference checks.

The verifier expects:

- `dist/index.html`
- copied `public/**` assets
- referenced `dist/_assets/*.css` stylesheets
- canonical, Open Graph, Twitter, and theme-color metadata
- no unexpected `<script>` tags in the generated HTML

Generate coverage and CI-friendly reports:

```bash
bun run test:ci
```

Inspect dependency health and runtime diagnostics:

```bash
bun run audit
bun run deps:outdated
bun run diag:dist
```

Preview the production build locally:

```bash
bun run preview
```

`bunfig.toml` also enforces a 3-day minimum release age for new package
resolutions, while excluding Bun and TypeScript typing packages so the toolchain
can still move quickly.
