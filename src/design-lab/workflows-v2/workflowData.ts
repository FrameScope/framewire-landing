export type WorkflowId =
  | "live-observation"
  | "discover"
  | "story-dossier"
  | "evidence-intake"
  | "decide-investigate"
  | "evidence-scope"
  | "investigation-workspace"
  | "lens-analysis"
  | "cross-lens-context"
  | "guided-reasoning"
  | "what-if-simulation"
  | "report-finalization"
  | "export-analysis"
  | "tracking-alerts";

export type WorkflowVisualType =
  | "live"
  | "discover"
  | "story-dossier"
  | "evidence-intake"
  | "decide-investigate"
  | "evidence-scope"
  | "workspace"
  | "lens-analysis"
  | "cross-lens"
  | "guided-reasoning"
  | "simulation"
  | "report"
  | "export"
  | "tracking";

export type WorkflowNodeCategory = "user" | "decision" | "system" | "evidence" | "analysis" | "output" | "blocked";

export interface WorkflowNode {
  id: string;
  label: string;
  category: WorkflowNodeCategory;
  state: string;
  actor: string;
  input: string;
  creates: string;
  doesNot: string;
  x: number;
  y: number;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label: string;
  style?: "solid" | "dashed" | "blocked" | "optional";
}

export interface WorkflowDefinition {
  id: WorkflowId;
  name: string;
  shortName: string;
  subtitle: string;
  purpose: string;
  howItStarts: string;
  systemActions: string[];
  humanActions: string[];
  outputs: string[];
  boundary: string;
  visualType: WorkflowVisualType;
  group: "Observe & Discover" | "Evidence & Investigation" | "Analyze & Understand" | "Scenario & Output" | "Continue";
  visualTitle: string;
  visualSummary: string;
  legend: string[];
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

const n = (
  id: string,
  label: string,
  category: WorkflowNodeCategory,
  state: string,
  actor: string,
  input: string,
  creates: string,
  doesNot: string,
  x: number,
  y: number,
): WorkflowNode => ({ id, label, category, state, actor, input, creates, doesNot, x, y });

export const workflowDefinitions: WorkflowDefinition[] = [
  {
    id: "live-observation",
    name: "Live Observation",
    shortName: "Live Observation",
    subtitle: "See newly available information without treating the stream as a conclusion",
    purpose: "Supports rapid observation and triage while keeping source, visibility, current signal availability and uncertainty attached to each newly available item.",
    howItStarts: "Newly ingested public information becomes visible after governed acquisition, preservation and eligibility controls.",
    systemActions: ["Apply visibility and priority rules", "Display only currently available signals", "Preserve unavailable or not-yet-observed states"],
    humanActions: ["Review the source", "Open a related story or entity", "Track, request verification or choose to investigate"],
    outputs: ["Reviewed stream item", "Source-inspection path", "Tracking or investigation decision"],
    boundary: "The live stream supports observation and triage. It does not verify every item or create a finding.",
    visualType: "live",
    group: "Observe & Discover",
    visualTitle: "Observation and Triage Flow",
    visualSummary: "New evidence passes through visibility rules into a live readout. A human chooses whether to inspect, track, verify or investigate.",
    legend: ["Visible stream", "Available signal", "Human choice", "Unavailable"],
    nodes: [
      n("lo-new", "New evidence", "evidence", "Preserved item", "Archive and evidence pipeline", "Eligible newly available material", "A visible evidence item", "A verified claim or finding", 12, 48),
      n("lo-rules", "Visibility & priority", "system", "Applied", "FrameWire", "Evidence state and user scope", "Bounded stream visibility", "Universal importance", 32, 48),
      n("lo-readout", "Live observation", "analysis", "Signals available", "FrameWire", "Visible evidence and current observations", "A reviewable signal readout", "A conclusion", 52, 48),
      n("lo-missing", "Signal unavailable", "blocked", "Not yet observed", "FrameWire", "Missing or unavailable lens output", "An honest missing state", "A fabricated neutral value", 52, 18),
      n("lo-review", "User review", "decision", "Human authority", "Human investigator", "Evidence, source and available signals", "A deliberate next action", "Automatic progression", 72, 48),
      n("lo-inspect", "Inspect source", "user", "Optional path", "Human investigator", "Selected stream item", "Source Inspector view", "Evidence promotion", 90, 14),
      n("lo-track", "Track", "user", "Optional path", "Human investigator", "Selected subject or evidence", "Tracked interest", "Verification", 90, 36),
      n("lo-verify", "Request verification", "user", "Optional path", "Human investigator", "Public claim or evidence", "Verification work request", "A true/false decree", 90, 60),
      n("lo-investigate", "Investigate", "output", "Human-created path", "Human investigator", "Selected evidence and question", "Investigation decision", "A finished report", 90, 84),
    ],
    edges: [
      { from: "lo-new", to: "lo-rules", label: "ENTERS" }, { from: "lo-rules", to: "lo-readout", label: "PRESENTS" }, { from: "lo-readout", to: "lo-missing", label: "DISCLOSES", style: "dashed" }, { from: "lo-readout", to: "lo-review", label: "REVIEW" },
      { from: "lo-review", to: "lo-inspect", label: "INSPECT", style: "optional" }, { from: "lo-review", to: "lo-track", label: "TRACK", style: "optional" }, { from: "lo-review", to: "lo-verify", label: "VERIFY", style: "optional" }, { from: "lo-review", to: "lo-investigate", label: "DECIDE", style: "optional" },
    ],
  },
  {
    id: "discover",
    name: "Discover / Raw Ecosystem Search",
    shortName: "Discover",
    subtitle: "Search the wider information environment before narrowing the case",
    purpose: "Combines the user’s question with Archive holdings, memory, approved retrieval, entities, sources, watchlists and provider coverage to show what exists.",
    howItStarts: "A user submits a governed question with explicit country, language, source, provider or time context where needed.",
    systemActions: ["Resolve query context", "Reuse Archive and memory before approved retrieval", "Create a Raw Intelligence Event and coverage-aware ecosystem view"],
    humanActions: ["Explore or refine the question", "Inspect sources or save a preset", "Track a subject or explicitly start an investigation"],
    outputs: ["Raw Ecosystem View", "Coverage and unavailable-source context", "Human-controlled investigation entry point"],
    boundary: "Discover answers what exists. It does not answer what the investigator should conclude.",
    visualType: "discover",
    group: "Observe & Discover",
    visualTitle: "Raw Ecosystem Search Flow",
    visualSummary: "A governed question fans into Archive reuse and approved retrieval, recombines as raw ecosystem intelligence, and returns control to the user.",
    legend: ["User question", "Archive reuse", "Approved retrieval", "Raw output"],
    nodes: [
      n("ds-question", "User question", "user", "Governed input", "Human investigator", "Question and optional context", "A bounded query request", "An investigation or conclusion", 10, 50),
      n("ds-context", "Query context", "system", "Resolved", "FrameWire", "Question, country, language, time and permissions", "Unified query context", "A pre-decided answer", 27, 50),
      n("ds-archive", "Internal Archive", "evidence", "Authoritative holdings", "FrameWire", "Existing preserved evidence", "Reusable evidence candidates", "Guaranteed completeness", 45, 18),
      n("ds-memory", "Dated memory", "evidence", "Context only", "FrameWire", "Prior dated observations", "Historical comparison context", "Current truth", 45, 39),
      n("ds-retrieval", "Approved retrieval", "system", "Provider-bounded", "FrameWire", "Provider capability and permissions", "Fresh evidence candidates", "Universal source coverage", 45, 66),
      n("ds-unavailable", "Provider unavailable", "blocked", "Coverage limitation", "FrameWire", "Failed or unavailable provider", "Visible limitation", "Fabricated evidence", 45, 87),
      n("ds-event", "Raw Intelligence Event", "analysis", "Raw / unrefined", "FrameWire", "Archive, memory and retrieval results", "Durable raw search artifact", "A verified event", 65, 50),
      n("ds-view", "Raw Ecosystem View", "output", "What exists?", "FrameWire", "Raw event, coverage, sources and signals", "Reviewable search universe", "A completed investigation", 82, 50),
      n("ds-choice", "Explore or investigate", "decision", "Human authority", "Human investigator", "Raw ecosystem intelligence", "Refine, inspect, track or investigate", "Automatic case creation", 94, 50),
    ],
    edges: [
      { from: "ds-question", to: "ds-context", label: "CONTEXT" }, { from: "ds-context", to: "ds-archive", label: "REUSE" }, { from: "ds-context", to: "ds-memory", label: "COMPARE" }, { from: "ds-context", to: "ds-retrieval", label: "RETRIEVE" }, { from: "ds-context", to: "ds-unavailable", label: "DISCLOSE", style: "blocked" },
      { from: "ds-archive", to: "ds-event", label: "CONTRIBUTES" }, { from: "ds-memory", to: "ds-event", label: "CONTEXT" }, { from: "ds-retrieval", to: "ds-event", label: "CONTRIBUTES" }, { from: "ds-event", to: "ds-view", label: "PRESENTS" }, { from: "ds-view", to: "ds-choice", label: "HUMAN CHOICE" },
    ],
  },
  {
    id: "story-dossier",
    name: "Story & Dossier Exploration",
    shortName: "Story & Dossier",
    subtitle: "Move from isolated items toward a coherent subject of investigation",
    purpose: "Groups related evidence into navigable story threads and dossier views while preserving source differences, contradictions and evidence quality.",
    howItStarts: "Related evidence is linked through stored story relationships, similarity and time proximity without redefining Narrative Family identity.",
    systemActions: ["Link related evidence into an organizational container", "Expose timeline, sources and entities", "Keep competing claims, syndication and evidence quality visible"],
    humanActions: ["Remove irrelevant material", "Inspect the source or open a lens", "Choose whether to start an investigation"],
    outputs: ["Story or dossier container", "Navigable evidence, source and entity views", "Investigation entry point"],
    boundary: "A Story is an organizational container, not automatically a Narrative Family, verified event or conclusion.",
    visualType: "story-dossier",
    group: "Observe & Discover",
    visualTitle: "Story and Dossier Assembly",
    visualSummary: "Related but non-identical evidence enters an organizational story container, which exposes timeline, source and entity views for human review.",
    legend: ["Related evidence", "Container", "Context view", "Human review"],
    nodes: [
      n("st-a", "Published article", "evidence", "Related candidate", "Evidence system", "Archived article", "Story linkage candidate", "Narrative agreement", 12, 18),
      n("st-b", "Official record", "evidence", "Related candidate", "Evidence system", "Archived record", "Story linkage candidate", "Verified event", 12, 39),
      n("st-c", "Source correction", "evidence", "Contradictory context", "Evidence system", "Archived correction", "Visible contradiction", "Automatic replacement", 12, 62),
      n("st-d", "Syndicated copy", "evidence", "Source-family context", "Evidence system", "Linked publication", "Propagation context", "Independent corroboration", 12, 83),
      n("st-link", "Story linkage", "system", "Organizational", "FrameWire", "Related evidence and stored relationships", "A navigable container", "A Narrative Family", 35, 50),
      n("st-dossier", "Story / dossier", "output", "Reviewable container", "FrameWire", "Linked evidence", "Coherent subject view", "Verified event", 54, 50),
      n("st-timeline", "Timeline", "analysis", "Context view", "FrameWire", "Source timestamps", "Observed sequence", "Causation", 74, 18),
      n("st-sources", "Sources", "analysis", "Context view", "FrameWire", "Source identities and families", "Source comparison", "Universal credibility", 74, 41),
      n("st-entities", "Entities", "analysis", "Context view", "FrameWire", "Resolved and unresolved mentions", "Identity context", "Meaningful relationship proof", 74, 64),
      n("st-review", "Human review", "decision", "Required", "Human investigator", "Dossier and context views", "Remove, inspect, analyze or investigate", "Automatic conclusion", 91, 50),
    ],
    edges: [
      { from: "st-a", to: "st-link", label: "RELATED" }, { from: "st-b", to: "st-link", label: "RELATED" }, { from: "st-c", to: "st-link", label: "CONTRADICTS", style: "dashed" }, { from: "st-d", to: "st-link", label: "SYNDICATED", style: "dashed" }, { from: "st-link", to: "st-dossier", label: "ORGANIZES" },
      { from: "st-dossier", to: "st-timeline", label: "ORDERS" }, { from: "st-dossier", to: "st-sources", label: "ATTRIBUTES" }, { from: "st-dossier", to: "st-entities", label: "RESOLVES" }, { from: "st-dossier", to: "st-review", label: "REVIEW" },
    ],
  },
  {
    id: "evidence-intake",
    name: "Evidence Intake & Source Inspection",
    shortName: "Evidence Intake",
    subtitle: "Add or inspect evidence while preserving its original form and lineage",
    purpose: "Moves supported URLs and uploads through governed intake, preservation and eligibility while keeping the original separate from processed representations.",
    howItStarts: "A user supplies a URL, document, image, audio, video or other supported evidence type through an approved route.",
    systemActions: ["Capture through governed intake", "Archive the original before downstream processing", "Expose read-only source, retrieval, provenance and limitation context"],
    humanActions: ["Submit supported material", "Inspect the preserved source and processed representation", "Optionally link eligible evidence to an investigation"],
    outputs: ["Canonical Raw Archive record", "Derived processed representation", "Read-only Source Inspector view"],
    boundary: "Inspection cannot promote, verify, change eligibility or scope, rewrite evidence, or feed an engine outside the governed pipeline.",
    visualType: "evidence-intake",
    group: "Evidence & Investigation",
    visualTitle: "Archive-Before-Processing Intake",
    visualSummary: "User-provided material is governed and archived first. A derived representation may be prepared, while Source Inspector remains read-only.",
    legend: ["User intake", "Canonical evidence", "Derived material", "Read-only inspection"],
    nodes: [
      n("ei-input", "URL or upload", "user", "Submitted", "Human investigator", "Supported public material", "Governed intake request", "Canonical evidence by itself", 8, 50),
      n("ei-govern", "Governed intake", "system", "Permission checked", "FrameWire", "Submission, permissions and provider state", "Acquisition context", "A bypass around governance", 25, 50),
      n("ei-archive", "Canonical Raw Archive", "evidence", "Original preserved", "FrameWire", "Retrieved original and metadata", "Stable Archive identity and provenance", "Truth verification", 45, 30),
      n("ei-process", "Cleaning / eligibility", "system", "Derived processing", "FrameWire", "Archived original", "Eligibility and processed representation", "Original replacement", 45, 70),
      n("ei-original", "Original preserved", "evidence", "Untouched authority", "Canonical Archive", "Original content and retrieval context", "Inspectible source record", "A processed rewrite", 65, 20),
      n("ei-derived", "Processed representation", "analysis", "Derived", "Preparation pipeline", "Archived evidence", "Cleaned or extracted representation", "Canonical source", 65, 55),
      n("ei-inspector", "Source Inspector", "output", "Read-only", "Authorized human viewer", "Evidence lineage and permissions", "Source, archive, provenance and limitations", "Promotion, verification or mutation", 84, 38),
      n("ei-link", "Optional investigation link", "decision", "Human-controlled", "Human investigator", "Eligible evidence", "Governed scope candidate", "Automatic investigation scope", 92, 74),
    ],
    edges: [
      { from: "ei-input", to: "ei-govern", label: "SUBMIT" }, { from: "ei-govern", to: "ei-archive", label: "ARCHIVE FIRST" }, { from: "ei-archive", to: "ei-process", label: "DERIVE" }, { from: "ei-archive", to: "ei-original", label: "PRESERVES" }, { from: "ei-process", to: "ei-derived", label: "PREPARES" },
      { from: "ei-original", to: "ei-inspector", label: "INSPECT" }, { from: "ei-derived", to: "ei-inspector", label: "COMPARE" }, { from: "ei-derived", to: "ei-link", label: "OPTIONAL", style: "optional" },
    ],
  },
  {
    id: "decide-investigate",
    name: "Decide to Investigate",
    shortName: "Decide to Investigate",
    subtitle: "Create a case only when the user chooses to go deeper",
    purpose: "Creates a deliberate boundary between broad discovery and a human-owned, evidence-scoped investigation.",
    howItStarts: "A user reviews a Raw Ecosystem View, evidence item, Story or tracked subject and decides whether deeper examination is warranted.",
    systemActions: ["Present reviewable source and context", "Wait at the human decision gate", "Create only the lightweight case, evidence scope and timeline after approval"],
    humanActions: ["Continue exploring or refine the question", "Inspect more evidence or select relevant material", "Explicitly choose Start Investigation"],
    outputs: ["User-owned case record", "Initial evidence scope", "Initialized investigation timeline"],
    boundary: "Search is not Investigation. Human intent creates the investigation; no automatic progression is permitted.",
    visualType: "decide-investigate",
    group: "Evidence & Investigation",
    visualTitle: "Human Investigation Decision Gate",
    visualSummary: "Multiple discovery states converge on a human review gate. Only an explicit Start Investigation choice creates a case and initial scope.",
    legend: ["Discovery input", "Human gate", "Continue path", "Case creation"],
    nodes: [
      n("di-raw", "Raw Ecosystem View", "analysis", "Discovery state", "FrameWire", "Raw Intelligence Event", "Reviewable context", "A case", 12, 16),
      n("di-item", "Evidence item", "evidence", "Candidate", "FrameWire", "Archived evidence", "Reviewable material", "Investigation scope", 12, 38),
      n("di-story", "Story", "evidence", "Organizational", "FrameWire", "Linked evidence container", "Subject context", "Verified event", 12, 61),
      n("di-track", "Tracked subject", "evidence", "Interest only", "Human investigator", "Tracked record", "Continuation context", "Verified conclusion", 12, 84),
      n("di-review", "Human review", "decision", "Authority gate", "Human investigator", "Discovery context and evidence", "A deliberate choice", "Automatic escalation", 42, 50),
      n("di-explore", "Continue exploring", "user", "Stay in Discover", "Human investigator", "Unresolved question", "Further discovery", "A failed investigation", 67, 18),
      n("di-refine", "Refine question", "user", "Stay in Discover", "Human investigator", "Raw ecosystem view", "More bounded query", "A final answer", 67, 40),
      n("di-inspect", "Inspect more evidence", "user", "Stay in review", "Human investigator", "Candidate material", "Better evidence context", "Evidence promotion", 67, 62),
      n("di-start", "Start Investigation", "decision", "Explicit approval", "Human investigator", "Question and selected evidence", "Investigation birth request", "Heavy analysis or report", 67, 84),
      n("di-case", "Case + scope + timeline", "output", "Created", "FrameWire", "Approved investigation request", "Lightweight investigation workspace", "Broad search truth", 92, 84),
    ],
    edges: [
      { from: "di-raw", to: "di-review", label: "REVIEW" }, { from: "di-item", to: "di-review", label: "REVIEW" }, { from: "di-story", to: "di-review", label: "REVIEW" }, { from: "di-track", to: "di-review", label: "REVIEW" },
      { from: "di-review", to: "di-explore", label: "CONTINUE", style: "optional" }, { from: "di-review", to: "di-refine", label: "REFINE", style: "optional" }, { from: "di-review", to: "di-inspect", label: "INSPECT", style: "optional" }, { from: "di-review", to: "di-start", label: "DECIDE", style: "optional" }, { from: "di-start", to: "di-case", label: "CREATE" },
    ],
  },
  {
    id: "evidence-scope",
    name: "Evidence Selection & Scope",
    shortName: "Evidence Scope",
    subtitle: "Define exactly which evidence the investigation is allowed to analyze",
    purpose: "Turns candidate material into an authoritative investigation evidence set through explicit eligibility and relevance review.",
    howItStarts: "Candidate evidence arrives from Discover, tracking, uploads or investigator selection with Archive identity and provenance intact.",
    systemActions: ["Expose eligibility, ownership and provenance", "Preserve include, exclude, quarantine and insufficiency states", "Enforce the selected evidence boundary for downstream lenses"],
    humanActions: ["Review relevance and evidence quality", "Include with a reason or explicitly exclude", "Keep quarantine and insufficiency outside analytical scope"],
    outputs: ["Authoritative linked-evidence set", "Reasoned exclusion and quarantine record", "Bounded input for investigation analysis"],
    boundary: "Broad ecosystem material must not silently enter the investigation or return through broad joins.",
    visualType: "evidence-scope",
    group: "Evidence & Investigation",
    visualTitle: "Investigation Evidence Boundary",
    visualSummary: "Candidate material is reviewed for eligibility and relevance. Included evidence enters the authoritative boundary; other states remain outside it.",
    legend: ["Candidate", "Review gate", "Included evidence", "Outside boundary"],
    nodes: [
      n("es-candidate", "Candidate evidence", "evidence", "Outside scope", "Evidence system", "Archived item and lineage", "Review candidate", "Investigation evidence", 10, 50),
      n("es-eligibility", "Eligibility review", "system", "Governed", "FrameWire", "Safety, ownership, body and evidence state", "Eligibility decision", "Relevance judgment", 28, 50),
      n("es-relevance", "Relevance review", "decision", "Human authority", "Human investigator", "Eligible candidate and investigation question", "Reasoned scope decision", "Truth verification", 47, 50),
      n("es-include", "Include", "decision", "Reason recorded", "Human investigator", "Relevant eligible evidence", "Linked investigation evidence", "A finding", 67, 16),
      n("es-exclude", "Exclude", "blocked", "Outside boundary", "Human investigator", "Irrelevant or intentionally omitted item", "Reasoned exclusion", "Evidence deletion", 67, 39),
      n("es-quarantine", "Quarantine", "blocked", "Ineligible", "Eligibility gate", "Unsafe or disallowed evidence", "Governed quarantine state", "A neutral value", 67, 63),
      n("es-insufficient", "Insufficient", "blocked", "Unresolved", "Eligibility gate", "Incomplete or unsupported material", "Visible insufficiency", "Forced analysis", 67, 86),
      n("es-boundary", "Investigation evidence set", "output", "Authoritative scope", "Investigation workspace", "Included IDs with Archive identity, source, time and reason", "Permitted analytical universe", "Canonical truth", 91, 28),
      n("es-outside", "Outside the boundary", "evidence", "Preserved, not analyzed", "FrameWire", "Excluded, quarantined and insufficient records", "Visible non-scope context", "Silent re-entry", 91, 70),
    ],
    edges: [
      { from: "es-candidate", to: "es-eligibility", label: "CHECK" }, { from: "es-eligibility", to: "es-relevance", label: "REVIEW" }, { from: "es-relevance", to: "es-include", label: "INCLUDE" }, { from: "es-relevance", to: "es-exclude", label: "EXCLUDE", style: "blocked" }, { from: "es-relevance", to: "es-quarantine", label: "QUARANTINE", style: "blocked" }, { from: "es-relevance", to: "es-insufficient", label: "INSUFFICIENT", style: "blocked" },
      { from: "es-include", to: "es-boundary", label: "ENTERS" }, { from: "es-exclude", to: "es-outside", label: "REMAINS OUT", style: "dashed" }, { from: "es-quarantine", to: "es-outside", label: "REMAINS OUT", style: "dashed" }, { from: "es-insufficient", to: "es-outside", label: "REMAINS OUT", style: "dashed" },
    ],
  },
  {
    id: "investigation-workspace",
    name: "Investigation Workspace & Timeline",
    shortName: "Investigation Workspace",
    subtitle: "Examine the case through one persistent, evidence-scoped workspace",
    purpose: "Keeps evidence, timeline, entities, sources, lens observations, findings, notes and report actions together around one investigation question.",
    howItStarts: "A human-created investigation opens with its authoritative linked-evidence set and initialized timeline.",
    systemActions: ["Scope every read to the investigation", "Build an idempotent observed timeline", "Maintain persistent investigation context across supported views"],
    humanActions: ["Inspect evidence and sources", "Run lenses and compare observations", "Record notes, findings and report selections"],
    outputs: ["Persistent investigation context", "Evidence-scoped timeline and observations", "Attributable findings and report-ready selections"],
    boundary: "Temporal order does not prove causation. The workspace organizes analysis but does not choose the correct conclusion.",
    visualType: "workspace",
    group: "Evidence & Investigation",
    visualTitle: "Persistent Investigation Workspace",
    visualSummary: "The investigation remains central while scoped evidence, timeline, identities, observations, human notes and report actions stay connected.",
    legend: ["Case context", "Evidence component", "Human record", "Report action"],
    nodes: [
      n("iw-case", "INVESTIGATION", "output", "Persistent context", "Human investigator", "Question and linked evidence", "One case-centered workspace", "An analytical authority", 50, 50),
      n("iw-evidence", "Evidence", "evidence", "Scoped", "Investigation workspace", "Linked evidence IDs", "Permitted evidence tray", "Broad ecosystem access", 18, 17),
      n("iw-timeline", "Timeline", "analysis", "Observed order", "FrameWire", "Evidence and event timestamps", "Earlier, new, contradiction, gap and later context", "Causation", 39, 16),
      n("iw-entities", "Entities", "analysis", "Resolved / unresolved", "FrameWire", "Investigation mentions and identity", "Case identity context", "Relationship proof", 63, 16),
      n("iw-sources", "Sources", "evidence", "Attributed", "FrameWire", "Evidence lineage", "Source comparison", "Universal credibility", 84, 17),
      n("iw-lenses", "Lens observations", "analysis", "Independent", "FrameWire", "Scoped evidence", "Separate analytical observations", "Findings", 17, 82),
      n("iw-findings", "Findings", "decision", "Human-authored", "Human investigator", "Evidence and observations", "Reviewable findings", "Canonical evidence", 38, 84),
      n("iw-notes", "Human notes", "decision", "Attributable", "Human investigator", "Questions, corrections and exclusions", "Append-only reasoning context", "Silent lens mutation", 62, 84),
      n("iw-report", "Report actions", "user", "Selected handoff", "Human investigator", "Reviewed findings and evidence", "Report-ready selection", "Finalized conclusion", 84, 82),
    ],
    edges: [
      { from: "iw-evidence", to: "iw-case", label: "SCOPES" }, { from: "iw-timeline", to: "iw-case", label: "ORDERS" }, { from: "iw-entities", to: "iw-case", label: "CONTEXT" }, { from: "iw-sources", to: "iw-case", label: "ATTRIBUTES" }, { from: "iw-case", to: "iw-lenses", label: "ANALYZE" }, { from: "iw-case", to: "iw-findings", label: "REVIEW" }, { from: "iw-case", to: "iw-notes", label: "RECORD" }, { from: "iw-case", to: "iw-report", label: "HANDOFF" },
    ],
  },
  {
    id: "lens-analysis",
    name: "Independent Lens Analysis",
    shortName: "Independent Lens Analysis",
    subtitle: "Examine the same evidence through separate analytical questions",
    purpose: "Routes one investigation evidence set into independent analytical lenses and preserves separate evidence-backed observations for human inspection.",
    howItStarts: "The investigation’s authoritative linked-evidence set is admitted to separately scoped lens processing.",
    systemActions: ["Route the same scoped evidence independently", "Keep lens calculations and observations separate", "Preserve missing, disagreement and insufficiency states"],
    humanActions: ["Choose relevant lenses", "Inspect each observation against evidence", "Compare without allowing one lens to overwrite another"],
    outputs: ["Separate lens observations", "Visible unavailable or insufficient states", "Human inspection context"],
    boundary: "One lens cannot inherit, determine or overwrite another lens result. A lens observation is not automatically a finding.",
    visualType: "lens-analysis",
    group: "Analyze & Understand",
    visualTitle: "Independent Evidence Routing",
    visualSummary: "The same investigation evidence is routed to ten independent analytical paths. Separate observations return for human inspection without overwrite.",
    legend: ["Scoped evidence", "Independent processing", "Separate output", "Human inspection"],
    nodes: [
      n("la-evidence", "Investigation evidence", "evidence", "Authoritative scope", "Investigation workspace", "Linked evidence set", "Shared input boundary", "Shared lens answer", 9, 50),
      n("la-router", "Independent routing", "system", "No overwrite", "FrameWire", "Scoped evidence", "Separate processing paths", "A single combined score", 25, 50),
      n("la-na", "NA · SE · EM", "analysis", "Separate lenses", "Lens systems", "Same scoped evidence", "Independent observations", "Inherited conclusions", 47, 17),
      n("la-th", "TH · FC · GE", "analysis", "Separate lenses", "Lens systems", "Same scoped evidence", "Independent observations", "Inherited conclusions", 47, 40),
      n("la-pi", "PI · AU", "analysis", "Separate lenses", "Lens systems", "Same scoped evidence", "Independent observations", "Inherited conclusions", 47, 64),
      n("la-ps", "PS · ER", "analysis", "Separate lenses", "Lens systems", "Same scoped evidence", "Independent observations", "Inherited conclusions", 47, 86),
      n("la-observe-a", "Observation set A", "output", "Evidence-backed", "FrameWire", "Independent lens output", "Reviewable observation", "Finding", 71, 25),
      n("la-observe-b", "Observation set B", "output", "Evidence-backed", "FrameWire", "Independent lens output", "Reviewable observation", "Finding", 71, 58),
      n("la-missing", "Insufficient state", "blocked", "Visible", "FrameWire", "Missing or insufficient evidence", "Honest limitation", "Neutral result", 71, 84),
      n("la-review", "Human inspection", "decision", "Required", "Human investigator", "Separate observations and evidence", "Context for judgment", "Automatic synthesis", 92, 50),
    ],
    edges: [
      { from: "la-evidence", to: "la-router", label: "SCOPE" }, { from: "la-router", to: "la-na", label: "ROUTE" }, { from: "la-router", to: "la-th", label: "ROUTE" }, { from: "la-router", to: "la-pi", label: "ROUTE" }, { from: "la-router", to: "la-ps", label: "ROUTE" }, { from: "la-na", to: "la-observe-a", label: "OBSERVE" }, { from: "la-th", to: "la-observe-a", label: "OBSERVE" }, { from: "la-pi", to: "la-observe-b", label: "OBSERVE" }, { from: "la-ps", to: "la-observe-b", label: "OBSERVE" }, { from: "la-ps", to: "la-missing", label: "INSUFFICIENT", style: "blocked" }, { from: "la-observe-a", to: "la-review", label: "INSPECT" }, { from: "la-observe-b", to: "la-review", label: "INSPECT" }, { from: "la-missing", to: "la-review", label: "DISCLOSE", style: "dashed" },
    ],
  },
  {
    id: "cross-lens-context",
    name: "Cross-Lens Context & Analytics",
    shortName: "Cross-Lens Context",
    subtitle: "Connect observations without forcing them into one artificial answer",
    purpose: "Relates independent observations through shared evidence, identity, time, sources and governed relationships, then exposes bounded descriptive analytics.",
    howItStarts: "Independent observations remain intact while shared canonical evidence and identity provide comparison anchors.",
    systemActions: ["Create additive governed relationships", "Preserve reinforcement, contradiction, qualification and unrelated states", "Expose correlation or anomaly candidates with method and caveats"],
    humanActions: ["Inspect relationship and evidence basis", "Challenge misleading equivalence", "Decide what context is relevant to a finding"],
    outputs: ["Reviewable cross-lens context", "Missing-data and contradiction states", "Non-canonical analytics candidates"],
    boundary: "Cross-lens context assists interpretation. It does not create a unified truth score or automatic finding.",
    visualType: "cross-lens",
    group: "Analyze & Understand",
    visualTitle: "Governed Context Matrix",
    visualSummary: "Independent observations meet only through shared evidence and identity. Relationships remain typed as reinforcement, contradiction, qualification, unrelated or missing.",
    legend: ["Independent observation", "Shared anchor", "Typed context", "Not equivalent"],
    nodes: [
      n("cl-na", "Narrative observation", "analysis", "Independent", "Narrative lens", "Scoped evidence", "Narrative context", "Sentiment truth", 12, 18),
      n("cl-se", "Negative sentiment", "analysis", "Independent", "Sentiment lens", "Holder-target-aspect evidence", "Expressed evaluation", "Threat", 12, 41),
      n("cl-em", "Expressed emotion", "analysis", "Independent", "Emotion lens", "Attributed emotion evidence", "Emotion context", "Mobilization", 12, 64),
      n("cl-fc", "Verification state", "analysis", "Independent", "Verification lens", "Claim support and contradiction", "Verification context", "Narrative overwrite", 12, 86),
      n("cl-anchor", "Shared evidence / identity", "evidence", "Canonical anchor", "FrameWire", "Evidence, entity, time and source IDs", "Governed comparison basis", "Semantic equivalence", 39, 50),
      n("cl-relate", "Governed relationships", "system", "Additive", "Cross-lens synchronization", "Independent observations and shared anchors", "Typed reviewable links", "Lens mutation", 58, 50),
      n("cl-reinforce", "Reinforcement", "output", "Candidate context", "FrameWire", "Supported cross-lens relationship", "Reviewable reinforcement", "Truth score", 78, 14),
      n("cl-contradict", "Contradiction", "output", "Preserved", "FrameWire", "Conflicting observations", "Reviewable contradiction", "Forced agreement", 78, 36),
      n("cl-qualify", "Qualification", "output", "Bounded", "FrameWire", "Context that changes interpretation", "Reviewable qualification", "Automatic finding", 78, 58),
      n("cl-missing", "Missing / unrelated", "blocked", "Visible", "FrameWire", "Absent or unsupported link", "Honest non-relationship", "Neutral evidence", 78, 82),
      n("cl-human", "Human interpretation", "decision", "Required", "Human investigator", "Typed context and evidence", "Judgment context", "Automatic conclusion", 94, 50),
    ],
    edges: [
      { from: "cl-na", to: "cl-anchor", label: "SHARES" }, { from: "cl-se", to: "cl-anchor", label: "SHARES" }, { from: "cl-em", to: "cl-anchor", label: "SHARES" }, { from: "cl-fc", to: "cl-anchor", label: "SHARES" }, { from: "cl-anchor", to: "cl-relate", label: "GOVERNS" },
      { from: "cl-relate", to: "cl-reinforce", label: "REINFORCES" }, { from: "cl-relate", to: "cl-contradict", label: "CONTRADICTS", style: "dashed" }, { from: "cl-relate", to: "cl-qualify", label: "QUALIFIES" }, { from: "cl-relate", to: "cl-missing", label: "UNRELATED", style: "blocked" }, { from: "cl-reinforce", to: "cl-human", label: "REVIEW" }, { from: "cl-contradict", to: "cl-human", label: "REVIEW" }, { from: "cl-qualify", to: "cl-human", label: "REVIEW" }, { from: "cl-missing", to: "cl-human", label: "DISCLOSE", style: "dashed" },
    ],
  },
  {
    id: "guided-reasoning",
    name: "Guided Human Reasoning",
    shortName: "Guided Reasoning",
    subtitle: "Help the investigator compare evidence, challenge interpretations, and record judgment",
    purpose: "Organizes competing interpretations, contradictions, gaps, assumptions and unresolved questions without replacing the investigator’s reasoning.",
    howItStarts: "Evidence and independent lens context enter a deterministic review structure inside the active investigation.",
    systemActions: ["Organize competing interpretation lanes", "Keep support, contradiction, missing evidence and assumptions visible", "Offer bounded drafting assistance only where evidence is sufficient"],
    humanActions: ["Challenge each interpretation", "Record findings, notes and unresolved questions", "Own the report handoff and final judgment"],
    outputs: ["Attributable findings and notes", "Explicit gaps and unresolved questions", "Human-controlled report handoff"],
    boundary: "AI may organize or assist drafting. The investigator owns judgment; this is not a chatbot or autonomous answer system.",
    visualType: "guided-reasoning",
    group: "Analyze & Understand",
    visualTitle: "Competing Interpretation Review",
    visualSummary: "Evidence and lens context split into two inspectable interpretations, each carrying support, contradiction, gaps and unresolved questions before human judgment.",
    legend: ["Evidence context", "Interpretation lane", "Challenge", "Human judgment"],
    nodes: [
      n("gr-context", "Evidence + lens context", "evidence", "Scoped", "Investigation workspace", "Reviewed evidence and observations", "Reasoning input", "An AI answer", 10, 50),
      n("gr-a", "Interpretation A", "analysis", "Provisional", "Human investigator", "Evidence and observations", "One inspectable interpretation", "A conclusion", 35, 25),
      n("gr-b", "Interpretation B", "analysis", "Competing", "Human investigator", "Evidence and observations", "A competing interpretation", "A winner", 35, 75),
      n("gr-support", "Supporting evidence", "evidence", "Linked", "FrameWire", "Evidence references", "Visible support", "Proof by repetition", 58, 12),
      n("gr-contradict", "Contradicting evidence", "evidence", "Linked", "FrameWire", "Evidence references", "Visible contradiction", "Forced agreement", 58, 38),
      n("gr-gap", "Missing evidence", "blocked", "Gap", "FrameWire", "Unresolved evidence requirement", "Visible insufficiency", "Neutral evidence", 58, 63),
      n("gr-question", "Unresolved question", "blocked", "Open", "Human investigator", "Conflicting context and assumptions", "Recorded question", "Automatic answer", 58, 88),
      n("gr-judgment", "HUMAN JUDGMENT", "decision", "Investigator-owned", "Human investigator", "Competing interpretations and evidence matrix", "Finding, note, correction or unresolved state", "System conclusion", 81, 50),
      n("gr-handoff", "Report handoff", "output", "Selected", "Human investigator", "Reviewed findings and notes", "Governed report inputs", "Finalized report", 95, 50),
    ],
    edges: [
      { from: "gr-context", to: "gr-a", label: "INTERPRET" }, { from: "gr-context", to: "gr-b", label: "COMPARE" }, { from: "gr-a", to: "gr-support", label: "SUPPORTED BY" }, { from: "gr-a", to: "gr-contradict", label: "CHALLENGED BY", style: "dashed" }, { from: "gr-b", to: "gr-gap", label: "MISSING" }, { from: "gr-b", to: "gr-question", label: "UNRESOLVED", style: "dashed" },
      { from: "gr-support", to: "gr-judgment", label: "WEIGH" }, { from: "gr-contradict", to: "gr-judgment", label: "WEIGH" }, { from: "gr-gap", to: "gr-judgment", label: "DISCLOSE" }, { from: "gr-question", to: "gr-judgment", label: "RETAIN" }, { from: "gr-judgment", to: "gr-handoff", label: "HANDOFF" },
    ],
  },
  {
    id: "what-if-simulation",
    name: "What-If Simulation",
    shortName: "What-If Simulation",
    subtitle: "Explore explicit hypothetical scenarios without confusing them with observed reality",
    purpose: "Lets authorized users examine explicit assumptions and alternative paths inside a visibly bounded hypothetical space.",
    howItStarts: "The user defines assumptions and chooses to enter the optional Simulation path separately from observed evidence.",
    systemActions: ["Keep observed evidence outside the hypothetical boundary", "Generate bounded alternative paths and caveats", "Prevent simulated output from becoming Archive, lens, alert or report truth"],
    humanActions: ["State assumptions explicitly", "Inspect caveats and alternatives", "Reflect without treating a scenario as prediction"],
    outputs: ["Clearly labeled simulated alternatives", "Caveats and assumption record", "Human reflection only"],
    boundary: "Simulation is hypothetical, not prediction or observed evidence. It never feeds canonical evidence or findings automatically.",
    visualType: "simulation",
    group: "Scenario & Output",
    visualTitle: "Observed / Hypothetical Separation",
    visualSummary: "Observed evidence remains outside a strong Simulation boundary. Explicit assumptions create alternative paths and caveats for human reflection only.",
    legend: ["Observed evidence", "Simulation boundary", "Alternative path", "No canonical write"],
    nodes: [
      n("si-observed", "OBSERVED EVIDENCE", "evidence", "Factual boundary", "Canonical evidence system", "Preserved evidence", "Context reference only", "Simulation input mutation", 11, 24),
      n("si-user", "Explicit assumptions", "user", "User-defined", "Human investigator", "Stated hypothetical conditions", "Bounded scenario input", "Observed fact", 11, 73),
      n("si-gate", "SIMULATION BOUNDARY", "decision", "Optional path", "Human investigator", "Explicit assumptions and caveats", "Separated hypothetical workspace", "Automatic forecast", 34, 73),
      n("si-a", "Assumption A", "analysis", "Hypothetical", "Simulation system", "Explicit user assumption", "Alternative path A", "Probability", 56, 35),
      n("si-b", "Assumption B", "analysis", "Hypothetical", "Simulation system", "Explicit user assumption", "Alternative path B", "Future truth", 56, 72),
      n("si-alt-a", "Alternative 1", "output", "Simulated", "Simulation system", "Assumption A", "Reviewable possibility", "Prediction", 77, 25),
      n("si-alt-b", "Alternative 2", "output", "Simulated", "Simulation system", "Assumption B", "Reviewable possibility", "Prediction", 77, 61),
      n("si-caveat", "Caveats", "blocked", "Required", "Simulation system", "Assumptions and missing knowledge", "Visible limitations", "Confidence score", 77, 86),
      n("si-reflect", "Human reflection", "decision", "No canonical write", "Human investigator", "Alternatives and caveats", "Questions and reflection", "Archive, alert, lens or finding write", 94, 58),
    ],
    edges: [
      { from: "si-observed", to: "si-gate", label: "REFERENCE ONLY", style: "blocked" }, { from: "si-user", to: "si-gate", label: "ENTER" }, { from: "si-gate", to: "si-a", label: "BOUND" }, { from: "si-gate", to: "si-b", label: "BOUND" }, { from: "si-a", to: "si-alt-a", label: "EXPLORE", style: "optional" }, { from: "si-b", to: "si-alt-b", label: "EXPLORE", style: "optional" }, { from: "si-a", to: "si-caveat", label: "CAVEAT", style: "dashed" }, { from: "si-b", to: "si-caveat", label: "CAVEAT", style: "dashed" }, { from: "si-alt-a", to: "si-reflect", label: "REFLECT" }, { from: "si-alt-b", to: "si-reflect", label: "REFLECT" }, { from: "si-caveat", to: "si-reflect", label: "LIMIT" },
    ],
  },
  {
    id: "report-finalization",
    name: "Report Assembly, Review & Finalization",
    shortName: "Report Finalization",
    subtitle: "Turn reviewed evidence and analysis into an accountable report",
    purpose: "Assembles selected evidence, observations, analytics, human findings, contradictions and limitations into an evidence-linked draft that only a human can finalize.",
    howItStarts: "The investigator selects reviewed findings, evidence and contextual material from the investigation workspace.",
    systemActions: ["Maintain statement-to-Archive traceability", "Preserve contradictions and limitations", "Create a point-in-time snapshot only after human approval"],
    humanActions: ["Include, correct, qualify, exclude or leave unresolved", "Review methodology, wording and evidence", "Approve and attribute the finalized report"],
    outputs: ["Evidence-linked draft", "Attributable human dispositions", "Finalized immutable report snapshot"],
    boundary: "AI may assist drafting. Only the human reviewer finalizes, and later live changes cannot silently rewrite the snapshot.",
    visualType: "report",
    group: "Scenario & Output",
    visualTitle: "Human-Finalized Report Flow",
    visualSummary: "Reviewed materials form an evidence-linked draft. Human disposition and methodology review precede approval and a point-in-time report snapshot.",
    legend: ["Reviewed input", "Evidence-linked draft", "Human review", "Finalized snapshot"],
    nodes: [
      n("rp-evidence", "Reviewed evidence", "evidence", "Selected", "Human investigator", "Investigation evidence", "Report evidence input", "Automatic finding", 10, 15),
      n("rp-lenses", "Lens observations", "analysis", "Reviewed", "Lens systems", "Independent observations", "Report context", "Findings by default", 10, 34),
      n("rp-findings", "Human findings", "decision", "Attributable", "Human investigator", "Evidence-backed reasoning", "Finding input", "Canonical evidence", 10, 54),
      n("rp-limits", "Contradictions & limits", "blocked", "Visible", "FrameWire", "Conflicting and insufficient evidence", "Required report caveats", "Forced agreement", 10, 76),
      n("rp-draft", "Evidence-linked draft", "system", "Reviewable", "Report system", "Selected inputs with lineage", "Draft report sections", "Final report", 35, 46),
      n("rp-disposition", "Human disposition", "decision", "Include · correct · qualify", "Human reviewer", "Draft statements and evidence", "Explicit treatment per finding", "Automatic approval", 58, 46),
      n("rp-method", "Methodology review", "decision", "Required", "Human reviewer", "Evidence, method and limitations", "Reviewed methodology", "Hidden assumptions", 75, 26),
      n("rp-more", "Need more evidence", "blocked", "Return path", "Human reviewer", "Insufficient draft statement", "Unresolved or renewed evidence work", "Fabricated completion", 75, 68),
      n("rp-approve", "Human approval", "decision", "Attributable", "Human reviewer", "Reviewed draft and methodology", "Approval record", "AI finalization", 89, 35),
      n("rp-final", "Finalized report snapshot", "output", "Point in time", "Report system", "Human-approved report state", "Immutable attributable snapshot", "Live mutable report", 95, 68),
    ],
    edges: [
      { from: "rp-evidence", to: "rp-draft", label: "ASSEMBLE" }, { from: "rp-lenses", to: "rp-draft", label: "CONTEXT" }, { from: "rp-findings", to: "rp-draft", label: "INCLUDE" }, { from: "rp-limits", to: "rp-draft", label: "DISCLOSE" }, { from: "rp-draft", to: "rp-disposition", label: "REVIEW" }, { from: "rp-disposition", to: "rp-method", label: "METHOD" }, { from: "rp-disposition", to: "rp-more", label: "RETURN", style: "dashed" }, { from: "rp-method", to: "rp-approve", label: "APPROVE" }, { from: "rp-approve", to: "rp-final", label: "FINALIZE" },
    ],
  },
  {
    id: "export-analysis",
    name: "Export & External Analysis",
    shortName: "Export & Analysis",
    subtitle: "Share reports and bounded datasets without losing provenance or scope",
    purpose: "Creates permission-checked report exports or bounded reproducible datasets for derived external analysis without exposing unscoped canonical data.",
    howItStarts: "An authorized user selects a reviewed report or an explicit investigation/report dataset scope.",
    systemActions: ["Check permissions and scope", "Create snapshots, manifests and SHA-256 validation", "Label external analytical artifacts as derived and non-canonical"],
    humanActions: ["Choose report or dataset scope", "Review exclusions, caveats and verification state", "Review any external analytical artifact before use"],
    outputs: ["Portable report snapshot", "Governed reproducible dataset", "Derived non-canonical analytical artifact"],
    boundary: "External analysis cannot rewrite evidence, create canonical findings or finalize reports.",
    visualType: "export",
    group: "Scenario & Output",
    visualTitle: "Governed Export Branches",
    visualSummary: "A reviewed report follows a portable snapshot branch. A separately scoped dataset follows manifest, hash and derived external-analysis controls.",
    legend: ["Permission gate", "Report branch", "Data branch", "Derived artifact"],
    nodes: [
      n("ex-report", "Reviewed report", "output", "Point in time", "Report system", "Human-reviewed snapshot", "Export request", "Regenerated conclusions", 9, 27),
      n("ex-scope", "Investigation / report scope", "decision", "Owner-scoped", "Authorized human", "Explicit bounded dataset", "Governed data request", "Bulk data dump", 9, 72),
      n("ex-permit", "Permission check", "system", "Required", "FrameWire", "User, scope and output request", "Authorized branch", "Unscoped access", 30, 27),
      n("ex-data", "Governed data export", "system", "Bounded", "FrameWire", "Owner-scoped records", "JSON/CSV and exclusions", "Canonical mutation", 30, 72),
      n("ex-snapshot", "Snapshot export", "system", "Traceable", "FrameWire", "Stored report snapshot", "Portable report artifact", "Hidden conclusion", 52, 20),
      n("ex-manifest", "Manifest + SHA-256", "evidence", "Reproducible", "FrameWire", "Exported scope, provenance and hashes", "Validation record", "Truth certification", 52, 60),
      n("ex-notebook", "External Python / Jupyter", "analysis", "EXTERNAL", "Human analyst", "Validated bounded export", "Derived external analysis", "FrameWire canonical write", 72, 72),
      n("ex-portable", "Portable report", "output", "Authorized copy", "FrameWire", "Snapshot export", "Shareable report", "Mutable canonical report", 75, 20),
      n("ex-derived", "DERIVED · NON-CANONICAL", "blocked", "External artifact", "Human analyst", "External calculation and method log", "Reviewable derived artifact", "Canonical finding", 89, 62),
      n("ex-review", "Human review", "decision", "Required", "Human reviewer", "Derived artifact, caveats and methods", "Bounded interpretation", "Automatic promotion", 95, 86),
    ],
    edges: [
      { from: "ex-report", to: "ex-permit", label: "REQUEST" }, { from: "ex-permit", to: "ex-snapshot", label: "AUTHORIZE" }, { from: "ex-snapshot", to: "ex-portable", label: "PORTABLE" }, { from: "ex-scope", to: "ex-data", label: "BOUND" }, { from: "ex-data", to: "ex-manifest", label: "VALIDATE" }, { from: "ex-manifest", to: "ex-notebook", label: "ANALYZE" }, { from: "ex-notebook", to: "ex-derived", label: "DERIVE", style: "dashed" }, { from: "ex-derived", to: "ex-review", label: "REVIEW" },
    ],
  },
  {
    id: "tracking-alerts",
    name: "Tracking, Watchlists & Alerts",
    shortName: "Tracking & Alerts",
    subtitle: "Continue observing subjects after the first search or report",
    purpose: "Preserves user interest, bounded watchlist criteria and dated comparison context so meaningful change candidates can return to investigation work.",
    howItStarts: "A user explicitly tracks evidence, an actor, source, narrative or subject, or configures supported watchlist criteria.",
    systemActions: ["Compare new permitted observations with dated prior context", "Distinguish recurrence, novelty and change candidates", "Create alerts only from approved bounded conditions"],
    humanActions: ["Choose what to track", "Review watchlist matches and change candidates", "Return to Discover, an existing or new investigation, or a later report"],
    outputs: ["Tracked interest record", "Watchlist condition match", "Operational alert or investigation-continuation path"],
    boundary: "Tracking is interest, a watchlist match is a condition match, and an alert is an operational notice. None is a verified conclusion.",
    visualType: "tracking",
    group: "Continue",
    visualTitle: "Dated Continuity and Change Flow",
    visualSummary: "A tracked subject is observed against bounded criteria and dated memory. A change candidate may create an operational notice or return the human to investigation.",
    legend: ["Tracked interest", "Dated memory", "Condition match", "Human continuation"],
    nodes: [
      n("tr-subject", "Tracked subject", "user", "Interest only", "Human investigator", "Selected evidence, actor, source or subject", "Persistent tracked item", "Verification", 9, 50),
      n("tr-criteria", "Watchlist criteria", "decision", "User-owned", "Human investigator", "Supported bounded conditions", "Monitoring scope", "Predetermined significance", 27, 50),
      n("tr-prior", "Prior observation", "evidence", "Dated context", "Shared Intelligence Memory", "Historical observation", "Comparison baseline", "Current truth", 47, 20),
      n("tr-new", "New observation", "evidence", "Permitted evidence", "FrameWire", "Newly available eligible material", "Current comparison input", "Verified conclusion", 47, 50),
      n("tr-sparse", "Sparse / unavailable", "blocked", "No escalation", "FrameWire", "Missing, stale or unavailable information", "Visible limitation", "Alert trigger", 47, 82),
      n("tr-compare", "Historical comparison", "system", "Bounded", "FrameWire", "Dated prior and new observations", "Recurrence or change context", "Causation", 67, 50),
      n("tr-change", "Change candidate", "analysis", "Review required", "FrameWire", "Supported difference or recurrence", "Candidate change context", "Verified significance", 82, 50),
      n("tr-alert", "Operational alert", "output", "Notice only", "FrameWire", "Approved condition and eligible change", "Reviewable notification", "Intelligence conclusion", 95, 20),
      n("tr-discover", "Return to Discover", "user", "Continuation path", "Human investigator", "Change candidate", "New raw ecosystem search", "Automatic investigation", 95, 44),
      n("tr-investigate", "Continue investigation", "decision", "Human choice", "Human investigator", "Change candidate and evidence", "Existing or new investigation path", "Automatic finding", 95, 68),
      n("tr-report", "Later report", "user", "Optional path", "Human investigator", "Reviewed continuation evidence", "Future report work", "Silent report rewrite", 95, 90),
    ],
    edges: [
      { from: "tr-subject", to: "tr-criteria", label: "TRACK" }, { from: "tr-criteria", to: "tr-prior", label: "RECALL" }, { from: "tr-criteria", to: "tr-new", label: "OBSERVE" }, { from: "tr-criteria", to: "tr-sparse", label: "DISCLOSE", style: "blocked" }, { from: "tr-prior", to: "tr-compare", label: "COMPARE" }, { from: "tr-new", to: "tr-compare", label: "COMPARE" }, { from: "tr-sparse", to: "tr-compare", label: "LIMIT", style: "dashed" }, { from: "tr-compare", to: "tr-change", label: "CANDIDATE" },
      { from: "tr-change", to: "tr-alert", label: "NOTICE", style: "optional" }, { from: "tr-change", to: "tr-discover", label: "DISCOVER", style: "optional" }, { from: "tr-change", to: "tr-investigate", label: "DECIDE", style: "optional" }, { from: "tr-change", to: "tr-report", label: "CONTINUE", style: "optional" },
    ],
  },
];

export const workflowIds = workflowDefinitions.map((workflow) => workflow.id);

export function workflowFromHash(): WorkflowDefinition {
  const id = window.location.hash.slice(1) as WorkflowId;
  return workflowDefinitions.find((workflow) => workflow.id === id) ?? workflowDefinitions[0];
}
