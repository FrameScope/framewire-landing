import { useState } from "react";
import { Icon } from "../ui/Icon";
import { ProductWindow } from "./ProductWindow";
import { AUDIENCES } from "../../audiences";

export function AudienceWorkspace() {
  const [i, setI] = useState(0);
  const a = AUDIENCES[i];

  return (
    <div>
      <div className="aw-tabs" role="tablist" aria-label="Audience modes">
        {AUDIENCES.map((aud, idx) => {
          const on = idx === i;
          return (
            <button key={aud.id} role="tab" aria-selected={on} tabIndex={on ? 0 : -1}
              className={`aw-tab${on ? " on" : ""}`} style={on ? { borderColor: aud.accent } : undefined} onClick={() => setI(idx)}>
              <Icon name={aud.icon} size={15} color={on ? aud.accent : "var(--fw-ink-3)"} />{aud.nav}
            </button>
          );
        })}
      </div>

      <ProductWindow
        title={`FrameWire — ${a.title}`}
        tools={<span className="fw-mono" style={{ fontSize: 11, color: a.accent }}>one workspace · {AUDIENCES.length} modes</span>}
      >
        <div key={a.id} className="aw-grid aw-swap">
          <div>
            <div className="aw-col-h">Sources</div>
            <div className="aw-src">
              {a.sources.map((s) => (
                <span key={s} className="aw-src-card"><Icon name="rss" size={13} color={a.accent} />{s}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div className="aw-col-h">Investigation question</div>
              <div className="aw-q"><span className="aw-q-text">{a.headline}</span></div>
            </div>
            <div>
              <div className="aw-col-h">Active lenses</div>
              <div className="aw-lenses">
                {a.lenses.slice(0, 6).map((l) => <span key={l} className="aw-lens">{l}</span>)}
              </div>
            </div>
          </div>

          <div>
            <div className="aw-col-h">Output</div>
            <div className="aw-out">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 12, fontWeight: 600, color: "var(--fw-ink)" }}>
                <Icon name="file-check" size={15} color="var(--fw-verified)" />Evidence-linked report
              </div>
              <div className="aw-out-t">{a.output}</div>
            </div>
          </div>
        </div>
      </ProductWindow>

      <p style={{ textAlign: "center", marginTop: 22, fontSize: 13.5, color: "var(--fw-ink-3)", maxWidth: "60ch", marginInline: "auto" }}>
        Different professionals ask different questions. The workspace adapts — the evidence rules underneath do not.
      </p>
    </div>
  );
}
