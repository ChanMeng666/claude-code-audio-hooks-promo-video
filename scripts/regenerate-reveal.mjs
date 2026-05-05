#!/usr/bin/env node
/**
 * One-off script: regenerate ONLY public/vo-reveal.mp3 with the new
 * v5.2.1 rebrand line. Other audio (vo-features, vo-cta, all SFX, BGM)
 * is left untouched.
 *
 * Usage: ELEVENLABS_API_KEY=sk_xxx node scripts/regenerate-reveal.mjs
 *
 * Pronunciation note: "echook" is rendered as the literal phrase
 * "eck hook" in the TTS prompt so the model produces /ˈɛkˌhʊk/
 * (Echo + Hook). The display brand stays "echook" everywhere visual.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public");

const API_KEY = process.env.ELEVENLABS_API_KEY || "";
if (!API_KEY) {
  console.error("ELEVENLABS_API_KEY missing.");
  process.exit(1);
}
const BASE = "https://api.elevenlabs.io/v1";

const REVEAL_TEXT =
  "Introducing eck hook. Twenty-six hooks. Three AI editors. Zero latency. Total awareness.";

async function pickVoice() {
  console.log("[1/2] Fetching voices...");
  const res = await fetch(`${BASE}/voices`, {
    headers: { "xi-api-key": API_KEY },
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  Voice fetch failed (${res.status}): ${err.slice(0, 200)}`);
    process.exit(1);
  }
  const data = await res.json();
  const voices = data.voices || [];
  console.log(`  Found ${voices.length} voices.`);

  // ElevenLabs voice names look like "Daniel - Steady Broadcaster" — match
  // by leading first-name token so this stays portable across API keys.
  const preferred = ["Daniel", "Adam", "Charlie", "Clyde", "James"];
  let picked = null;
  for (const name of preferred) {
    picked = voices.find((v) =>
      v.name === name || v.name.startsWith(`${name} `) || v.name.startsWith(`${name}-`)
    );
    if (picked) break;
  }
  if (!picked) picked = voices[0];

  console.log(`  Selected voice: ${picked.name} (${picked.voice_id})`);
  return picked;
}

async function generateReveal(voiceId) {
  console.log("\n[2/2] Generating vo-reveal.mp3...");
  console.log(`  Script: "${REVEAL_TEXT}"`);
  const res = await fetch(`${BASE}/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: REVEAL_TEXT,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.65, similarity_boost: 0.8 },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  TTS failed (${res.status}): ${err.slice(0, 400)}`);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const outPath = join(OUT, "vo-reveal.mp3");
  writeFileSync(outPath, buf);
  console.log(`  OK — wrote ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log("==============================================");
  console.log("  Regenerate vo-reveal.mp3 (v5.2.1 rebrand)");
  console.log("==============================================");
  const voice = await pickVoice();
  await generateReveal(voice.voice_id);
  console.log("\nDone. Other audio files were not touched.");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
