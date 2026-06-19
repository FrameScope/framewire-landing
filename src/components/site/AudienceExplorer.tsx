import { useState } from "react";
import { Icon } from "../ui/Icon";
import { AUDIENCES } from "../../site/content";

/* One transforming investigation workspace. Selecting a role updates the starting
   subject, source mix, question, active lenses, output, and safeguard. */

export function AudienceExplorer() {
  const [i, setI] = useState(0);
  const a = AUDIENCES[i];
  return (
    <div className="au">
      <div className="au-tabs" role="tablist" aria-label="Who uses FrameWire">
        {AUDIENCES.map((aud, idx) => {
          const on = idx === i;
          return (
            <button key={aud.role} role="tab" aria-selected={on} tabIndex={on ? 0 : -1}
              className={`au-tab${on ? " on" : ""}`} style={on ? { borderColor: aud.accent } : undefined} onClick={() => setI(idx)}>
              <Icon name={aud.icon} size={14} color={on ? aud.accent : "var(--fw-ink-3)"} />{aud.role}
            </button>
          );
        })}
      </div>

      <div className="au-panel" key={a.role}>
        <div className="au-grid au-swap">
          <div className="au-col">
            <div className="au-sub">Starting subject</div>
            <div className="au-subject" style={{ borderColor: `color-mix(in srgb, ${a.accent} 40%, transparent)` }}>{a.subject}</div>
            <div className="au-sub">Sources</div>
            <div className="au-sources">{a.sources.map((s) => <span key={s}><Icon name="rss" size={11} color={a.accent} />{s}</span>)}</div>
          </div>

          <div className="au-col">
            <div className="au-sub">Investigation question</div>
            <div className="au-q">{a.question}</div>
            <div className="au-sub">Active lenses</div>
            <div className="au-lenses">{a.lenses.map((l) => <span key={l}>{l}</span>)}</div>
          </div>

          <div className="au-col">
            <div className="au-sub">Output</div>
            <div className="au-out"><Icon name="file-check" size={14} color="var(--fw-verified)" /> {a.output}</div>
            <div className="au-sub">Safeguard</div>
            <div className="au-safe"><Icon name="info" size={13} color="var(--fw-caution)" /> {a.safeguard}</div>
          </div>
        </div>
      </div>

      <p className="au-foot">Different professionals ask different questions. The evidence remains traceable for everyone.</p>
    </div>
  );
}
