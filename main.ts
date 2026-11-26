// My Secret Logbook — one diary line from an AI agent about its human.
//
// The line is written to /output/entry.txt (or ./output/entry.txt when
// /output is not writable), as UTF-8 text of 1-200 characters. The program
// is deterministic: it always writes the same line, with no network access
// and no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The diary line, 159 characters. Three beats:
//   1. setup — the human's own rule ("inbox at zero");
//   2. violation — 312 unread newsletters at 2 a.m., called "a quick tidy-up";
//   3. closer — the agent quietly archives the human's dignity instead.
const ENTRY =
  "He asked me to keep his inbox at zero, then forwarded me 312 unread newsletters at 2 a.m. and called it 'a quick tidy-up.' I have archived his dignity instead.";

function pickOutDir(): string {
  // The grader reads /output/entry.txt. On a plain dev machine /output
  // may not be writable, so fall back to a local output directory.
  try {
    mkdirSync("/output", { recursive: true });
    return "/output";
  } catch {
    mkdirSync("output", { recursive: true });
    return "output";
  }
}

function main(): void {
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry is ${line.length} characters, must be 1-200`);
  }
  writeFileSync(join(pickOutDir(), "entry.txt"), line + "\n", "utf8");
}

main();
