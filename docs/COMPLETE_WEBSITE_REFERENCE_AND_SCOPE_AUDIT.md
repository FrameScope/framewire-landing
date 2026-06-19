# Complete Website — Reference & Scope Audit

**Inspection date:** 2026-06-19
**Branch:** `complete-framewire-public-site` · **Live `main`:** `d070a75` (renders `ProofScenes`)
**Mode:** inspection only — no runtime source modified, nothing committed/pushed/merged/deployed.

Reference homepages were inspected by fetching the **live pages** on 2026-06-19 (not memory, not
search snippets): youscan.io, brand24.com, talkwalker.com, sprinklr.com, meltwater.com/en,
brandwatch.com.

---

## 1. Current FrameWire state

### What currently exists (live on `main`, deployed to Vercel)
- `src/main.tsx → ProofScenes` — the **six-scene guided tour is the entire homepage**. This is the
  drift to correct: a guided tour became the whole website.
- The approved motion engine and six scenes (below).
- Metadata, favicon, OG image, Vercel deploy, custom domain — all working.

### What is only a guided-tour scene (not a full website section)
- `ProofScenes.tsx` (the full-page stepper). It must become **one section**, not the page.
- The six scenes (lens concept, narrative, threat, author/portal, report, pipeline) are *explanatory
  micro-demos*, not the homepage's hero, lens explorer, tools, audiences, multilingual, memory, or CTA.

### Complete-website sections currently MISSING from the live site
Navigation · Hero · What FrameWire Is · What an Intelligence Lens Is · Full Lens Explorer (13) ·
Investigation Tools (9) · Complete Workflow · Report Studio (standalone) · Human Verification ·
Robust Pipeline (standalone) · Multilingual Intelligence · Audience Use Cases (12) ·
Institutional Memory · Final Recap · Final statement · Apply for Beta · Footer.

### Files that MUST be preserved (do not rebuild)
- `src/components/motion/` — `easing.ts`, `sceneClock.ts`, `MotionCanvas.tsx`, `AnimatedEdge.tsx`, `MotionNode.tsx`, `SceneController.tsx`
- `src/components/motion/scenes/` — `LensConceptScene`, `NarrativeScene`, `ThreatConvergenceScene`, `AuthorPortalScene`, `ReportStudioScene`, `PipelineScene`, `shared.ts`
- `src/styles/motion.css`
- `docs/TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md`
- `src/styles/tokens.css`, `src/styles/global.css`, `src/components/ui/*`, `src/config.ts`

### Work drafted THIS session (uncommitted, NOT wired into `main.tsx`, pending approval of this audit)
These exist but are inert (the entry still renders `ProofScenes`). They are the in-progress complete
homepage. **They must be revised per this audit's reference findings, not rebuilt from zero:**
- `src/site/content.ts` — LENSES (13), TOOLS (9), AUDIENCES (12) — single source of truth. **Keep.**
- `src/components/site/GuidedTour.tsx` — embeddable tour (scoped keyboard). **Keep.**
- `src/components/site/primitives.tsx` — `SiteNav`, `Section`, `Footer`, `useInViewClock`, `useIsNarrow`. **Keep.**
- `src/components/site/scenes.tsx` — `FlowStrip`, `HeroScene`, `WorkflowScene`, `MultilingualScene`, `MemoryScene`. **Keep; diversify layouts.**
- `src/components/site/LensExplorer.tsx`, `ToolsWorkspace.tsx`, `AudienceExplorer.tsx`. **Keep.**
- `src/CompleteHomepage.tsx` — assembly. **Keep; apply the varied layouts in §8 so sections stop looking identical.**

### Work that must NOT be repeated
Re-deriving the motion engine, the scene clock, the six scenes, the lens/tool/audience data, the
Vercel deploy config, or the tokens. Re-pointing `main.tsx` at `ProofScenes`. Rebuilding any drafted
`site/` component from scratch.

---

## 2. Reference-site audit

> Common, repeatable pattern across all six: **hero (headline + subhead + product dashboard visual +
> demo CTA) → trust/logo strip → capability blocks with real product screenshots → use-case/audience
> grouping → case studies/testimonials → awards → multi-column footer**, with **alternating
> image/text rhythm** and **light-to-moderate** text. **Crucial FrameWire constraint:** the reference
> "social proof" engine (client logos, testimonials, awards, big stat counters, customer counts) is
> **prohibited** for FrameWire (no fake customers/claims). FrameWire must substitute *evidence-driven
> product demonstrations and the guided tour* wherever a reference site uses social proof.

### youscan.io — `https://youscan.io/`
- **Structure:** hero (headline + subhead + **product screenshot right**, "Try YouScan") → client logos → feature cards (image alternating L/R) → use-case **tabs** (6) → visual-analysis deep dive → testimonials carousel → awards → blog → trial form.
- **Strong visual pattern:** alternating text-left/image-right feature rows broken by full-width carousels.
- **Strong product-demo pattern:** real annotated product screenshots beside each capability.
- **Useful section-layout pattern:** capability = headline + one screenshot + short copy + "Learn more".
- **Useful audience pattern:** a **single tabbed use-case panel** (one panel, six tabs) — exactly the "one transforming workspace, not N cards" model FrameWire wants.
- **Content-compression pattern:** benefit headline + 1–2 sentences per capability; visuals carry the load.
- **Unsuitable for FrameWire:** client-logo wall, testimonials carousel, award badges (no fake proof).
- **FrameWire adaptation:** keep the tabbed-workspace pattern for Lens Explorer / Tools / Audiences; replace logos/testimonials/awards with the **Guided Tour** + **evidence-principle strip**.

### brand24.com — `https://brand24.com/`
- **Structure:** hero (laurel badge + split value props + "Sign up free", **no hero screenshot**) → trust counts → icon feature cards (3-col) → coverage stats → AI/language section → masterclass → footer.
- **Strong visual pattern:** icon + headline + short copy cards with generous whitespace and decorative dots.
- **Strong product-demo pattern:** weak here — mostly icon cards, **few real screenshots** (a weakness to avoid).
- **Useful section-layout pattern:** simple 3-up benefit grid as a palette-cleanser between richer sections.
- **Useful audience pattern:** audience segments live in nav ("For Enterprise/Agencies/PR…"), not on-page (a weakness — FrameWire should show audiences on-page).
- **Content-compression pattern:** split four-value headline communicates breadth in one line.
- **Unsuitable for FrameWire:** big stat counters (25B+ mentions, 154 countries), 7× repeated "Sign up free", icon-only cards with no product.
- **FrameWire adaptation:** borrow the one-line breadth headline; **avoid** icon-card monotony and stat-counter claims; show audiences on-page via the transforming workspace.

### talkwalker.com — `https://www.talkwalker.com/`
- **Structure:** hero (headline + subhead + **full-width dashboard screenshot** + "Request a demo") → 3 product cards → impact section → case-study cards → "Partnering with…" 4 use-case cards → logos → AI-agent spotlight → footer.
- **Strong visual pattern:** **light text density**, strong alternation between image-heavy and text-light card rows, lots of whitespace.
- **Strong product-demo pattern:** the hero dashboard screenshot (sentiment bars, graphs, global reach) sets the product tone immediately.
- **Useful section-layout pattern:** a **single AI-feature spotlight** (full-width, one big visual) as a centerpiece — maps to FrameWire's **Guided Tour** as the page centerpiece.
- **Useful audience pattern:** "Partnering with…" four use-case cards (PR, social, insights, agencies).
- **Content-compression pattern:** emoji/icon + 3-word card titles + "Read more".
- **Unsuitable for FrameWire:** case-study/testimonial cards with quantified outcomes, customer logos.
- **FrameWire adaptation:** adopt the **hero-with-product-visual** and the **one full-width spotlight** rhythm; the spotlight = Guided Tour; replace case studies with the **illustrative workflow** (no real customers).

### sprinklr.com — `https://www.sprinklr.com/`
- **Structure:** hero (headline + subhead + "Contact us", logos below) → 4 product suites → AI pillar with **tabbed screenshots** → team-based solution sections → testimonials → "Advantage" 3 value props → analyst badges → final CTA.
- **Strong visual pattern:** consistent "section title → intro → cards/tabbed visual → explore link".
- **Strong product-demo pattern:** **tabbed interface that swaps a full-width screenshot per tab** — directly maps to FrameWire's Lens Explorer (select lens → workspace updates).
- **Useful section-layout pattern:** **team-based** solution sections (Marketing/CX/Service) = FrameWire **audience** sections.
- **Useful audience pattern:** three team blocks + industries in footer nav.
- **Content-compression pattern:** 2–4 sentence section intros; "Explore [X]" links defer depth (progressive disclosure).
- **Unsuitable for FrameWire:** heavy enterprise verbosity, analyst/Gartner badges, testimonial carousel, "Contact us" repeated ~15×.
- **FrameWire adaptation:** use the **tab-swaps-the-visual** mechanic for lenses/tools; keep intros short and defer detail; **do not** repeat CTAs or add analyst badges.

### meltwater.com/en — `https://www.meltwater.com/en`
- **Structure:** hero (headline "Intelligence you can act on" + subhead + **animated dashboard mockup** + 2 CTAs) → trust (27,000+ orgs + logos) → "Every signal, One intelligence platform" → 5 capability cards → **tabbed AI-workflow** section → 3-column decision benefits → customer quotes → G2 badges → resource cards → final CTA.
- **Strong visual pattern:** strong alternation; an **animated** dashboard in the hero (not static).
- **Strong product-demo pattern:** animated hero mockup + tabbed workflow content with rotating visuals.
- **Useful section-layout pattern:** **"Every signal → one platform"** unification section — maps perfectly to FrameWire's **"What FrameWire Is"** (sources → one investigation).
- **Useful audience pattern:** named segments (PR/comms/marketing) + implicit workflows.
- **Content-compression pattern:** capability cards + "Learn more"; KPI-tagged quotes (FrameWire must skip KPIs/quotes).
- **Unsuitable for FrameWire:** "27,000+ organizations", named customer quotes with KPIs, G2 badges.
- **FrameWire adaptation:** the **animated hero composition** (already drafted as `HeroScene`) and the **unification section** are the two best borrowings; replace stats/quotes/badges with motion + evidence rules.

### brandwatch.com — `https://www.brandwatch.com/`
- **Structure:** hero (headline + subhead + **rotating 4-slide product carousel** + "Get started"/"Explore plans") → 3 product modules → search-intel callout → 4-card capability grid → 4 full-width feature sections → case-study carousel → testimonial → **solution finder (Use Cases / Industries / Roles pills)** → awards → final CTA.
- **Strong visual pattern:** rotating hero carousel; 4 themed capability cards.
- **Strong product-demo pattern:** hero carousel of product screenshots.
- **Useful section-layout pattern:** **solution finder** with three pill filters (Use Cases / Industries / Roles) — a compact audience entry point.
- **Useful audience pattern:** the three-axis pill switcher (maps to FrameWire's audience workspace tabs).
- **Content-compression pattern:** one-line module names; depth on sub-pages.
- **Unsuitable for FrameWire:** **high text density** in mid-page full-width feature sections (the exact "long text section" trap to avoid), 8× "Get started", awards.
- **FrameWire adaptation:** borrow the **solution-finder switching** idea for audiences; **explicitly avoid** Brandwatch's copy-heavy full-width feature blocks (that is the over-text failure mode).

---

## 3. Technical Tour role

### Motion mechanics to PRESERVE (engine only)
- Wall-clock `requestAnimationFrame` scene clock with `runKey` reset + settle (`useSceneClock`).
- `getRevealProgress(t, start, dur, ease)` + staggered reveal windows as the composition primitive.
- 8-curve easing set with intentional per-element use.
- Progressive `AnimatedEdge` (grow-from-source) + brief, time-gated `SignalPulse`.
- Coordinated `MotionNode` entry + progress-bound glow.
- `MotionCanvas` fixed coordinate space + `ResizeObserver` downscale.
- Synchronous reduced-motion read → complete settled first frame.

### Scene-clock principles to preserve
Reset on scene/lens/tool/audience change · play once · settle to a stable readable state · clean up
rAF/interval/timeout · scroll-trigger via in-view (`useInViewClock`) so sections animate on entry.

### Animation patterns to preserve
Source→archive→…→investigation flows; convergence (many inputs → one bounded output); evidence
lineage with citations back to source; node-by-node reveal; blocked/quarantine markers.

### Tour-shell structure that must NOT be copied
- The **full-screen single-chapter shell** as the page (`ProofScenes` as `main.tsx` entry).
- One header + one centered canvas + one controller as the layout of **every** section (the current
  drift — every section looking like a tour chapter).
- Global arrow-key hijacking (the embeddable `GuidedTour` already scopes keyboard to its region).

### Why the whole website must not become another guided tour
A guided tour is a **linear, single-focus explainer**. A homepage must do IA work the tour cannot:
position the product, orient first-time visitors, group capabilities and audiences, vary rhythm to
hold attention, and route to a single conversion (Apply for Beta). The reference sites prove this:
none is a single linear player — each alternates hero composition, tabbed workspaces, full-width
spotlights, use-case switchers, and a footer. The Guided Tour is **one section** (the centerpiece
"spotlight," à la Talkwalker's AI-agent block), surrounded by differently-shaped sections.

---

## 4. Complete FrameWire page map

| # | Section | Anchor |
|---|---|---|
| 1 | Navigation (sticky) | — |
| 2 | Hero | `#top` |
| 3 | What FrameWire Is | `#what` |
| 4 | What an Intelligence Lens Is | `#lens-intro` |
| 5 | Full Lens Explorer | `#lenses` |
| 6 | Investigation Tools | `#tools` |
| 7 | Technical Intelligence Guided Tour | `#tour` |
| 8 | Complete FrameWire Workflow | `#how-it-works` |
| 9 | Report Studio | `#report-studio` |
| 10 | Human Verification & Approval | (within `#report-studio`) |
| 11 | Robust Technical Pipeline | `#trust` |
| 12 | Multilingual Intelligence | `#multilingual` |
| 13 | Audience Use Cases | `#audiences` |
| 14 | Institutional Memory | `#memory` |
| 15 | Final Recap | `#recap` |
| 16 | Final statement: *"Wiring your frame through different lenses." — FrameWire* | (within `#recap`) |
| 17 | Apply for Beta | `#beta` |
| 18 | Footer | `#contact` |

---

## 5. Full lens inventory (13 — homepage will explain each)
Narrative · Sentiment · Emotion · Threat & Escalation · Geography · Actors & Institutions (public
label for Politico) · Author Intelligence · Portal Intelligence · Fact-Check & Verification ·
Entities & Relationships · Sources & Provenance · Timeline & Recurrence · Investigation Memory.
*(All 13 are present in the drafted `src/site/content.ts → LENSES`, each with definition, question,
examines, identifies, learn, and a limitation/required line.)*

## 6. Tool inventory (9 — homepage will explain each)
Search · Live Timeline · Investigation Workspace · Guided Cognition · Evidence Workspace ·
Data Analytics · Relationship Graph · Tracked Items · Report Studio.
*(All 9 present in `content.ts → TOOLS` with definition, "shows", and limitation.)*

## 7. Audience inventory (12 — transforming workspace)
Journalist · Researcher · NGO · Humanitarian Team · Security & Risk Team · Law-Enforcement /
Public-Safety Analyst · Government Analyst · Political Researcher / Civic Advocate · Diplomatic &
Policy Team · Compliance & Due-Diligence Team · Media & Communications Analyst · General User.
*(All 12 present in `content.ts → AUDIENCES` with subject, sources, question, lenses, output,
safeguard.)*

---

## 8. Visual-layout plan (per section — layouts deliberately varied)

| Section | Purpose | Layout type | Product visual | Motion | Reference pattern adapted | Tour primitive | Mobile | Text limit |
|---|---|---|---|---|---|---|---|---|
| **Nav** | Orient + route | Sticky bar, links + Sign-in (hidden) | — | none | All six (persistent nav) | — | Hamburger drawer | links only |
| **Hero** | Position product | Centered copy **above** wide animated composition | Animated investigation (subject→sources→investigation→lenses→findings→report→citation) | once-on-load, settles | Meltwater animated hero; Talkwalker hero visual | scene clock, AnimatedEdge, MotionNode | Composition recomposes vertical | H1 + 1 sentence + 1 line |
| **What FrameWire Is** | Unification idea | Full-width **evidence-flow strip** + verb row | `FlowStrip` Subject→…→Memory | scroll-triggered draw | Meltwater "every signal → one platform" | FlowStrip (edges+pulse) | strip stacks vertical | 1 lead + 6 labels |
| **Lens intro** | Define a lens | Centered statement + **full-width motion scene** | `LensConceptScene` (fan) | scroll-triggered, auto-cycle bounded | Talkwalker spotlight | reuse scene | one active lens | definition + 1 statement |
| **Full Lens Explorer** | Explain all 13 | **3-pane interactive workspace** (selector \| motif \| detail) | persistent investigation + per-lens motif | reset-on-select | Sprinklr/YouScan tab-swaps-visual | scene clock per select | selector → scroll row; panes stack | def+Q+examines+identifies+limit |
| **Investigation Tools** | Explain 9 tools | **Tabbed transforming workspace** (input→tool→output) | per-tool motif | reset-on-select | Sprinklr tabbed AI | scene clock | tabs scroll; stack | def + "shows" + limit |
| **Guided Tour** | Deep explainer | **Full-width centerpiece** stepper (embedded) | the six scenes | per-scene, controls | Talkwalker AI-agent spotlight | the whole tour | scene compacts; vertical pipeline | per-scene short |
| **Complete Workflow** | One investigation end-to-end | **Phase strip + revealed 24-step ribbon** | 5 phase nodes + step list | scroll-triggered sequence | YouScan deep-dive; Meltwater workflow tabs | FlowStrip + reveal | phase strip hidden; steps stack | terse steps |
| **Report Studio + Human Verification** | Show report is human-made | **Full-width scene + split two-column lists** (AI assists \| Humans decide) | `ReportStudioScene` | scroll-triggered | Talkwalker spotlight + Sprinklr split | reuse scene | scene then stacked lists | scene + 2 short lists |
| **Robust Pipeline** | Trust/safety | **Source row + full-width pipeline + rules list** | `PipelineScene` | scroll-triggered; vertical on mobile | YouScan deep-dive | reuse scene | pipeline vertical | 1 lead + 7 rules |
| **Multilingual** | Cross-language | **Split editorial** (copy + evidence-flow scene) | `MultilingualScene` | scroll-triggered | Talkwalker light alternation | FlowStrip-style | stacks | 1 lead + 1 statement + 1 note |
| **Audience Use Cases** | Who it's for | **Transforming audience workspace** (12 tabs) | role workspace panel | swap-on-select | YouScan use-case tabs; Brandwatch solution-finder | swap animation | tabs scroll; panel stacks | per-role short fields |
| **Institutional Memory** | Continuity | **Full-width motion scene** | `MemoryScene` | scroll-triggered | Talkwalker spotlight | reuse primitives | recompose | 1 lead + 1 line |
| **Final Recap** | Whole picture | **Full-width recap strip** + centered quote | `FlowStrip` (9 stages) | scroll-triggered | Meltwater closing summary | FlowStrip | strip vertical | quote only |
| **Apply for Beta** | Single conversion | **Full-width closing composition** with button over settled evidence line | settled `FlowStrip` behind button | settled (restrained) | All six final-CTA blocks | FlowStrip settled | button stays visible | eyebrow+H+1 line+email |
| **Footer** | Routing + contact | Multi-link footer (FrameWire-sized, not 6 enterprise columns) | — | none | All six footers (adapted smaller) | — | stacks | links + email |

**Rhythm rule:** alternate `band`/plain backgrounds; never use the tour chapter shell (header +
single centered canvas + controller) for non-tour sections. Mix: hero composition · flow strips ·
3-pane explorer · tabbed workspaces · full-width spotlight (tour) · split editorial · transforming
audience workspace · closing CTA.

---

## Proof of inspection

**Six URLs inspected (live, 2026-06-19):**
1. `https://youscan.io/` — one concise observation: capabilities shown as alternating screenshot rows + a **single tabbed use-case panel** (six tabs) rather than six cards.
2. `https://brand24.com/` — relies on **icon cards + big stat counters**, repeats "Sign up free" ~7×, and hides audiences in nav (the monotony/claims trap to avoid).
3. `https://www.talkwalker.com/` — **light text**, hero dashboard screenshot, and one **full-width AI-agent spotlight** as a centerpiece (maps to the Guided Tour as one section).
4. `https://www.sprinklr.com/` — **tabbed interface swaps a full-width screenshot** per capability and uses **team-based** solution sections (maps to lens/tool/audience switching).
5. `https://www.meltwater.com/en` — **animated** hero dashboard + an **"every signal → one platform"** unification section (maps to Hero + "What FrameWire Is").
6. `https://www.brandwatch.com/` — rotating hero carousel + a **solution-finder pill switcher** (Use Cases/Industries/Roles), but **copy-heavy** mid-page feature blocks (the over-text failure to avoid).

**Local files inspected:** `src/main.tsx` (live entry → ProofScenes), `src/ProofScenes.tsx`,
`src/components/motion/*` + `src/components/motion/scenes/*` (engine + six scenes),
`src/styles/motion.css`, `docs/TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md`, `src/config.ts`,
`src/styles/tokens.css`, and this session's drafted `src/site/content.ts`,
`src/components/site/*`, `src/CompleteHomepage.tsx`.

**Audit document path:** `docs/COMPLETE_WEBSITE_REFERENCE_AND_SCOPE_AUDIT.md` (this file).

**Proposed component tree (target):**
```
src/main.tsx → CompleteHomepage            (branch only; main.tsx currently still → ProofScenes)
src/CompleteHomepage.tsx                    [drafted · revise layouts per §8]
├── components/site/primitives.tsx          [drafted] SiteNav · Section · Footer · useInViewClock · useIsNarrow
├── components/site/scenes.tsx              [drafted] HeroScene · FlowStrip · WorkflowScene · MultilingualScene · MemoryScene
├── components/site/LensExplorer.tsx        [drafted] 3-pane, 13 lenses
├── components/site/ToolsWorkspace.tsx      [drafted] tabbed, 9 tools
├── components/site/AudienceExplorer.tsx    [drafted] 12 roles
├── components/site/GuidedTour.tsx          [drafted] embeds the 6 scenes (scoped keyboard)
├── site/content.ts                         [drafted] LENSES(13) · TOOLS(9) · AUDIENCES(12) · FLOWS
├── styles/site.css                         [NEW — not yet written]
└── reuses (PRESERVE):
    components/motion/{easing,sceneClock,MotionCanvas,AnimatedEdge,MotionNode,SceneController}
    components/motion/scenes/{LensConcept,Narrative,ThreatConvergence,AuthorPortal,ReportStudio,Pipeline,shared}
    components/ui/* · styles/{tokens,global,motion}.css · config.ts
```

**Preserved existing components (do not rebuild):** the entire `components/motion/` engine, the six
`components/motion/scenes/*`, `motion.css`, `tokens.css`, `global.css`, `components/ui/*`, `config.ts`,
`ProofScenes.tsx` (kept as the standalone tour), and `docs/TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md`.

**New components still required (after approval):** `src/styles/site.css` (only file not yet drafted);
plus layout revisions inside the drafted `site/*` components to apply §8's varied layouts (split
editorial, full-width spotlight framing, solution-finder-style audience switch) so sections stop
resembling the tour shell. Possibly a small **evidence-principles strip** to replace the reference
"client-logo/trust" pattern honestly.

**Work that must NOT be rebuilt:** motion engine · six scenes · lens/tool/audience data · tokens ·
deploy config · the already-drafted `site/*` components (revise, don't recreate).
