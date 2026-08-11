import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Code2,
  Compass,
  Database,
  FileText,
  Fingerprint,
  KeyRound,
  Library,
  LifeBuoy,
  LockKeyhole,
  Network,
  Search,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  Workflow,
} from "lucide-react";
import type { ResourceDefinition } from "./resourceData";

const orientationSteps = [
  ["What FrameWire Is", "Public information becomes preserved, inspectable evidence."],
  ["Platform Journey", "Follow information from acquisition to human-finalized report."],
  ["Discover vs Investigation", "Explore broadly, then define a bounded question."],
  ["Inspect Evidence", "Review source, Archive identity, provenance, and eligibility."],
  ["Open Lens Observations", "Compare independent analytical perspectives."],
  ["Record Human Findings", "Qualify what the evidence responsibly supports."],
  ["Understand Finalization", "Keep conclusions attributable and fixed in time."],
];

const platformStages = ["Acquisition", "Archive", "Discover", "Investigation", "Lenses", "Analytics", "Reasoning", "Reports", "Tracking"];
const platformCategories = ["Surfaces", "Workflows", "Engines", "Substrates", "Governance", "Outputs", "Infrastructure"];

const lenses = [
  ["NA", "Narrative", "Claims, frames, and continuity"],
  ["SE", "Sentiment", "Expressed stance and target"],
  ["EM", "Emotion", "Emotional language in context"],
  ["TH", "Threat", "Bounded escalation observations"],
  ["FC", "Fact-check & Verification", "Support, contradiction, insufficiency"],
  ["GE", "Geography", "Meaningful location relationships"],
  ["PI", "Politico", "Political context without forecasting"],
  ["AU", "Author", "Authorship and carrier participation"],
  ["PS", "Portal & Source", "Source families and publication behavior"],
  ["ER", "Entity & Relationship", "Only supported connections"],
];

const guideNames = ["Discover", "Source Inspection", "Investigation Birth", "Evidence Selection", "Timeline Review", "Independent Lens Analysis", "Guided Cognition", "Report Studio", "Tracking", "Watchlists", "BYOK", "Governed Exports"];
const useCaseNames = ["Breaking Event", "Narrative Contestation", "Claim Verification", "Policy Analysis", "Civic Monitoring", "Threat Convergence", "Regional Comparison", "Diplomatic Research", "Media Ecosystem", "Longitudinal Research", "Report Production"];

type GlossaryTerm = {
  term: string;
  category: "Platform" | "Evidence" | "Lens" | "Workflow" | "Governance" | "Technical";
  definition: string;
  related: string[];
  note: string;
};

const glossaryTerms: GlossaryTerm[] = [
  { term: "Archive", category: "Evidence", definition: "The preserved record of material FrameWire collected before analytical use.", related: ["Evidence", "Provenance", "Lineage"], note: "Preservation records collection; it does not independently establish truth." },
  { term: "Evidence", category: "Evidence", definition: "Source material admitted into a bounded analytical or investigative context with traceable origin.", related: ["Archive", "Evidence Eligibility", "Evidence Span"], note: "Evidence remains inspectable and scoped." },
  { term: "Evidence Eligibility", category: "Evidence", definition: "A governed decision about whether preserved material may enter a specific analytical process.", related: ["Evidence", "Investigation", "Provenance"], note: "Ineligible material is not forced into an output." },
  { term: "Evidence Span", category: "Evidence", definition: "The exact part of a source that supports, contradicts, or qualifies an observation or finding.", related: ["Evidence", "Observation", "Finding"], note: "A span keeps analytical claims inspectable." },
  { term: "Provenance", category: "Evidence", definition: "The recorded origin, retrieval context, provider, time, and transformation history of collected material.", related: ["Archive", "Lineage", "Source Family"], note: "Provenance is not a universal credibility score." },
  { term: "Lineage", category: "Evidence", definition: "The traceable sequence linking derived material and analytical outputs back to the preserved source.", related: ["Provenance", "Observation", "Report Snapshot"], note: "Canonical evidence is not rewritten by downstream analysis." },
  { term: "Investigation", category: "Workflow", definition: "A bounded workspace defined by a human question, selected evidence, scope, and accountable review.", related: ["Evidence", "Finding", "Report Snapshot"], note: "Search does not automatically become an investigation." },
  { term: "Lens", category: "Lens", definition: "An independent analytical system that examines scoped evidence from one defined perspective.", related: ["Observation", "Evidence", "Finding"], note: "One lens cannot silently overwrite another." },
  { term: "Observation", category: "Lens", definition: "An evidence-backed analytical output produced by a lens or governed analytical system.", related: ["Lens", "Evidence", "Finding", "Report Snapshot"], note: "Not the same as a human finding." },
  { term: "Finding", category: "Workflow", definition: "An attributable human judgment recorded after reviewing evidence, observations, contradiction, and limitation.", related: ["Observation", "Investigation", "Report Snapshot"], note: "AI assistance does not own the finding." },
  { term: "Narrative Position", category: "Lens", definition: "A bounded analytical representation of how a claim or frame appears within evidence and context.", related: ["Claim Family", "Narrative Family", "Observation"], note: "Position is descriptive, not proof of intent." },
  { term: "Claim Family", category: "Lens", definition: "A governed grouping of related carried claims whose relationship remains evidence-backed.", related: ["Narrative Family", "Source Family", "Narrative Position"], note: "Similarity alone does not prove coordination." },
  { term: "Narrative Family", category: "Lens", definition: "A continuity structure for related narrative observations across evidence, time, and context.", related: ["Claim Family", "Narrative Position", "Source Family"], note: "Historical continuity does not automatically become current fact." },
  { term: "Source Family", category: "Evidence", definition: "A documented relationship among original, republished, syndicated, or operationally related sources.", related: ["Provenance", "Canonical Identity", "Claim Family"], note: "Wording similarity does not by itself prove coordination." },
  { term: "Canonical Identity", category: "Technical", definition: "A stable governed identity used to connect the same supported object across systems.", related: ["Lineage", "Source Family", "Investigation"], note: "Identity links require support and scope." },
  { term: "Guided Cognition", category: "Workflow", definition: "A human-led reasoning workflow for comparing evidence, interpretations, gaps, and unresolved questions.", related: ["Investigation", "Observation", "Finding"], note: "It guides review; it does not decide." },
  { term: "EMAX", category: "Platform", definition: "A continuity layer that keeps the active investigation context available across relevant work surfaces.", related: ["Investigation", "Guided Cognition", "Watchlist"], note: "Continuity must not alter evidence or authority." },
  { term: "Watchlist", category: "Workflow", definition: "A governed structure for continuing to observe selected topics, entities, sources, locations, or conditions.", related: ["Investigation", "EMAX", "Verification State"], note: "Tracking interest does not verify an item." },
  { term: "Report Snapshot", category: "Governance", definition: "An attributable point-in-time record of a human-finalized report and its evidence-linked context.", related: ["Finding", "Evidence Span", "Verification State"], note: "Later data must not silently rewrite it." },
  { term: "Verification State", category: "Governance", definition: "A visible state describing whether available evidence supports, contradicts, leaves unresolved, or is insufficient for a claim.", related: ["Evidence", "Observation", "Finding"], note: "Uncertainty is not silently forced into true or false." },
  { term: "BYOK", category: "Governance", definition: "Bring Your Own Key: governed use of approved external provider credentials under user permissions and limits.", related: ["Canonical Identity", "Verification State"], note: "Credentials remain secrets and must never appear in support requests." },
];

function VisualFrame({ resource, children }: { resource: ResourceDefinition; children: React.ReactNode }) {
  return (
    <section className={`r2-visual r2-visual-${resource.visualType}`} aria-label={`${resource.name} knowledge visual`}>
      <header className="r2-visual-head">
        <div><span>{resource.contentType}</span><h3>{resource.subtitle}</h3></div>
        <p>{resource.purpose}</p>
      </header>
      {children}
    </section>
  );
}

function GettingStartedVisual({ resource }: { resource: ResourceDefinition }) {
  const [active, setActive] = useState(0);
  return <VisualFrame resource={resource}><div className="r2-orientation"><ol>{orientationSteps.map(([title, detail], index) => <li key={title}><button type="button" className={active === index ? "active" : ""} aria-pressed={active === index} onClick={() => setActive(index)}><i>{index + 1}</i><span><strong>{title}</strong><small>{detail}</small></span><ArrowRight size={15} /></button></li>)}</ol><aside aria-live="polite"><span>ORIENTATION FOCUS</span><Compass size={30} /><h4>{orientationSteps[active][0]}</h4><p>{orientationSteps[active][1]}</p><dl><div><dt>Search</dt><dd>What exists?</dd></div><div><dt>Investigation</dt><dd>What does selected evidence mean?</dd></div><div><dt>Report</dt><dd>What did the human conclude?</dd></div></dl></aside></div><div className="r2-distinction-row"><span>SEARCH <b>≠</b> INVESTIGATION</span><span>OBSERVATION <b>≠</b> FINDING</span><span>AI ASSISTANCE <b>≠</b> HUMAN DECISION</span></div></VisualFrame>;
}

function PlatformGuideVisual({ resource }: { resource: ResourceDefinition }) {
  const [active, setActive] = useState(0);
  return <VisualFrame resource={resource}><div className="r2-platform-map"><div className="r2-platform-flow" role="list" aria-label="Connected operating environment">{platformStages.map((stage, index) => <button type="button" role="listitem" key={stage} aria-pressed={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>{stage}</span>{index < platformStages.length - 1 && <ArrowRight size={13} />}</button>)}</div><aside><span>DOCUMENTATION VIEW</span><h4>{platformStages[active]}</h4><p>Open the domain guide, inspect its authority boundary, then confirm current maturity before relying on the capability.</p><div>{["Providers", "Access", "Governance", "Cost", "Operations"].map((item) => <span key={item}>{item}</span>)}</div></aside></div><div className="r2-category-strip">{platformCategories.map((item) => <span key={item}>{item}</span>)}</div></VisualFrame>;
}

function LensLibraryVisual({ resource }: { resource: ResourceDefinition }) {
  const [active, setActive] = useState(0);
  return <VisualFrame resource={resource}><div className="r2-lens-index"><div role="list" aria-label="Principal lens documentation">{lenses.map(([code, name, detail], index) => <button type="button" role="listitem" key={code} aria-pressed={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)}><b>{code}</b><span><strong>{name}</strong><small>{detail}</small></span></button>)}</div><aside aria-live="polite"><span>DOCUMENTATION ANATOMY</span><h4>{lenses[active][1]}</h4>{["Question", "Evidence read", "Processing model", "Output", "Authority boundary", "Related workflow"].map((item) => <div key={item}><Check size={13} /><span>{item}</span></div>)}</aside></div><div className="r2-distinction-row"><span>NEGATIVE SENTIMENT <b>≠</b> THREAT</span><span>REPETITION <b>≠</b> VERIFICATION</span><span>GEOGRAPHIC VOLUME <b>≠</b> RISK</span></div></VisualFrame>;
}

function EvidenceVisual({ resource }: { resource: ResourceDefinition }) {
  const chain = ["Source Material", "Archive Standard", "Preparation", "Eligibility", "Investigation Evidence", "Lens Observation", "Verification", "Human Finding", "Report Citation"];
  const principles = ["Exact evidence spans", "Source independence", "Syndication awareness", "Contradiction", "Missing-data handling", "Confidence", "Insufficiency", "Investigation scope", "AI-assistance limits"];
  return <VisualFrame resource={resource}><div className="r2-method-map"><ol>{chain.map((item, index) => <li key={item}><span>{item}</span>{index < chain.length - 1 && <i />}</li>)}</ol><aside><span>METHODOLOGY PRINCIPLES</span>{principles.map((item) => <div key={item}><Fingerprint size={14} /><span>{item}</span></div>)}</aside></div></VisualFrame>;
}

function WorkflowGuidesVisual({ resource }: { resource: ResourceDefinition }) {
  const [active, setActive] = useState(0);
  return <VisualFrame resource={resource}><div className="r2-guide-index"><nav aria-label="Workflow guide index">{guideNames.map((name, index) => <button type="button" key={name} className={active === index ? "active" : ""} aria-pressed={active === index} onClick={() => setActive(index)}><Workflow size={15} /><span>{name}</span><ArrowRight size={14} /></button>)}</nav><aside aria-live="polite"><span>GUIDE STRUCTURE</span><h4>{guideNames[active]}</h4>{["Starting condition", "Required permissions", "User actions", "System actions", "Visible output", "Possible failure states", "Next human decision"].map((item) => <div key={item}><CheckCircle2 size={13} /><span>{item}</span></div>)}</aside></div></VisualFrame>;
}

function UseCaseGuidesVisual({ resource }: { resource: ResourceDefinition }) {
  const [active, setActive] = useState(0);
  return <VisualFrame resource={resource}><div className="r2-use-case-map"><div>{useCaseNames.map((name, index) => <button type="button" key={name} className={active === index ? "active" : ""} aria-pressed={active === index} onClick={() => setActive(index)}>{name}</button>)}</div><aside aria-live="polite"><span>PRACTICAL GUIDE</span><h4>{useCaseNames[active]}</h4><p>Real-world question</p><ArrowRight size={15} /><p>Evidence and workflow selection</p><ArrowRight size={15} /><p>Lens combination</p><ArrowRight size={15} /><p>Human-reviewed output</p></aside></div></VisualFrame>;
}

function GovernanceVisual({ resource }: { resource: ResourceDefinition }) {
  const groups = [
    ["Identity & Access", "Role and scope determine permitted actions.", LockKeyhole],
    ["Evidence & Scope", "Analysis stays bounded to governed evidence.", Archive],
    ["Providers & Credentials", "Keys and provider choices remain controlled.", KeyRound],
    ["Cost & Capability", "Availability and limits remain explicit.", SlidersHorizontal],
    ["Audit & Accountability", "Sensitive actions remain attributable.", ClipboardCheck],
    ["Human Authority", "People own findings and final reports.", Users],
  ] as const;
  return <VisualFrame resource={resource}><div className="r2-trust-grid">{groups.map(([title, detail, Icon]) => <article key={title}><Icon size={20} /><h4>{title}</h4><p>{detail}</p><span>RULE · LIMITATION · RELATED GUIDANCE</span></article>)}</div></VisualFrame>;
}

function GlossaryVisual({ resource }: { resource: ResourceDefinition }) {
  const categories = ["All", "Platform", "Evidence", "Lens", "Workflow", "Governance", "Technical"] as const;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const filtered = useMemo(() => glossaryTerms.filter((item) => (category === "All" || item.category === category) && `${item.term} ${item.definition} ${item.related.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const [selectedTerm, setSelectedTerm] = useState("Observation");
  const selected = glossaryTerms.find((item) => item.term === selectedTerm) ?? filtered[0] ?? glossaryTerms[0];
  return <VisualFrame resource={resource}><div className="r2-glossary-tools"><label htmlFor="r2-glossary-search">Search glossary</label><div><Search size={16} /><input id="r2-glossary-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a public term" /><button type="button" disabled={!query} onClick={() => setQuery("")}>Clear</button></div><nav aria-label="Glossary categories">{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</nav></div><div className="r2-glossary-layout"><div className="r2-term-list" role="list" aria-label={`${filtered.length} matching terms`}>{filtered.length ? filtered.map((item) => <button type="button" role="listitem" key={item.term} className={selected.term === item.term ? "active" : ""} aria-pressed={selected.term === item.term} onClick={() => setSelectedTerm(item.term)}><span>{item.term}</span><small>{item.category}</small></button>) : <p>No local glossary terms match this search.</p>}</div><article aria-live="polite"><span>{selected.category} TERM</span><h4>{selected.term}</h4><p>{selected.definition}</p><dl><div><dt>Related terms</dt><dd>{selected.related.join(" · ")}</dd></div><div><dt>Technical note</dt><dd>{selected.note}</dd></div></dl></article></div></VisualFrame>;
}

function TemplatesVisual({ resource }: { resource: ResourceDefinition }) {
  const [active, setActive] = useState(3);
  const templates = resource.primaryContent;
  const fields = ["Claim", "Claimant", "Supporting Evidence", "Contradicting Evidence", "Source Independence", "Unresolved Questions", "Human Review"];
  return <VisualFrame resource={resource}><div className="r2-template-layout"><nav aria-label="Template structures">{templates.map((name, index) => <button type="button" key={name} className={active === index ? "active" : ""} aria-pressed={active === index} onClick={() => setActive(index)}><FileText size={15} /><span>{name}</span><small>Structure preview</small></button>)}</nav><article aria-live="polite"><div><span>STRUCTURE PREVIEW</span><strong>{templates[active]}</strong></div>{fields.map((field) => <p key={field}><span>{field}</span><i /></p>)}<footer>No download is offered. This preview documents a possible structure only.</footer></article></div></VisualFrame>;
}

function ResearchVisual({ resource }: { resource: ResourceDefinition }) {
  const themes = ["Narrative Methods", "Evidence Quality", "Source Ecosystems", "Multilingual Processing", "Geographic Interpretation", "Governance", "Responsible AI-Assisted Investigation"];
  const anatomy = ["Research Question", "Evidence Scope", "Evidence Window", "Source Coverage", "Method", "Analytical Observations", "Human Interpretation", "Limitations", "Public Conclusion"];
  return <VisualFrame resource={resource}><div className="r2-research-layout"><aside><span>RESEARCH THEMES</span>{themes.map((theme) => <p key={theme}>{theme}</p>)}</aside><article><header><BookOpen size={22} /><div><span>PUBLICATION ANATOMY</span><h4>Evidence-backed research structure</h4></div></header><ol>{anatomy.map((item) => <li key={item}>{item}</li>)}</ol><footer>No studies, authors, dates, customers, or findings are invented in this design.</footer></article></div></VisualFrame>;
}

function ReleaseNotesVisual({ resource }: { resource: ResourceDefinition }) {
  const changeTypes = ["New Capability", "Improvement", "Fix", "Known Limitation", "Deprecation", "Documentation Change"];
  return <VisualFrame resource={resource}><div className="r2-release-layout"><article><span>RELEASE NOTE STRUCTURE</span>{resource.primaryContent.map((field) => <p key={field}><b>{field}</b><i /></p>)}<footer>Structure only · no fabricated release history</footer></article><aside><span>CHANGE CLASSIFICATION</span>{changeTypes.map((item) => <p key={item}>{item}</p>)}<div className="r2-release-distinction"><strong>Visible interface change</strong><b>≠</b><strong>Operational capability</strong></div><div className="r2-release-distinction"><strong>Architectural improvement</strong><b>≠</b><strong>Verified product release</strong></div></aside></div></VisualFrame>;
}

function CapabilityStatusVisual({ resource }: { resource: ResourceDefinition }) {
  const statuses = [
    ["Operational", "Verified for its documented public use."],
    ["Limited Availability", "Available only within stated access or coverage bounds."],
    ["Experimental", "Available for bounded evaluation; behavior may change."],
    ["Under Development", "Being completed; not represented as available."],
    ["Planned", "Intended work; not an operational function."],
    ["Retired", "No longer a current supported path."],
  ];
  const categories = ["Acquisition Routes", "Canonical Raw Archive", "Discover", "Investigations", "Intelligence Lenses", "Guided Cognition", "EMAX", "Reporting", "Tracking", "Exports", "BYOK", "API Access", "Supported Countries", "Supported Languages"];
  return <VisualFrame resource={resource}><div className="r2-status-legend" aria-label="Public maturity vocabulary">{statuses.map(([name, detail]) => <article key={name}><span>{name}</span><p>{detail}</p></article>)}</div><div className="r2-status-registry"><header><span>CAPABILITY CATEGORY</span><span>PUBLIC MATURITY</span><span>GUIDANCE</span></header>{categories.map((item) => <article key={item}><strong>{item}</strong><span><CircleHelp size={14} />Not asserted here</span><p>Confirm against a current verified public status statement before relying on availability.</p></article>)}</div><div className="r2-status-note"><AlertTriangle size={18} /><p>This registry preview explains the public maturity model. It is not a real-time infrastructure status page and does not publish unverified runtime claims.</p></div></VisualFrame>;
}

function DeveloperDocsVisual({ resource }: { resource: ResourceDefinition }) {
  const topics = [
    ["API Overview", Braces], ["Authentication", KeyRound], ["Scopes", SlidersHorizontal], ["Schemas", Code2], ["Webhooks", Network], ["Exports", Database], ["Errors", AlertTriangle], ["Governance Rules", ShieldCheck],
  ] as const;
  return <VisualFrame resource={resource}><div className="r2-developer-map"><div className="r2-developer-flow">{["Developer Identity", "Authorized Scope", "API / Integration Request", "Governed Response", "External Use"].map((item, index) => <span key={item}>{item}{index < 4 && <ArrowRight size={13} />}</span>)}</div><div className="r2-developer-topics">{topics.map(([name, Icon]) => <article key={name}><Icon size={18} /><strong>{name}</strong><small>Not currently public</small></article>)}</div><aside><LockKeyhole size={22} /><div><span>EXTERNAL AUTHORITY BOUNDARY</span><p>External systems receive bounded data. They cannot rewrite canonical evidence, change lens observations, create canonical findings, rewrite finalized reports, or broaden investigation scope.</p></div></aside></div></VisualFrame>;
}

function HelpSupportVisual({ resource }: { resource: ResourceDefinition }) {
  const failureStates = ["Insufficient Evidence", "Provider Unavailable", "Missing Lens Observation", "Failed Extraction", "Stale Data", "Restricted Access"];
  return <VisualFrame resource={resource}><div className="r2-help-layout"><section><span>GUIDED HELP ROUTING</span>{["Account Access", "Evidence Intake", "BYOK", "Provider Availability", "Investigations", "Lens Outputs", "Reports", "Exports", "Quotas"].map((item) => <article key={item}><LifeBuoy size={15} /><strong>{item}</strong><small>Guidance category</small></article>)}</section><section><span>NORMAL FAILURE STATES</span>{failureStates.map((item) => <article key={item}><CircleHelp size={15} /><strong>{item}</strong><small>Explain before escalating</small></article>)}</section></div><div className="r2-security-message"><ShieldAlert size={22} /><div><strong>Protect secrets and private evidence</strong><p>Never send passwords, provider API keys, tokens, private evidence, or sensitive personal information through insecure support channels.</p><small>No ticket form, support address, or disclosure endpoint is fabricated in this design.</small></div></div></VisualFrame>;
}

function GenericKnowledgeVisual({ resource }: { resource: ResourceDefinition }) {
  return <VisualFrame resource={resource}><div className="r2-generic-map"><Library size={32} /><div>{resource.primaryContent.map((item) => <span key={item}>{item}</span>)}</div></div></VisualFrame>;
}

export default function ResourceVisual({ resource }: { resource: ResourceDefinition }) {
  switch (resource.visualType) {
    case "getting-started": return <GettingStartedVisual resource={resource} />;
    case "platform-guide": return <PlatformGuideVisual resource={resource} />;
    case "lens-library": return <LensLibraryVisual resource={resource} />;
    case "evidence-methodology": return <EvidenceVisual resource={resource} />;
    case "workflow-guides": return <WorkflowGuidesVisual resource={resource} />;
    case "use-case-guides": return <UseCaseGuidesVisual resource={resource} />;
    case "governance-trust": return <GovernanceVisual resource={resource} />;
    case "glossary": return <GlossaryVisual resource={resource} />;
    case "templates": return <TemplatesVisual resource={resource} />;
    case "research": return <ResearchVisual resource={resource} />;
    case "release-notes": return <ReleaseNotesVisual resource={resource} />;
    case "capability-status": return <CapabilityStatusVisual resource={resource} />;
    case "developer-docs": return <DeveloperDocsVisual resource={resource} />;
    case "help-support": return <HelpSupportVisual resource={resource} />;
    default: return <GenericKnowledgeVisual resource={resource} />;
  }
}
