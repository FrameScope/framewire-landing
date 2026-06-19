import { useState } from "react";
import { Icon } from "../ui/Icon";
import { GraphFigure } from "./graphUtils";

interface Item { id: string; label: string; icon: string; text: string }

const LENSES: Item[] = [
  { id: "narrative", label: "Narrative", icon: "trending-up", text: "This finding enters the report only when you select it — and it keeps its source, evidence, and verification status." },
  { id: "sentiment", label: "Sentiment", icon: "activity", text: "A tone finding enters with the sources behind it, labelled as signal — never as population-wide opinion." },
  { id: "emotion", label: "Emotion", icon: "heart", text: "An emotional-signal finding enters with the observed content and context it came from." },
  { id: "threat", label: "Threat", icon: "triangle-alert", text: "A threat-related finding can enter the report only with its supporting indicators, location, timeline, source evidence, uncertainty, and human review." },
  { id: "claims", label: "Claims", icon: "badge-check", text: "A claim enters the report with its source, supporting evidence, contradictions, verification history, and current status." },
  { id: "geography", label: "Geography", icon: "map", text: "A location finding enters with the evidence that ties activity to a place." },
  { id: "actors", label: "Actors", icon: "landmark", text: "An actor finding enters with the evidence-backed relationships behind it — no implied guilt without proof." },
  { id: "entities", label: "Entities", icon: "network", text: "An entity relationship enters marked as supported or still uncertain." },
  { id: "sources", label: "Sources", icon: "rss", text: "Every selected finding carries the source path it came from." },
  { id: "timeline", label: "Timeline", icon: "clock", text: "Findings keep their change history, so the report shows when things shifted." },
  { id: "memory", label: "Memory", icon: "history", text: "Earlier findings can be compared and carried forward without overwriting history." },
];

const STAGES: Item[] = [
  { id: "select", label: "Select findings", icon: "list-plus", text: "Findings enter the report only when you choose them — nothing is added automatically." },
  { id: "review", label: "Review evidence", icon: "search", text: "Each selected finding keeps its supporting and contradicting evidence." },
  { id: "organize", label: "Organize sections", icon: "layout-list", text: "Arrange findings into background, evidence, analysis, competing explanations, limitations, and conclusions." },
  { id: "uncertainty", label: "Record uncertainty", icon: "help-circle", text: "The report preserves what is known, what remains uncertain, and what additional evidence may still be needed." },
  { id: "human", label: "Human review", icon: "user-check", text: "FrameWire assists with organization and traceability. You keep control of the final interpretation." },
  { id: "produce", label: "Produce report", icon: "file-text", text: "An evidence-linked report — still connected to the investigation, timeline, actors, claims, and future updates." },
];

const FOUNDATION = [
  { id: "investigation", label: "Investigation", icon: "git-branch" },
  { id: "evidence", label: "Evidence", icon: "check" },
  { id: "verification", label: "Verification", icon: "shield-check" },
  { id: "provenance", label: "Provenance", icon: "rss" },
];

const REPORT_TEXT = "The finished report stays linked to its investigation, evidence, verification, and sources — every conclusion can be traced back.";
const DEFAULT_TEXT = "Report Studio organizes understanding without disconnecting it from evidence.";

export function ReportStudioGraph() {
  const [sel, setSel] = useState<{ text: string; label: string } | null>(null);

  return (
    <GraphFigure
      title="Many lenses. One traceable report."
      label="selected findings keep their evidence as they enter the report"
      desc="Findings from eleven intelligence lenses — narrative, sentiment, emotion, threat, claims, geography, actors, entities, sources, timeline and memory — are selected by the user and move through Report Studio: select findings, review evidence, organize sections, record uncertainty, human review, produce report. The result is an evidence-linked report resting on the investigation, evidence, verification and provenance, and preserved to memory."
      badge={<span className="fw-mono" style={{ fontSize: 10.5, color: "var(--fw-ink-4)" }}>select to explore</span>}
    >
      <div className="fw-rs" onMouseLeave={() => setSel(null)}>
        <div className="fw-rs-band">
          <span className="fw-rs-band-h fw-mono">Intelligence lenses · you choose what matters</span>
          <div className="fw-rs-chips">
            {LENSES.map((l) => {
              const on = sel === null ? false : sel.label === l.label;
              return (
                <button key={l.id} className={`fw-rs-chip${on ? " on" : ""}`} aria-pressed={on} aria-label={l.label}
                  onMouseEnter={() => setSel({ text: l.text, label: l.label })} onFocus={() => setSel({ text: l.text, label: l.label })}
                  onClick={() => setSel((c) => (c && c.label === l.label ? null : { text: l.text, label: l.label }))}>
                  <Icon name={l.icon} size={13} color="var(--fw-ink-2)" />{l.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="fw-rs-flowarrow" aria-hidden="true"><Icon name="arrow-right" size={15} color="var(--fw-signal)" /><span className="fw-mono">Selected findings</span></div>

        <div className="fw-rs-band">
          <span className="fw-rs-band-h fw-mono">Report Studio</span>
          <ol className="fw-rs-stages">
            {STAGES.map((s, i) => {
              const on = sel?.label === s.label;
              return (
                <li key={s.id} className="fw-rs-stagewrap">
                  <button className={`fw-rs-stage${on ? " on" : ""}`} aria-pressed={!!on} aria-label={s.label}
                    onMouseEnter={() => setSel({ text: s.text, label: s.label })} onFocus={() => setSel({ text: s.text, label: s.label })}
                    onClick={() => setSel((c) => (c && c.label === s.label ? null : { text: s.text, label: s.label }))}>
                    <span className="fw-rs-stage-ic"><Icon name={s.icon} size={15} color={on ? "var(--fw-signal)" : "var(--fw-ink-2)"} /></span>
                    <span className="fw-rs-stage-lb">{s.label}</span>
                  </button>
                  {i < STAGES.length - 1 && <Icon name="arrow-right" size={13} color="var(--fw-ink-4)" />}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="fw-rs-flowarrow" aria-hidden="true"><Icon name="arrow-right" size={15} color="var(--fw-verified)" /></div>

        <button className={`fw-rs-output${sel?.label === "Evidence-Linked Report" ? " on" : ""}`} aria-pressed={sel?.label === "Evidence-Linked Report"}
          onMouseEnter={() => setSel({ text: REPORT_TEXT, label: "Evidence-Linked Report" })} onFocus={() => setSel({ text: REPORT_TEXT, label: "Evidence-Linked Report" })}
          onClick={() => setSel((c) => (c && c.label === "Evidence-Linked Report" ? null : { text: REPORT_TEXT, label: "Evidence-Linked Report" }))}>
          <Icon name="file-check" size={18} color="var(--fw-archive)" /><span>Evidence-Linked Report</span>
        </button>

        <div className="fw-rs-foundation">
          <span className="fw-rs-band-h fw-mono">Resting on</span>
          <div className="fw-rs-chips">
            {FOUNDATION.map((f) => (
              <span key={f.id} className="fw-rs-found"><Icon name={f.icon} size={13} color="var(--fw-verified)" />{f.label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="fw-rs-panel" aria-live="polite">
        {sel ? (
          <p><span className="fw-rs-panel-tag fw-mono">{sel.label}</span>{sel.text}</p>
        ) : (
          <>
            <p><Icon name="link" size={14} color="var(--fw-signal)" style={{ marginRight: 7, verticalAlign: "-2px" }} />{DEFAULT_TEXT}</p>
            <p className="fw-rs-panel-note">FrameWire assists with report construction. The user remains responsible for final conclusions.</p>
          </>
        )}
      </div>
    </GraphFigure>
  );
}
