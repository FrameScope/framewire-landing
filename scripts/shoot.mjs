// Local screenshot + motion-evidence capture from the running production preview
// (http://localhost:4173). Dev tooling only — not part of the site bundle.
// Run: node scripts/shoot.mjs   (requires `vite preview` on :4173 + playwright)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = "http://localhost:4173/";
const OUT = "screenshots/production";
mkdirSync(OUT, { recursive: true });

const settle = async (page, ms = 1200) => {
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(ms);
};

const browser = await chromium.launch();

/* ── 1. Stills (reduced-motion → every reveal/graph shows its settled state) ── */
const still = await browser.newContext({ reducedMotion: "reduce", deviceScaleFactor: 2 });

// Desktop full page
let page = await still.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle" });
await settle(page);
await page.screenshot({ path: `${OUT}/homepage-desktop.png`, fullPage: true });

// Section / graph clips on desktop
const clip = async (selector, name) => {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await el.screenshot({ path: `${OUT}/${name}.png` });
};
await clip("#how", "workflow");
await clip("#flow figure", "graph-flow");
await clip("#lineage figure", "graph-lineage");
await clip("#relationships figure", "graph-relationship");
await clip("#timeline figure", "graph-timeline");
await clip("#segregation figure", "graph-segregation");
await clip("#beta", "beta");
await clip("#start", "clarify");
await page.close();

// Mobile full page
page = await still.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(URL, { waitUntil: "networkidle" });
await settle(page);
await page.screenshot({ path: `${OUT}/homepage-mobile.png`, fullPage: true });
await page.close();
await still.close();

/* ── 2. Motion evidence (normal motion) — sequential frames ─────────────── */
const motion = await browser.newContext({ reducedMotion: "no-preference", deviceScaleFactor: 1.5 });
page = await motion.newPage();
await page.setViewportSize({ width: 1100, height: 900 });
await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);

const shotFigure = async (sectionSel, path) => {
  await page.locator(`${sectionSel} figure`).first().screenshot({ path });
};

// Workflow progression: drive the staged draw-in on the source→understanding flow
await page.locator("#flow figure").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.evaluate(() => { const e = document.querySelector("#flow .fw-flow"); if (e) e.dataset.active = "false"; });
await page.waitForTimeout(60);
await shotFigure("#flow", `${OUT}/motion-workflow-1.png`);
await page.evaluate(() => { const e = document.querySelector("#flow .fw-flow"); if (e) e.dataset.active = "true"; });
await page.waitForTimeout(200);
await shotFigure("#flow", `${OUT}/motion-workflow-2.png`);
await page.waitForTimeout(800);
await shotFigure("#flow", `${OUT}/motion-workflow-3.png`);

// Evidence-lineage tracing: clicking a node traces the chain back to the source
await page.locator("#lineage figure").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const linBtns = page.locator("#lineage .fw-lin-btn");
await linBtns.nth(0).click();
await page.waitForTimeout(350);
await shotFigure("#lineage", `${OUT}/motion-lineage-1.png`);
await linBtns.nth(3).click();
await page.waitForTimeout(350);
await shotFigure("#lineage", `${OUT}/motion-lineage-2.png`);
await linBtns.nth(5).click();
await page.waitForTimeout(350);
await shotFigure("#lineage", `${OUT}/motion-lineage-3.png`);

// Data-segregation blocking: reveal → settled state with blocked-path indicators
await page.locator("#segregation figure").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.evaluate(() => { const e = document.querySelector("#segregation .fw-seg"); if (e) e.dataset.active = "false"; });
await page.waitForTimeout(60);
await shotFigure("#segregation", `${OUT}/motion-segregation-1.png`);
await page.evaluate(() => { const e = document.querySelector("#segregation .fw-seg"); if (e) e.dataset.active = "true"; });
await page.waitForTimeout(900);
await shotFigure("#segregation", `${OUT}/motion-segregation-2.png`);
await page.close();
await motion.close();

/* ── 3. OG image (1200×630) ─────────────────────────────────────────────── */
const og = await browser.newContext({ deviceScaleFactor: 1 });
page = await og.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><body style="margin:0">
<div style="width:1200px;height:630px;background:#05060A;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:28px;font-family:'Segoe UI',system-ui,sans-serif;position:relative">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 0%, rgba(47,127,224,0.16) 0%, transparent 70%)"></div>
  <svg width="96" height="96" viewBox="0 0 64 64"><g transform="translate(32 32)" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <path d="M0 -22 L19 -11 L19 11 L0 22 L-19 11 L-19 -11 Z" stroke="#F4F6FB" stroke-width="3.4"/>
    <path d="M0 -12 L10.4 -6 L10.4 6 L0 12 L-10.4 6 L-10.4 -6 Z" stroke="#2F7FE0" stroke-width="3.4"/>
  </g></svg>
  <div style="font-size:64px;font-weight:700;letter-spacing:-0.03em;color:#F4F6FB">Understand Before Concluding.</div>
  <div style="font-size:26px;color:#AEB4C2;max-width:900px;text-align:center;line-height:1.4">Turn fragmented information into traceable, evidence-backed investigations.</div>
  <div style="font-size:15px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#6B7280">Observe&nbsp;·&nbsp;Question&nbsp;·&nbsp;Investigate&nbsp;·&nbsp;<span style="color:#2F7FE0">Understand</span></div>
</div></body></html>`);
await page.waitForTimeout(200);
await page.locator("div").first().screenshot({ path: "public/og-image.png" });
await page.close();
await og.close();

await browser.close();
console.log("DONE: screenshots in", OUT, "+ public/og-image.png");
