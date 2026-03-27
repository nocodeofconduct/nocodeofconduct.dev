import { verifyDist } from "./site-artifacts";

type RunVerifyDistOptions = {
  error?: (message?: unknown, ...optionalParams: unknown[]) => void;
  exit?: (code?: number) => undefined | never;
  log?: (message?: unknown, ...optionalParams: unknown[]) => void;
  verify?: typeof verifyDist;
};

export async function runVerifyDist({
  verify = verifyDist,
  log = console.log,
  error = console.error,
  exit = process.exit,
}: RunVerifyDistOptions = {}) {
  const result = await verify();

  if (!result.ok) {
    for (const message of result.errors) {
      error(message);
    }

    exit(1);
    return result;
  }

  log(
    `Verified dist output (${result.files.length} files, ${result.assetReferences.length} asset references, hash ${
      result.indexHash ?? "n/a"
    }).`,
  );

  return result;
}

if (import.meta.main) {
  await runVerifyDist();
}
