export const resourceGroups = ["learn", "use", "trust", "build"] as const;

export type ResourceGroup = (typeof resourceGroups)[number];
export type ResourceVisualType =
  | "getting-started"
  | "platform-guide"
  | "lens-library"
  | "evidence-methodology"
  | "workflow-guides"
  | "use-case-guides"
  | "governance-trust"
  | "glossary"
  | "templates"
  | "research"
  | "release-notes"
  | "capability-status"
  | "developer-docs"
  | "help-support";

export type ResourceRoute = {
  label: string;
  href: string;
};

export type ResourceDefinition = {
  id: string;
  name: string;
  shortName: string;
  group: ResourceGroup;
  subtitle: string;
  purpose: string;
  contentType: string;
  relatedArea: string;
  primaryContent: string[];
  technicalFlow: string[];
  relatedRoutes?: ResourceRoute[];
  limitation: string;
  visualType: ResourceVisualType;
  keywords: string[];
};

export const resourceGroupMeta: Record<ResourceGroup, { label: string; description: string }> = {
  learn: { label: "Learn FrameWire", description: "Platform concepts, analytical language, and research method." },
  use: { label: "Use FrameWire", description: "Practical guides, repeatable structures, and responsible assistance." },
  trust: { label: "Trust FrameWire", description: "Evidence standards, governance, capability truth, and verified change." },
  build: { label: "Build with FrameWire", description: "Bounded documentation for approved external integration." },
};

export const resourceDefinitions: ResourceDefinition[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    shortName: "Getting Started",
    group: "learn",
    subtitle: "Understand the FrameWire investigation model",
    purpose: "A practical orientation for first-time users: what FrameWire is, how evidence moves, and where human authority begins.",
    contentType: "Orientation guide",
    relatedArea: "Whole platform",
    primaryContent: ["What FrameWire Is", "Platform Journey", "First Investigation", "Evidence Inspection", "Lens Basics", "Report Basics"],
    technicalFlow: ["New User", "Platform Orientation", "Guided First Workflow", "Evidence and Lens Review", "Human Understanding"],
    limitation: "Getting Started teaches the platform without presenting implementation detail or planned capability as operational.",
    visualType: "getting-started",
    keywords: ["orientation", "first investigation", "search", "evidence", "lens", "report", "human decision"],
  },
  {
    id: "platform-guide",
    name: "Platform Guide",
    shortName: "Platform Guide",
    group: "learn",
    subtitle: "Explore the complete FrameWire operating environment",
    purpose: "A structured guide to how acquisition, Archive, discovery, investigation, lenses, reasoning, reporting, and continuity connect.",
    contentType: "System guide",
    relatedArea: "Platform",
    primaryContent: ["Platform Journey", "Evidence Systems", "Discovery", "Investigation", "Lenses", "Analytics", "Reports", "Tracking", "BYOK", "Governance"],
    technicalFlow: ["Platform Overview", "Domain Guide", "System Detail", "Workflow and Authority Links", "Capability Status"],
    relatedRoutes: [{ label: "Explore Platform", href: "/platform#public-information" }],
    limitation: "This guide documents the Platform; it does not duplicate the complete Platform page. Capability maturity remains distinct from interface visibility.",
    visualType: "platform-guide",
    keywords: ["acquisition", "archive", "discover", "investigation", "analytics", "reporting", "tracking", "BYOK"],
  },
  {
    id: "lens-library",
    name: "Intelligence Lens Library",
    shortName: "Lens Library",
    group: "learn",
    subtitle: "Learn what each analytical lens examines and what it cannot conclude",
    purpose: "A reference index for the question, evidence, output, authority boundary, and related workflow of every principal lens.",
    contentType: "Analytical reference",
    relatedArea: "Intelligence Lenses",
    primaryContent: ["Lens Purpose", "Inputs", "Processing Model", "Outputs", "Cross-Lens Links", "Limitations"],
    technicalFlow: ["Lens Selection", "Method Explanation", "Evidence and Output Model", "Authority Boundary", "Related Workflows"],
    relatedRoutes: [{ label: "Open Lenses", href: "/lenses#narrative" }],
    limitation: "Lens documentation explains evidence-backed analytical observations. It does not convert them into human findings.",
    visualType: "lens-library",
    keywords: ["narrative", "sentiment", "emotion", "threat", "fact-check", "geography", "politico", "author", "portal", "entity"],
  },
  {
    id: "evidence-methodology",
    name: "Evidence & Methodology",
    shortName: "Evidence & Methodology",
    group: "trust",
    subtitle: "See how FrameWire preserves analytical integrity",
    purpose: "A public methodology reference for Archive standards, eligibility, provenance, contradiction, missing data, and report traceability.",
    contentType: "Methodology reference",
    relatedArea: "Evidence",
    primaryContent: ["Archive Standard", "Evidence Eligibility", "Provenance", "Source Independence", "Contradiction", "Missing Data", "Report Traceability"],
    technicalFlow: ["Method Question", "Canonical Standard", "Evidence Example", "Limitation Disclosure", "Related Governance Rule"],
    relatedRoutes: [{ label: "See Evidence Model", href: "/evidence#public-source-material" }],
    limitation: "Public methodology makes FrameWire inspectable without exposing private evidence, credentials, sensitive infrastructure, or protected audit data.",
    visualType: "evidence-methodology",
    keywords: ["archive", "provenance", "lineage", "evidence span", "source independence", "contradiction", "confidence", "insufficiency"],
  },
  {
    id: "workflow-guides",
    name: "Workflow Guides",
    shortName: "Workflow Guides",
    group: "use",
    subtitle: "Follow practical steps for completing common FrameWire tasks",
    purpose: "Task-oriented guidance that separates user actions, system actions, reviewable outputs, failure states, and the next human decision.",
    contentType: "Task guides",
    relatedArea: "Workflows",
    primaryContent: ["Discover", "Source Inspection", "Investigation Birth", "Evidence Selection", "Timeline Review", "Independent Lens Analysis", "Guided Cognition", "Report Studio", "Tracking", "Watchlists", "BYOK", "Governed Exports"],
    technicalFlow: ["User Goal", "Prerequisite Check", "Guided Actions", "Reviewable Result", "Human Next Decision"],
    relatedRoutes: [{ label: "Explore Workflows", href: "/workflows#discover" }],
    limitation: "A guide must not promise a workflow that is not connected to runtime; limited and experimental states remain visible.",
    visualType: "workflow-guides",
    keywords: ["discover", "source inspector", "investigation", "timeline", "guided cognition", "report studio", "watchlist", "export"],
  },
  {
    id: "use-case-guides",
    name: "Use-Case Guides",
    shortName: "Use-Case Guides",
    group: "use",
    subtitle: "See how different teams apply FrameWire to real public-information problems",
    purpose: "Mission-focused guidance connecting a real-world question to evidence, a recommended workflow, relevant lenses, and a governed human output.",
    contentType: "Practical guides",
    relatedArea: "Use Cases",
    primaryContent: ["User Mission", "Evidence Needed", "Recommended Workflow", "Relevant Lenses", "Governed Output", "Limitations"],
    technicalFlow: ["Real-World Question", "Evidence and Workflow Selection", "Lens Combination", "Human-Reviewed Output"],
    relatedRoutes: [{ label: "View Use Cases", href: "/use-cases#breaking-event" }],
    limitation: "Use-case guidance never implies electoral prediction, audience manipulation, automatic legal judgment, attack forecasting, or private intelligence access.",
    visualType: "use-case-guides",
    keywords: ["breaking event", "narrative", "verification", "policy", "civic", "threat", "regional", "diplomatic", "media", "research"],
  },
  {
    id: "governance-trust",
    name: "Governance & Trust Center",
    shortName: "Governance & Trust",
    group: "trust",
    subtitle: "Understand how FrameWire remains controlled and accountable",
    purpose: "A public trust view describing meaningful safeguards, why they matter, and where responsibility and limitation remain.",
    contentType: "Trust center",
    relatedArea: "Governance",
    primaryContent: ["Access Control", "Evidence Governance", "BYOK", "Provider Control", "Auditability", "Human Authority", "Responsible Use"],
    technicalFlow: ["Trust Question", "Governance Standard", "Enforcement Description", "Limitation and Responsibility Disclosure"],
    relatedRoutes: [{ label: "View Governance", href: "/governance#role-access" }],
    limitation: "Trust documentation explains protections without exposing credentials, private audit records, sensitive topology, exploitable configuration, or security-sensitive defects.",
    visualType: "governance-trust",
    keywords: ["access", "RBAC", "evidence governance", "BYOK", "providers", "audit", "human authority", "responsible use"],
  },
  {
    id: "glossary",
    name: "Canonical Glossary",
    shortName: "Canonical Glossary",
    group: "learn",
    subtitle: "Use one stable language across the entire platform",
    purpose: "An interactive public definition system for Platform, Evidence, Lens, Workflow, Governance, and Technical terms.",
    contentType: "Reference glossary",
    relatedArea: "Whole platform",
    primaryContent: ["Platform Terms", "Evidence Terms", "Lens Terms", "Workflow Terms", "Governance Terms", "Technical Terms"],
    technicalFlow: ["Choose Category", "Find Term", "Read Public Definition", "Inspect Related Terms", "Follow Stricter Authority"],
    limitation: "Where a technical contract carries a stricter definition, public documentation points toward that authority rather than silently redefining it.",
    visualType: "glossary",
    keywords: ["archive", "evidence", "eligibility", "provenance", "lineage", "observation", "finding", "narrative family", "EMAX", "BYOK"],
  },
  {
    id: "templates",
    name: "Templates & Downloads",
    shortName: "Templates & Downloads",
    group: "use",
    subtitle: "Apply FrameWire methods consistently outside the interface",
    purpose: "Professional structures for planning investigations, reviewing evidence, verifying claims, disclosing method, and reviewing reports.",
    contentType: "Document structures",
    relatedArea: "Methods and reporting",
    primaryContent: ["Investigation Planning Template", "Evidence Review Checklist", "Source Independence Checklist", "Claim Verification Worksheet", "Narrative Comparison Worksheet", "Methodology Disclosure Template", "Limitation Statement Template", "Watchlist Plan", "Report Review Checklist"],
    technicalFlow: ["User Task", "Select Template Structure", "Complete Structured Fields", "Human Review", "Optional Governed Platform Use"],
    limitation: "These are structure previews, not downloadable files. Completing an external template does not create canonical FrameWire evidence, observations, findings, or a finalized report.",
    visualType: "templates",
    keywords: ["template", "worksheet", "checklist", "claim verification", "source independence", "methodology", "report review"],
  },
  {
    id: "research-insights",
    name: "Research & Insights",
    shortName: "Research & Insights",
    group: "learn",
    subtitle: "Publish evidence-backed learning without exposing private investigations",
    purpose: "A publication framework for method explainers, authorized public case studies, research notes, analytical lessons, and responsible AI commentary.",
    contentType: "Research framework",
    relatedArea: "Public knowledge",
    primaryContent: ["Method Explainers", "Public Case Studies", "Research Notes", "Analytical Lessons", "Responsible AI Commentary"],
    technicalFlow: ["Research Question", "Authorized Public Evidence", "Disclosed Method", "Human-Reviewed Insight", "Published Resource"],
    limitation: "No studies, customers, authors, findings, or publication dates are fabricated. Public research must disclose evidence scope, method, limitations, and human review.",
    visualType: "research",
    keywords: ["method", "case study", "research note", "narrative", "evidence quality", "sources", "multilingual", "geography", "responsible AI"],
  },
  {
    id: "product-updates",
    name: "Product Updates & Release Notes",
    shortName: "Product Updates",
    group: "trust",
    subtitle: "Show what changed, what improved, and what remains limited",
    purpose: "A release-note publication model that distinguishes verified product change, maturity classification, user impact, and known limitation.",
    contentType: "Change record model",
    relatedArea: "Product maturity",
    primaryContent: ["Release Date", "Affected Capability", "Change Type", "User Impact", "Behavior or Migration Change", "Known Limitation", "Related Documentation"],
    technicalFlow: ["Verified Product Change", "Maturity Classification", "Public Release Note", "Related Guide and Status Update"],
    limitation: "This design shows release-note structure, not fabricated release history. A new page does not prove the underlying capability is operational.",
    visualType: "release-notes",
    keywords: ["release", "update", "change", "improvement", "fix", "limitation", "deprecation", "documentation"],
  },
  {
    id: "capability-status",
    name: "Capability Status",
    shortName: "Capability Status",
    group: "trust",
    subtitle: "See which FrameWire functions are operational, limited, experimental, or planned",
    purpose: "A public maturity-registry model explaining the vocabulary, evidence requirement, availability, dependencies, and limitations behind a status label.",
    contentType: "Maturity registry",
    relatedArea: "Product truth",
    primaryContent: ["Operational", "Limited Availability", "Experimental", "Under Development", "Planned", "Retired"],
    technicalFlow: ["Capability Registry", "Verified Runtime and Product State", "Public Maturity Label", "User Guidance"],
    limitation: "This is not a real-time infrastructure status page. No capability receives a public maturity label here unless current runtime and product truth are verified.",
    visualType: "capability-status",
    keywords: ["maturity", "operational", "limited", "experimental", "development", "planned", "retired", "availability", "runtime"],
  },
  {
    id: "developer-docs",
    name: "Developer & Integration Documentation",
    shortName: "Developer Documentation",
    group: "build",
    subtitle: "Connect approved external systems without weakening governance",
    purpose: "A bounded documentation map for approved integration concepts, authorization, schemas, exports, errors, and canonical authority rules.",
    contentType: "Integration documentation map",
    relatedArea: "Approved integrations",
    primaryContent: ["API Overview", "Authentication", "Permissions", "Scopes", "Request and Response Schemas", "Evidence Identifiers", "Pagination", "Rate Limits", "Error States", "Webhook Events", "Export Manifests", "Canonical Data Boundaries", "Governance Rules"],
    technicalFlow: ["Developer Identity", "Authorized Scope", "API or Integration Request", "Governed Response", "External Use"],
    limitation: "Public developer access is not asserted. No endpoints, payloads, rate limits, or authentication schemes are shown without verified public documentation.",
    visualType: "developer-docs",
    keywords: ["API", "integration", "authentication", "scope", "schema", "webhook", "export", "error", "governance"],
  },
  {
    id: "help-support",
    name: "Help, Support & Responsible Disclosure",
    shortName: "Help & Support",
    group: "use",
    subtitle: "Find assistance when a workflow, provider, or result is unclear",
    purpose: "A safe routing model for guided help, normal failure states, beta access, and responsible security disclosure.",
    contentType: "Support guidance",
    relatedArea: "User assistance",
    primaryContent: ["Account Access", "Evidence Intake", "BYOK", "Provider Availability", "Investigations", "Lens Outputs", "Reports", "Exports", "Quotas", "Common Failure States"],
    technicalFlow: ["User Problem", "Guided Help Search", "Troubleshooting or Support Route", "Attributable Resolution"],
    limitation: "No ticket system, support address, or disclosure endpoint is presented without a verified public route. Never send passwords, provider keys, tokens, private evidence, or sensitive personal information through insecure channels.",
    visualType: "help-support",
    keywords: ["help", "support", "troubleshooting", "account", "provider", "insufficient evidence", "failed extraction", "stale data", "responsible disclosure"],
  },
];

export type ResourceId = (typeof resourceDefinitions)[number]["id"];
export const resourceIds = resourceDefinitions.map((resource) => resource.id);

export function resourceFromHash(hash = window.location.hash.slice(1)): ResourceDefinition {
  return resourceDefinitions.find((resource) => resource.id === hash) ?? resourceDefinitions[0];
}
