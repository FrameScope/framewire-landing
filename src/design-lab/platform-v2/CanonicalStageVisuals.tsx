import { useState } from "react";
import {
  AlertTriangle,
  Archive,
  Bell,
  BookOpenCheck,
  CheckCircle2,
  CircleHelp,
  CircleStop,
  Database,
  FileCheck2,
  FileCog,
  FileSearch,
  FileText,
  FileUp,
  Fingerprint,
  Focus,
  GitBranch,
  GitCompareArrows,
  Globe2,
  KeyRound,
  Landmark,
  Link2,
  ListChecks,
  MessageSquareText,
  Network,
  Newspaper,
  NotebookPen,
  ScanSearch,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRoundCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { CanonicalVisualKind } from "./canonicalPlatformData";

type ProcessTone = "system" | "human" | "complete" | "blocked" | "neutral";
type ProcessLayout = "linear" | "hub" | "decision" | "fan" | "scope" | "graph" | "comparison" | "timeline";

interface ProcessNode {
  id: string;
  label: string;
  note: string;
  icon: LucideIcon;
  tone?: ProcessTone;
  limit?: string;
}

interface ProcessDefinition {
  title: string;
  layout: ProcessLayout;
  nodes: ProcessNode[];
  branches?: ProcessNode[];
  branchLabel?: string;
  footer: string;
}

const processDefinitions: Record<CanonicalVisualKind, ProcessDefinition> = {
  sources: {
    title: "Public information becomes an acquisition request",
    layout: "hub",
    nodes: [
      { id: "media", label: "Media", note: "Public reporting and news material.", icon: Newspaper },
      { id: "social", label: "Social", note: "Public posts through approved providers.", icon: MessageSquareText },
      { id: "records", label: "Official Records", note: "Public institutional records and statements.", icon: Landmark },
      { id: "apis", label: "Public APIs", note: "Structured public data from approved interfaces.", icon: Network },
      { id: "uploads", label: "Uploaded Material", note: "User-provided documents and media.", icon: FileUp },
      { id: "websites", label: "Websites", note: "Public web material available through approved retrieval routes.", icon: Globe2 },
      { id: "public", label: "Public Information", note: "Source material is held as observed—not verified.", icon: Globe2 },
      { id: "request", label: "Acquisition Request", note: "The governed collection path begins here.", icon: FileSearch },
    ],
    footer: "Source material is not yet verified evidence or intelligence.",
  },
  acquisition: {
    title: "Controls are checked before retrieval",
    layout: "linear",
    nodes: [
      { id: "request", label: "Acquisition Request", note: "A bounded source or search request enters the acquisition path.", icon: FileSearch },
      { id: "provider", label: "Provider Selection", note: "FrameWire selects an approved available route.", icon: Network },
      { id: "permission", label: "Permission Check", note: "Role, ownership, and provider permissions are evaluated.", icon: KeyRound },
      { id: "budget", label: "Budget Check", note: "Usage and capability limits are applied before work begins.", icon: SlidersHorizontal },
      { id: "retrieval", label: "Retrieval", note: "The source material is collected with retrieval context.", icon: ScanSearch },
      { id: "record", label: "Retrieval Record", note: "Provider, time, ownership, and coverage are recorded.", icon: FileCheck2, tone: "complete" },
    ],
    branches: [
      { id: "unavailable", label: "Provider Unavailable", note: "The provider could not participate in this request.", icon: CircleStop, tone: "blocked" },
      { id: "coverage", label: "Coverage Limitation", note: "The limitation remains visible instead of being filled with invented evidence.", icon: AlertTriangle, tone: "blocked" },
    ],
    branchLabel: "COVERAGE BRANCH",
    footer: "Unavailable providers produce explicit coverage limitations.",
  },
  archive: {
    title: "The original is preserved before any derived representation",
    layout: "linear",
    nodes: [
      { id: "material", label: "Retrieved Material", note: "The content received through the governed route.", icon: FileText },
      { id: "record", label: "Archive Record", note: "The original body and retrieval context are stored together.", icon: Archive },
      { id: "identity", label: "Stable Archive Identity", note: "A durable identifier anchors every downstream reference.", icon: Fingerprint },
      { id: "hash", label: "Content Hash", note: "The stored content receives a reproducible integrity reference.", icon: ShieldCheck },
      { id: "lineage", label: "Provenance Chain", note: "Every later transformation can return to the collected original.", icon: Link2, tone: "complete" },
    ],
    branches: [
      { id: "original", label: "Original Preserved", note: "The collected original remains unchanged.", icon: Archive, tone: "complete" },
      { id: "derived", label: "Derived Representation", note: "Cleaning, extraction, or translation remains additive.", icon: FileCog, tone: "neutral" },
    ],
    branchLabel: "PRESERVATION BRANCHES",
    footer: "Preservation proves what was collected; it does not prove that the source is true.",
  },
  eligibility: {
    title: "Evidence is prepared without losing its origin",
    layout: "linear",
    nodes: [
      { id: "archive", label: "Archive Record", note: "Preparation always begins from the preserved source.", icon: Archive },
      { id: "cleaning", label: "Cleaning", note: "Technical noise is removed from a derived representation.", icon: FileCog },
      { id: "normalization", label: "Normalization", note: "Metadata, language, URLs, and body state are normalized.", icon: SlidersHorizontal },
      { id: "check", label: "Evidence Check", note: "Safety, completeness, evidence spans, and ownership are checked.", icon: ShieldCheck },
      { id: "decision", label: "Eligibility Decision", note: "Determines whether material may enter analytical processing.", icon: GitBranch, tone: "human", limit: "Eligible · Insufficient · Quarantined · Unsupported" },
      { id: "qualified", label: "Qualified Evidence", note: "Only eligible material becomes available to governed analysis.", icon: CheckCircle2, tone: "complete" },
    ],
    branches: [
      { id: "quarantined", label: "Quarantined", note: "Held outside analytical processing.", icon: CircleStop, tone: "blocked" },
      { id: "insufficient", label: "Insufficient", note: "Not enough grounded material for analysis.", icon: CircleHelp, tone: "blocked" },
      { id: "unsupported", label: "Unsupported", note: "The format or evidence condition is unsupported.", icon: AlertTriangle, tone: "blocked" },
      { id: "excluded", label: "Excluded", note: "Explicitly excluded from the eligible evidence set.", icon: CircleStop, tone: "blocked" },
    ],
    branchLabel: "STOPPED STATES",
    footer: "Missing or insufficient evidence is never forced into a score.",
  },
  discover: {
    title: "A question opens the wider information environment",
    layout: "linear",
    nodes: [
      { id: "question", label: "User Question", note: "The user defines what they need to understand.", icon: CircleHelp },
      { id: "query", label: "Unified Query", note: "Internal holdings and approved retrieval paths are coordinated.", icon: Search },
      { id: "reuse", label: "Archive Reuse", note: "Existing preserved evidence is searched first.", icon: Archive },
      { id: "active", label: "Active Search", note: "Approved providers seek fresh candidates where needed.", icon: ScanSearch },
      { id: "event", label: "Raw Intelligence Event", note: "The point-in-time search result is stored as a raw artifact.", icon: Database },
      { id: "view", label: "Ecosystem View", note: "Evidence, sources, entities, time, and coverage become inspectable.", icon: Globe2, tone: "complete" },
    ],
    branches: [
      { id: "entities", label: "Entities", note: "Resolved and unresolved subjects can inform the query.", icon: UsersRound, tone: "neutral" },
      { id: "sources", label: "Sources", note: "Known sources and Archive holdings remain visible inputs.", icon: Newspaper, tone: "neutral" },
      { id: "watchlists", label: "Watchlists", note: "User-owned monitoring scopes can contribute bounded context.", icon: ListChecks, tone: "neutral" },
      { id: "prior", label: "Prior Context", note: "Dated memory is retrieved as context, not current fact.", icon: Archive, tone: "neutral" },
      { id: "coverage", label: "Provider Coverage", note: "Available and unavailable routes remain explicit.", icon: Network, tone: "neutral" },
    ],
    branchLabel: "SUPPORTING INPUTS",
    footer: "Discover explains what exists; it is not a completed investigation.",
  },
  decision: {
    title: "A human decides whether discovery becomes a case",
    layout: "decision",
    nodes: [
      { id: "ecosystem", label: "Raw Ecosystem View", note: "The user reviews the broad information environment.", icon: Globe2 },
      { id: "review", label: "Human Review", note: "Human intent—not automation—controls the transition.", icon: UserRoundCheck, tone: "human" },
      { id: "explore", label: "Explore", note: "Continue examining the wider ecosystem.", icon: Search, tone: "neutral" },
      { id: "refine", label: "Refine", note: "Clarify the question or retrieval scope.", icon: SlidersHorizontal, tone: "neutral" },
      { id: "select", label: "Select Evidence", note: "Choose the material relevant to the case question.", icon: ListChecks, tone: "human" },
      { id: "start", label: "Start Investigation", note: "Create a bounded, user-owned investigation workspace.", icon: Focus, tone: "complete" },
    ],
    footer: "Every formal investigation begins with an explicit human decision.",
  },
  scope: {
    title: "Only selected evidence enters deep analysis",
    layout: "scope",
    nodes: [
      { id: "selected", label: "Selected Evidence", note: "Evidence chosen from Discover, uploads, or later additions.", icon: ListChecks },
      { id: "scope", label: "Investigation Scope", note: "The authoritative linked-evidence set for this case.", icon: Focus },
      { id: "timeline", label: "Timeline", note: "Observed items and events are ordered without inferring causation.", icon: GitCompareArrows },
      { id: "entities", label: "Entities & Sources", note: "Stable identities and source references remain connected.", icon: UsersRound },
      { id: "notes", label: "Questions & Notes", note: "Human observations and unresolved questions stay attributable.", icon: NotebookPen, tone: "human" },
      { id: "analysis", label: "Scoped Analysis", note: "Lenses operate only on the evidence admitted to this case.", icon: ScanSearch, tone: "complete" },
    ],
    footer: "Broad ecosystem material cannot silently leak into the investigation.",
  },
  lenses: {
    title: "One evidence set, ten independent analytical paths",
    layout: "fan",
    nodes: [
      { id: "evidence", label: "Investigation Evidence", note: "The same bounded evidence is supplied to every selected lens.", icon: Database },
      { id: "na", label: "NA", note: "Narrative observations remain separate.", icon: BookOpenCheck },
      { id: "se", label: "SE", note: "Sentiment observations remain separate.", icon: SlidersHorizontal },
      { id: "em", label: "EM", note: "Emotion observations remain separate.", icon: MessageSquareText },
      { id: "th", label: "TH", note: "Threat observations remain bounded and reviewable.", icon: AlertTriangle },
      { id: "fc", label: "FC", note: "Verification may support, contradict, or remain inconclusive.", icon: ShieldCheck },
      { id: "ge", label: "GE", note: "Geographic relationships remain typed and evidence-backed.", icon: Globe2 },
      { id: "pi", label: "PI", note: "Political context does not become forecasting.", icon: Landmark },
      { id: "au", label: "AU", note: "Authorship patterns do not prove hidden intent.", icon: UsersRound },
      { id: "ps", label: "PS", note: "Portal and source behavior remains contextual.", icon: Newspaper },
      { id: "er", label: "ER", note: "Only supported entity relationships are projected.", icon: Network },
    ],
    footer: "Lens outputs do not merge into one automatic intelligence score.",
  },
  "cross-lens": {
    title: "Independent observations connect through shared evidence",
    layout: "graph",
    nodes: [
      { id: "observations", label: "Lens Observations", note: "Each lens retains its own meaning and evidence.", icon: Database },
      { id: "links", label: "Shared Evidence Links", note: "Observations connect through the evidence they actually share.", icon: Link2 },
      { id: "relationships", label: "Typed Relationships", note: "Entities, time, sources, narratives, and geography remain explicit.", icon: Network },
      { id: "analytics", label: "Bounded Analytics", note: "Descriptive trends, missingness, and candidates retain method caveats.", icon: GitCompareArrows },
      { id: "context", label: "Reviewable Context", note: "Reinforcement, contradiction, and insufficiency remain visible.", icon: FileSearch, tone: "complete" },
    ],
    footer: "Correlation is not causation, and a graph relationship is not proof.",
  },
  reasoning: {
    title: "FrameWire structures review without deciding for the investigator",
    layout: "comparison",
    nodes: [
      { id: "context", label: "Evidence Context", note: "Evidence, lens observations, and source context remain inspectable.", icon: Database },
      { id: "interpretations", label: "Competing Interpretations", note: "Alternative readings are preserved instead of collapsed.", icon: GitCompareArrows },
      { id: "contradictions", label: "Contradictions", note: "Conflicting evidence is made explicit.", icon: AlertTriangle },
      { id: "gaps", label: "Evidence Gaps", note: "Missing support remains a visible state.", icon: CircleHelp, tone: "blocked" },
      { id: "notes", label: "Human Notes", note: "The investigator records assumptions, questions, and corrections.", icon: NotebookPen, tone: "human" },
      { id: "findings", label: "Findings", note: "Reviewable human findings can be prepared for report handoff.", icon: ListChecks, tone: "complete" },
    ],
    footer: "Guidance supports reasoning; judgment remains human.",
  },
  report: {
    title: "Reviewed material becomes an evidence-linked draft",
    layout: "linear",
    nodes: [
      { id: "selection", label: "Evidence Selection", note: "Only selected investigation evidence enters report assembly.", icon: ListChecks },
      { id: "finding", label: "Finding Review", note: "Candidate findings are examined before inclusion.", icon: FileSearch },
      { id: "traceability", label: "Source Traceability", note: "Every material finding retains an exact path to archived evidence.", icon: Link2 },
      { id: "contradiction", label: "Contradiction Review", note: "Supporting and contradicting material can remain side by side.", icon: GitCompareArrows },
      { id: "assembly", label: "Report Assembly", note: "Findings, evidence, notes, assumptions, and limitations are organized.", icon: FileCog },
      { id: "draft", label: "Draft Boundary", note: "The report remains provisional until human approval.", icon: FileText, tone: "human", limit: "Draft · Not finalized" },
      { id: "handoff", label: "Human Review Handoff", note: "The governed draft moves to the investigator for final judgment.", icon: UserRoundCheck, tone: "human" },
    ],
    footer: "A governed report is still a draft until a human approves it.",
  },
  finalization: {
    title: "The investigator owns the conclusion",
    layout: "linear",
    nodes: [
      { id: "draft", label: "Draft Report", note: "The evidence-linked analytical draft enters review.", icon: FileText },
      { id: "evidence", label: "Evidence Review", note: "The reviewer checks exact evidence and traceability.", icon: FileSearch },
      { id: "method", label: "Methodology Review", note: "Method, assumptions, limitations, and confidence are examined.", icon: ListChecks },
      { id: "disposition", label: "Include / Qualify / Exclude", note: "The human determines the responsible disposition of each finding.", icon: SlidersHorizontal, tone: "human" },
      { id: "approval", label: "Approval & Attribution", note: "Final wording and responsibility are attributed to the reviewer.", icon: UserRoundCheck, tone: "human" },
      { id: "snapshot", label: "Immutable Snapshot", note: "A point-in-time finalized record is preserved.", icon: FileCheck2, tone: "complete" },
    ],
    footer: "Later data cannot silently rewrite the finalized report.",
  },
  memory: {
    title: "Reviewed work remains available as dated context",
    layout: "timeline",
    nodes: [
      { id: "report", label: "Finalized Report", note: "The point-in-time conclusion remains preserved.", icon: FileCheck2, tone: "complete" },
      { id: "subject", label: "Tracked Subject", note: "A user chooses what should remain under observation.", icon: Focus },
      { id: "observation", label: "Repeated Observation", note: "New public material is compared with dated prior context.", icon: Search },
      { id: "change", label: "Meaningful Change", note: "A bounded change candidate becomes visible for review.", icon: GitCompareArrows },
      { id: "alert", label: "Alert", note: "The system issues an operational notice, not a conclusion.", icon: Bell, tone: "human" },
      { id: "reopen", label: "Reopen Investigation", note: "A human may return to Discover or continue the case.", icon: Focus, tone: "complete" },
    ],
    branches: [
      { id: "discover-return", label: "Return to Discover", note: "An alert may reopen broad ecosystem search.", icon: Search, tone: "neutral" },
      { id: "existing-case", label: "Existing Investigation", note: "A human may continue the bounded case.", icon: Focus, tone: "human" },
      { id: "new-case", label: "New Investigation", note: "A human may create a new evidence scope.", icon: FileSearch, tone: "human" },
      { id: "new-report", label: "New Report", note: "Meaningful reviewed change may support a new report snapshot.", icon: FileCheck2, tone: "complete" },
    ],
    branchLabel: "HUMAN-CHOSEN RETURN PATHS",
    footer: "Institutional memory remains dated context—not automatic present truth.",
  },
};

function ProcessCard({ node, position, total, active, related, dimmed, showEdgeLabels, onActivate }: { node: ProcessNode; position: number; total: number; active: boolean; related: boolean; dimmed: boolean; showEdgeLabels: boolean; onActivate: (id: string) => void }) {
  const Icon = node.icon;
  return (
    <button
      type="button"
      className={`p2-process-card tone-${node.tone ?? "system"} ${active ? "active" : ""} ${related ? "related" : ""} ${dimmed ? "dimmed" : ""}`}
      onMouseEnter={() => onActivate(node.id)}
      onFocus={() => onActivate(node.id)}
      onClick={() => onActivate(node.id)}
      aria-pressed={active}
      aria-controls="p2-process-active-detail"
    >
      {showEdgeLabels && position === 0 && <small className="p2-process-edge-label">START</small>}
      {showEdgeLabels && position === total - 1 && <small className="p2-process-edge-label end">END</small>}
      <Icon aria-hidden="true" />
      <strong>{node.label}</strong>
      <span>{node.note}</span>
    </button>
  );
}

export function CanonicalStageVisual({ kind }: { kind: CanonicalVisualKind }) {
  const definition = processDefinitions[kind];
  const [activeId, setActiveId] = useState(definition.nodes[0].id);
  const allNodes = [...definition.nodes, ...(definition.branches ?? [])];
  const activeNode = allNodes.find((node) => node.id === activeId) ?? definition.nodes[0];
  const ActiveIcon = activeNode.icon;
  const activeMainIndex = definition.nodes.findIndex((node) => node.id === activeId);

  const renderNode = (node: ProcessNode, position: number, total: number, showEdgeLabels = true) => (
    <ProcessCard key={node.id} node={node} position={position} total={total} active={activeId === node.id} related={activeMainIndex >= 0 && Math.abs(activeMainIndex - position) <= 1} dimmed={activeId !== node.id && !(activeMainIndex >= 0 && Math.abs(activeMainIndex - position) <= 1)} showEdgeLabels={showEdgeLabels} onActivate={setActiveId} />
  );

  return (
    <div className={`p2-process-canvas layout-${definition.layout}`}>
      <header><span>PROCESS VIEW</span><strong>{definition.title}</strong><div><i className="system" /> SYSTEM <i className="human" /> HUMAN <i className="complete" /> COMPLETE</div></header>

      {definition.layout === "hub" ? (
        <div className="p2-process-hub">
          <div className="p2-process-source-cluster">{definition.nodes.slice(0, -2).map((node, index) => renderNode(node, index, definition.nodes.length, false))}</div>
          <i className="p2-process-path" aria-hidden="true" />
          {renderNode(definition.nodes[definition.nodes.length - 2], definition.nodes.length - 2, definition.nodes.length)}
          <i className="p2-process-path" aria-hidden="true" />
          {renderNode(definition.nodes[definition.nodes.length - 1], definition.nodes.length - 1, definition.nodes.length)}
        </div>
      ) : definition.layout === "fan" ? (
        <div className="p2-process-fan">
          {renderNode(definition.nodes[0], 0, definition.nodes.length)}
          <i className="p2-process-path" aria-hidden="true" />
          <div className="p2-process-lens-grid">{definition.nodes.slice(1).map((node, index) => renderNode(node, index + 1, definition.nodes.length))}</div>
        </div>
      ) : definition.layout === "decision" ? (
        <div className="p2-process-decision">
          <div className="p2-process-decision-top">{definition.nodes.slice(0, 2).map((node, index) => renderNode(node, index, definition.nodes.length))}</div>
          <i className="p2-process-path vertical" aria-hidden="true" />
          <div className="p2-process-choice-row">{definition.nodes.slice(2, 5).map((node, index) => renderNode(node, index + 2, definition.nodes.length))}</div>
          <i className="p2-process-path vertical" aria-hidden="true" />
          <div className="p2-process-decision-end">{renderNode(definition.nodes[5], 5, definition.nodes.length)}</div>
        </div>
      ) : definition.layout === "scope" ? (
        <div className="p2-process-scope">
          <div className="p2-process-outside"><span>RAW ECOSYSTEM</span>{renderNode(definition.nodes[0], 0, definition.nodes.length)}</div>
          <i className="p2-process-path" aria-hidden="true" />
          <div className="p2-process-scope-boundary"><small>INVESTIGATION BOUNDARY</small><div>{definition.nodes.slice(1).map((node, index) => renderNode(node, index + 1, definition.nodes.length))}</div></div>
        </div>
      ) : definition.layout === "graph" ? (
        <div className="p2-process-graph">
          {renderNode(definition.nodes[0], 0, definition.nodes.length)}
          <i className="p2-process-path" aria-hidden="true" />
          <div className="p2-process-graph-cluster">{definition.nodes.slice(1, -1).map((node, index) => renderNode(node, index + 1, definition.nodes.length, false))}<span aria-hidden="true">EVIDENCE-LINKED · TYPED EDGES</span></div>
          <i className="p2-process-path" aria-hidden="true" />
          {renderNode(definition.nodes[definition.nodes.length - 1], definition.nodes.length - 1, definition.nodes.length)}
        </div>
      ) : definition.layout === "comparison" ? (
        <div className="p2-process-comparison">
          {renderNode(definition.nodes[0], 0, definition.nodes.length)}
          <i className="p2-process-path vertical" aria-hidden="true" />
          <div className="p2-process-interpretations"><section><span>INTERPRETATION A</span>{renderNode(definition.nodes[1], 1, definition.nodes.length, false)}</section><section><span>INTERPRETATION B</span>{renderNode(definition.nodes[2], 2, definition.nodes.length, false)}</section></div>
          <div className="p2-process-review-row">{definition.nodes.slice(3).map((node, index) => renderNode(node, index + 3, definition.nodes.length))}</div>
        </div>
      ) : definition.layout === "timeline" ? (
        <div className="p2-process-timeline">{definition.nodes.map((node, index) => <div key={node.id}>{renderNode(node, index, definition.nodes.length)}{index < definition.nodes.length - 1 && <i className="p2-process-path" aria-hidden="true" />}</div>)}</div>
      ) : (
        <div className="p2-process-main">{definition.nodes.map((node, index) => renderNode(node, index, definition.nodes.length))}</div>
      )}

      {definition.branches && <div className="p2-process-branches"><span>{definition.branchLabel ?? "ALTERNATE STATES"}</span><div>{definition.branches.map((node, index) => renderNode(node, index, definition.branches?.length ?? 0, false))}</div></div>}

      <div id="p2-process-active-detail" className={`p2-process-detail tone-${activeNode.tone ?? "system"}`} role="status" aria-live="polite">
        <ActiveIcon aria-hidden="true" /><div><span>{activeNode.label}</span><p>{activeNode.note}</p>{activeNode.limit && <small>{activeNode.limit}</small>}</div>
      </div>
      <footer>{definition.footer}</footer>
    </div>
  );
}
