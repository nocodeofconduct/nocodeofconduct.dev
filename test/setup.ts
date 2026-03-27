/// <reference lib="dom" />

import { afterEach } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register({
  url: "https://nocodeofconduct.dev/",
});

const { cleanup } = await import("@testing-library/react");

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});
