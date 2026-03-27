# nocodeofconduct.dev

Landing page for `https://nocodeofconduct.dev`, built with Bun, Astro, and
Primer Brand UI.

## Development

Install dependencies:

```bash
bun install
```

Start the Astro dev server:

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

The build verifies the generated `dist/` output afterward using Bun-native file
I/O, globbing, metadata checks, and asset reference checks.

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
