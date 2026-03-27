import { mkdir } from "node:fs/promises";

type Step = {
  label: string;
  run: () => Promise<unknown>;
};

const isCi = Bun.argv.includes("--ci");
const steps: Step[] = [
  {
    label: "Type check",
    run: () => Bun.$`bun run check`,
  },
  {
    label: "Lint",
    run: () => Bun.$`bun run lint`,
  },
  {
    label: "Format check",
    run: () => Bun.$`bun run fmt:check`,
  },
  {
    label: isCi ? "CI tests" : "Tests",
    run: () => (isCi ? Bun.$`bun run test:ci` : Bun.$`bun run test`),
  },
];

if (isCi) {
  await mkdir("reports", { recursive: true });
}

const startedAt = performance.now();

for (const step of steps) {
  const stepStartedAt = performance.now();
  console.log(`\n==> ${step.label}`);
  await step.run();
  console.log(
    `Completed ${step.label.toLowerCase()} in ${(
      performance.now() - stepStartedAt
    ).toFixed(2)}ms.`,
  );
}

console.log(
  `\nQuality sweep complete in ${(performance.now() - startedAt).toFixed(
    2,
  )}ms.`,
);
