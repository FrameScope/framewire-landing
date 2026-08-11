export type CanonicalStageId =
  | "public-information"
  | "governed-acquisition"
  | "raw-archive"
  | "cleaning-eligibility"
  | "discover"
  | "decide-to-investigate"
  | "scoped-evidence"
  | "intelligence-lenses"
  | "cross-lens-context"
  | "guided-reasoning"
  | "governed-report"
  | "human-finalization"
  | "tracking-memory";

export type CanonicalVisualKind =
  | "sources"
  | "acquisition"
  | "archive"
  | "eligibility"
  | "discover"
  | "decision"
  | "scope"
  | "lenses"
  | "cross-lens"
  | "reasoning"
  | "report"
  | "finalization"
  | "memory";

export interface CapabilityLabel {
  code?: string;
  label: string;
}

export interface CanonicalPlatformStage {
  id: CanonicalStageId;
  number: string;
  name: string;
  navigationName: string;
  subtitle: string;
  description: string;
  howItWorks: string;
  technicalFlow: string[];
  capabilities: CapabilityLabel[];
  boundary: string;
  visual: CanonicalVisualKind;
}

export const canonicalPlatformStages: CanonicalPlatformStage[] = [
  {
    id: "public-information",
    number: "01",
    name: "Public Information",
    navigationName: "Public Information",
    subtitle: "The information environment FrameWire observes",
    description: "Public information enters FrameWire from news and media, websites, social platforms, official records, public APIs, and user-provided documents. Each item begins as source material—not verified evidence, intelligence, or a conclusion.",
    howItWorks: "FrameWire records where each item came from, when it was retrieved, and which acquisition route was used. Collection coverage and unavailable sources remain visible so users can see what the system could and could not observe.",
    technicalFlow: ["Media", "Social", "Official Records", "Public APIs", "Uploaded Material", "Acquisition Request"],
    capabilities: [
      { label: "News and media" }, { label: "Websites" }, { label: "Social platforms" },
      { label: "Official records" }, { label: "Public APIs" }, { label: "User-provided documents" },
    ],
    boundary: "Source material is not verified evidence, intelligence, or a conclusion.",
    visual: "sources",
  },
  {
    id: "governed-acquisition",
    number: "02",
    name: "Governed Acquisition",
    navigationName: "Governed Acquisition",
    subtitle: "Public information enters through controlled routes",
    description: "FrameWire collects information through approved ingestion workers, active-search providers, social-data services, uploads, OCR, and enrichment tools.",
    howItWorks: "Provider permissions, user access, budgets, source limits, and operational capability controls are checked before collection begins. Every acquired item carries retrieval metadata, provider context, timestamps, and ownership or visibility rules.",
    technicalFlow: ["Acquisition Request", "Provider Selection", "Permission and Budget Checks", "Retrieval"],
    capabilities: [
      { code: "SING", label: "Scheduled Ingestion" }, { code: "ASA", label: "Active Search & OSINT Acquisition" },
      { code: "SEA", label: "Social Evidence Acquisition" }, { code: "UEI", label: "Uploaded Evidence Intake" },
      { code: "PCH", label: "Provider Coverage & Health" }, { code: "UCB", label: "Usage, Cost & Budget Governance" },
    ],
    boundary: "A failed or unavailable provider produces an honest coverage limitation rather than fabricated evidence. Acquisition may not bypass Archive-first preservation.",
    visual: "acquisition",
  },
  {
    id: "raw-archive",
    number: "03",
    name: "Canonical Raw Archive",
    navigationName: "Raw Archive",
    subtitle: "The original material is preserved before analysis",
    description: "Every acquired item is preserved in the Canonical Raw Archive before it is admitted into analytical workflows.",
    howItWorks: "The Archive records original content, source identity, retrieval time, provider, content hash, ownership, visibility, and collection context. Later cleaning, extraction, translation, or analysis remains traceable to this preserved record.",
    technicalFlow: ["Retrieved Material", "Archive Record", "Stable Archive Identity", "Provenance Chain"],
    capabilities: [
      { code: "CRA", label: "Canonical Raw Archive" }, { code: "ELC", label: "Evidence Lineage & Custody" },
      { code: "SIX", label: "Source Inspector" }, { label: "Stable Archive identity" },
      { label: "Content hash" }, { label: "Ownership and visibility" },
    ],
    boundary: "The Archive establishes what FrameWire collected; it does not independently determine whether the material is true.",
    visual: "archive",
  },
  {
    id: "cleaning-eligibility",
    number: "04",
    name: "Cleaning and Evidence Eligibility",
    navigationName: "Cleaning & Eligibility",
    subtitle: "Collected material is prepared without losing its origin",
    description: "FrameWire removes technical noise, normalizes metadata, detects duplicates, evaluates body completeness, identifies language, and performs bounded extraction or OCR where necessary.",
    howItWorks: "Safety, ownership, quarantine, evidence-span, and eligibility checks determine whether material can enter analytical processing. The original Archive record remains unchanged while cleaned and enriched representations are stored as derived material.",
    technicalFlow: ["Archive Record", "Cleaning", "Normalization", "Eligibility Decision", "Qualified Evidence"],
    capabilities: [
      { code: "CDN", label: "Cleaning, Deduplication & Normalization" }, { code: "QEG", label: "Quarantine & Evidence Eligibility Gate" },
      { code: "OCR", label: "OCR & Document Intelligence" }, { code: "CEN", label: "Content Enrichment" },
      { code: "MLR", label: "Multilingual Runtime" }, { code: "ELC", label: "Evidence lineage" },
    ],
    boundary: "Insufficient, unsupported, or quarantined content remains visibly excluded instead of being forced into a score.",
    visual: "eligibility",
  },
  {
    id: "discover",
    number: "05",
    name: "Discover / Raw Ecosystem Search",
    navigationName: "Discover",
    subtitle: "Explore the wider information environment before narrowing the question",
    description: "Discover searches FrameWire’s existing evidence, Archive holdings, prior context, active providers, entities, watchlists, and approved OSINT sources.",
    howItWorks: "It presents a broad Raw Ecosystem View containing evidence, sources, timelines, entities, geographic signals, activity, and preliminary analytical patterns. Provider coverage and missing information appear alongside the results.",
    technicalFlow: ["User Question", "Unified Query Protocol", "Raw Intelligence Event", "Ecosystem View"],
    capabilities: [
      { code: "DS", label: "Discover / Raw Ecosystem Search" }, { code: "UQP", label: "Unified Query Protocol" },
      { code: "SIO", label: "Shared Intelligence Orchestrator" }, { code: "IEV", label: "Intelligence Events" },
      { code: "CP", label: "Custom Presets" }, { code: "SIM", label: "Prior contextual memory" },
    ],
    boundary: "Discover helps the user understand what exists; it does not present the search universe as a completed investigation.",
    visual: "discover",
  },
  {
    id: "decide-to-investigate",
    number: "06",
    name: "Human Decision to Investigate",
    navigationName: "Decide to Investigate",
    subtitle: "The user decides when discovery becomes an investigation",
    description: "FrameWire does not automatically turn every search into a formal case or final conclusion.",
    howItWorks: "After reviewing the Raw Ecosystem View, the user may continue exploring, refine the query, select relevant material, or start an investigation. Human intent determines the subject, question, scope, and evidence that deserve deeper examination.",
    technicalFlow: ["Raw Ecosystem View", "Human Review", "Select Evidence", "Start Investigation"],
    capabilities: [
      { code: "IBR", label: "Investigation Birth" }, { code: "ESM", label: "Evidence Selection & Scope Manager" },
      { label: "Continue exploring" }, { label: "Refine the question" },
      { label: "Select relevant material" }, { label: "Start investigation" },
    ],
    boundary: "The transition from broad discovery to scoped analytical work requires an explicit human decision.",
    visual: "decision",
  },
  {
    id: "scoped-evidence",
    number: "07",
    name: "Investigation-Scoped Evidence",
    navigationName: "Scoped Evidence",
    subtitle: "Deep analysis operates only on the evidence selected for the case",
    description: "An investigation creates a bounded workspace containing selected evidence, a timeline, entities, sources, questions, findings, and human notes.",
    howItWorks: "Analytical systems read only evidence linked to that investigation rather than the entire information ecosystem. Additional material may be added later, but it must pass through the same governed evidence path.",
    technicalFlow: ["Selected Evidence IDs", "Investigation Workspace", "Timeline and Evidence Set", "Scoped Analysis"],
    capabilities: [
      { code: "IWS", label: "Investigation Workspace" }, { code: "ITL", label: "Investigation Timeline" },
      { code: "ESM", label: "Evidence Selection & Scope Manager" }, { code: "FNM", label: "Findings & Human Notes" },
      { label: "Owner-scoped evidence" }, { label: "Case questions and entities" },
    ],
    boundary: "Broad ecosystem data must not leak into the case unless the user intentionally adds it through governed evidence selection.",
    visual: "scope",
  },
  {
    id: "intelligence-lenses",
    number: "08",
    name: "Independent Intelligence Lenses",
    navigationName: "Intelligence Lenses",
    subtitle: "The same evidence is examined from different analytical perspectives",
    description: "FrameWire’s ten intelligence lenses independently analyze Narrative, Sentiment, Emotion, Threat, Fact-checking, Geography, Politico context, Authors, Portals and Sources, and Entities and Relationships.",
    howItWorks: "Each lens answers a different question and produces its own evidence-backed observations. Lenses may share canonical evidence and identities, but one lens cannot overwrite or silently determine another lens’s result.",
    technicalFlow: ["Investigation Evidence", "Independent Lens Processing", "Lens Observations"],
    capabilities: [
      { code: "NA", label: "Narrative" }, { code: "SE", label: "Sentiment" }, { code: "EM", label: "Emotion" },
      { code: "TH", label: "Threat" }, { code: "FC", label: "Fact-check & Verification" }, { code: "GE", label: "Geography" },
      { code: "PI", label: "Politico" }, { code: "AU", label: "Author" }, { code: "PS", label: "Portal & Source" },
      { code: "ER", label: "Entity & Relationship" },
    ],
    boundary: "Missing evidence, disagreement, ambiguity, and insufficient coverage remain visible within every lens. Lens observations remain machine-calculated until human review.",
    visual: "lenses",
  },
  {
    id: "cross-lens-context",
    number: "09",
    name: "Cross-Lens Context and Analytics",
    navigationName: "Cross-Lens Context",
    subtitle: "Independent observations are connected without collapsing their meanings",
    description: "FrameWire connects related lens observations through shared evidence, entities, time, sources, narratives, and canonical geographic identities.",
    howItWorks: "Cross-lens analytics can calculate descriptive trends, distributions, missing-data patterns, correlation candidates, and anomaly candidates over governed datasets. Relationships show where dimensions reinforce, contradict, or qualify one another.",
    technicalFlow: ["Lens Observations", "Governed Relationships", "Bounded Analytics", "Reviewable Context"],
    capabilities: [
      { code: "CLS", label: "Cross-Lens Synchronization" }, { code: "RGP", label: "Relationship Graph Projection" },
      { code: "DA", label: "Data Analytics & Calculation" }, { code: "CCE", label: "Country Context Engine" },
      { label: "Missing-data patterns" }, { label: "Reproducible method logs" },
    ],
    boundary: "Statistical association remains separate from causation, threat, verification, or human conclusion. Graph relationships remain derived and rebuildable.",
    visual: "cross-lens",
  },
  {
    id: "guided-reasoning",
    number: "10",
    name: "Guided Human Reasoning",
    navigationName: "Guided Reasoning",
    subtitle: "FrameWire helps the investigator examine evidence without deciding for them",
    description: "Guided Human Reasoning organizes the investigation around supported observations, competing interpretations, contradictions, evidence gaps, assumptions, and unresolved questions.",
    howItWorks: "It helps users compare lenses, inspect sources, challenge early interpretations, and identify what requires additional evidence. EMAX continuity keeps active investigation context available across evidence, lenses, entities, and reports.",
    technicalFlow: ["Evidence and Lens Context", "Guided Review", "Human Notes and Findings", "Report Handoff"],
    capabilities: [
      { code: "GCR", label: "Contextual Guided Cognition" }, { code: "EMX", label: "EMAX Investigation Continuity" },
      { code: "FNM", label: "Findings & Human Notes" }, { code: "SIX", label: "Source Inspector" },
      { label: "Contradiction register" }, { label: "Evidence-gap review" },
    ],
    boundary: "The system guides the reasoning process while leaving judgment, correction, and conclusion with the human investigator.",
    visual: "reasoning",
  },
  {
    id: "governed-report",
    number: "11",
    name: "Governed Report",
    navigationName: "Governed Report",
    subtitle: "Evidence and reviewed observations are assembled into a transparent report",
    description: "The Report System brings selected evidence, lens observations, verification findings, analytics artifacts, human notes, assumptions, and limitations into one governed workspace.",
    howItWorks: "Every material finding remains traceable through the lens observation and evidence span to the archived source. Supporting and contradicting evidence can appear together rather than being forced into artificial agreement.",
    technicalFlow: ["Investigation Findings", "Evidence-Linked Report Sections", "Reviewable Draft"],
    capabilities: [
      { code: "RP", label: "Report & Intelligence Synthesis" }, { code: "SIX", label: "Source inspection" },
      { label: "Evidence-linked findings" }, { label: "Contradictions" },
      { label: "Assumptions and limitations" }, { label: "Review notes" },
    ],
    boundary: "The report remains a draft analytical artifact until a human reviewer approves its content.",
    visual: "report",
  },
  {
    id: "human-finalization",
    number: "12",
    name: "Human Finalization",
    navigationName: "Human Finalization",
    subtitle: "The investigator—not the system—owns the conclusion",
    description: "Human finalization determines which findings are included, corrected, qualified, excluded, or left unresolved.",
    howItWorks: "The reviewer confirms the evidence, methodology, limitations, wording, and confidence appropriate to the report. Finalization creates an attributable, point-in-time record of what the investigator concluded from the available evidence.",
    technicalFlow: ["Draft Report", "Human Review", "Approval and Attribution", "Immutable Report Snapshot"],
    capabilities: [
      { label: "Include" }, { label: "Correct" }, { label: "Qualify" },
      { label: "Exclude" }, { label: "Leave unresolved" }, { code: "REX", label: "Report Export & Distribution" },
    ],
    boundary: "Later changes in live data, memory, geographic labels, or analytical outputs must not silently rewrite the finalized report.",
    visual: "finalization",
  },
  {
    id: "tracking-memory",
    number: "13",
    name: "Tracking, Continuity and Institutional Memory",
    navigationName: "Tracking & Memory",
    subtitle: "Intelligence work continues after the report is complete",
    description: "FrameWire can continue observing selected topics, entities, narratives, sources, locations, investigations, and evidence conditions through tracked items, presets, watchlists, and alerts.",
    howItWorks: "EMAX preserves investigation continuity, while Shared Intelligence Memory records dated recurrence and prior context for future work. Meaningful changes can return the user to Discover, reopen an investigation, or support a new report without erasing historical conclusions.",
    technicalFlow: ["Tracked Subject", "Repeated Observation", "Meaningful Change", "Alert or Investigation Continuation"],
    capabilities: [
      { code: "TRK", label: "Tracked Items" }, { code: "WLS", label: "Watchlists" },
      { code: "ALA", label: "Alert Rules & Alerts" }, { code: "WCM", label: "Watchlist Memory & Change Detection" },
      { code: "SIM", label: "Shared Intelligence Memory" }, { code: "EMX", label: "Investigation continuity" },
    ],
    boundary: "Institutional memory remains dated, time-bounded context—not automatic present truth. An alert is an operational notice, not an intelligence conclusion.",
    visual: "memory",
  },
];

export const platformDoctrine = [
  "Archive First",
  "Evidence Before Conclusion",
  "Independent Lenses",
  "Missing Is Not Neutral",
  "AI Assists",
  "Humans Decide",
  "Understand Before Concluding",
] as const;
