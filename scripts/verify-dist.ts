import { verifyDist } from "./site-artifacts";

const result = await verifyDist();

if (!result.ok) {
  for (const error of result.errors) {
    console.error(error);
  }

  process.exit(1);
}

console.log(`Verified dist output (${result.files.length} files).`);
