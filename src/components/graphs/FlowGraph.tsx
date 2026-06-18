import { Fragment, type CSSProperties } from "react";
import { Icon } from "../ui/Icon";
import { GraphFigure, useInView, usePRM } from "./graphUtils";

const FG_SOURCES = [
  { label: "RSS", icon: "rss" }, { label: "Websites", icon: "globe" }, { label: "APIs", icon: "plug" },
  { label: "Uploads", icon: "upload" }, { label: "OCR", icon: "scan-text" }, { label: "Open data", icon: "folder-open" },
];
const FG_STAGES = [
  { label: "Archive", icon: "database", tone: "archive", gate: false },
  { label: "Cleaning", icon: "wand-sparkles", tone: "ink", gate: false },
  { label: "Verification", icon: "shield-check", tone: "signal", gate: true },
  { label: "Investigation", icon: "git-branch", tone: "ink", gate: false },
  { label: "Understanding", icon: "scale", tone: "ink", gate: false },
  { label: "Report", icon: "file-text", tone: "ink", gate: false },
  { label: "Memory", icon: "history", tone: "archive", gate: false },
];

export function FlowGraph() {
  const [ref, inView] = useInView();
  const reduced = usePRM();
  const active = inView || reduced;
  const t = (i: number): CSSProperties => (reduced ? {} : { transitionDelay: `${i * 90}ms` });

  return (
    <GraphFigure
      title="Source-to-understanding flow"
      label="all sources enter the archive first · raw data cannot reach an engine"
      desc="Six kinds of source all flow into the Archive first, then through Cleaning and Verification, which acts as a gate. Only verified material continues into Investigation, Understanding, Report and Memory. Raw or quarantined material cannot jump directly to an engine."
      badge={<span className="fw-mono" style={{ fontSize: 10.5, color: "var(--fw-ink-4)" }}>scroll to trace</span>}
    >
      <div ref={ref} data-active={active} className="fw-flow">
        <div className="fw-flow-edge">
          <span className="fw-flow-edge-label">Collection edge · open</span>
          <ul className="fw-flow-sources">
            {FG_SOURCES.map((s, i) => (
              <li key={s.label} tabIndex={0} className="fw-flow-src" style={t(i)} aria-label={`Source: ${s.label}`}>
                <Icon name={s.icon} size={14} color="var(--fw-ink-2)" /> {s.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="fw-flow-converge" aria-hidden="true" style={t(6)}>
          <span className="fw-flow-line" /><Icon name="arrow-right" size={16} color="var(--fw-ink-4)" />
        </div>
        <ol className="fw-flow-chain">
          {FG_STAGES.map((s, i) => (
            <Fragment key={s.label}>
              <li tabIndex={0} className={`fw-flow-stage${s.gate ? " gate" : ""}`} style={t(7 + i)} aria-label={`${s.label}${s.gate ? " — verification gate" : ""}`}>
                <span className="fw-flow-stage-ic" style={{ borderColor: s.gate ? "var(--fw-signal-edge)" : "var(--fw-line-strong)", background: s.gate ? "var(--fw-signal-wash)" : "var(--fw-surface-inset)" }}>
                  <Icon name={s.icon} size={16} color={s.gate ? "var(--fw-signal)" : s.tone === "archive" ? "var(--fw-archive)" : "var(--fw-ink-2)"} />
                </span>
                <span className="fw-flow-stage-lb" style={{ color: s.gate ? "var(--fw-signal)" : "var(--fw-ink-2)" }}>{s.label}</span>
                {s.gate && <span className="fw-flow-gate-tag">gate</span>}
              </li>
              {i < FG_STAGES.length - 1 && (
                <li aria-hidden="true" className="fw-flow-conn" style={t(7 + i)}><span className="fw-flow-line" /></li>
              )}
            </Fragment>
          ))}
        </ol>
        <div className="fw-flow-legend">
          <span className="fw-flow-allow"><Icon name="shield-check" size={14} color="var(--fw-signal)" /> Verified information continues into investigation</span>
          <span className="fw-flow-block"><Icon name="ban" size={14} color="var(--fw-conflict)" /> Raw &amp; quarantined material stops before the engines</span>
        </div>
      </div>
    </GraphFigure>
  );
}
