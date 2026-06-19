import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

/* Fixed intrinsic coordinate space that scales down (never up) to fit its column,
   so node/edge positions stay relative and there is no horizontal overflow.
   See TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md §9, §10. */

export function useResponsiveCanvas(w: number): [RefObject<HTMLDivElement>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / w));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return [ref, scale];
}

interface MotionCanvasProps {
  w: number;
  h: number;
  max?: number;
  children: ReactNode;
  /** Screen-reader description of what the animated scene shows when settled. */
  summary?: string;
}

export function MotionCanvas({ w, h, max = 640, children, summary }: MotionCanvasProps) {
  const [ref, scale] = useResponsiveCanvas(w);
  return (
    <div ref={ref} className="mc" style={{ maxWidth: max, height: h * scale }}>
      {summary && <p className="fw-sr-only">{summary}</p>}
      <div
        className="mc-inner"
        aria-hidden="true"
        style={{ width: w, height: h, transform: `translateX(-50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
