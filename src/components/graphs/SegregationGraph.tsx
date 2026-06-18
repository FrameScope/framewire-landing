import { Fragment, type CSSProperties } from "react";
import { Icon } from "../ui/Icon";
import { GraphFigure, useInView, usePRM } from "./graphUtils";

const SG_CHAIN = [
  { label: "Raw", icon: "download", tone: "ink" },
  { label: "Cleaned", icon: "wand-sparkles", tone: "ink" },
  { label: "Verified", icon: "shield-check", tone: "signal" },
  { label: "Engine eligible", icon: "git-branch", tone: "signal" },
  { label: "Canonical", icon: "database", tone: "archive" },
];
const SG_BLOCKED = ["Raw → Engine", "Quarantined → Engine", "Unverified → Canonical"];

export function SegregationGraph() {
  const [ref, inView] = useInView();
  const reduced = usePRM();
  const active = inView || reduced;
  const t = (i: number): CSSProperties => (reduced ? {} : { transitionDelay: `${i * 80}ms` });

  return (
    <GraphFigure
      title="Archive segregation"
      label="permitted movement between states — and what is blocked"
      desc="Material moves Raw, Cleaned, Verified, Engine-eligible, Canonical. Quarantined material is a dead end. Three transitions are always blocked: Raw to Engine, Quarantined to Engine, Unverified to Canonical."
    >
      <div ref={ref} data-active={active} className="fw-seg">
        <ol className="fw-seg-chain">
          {SG_CHAIN.map((s, i) => (
            <Fragment key={s.label}>
              <li tabIndex={0} className="fw-seg-node" style={t(i)} aria-label={`State: ${s.label}`}>
                <span className="fw-seg-ic" style={{ borderColor: s.tone === "signal" ? "var(--fw-signal-edge)" : "var(--fw-line-strong)", background: s.tone === "signal" ? "var(--fw-signal-wash)" : "var(--fw-surface-inset)" }}>
                  <Icon name={s.icon} size={15} color={s.tone === "signal" ? "var(--fw-signal)" : s.tone === "archive" ? "var(--fw-archive)" : "var(--fw-ink-2)"} />
                </span>
                <span className="fw-seg-lb">{s.label}</span>
              </li>
              {i < SG_CHAIN.length - 1 && (
                <li aria-hidden="true" className="fw-seg-arrow" style={t(i)}>
                  <span className="fw-seg-line" /><Icon name="arrow-right" size={13} color="var(--fw-verified)" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
        <div className="fw-seg-quar" tabIndex={0} style={t(5)}>
          <Icon name="ban" size={14} color="var(--fw-caution)" />
          <span>Quarantined material stays isolated — a dead end, never engine-eligible.</span>
        </div>
        <div className="fw-seg-blocked" style={t(6)}>
          <span className="fw-seg-blocked-h">Always blocked</span>
          <div className="fw-seg-blocked-list">
            {SG_BLOCKED.map((b) => (
              <span key={b} className="fw-seg-block-item"><Icon name="ban" size={13} color="var(--fw-conflict)" /> <span className="fw-mono">{b}</span></span>
            ))}
          </div>
        </div>
        <div className="fw-seg-msgs">
          <p>Collection does not equal verification.</p>
          <p>Verification does not automatically equal canonical authority.</p>
        </div>
      </div>
    </GraphFigure>
  );
}
