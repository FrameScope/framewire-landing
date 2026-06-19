import { useEffect, useState } from "react";
import { Icon } from "../ui/Icon";
import { usePRM } from "../graphs/graphUtils";
import { ProductWindow } from "./ProductWindow";

const SOURCES = [
  { icon: "newspaper", lb: "News article", x: 4, y: 16 },
  { icon: "message-square", lb: "Social post", x: 3, y: 64 },
  { icon: "upload", lb: "Uploaded report", x: 26, y: 84 },
];
const INV = { x: 50, y: 50 };

export function HeroProductMotion() {
  const reduced = usePRM();
  const [phase, setPhase] = useState(reduced ? 5 : 0);

  useEffect(() => {
    if (reduced) return;
    const ids = [0, 1, 2, 3, 4].map((p) => setTimeout(() => setPhase(p + 1), 500 + p * 650));
    return () => ids.forEach(clearTimeout);
  }, [reduced]);

  return (
    <ProductWindow
      title="FrameWire — new signal"
      tools={<Icon name="search" size={14} color="var(--fw-ink-4)" />}
    >
      <div className="hero-canvas">
        <svg className="hero-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {SOURCES.map((s, i) => (
            <path key={i} className={`hero-edge${phase >= 2 ? " draw" : ""}`} pathLength={1}
              d={`M ${s.x + 8} ${s.y + 6} L ${INV.x} ${INV.y}`} style={{ transitionDelay: `${i * 120}ms` }} />
          ))}
          <path className={`hero-edge${phase >= 3 ? " draw" : ""}`} pathLength={1} d={`M ${INV.x} ${INV.y} L 84 50`} />
        </svg>

        {SOURCES.map((s, i) => (
          <span key={s.lb} className={`hero-card${phase >= (i === 0 ? 0 : 2) ? " show" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%`, transitionDelay: `${i * 110}ms` }}>
            <Icon name={s.icon} size={14} color="var(--fw-ink-3)" />{s.lb}
          </span>
        ))}

        <span className={`hero-inv${phase >= 1 ? " show" : ""}`}>
          <Icon name="git-branch" size={20} color="var(--fw-signal)" />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fw-ink)" }}>Investigation</span>
          <span className="fw-mono" style={{ fontSize: 10, color: "var(--fw-ink-3)" }}>evidence connected</span>
        </span>

        <span className={`hero-report${phase >= 4 ? " show" : ""}`}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600, color: "var(--fw-ink)" }}>
            <Icon name="file-check" size={14} color="var(--fw-verified)" />Report
          </span>
          <span style={{ height: 6, borderRadius: 999, background: "var(--fw-line)", width: "88%" }} />
          <span style={{ height: 6, borderRadius: 999, background: "var(--fw-line)", width: "70%" }} />
          <span className="fw-mono" style={{ fontSize: 9.5, color: "var(--fw-signal)" }}>[1] [2] cited</span>
        </span>
      </div>
    </ProductWindow>
  );
}
