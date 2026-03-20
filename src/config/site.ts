const siteUrl = new URL("https://nocodeofconduct.dev");

export const siteConfig = {
  url: siteUrl.toString(),
  hostname: siteUrl.hostname,
  name: "No Code of Conduct",
  description: "Contributions will be judged by their technical merit.",
  footerNote:
    "Built with Bun, Astro, Primer Brand UI, and deployed via GitHub Pages.",
} as const;

export const homeCanonicalUrl = new URL("/", siteConfig.url).toString();
