import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, GitBranch, Info, ShieldCheck } from "lucide-react";
import type { LensDefinition, PlatformStage, PlatformStageId } from "./platformData";

type FlowStep = { label: string; role: "INPUT" | "PROCESS" | "OUTPUT" | "BOUNDARY"; note: string; state?: string };

const platformFlows: Record<Exclude<PlatformStageId, "control">, FlowStep[]> = {
  collect: [
    { label: "Public feeds", role: "INPUT", note: "Approved public feeds enter as observable material." },
    { label: "Stories", role: "INPUT", note: "Published stories retain carrier and source identity." },
    { label: "Entities", role: "INPUT", note: "Observed people, organisations and places remain source-linked." },
    { label: "Sources", role: "INPUT", note: "Source registry context travels with retrieval." },
    { label: "Governed intake", role: "PROCESS", note: "Configured routes and provider controls authorize acquisition." },
    { label: "Material registered", role: "OUTPUT", note: "The observed item receives a stable collection record." },
    { label: "Retrieval context", role: "OUTPUT", note: "Provider, source and collection context remain attached." },
  ],
  preserve: [
    { label: "Retrieved material", role: "INPUT", note: "The collected item enters preservation before analytical use." },
    { label: "Canonical Raw Archive", role: "PROCESS", note: "The untouched collection record becomes the preservation authority." },
    { label: "Content hash", role: "PROCESS", note: "A bounded integrity reference supports later comparison." },
    { label: "Provenance", role: "PROCESS", note: "Source, provider, retrieval and transformation lineage is recorded." },
    { label: "Original preserved", role: "OUTPUT", note: "Cleaning and extraction cannot overwrite the original material." },
  ],
  discover: [
    { label: "Question / query", role: "INPUT", note: "A governed query describes what the user wants to find." },
    { label: "Archive reuse", role: "PROCESS", note: "Existing preserved holdings are searched first." },
    { label: "Active search", role: "PROCESS", note: "Approved providers may surface fresh public candidates." },
    { label: "Raw ecosystem view", role: "OUTPUT", note: "Archived and fresh candidates remain visibly distinct." },
    { label: "Candidate material", role: "OUTPUT", note: "Results are available for selection, not silently admitted to a case." },
  ],
  investigate: [
    { label: "Selected material", role: "INPUT", note: "A human chooses which eligible material belongs in the case." },
    { label: "Investigation scope", role: "BOUNDARY", note: "The selected evidence IDs define the bounded analytical universe." },
    { label: "Timeline", role: "PROCESS", note: "Events and evidence are ordered inside the investigation scope." },
    { label: "Workspace", role: "PROCESS", note: "Claims, entities, locations and notes remain inspectable together." },
    { label: "Findings & notes", role: "OUTPUT", note: "Human findings stay connected to supporting and contradicting evidence." },
  ],
  analyze: [
    { label: "Scoped evidence", role: "INPUT", note: "Every selected lens reads the same investigation-bounded evidence." },
    { label: "Ten independent lenses", role: "PROCESS", note: "Narrative, Sentiment, Emotion, Threat, Verification and other lenses remain independent." },
    { label: "Separate observations", role: "OUTPUT", note: "Each lens records its own evidence-backed state and limitation." },
    { label: "Contradiction retained", role: "OUTPUT", note: "Disagreement is visible rather than averaged into one answer." },
    { label: "Human review", role: "BOUNDARY", note: "Lens output is not automatically a human finding or truth score." },
  ],
  understand: [
    { label: "Lens observations", role: "INPUT", note: "Independent observations enter contextual comparison without mutation." },
    { label: "Cross-lens context", role: "PROCESS", note: "Shared evidence supports comparison across analytical perspectives." },
    { label: "Relationship linking", role: "PROCESS", note: "Only supported entity, evidence and memory relationships are connected." },
    { label: "Reasoning support", role: "PROCESS", note: "Contradictions, gaps and continuity remain inspectable." },
    { label: "Human interpretation", role: "OUTPUT", note: "The investigator decides what the combined context responsibly supports." },
  ],
  calculate: [
    { label: "Governed data inputs", role: "INPUT", note: "Scoped datasets retain method, manifest and provenance." },
    { label: "Comparisons", role: "PROCESS", note: "Time, source and geographic groups may be compared." },
    { label: "Dataset profiles", role: "PROCESS", note: "Coverage, missingness and structure remain visible." },
    { label: "Bounded metrics", role: "PROCESS", note: "Descriptive measures remain tied to their defined evidence window." },
    { label: "Governed outputs", role: "OUTPUT", note: "Analytics leave with caveats and reproducible method context." },
  ],
  report: [
    { label: "Evidence observations", role: "INPUT", note: "Exact evidence and reviewed lens observations enter assembly." },
    { label: "Synthesis", role: "PROCESS", note: "Selected findings are organised without rewriting the source." },
    { label: "Contradiction check", role: "PROCESS", note: "Challenges, insufficiency and limitations stay visible." },
    { label: "Draft assembly", role: "PROCESS", note: "Evidence-linked sections form a reviewable report draft." },
    { label: "Human review handoff", role: "BOUNDARY", note: "Only a human can include, qualify, revise, exclude or finalize." },
  ],
  continue: [
    { label: "Tracked subject", role: "INPUT", note: "A reviewed subject or item remains available for continuity." },
    { label: "Watchlist", role: "PROCESS", note: "Defined monitoring conditions govern what is observed later." },
    { label: "Change detection", role: "PROCESS", note: "New public material is compared with dated prior context." },
    { label: "Alert / continuity", role: "OUTPUT", note: "A match creates an operational notice, not a conclusion." },
    { label: "Reopen if needed", role: "BOUNDARY", note: "A human decides whether change warrants returning to investigation." },
  ],
};

export function PlatformOperationalInfographic({ stage }: { stage: PlatformStage }) {
  const steps = platformFlows[stage.id as Exclude<PlatformStageId, "control">];
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => setActiveIndex(0), [stage.id]);
  const active = steps[activeIndex];

  return (
    <div className={`home-platform-infographic flow-${stage.id}`} aria-label={`${stage.title} operational infographic`}>
      <header><span>OPERATIONAL FLOW</span><strong>{stage.title}</strong><small>Input → processing → bounded output</small></header>
      <div className="home-platform-flow" role="group" aria-label={`${stage.title} process steps`}>
        {steps.map((step, index) => (
          <button key={step.label} type="button" data-role={step.role} className={activeIndex === index ? "active" : ""} aria-pressed={activeIndex === index} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)} style={{ "--flow-order": index } as CSSProperties}>
            <span>{step.role}</span><strong>{step.label}</strong><small>{step.state ?? (index === steps.length - 1 ? "Bounded output" : "Continues with context")}</small>
            {index < steps.length - 1 && <ArrowRight size={13} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <footer><Info size={15} aria-hidden="true" /><div><span>SELECTED STEP</span><strong>{active.label}</strong><p>{active.note}</p></div></footer>
    </div>
  );
}

type LensNode = { id: string; label: string; type: string; x: number; y: number; note: string; tone?: "source" | "analysis" | "supported" | "unresolved" | "human" };
type LensEdge = { from: string; to: string; label: string; state?: "dashed" | "contested" };

const graphNodes: Record<string, LensNode[]> = {
  narrative: [
    { id: "n-e1", label: "Evidence A", type: "SOURCE", x: 12, y: 78, note: "An exact source span carries an attributed claim.", tone: "source" },
    { id: "n-e2", label: "Evidence B", type: "SOURCE", x: 42, y: 82, note: "A second source qualifies the first interpretation.", tone: "source" },
    { id: "n-claim", label: "Attributed claim", type: "CLAIM", x: 25, y: 54, note: "The claim remains attached to its carrier and evidence." },
    { id: "n-frame", label: "Preparedness frame", type: "FRAME", x: 45, y: 34, note: "Supported claims form a bounded analytical frame.", tone: "supported" },
    { id: "n-counter", label: "Temporary counterframe", type: "COUNTERFRAME", x: 72, y: 56, note: "A competing interpretation remains separately inspectable.", tone: "unresolved" },
    { id: "n-family", label: "Narrative family", type: "FAMILY", x: 72, y: 18, note: "Family membership requires continuity across evidence.", tone: "human" },
    { id: "n-gap", label: "Insufficient", type: "UNRESOLVED", x: 89, y: 80, note: "Unassigned evidence remains visible instead of being forced into a frame.", tone: "unresolved" },
  ],
  threat: [
    { id: "t-actor", label: "Public actor", type: "ACTOR", x: 13, y: 20, note: "An actor is named; intent is not inferred.", tone: "source" },
    { id: "t-target", label: "Transport authority", type: "TARGET", x: 38, y: 20, note: "The target is explicit in scoped public evidence.", tone: "source" },
    { id: "t-mech", label: "Mechanism missing", type: "MECHANISM", x: 67, y: 20, note: "No supported harmful mechanism is established.", tone: "unresolved" },
    { id: "t-geo", label: "Named corridor", type: "GEOGRAPHY", x: 88, y: 20, note: "Place context alone does not establish danger." },
    { id: "t-signals", label: "Recurrence signals", type: "SIGNALS", x: 22, y: 58, note: "Several observations support bounded recurrence.", tone: "supported" },
    { id: "t-cap", label: "Capability sparse", type: "CAPABILITY", x: 55, y: 58, note: "Available capability evidence remains sparse.", tone: "unresolved" },
    { id: "t-conv", label: "Partial convergence", type: "HUMAN REVIEW", x: 82, y: 68, note: "Support and missing evidence converge without becoming prediction.", tone: "human" },
  ],
  "fact-check": [
    { id: "f-claim", label: "Public claim", type: "CLAIM", x: 15, y: 48, note: "The exact claim wording anchors verification.", tone: "human" },
    { id: "f-support", label: "Official record", type: "SUPPORT", x: 43, y: 20, note: "A preserved record supports part of the claim.", tone: "supported" },
    { id: "f-contradict", label: "Later correction", type: "CONTRADICTION", x: 43, y: 52, note: "A later source contradicts timing or scope.", tone: "unresolved" },
    { id: "f-gap", label: "Coverage gap", type: "UNRESOLVED", x: 43, y: 82, note: "No decisive evidence covers every locality.", tone: "unresolved" },
    { id: "f-origin", label: "Original source", type: "PROVENANCE", x: 72, y: 22, note: "The earliest located source anchors lineage.", tone: "source" },
    { id: "f-copy", label: "Dependent copy", type: "NOT INDEPENDENT", x: 72, y: 52, note: "Repeated wording remains one source family." },
    { id: "f-state", label: "Qualified state", type: "VERDICT BOUNDARY", x: 88, y: 75, note: "Support, contradiction and gaps remain visible to review.", tone: "human" },
  ],
  politico: [
    { id: "p-inst", label: "Public institution", type: "INSTITUTION", x: 20, y: 18, note: "The institution is resolved from a public record.", tone: "source" },
    { id: "p-a", label: "Public actor A", type: "ACTOR", x: 18, y: 50, note: "The actor has a time-valid public role." },
    { id: "p-b", label: "Public actor B", type: "ACTOR", x: 48, y: 50, note: "A second actor remains independently resolved." },
    { id: "p-role", label: "Committee role", type: "ROLE", x: 45, y: 18, note: "Role evidence remains tied to its validity window.", tone: "supported" },
    { id: "p-issue", label: "Transport policy", type: "ISSUE", x: 75, y: 34, note: "The issue connects attributed public positions.", tone: "human" },
    { id: "p-pos1", label: "Safety review", type: "POSITION", x: 65, y: 76, note: "A public statement supports this position." },
    { id: "p-pos2", label: "Infrastructure review", type: "POSITION", x: 90, y: 76, note: "A separate statement supports this position." },
  ],
  author: [
    { id: "a-author", label: "Resolved author", type: "AUTHOR", x: 12, y: 48, note: "A byline resolves to a public author identity.", tone: "supported" },
    { id: "a-1", label: "Earlier article", type: "ARTICLE", x: 38, y: 18, note: "The earlier item carries preparedness framing.", tone: "source" },
    { id: "a-2", label: "Safety update", type: "ARTICLE", x: 38, y: 48, note: "A later item quotes an official source.", tone: "source" },
    { id: "a-3", label: "Route explainer", type: "ARTICLE", x: 38, y: 78, note: "The latest item introduces coordination framing.", tone: "source" },
    { id: "a-topic", label: "Transport topic", type: "TOPIC", x: 68, y: 25, note: "A shared topic supports bounded comparison." },
    { id: "a-frame", label: "Recurring frame", type: "PATTERN", x: 68, y: 55, note: "Frame recurrence is observable without implying motive." },
    { id: "a-time", label: "Ordered pattern", type: "TIMELINE", x: 88, y: 76, note: "Sequence describes publication history, not hidden intent.", tone: "human" },
  ],
  "portal-source": [
    { id: "s-origin", label: "Original notice", type: "ORIGIN", x: 10, y: 48, note: "The earliest preserved source anchors the family.", tone: "supported" },
    { id: "s-news", label: "Local report", type: "CITES + ADDS", x: 36, y: 18, note: "Separate reporting adds independently gathered context.", tone: "source" },
    { id: "s-hi", label: "हिन्दी translation", type: "TRANSLATES", x: 36, y: 50, note: "Translation remains dependent on its origin." },
    { id: "s-copy", label: "Syndicated copy", type: "REPUBLISHES", x: 36, y: 82, note: "Matching wording identifies a dependent copy.", tone: "unresolved" },
    { id: "s-ne", label: "नेपाली summary", type: "REUSES", x: 66, y: 34, note: "A summary retains the same provenance family." },
    { id: "s-social", label: "Public repost", type: "AMPLIFIES", x: 66, y: 70, note: "Amplification does not add verification." },
    { id: "s-family", label: "One source family", type: "DEPENDENT", x: 90, y: 50, note: "Copies remain grouped rather than counted as corroboration.", tone: "human" },
  ],
  "entity-relationship": [
    { id: "e-alias", label: "K. Sharma", type: "MENTION", x: 14, y: 18, note: "A name mention begins as a candidate identity.", tone: "source" },
    { id: "e-person", label: "Public spokesperson", type: "PERSON", x: 48, y: 18, note: "Context and role evidence support canonical resolution.", tone: "supported" },
    { id: "e-role", label: "Spokesperson role", type: "ROLE", x: 22, y: 55, note: "A time-valid role connects person and institution." },
    { id: "e-inst", label: "Transport authority", type: "INSTITUTION", x: 52, y: 55, note: "The relationship is backed by a public role record." },
    { id: "e-claim", label: "Restriction claim", type: "CLAIM", x: 80, y: 38, note: "The source carries an attributed claim." },
    { id: "e-place", label: "Kathmandu", type: "PLACE", x: 75, y: 78, note: "A canonical place is connected only by supported evidence." },
    { id: "e-gap", label: "Same-name candidate", type: "UNRESOLVED", x: 20, y: 84, note: "Weak name similarity remains unresolved.", tone: "unresolved" },
  ],
};

const graphEdges: Record<string, LensEdge[]> = {
  narrative: [{ from: "n-e1", to: "n-claim", label: "CARRIES" }, { from: "n-e2", to: "n-frame", label: "QUALIFIES" }, { from: "n-claim", to: "n-frame", label: "FORMS" }, { from: "n-frame", to: "n-family", label: "MEMBER OF" }, { from: "n-counter", to: "n-family", label: "CONTESTS", state: "contested" }, { from: "n-counter", to: "n-gap", label: "INSUFFICIENT", state: "dashed" }],
  threat: [{ from: "t-actor", to: "t-signals", label: "CONTEXT" }, { from: "t-target", to: "t-signals", label: "NAMED" }, { from: "t-mech", to: "t-cap", label: "MISSING", state: "dashed" }, { from: "t-geo", to: "t-conv", label: "LOCATES" }, { from: "t-signals", to: "t-conv", label: "SUPPORTS" }, { from: "t-cap", to: "t-conv", label: "QUALIFIES", state: "contested" }],
  "fact-check": [{ from: "f-claim", to: "f-support", label: "SUPPORTS" }, { from: "f-claim", to: "f-contradict", label: "CONTRADICTS", state: "contested" }, { from: "f-claim", to: "f-gap", label: "UNRESOLVED", state: "dashed" }, { from: "f-origin", to: "f-copy", label: "REPUBLISHED", state: "dashed" }, { from: "f-support", to: "f-state", label: "CONTRIBUTES" }, { from: "f-contradict", to: "f-state", label: "QUALIFIES", state: "contested" }],
  politico: [{ from: "p-inst", to: "p-a", label: "ROLE IN" }, { from: "p-role", to: "p-b", label: "HOLDS" }, { from: "p-a", to: "p-pos1", label: "STATES" }, { from: "p-b", to: "p-pos2", label: "STATES" }, { from: "p-pos1", to: "p-issue", label: "ABOUT" }, { from: "p-pos2", to: "p-issue", label: "ABOUT" }],
  author: [{ from: "a-author", to: "a-1", label: "AUTHORED" }, { from: "a-author", to: "a-2", label: "AUTHORED" }, { from: "a-author", to: "a-3", label: "AUTHORED" }, { from: "a-1", to: "a-topic", label: "CARRIES" }, { from: "a-2", to: "a-frame", label: "PARTICIPATES" }, { from: "a-3", to: "a-time", label: "ORDERED" }],
  "portal-source": [{ from: "s-origin", to: "s-news", label: "CITED BY" }, { from: "s-origin", to: "s-hi", label: "TRANSLATED" }, { from: "s-origin", to: "s-copy", label: "REPUBLISHED", state: "dashed" }, { from: "s-hi", to: "s-ne", label: "REUSED" }, { from: "s-copy", to: "s-social", label: "AMPLIFIED" }, { from: "s-ne", to: "s-family", label: "MEMBER OF" }, { from: "s-social", to: "s-family", label: "MEMBER OF" }],
  "entity-relationship": [{ from: "e-alias", to: "e-person", label: "RESOLVES TO" }, { from: "e-person", to: "e-role", label: "HOLDS" }, { from: "e-role", to: "e-inst", label: "ROLE IN" }, { from: "e-inst", to: "e-claim", label: "CARRIES" }, { from: "e-claim", to: "e-place", label: "CONTEXT" }, { from: "e-alias", to: "e-gap", label: "NOT SAME", state: "dashed" }],
};

function MiniGraph({ lens, nodes, edges }: { lens: LensDefinition; nodes: LensNode[]; edges: LensEdge[] }) {
  const [activeId, setActiveId] = useState(nodes[0].id);
  useEffect(() => setActiveId(nodes[0].id), [lens.id, nodes]);
  const active = nodes.find((node) => node.id === activeId) ?? nodes[0];
  const connected = useMemo(() => new Set(edges.flatMap((edge) => edge.from === activeId ? [edge.from, edge.to] : edge.to === activeId ? [edge.from, edge.to] : [])), [activeId, edges]);
  return (
    <div className="home-lens-graph">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{edges.map((edge) => { const from = nodes.find((node) => node.id === edge.from)!; const to = nodes.find((node) => node.id === edge.to)!; const lit = edge.from === activeId || edge.to === activeId; const mid = (from.x + to.x) / 2; return <g key={`${edge.from}-${edge.to}`} className={`${lit ? "active" : ""} ${edge.state ?? ""}`}><path d={`M ${from.x} ${from.y} C ${mid} ${from.y}, ${mid} ${to.y}, ${to.x} ${to.y}`} /><text x={mid} y={(from.y + to.y) / 2 - 1}>{edge.label}</text></g>; })}</svg>
      {nodes.map((node, index) => <button key={node.id} type="button" data-tone={node.tone ?? "analysis"} className={`${node.id === activeId ? "active" : ""} ${connected.has(node.id) || node.id === activeId ? "related" : "dim"}`} style={{ "--gx": `${node.x}%`, "--gy": `${node.y}%`, "--graph-order": index } as CSSProperties} aria-pressed={node.id === activeId} onMouseEnter={() => setActiveId(node.id)} onFocus={() => setActiveId(node.id)} onClick={() => setActiveId(node.id)}><span>{node.type}</span><strong>{node.label}</strong></button>)}
      <footer><GitBranch size={14} aria-hidden="true" /><div><span>SELECTED ANALYTICAL ELEMENT</span><strong>{active.label}</strong><p>{active.note}</p></div></footer>
    </div>
  );
}

const sentimentPoints = [
  ["नेपाली Social", 17, 17, "Strong negative evaluation of preparedness"], ["हिन्दी Social", 11, 23, "High-intensity negative infrastructure stance"], ["News", 43, 62, "Low-intensity neutral report"], ["Official", 54, 76, "Low-intensity neutral guidance"], ["Public response", 32, 38, "Moderate negative evaluation"], ["Coordination", 69, 54, "Mixed positive evaluation of timely information"],
] as const;

const emotionPoints = [
  ["Concern", 23, 28, "direct", "Concern is explicitly expressed by a public author."], ["Frustration", 14, 18, "direct", "Frustration is carried in first-person public language."], ["Reported concern", 31, 34, "reported", "Concern remains attributed to residents, not the news carrier."], ["Hope", 68, 54, "direct", "Hope is connected to timely information."], ["Not expressed", 51, 82, "missing", "No explicit emotion is observed in the official notice."],
] as const;

function FieldVisual({ lens, mode }: { lens: LensDefinition; mode: "sentiment" | "emotion" }) {
  const points = mode === "sentiment" ? sentimentPoints : emotionPoints;
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => setActiveIndex(0), [lens.id]);
  const active = points[activeIndex];
  return <div className={`home-lens-field field-${mode}`}><div className="home-field-plot"><span className="axis top">{mode === "sentiment" ? "HIGH INTENSITY" : "EXCITED"}</span><span className="axis bottom">{mode === "sentiment" ? "LOW INTENSITY" : "CALM"}</span><span className="axis left">{mode === "sentiment" ? "NEGATIVE" : "UNPLEASANT"}</span><span className="axis right">{mode === "sentiment" ? "POSITIVE" : "PLEASANT"}</span><i className="axis-line x" /><i className="axis-line y" />{points.map((point, index) => <button key={point[0]} type="button" data-state={mode === "emotion" ? point[3] : undefined} className={activeIndex === index ? "active" : ""} style={{ "--fx": `${point[1]}%`, "--fy": `${point[2]}%`, "--field-order": index } as CSSProperties} aria-pressed={activeIndex === index} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)}><span>{point[0]}</span></button>)}</div><aside><span>{mode === "sentiment" ? "DIVERGENCE STRIP" : "EXPRESSION TYPE"}</span>{mode === "sentiment" ? <><i style={{ width: "84%" }} /><i style={{ width: "58%" }} /><i style={{ width: "24%" }} /><small>Evidence-window distribution</small></> : <><b>Direct</b><b>Reported</b><b>Not expressed</b><small>Carrier ≠ experiencer</small></>}</aside><footer><Info size={14} /><div><span>SELECTED OBSERVATION</span><strong>{active[0]}</strong><p>{active[mode === "sentiment" ? 3 : 4]}</p></div></footer></div>;
}

function GeographyVisual({ lens }: { lens: LensDefinition }) {
  const regions = [["Kathmandu","OCCURRED IN","supported"],["Pokhara corridor","AFFECTED PLACE","qualified"],["Birgunj","MENTION ONLY","unresolved"],["New Delhi","SOURCE JURISDICTION","source"],["Northern India","REGIONAL CONTEXT","qualified"]] as const;
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => setActiveIndex(0), [lens.id]);
  return <div className="home-geography-visual"><header><span>CANONICAL PLACE VIEW</span><strong>नेपाल / India regional evidence</strong></header><div>{regions.map((region,index)=><button key={region[0]} type="button" data-state={region[2]} aria-pressed={index===activeIndex} onMouseEnter={()=>setActiveIndex(index)} onFocus={()=>setActiveIndex(index)} onClick={()=>setActiveIndex(index)}><span>{region[1]}</span><strong>{region[0]}</strong></button>)}</div><aside><span>PLACE RESOLUTION</span><b>काठमाडौं</b><i>→</i><b>Kathmandu</b><i>→</i><strong>Nepal · Bagmati</strong></aside><footer><Info size={14}/><p><strong>{regions[activeIndex][0]}</strong>{regions[activeIndex][1]} is a typed geographic relationship. Mention does not establish event location.</p></footer></div>;
}

export function LensSemanticInfographic({ lens }: { lens: LensDefinition }) {
  if (lens.id === "sentiment") return <div className={`home-lens-infographic accent-${lens.accent}`} aria-label="Sentiment analytical field"><FieldVisual lens={lens} mode="sentiment" /></div>;
  if (lens.id === "emotion") return <div className={`home-lens-infographic accent-${lens.accent}`} aria-label="Emotion valence and activation field"><FieldVisual lens={lens} mode="emotion" /></div>;
  if (lens.id === "geography") return <div className={`home-lens-infographic accent-${lens.accent}`} aria-label="Geography analytical view"><GeographyVisual lens={lens} /></div>;
  const nodes = graphNodes[lens.id] ?? graphNodes.narrative;
  const edges = graphEdges[lens.id] ?? graphEdges.narrative;
  return <div className={`home-lens-infographic accent-${lens.accent}`} aria-label={`${lens.name} explanatory analytical graph`}><header><span>LENS-NATIVE VIEW</span><strong>{lens.name}</strong><small>Evidence-linked analytical structure</small></header><MiniGraph lens={lens} nodes={nodes} edges={edges} /><div className="home-lens-boundary"><ShieldCheck size={14} aria-hidden="true" /><span>{lens.boundary}</span></div></div>;
}
