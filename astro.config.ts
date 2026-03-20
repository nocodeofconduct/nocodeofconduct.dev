import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import { siteConfig } from "./src/config/site";

export default defineConfig({
  site: siteConfig.url,
  output: "static",
  integrations: [react()],
});
