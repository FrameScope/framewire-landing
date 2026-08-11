export type PlatformStageId =
  | "collect"
  | "preserve"
  | "discover"
  | "investigate"
  | "analyze"
  | "understand"
  | "calculate"
  | "report"
  | "continue"
  | "control";

export interface PlatformStage {
  id: PlatformStageId;
  number: string;
  title: string;
  menuItems: string[];
  description: string;
  purpose: string;
  mechanism: string;
  capabilities: string[];
  boundary: string;
  preview: string;
  visualType: PlatformStageId;
}

export const platformStages: PlatformStage[] = [
  {
    id: "collect",
    number: "01",
    title: "Collect & Observe",
    menuItems: ["Governed Acquisition", "Live Feed", "Stories", "Entities", "Sources"],
    description: "Public material enters through governed routes with its retrieval context attached.",
    purpose: "FrameWire gathers approved public information and lets users observe the current information environment.",
    mechanism: "Configured ingestion, active acquisition, uploads, source registries, and live surfaces introduce public material through governed routes.",
    capabilities: ["Governed Acquisition", "Live Feed", "Stories", "Entities", "Sources"],
    boundary: "Observation is not conclusion.",
    preview: "Separate public sources enter one governed acquisition gateway.",
    visualType: "collect",
  },
  {
    id: "preserve",
    number: "02",
    title: "Preserve",
    menuItems: ["Canonical Raw Archive", "Cleaning", "Deduplication", "Evidence Eligibility", "Evidence Lineage", "Source Inspector"],
    description: "Original material is preserved before cleaning, eligibility checks, or analysis begin.",
    purpose: "FrameWire preserves what it collected before analytical use.",
    mechanism: "Original material, retrieval metadata, source identity, hashes, ownership, and processing state are recorded before cleaned or derived forms are used.",
    capabilities: ["Canonical Raw Archive", "Cleaning", "Deduplication", "Evidence Eligibility", "Evidence Lineage", "Source Inspector"],
    boundary: "Preserved material is not automatically verified evidence.",
    preview: "The collected item enters a locked Archive record before processing.",
    visualType: "preserve",
  },
  {
    id: "discover",
    number: "03",
    title: "Discover",
    menuItems: ["Raw Ecosystem Search", "Archive Reuse", "Active Search", "Unified Query", "Custom Presets"],
    description: "Search reveals archived evidence and fresh candidates without silently creating an investigation.",
    purpose: "Discover answers what exists around a topic before a formal investigation begins.",
    mechanism: "FrameWire combines internal holdings, Archive reuse, memory, approved external retrieval, entities, sources, and provider coverage.",
    capabilities: ["Raw Ecosystem Search", "Archive Reuse", "Active Search", "Unified Query", "Custom Presets"],
    boundary: "Discover produces raw ecosystem intelligence, not a final conclusion.",
    preview: "Archived records and fresh candidates remain visibly distinct in discovery.",
    visualType: "discover",
  },
  {
    id: "investigate",
    number: "04",
    title: "Investigate",
    menuItems: ["Human Decision to Investigate", "Evidence Selection", "Scoped Evidence", "Timeline", "Workspace", "Findings"],
    description: "A human turns selected material into a bounded evidence universe around a clear question.",
    purpose: "The user creates a bounded case and determines which evidence belongs inside it.",
    mechanism: "Selected evidence IDs form the investigation scope, and all investigation calculations remain bounded to that evidence universe.",
    capabilities: ["Human Decision to Investigate", "Evidence Selection", "Scoped Evidence", "Timeline", "Workspace", "Findings"],
    boundary: "Broad ecosystem information must not silently leak into the investigation.",
    preview: "A broad result set narrows into a deliberate investigation scope.",
    visualType: "investigate",
  },
  {
    id: "analyze",
    number: "05",
    title: "Analyze",
    menuItems: ["Ten Independent Intelligence Lenses", "Investigation-Scoped Analysis", "Separate Observations", "Evidence-Linked Outputs"],
    description: "Independent lenses examine the same scoped evidence while keeping their observations separate.",
    purpose: "The same investigation evidence is examined through multiple analytical perspectives.",
    mechanism: "Narrative, Sentiment, Emotion, Threat, Fact-check, Geography, Politico, Author, Portal and Source, and Entity and Relationship Intelligence operate independently.",
    capabilities: ["Ten Independent Intelligence Lenses", "Investigation-Scoped Analysis", "Separate Observations", "Evidence-Linked Outputs"],
    boundary: "One lens must not overwrite another lens’s observation, and lens output is not automatically a human finding.",
    preview: "Scoped evidence branches into ten independent analytical paths.",
    visualType: "analyze",
  },
  {
    id: "understand",
    number: "06",
    title: "Understand",
    menuItems: ["Cross-Lens Context", "Relationship Projections", "Guided Cognition", "EMAX Continuity", "Human Notes"],
    description: "Observations can be compared through shared evidence without collapsing disagreement into one score.",
    purpose: "FrameWire helps users compare observations, contradictions, relationships, missing evidence, and competing interpretations.",
    mechanism: "Evidence-linked outputs remain independent while contextual systems let users examine how they relate.",
    capabilities: ["Cross-Lens Context", "Relationship Projections", "Guided Cognition", "EMAX Continuity", "Human Notes"],
    boundary: "Connected context is not one automatic truth score.",
    preview: "Separate observations connect through evidence, contradiction, and context.",
    visualType: "understand",
  },
  {
    id: "calculate",
    number: "07",
    title: "Calculate",
    menuItems: ["Data Analytics", "Dataset Profiles", "Time Comparisons", "Geographic Comparisons", "Correlation Candidates", "Governed Exports"],
    description: "Descriptive analytics support comparison while keeping caveats and method visible.",
    purpose: "FrameWire supports bounded descriptive calculations over governed investigation or report data.",
    mechanism: "Scoped datasets are exported with manifests, hashes, provenance, caveats, and reproducibility information before approved analytical methods are applied.",
    capabilities: ["Data Analytics", "Dataset Profiles", "Time Comparisons", "Geographic Comparisons", "Correlation Candidates", "Governed Exports"],
    boundary: "Correlation is not causation, anomaly is not threat, and analytics are non-canonical until reviewed.",
    preview: "Descriptive calculations appear with method and caveat labels attached.",
    visualType: "calculate",
  },
  {
    id: "report",
    number: "08",
    title: "Report",
    menuItems: ["Intelligence Synthesis", "Evidence-Linked Findings", "Contradictions", "Limitations", "Human Review", "Finalization", "Distribution"],
    description: "Reviewed evidence and human findings assemble into a governed, inspectable report.",
    purpose: "Reviewed evidence and selected observations are assembled into a transparent report.",
    mechanism: "The investigator chooses what to include, revise, exclude, or mark as needing more evidence before finalization.",
    capabilities: ["Intelligence Synthesis", "Evidence-Linked Findings", "Contradictions", "Limitations", "Human Review", "Finalization", "Distribution"],
    boundary: "AI assists with synthesis, but only a human finalizes the report.",
    preview: "Only reviewed material advances into the human-finalized report.",
    visualType: "report",
  },
  {
    id: "continue",
    number: "09",
    title: "Continue",
    menuItems: ["Tracked Items", "Watchlists", "Change Detection", "Alerts", "Investigation Continuity"],
    description: "Reviewed work can remain connected to later public developments without becoming a new conclusion.",
    purpose: "FrameWire keeps completed or active investigations connected to later developments.",
    mechanism: "Tracked subjects and monitoring conditions compare new information with dated prior context.",
    capabilities: ["Tracked Items", "Watchlists", "Change Detection", "Alerts", "Investigation Continuity"],
    boundary: "A match or alert is an operational notice, not an intelligence conclusion.",
    preview: "A completed investigation connects to tracking and later change notices.",
    visualType: "continue",
  },
  {
    id: "control",
    number: "10",
    title: "Control",
    menuItems: ["BYOK", "Providers", "Model Routing", "Cost and Budgets", "Authentication", "Roles and Ownership", "Tiers", "Capability Controls", "Emergency Stop", "Audit", "Workers and Operations"],
    description: "Provider, access, cost, capability, and operational controls surround the complete journey.",
    purpose: "Control governs who, what, when, how, and at what cost the platform may operate.",
    mechanism: "Access, provider, budget, runtime, capability, and operational controls apply across every stage.",
    capabilities: ["BYOK", "Providers", "Model Routing", "Cost and Budgets", "Authentication", "Roles and Ownership", "Tiers", "Capability Controls", "Emergency Stop", "Audit", "Workers and Operations"],
    boundary: "Control surrounds the journey; it is not an analytical conclusion and is not merely the final step.",
    preview: "Governance remains an enclosing frame rather than a final workflow destination.",
    visualType: "control",
  },
];

export interface LensDefinition {
  code: string;
  id: string;
  name: string;
  examines: string;
  produces: string;
  boundary: string;
  accent: "cyan" | "blue" | "green" | "amber" | "violet";
}

export const lensRegistry: LensDefinition[] = [
  { code: "NA", id: "narrative", name: "Narrative Intelligence", examines: "Claims, frames, counterframes, and continuity across evidence.", produces: "Bounded narrative observations with visible claim families and temporal context.", boundary: "Shared topic or actor does not automatically create one narrative.", accent: "cyan" },
  { code: "SE", id: "sentiment", name: "Sentiment Intelligence", examines: "Expressed stance, polarity, target, and change over time.", produces: "Positive, negative, neutral, or mixed observations tied to their target.", boundary: "Missing sentiment is not neutral sentiment.", accent: "blue" },
  { code: "EM", id: "emotion", name: "Emotion Intelligence", examines: "Expressed emotional language within public material.", produces: "Contextual observations about anger, fear, sadness, joy, and trust language.", boundary: "Emotion language does not prove internal mental state.", accent: "violet" },
  { code: "TH", id: "threat", name: "Threat Intelligence", examines: "Escalation signals, actors, targets, recurrence, geography, and convergence.", produces: "Bounded risk observations with supporting and contradicting evidence.", boundary: "Negative tone does not automatically become threat.", accent: "amber" },
  { code: "FC", id: "fact-check", name: "Fact-check & Verification", examines: "Extracted claims, supporting material, contradictions, and insufficiency.", produces: "Support states that preserve inconclusive and insufficient outcomes.", boundary: "Repetition is not independent corroboration.", accent: "green" },
  { code: "GE", id: "geography", name: "Geography Intelligence", examines: "Mentioned, event, source, actor-base, and affected locations.", produces: "Explicit geographic roles with evidence-linked location context.", boundary: "Mentioned place is not necessarily event location.", accent: "green" },
  { code: "PI", id: "politico", name: "Politico Intelligence", examines: "Political actors, parties, relationships, participation, and changing context.", produces: "Attributed political-context observations without outcome prediction.", boundary: "No election or coalition forecasting.", accent: "violet" },
  { code: "AU", id: "author", name: "Author Intelligence", examines: "Authorship, attributed speakers, carrier participation, and publishing patterns.", produces: "Evidence-linked patterns of voice, recurrence, and attribution.", boundary: "Recurring patterns do not prove hidden intent.", accent: "amber" },
  { code: "PS", id: "portal-source", name: "Portal & Source Intelligence", examines: "Outlet behavior, source families, syndication, and narrative participation.", produces: "Source-context observations with coverage and lineage visible.", boundary: "High volume is not independent influence.", accent: "cyan" },
  { code: "ER", id: "entity-relationship", name: "Entity & Relationship Intelligence", examines: "People, organizations, places, events, evidence, claims, and supported links.", produces: "Derived, rebuildable relationships tied back to canonical evidence.", boundary: "Co-occurrence is not automatically a meaningful relationship.", accent: "blue" },
];

export interface GovernanceGroup {
  id: string;
  title: string;
  items: string[];
}

export const governanceGroups: GovernanceGroup[] = [
  { id: "byok", title: "BYOK", items: ["User-owned provider keys", "Encrypted storage", "Redacted display"] },
  { id: "providers", title: "Providers & Models", items: ["Approved providers", "Model routing", "Fallback state", "Coverage disclosure"] },
  { id: "cost", title: "Cost & Budget", items: ["Usage", "Attribution", "Limits", "Budget state"] },
  { id: "access", title: "Access", items: ["Authentication", "Ownership", "Roles", "Tiers"] },
  { id: "capabilities", title: "Capability Governance", items: ["Master controls", "Child controls", "Emergency stop", "Runtime state"] },
  { id: "operations", title: "Operations", items: ["Workers", "Queues", "Scheduler", "Health", "Audit logs"] },
];

export const workbenchStates = ["COLLECTED", "ARCHIVED", "ELIGIBLE", "SCOPED", "OBSERVED", "REVIEWED", "FINALIZED"] as const;

export const evidenceLineage = [
  "Original Source",
  "Raw Archive Record",
  "Cleaned Evidence",
  "Investigation Scope",
  "Lens Observation",
  "Human Finding",
  "Report Citation",
] as const;
