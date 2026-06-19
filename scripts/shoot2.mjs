// High-res capture of the refined hero + new Intelligence Lenses / Report Studio
// sections and their interactive states. Dev tooling only.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = "http://localhost:4173/";
const dirs = ["refined-hero", "intelligence-lenses", "report-studio"];
dirs.forEach((d) => mkdirSync(`screenshots/production/${d}`, { recursive: true }));

const browser = await chromium.launch();

const clip = async (page, sel, path) => {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
  await el.screenshot({ path });
};

/* ---- Stills (reduced motion → settled states) ---- */
const still = await browser.newContext({ reducedMotion: "reduce", deviceScaleFactor: 2 });
let page = await still.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(600);

await page.screenshot({ path: "screenshots/production/refined-hero/hero-desktop.png" });           // hero, no beta button
await clip(page, ".fw-nav", "screenshots/production/refined-hero/nav-desktop.png");
await clip(page, "#lenses", "screenshots/production/intelligence-lenses/lenses-desktop.png");
await clip(page, "#connected-lenses figure", "screenshots/production/intelligence-lenses/connected-settled.png");
await clip(page, "#report-studio", "screenshots/production/report-studio/report-desktop.png");
await clip(page, "#report-studio figure", "screenshots/production/report-studio/report-graph-settled.png");

// expanded lens card (Threat → shows limitation)
await page.locator('#lenses [aria-label="Threat and Escalation"]').click();
await page.waitForTimeout(450);
await clip(page, "#lenses", "screenshots/production/intelligence-lenses/lenses-threat-expanded.png");
await page.close();

// Mobile stills
page = await still.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(600);
await clip(page, "#lenses", "screenshots/production/intelligence-lenses/lenses-mobile.png");
await clip(page, "#connected-lenses figure", "screenshots/production/intelligence-lenses/connected-mobile.png");
await clip(page, "#report-studio", "screenshots/production/report-studio/report-mobile.png");
await page.close();
await still.close();

/* ---- Interactive selected states (normal motion; hover sets selection) ---- */
const live = await browser.newContext({ reducedMotion: "no-preference", deviceScaleFactor: 2 });
page = await live.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(500);

const hoverShot = async (hoverSel, clipSel, path) => {
  const fig = page.locator(clipSel).first();
  await fig.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.locator(hoverSel).first().hover();
  await page.waitForTimeout(450);
  await fig.screenshot({ path });
};

// Connected-lenses selected states
await hoverShot('.fw-cl-node[aria-label="Narrative"]', "#connected-lenses figure", "screenshots/production/intelligence-lenses/connected-narrative.png");
await hoverShot('.fw-cl-node[aria-label="Threat"]', "#connected-lenses figure", "screenshots/production/intelligence-lenses/connected-threat.png");
await hoverShot('.fw-cl-node[aria-label="Claims"]', "#connected-lenses figure", "screenshots/production/intelligence-lenses/connected-claims.png");
await hoverShot('.fw-cl-node[aria-label="Report Studio"]', "#connected-lenses figure", "screenshots/production/intelligence-lenses/connected-report.png");

// Report Studio graph selected states
await hoverShot('.fw-rs-chip[aria-label="Threat"]', "#report-studio figure", "screenshots/production/report-studio/report-threat.png");
await hoverShot('.fw-rs-chip[aria-label="Claims"]', "#report-studio figure", "screenshots/production/report-studio/report-claims.png");
await hoverShot('.fw-rs-stage[aria-label="Record uncertainty"]', "#report-studio figure", "screenshots/production/report-studio/report-confidence.png");
await hoverShot('.fw-rs-output', "#report-studio figure", "screenshots/production/report-studio/report-lineage.png");

await page.close();
await live.close();
await browser.close();
console.log("DONE shoot2");
