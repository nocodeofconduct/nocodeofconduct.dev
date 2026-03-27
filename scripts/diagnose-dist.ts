import { gcAndSweep, heapStats, memoryUsage } from "bun:jsc";

import { verifyDist } from "./site-artifacts";

function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

gcAndSweep();
const beforeMemory = structuredClone(memoryUsage());
const beforeHeap = structuredClone(heapStats());
const startedAt = performance.now();
const result = await verifyDist();
const durationMs = performance.now() - startedAt;
gcAndSweep();
const afterMemory = structuredClone(memoryUsage());
const afterHeap = structuredClone(heapStats());

console.log(
  JSON.stringify(
    {
      durationMs: Number(durationMs.toFixed(2)),
      files: result.files.length,
      assetReferences: result.assetReferences.length,
      indexHash: result.indexHash,
      ok: result.ok,
      heap: {
        before: formatBytes(beforeHeap.heapSize),
        after: formatBytes(afterHeap.heapSize),
        objectsDelta: afterHeap.objectCount - beforeHeap.objectCount,
      },
      memory: {
        before: formatBytes(beforeMemory.current),
        after: formatBytes(afterMemory.current),
        peak: formatBytes(afterMemory.peak),
      },
    },
    null,
    2,
  ),
);

if (!result.ok) {
  process.exit(1);
}
