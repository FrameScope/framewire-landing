import { Icon } from "../../ui/Icon";
import { MotionCanvas } from "../MotionCanvas";
import { AnimatedEdge } from "../AnimatedEdge";
import { getRevealProgress } from "../sceneClock";
import { EASING, clamp01 } from "../easing";
import type { SceneProps } from "./shared";

/* Scene 2 — Narrative. Scattered source fragments connect into a few dominant
   narratives; one grows, one declines, two compete. Evidence stays attached. */

const CLUSTERS = [
  { label: "Relief-policy story", status: "Growing", trend: "▲", c: "var(--fw-signal)", x: 175, y: 140 },
  { label: "Funding-doubt story", status: "Fading", trend: "▼", c: "var(--fw-ink-3)", x: 445, y: 150 },
  { label: "Local-impact story", status: "Competing", trend: "⇄", c: "var(--fw-caution)", x: 305, y: 330 },
];

const FRAGMENTS = [
  { x: 40, y: 60, c: 0 }, { x: 120, y: 30, c: 0 }, { x: 60, y: 230, c: 0 },
  { x: 540, y: 60, c: 1 }, { x: 470, y: 32, c: 1 }, { x: 560, y: 230, c: 1 },
  { x: 180, y: 430, c: 2 }, { x: 300, y: 450, c: 2 }, { x: 430, y: 430, c: 2 }, { x: 300, y: 210, c: 2 },
];

export function NarrativeScene({ t }: SceneProps) {
  return (
    <MotionCanvas
      w={600}
      h={470}
      summary="Ten scattered source fragments connect into three dominant narratives. The relief-policy story is growing, the funding-doubt story is fading, and the local-impact story is competing — shown by a contested link between two clusters. Every cluster stays connected to its source fragments."
    >
      <svg viewBox="0 0 600 470" className="mc-svg" aria-hidden="true">
        {FRAGMENTS.map((f, i) => {
          const cl = CLUSTERS[f.c];
          return (
            <AnimatedEdge
              key={i}
              x1={f.x}
              y1={f.y}
              x2={cl.x}
              y2={cl.y}
              p={getRevealProgress(t, 0.8 + i * 0.07, 0.5)}
              color={cl.c}
              opacity={f.c === 1 ? 0.22 : 0.4}
              t={t}
              pulse
              pulseSpeed={0.4}
            />
          );
        })}
        {/* competing collision between Policy and Local-impact */}
        <AnimatedEdge
          x1={CLUSTERS[0].x}
          y1={CLUSTERS[0].y}
          x2={CLUSTERS[2].x}
          y2={CLUSTERS[2].y}
          p={getRevealProgress(t, 2.6, 0.5)}
          color="var(--fw-caution)"
          opacity={0.5}
          dashed
        />
      </svg>

      {/* source fragments (evidence stays visible) */}
      {FRAGMENTS.map((f, i) => {
        const p = getRevealProgress(t, 0.1 + i * 0.06, 0.45);
        const fade = f.c === 1 ? 0.5 : 1;
        return (
          <div key={i} className="nr-frag" style={{ left: f.x, top: f.y, opacity: clamp01(p) * fade, transform: `translate(-50%,-50%) translateX(${(1 - p) * -10}px)` }}>
            <Icon name="file-text" size={11} color="var(--fw-ink-3)" />
            <span className="nr-frag-bar" />
          </div>
        );
      })}

      {/* narrative clusters */}
      {CLUSTERS.map((cl, i) => {
        const p = getRevealProgress(t, 1.6 + i * 0.12, 0.6, EASING.outBack);
        const grow = i === 0 ? 1 + 0.12 * getRevealProgress(t, 2.2, 0.8) : 1;
        const fade = i === 1 ? 0.6 : 1;
        return (
          <div key={cl.label} className="nr-cluster" style={{ left: cl.x, top: cl.y, opacity: clamp01(p) * fade, transform: `translate(-50%,-50%) scale(${(0.7 + 0.3 * clamp01(p)) * grow})`, borderColor: `color-mix(in srgb, ${cl.c} 50%, transparent)` }}>
            <div className="nr-cluster-label">{cl.label}</div>
            <div className="nr-cluster-status" style={{ color: cl.c }}>
              <span aria-hidden="true">{cl.trend}</span> {cl.status}
            </div>
          </div>
        );
      })}
    </MotionCanvas>
  );
}
