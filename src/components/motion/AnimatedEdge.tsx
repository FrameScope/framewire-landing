import { type ReactNode } from "react";
import { clamp01 } from "./easing";

/* Grow-from-source SVG edge with a brief, time-gated signal pulse.
   Solid = supported, dashed = suggested. Completed edges persist.
   See TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md §5, §6. */

interface AnimatedEdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Draw progress 0..1 — the edge grows from (x1,y1) toward (x2,y2). */
  p: number;
  color?: string;
  width?: number;
  opacity?: number;
  dashed?: boolean;
  /** Scene time (seconds) — drives the pulse. */
  t?: number;
  pulse?: boolean;
  pulseSpeed?: number;
  /** Pulses only run while t is within this window, then the path goes quiet. */
  pulseWindow?: number;
  arrow?: boolean;
  blocked?: boolean;
}

export function AnimatedEdge({
  x1,
  y1,
  x2,
  y2,
  p,
  color = "var(--fw-signal)",
  width = 1.5,
  opacity = 0.5,
  dashed = false,
  t = 0,
  pulse = false,
  pulseSpeed = 0.4,
  pulseWindow = 4.5,
  arrow = false,
  blocked = false,
}: AnimatedEdgeProps) {
  const cp = clamp01(p);
  const cx = x1 + (x2 - x1) * cp;
  const cy = y1 + (y2 - y1) * cp;
  const ang = Math.atan2(y2 - y1, x2 - x1);

  const pulses: ReactNode[] = [];
  if (pulse && !blocked && cp > 0.35 && t < pulseWindow) {
    for (let k = 0; k < 2; k++) {
      const f = (t * pulseSpeed + k * 0.5) % 1;
      if (f <= cp) {
        pulses.push(
          <circle
            key={k}
            cx={x1 + (x2 - x1) * f}
            cy={y1 + (y2 - y1) * f}
            r={2.6}
            fill={color}
            style={{ filter: `drop-shadow(0 0 5px ${color})` }}
          />,
        );
      }
    }
  }

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={cx}
        y2={cy}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        opacity={blocked ? Math.min(opacity, 0.4) : opacity}
        strokeDasharray={dashed ? "3 5" : undefined}
      />
      {arrow && cp > 0.82 && (
        <path
          d={`M ${cx} ${cy} L ${cx - 7 * Math.cos(ang - 0.42)} ${cy - 7 * Math.sin(ang - 0.42)} L ${cx - 7 * Math.cos(ang + 0.42)} ${cy - 7 * Math.sin(ang + 0.42)} Z`}
          fill={color}
          opacity={opacity + 0.2}
        />
      )}
      {pulses}
      {blocked && cp > 0.5 && (
        <g opacity={0.95}>
          <circle cx={cx} cy={cy} r={8} fill="var(--fw-bg)" stroke="var(--fw-conflict)" strokeWidth={1.5} />
          <path
            d={`M ${cx - 3.5} ${cy - 3.5} L ${cx + 3.5} ${cy + 3.5} M ${cx + 3.5} ${cy - 3.5} L ${cx - 3.5} ${cy + 3.5}`}
            stroke="var(--fw-conflict)"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
}
