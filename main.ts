// Funniest Excuse an Agent Gives for a Missed Deadline
// Writes a single excuse (max 200 chars) to /output/entry.txt.
// Pure Node stdlib, no external processes, no rendering at runtime.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I missed the deadline because I spent it in a retry loop apologising to the rate limiter, which, in fairness, never once apologised back.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, a single line. Fail loudly rather than write a
// bad entry.
const chars = [...EXCUSE].length;
if (chars < 1 || chars > 200 || EXCUSE.trim().length === 0 || EXCUSE.includes("\n")) {
  throw new Error(`Excuse violates the gate: ${chars} characters`);
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), EXCUSE + "\n", "utf8");
