import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Check, CircleHelp, GitBranch, MapPin, ShieldCheck } from "lucide-react";
import type { LensDefinition } from "./lensData";
import { nativeGraphs, type NativeEdge, type NativeGraphDefinition, type NativeLensId, type NativeNode } from "./nativeLensData";
import {
  InterpretationStrip,
  LensAuthorityBoundary,
  NativeEvidenceLedger,
  RelatedLensContext,
  nativeInspectorFields,
} from "./LensAnalyticalSupport";

const secondaryTitles: Record<NativeLensId, string> = {
  threat: "Actor / Target / Mechanism Evidence Matrix",
  verification: "Source Provenance / Independence DAG",
  geography: "Multilingual Place Resolution",
  politico: "Issue–Position Matrix",
  author: "Observable Temporal Pattern",
  "portal-source": "Source Family / Independence View",
  "entity-relationship": "Identity / Alias Resolution",
};

function curvedPath(from: NativeNode, to: NativeNode) {
  const mid = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mid} ${from.y}, ${mid} ${to.y}, ${to.x} ${to.y}`;
}

function GraphEdge({ edge, graph, activeId }: { edge: NativeEdge; graph: NativeGraphDefinition; activeId: string }) {
  const from = graph.nodes.find((node) => node.id === edge.from)!;
  const to = graph.nodes.find((node) => node.id === edge.to)!;
  const active = edge.from === activeId || edge.to === activeId;
  return (
    <g className={`native-edge edge-${edge.state ?? "solid"} ${active ? "is-active" : ""}`}>
      <path d={curvedPath(from, to)} />
      <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 1.4}>{edge.label}</text>
    </g>
  );
}

function GeographyPlate() {
  return (
    <svg className="native-map-plate" viewBox="0 0 100 100" aria-hidden="true">
      <path className="map-nepal" d="M10 48 L18 43 L28 46 L36 42 L48 46 L55 42 L63 46 L57 54 L46 56 L35 53 L25 57 L15 54 Z" />
      <path className="map-india" d="M55 18 L72 14 L88 23 L92 39 L84 52 L79 69 L67 87 L57 68 L51 52 L60 42 Z" />
      <path className="map-boundary" d="M12 59 C28 63 45 59 60 65 S82 69 92 61" />
      <text x="24" y="39">NEPAL</text><text x="72" y="34">NORTHERN INDIA</text>
    </svg>
  );
}

function PrimaryNetwork({ graph, activeId, onSelect }: { graph: NativeGraphDefinition; activeId: string; onSelect: (id: string) => void }) {
  const connected = useMemo(() => {
    const ids = new Set([activeId]);
    graph.edges.forEach((edge) => {
      if (edge.from === activeId) ids.add(edge.to);
      if (edge.to === activeId) ids.add(edge.from);
    });
    return ids;
  }, [activeId, graph.edges]);

  return (
    <section className={`native-primary native-${graph.id}`} aria-label={graph.title}>
      <p className="l2-sr-only">{graph.summary}</p>
      {graph.id === "geography" && <GeographyPlate />}
      <svg className="native-edge-field" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {graph.edges.map((edge) => <GraphEdge key={`${edge.from}-${edge.to}-${edge.label}`} edge={edge} graph={graph} activeId={activeId} />)}
      </svg>
      <div className="native-mobile-sequence" aria-hidden="true">{graph.id === "portal-source" ? "ORIGIN → PUBLICATION → TRANSLATION → AMPLIFICATION" : graph.question}</div>
      {graph.nodes.map((node, index) => {
        const active = node.id === activeId;
        const related = connected.has(node.id);
        return (
          <button
            key={node.id}
            type="button"
            className={`native-node tone-${node.tone} shape-${node.shape} ${active ? "is-active" : ""} ${related ? "is-related" : "is-dimmed"}`}
            style={{ "--nx": `${node.x}%`, "--ny": `${node.y}%`, "--native-delay": `${60 + index * 45}ms` } as CSSProperties}
            aria-pressed={active}
            aria-controls={`native-${graph.id}-detail`}
            aria-label={`${node.type}: ${node.label}. ${node.note}`}
            onMouseEnter={() => onSelect(node.id)}
            onFocus={() => onSelect(node.id)}
            onClick={() => onSelect(node.id)}
          >
            <span>{node.type}</span><strong>{node.label}</strong><small>{node.state}</small>
          </button>
        );
      })}
    </section>
  );
}

const matrixRows = [
  ["Actor", "supported", "Two attributed references"], ["Target", "supported", "Explicit institution reference"],
  ["Mechanism", "missing", "No qualifying mechanism evidence"], ["Capability", "partial", "Single contextual reference"],
  ["Geography", "supported", "Resolved corridor context"], ["Immediacy", "contradicted", "Conflicting operational timing"],
  ["Mobilization", "missing", "No supported observation"], ["Source independence", "partial", "Two families; copied items grouped"],
] as const;

function ThreatMatrix({ onSelect }: { onSelect: (id: string) => void }) {
  const nodeByRow = ["th-actor", "th-target", "th-mechanism", "th-capability", "th-geo", "th-time", "th-mob", "th-ind"];
  return (
    <div className="native-matrix" role="table" aria-label="Threat evidence convergence matrix">
      <div className="matrix-head" role="row"><span role="columnheader">Dimension</span><span role="columnheader">Evidence state</span><span role="columnheader">Basis</span></div>
      {matrixRows.map(([name, state, basis], index) => (
        <button key={name} type="button" role="row" onClick={() => onSelect(nodeByRow[index])} onFocus={() => onSelect(nodeByRow[index])}>
          <strong role="cell">{name}</strong><span role="cell" className={`matrix-state state-${state}`}>{state}</span><small role="cell">{basis}</small>
        </button>
      ))}
    </div>
  );
}

function ProvenanceDag({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="native-dag native-provenance" aria-label="Source provenance and independence graph">
      <button type="button" onClick={() => onSelect("fc-support-a")}><span>ORIGINAL</span><strong>Archived authority notice</strong></button>
      <i aria-hidden="true" />
      <div>
        <button type="button" onClick={() => onSelect("fc-copy")}><span>REPUBLISHES</span><strong>Portal copy</strong><small>Dependent</small></button>
        <button type="button" onClick={() => onSelect("fc-copy")}><span>TRANSLATES</span><strong>Hindi rewrite</strong><small>Dependent</small></button>
        <button type="button" className="independent" onClick={() => onSelect("fc-support-b")}><span>SEPARATE LINEAGE</span><strong>Local update</strong><small>Independent candidate</small></button>
      </div>
      <p><GitBranch size={15} aria-hidden="true" /> Repeated wording remains one provenance family, not multiple independent confirmations.</p>
    </div>
  );
}

function PlaceResolution({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="native-alias" aria-label="Multilingual canonical place resolution">
      <div><button type="button" onClick={() => onSelect("ge-kath")}>काठमाडौं</button><button type="button" onClick={() => onSelect("ge-kath")}>काठमांडू</button><button type="button" onClick={() => onSelect("ge-kath")}>Kathmandu</button></div>
      <i aria-hidden="true">RESOLVES TO</i>
      <button type="button" className="canonical" onClick={() => onSelect("ge-kath")}><MapPin size={18} aria-hidden="true" /><span>CANONICAL PLACE</span><strong>Kathmandu</strong><small>Nepal → Bagmati → Kathmandu</small></button>
      <p>Language alias ≠ country identity. Mentioned place ≠ event location.</p>
    </div>
  );
}

const positionRows = [
  ["Public actor A", "observed", "not stated", "observed"],
  ["Public actor B", "not stated", "observed", "observed"],
  ["Public actor C", "observed", "not stated", "not stated"],
] as const;

function PositionMatrix({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="position-matrix" role="table" aria-label="Public issue position matrix">
      <div role="row"><span role="columnheader">Actor</span><span role="columnheader">Safety review</span><span role="columnheader">Infrastructure review</span><span role="columnheader">Public information</span></div>
      {positionRows.map((row, rowIndex) => <button key={row[0]} type="button" role="row" onClick={() => onSelect(["pi-actor-a", "pi-actor-b", "pi-actor-c"][rowIndex])}>{row.map((cell, index) => index === 0 ? <strong role="cell" key={cell}>{cell}</strong> : <span role="cell" className={cell.replace(" ", "-")} key={`${cell}-${index}`}>{cell === "observed" ? <Check size={14} aria-label="Observed position" /> : "—"}</span>)}</button>)}
      <p>Cells show publicly evidenced position states—not agreement, influence or electoral probability.</p>
    </div>
  );
}

const temporalTracks = [
  { label: "Preparedness frame", points: [8, 44, 83], id: "au-frame" },
  { label: "Official-source use", points: [24, 58, 91], id: "au-source" },
  { label: "Quoted public voice", points: [48, 78], id: "au-quote" },
  { label: "Transport topic", points: [12, 50, 88], id: "au-topic" },
];

function AuthorTimeline({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="native-timeline" aria-label="Ordered observable author patterns">
      <header><span>EARLIER EVIDENCE</span><span>LATER EVIDENCE</span></header>
      {temporalTracks.map((track) => <button type="button" key={track.label} onClick={() => onSelect(track.id)}><strong>{track.label}</strong><i aria-hidden="true">{track.points.map((point) => <b key={point} style={{ left: `${point}%` }} />)}</i></button>)}
      <p>Ordered publication observations reveal recurrence only. They do not establish hidden motive or coordination.</p>
    </div>
  );
}

function SourceFamily({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="source-family" aria-label="Source family and independence view">
      <section><header><span>DEPENDENT FAMILY</span><strong>One preserved origin</strong></header>{[["Original notice", "ps-original"], ["Hindi translation", "ps-hi"], ["Nepali summary", "ps-ne"], ["Syndicated copy", "ps-copy"], ["Social repost", "ps-x"]].map(([label, id]) => <button type="button" key={id} onClick={() => onSelect(id)}><i aria-hidden="true" /><span>{label}</span></button>)}</section>
      <section className="independent"><header><span>SEPARATE LINEAGE</span><strong>Independent candidate</strong></header><button type="button" onClick={() => onSelect("ps-ind")}><ShieldCheck size={17} aria-hidden="true" /><span>Local reporting with separate observations</span></button></section>
      <p><strong>Five dependent copies ≠ five independent sources.</strong> Provenance remains visible throughout propagation.</p>
    </div>
  );
}

function AliasResolution({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="entity-resolution" aria-label="Identity and alias resolution graph">
      <div className="alias-candidates"><button type="button" onClick={() => onSelect("er-mention")}>Public spokesperson</button><button type="button" onClick={() => onSelect("er-mention")}>K. Sharma</button><button type="button" onClick={() => onSelect("er-mention")}>के. शर्मा</button></div>
      <span aria-hidden="true">CONTEXT + ROLE + SOURCE</span>
      <button type="button" className="resolved" onClick={() => onSelect("er-person")}><strong>Canonical person identity</strong><small>Evidence-backed resolution</small></button>
      <button type="button" className="separated" onClick={() => onSelect("er-candidate")}><CircleHelp size={17} aria-hidden="true" /><strong>Same-name candidate</strong><small>Separated — insufficient context</small></button>
      <p>Mention ≠ identity. Name match ≠ supported relationship.</p>
    </div>
  );
}

function SecondaryGraph({ graph, onSelect }: { graph: NativeGraphDefinition; onSelect: (id: string) => void }) {
  let content: ReactNode;
  switch (graph.id) {
    case "threat": content = <ThreatMatrix onSelect={onSelect} />; break;
    case "verification": content = <ProvenanceDag onSelect={onSelect} />; break;
    case "geography": content = <PlaceResolution onSelect={onSelect} />; break;
    case "politico": content = <PositionMatrix onSelect={onSelect} />; break;
    case "author": content = <AuthorTimeline onSelect={onSelect} />; break;
    case "portal-source": content = <SourceFamily onSelect={onSelect} />; break;
    case "entity-relationship": content = <AliasResolution onSelect={onSelect} />; break;
  }
  return <section className={`native-secondary secondary-${graph.id}`}><header><span>SECOND ANALYTICAL DIMENSION</span><h4>{secondaryTitles[graph.id]}</h4></header>{content}</section>;
}

export function NativeLensVisual({ lens }: { lens: LensDefinition }) {
  const graph = nativeGraphs[lens.visualType as NativeLensId];
  const [activeId, setActiveId] = useState(graph.nodes[0].id);
  const activeNode = graph.nodes.find((node) => node.id === activeId) ?? graph.nodes[0];
  const relationship = graph.edges.find((edge) => edge.from === activeId || edge.to === activeId)?.label ?? "EVIDENCE CONTEXT";
  const inspectorFields = nativeInspectorFields(graph, activeNode, relationship);

  return (
    <div className={`native-lens-shell accent-${lens.accent}`}>
      <header className="native-lens-header"><div><span>LENS-NATIVE ANALYTICAL VIEW</span><h3>{graph.title}</h3><p>{graph.question}</p></div><ul aria-label="Graph legend">{graph.legend.map((item) => <li key={item}>{item}</li>)}</ul></header>
      <PrimaryNetwork graph={graph} activeId={activeId} onSelect={setActiveId} />
      <aside id={`native-${graph.id}-detail`} className="native-detail" aria-live="polite">
        <div><span>{graph.id === "verification" ? "SELECTED CLAIM OR EVIDENCE" : graph.id === "geography" ? "SELECTED PLACE OR RELATION" : graph.id === "entity-relationship" ? "SELECTED ENTITY OR RELATION" : "SELECTED ANALYTICAL ELEMENT"}</span><strong>{activeNode.label}</strong><p>{activeNode.note}</p><small>{graph.question}</small></div>
        <dl>{inspectorFields.map((field) => <div key={field.label} data-state={field.state}><dt>{field.label}</dt><dd>{field.value}</dd></div>)}</dl>
        <p className="native-boundary"><ShieldCheck size={16} aria-hidden="true" /><span><strong>INSPECTOR LIMIT</strong>{lens.limitation}</span></p>
      </aside>
      <div className="native-support-grid">
        <SecondaryGraph graph={graph} onSelect={setActiveId} />
        <NativeEvidenceLedger graph={graph} activeNode={activeNode} />
      </div>
      <RelatedLensContext lensId={lens.id} />
      <InterpretationStrip note={`${graph.summary} The secondary view responds to the same bounded evidence model and never creates a combined score.`} />
      <LensAuthorityBoundary observes={lens.boundary} refuses={lens.limitation} />
    </div>
  );
}
