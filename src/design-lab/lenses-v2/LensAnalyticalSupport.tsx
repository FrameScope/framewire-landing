import { GitCompareArrows, Languages, Link2, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";
import type { LensId } from "./lensData";
import type { NativeGraphDefinition, NativeNode } from "./nativeLensData";
import type { MultilingualEvidenceItem } from "./multilingualEvidenceData";

export interface InspectorField {
  label: string;
  value: string;
  state?: "supported" | "qualified" | "missing" | "contested";
}

interface RelatedObservation {
  lens: string;
  observation: string;
  relationship: string;
  state: "Observed" | "Qualified" | "Unresolved" | "Context only";
}

const relatedByLens: Record<LensId, RelatedObservation[]> = {
  narrative: [
    { lens: "Sentiment", observation: "Negative evaluation targets preparedness—not the event’s truth.", relationship: "Same evidence", state: "Context only" },
    { lens: "Emotion", observation: "Reported concern remains attributed to residents.", relationship: "Shared carrier", state: "Observed" },
    { lens: "Portal & Source", observation: "Two dependent copies resolve to one source family.", relationship: "Provenance", state: "Qualified" },
    { lens: "Fact-check", observation: "Temporary-status wording remains under review.", relationship: "Claim family", state: "Unresolved" },
  ],
  sentiment: [
    { lens: "Narrative", observation: "Preparedness is the connected frame for the selected aspect.", relationship: "Shared evidence", state: "Observed" },
    { lens: "Emotion", observation: "Frustration is explicit; it is not inferred from polarity.", relationship: "Independent reading", state: "Qualified" },
    { lens: "Portal & Source", observation: "Carrier and source family stay attached to the observation.", relationship: "Provenance", state: "Context only" },
  ],
  emotion: [
    { lens: "Narrative", observation: "The expression qualifies a preparedness frame.", relationship: "Shared evidence", state: "Context only" },
    { lens: "Sentiment", observation: "Negative stance and concern coexist as separate observations.", relationship: "Independent reading", state: "Observed" },
    { lens: "Author", observation: "The carrier is not automatically the emotion experiencer.", relationship: "Attribution", state: "Qualified" },
  ],
  threat: [
    { lens: "Geography", observation: "The corridor is resolved as context, not as proof of danger.", relationship: "Place reference", state: "Qualified" },
    { lens: "Entity", observation: "Actor and target identities are separately resolved.", relationship: "Canonical identity", state: "Observed" },
    { lens: "Narrative", observation: "Recurrence language is contextual, not intent evidence.", relationship: "Shared evidence", state: "Context only" },
    { lens: "Fact-check", observation: "Timing remains contradicted across source records.", relationship: "Claim evidence", state: "Unresolved" },
  ],
  "fact-check": [
    { lens: "Portal & Source", observation: "Republications collapse into one dependent provenance family.", relationship: "Source lineage", state: "Observed" },
    { lens: "Entity", observation: "The claimant and institution retain separate canonical identities.", relationship: "Identity resolution", state: "Qualified" },
    { lens: "Narrative", observation: "A repeated claim family is not a factual verdict.", relationship: "Claim family", state: "Context only" },
  ],
  geography: [
    { lens: "Threat", observation: "Location context is present; geographic mention alone is insufficient.", relationship: "Resolved place", state: "Qualified" },
    { lens: "Narrative", observation: "Frame distribution may be compared by place without implying spread.", relationship: "Shared evidence", state: "Context only" },
    { lens: "Sentiment", observation: "Selected-evidence stance is attached to a place relation—not a population.", relationship: "Evidence scope", state: "Qualified" },
    { lens: "Entity", observation: "Place aliases resolve to one canonical identity.", relationship: "Alias resolution", state: "Observed" },
  ],
  politico: [
    { lens: "Narrative", observation: "Public positions carry attributed frames, not hidden intent.", relationship: "Statement evidence", state: "Context only" },
    { lens: "Entity", observation: "Actor, institution and role are independently resolved.", relationship: "Typed relation", state: "Observed" },
    { lens: "Author", observation: "Quoted speakers remain separate from article authors.", relationship: "Attribution", state: "Qualified" },
    { lens: "Fact-check", observation: "Position wording can be checked against the original statement.", relationship: "Exact span", state: "Observed" },
  ],
  author: [
    { lens: "Narrative", observation: "Recurring frame participation is observable; motive is not.", relationship: "Publication sequence", state: "Qualified" },
    { lens: "Portal & Source", observation: "Publication identity remains distinct from author identity.", relationship: "Carrier relation", state: "Observed" },
    { lens: "Sentiment", observation: "Author voice and quoted evaluation remain separate holders.", relationship: "Attribution", state: "Qualified" },
    { lens: "Fact-check", observation: "Claims retain exact byline and source provenance.", relationship: "Evidence lineage", state: "Observed" },
  ],
  "portal-source": [
    { lens: "Fact-check", observation: "Dependent copies do not increase independent corroboration.", relationship: "Provenance", state: "Observed" },
    { lens: "Narrative", observation: "Propagation can carry a frame without proving coordination.", relationship: "Shared wording", state: "Qualified" },
    { lens: "Author", observation: "Bylines remain attached to each publication record.", relationship: "Carrier identity", state: "Observed" },
    { lens: "Entity", observation: "Outlet aliases resolve separately from organisations mentioned in text.", relationship: "Identity scope", state: "Context only" },
  ],
  "entity-relationship": [
    { lens: "Geography", observation: "Place identity is resolved before a geographic relationship is asserted.", relationship: "Canonical place", state: "Observed" },
    { lens: "Politico", observation: "A public role requires time-valid institutional evidence.", relationship: "Typed role", state: "Qualified" },
    { lens: "Author", observation: "Same-name authors remain separate while context is insufficient.", relationship: "Disambiguation", state: "Unresolved" },
    { lens: "Narrative", observation: "Carrier participation does not create an unsupported relationship.", relationship: "Evidence link", state: "Context only" },
  ],
};

export function RelatedLensContext({ lensId }: { lensId: LensId }) {
  return (
    <section className="lens-related-context" aria-label="Related lens context">
      <header><div><span>RELATED LENS CONTEXT</span><h4>Independent observations linked by shared evidence</h4></div><p>No master score. Each observation keeps its own authority boundary.</p></header>
      <div>{relatedByLens[lensId].map((item) => <article key={`${item.lens}-${item.relationship}`}><b>{item.lens}</b><p>{item.observation}</p><footer><span>{item.relationship}</span><em>{item.state}</em></footer></article>)}</div>
    </section>
  );
}

export function InterpretationStrip({ note }: { note: string }) {
  return <div className="lens-interpretation-strip"><GitCompareArrows size={17} aria-hidden="true" /><p><strong>INTERPRETATION NOTE</strong>{note}</p><span>Evidence states remain inspectable</span></div>;
}

export function NativeEvidenceLedger({ graph, activeNode }: { graph: NativeGraphDefinition; activeNode: NativeNode }) {
  const linked = graph.edges.filter((edge) => edge.from === activeNode.id || edge.to === activeNode.id);
  const states = linked.length ? linked.slice(0, 3) : graph.edges.slice(0, 3);
  return (
    <section className="native-evidence-ledger" aria-label="Evidence relationship ledger">
      <header><span>EVIDENCE RELATIONSHIP LEDGER</span><b>{states.length} inspectable relations</b></header>
      {states.map((edge) => {
        const peerId = edge.from === activeNode.id ? edge.to : edge.from;
        const peer = graph.nodes.find((node) => node.id === peerId) ?? graph.nodes[0];
        return <div key={`${edge.from}-${edge.to}-${edge.label}`}><strong>{edge.label}</strong><p>{peer.label}</p><span className={`ledger-${edge.state ?? "solid"}`}>{peer.state}</span></div>;
      })}
      <p><Link2 size={14} aria-hidden="true" /> Exact relationships stay attached to their evidence basis; absence remains visible.</p>
    </section>
  );
}

const nativeSpecificFields: Record<NativeGraphDefinition["id"], Array<[string, string, InspectorField["state"]?]>> = {
  threat: [["Supporting evidence", "Recurrence and corridor observations", "supported"], ["Contradicting evidence", "Operational timing differs across records", "contested"], ["Missing evidence", "Mechanism and mobilisation", "missing"], ["Independence", "Two source families; copies grouped", "qualified"]],
  verification: [["Original language", "नेपाली · हिन्दी · English", "supported"], ["Claim family", "Temporary restrictions remain", "qualified"], ["Source independence", "One original + one separate lineage", "qualified"], ["Provenance", "Original → translation → republication", "supported"]],
  geography: [["Original source string", "काठमाडौं / काठमांडू / Kathmandu", "supported"], ["Canonical place", "Kathmandu", "supported"], ["ADM hierarchy", "Nepal → Bagmati → Kathmandu", "supported"], ["Resolution state", "Country-scoped canonical match", "qualified"]],
  politico: [["Institution", "Public transport committee", "supported"], ["Time-valid role", "Committee member · resolved window", "qualified"], ["Issue", "Monsoon transport policy", "supported"], ["Public position", "Attributed statement only", "qualified"]],
  author: [["Byline", "Resolved public byline", "qualified"], ["Publication", "Regional news report", "supported"], ["Language", "नेपाली / English publication record", "supported"], ["Attribution", "Author voice separated from quoted voice", "qualified"]],
  "portal-source": [["Source family", "Institutional notice family", "supported"], ["Original / dependent", "Original preserved; copies grouped", "qualified"], ["Language lineage", "English → हिन्दी → नेपाली", "supported"], ["Independence", "Amplification is not verification", "qualified"]],
  "entity-relationship": [["Original name", "काठमाडौं महानगर", "supported"], ["Aliases", "Kathmandu Metropolitan City · KMC", "qualified"], ["Entity type", "Public institution", "supported"], ["Time validity", "Current public record window", "qualified"]],
};

export function nativeInspectorFields(graph: NativeGraphDefinition, node: NativeNode, relationship: string): InspectorField[] {
  return [
    { label: "Element type", value: node.type },
    { label: "Relationship", value: relationship, state: relationship.includes("MISSING") ? "missing" : "supported" },
    { label: "Evidence basis", value: node.evidence, state: node.state.toLowerCase().includes("missing") ? "missing" : "supported" },
    { label: "Analytical state", value: node.state, state: node.tone === "unresolved" ? "missing" : node.tone === "contested" ? "contested" : "qualified" },
    ...nativeSpecificFields[graph.id].map(([label, value, state]) => ({ label, value, state })),
  ];
}

export function MultilingualSecondaryAnalysis({ lensId, activeItem }: { lensId: "narrative" | "sentiment" | "emotion"; activeItem: MultilingualEvidenceItem }) {
  if (lensId === "narrative") {
    const stages = ["Preparedness", "Safety response", "Coordination", "Qualification"];
    return <section className="ml-secondary-analysis"><header><span>SECOND ANALYTICAL DIMENSION</span><h4>Narrative evolution / frame movement</h4><p>How frames persist, split or become qualified through the evidence window.</p></header><div className="frame-evolution" aria-label="Ordered frame evolution"><b>EARLIER EVIDENCE</b>{stages.map((stage, index) => <button key={stage} type="button" className={activeItem.narrative.family.includes(stage.split(" ")[0]) ? "active" : ""}><i style={{ "--flow": `${34 + index * 14}%` } as CSSProperties} /><span>{stage}</span><small>{index === 3 ? "Qualified / contested" : `${index + 2} carried observations`}</small></button>)}<b>LATER EVIDENCE</b></div></section>;
  }
  if (lensId === "sentiment") {
    const rows = [["नेपाली Social", 82, 14], ["हिन्दी Social", 90, 24], ["News", 34, 8], ["Official", 6, 11]];
    return <section className="ml-secondary-analysis"><header><span>SECOND ANALYTICAL DIMENSION</span><h4>Diverging sentiment distribution</h4><p>Selected-evidence observations grouped by source and language—not public opinion.</p></header><div className="diverging-bars" aria-label="Negative and positive evidence distribution"><span>NEGATIVE ←</span><i /> <span>→ POSITIVE</span>{rows.map(([label, negative, positive]) => <div key={String(label)}><b>{label}</b><em style={{ width: `${negative}%` }} /><i /><strong style={{ width: `${positive}%` }} /></div>)}</div></section>;
  }
  const rows = [["Direct", 4], ["Quoted", 1], ["Reported", 2], ["Attributed", 1], ["Not expressed", 4]];
  return <section className="ml-secondary-analysis"><header><span>SECOND ANALYTICAL DIMENSION</span><h4>Expression / attribution distribution</h4><p>Expression type remains attached to the attributed experiencer and source.</p></header><div className="attribution-distribution" aria-label="Emotion expression attribution distribution">{rows.map(([label, count]) => <div key={String(label)}><b>{label}</b><i><span style={{ width: `${Number(count) * 20}%` }} /></i><em>{count} observations</em></div>)}</div><footer><Languages size={15} aria-hidden="true" /> Original-language expression remains primary; translation is a derived inspection view.</footer></section>;
}

export function LensAuthorityBoundary({ observes, refuses }: { observes: string; refuses: string }) {
  return <section className="lens-authority-boundary"><ShieldCheck size={19} aria-hidden="true" /><div><span>AUTHORITY BOUNDARY</span><p><strong>Observes:</strong> {observes}</p><p><strong>Does not establish:</strong> {refuses}</p></div></section>;
}
