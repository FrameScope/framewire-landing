import { Icon } from "../../ui/Icon";
import { MotionCanvas } from "../MotionCanvas";
import { AnimatedEdge } from "../AnimatedEdge";
import { getRevealProgress } from "../sceneClock";
import { EASING, clamp01 } from "../easing";
import type { SceneProps } from "./shared";

/* Scene 3 — Threat & escalation. Several INDEPENDENT, evidence-backed indicators
   converge into one bounded escalation view. Inputs are parallel — emotion does
   not "become" threat. Supporting, contradicting, uncertainty and a human-review
   requirement are all preserved. */

const INPUTS = [
  { label: "Recurring narrative", icon: "trending-up" },
  { label: "Actor involvement", icon: "building-2" },
  { label: "Emotional pressure", icon: "heart" },
  { label: "Geographic signal", icon: "map-pin" },
  { label: "Timeline recurrence", icon: "clock" },
  { label: "Supporting evidence", icon: "check" },
  { label: "Contradicting evidence", icon: "split" },
  { label: "Missing information", icon: "help-circle" },
];

const PANEL = { x: 470, y: 250, left: 360 };

export function ThreatConvergenceScene({ t }: SceneProps) {
  const panelP = getRevealProgress(t, 1.8, 0.6, EASING.outBack);
  const rowY = (i: number) => 30 + i * 56 + 20;
  return (
    <MotionCanvas
      w={600}
      h={500}
      summary="Eight independent indicators — recurring narrative, actor involvement, emotional pressure, geographic signal, timeline recurrence, supporting evidence, contradicting evidence, and missing information — each draw a separate line into one bounded escalation view. The view shows an Elevated indicator with supporting evidence attached, contradicting evidence kept, uncertainty preserved, and a Human review required badge. The indicators are parallel inputs, not a chain."
    >
      <svg viewBox="0 0 600 500" className="mc-svg" aria-hidden="true">
        {INPUTS.map((inp, i) => (
          <AnimatedEdge
            key={inp.label}
            x1={176}
            y1={rowY(i)}
            x2={PANEL.left}
            y2={PANEL.y}
            p={getRevealProgress(t, 0.6 + i * 0.08, 0.5)}
            color={i === 6 ? "var(--fw-conflict)" : i === 7 ? "var(--fw-caution)" : "var(--fw-ink-3)"}
            opacity={0.34}
            t={t}
            pulse
            pulseSpeed={0.35 + i * 0.015}
            arrow
          />
        ))}
      </svg>

      {/* independent inputs */}
      {INPUTS.map((inp, i) => {
        const p = getRevealProgress(t, 0.1 + i * 0.07, 0.45);
        return (
          <div key={inp.label} className="th-input" style={{ left: 18, top: 30 + i * 56, opacity: clamp01(p), transform: `translateX(${(1 - p) * -12}px)` }}>
            <Icon name={inp.icon} size={14} color="var(--fw-ink-3)" />
            <span>{inp.label}</span>
          </div>
        );
      })}

      {/* bounded escalation view */}
      <div className="th-panel" style={{ left: PANEL.x, top: PANEL.y, opacity: clamp01(panelP), transform: `translate(-50%,-50%) scale(${0.85 + 0.15 * clamp01(panelP)})` }}>
        <div className="th-panel-head">
          <Icon name="triangle-alert" size={16} color="var(--fw-caution)" />
          <span>Escalation view</span>
          <span className="th-level">Elevated</span>
        </div>
        <div className="th-meter"><i style={{ width: `${66 * getRevealProgress(t, 2.2, 0.8, EASING.outExpo)}%` }} /></div>
        <div className="th-rows">
          <div style={{ opacity: clamp01(getRevealProgress(t, 2.4, 0.5)) }}><Icon name="check" size={13} color="var(--fw-verified)" /> Supporting evidence attached</div>
          <div style={{ opacity: clamp01(getRevealProgress(t, 2.6, 0.5)) }}><Icon name="split" size={13} color="var(--fw-conflict)" /> Contradicting evidence kept</div>
          <div style={{ opacity: clamp01(getRevealProgress(t, 2.8, 0.5)) }}><Icon name="help-circle" size={13} color="var(--fw-caution)" /> Uncertainty preserved</div>
        </div>
        <div className="th-review" style={{ opacity: clamp01(getRevealProgress(t, 3.2, 0.6)) }}>
          <Icon name="user-check" size={14} color="var(--fw-signal)" /> Human review required
        </div>
      </div>
    </MotionCanvas>
  );
}
