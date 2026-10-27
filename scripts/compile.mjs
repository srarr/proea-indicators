// Compile every indicator on TradingView's own Pine compiler (the public translate_light endpoint the Pine Editor
// uses) and fail on any error or warning. Run by .github/workflows/compile.yml; locally: `node scripts/compile.mjs`.
// Node 20+, no dependencies.
import { readdirSync, readFileSync, appendFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ENDPOINT =
  "https://pine-facade.tradingview.com/pine-facade/translate_light?user_name=Guest&pine_id=00000000-0000-0000-0000-000000000000";
const ROOT = new URL("..", import.meta.url).pathname;
const DIR = join(ROOT, "indicators");

async function compile(source) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: new URLSearchParams({ source }),
      headers: { referer: "https://www.tradingview.com/" },
    });
    if (res.ok) {
      const body = await res.json();
      return {
        success: body.success === true,
        reason: body.reason ?? "",
        errors: body.result?.errors2 ?? [],
        warnings: body.result?.warnings2 ?? [],
      };
    }
    if (attempt === 4) throw new Error(`TradingView's compiler answered HTTP ${res.status}`);
    await new Promise((r) => setTimeout(r, 2000 * attempt));
  }
}

const rows = [];
let failed = 0;
for (const name of readdirSync(DIR).sort()) {
  const file = join(DIR, name, `${name}.pine`);
  if (!existsSync(file)) continue;
  const r = await compile(readFileSync(file, "utf8"));
  const ok = r.success && r.errors.length === 0 && r.warnings.length === 0;
  if (!ok) failed++;
  rows.push(`| ${name} | ${ok ? "✅ compiled" : "❌ " + (r.reason || "failed")} | ${r.errors.length} | ${r.warnings.length} |`);
  console.log(`${ok ? "ok  " : "FAIL"} ${name}: ${r.errors.length} errors, ${r.warnings.length} warnings`);
  for (const d of [...r.errors, ...r.warnings]) console.log(`     line ${d.start?.line ?? "?"}: ${d.message}`);
}

const summary = ["| Indicator | Result | Errors | Warnings |", "|---|---|:-:|:-:|", ...rows].join("\n");
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## Pine compile check\n\n${summary}\n`);
if (rows.length === 0) {
  console.error("No indicators found");
  process.exit(1);
}
process.exit(failed ? 1 : 0);
