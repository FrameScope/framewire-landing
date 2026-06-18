import { Fragment, useState } from "react";
import { Icon } from "../ui/Icon";
import { GraphFigure } from "./graphUtils";

const LG_NODES = [
  { label: "Original source", icon: "rss", meta: "SRC-0427 · captured 09:42 UTC" },
  { label: "Archived record", icon: "database", meta: "hash 9f2c·a17e · provenance kept" },
  { label: "Cleaned version", icon: "wand-sparkles", meta: "normalized · dates & names parsed" },
  { label: "Verification result", icon: "shield-check", meta: "provenance + integrity passed" },
  { label: "Investigation finding", icon: "git-branch", meta: "claim compared with evidence" },
  { label: "Report citation", icon: "file-text", meta: "cited with confidence & limits" },
];

export function LineageGraph() {
  const [sel, setSel] = useState(LG_NODES.length - 1);
  return (
    <GraphFigure
      title="Evidence lineage"
      label="select any step to trace it back to the original source"
      desc="A report citation traces back through an investigation finding, a verification result, a cleaned version, an archived record, to the original source. Every conclusion remains connected to its evidence."
      badge={<span className="fw-mono" style={{ fontSize: 10.5, color: "var(--fw-ink-4)" }}>click a node</span>}
    >
      <ol className="fw-lin">
        {LG_NODES.map((n, i) => {
          const on = i <= sel;
          return (
            <Fragment key={n.label}>
              <li className="fw-lin-node">
                <button onClick={() => setSel(i)} aria-pressed={i === sel} aria-label={`${n.label}. ${n.meta}.`} className={`fw-lin-btn${on ? " on" : ""}${i === sel ? " sel" : ""}`}>
                  <span className="fw-lin-ic"><Icon name={n.icon} size={16} color={on ? "var(--fw-signal)" : "var(--fw-ink-3)"} /></span>
                  <span className="fw-lin-txt"><span className="fw-lin-lb">{n.label}</span><span className="fw-lin-meta fw-mono">{n.meta}</span></span>
                </button>
              </li>
              {i < LG_NODES.length - 1 && (
                <li aria-hidden="true" className={`fw-lin-conn${i < sel ? " on" : ""}`}><span /></li>
              )}
            </Fragment>
          );
        })}
      </ol>
      <p className="fw-lin-msg"><Icon name="link" size={14} color="var(--fw-signal)" /> Every conclusion remains connected to its evidence.</p>
    </GraphFigure>
  );
}
