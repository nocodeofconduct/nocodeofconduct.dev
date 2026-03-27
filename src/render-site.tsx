import { renderToStaticMarkup } from "react-dom/server";

import NoCodeOfConductLanding from "./components/NoCodeOfConductLanding";
import { homeCanonicalUrl, siteConfig, siteThemeColor } from "./config/site";

export const stylesheetHrefs = [
  "/_assets/antd.css",
  "/_assets/global.css",
] as const;

export function renderIndexHtml() {
  const document = renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="canonical" href={homeCanonicalUrl} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content={siteThemeColor} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={homeCanonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
        {stylesheetHrefs.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <NoCodeOfConductLanding />
      </body>
    </html>,
  );

  return `<!doctype html>${document}`;
}
