# nocodeofconduct.dev

Landing page for `https://nocodeofconduct.dev`, built with Bun, Astro, React,
and Ant Design.

## Architecture

- `astro.config.ts` configures Astro for static output with the React
  integration and the canonical production site URL.
- `src/layouts/BaseLayout.astro` owns the document shell, metadata, favicon,
  and global stylesheet imports.
- `src/pages/index.astro` is the Astro page entrypoint.
- `src/components/NoCodeOfConductLanding.tsx` renders the landing page content
  with Ant Design components, but without client hydration.
- `scripts/site-artifacts.ts` verifies the generated `dist/` output after
  build: metadata, copied `public/**` assets, referenced stylesheet assets, and
  the absence of unexpected `<script>` tags.

The production output stays intentionally simple: one static HTML page, copied
public assets like `CNAME` and `favicon.svg`, hashed Astro stylesheet assets in
`dist/_astro/`, and no client-side script tags by default.

## Development

Install dependencies:

```bash
bun install
```

Start Astro in dev mode:

```bash
bun run dev
```

Run tests:

```bash
bun run test
```

Run the local quality sweep:

```bash
bun run quality
```

Build the site and verify `dist/`:

```bash
bun run build
```

The verifier expects:

- `dist/index.html`
- copied `public/**` assets
- referenced generated stylesheet assets such as `dist/_astro/*.css`
- canonical, Open Graph, Twitter, and theme-color metadata
- no unexpected `<script>` tags in the generated HTML

Generate CI-style test reports:

```bash
bun run test:ci
```

Inspect dependency health and build diagnostics:

```bash
bun run audit
bun run deps:outdated
bun run diag:dist
```

Preview the production build locally:

```bash
bun run preview
```

`bunfig.toml` still enforces a 3-day minimum release age for new package
resolutions, while excluding Bun and TypeScript typing packages so the
toolchain can still move quickly.
