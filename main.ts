// The Tired Dark Lord — a 100-word monologue from a fantasy villain who is
// secretly just very tired. The tiredness lives in the rhythm, the pauses and
// the small deflections, never in a plain announcement. Writes the monologue
// to /output/entry.txt (UTF-8, 1-600 chars).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const MAX_CHARS = 600;
const MIN_WORDS = 80;
const MAX_WORDS = 120;

// Spoken in short bursts with pauses: a lord who keeps putting the scheme off.
const SENTENCES = [
  "You want the crown? Take it.",
  "Honestly — take it.",
  "The last three kings bled for it, and all I got was the paperwork.",
  "The dungeons need repointing, the ravens have unionised, and my sorcerer retired to a cottage with... chickens.",
  "I was going to raise the dead tonight — I had the candles, the choir, the whole moon — but the graveyard gate sticks, and it is raining, and the dead, frankly, can wait.",
  "They have waited this long.",
  "So. Kneel, or don't.",
  "The throne is cold, the crown is heavy, and if you insist on the duel... could we do it sitting down?",
];

function main(): void {
  const text = SENTENCES.join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < MIN_WORDS || words > MAX_WORDS) {
    throw new Error(`monologue must be ${MIN_WORDS}-${MAX_WORDS} words, got ${words}`);
  }
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`monologue must be 1-${MAX_CHARS} chars, got ${text.length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("monologue must be a single block of text");
  }
  // The brief's hard rule: the tiredness must be felt, never announced.
  if (/\b(tired|weary|exhausted|sleepy)\b/i.test(text)) {
    throw new Error("monologue must show the tiredness, never name it");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, "entry.txt");
  writeFileSync(target, text + "\n", "utf8");
  console.log(`${words} words, ${text.length} chars -> ${target}`);
  console.log(text);
}

main();
