import { useEffect, useRef, useState, type ReactNode } from "react";

/** Activates once the element scrolls into view (used to trigger staged motion). */
export function useInView(margin?: string): [React.MutableRefObject<any>, boolean] {
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }),
      { threshold: 0.2, rootMargin: margin || "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView];
}

/** Tracks the user's reduced-motion preference. */
export function usePRM(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

const srOnly: React.CSSProperties = {
  position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
  overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
};

export interface GraphFigureProps {
  title: string;
  label?: string;
  desc: string;
  badge?: ReactNode;
  children: ReactNode;
}

/** Framed figure with caption + a visually-hidden text alternative for SR users. */
export function GraphFigure({ title, label, desc, badge, children }: GraphFigureProps) {
  return (
    <figure role="group" aria-label={title} style={{ margin: 0, border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-lg)", background: "var(--fw-surface)", overflow: "hidden", position: "relative" }}>
      <figcaption style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 18px", borderBottom: "1px solid var(--fw-line)" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--fw-ink)" }}>{title}</span>
          {label && <span className="fw-mono" style={{ fontSize: 11, color: "var(--fw-ink-4)", letterSpacing: "0.04em" }}>{label}</span>}
        </span>
        {badge}
      </figcaption>
      <div style={{ padding: "clamp(18px,3vw,30px)" }}>{children}</div>
      <p style={srOnly}>{desc}</p>
    </figure>
  );
}
