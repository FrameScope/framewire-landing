import { useState } from "react";
import { Icon } from "../ui/Icon";
import { GraphFigure } from "./graphUtils";

type NodeType = "inv" | "found" | "lens" | "report";
interface GNode { id: string; label: string; icon: string; type: NodeType; x: number; y: number }

// Lens ring positions computed on an ellipse around the investigation centre.
const CX = 42, CY = 43, RX = 33, RY = 33;
const RING = ["narrative", "claims", "geography", "threat", "actors", "entities", "memory", "emotion", "sentiment"];
const LENS_META: Record<string, { label: string; icon: string }> = {
  narrative: { label: "Narrative", icon: "trending-up" },
  sentiment: { label: "Sentiment", icon: "activity" },
  emotion: { label: "Emotion", icon: "heart" },
  threat: { label: "Threat", icon: "triangle-alert" },
  claims: { label: "Claims", icon: "badge-check" },
  geography: { label: "Geography", icon: "map" },
  actors: { label: "Actors", icon: "landmark" },
  entities: { label: "Entities", icon: "network" },
  memory: { label: "Memory", icon: "history" },
};

const NODES: GNode[] = [
  { id: "investigation", label: "Investigation", icon: "git-branch", type: "inv", x: CX, y: CY },
  ...RING.map((id, i): GNode => {
    const a = ((-90 + i * 40) * Math.PI) / 180;
    return { id, label: LENS_META[id].label, icon: LENS_META[id].icon, type: "lens", x: Math.round(CX + RX * Math.cos(a)), y: Math.round(CY + RY * Math.sin(a)) };
  }),
  { id: "sources", label: "Sources", icon: "rss", type: "found", x: 11, y: 91 },
  { id: "archive", label: "Archive", icon: "archive", type: "found", x: 27, y: 91 },
  { id: "evidence", label: "Evidence", icon: "check", type: "found", x: 43, y: 91 },
  { id: "verification", label: "Verification", icon: "shield-check", type: "found", x: 60, y: 91 },
  { id: "timeline", label: "Timeline", icon: "clock", type: "found", x: 76, y: 91 },
  { id: "report", label: "Report Studio", icon: "clipboard-check", type: "report", x: 90, y: 49 },
];
const at = (id: string) => NODES.find((n) => n.id === id)!;

// Labeled Report-Studio edges (shown when Report Studio is selected).
const REPORT_EDGES = [
  { from: "investigation", label: "Subject and scope" },
  { from: "evidence", label: "Supporting references" },
  { from: "verification", label: "Current status" },
  { from: "timeline", label: "Change history" },
  { from: "geography", label: "Selected findings" },
  { from: "threat", label: "Selected findings" },
];

// Curated highlight set + explanation for each selectable node.
const FOCUS: Record<string, { related: string[]; text: string }> = {
  investigation: { related: [...RING, "evidence"], text: "Every lens looks at the same investigation. Evidence keeps them connected." },
  evidence: { related: [...RING, "investigation"], text: "Evidence connects every lens — each finding traces back to it." },
  sources: { related: ["investigation", "claims", "entities"], text: "Provenance shows where each piece of evidence came from before any lens uses it." },
  archive: { related: ["investigation", "evidence"], text: "Originals are preserved first, so every lens works from the same archived record." },
  verification: { related: ["investigation", "claims", "report"], text: "Verification status travels with the evidence into claims and into the report." },
  timeline: { related: ["investigation", "memory", "threat", "report"], text: "Time connects recurrence, memory, and how findings changed." },
  narrative: { related: ["investigation", "evidence", "sentiment", "emotion", "actors", "claims", "geography"], text: "Narrative analysis becomes more useful when tone, emotional signals, actors, claims, geography, and supporting evidence remain visible together." },
  sentiment: { related: ["investigation", "evidence", "narrative", "actors"], text: "Tone shifts mean more alongside the narratives, actors, and evidence that drive them." },
  emotion: { related: ["investigation", "evidence", "narrative"], text: "Emotional signals are read in context — tied to narratives, sources, and the evidence behind them." },
  threat: { related: ["investigation", "evidence", "geography", "timeline", "narrative", "actors"], text: "Threat indicators are examined through evidence, location, recurrence, narratives, and involved actors — not through a single score." },
  claims: { related: ["investigation", "evidence", "verification", "narrative", "timeline", "sources"], text: "Claims remain connected to their original sources, supporting and contradicting evidence, verification history, and narrative context." },
  geography: { related: ["investigation", "evidence", "threat", "actors", "narrative"], text: "Location patterns connect to the actors, threats, and evidence observed in each place." },
  actors: { related: ["investigation", "evidence", "narrative", "geography", "entities"], text: "Actors and institutions are understood through their relationships, narratives, geography, and the evidence that links them." },
  entities: { related: ["investigation", "evidence", "actors", "sources"], text: "Entities gain meaning from the actors, sources, and relationships they repeatedly appear with." },
  memory: { related: ["investigation", "evidence", "timeline", "report"], text: "Past investigations stay connected to their timeline, evidence, and findings — ready to compare with the present." },
  report: { related: ["investigation", "evidence", "verification", "timeline", "memory", "geography", "threat"], text: "Report Studio receives selected findings with their evidence, verification status, change history, and investigation scope — then preserves the output to memory." },
};

const toneFor = (t: NodeType) => (t === "inv" ? "var(--fw-signal)" : t === "report" ? "var(--fw-archive)" : t === "found" ? "var(--fw-verified)" : "var(--fw-ink-2)");

export function ConnectedLensesGraph() {
  const [sel, setSel] = useState<string | null>(null);

  const focus = sel ? FOCUS[sel] : null;
  const isLit = (id: string) => !sel || id === sel || (focus?.related.includes(id) ?? false);

  // Base spokes (faint): investigation↔lens, foundation↔investigation.
  const baseEdges = [
    ...RING.map((id) => ({ a: "investigation", b: id })),
    ...["sources", "archive", "evidence", "verification", "timeline"].map((id) => ({ a: "investigation", b: id })),
  ];

  return (
    <GraphFigure
      title="One investigation. Multiple connected lenses."
      label="select a lens to trace how it connects to evidence and the investigation"
      desc="A central investigation (subject, question, evidence, findings) rests on a shared foundation of sources, archive, evidence, verification and timeline. Connected lenses — narrative, sentiment, emotion, threat, claims, geography, actors, entities and memory — each see a different part of it. Evidence connects every lens. Selected findings flow into Report Studio, which preserves its output to memory."
      badge={<span className="fw-mono" style={{ fontSize: 10.5, color: "var(--fw-ink-4)" }}>select a node</span>}
    >
      {/* Desktop graph */}
      <div className="fw-cl-canvas" onMouseLeave={() => setSel(null)} role="group" aria-label="Connected lenses diagram">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="fw-cl-svg" aria-hidden="true">
          {baseEdges.map((e) => {
            const A = at(e.a), B = at(e.b);
            const lit = !sel || (isLit(e.a) && isLit(e.b));
            return <line key={e.a + e.b} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--fw-line-bright)" strokeWidth={0.4} vectorEffect="non-scaling-stroke" style={{ opacity: lit ? 0.6 : 0.08, transition: "opacity .26s" }} />;
          })}
          {/* Selection spokes from the selected node to its related nodes */}
          {focus && focus.related.map((id) => {
            const A = at(sel!), B = at(id);
            return <line key={"f" + id} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--fw-signal)" strokeWidth={1} vectorEffect="non-scaling-stroke" style={{ transition: "opacity .26s" }} />;
          })}
          {/* Report Studio labeled edges (visible when report selected) */}
          {sel === "report" && REPORT_EDGES.map((e) => {
            const A = at(e.from), B = at("report");
            return <line key={"r" + e.from + e.label} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--fw-archive)" strokeWidth={1} vectorEffect="non-scaling-stroke" />;
          })}
          {sel === "report" && (() => { const M = at("memory"), R = at("report"); return <line x1={R.x} y1={R.y} x2={M.x} y2={M.y} stroke="var(--fw-archive)" strokeWidth={1} strokeDasharray="2 1.6" vectorEffect="non-scaling-stroke" />; })()}
        </svg>

        {/* Report Studio edge labels when selected */}
        {sel === "report" && REPORT_EDGES.map((e) => {
          const A = at(e.from), B = at("report");
          return <span key={"rl" + e.from + e.label} className="fw-cl-edge-label fw-mono" style={{ left: `${(A.x + B.x) / 2}%`, top: `${(A.y + B.y) / 2}%` }}>{e.label}</span>;
        })}
        {sel === "report" && (() => { const M = at("memory"), R = at("report"); return <span className="fw-cl-edge-label fw-mono" style={{ left: `${(R.x + M.x) / 2}%`, top: `${(R.y + M.y) / 2}%` }}>Preserved output</span>; })()}

        {NODES.map((n) => {
          const lit = isLit(n.id);
          const selected = sel === n.id;
          return (
            <button
              key={n.id}
              className={`fw-cl-node fw-cl-${n.type}`}
              style={{ left: `${n.x}%`, top: `${n.y}%`, opacity: lit ? 1 : 0.28, borderColor: selected ? toneFor(n.type) : undefined, boxShadow: selected ? `0 0 0 1px ${toneFor(n.type)}` : undefined }}
              aria-pressed={selected}
              aria-label={n.label}
              onMouseEnter={() => setSel(n.id)}
              onFocus={() => setSel(n.id)}
              onClick={() => setSel((c) => (c === n.id ? null : n.id))}
            >
              <Icon name={n.icon} size={n.type === "inv" ? 16 : 13} color={toneFor(n.type)} />
              <span>{n.label}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation panel */}
      <div className="fw-cl-panel" aria-live="polite">
        {focus ? (
          <p><span className="fw-cl-panel-tag fw-mono">{at(sel!).label}</span>{focus.text}</p>
        ) : (
          <>
            <p><Icon name="link" size={14} color="var(--fw-signal)" style={{ marginRight: 7, verticalAlign: "-2px" }} />Every lens sees a different part of the investigation. Evidence keeps them connected.</p>
            <p className="fw-cl-panel-note">Connections support exploration. They do not prove causation by themselves.</p>
          </>
        )}
      </div>

      {/* Mobile vertical structure */}
      <div className="fw-cl-mobile">
        <div className="fw-cl-m-group">
          <span className="fw-cl-m-h fw-mono">Evidence foundation</span>
          <div className="fw-cl-m-chips">
            {["sources", "archive", "evidence", "verification", "timeline"].map((id) => (
              <span key={id} className="fw-cl-m-chip"><Icon name={at(id).icon} size={13} color="var(--fw-verified)" />{at(id).label}</span>
            ))}
          </div>
        </div>
        <div className="fw-cl-m-inv"><Icon name="git-branch" size={15} color="var(--fw-signal)" /> Investigation <span className="fw-cl-m-sub">· the subject every lens examines</span></div>
        <div className="fw-cl-m-group">
          <span className="fw-cl-m-h fw-mono">Connected lenses</span>
          <ul className="fw-cl-m-list">
            {RING.map((id) => {
              const open = sel === id;
              return (
                <li key={id}>
                  <button className="fw-cl-m-lens" aria-expanded={open} onClick={() => setSel((c) => (c === id ? null : id))}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}><Icon name={LENS_META[id].icon} size={14} color="var(--fw-ink-2)" />{LENS_META[id].label}</span>
                    <Icon name={open ? "minus" : "plus"} size={14} color="var(--fw-ink-4)" />
                  </button>
                  {open && <p className="fw-cl-m-exp">{FOCUS[id].text}</p>}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="fw-cl-m-inv" style={{ borderColor: "var(--fw-archive-edge)" }}><Icon name="clipboard-check" size={15} color="var(--fw-archive)" /> Report Studio <span className="fw-cl-m-sub">· selected findings, kept connected</span></div>
      </div>
    </GraphFigure>
  );
}
