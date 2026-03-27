import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import { siteConfig } from "./src/config/site";

export default defineConfig({
  integrations: [react()],
  output: "static",
  site: siteConfig.url,
});
