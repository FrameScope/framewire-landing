import { type CSSProperties, type ReactNode } from "react";
import { clamp01, EASING } from "./easing";
import { getRevealProgress } from "./sceneClock";

/* Node entry (opacity + translate + scale + progress-bound glow), a reveal wrapper,
   and a count-up. See TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md §7. */

interface MotionNodeProps {
  /** Centre in canvas coordinates. */
  x: number;
  y: number;
  /** Reveal progress 0..1 for this node. */
  p: number;
  active?: boolean;
  accent?: string;
  /** Glow intensity 0..1 (typically the same progress). */
  glow?: number;
  w?: number;
  children: ReactNode;
  style?: CSSProperties;
}

export function MotionNode({ x, y, p, active = false, accent = "var(--fw-signal)", glow = 0, w, children, style }: MotionNodeProps) {
  const cp = clamp01(p);
  return (
    <div
      className={`mn${active ? " mn-active" : ""}`}
      style={{
        left: x,
        top: y,
        width: w,
        opacity: cp,
        transform: `translate(-50%, -50%) scale(${0.82 + 0.18 * cp})`,
        borderColor: active ? "var(--fw-line-bright)" : undefined,
        boxShadow: glow > 0 ? `0 0 ${26 * glow}px color-mix(in srgb, ${accent} ${Math.round(22 * glow)}%, transparent)` : undefined,
        ...style,
      }}
    >
      <span className="mn-mark" style={{ background: accent }} aria-hidden="true" />
      {children}
    </div>
  );
}

interface MotionRevealProps {
  t: number;
  start?: number;
  dur?: number;
  y?: number;
  x?: number;
  scale?: number;
  ease?: (t: number) => number;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function MotionReveal({ t, start = 0, dur = 0.6, y = 12, x = 0, scale = 1, ease = EASING.outCubic, children, style, className }: MotionRevealProps) {
  const p = getRevealProgress(t, start, dur, ease);
  return (
    <div
      className={className}
      style={{
        opacity: p,
        transform: `translate(${x * (1 - p)}px, ${y * (1 - p)}px) scale(${scale + (1 - scale) * p})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CountUp({ t, start = 0, dur = 1.4, to = 100, decimals = 0, suffix = "" }: { t: number; start?: number; dur?: number; to: number; decimals?: number; suffix?: string }) {
  const p = getRevealProgress(t, start, dur, EASING.outExpo);
  const v = to * p;
  const txt = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{txt}{suffix}</span>;
}
