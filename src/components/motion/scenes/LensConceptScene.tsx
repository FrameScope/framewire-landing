import { useState } from "react";
import { Icon } from "../../ui/Icon";
import { MotionCanvas } from "../MotionCanvas";
import { AnimatedEdge } from "../AnimatedEdge";
import { getRevealProgress } from "../sceneClock";
import { EASING, clamp01 } from "../easing";
import type { SceneProps } from "./shared";

/* Scene 1 — "What is an intelligence lens?"
   One central Investigation; the lenses fan around it and examine the SAME subject
   from different angles. Auto-cycles until the user holds a lens. */

const LENSES = [
  { key: "Narrative", icon: "trending-up", c: "var(--fw-signal)", q: "Which stories are forming, growing, or competing?" },
  { key: "Sentiment", icon: "activity", c: "var(--fw-conflict)", q: "Is coverage turning positive, negative, or divided?" },
  { key: "Emotion", icon: "heart", c: "var(--fw-neutral-mark)", q: "Which emotional signals appear in the content?" },
  { key: "Threat", icon: "triangle-alert", c: "var(--fw-caution)", q: "Are several indicators converging?" },
  { key: "Geography", icon: "map", c: "var(--fw-archive)", q: "Where is the activity concentrated?" },
  { key: "Actors & Institutions", icon: "building-2", c: "var(--fw-signal-bright)", q: "Who is involved, and how are they connected?" },
  { key: "Fact-Check", icon: "badge-check", c: "var(--fw-verified)", q: "What is supported, contradicted, or unresolved?" },
  { key: "Timeline", icon: "clock", c: "var(--fw-signal-ink)", q: "What happened first, and what changed later?" },
  { key: "Memory", icon: "history", c: "var(--fw-archive)", q: "Has this pattern appeared before?" },
];

const CX = 290, CY = 250, R = 188;
const pos = (i: number) => {
  const a = (Math.PI * 2 * i) / LENSES.length - Math.PI / 2;
  return { x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R };
};

export function LensConceptScene({ t, reduced }: SceneProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const auto = reduced || picked != null ? 0 : Math.floor(t / 1.8) % LENSES.length;
  const activeIdx = hover ?? picked ?? auto;
  const active = LENSES[activeIdx];

  return (
    <MotionCanvas
      w={580}
      h={560}
      summary={`One central investigation sits in the middle. Nine intelligence lenses fan around it — ${LENSES.map((l) => l.key).join(", ")} — each examining the same subject from a different angle. The ${active.key} lens is active, asking: ${active.q}`}
    >
      <svg viewBox="0 0 580 560" className="mc-svg" aria-hidden="true">
        {LENSES.map((l, i) => {
          const p = pos(i);
          const on = i === activeIdx;
          return (
            <AnimatedEdge
              key={l.key}
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              p={getRevealProgress(t, 0.4 + i * 0.08, 0.5)}
              color={on ? l.c : "var(--fw-line-bright)"}
              opacity={on ? 0.75 : 0.2}
              width={on ? 2 : 1.2}
              t={t}
              pulse={on}
            />
          );
        })}
      </svg>

      {/* central investigation */}
      <div
        className="mn"
        style={{ left: CX, top: CY, width: 170, opacity: clamp01(getRevealProgress(t, 0.1, 0.5)), transform: "translate(-50%,-50%)", boxShadow: `0 0 28px color-mix(in srgb, ${active.c} 16%, transparent)` }}
      >
        <div className="lc-core-eyebrow">One investigation</div>
        <div className="lc-core-title">Public claim spreading across sources</div>
      </div>

      {/* lens chips */}
      {LENSES.map((l, i) => {
        const p = pos(i);
        const on = i === activeIdx;
        const rp = getRevealProgress(t, 0.4 + i * 0.08, 0.5, EASING.outBack);
        return (
          <button
            key={l.key}
            type="button"
            className={`lc-lens${on ? " on" : ""}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            onClick={() => setPicked(i)}
            aria-pressed={on}
            style={{ left: p.x, top: p.y, opacity: clamp01(rp), transform: `translate(-50%,-50%) scale(${(0.7 + 0.3 * clamp01(rp)) * (on ? 1.05 : 1)})`, borderColor: on ? l.c : undefined }}
          >
            <Icon name={l.icon} size={15} color={on ? l.c : "var(--fw-ink-3)"} />
            <span style={{ color: on ? "var(--fw-ink)" : "var(--fw-ink-2)" }}>{l.key}</span>
          </button>
        );
      })}

      {/* active readout */}
      <div className="lc-readout" style={{ opacity: clamp01(getRevealProgress(t, 1.0, 0.6)), borderColor: `color-mix(in srgb, ${active.c} 45%, transparent)` }}>
        <span className="lc-readout-bar" style={{ background: active.c }} />
        <div>
          <div className="lc-readout-key" style={{ color: active.c }}>{active.key} asks</div>
          <div className="lc-readout-q">{active.q}</div>
        </div>
      </div>
    </MotionCanvas>
  );
}
