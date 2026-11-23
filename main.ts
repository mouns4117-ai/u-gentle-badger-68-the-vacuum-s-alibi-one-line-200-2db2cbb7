// The Vacuum's Alibi: One Line, 200 Characters
// Writes the robot vacuum's excuse for missing a spot to /output/entry.txt.
// SPDX-License-Identifier: MIT

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, deadpan machine voice, punch at the end.
// 116 characters, inside the 1-200 gate; the trailing newline in the file
// makes entry.txt 117 characters, still inside the gate.
// "I did not miss that spot. My sensors classified it as a load-bearing
// crumb, and I do not argue with structural dust."
const LINE =
  "I did not miss that spot. My sensors classified it as a load-bearing crumb, and I do not argue with structural dust.";

// Empty ONLY the contents of a directory; never remove the directory itself.
// (The grader's /output is a mounted empty directory: removing it fails.)
function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} characters, gate is 1-200`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (LINE.includes("\n")) {
    throw new Error("entry must fit on one line");
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
