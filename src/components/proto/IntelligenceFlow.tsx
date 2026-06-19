import { useEffect, useState } from "react";
import { Icon } from "../ui/Icon";
import { useInView, usePRM } from "../graphs/graphUtils";
import { ProductWindow } from "./ProductWindow";
import { FLOW_STAGES } from "./scenes";

const LAST = FLOW_STAGES.length - 1;

function MobileStage({ st }: { st: typeof FLOW_STAGES[number] }) {
  const [ref, inView] = useInView();
  const Scene = st.Scene;
  return (
    <div ref={ref}>
      <ProductWindow title={`FrameWire — ${st.label}`}>
        <div className="iflow-cap"><span className="iflow-cap-h">{st.h}</span><span className="iflow-cap-s">{st.s}</span></div>
        <div className="iflow-canvas"><Scene active={inView} /></div>
      </ProductWindow>
    </div>
  );
}

export function IntelligenceFlow() {
  const reduced = usePRM();
  const [ref, inView] = useInView();
  const [stage, setStage] = useState(0);
  const [manual, setManual] = useState(false);

  // Auto-advance once through the chain when scrolled into view; user control stops it.
  useEffect(() => {
    if (reduced || manual || !inView || stage >= LAST) return;
    const t = setTimeout(() => setStage((s) => Math.min(s + 1, LAST)), 1750);
    return () => clearTimeout(t);
  }, [stage, inView, manual, reduced]);

  const go = (i: number) => { setManual(true); setStage(i); };
  const cur = FLOW_STAGES[stage];
  const Scene = cur.Scene;

  return (
    <div ref={ref}>
      {/* Desktop: one workspace that transforms through the chain */}
      <div className="iflow-desktop">
        <ProductWindow
          title="FrameWire — Investigation: spreading public claim"
          tools={<span className="fw-mono" style={{ fontSize: 11 }}>{stage + 1} / 6</span>}
        >
          <div className="iflow-grid">
            <div className="iflow-rail" role="tablist" aria-label="Intelligence flow stages">
              {FLOW_STAGES.map((st, i) => (
                <button key={st.id} role="tab" aria-selected={i === stage} tabIndex={i === stage ? 0 : -1}
                  className={`iflow-step${i === stage ? " on" : ""}${i < stage ? " done" : ""}`} onClick={() => go(i)}>
                  <span className="iflow-step-ic"><Icon name={i < stage ? "check" : st.icon} size={15} color={i === stage ? "var(--fw-signal)" : i < stage ? "var(--fw-verified)" : "var(--fw-ink-3)"} /></span>
                  <span className="iflow-step-lb">{st.label}</span>
                  <span className="iflow-step-n">{String(i + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <div className="iflow-stage">
              <div className="iflow-cap"><span className="iflow-cap-h">{cur.h}</span><span className="iflow-cap-s">{cur.s}</span></div>
              <div className="iflow-canvas"><Scene key={stage} active /></div>
              <div className="iflow-controls">
                <button className="iflow-btn" disabled={stage === 0} onClick={() => go(Math.max(0, stage - 1))}>← Back</button>
                <div className="iflow-progress" aria-hidden="true">
                  {FLOW_STAGES.map((_, i) => <span key={i} className={i === stage ? "on" : i < stage ? "done" : ""} />)}
                </div>
                <button className="iflow-btn" disabled={stage === LAST} onClick={() => go(Math.min(LAST, stage + 1))}>Next →</button>
              </div>
            </div>
          </div>
        </ProductWindow>
      </div>

      {/* Mobile: the same chain stacked vertically */}
      <div className="iflow-mobile">
        {FLOW_STAGES.map((st) => <MobileStage key={st.id} st={st} />)}
      </div>
    </div>
  );
}
