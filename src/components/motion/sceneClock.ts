import { useEffect, useState } from "react";
import { EASING, clamp01, type Easing } from "./easing";

/* Scene clock + reveal + reduced-motion — production equivalent of useFwClock.
   See TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md §1, §2, §13. */

const SETTLED = 999; // any value past the longest reveal window → fully settled frame

/** Reads prefers-reduced-motion synchronously on first render (no incomplete first frame). */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

interface ClockOpts {
  reduced?: boolean;
  /** Seconds of motion before the clock stops at a stable, readable state. */
  runFor?: number;
}

/**
 * Wall-clock scene time in seconds. Resets to 0 whenever `runKey` changes
 * (scene/lens/tool/audience change · Prev/Next · Replay). Under reduced motion it
 * returns a settled constant and starts no rAF/interval. Stops ticking shortly
 * after `runFor` so nothing loops forever.
 */
export function useSceneClock(runKey: unknown, { reduced = false, runFor = 6 }: ClockOpts = {}): number {
  const [t, setT] = useState(reduced ? SETTLED : 0);
  useEffect(() => {
    if (reduced) {
      setT(SETTLED);
      return;
    }
    setT(0);
    const start = performance.now();
    let raf = 0;
    const update = () => setT((performance.now() - start) / 1000);
    const loop = () => {
      update();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const iv = setInterval(update, 200); // fallback driver if rAF is throttled
    const stop = setTimeout(() => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
    }, runFor * 1000 + 600);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      clearTimeout(stop);
    };
  }, [runKey, reduced, runFor]);
  return t;
}

/** Clamped, eased 0..1 progress for an element entering at `start` for `dur` seconds. */
export function getRevealProgress(t: number, start: number, dur = 0.6, ease: Easing = EASING.outCubic): number {
  return ease(clamp01((t - start) / dur));
}
