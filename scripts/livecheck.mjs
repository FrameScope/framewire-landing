// One-off live-domain verification (dev tooling; not committed/bundled).
import { chromium } from "playwright";

const URL = process.argv[2] || "https://www.framewire.io/";
const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: "no-preference", deviceScaleFactor: 1 });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.setViewportSize({ width: 1280, height: 900 });
const resp = await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(1200);

const data = await page.evaluate(() => {
  const a = [...document.querySelectorAll('a[href^="mailto:"]')].map((x) => x.getAttribute("href"));
  return {
    title: document.title,
    h1: (document.querySelector("h1") || {}).innerText || null,
    sections: document.querySelectorAll("section, header").length,
    graphFigures: document.querySelectorAll('figure[role="group"]').length,
    hasUnpacking: document.body.innerText.includes("Unpacking") || !!document.getElementById("__bundler_loading"),
    bodyLen: document.body.innerText.length,
    mailtos: [...new Set(a)],
    ogImage: (document.querySelector('meta[property="og:image"]') || {}).content || null,
    signInLinks: [...document.querySelectorAll("a")].filter((x) => /sign in/i.test(x.textContent.trim())).length,
  };
});

await page.screenshot({ path: "screenshots/production/LIVE-desktop.png", fullPage: false });
await page.close();
await browser.close();

console.log("HTTP status:", resp && resp.status());
console.log(JSON.stringify(data, null, 2));
console.log("CONSOLE ERRORS:", errors.length, errors.slice(0, 6));
