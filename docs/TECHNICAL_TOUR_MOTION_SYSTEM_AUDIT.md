# Technical Intelligence Tour — Motion System Audit

**Source bundle:** `TECHNICAL INTELLIGENCE TOUR-handoff.zip`
(operator copy: `C:\Users\Bishodip\Desktop\software Daigram\Alternative\…`,
extracted **outside** the repo to `C:\Users\Bishodip\framewire-tour-handoff\`).

**Files inspected (in full):** `README.md`, `project/Technical Intelligence Tour.html` (loader),
`project/tour/engine.jsx`, `project/tour/tokens.css`, `project/tour/app.jsx`,
`project/tour/chapters.jsx`, `project/tour/diagrams_a.jsx`, `project/tour/diagrams_b.jsx`,
`project/tweaks-panel.jsx`. Also present: `tour/assets/logo.png`, `uploads/Final logo.png`,
and a 1.7 MB self-contained `FrameWire Technical Intelligence Tour (standalone).html` (the
self-unpacking preview build — inspected structurally; it is the rejected preview artifact).

This audit is the prerequisite for Gate 2. It records what the tour does, then maps each
mechanism onto a production-safe React + TypeScript + Vite equivalent that keeps **FrameWire's
existing visual identity** (`--fw-*` tokens), not the tour's indigo "PulseFeed" palette.

---

## 1. Scene-clock architecture

`useFwClock(runKey, { motion = 1 })` in `engine.jsx`:

- State `t` initialised to `motion === 0 ? 999 : 0` — i.e. **settled immediately** when motion is off.
- On effect (deps `[runKey, motion]`): captures `performance.now()` as `startWall`, then a
  `requestAnimationFrame` loop sets `t = ((now - startWall) / 1000) * motion` — **wall-clock seconds**,
  so progress is correct regardless of frame cadence.
- A `setInterval(update, 200)` runs as a **fallback driver** so reveals keep progressing if rAF is
  throttled (hidden tab).
- Cleanup cancels the rAF and clears the interval.
- **Reset rule:** because `runKey` is a dependency, changing it tears down and restarts the clock at 0.
  In `app.jsx` the run key is the chapter `index`, so each chapter replays its reveal on arrival.

**Production mapping → `useSceneClock(runKey, { reduced })`:** identical wall-clock + rAF model, but:
adds a `setTimeout` settle (stop ticking a few hundred ms after the longest reveal window to avoid a
forever-running loop — the tour relies on ambient loops, which we mostly drop); when `reduced` is true
returns a constant settled time and starts no rAF/interval at all (no incomplete first frame); cleans up
rAF + interval + timeout. Reset on `runKey` change (section first-activation, lens/tool/audience change,
Prev/Next, Replay).

## 2. Reveal-progress function

`fwReveal(t, start, dur = 0.6, ease = outCubic) → ease(clamp((t - start) / dur, 0, 1))` → a clamped
0..1 eased progress for an element that begins at `start` and lasts `dur` seconds. Complex scenes are
composed of **many coordinated reveal windows** with staggered `start` values (e.g. `0.5 + i*0.1`),
never generic CSS fades.

**Production mapping → `getRevealProgress(t, start, dur, ease)`** — same clamped/eased contract,
typed `(t:number, start:number, dur?:number, ease?:Easing)=>number`.

## 3. Timing model

- Units are **seconds**. Reveal windows are short (`0.4–0.9 s`) and staggered by `~0.06–0.22 s`.
- Story beats are ordered by ascending `start`: edges/nodes appear, then labels, then takeaway notes
  (`start ≈ 2.0–3.3`). Closing/sign-off beats sit latest.
- `app.jsx` applies a `MOTION_MUL` (off 0 / calm 0.8 / standard 1.1 / lively 1.5) — a global pace knob.
- Autoplay dwell per chapter: showcase 11 s, closing 12 s, else 8.8 s, divided by the multiplier.

**Production mapping:** keep seconds + staggered windows. Replace the public multiplier with a fixed
calm pace (FrameWire identity = calm motion). Autoplay is **optional and off by default** (see §11).

## 4. Easing functions

`FW_Ease`: `linear, inCubic, outCubic, inOutCubic, outQuart, outExpo, outBack, inOutSine`
(standard formulas; `outBack` uses `c1 = 1.70158`). Intended usage:
- **outCubic** → text / interface reveal
- **outExpo** → fast calculations + settling (also used by `CountUp`)
- **outBack** → node / badge / chip *formation* (slight overshoot)
- **inOutCubic** → state transformations
- **inOutSine** → calm ambient movement

**Production mapping → `easing.ts`** exporting the same eight curves with the same intended usage.

## 5. Edge-drawing method

`EdgeLine` (SVG, in `diagrams_a.jsx`): given endpoints `(x1,y1)-(x2,y2)` and progress `p`, draws a
`<line>` from the source to the **interpolated** point `(x1+(x2-x1)p, y1+(y2-y1)p)` — the edge *grows*
toward its destination. Options: `width`, `color`, `opacity`, `dashed` (`strokeDasharray '3 5'` — used
for *suggested* vs solid *supported* relationships). The `Connector` primitive additionally renders a
triangular **arrowhead** once `p > 0.85`.

**Production mapping → `AnimatedEdge`:** same interpolated-grow line in SVG user units; `solid` vs
`dashed` prop to distinguish supported vs suggested relationships; optional arrowhead near completion;
the completed edge **stays visible** (does not retract).

## 6. Pulse and signal behaviour

In `EdgeLine`, when `pulse` is set and `p > 0.35`, up to 2 small filled circles travel the path at
`f = ((t * pulseSpeed) + k*0.5) % 1`, drawn only while `f <= p` (so a pulse never runs ahead of the
drawn edge), with a `drop-shadow` glow. `pulseSpeed ≈ 0.3–0.5`.

**Production mapping → `SignalPulse`** (used inside `AnimatedEdge`): same travel-along-path dot, but
pulses **run briefly during the explanation window and then stop/slow** (gated to a time window, not an
endless loop) to honour the "do not animate every completed path continuously" rule and the
performance/CPU budget.

## 7. Node-entry behaviour

`NodeBox` + the chip/badge patterns enter through coordinated **opacity + translate + scale**, often
with `outBack` for a subtle formation overshoot (chips scale `0.6→1`). Active nodes get a brighter
border, a tinted background, an accent marker bar, and a controlled box-shadow **glow** keyed to the
reveal progress (`glow = fwReveal(...)`, shadow blur `∝ glow`). Sequence: node forms → label resolves
→ edge connects → signal arrives → active state → output reveal. No physics, floating, or force layout.

**Production mapping → `MotionNode`:** opacity/translate/scale entry (outBack option), `active` state
(brighter `--fw-line-strong`/signal border + `--fw-signal-wash` fill + accent marker), and a glow whose
intensity tracks a passed progress value. No drift/physics.

## 8. Glow behaviour

Glow is **restrained and progress-bound**: `boxShadow: 0 0 {28*glow}px rgba(accent,{0.22*glow})` — it
fades in with the reveal and never pulses on content forever. Ambient radial glow sits only on the page
background (`radial-gradient(... accent14 ...)`).

**Production mapping:** reuse FrameWire's existing `--fw-glow-signal` / `--shadow-signal` and the same
"glow ∝ progress, ambient-only-on-background" rule. No glow on text.

## 9. Diagram coordinate system

Every diagram declares an **intrinsic** width/height (e.g. `Canvas w={560} h={520}`) and positions
nodes with absolute px inside that fixed box; SVG layers use a matching `viewBox="0 0 w h"` with
`preserveAspectRatio` default. Node centres use `translate(-50%,-50%)` (`GNode`). This gives one stable
internal coordinate space the whole scene is authored in.

**Production mapping → `MotionCanvas`:** identical — author in a fixed `w × h` user space; SVG edges and
HTML nodes share those coordinates.

## 10. Responsive scaling

`Canvas` measures its container with a `ResizeObserver`, computes `scale = min(1, clientWidth / w)`, and
applies `transform: scale(scale)` with `transformOrigin: top center`, while the wrapper height is set to
`h * scale` so layout reserves the right space. It only ever scales **down**.

**Production mapping → `useResponsiveCanvas` + `MotionCanvas`:** same ResizeObserver down-scale to avoid
horizontal overflow. **Divergence required by the brief:** mobile must *not* be only a shrink — for the
proof scenes the canvas additionally **recomposes** (taller/narrower internal layouts, one active lens at
a time, vertically-stacked pipeline) at a breakpoint, instead of squashing the desktop diagram.

## 11. Scene-activation rules

`app.jsx` keys the clock to the chapter `index`; arriving at a chapter resets motion. Keyboard:
`←/PageUp` prev, `→/PageDown` next, `Space` toggles autoplay, `Home` first, `Esc` close menu. Autoplay
advances via `setTimeout` and **stops at the last chapter**. Progress dots show done/current; clicking a
dot jumps. Inputs are excluded from key handling.

**Production mapping → `SceneController`:** Prev / Next / **Replay** / direct stage dots, all real
`<button>`s with accessible names + `aria` state. Keyboard: `←` prev, `→` next, `Home` first, `End`
last (per brief). Autoplay is **optional, off by default, stops on any user interaction, never traps the
keyboard, never restarts unexpectedly**. The clock `runKey` is the active scene/lens/tool/audience index,
so every selection resets motion. Activation on scroll uses the existing `useInView`.

## 12. Settled-state behaviour

Because progress is `clamp(...,0,1)`, once `t` passes the last reveal window every element sits at its
final opacity/transform/width — a **stable, fully readable** end state. Pulses are the only thing that
would keep moving; in production they are time-gated so the scene goes quiet when settled.

## 13. Reduced-motion behaviour

The tour only approximates this: `motion === 0` (Tweaks → Pace → off) initialises the clock to `999`,
so a settled frame renders. There is **no `prefers-reduced-motion` media-query wiring** in the tour.

**Production mapping (stricter, per brief):** read `prefers-reduced-motion` **synchronously** in a lazy
`useState` initialiser (this repo already fixed `usePRM` to do exactly this — reuse the pattern). When
reduced: `useSceneClock` returns the settled time constant and starts **no** rAF/interval, so all nodes,
edges, final labels, blocked paths, citations, and human-review states render on the **first** frame —
no incomplete first frame, no later update. Every interaction (Prev/Next/Replay/select) still works.

## 14. Production-safe ideas to reuse

- Wall-clock rAF scene clock with a `runKey` reset and interval fallback.
- `getRevealProgress` + staggered reveal windows as the single composition primitive.
- The full 8-curve easing set with intentional per-element usage.
- Grow-from-source SVG edges; solid vs dashed = supported vs suggested; arrowhead near completion;
  brief, time-gated signal pulses; completed edges persist.
- Coordinated node entry (opacity/translate/scale + outBack), active border/fill/marker, progress-bound glow.
- Fixed intrinsic coordinate space + ResizeObserver down-scale (`MotionCanvas`).
- `CountUp` (outExpo) for any numeric reveals.
- Central-subject + fanned-lenses composition (one workspace, many lenses).
- Convergence composition (many independent inputs → one bounded output) — reused for Threat and Report.
- Bottom-up evidence/explainability composition (sources → reasoning → conclusion, "inspect source by source").

## 15. Preview-only architecture that MUST be rejected

- **Browser Babel** (`@babel/standalone`) + `type="text/babel"` script tags — runtime JSX compilation.
- **UMD React / ReactDOM** from unpkg (`react.development.js`, etc.).
- **`Object.assign(window, …)`** global module wiring; components read collaborators off `window`.
- **`ReactDOM.createRoot` inside `app.jsx`** as a self-contained preview app.
- The **self-unpacking standalone HTML**, `__bundler_thumbnail`, `ext-resource-dependency`, and
  `window.__resources` host plumbing.
- **`tweaks-panel.jsx`** — the public Tweaks panel + `__activate_edit_mode` postMessage host protocol +
  `localStorage` design knobs + `EDITMODE-BEGIN/END` markers. Pure design-tool tooling.
- A **full-screen fixed tour shell** (`position:absolute; inset:0; overflow:hidden`) as the entire site.
- The tour's **indigo "PulseFeed" palette** (`#7C8CFF`/`#A78BFA`) and `tokens.css` `--pf-*` variables,
  and the **`ParticleField`** drifting-dots ambient — all replaced by FrameWire identity (`--fw-*`,
  signal-blue) and the brief's prohibition on particle clouds.

---

## Production motion architecture plan (Gate 2)

New module `src/components/motion/` (TypeScript, no new deps):

| File | Exports | Role |
|---|---|---|
| `easing.ts` | `EASING` (8 curves), `type Easing` | easing set (§4) |
| `sceneClock.ts` | `useSceneClock`, `getRevealProgress`, `useReducedMotion` | clock + reveal + PRM (§1,2,13) |
| `MotionCanvas.tsx` | `MotionCanvas`, `useResponsiveCanvas` | fixed coord space + ResizeObserver downscale (§9,10) |
| `AnimatedEdge.tsx` | `AnimatedEdge`, `SignalPulse` | grow-in SVG edge + brief pulse (§5,6) |
| `MotionNode.tsx` | `MotionNode`, `MotionReveal`, `CountUp` | node entry / reveal wrapper / count-up (§7,2) |
| `SceneController.tsx` | `SceneController` | Prev/Next/Replay/dots + keyboard + optional autoplay (§11) |
| `motion.css` | — | scene/canvas/control classes, reduced-motion + mobile rules |

**Six proof scenes** (`src/components/motion/scenes/…`), rendered by a review-only
`src/ProofScenes.tsx` page (entry temporarily pointed from `main.tsx` on this branch only — never
committed/merged):

1. `LensConceptScene` — one central Investigation, lenses fan in one at a time ("same subject, different angle").
2. `NarrativeScene` — fragments → similar phrases connect → clusters form → one grows / one declines → competing collide; evidence stays attached.
3. `ThreatConvergenceScene` — **independent** inputs (recurring narrative, actor involvement, emotional pressure, geography, timeline recurrence, supporting + contradicting evidence, missing info) draw into one bounded escalation view with supporting/contradicting/uncertainty + human-review requirement. **Not** Emotion→Threat.
4. `AuthorPortalScene` — two clearly different workspaces: Author Intelligence (one author's articles → recurring topics/tone over time) vs Portal Intelligence (one domain → many authors, topic concentration, publishing frequency).
5. `ReportStudioScene` — lens findings → user selection → evidence travels with each finding → AI assists (gaps/contradiction/uncertainty) → **Human Review** approve/edit/reject → final approval unlocks an evidence-linked report with citations drawing back to sources. Report never appears automatically.
6. `PipelineScene` — Ingest → Archive → Extract → Clean → Normalize → Sort → Verify → Engine Eligible → Investigation, with duplicate branching, **Quarantine** isolation, and visually **blocked** invalid paths (Raw→Lens, Quarantined→Lens, Unverified→Report).

All scenes: accessible SVG `<title>/<desc>`, text summary, settled fallback, reduced-motion settled
render, mobile recomposition, visible focus, no hover-only/colour-only meaning, rAF cleanup.
