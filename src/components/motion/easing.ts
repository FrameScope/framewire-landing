/* Production easing set — adapted from the Technical Intelligence Tour engine.
   Used intentionally per element (see TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md §4):
   outCubic → text/interface reveal · outExpo → calculations & settling ·
   outBack → node/badge/chip formation · inOutCubic → state transforms ·
   inOutSine → calm ambient movement. */

export type Easing = (t: number) => number;

export const EASING: Record<
  "linear" | "inCubic" | "outCubic" | "inOutCubic" | "outQuart" | "outExpo" | "outBack" | "inOutSine",
  Easing
> = {
  linear: (t) => t,
  inCubic: (t) => t * t * t,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuart: (t) => 1 - Math.pow(1 - t, 4),
  outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  outBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
};

export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
