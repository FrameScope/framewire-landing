import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Archive, Ban, Braces, FileSearch, Gavel, Link2, ScanSearch, ShieldCheck } from "lucide-react";
import type { EvidenceDefinition, EvidenceNode, EvidenceNodeKind } from "./evidenceData";

const kindLabels: Record<EvidenceNodeKind, string> = {
  source: "Source material", record: "Evidence record", derived: "Derived layer", gate: "Governance gate",
  scope: "Evidence scope", observation: "Observation", human: "Human use", limitation: "Limitation",
};

const kindIcons = {
  source: FileSearch, record: Archive, derived: Braces, gate: ShieldCheck,
  scope: ScanSearch, observation: Link2, human: Gavel, limitation: Ban,
} satisfies Record<EvidenceNodeKind, typeof Archive>;

function edgePath(from: EvidenceNode, to: EvidenceNode) {
  const mid = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mid} ${from.y}, ${mid} ${to.y}, ${to.x} ${to.y}`;
}

function connectedNodes(workflow: EvidenceDefinition, activeId: string) {
  const upstream = new Set([activeId]);
  const downstream = new Set([activeId]);
  let changed = true;
  while (changed) {
    changed = false;
    workflow.edges.forEach((edge) => {
      if (upstream.has(edge.to) && !upstream.has(edge.from)) { upstream.add(edge.from); changed = true; }
      if (downstream.has(edge.from) && !downstream.has(edge.to)) { downstream.add(edge.to); changed = true; }
    });
  }
  return new Set([...upstream, ...downstream]);
}

function NodeDetail({ node }: { node: EvidenceNode }) {
  return (
    <aside className={`e2-node-detail kind-${node.kind}`} aria-live="polite">
      <span>SELECTED EVIDENCE STATE</span>
      <h4>{node.label}</h4>
      <p className="state"><b>{kindLabels[node.kind]}</b>{node.state}</p>
      <div><strong>Meaning</strong><p>{node.meaning}</p></div>
      <div><strong>Requires</strong><ul>{node.requires.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div><strong>Does not mean</strong><ul>{node.doesNot.map((item) => <li key={item}>{item}</li>)}</ul></div>
    </aside>
  );
}

function InspectorSurface({ evidence, activeId, onSelect }: { evidence: EvidenceDefinition; activeId: string; onSelect: (id: string) => void }) {
  const [representation, setRepresentation] = useState<"original" | "normalized">("original");
  const nodeMap = new Map(evidence.nodes.map((item) => [item.id, item]));
  const field = (id: string, label: string) => {
    const item = nodeMap.get(id);
    if (!item) return null;
    return <button type="button" className={`e2-inspector-field kind-${item.kind} ${activeId === id ? "active" : ""}`} aria-pressed={activeId === id} onClick={() => onSelect(id)}><span>{label}</span><strong>{item.label}</strong><small>{item.state}</small></button>;
  };
  return (
    <div className="e2-inspector-surface" aria-label="Interactive read-only Source Inspector">
      <div className="e2-inspector-bar"><div><FileSearch size={16} aria-hidden="true" /><span>SOURCE &amp; PROVENANCE</span></div><strong><ShieldCheck size={15} aria-hidden="true" /> ORIGINAL PRESERVED</strong></div>
      <div className="e2-inspector-body">
        <section className="e2-inspector-primary">
          <header><span>ILLUSTRATIVE EVIDENCE STRUCTURE</span><h4>Official public record</h4><p>Retrieved through a governed acquisition route and preserved before analysis.</p></header>
          <div className="e2-inspector-tabs" aria-label="Content representation">
            <button type="button" className={representation === "original" ? "active" : ""} aria-pressed={representation === "original"} onClick={() => setRepresentation("original")}>Original</button>
            <button type="button" className={representation === "normalized" ? "active" : ""} aria-pressed={representation === "normalized"} onClick={() => setRepresentation("normalized")}>Normalized</button>
          </div>
          <div className="e2-record-preview" aria-live="polite">
            <span>{representation === "original" ? "COLLECTED CONTENT · READ ONLY" : "NORMALIZED REPRESENTATION · READ ONLY"}</span>
            <p>{representation === "original" ? "An institutional notice states the publicly released terms and date associated with a regional administrative decision. The preserved wording remains separate from any later interpretation or verification." : "Institutional notice · regional administrative decision · publicly released terms and associated date. This prepared view remains linked to the preserved source."}</p>
            <small>{representation === "original" ? "Original language authority retained · executable markup disabled" : "Formatting normalized for inspection · original wording remains authoritative"}</small>
          </div>
          <div className="e2-inspector-lineage"><span>EVIDENCE LINEAGE</span><p>Source <i /> Archive <i /> Prepared Evidence <i className="broken" /> Investigation</p><small>Downstream link unavailable where no recorded relationship exists.</small></div>
        </section>
        <aside className="e2-inspector-meta">
          {field("si-identity","IDENTITY")}{field("si-original","ARCHIVE STATE")}{field("si-normalized","CONTENT STATE")}{field("si-governance","GOVERNANCE")}{field("si-verification","VERIFICATION")}{field("si-lineage","LINEAGE")}
        </aside>
      </div>
      <div className="e2-inspector-notice"><button type="button" className={activeId === "si-notice" ? "active" : ""} onClick={() => onSelect("si-notice")}><Archive size={15} aria-hidden="true" /><span><strong>RAW RECORD · NON-CANONICAL</strong>Preserved evidence, not verified intelligence.</span></button><button type="button" className={activeId === "si-readonly" ? "active" : ""} onClick={() => onSelect("si-readonly")}><Ban size={15} aria-hidden="true" /><span><strong>READ ONLY</strong>Cannot be edited, promoted or sent to an engine from here.</span></button></div>
    </div>
  );
}

export function EvidenceVisual({ evidence }: { evidence: EvidenceDefinition }) {
  const [activeId, setActiveId] = useState(evidence.nodes[0].id);
  useEffect(() => setActiveId(evidence.nodes[0].id), [evidence]);
  const nodeMap = useMemo(() => new Map(evidence.nodes.map((item) => [item.id, item])), [evidence.nodes]);
  const related = useMemo(() => connectedNodes(evidence, activeId), [activeId, evidence]);
  const activeNode = nodeMap.get(activeId) ?? evidence.nodes[0];

  return (
    <section className={`e2-visual visual-${evidence.visualType}`} aria-labelledby={`${evidence.id}-visual-title`}>
      <header className="e2-visual-head">
        <div><span>EVIDENCE STRUCTURE</span><h3 id={`${evidence.id}-visual-title`}>{evidence.visualTitle}</h3></div>
        <p>{evidence.visualSummary}</p>
      </header>
      <div className="e2-kind-legend" aria-label="Evidence diagram categories">
        {(Object.keys(kindLabels) as EvidenceNodeKind[]).map((kind) => <span key={kind} className={`kind-${kind}`}><i aria-hidden="true" />{kindLabels[kind]}</span>)}
      </div>
      <div className="e2-visual-layout">
        {evidence.visualType === "source-inspector" ? <InspectorSurface evidence={evidence} activeId={activeId} onSelect={setActiveId} /> : (
          <div className="e2-canvas" role="group" aria-label={`${evidence.name} interactive evidence visualization`}>
            <svg className="e2-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs><marker id={`e2-arrow-${evidence.id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L8 4L0 8Z" /></marker></defs>
              {evidence.edges.map((edge) => {
                const from = nodeMap.get(edge.from); const to = nodeMap.get(edge.to);
                if (!from || !to) return null;
                const lit = related.has(edge.from) && related.has(edge.to);
                return <g key={`${edge.from}-${edge.to}`} className={lit ? "related" : "dimmed"}><path className={edge.style ?? "solid"} d={edgePath(from,to)} markerEnd={`url(#e2-arrow-${evidence.id})`} /><text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 1.1}>{edge.label}</text></g>;
              })}
            </svg>
            {evidence.nodes.map((item) => {
              const Icon = kindIcons[item.kind];
              return <button key={item.id} type="button" className={`e2-node kind-${item.kind} ${item.id === activeId ? "active" : ""} ${related.has(item.id) ? "related" : "dimmed"}`} style={{ "--node-x": `${item.x}%`, "--node-y": `${item.y}%` } as CSSProperties} aria-pressed={item.id === activeId} aria-controls={`${evidence.id}-state-detail`} onClick={() => setActiveId(item.id)}><Icon size={15} aria-hidden="true" /><span><b>{kindLabels[item.kind]}</b><strong>{item.label}</strong><small>{item.state}</small></span></button>;
            })}
          </div>
        )}
        <div id={`${evidence.id}-state-detail`}><NodeDetail node={activeNode} /></div>
      </div>
    </section>
  );
}
