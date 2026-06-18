import type { CSSProperties } from "react";
import { Icon } from "../ui/Icon";
import { GraphFigure, useInView, usePRM } from "./graphUtils";

const TL_POINTS = [
  { t: "Day 0 · 09:42", title: "First source collected", note: "The earliest item is captured and archived with its provenance.", icon: "download", tone: "archive" },
  { t: "Day 0 · 11:15", title: "Additional evidence discovered", note: "Related material is gathered and linked to the same subject.", icon: "search", tone: "ink" },
  { t: "Day 1", title: "Contradiction identified", note: "A later source conflicts with an earlier claim.", icon: "split", tone: "conflict" },
  { t: "Day 1", title: "Verification status changed", note: "Re-checking provenance updates what is eligible for analysis.", icon: "shield-check", tone: "signal" },
  { t: "Day 2", title: "Finding created", note: "A finding is recorded, connected to its supporting evidence.", icon: "git-branch", tone: "ink" },
  { t: "Day 2", title: "Report produced", note: "A traceable report is generated with citations and limitations.", icon: "file-text", tone: "ink" },
  { t: "Day 6", title: "Correction recorded", note: "A later update is preserved — the history is never overwritten.", icon: "history", tone: "archive" },
];
const tlDot = (t: string) =>
  t === "signal" ? "var(--fw-signal)" : t === "conflict" ? "var(--fw-conflict)" : t === "archive" ? "var(--fw-archive)" : "var(--fw-ink-3)";

export function TimelineGraph() {
  const [ref, inView] = useInView();
  const reduced = usePRM();
  const active = inView || reduced;
  return (
    <GraphFigure
      title="Investigation timeline"
      label="change, contradiction and correction — preserved over time"
      desc="An illustrative investigation timeline: first source collected, additional evidence discovered, contradiction identified, verification status changed, finding created, report produced, correction recorded. History is never overwritten."
    >
      <ol ref={ref} data-active={active} className="fw-tl">
        {TL_POINTS.map((p, i) => (
          <li key={i} className="fw-tl-item" style={(reduced ? {} : { transitionDelay: `${i * 110}ms` }) as CSSProperties}>
            <span className="fw-tl-dot" style={{ background: tlDot(p.tone) }} />
            <span className="fw-tl-time fw-mono">{p.t}</span>
            <span className="fw-tl-body">
              <span className="fw-tl-title"><Icon name={p.icon} size={14} color={tlDot(p.tone)} />{p.title}</span>
              <span className="fw-tl-note">{p.note}</span>
            </span>
          </li>
        ))}
      </ol>
    </GraphFigure>
  );
}
