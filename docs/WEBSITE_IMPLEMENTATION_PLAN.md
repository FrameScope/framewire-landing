# FrameWire Public Website — Implementation Plan

> Written **before** any runtime website file is modified, per the build brief.
> Baseline commit: `4f41a25` (main). Repo: `FrameScope/framewire-landing`.

## 1. Repository truth (verified)

- Working dir: `C:\Users\Bishodip\ClaudeFiles\framewire-landing` ✓
- Remote: `https://github.com/FrameScope/framewire-landing.git` ✓
- Branch: `main` ✓
- Old root site = self-unpacking base64 bundle (`index.html` shows `__bundler_thumbnail` /
  "Unpacking…" + browser-side `DecompressionStream`/`atob`) plus two ~1.7 MB
  browser-Babel "tour" HTMLs. This is the **preview-only architecture to be replaced**.
- No `CNAME`, no `.nojekyll`, no `.github/workflows`. `gh` CLI not installed in this env.
- Node 24 / npm 11 available.

## 2. Design handoff (primary authority)

`C:\Users\Bishodip\ClaudeFiles\website-export\FrameWire Design System-handoff (1).zip`
(513 KB) extracted to a temp dir **outside** the source tree. Contents:

- `tokens/{colors,typography,fonts,spacing}.css` — the visual system.
- `styles.css` — manifest that `@import`s the four token files.
- `components/core/*` (Button, Badge, Card, Eyebrow) + `components/evidence/*`
  (ProcessStep, SourceCard, CitationMark) — real React component source.
- `framewire-public-site/preview/*.jsx` — a **complete** public-site implementation
  (Nav, Hero, Problem, 8-stage pipeline, Collect, Archive-first, Clean&Verify,
  Investigation, Understand, Example, Trust, Memory, UseCases, WhyDifferent, Beta,
  FinalCTA, Footer) + **5 graphs** (Flow, Segregation, Lineage, Relationship, Timeline).
- `framewire-public-site/public/framewire-logo-white.png` — the white hex logo.

### Classification of handoff material

| Material | Verdict |
|---|---|
| Token CSS (colors/type/fonts/spacing) | **Reuse directly** → `src/styles/tokens.css` |
| `preview/index.html` inline `.fw-*` utility CSS | **Reuse directly** → `src/styles/global.css` |
| `components/core/*` + `components/evidence/*` | **Reuse after adaptation** → `.tsx`, typed |
| `preview/*.jsx` sections + `graphs.jsx` | **Reuse after adaptation** → `.tsx` modules, ES imports, `lucide-react` |
| `framewire-logo-white.png` | **Reuse directly** → `public/` |
| `_ds_bundle.js`, `_ds_manifest.json`, browser Babel, UMD React, CDN lucide | **Prohibited** (preview-only) — not copied |
| Near-top tester-feedback answers block | **Missing & required** — author new |
| "What FrameWire helps you do" section | **Missing & required** — author new |
| Language (EN/Nepali/OCR) section | **Missing & required** — author new |
| Hero audience line | **Missing & required** — add to Hero |

## 3. Framework decision

**React + TypeScript + Vite** (static SPA), initialized at the **repo root**.
- The current repo has no maintainable production frontend (only a self-unpacking
  preview), so per the brief a lightweight React+TS+Vite project is initialized.
- **Next.js is explicitly avoided** — the deployment target is static GitHub Pages on
  a custom domain; SSR/route infrastructure is unnecessary and heavier.
- Icons via `lucide-react` (tree-shaken explicit imports), replacing CDN UMD lucide.
- No CMS, no graph library, no animation framework, no UI kit. Graphs are SVG/CSS/small
  React components. Motion is CSS + IntersectionObserver only.
- `base: '/'` (custom apex/www domain → root base).

## 4. File structure (target)

```
index.html                      Vite entry (replaces unpacking index)
package.json tsconfig*.json vite.config.ts eslint.config.js .gitignore
public/  framewire-logo-white.png  favicon.svg  og-image.svg  CNAME  .nojekyll  robots.txt
src/
  main.tsx  App.tsx  config.ts
  styles/ tokens.css  global.css
  components/ui/   Icon Button Badge Card Eyebrow ProcessStep SourceCard CitationMark
                   Reveal Section SectionHead Wordmark Refrain
  components/sections/  Nav Hero Clarify(NEW) HelpsYouDo(NEW) Problem Pipeline Collect
                   ArchiveFirst CleanVerify Investigation Understand ExampleInvestigation
                   RelationshipsSection Memory UseCases WhyDifferent Language(NEW) Trust
                   TimelineSection LineageSection FlowSection SegregationSection Beta
                   FinalCTA Footer
  components/graphs/  graphUtils  FlowGraph SegregationGraph LineageGraph
                   RelationshipGraph TimelineGraph
docs/WEBSITE_IMPLEMENTATION_PLAN.md
screenshots/production/   (generated evidence)
.github/workflows/deploy.yml   (Pages build+deploy)
```

## 5. Tester-feedback corrections (required)

A new **"Start here"** clarity block sits directly under the hero (not buried in a tour
or footer) and answers, in plain English: **What is FrameWire? · Who is it for? · What can
I do after signing in? · How is my information handled? · English & Nepali support.**
Plus a dedicated **Language** section and a hero **audience line**
(journalists, researchers, NGOs, analysts, risk & security, policy). Navigation is a
clear sticky bar with an accessible mobile drawer.

## 6. Sign-In & CTA behavior (per operator)

- **No live auth route exists yet.** Sign-In URL is configurable via `SIGNIN_URL` in
  `src/config.ts` (empty by default). While empty, the **Sign In nav item is hidden**
  (desktop + mobile) and absent from the footer — no dead links, no email fallback.
  Setting `SIGNIN_URL` later restores the item automatically.
- `Join the Private Beta` / `Request Private Beta Access` → `mailto:framewireIO@gmail.com`
  (subject pre-filled). `Contact FrameWire` + displayed address → `mailto:framewireIO@gmail.com`.
- `See How FrameWire Works` → smooth-scroll to `#how`. No fake forms. No other email.

## 7. Motion & a11y rules

CSS transitions + IntersectionObserver only; animations run once and settle into a
readable static state; `prefers-reduced-motion: reduce` shows the complete state instantly.
Graph nodes are keyboard-focusable with visible focus and text alternatives; no color-only
meaning (blocked paths carry icon + label); graphs collapse to vertical/list layouts on
mobile with no horizontal overflow. One logical `<h1>`; semantic landmarks; skip link.

## 8. Deployment

GitHub Actions workflow builds Vite and deploys to Pages; `public/CNAME` = `www.framewire.io`.
**Manual step required once (operator):** Settings → Pages → Source = "GitHub Actions".
Until then live-domain verification is a documented external blocker (no `gh`/settings
access from this environment). Vite `base: '/'` keeps direct navigation working on the domain.

## 9. Cleanup

After the new site builds & runs, remove preview-only files: `index.html` (unpacking),
`FrameWire.html`, `FrameWire Beta.html`, `Guided Tour.html`, `Technical Tour.html`,
`.thumbnail`, `uploads/` (standalone browser-Babel tours + form jsx), and the old
root `assets/`/`screenshots/` once superseded. Keep the white logo (moved to `public/`).
Git history is the rollback. No two competing homepages; no broken tour links.
