import { describe, expect, spyOn, test } from "bun:test";

import type { DistVerificationResult } from "./site-artifacts";
import { runVerifyDist } from "./verify-dist";

function makeResult(
  overrides: Partial<DistVerificationResult> = {},
): DistVerificationResult {
  return {
    assetReferences: ["_astro/index.abc123.css", "favicon.svg"],
    errors: [],
    files: ["_astro/index.abc123.css", "favicon.svg", "index.html"],
    indexHash: "abc123",
    ok: true,
    ...overrides,
  };
}

describe("runVerifyDist", () => {
  test("logs a success summary for a valid dist build", async () => {
    const logSpy = spyOn(console, "log").mockImplementation(() => {});
    const errorSpy = spyOn(console, "error").mockImplementation(() => {});
    const exitCodes: number[] = [];

    const result = await runVerifyDist({
      error: console.error,
      exit: (code) => {
        if (typeof code === "number") {
          exitCodes.push(code);
        }
      },
      log: console.log,
      verify: async () => makeResult(),
    });

    expect(result.ok).toBe(true);
    expect(logSpy).toHaveBeenCalledWith(
      "Verified dist output (3 files, 2 asset references, hash abc123).",
    );
    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitCodes).toEqual([]);

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  test("logs errors and exits when dist verification fails", async () => {
    const logSpy = spyOn(console, "log").mockImplementation(() => {});
    const errorSpy = spyOn(console, "error").mockImplementation(() => {});
    const exitCodes: number[] = [];

    const result = await runVerifyDist({
      error: console.error,
      exit: (code) => {
        if (typeof code === "number") {
          exitCodes.push(code);
        }
      },
      log: console.log,
      verify: async () =>
        makeResult({
          errors: ["dist/index.html is missing."],
          ok: false,
        }),
    });

    expect(result.ok).toBe(false);
    expect(errorSpy).toHaveBeenCalledWith("dist/index.html is missing.");
    expect(logSpy).not.toHaveBeenCalled();
    expect(exitCodes).toEqual([1]);

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
