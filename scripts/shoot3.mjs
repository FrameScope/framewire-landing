// Capture the visual-direction prototype states. Dev tooling only.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = "http://localhost:4173/";
const OUT = "screenshots/production/complete-product";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: "no-preference", deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);

// Hero — let the once-run sequence settle
await page.waitForTimeout(4200);
await page.locator("#top").screenshot({ path: `${OUT}/hero-settled.png` });

// Intelligence flow — drive each stage and capture the workspace
const stages = ["narrative", "sentiment", "emotion", "threat", "geography", "report"];
const flowWin = page.locator(".iflow-desktop .pw").first();
await flowWin.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
for (let i = 0; i < stages.length; i++) {
  await page.locator(".iflow-desktop .iflow-step").nth(i).click();
  await page.waitForTimeout(1300);
  await flowWin.screenshot({ path: `${OUT}/flow-${stages[i]}.png` });
}

// Audience modes — Journalist (0), Security (3), Diplomat (6)
const modeWin = page.locator("#modes .pw").first();
await modeWin.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const modes = [[0, "journalist"], [3, "security"], [6, "diplomat"]];
for (const [idx, name] of modes) {
  await page.locator(".aw-tab").nth(idx).click();
  await page.waitForTimeout(650);
  await modeWin.screenshot({ path: `${OUT}/audience-${name}.png` });
}
await page.close();
await ctx.close();

// Mobile — vertical story
const m = await browser.newContext({ reducedMotion: "no-preference", deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.setViewportSize({ width: 390, height: 844 });
await mp.goto(URL, { waitUntil: "networkidle" });
await mp.evaluate(() => document.fonts && document.fonts.ready);
await mp.waitForTimeout(4200);
await mp.screenshot({ path: `${OUT}/mobile-hero.png` });
// Mobile flow (stacked) — scroll a couple of stages into view and let them play
await mp.locator(".iflow-mobile .pw").nth(0).scrollIntoViewIfNeeded();
await mp.waitForTimeout(1400);
await mp.screenshot({ path: `${OUT}/mobile-flow.png` });
await mp.locator("#modes .pw").first().scrollIntoViewIfNeeded();
await mp.waitForTimeout(800);
await mp.screenshot({ path: `${OUT}/mobile-modes.png` });
await mp.close();
await m.close();

// Reduced-motion settled state (desktop)
const rm = await browser.newContext({ reducedMotion: "reduce", deviceScaleFactor: 2 });
const rp = await rm.newPage();
await rp.setViewportSize({ width: 1440, height: 900 });
await rp.goto(URL, { waitUntil: "networkidle" });
await rp.evaluate(() => document.fonts && document.fonts.ready);
await rp.waitForTimeout(600);
await rp.locator("#top").screenshot({ path: `${OUT}/reduced-motion-hero.png` });
await rp.locator(".iflow-desktop .pw").first().scrollIntoViewIfNeeded();
await rp.waitForTimeout(300);
await rp.locator(".iflow-desktop .pw").first().screenshot({ path: `${OUT}/reduced-motion-flow.png` });
await rp.close();
await rm.close();

await browser.close();
console.log("DONE shoot3");
