import type { LucideIcon } from "lucide-react";
import type { LensIconKind } from "./LensIcons";
import {
  Archive,
  BookOpen,
  Building2,
  CircleUserRound,
  Database,
  FileCheck2,
  Fingerprint,
  Flag,
  Globe2,
  HeartPulse,
  Network,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

export const illustrativeCase = {
  label: "Illustrative interface demonstration",
  title: "River corridor access dispute",
  subject: "A fictional public infrastructure notice described differently across public sources",
  question: "How are the access change, responsible actors and affected locations being described?",
  note: "This fictional case demonstrates product behavior. It is not a claim about a real event, person or organisation.",
};

export const systemMap = [
  { name: "Public information sources", detail: "News and RSS, websites, active search, approved public providers, official records, uploads and existing archive holdings.", icon: Globe2 },
  { name: "Governed ingestion", detail: "Query, provider and file intake move through bounded collection rules before analysis.", icon: ShieldCheck },
  { name: "Canonical Raw Archive", detail: "Untouched source material and provenance are preserved before downstream transformation.", icon: Archive },
  { name: "Search and Investigation", detail: "A human discovers material, scopes a question and selects evidence for a case.", icon: ScanSearch },
  { name: "Independent intelligence lenses", detail: "Each lens examines a bounded dimension without overwriting another lens.", icon: Fingerprint },
  { name: "Cross-lens understanding", detail: "Supported observations align through shared evidence, entities, time and geography.", icon: Network },
  { name: "Evidence-backed report", detail: "Selected findings retain exact evidence, contradictions, limitations and annotations.", icon: FileCheck2 },
  { name: "Human decision", detail: "The investigator decides what is included, qualified, corrected or excluded.", icon: CircleUserRound },
];

export const userStages = [
  {
    name: "Search",
    question: "What exists?",
    summary: "Discover archived evidence and bounded active-source candidates without treating retrieval as truth.",
    items: ["Governed query intake", "Archived evidence", "Active-source candidates", "Provider coverage", "Entities and events", "Watchlist connections", "Select evidence for investigation"],
    demo: "The fictional notice, three published interpretations, one official document and two public posts are grouped as candidates for review.",
  },
  {
    name: "Investigation",
    question: "What does it mean?",
    summary: "Scope evidence around a human question, compare independent observations and preserve uncertainty.",
    items: ["Investigation question", "Scoped evidence", "Timeline", "Entities", "Locations", "Lens outputs", "Findings and notes", "Contradictions", "Contextual continuity"],
    demo: "The investigator compares attributed claims about timing, responsibility and affected locations while recording what remains unresolved.",
  },
  {
    name: "Report",
    question: "What did the human conclude?",
    summary: "Assemble only reviewed findings into a defensible report with explicit evidence and limitations.",
    items: ["Selected findings", "Exact evidence", "Contradictions and limitations", "Human annotations", "Review state", "Evidence-backed final report"],
    demo: "The final demonstration report separates confirmed document language, disputed descriptions and unanswered questions.",
  },
];

export type ProductGroup = {
  name: string;
  verb: string;
  purpose: string;
  pages: string[];
  connection: string;
  action: string;
  output: string;
  next: string;
};

export const productGroups: ProductGroup[] = [
  {
    name: "LIVE",
    verb: "Observe",
    purpose: "See what public information exists and what is changing before deeper analysis.",
    pages: ["Live Timeline", "Discover", "Stories", "Entities"],
    connection: "Timeline surfaces change; Discover retrieves evidence; Stories groups related material; Entities identifies people, organisations, and locations.",
    action: "Select preserved evidence from Discover and begin an investigation.",
    output: "A reviewable evidence set with related stories and recognised entities.",
    next: "Selected evidence can move to independent analysis in ENGINES.",
  },
  {
    name: "ENGINES",
    verb: "Analyse",
    purpose: "Examine preserved evidence through independent analytical engines without allowing one output to overwrite another.",
    pages: ["Narrative", "Sentiment", "Emotion", "Threat › Threat", "Threat › District", "Threat › Alerts", "Fact-Check"],
    connection: "Narrative, sentiment, emotion, threat observations, district context, alerts, and fact-checking remain distinct and traceable to shared evidence.",
    action: "Compare a carried claim with tone, escalation observations, and supporting or contradicting evidence.",
    output: "Separate engine observations with uncertainty and exact evidence links intact.",
    next: "Observations gain source, political, and geographic context in CONTEXT.",
  },
  {
    name: "CONTEXT",
    verb: "Contextualise",
    purpose: "Understand who created or carried information, through which source, within what political environment, and where.",
    pages: ["Author", "Portal", "Politico", "Geographic"],
    connection: "Evidence is compared with authorship, outlet behaviour, political actors and conditions, and supported geographic references.",
    action: "Inspect whether competing frames differ by author, portal, language, or location.",
    output: "A contextual layer around engine observations, not an interchangeable score.",
    next: "Contextualised evidence becomes material for REPORTING & MEMORY.",
  },
  {
    name: "REPORTING & MEMORY",
    verb: "Investigate and preserve",
    purpose: "Turn selected evidence into an investigation, retain human reasoning, track important material, and produce a reviewable report.",
    pages: ["Reports", "Investigations", "Tracked Items", "Reasoning"],
    connection: "Investigations organise evidence, timelines, entities, findings, contradictions, and limitations before a human finalises a report.",
    action: "Track a disputed claim, qualify a finding, and add exact evidence to the report assembly.",
    output: "An evidence-backed report plus reviewed continuity for future investigations.",
    next: "The reviewed report and preserved memory can inform the next observation cycle in LIVE.",
  },
];

export const evidenceStates = [
  { name: "Captured", detail: "Public material enters with source and provider context." },
  { name: "Archived", detail: "Untouched evidence is stored before analysis." },
  { name: "Classified", detail: "Format, language and body state are recorded." },
  { name: "Cleaned", detail: "Readable material is derived without replacing the original." },
  { name: "Deduplicated", detail: "Copies and syndication families remain traceable." },
  { name: "Eligible", detail: "Quarantine and engine rules determine safe analytical use." },
  { name: "Available", detail: "A human can select the evidence into an investigation." },
];

export type Lens = {
  name: string;
  short: string;
  abbreviation: string;
  icon: LensIconKind;
  question: string;
  evidence: string;
  outputs: string[];
  connections: string;
  refuses: string;
  example: string;
  accent: "cyan" | "amber" | "green" | "violet";
};

export const lenses: Lens[] = [
  {
    name: "Narrative",
    short: "Claims, frames and continuity",
    abbreviation: "NA",
    icon: "narrative",
    question: "How are claims carried, framed and contested across time and channels?",
    evidence: "Attributed public claims, source text, dates, carriers and recurring evidence.",
    outputs: ["Carried claims", "Frames and counterframes", "NarrativePositions", "ClaimFamilies", "NarrativeFamilies", "Temporal continuity", "Activity", "Cross-family interaction", "Cross-channel differences"],
    connections: "Sentiment, Geography, Author, Portal, Entity and Memory.",
    refuses: "It does not invent a narrative that is not recurrently supported by attributable evidence.",
    example: "Demonstration: compare whether the fictional corridor notice is framed as access management, exclusion or procedural delay.",
    accent: "violet",
  },
  {
    name: "Sentiment",
    short: "Expressed stance and target",
    abbreviation: "SE",
    icon: "sentiment",
    question: "What stance is expressed, toward what target, and how does it change?",
    evidence: "Attributable language about identified people, organisations, claims or events.",
    outputs: ["Positive observations", "Negative observations", "Neutral observations", "Mixed observations", "Target of stance", "Trends and momentum"],
    connections: "Narrative, Geography, Author and Portal.",
    refuses: "It does not convert tone into fact or infer private belief.",
    example: "Demonstration: distinguish criticism of the process from criticism of a named actor.",
    accent: "cyan",
  },
  {
    name: "Emotion",
    short: "Emotional language in context",
    abbreviation: "EM",
    icon: "emotion",
    question: "Which emotions are expressed in public language, and around which subject?",
    evidence: "Quoted or attributable language with its source, target and surrounding context.",
    outputs: ["Anger", "Fear", "Sadness", "Joy", "Trust", "Contextual emotional signals"],
    connections: "Narrative, Sentiment, Threat and Geography.",
    refuses: "It does not claim access to private mental states.",
    example: "Demonstration: show fear language around access loss while preserving the exact public wording.",
    accent: "amber",
  },
  {
    name: "Threat",
    short: "Bounded escalation observations",
    abbreviation: "TH",
    icon: "threat",
    question: "Which public evidence signals warrant closer human assessment?",
    evidence: "Actors, targets, geography, recurrence, convergence and supporting or contradicting material.",
    outputs: ["Escalation observations", "Risk observations", "Actors and targets", "Geographic context", "Recurrence", "Convergence", "Uncertainty"],
    connections: "Fact-check, Emotion, Geography, Entity and Memory.",
    refuses: "It does not automatically declare intent, future danger or a threat decision.",
    example: "Demonstration: surface repeated escalation language without predicting what will happen.",
    accent: "amber",
  },
  {
    name: "Fact-check and Verification",
    short: "Claims, support and contradiction",
    abbreviation: "FC",
    icon: "fact-check",
    question: "What supports, contradicts or fails to resolve an extracted claim?",
    evidence: "Exact claims, primary documents, attributable statements and preserved source material.",
    outputs: ["Claim extraction", "Supporting evidence", "Contradicting evidence", "Inconclusive state", "Insufficient-evidence state", "Verification notes"],
    connections: "Threat, Narrative, Report and Evidence.",
    refuses: "It does not silently force uncertain claims into true or false.",
    example: "Demonstration: the notice date is supported, while the claimed duration remains inconclusive.",
    accent: "green",
  },
  {
    name: "Geography",
    short: "Where evidence belongs",
    abbreviation: "GE",
    icon: "geography",
    question: "Which places are involved, and what kind of geographic relationship is supported?",
    evidence: "Source jurisdiction, text mentions, event records, actor context and affected areas.",
    outputs: ["Countries", "Administrative regions", "Districts", "Localities", "Event location", "Mentioned location", "Source jurisdiction", "Actor base", "Affected location"],
    connections: "Narrative, Sentiment, Threat, Politico and Entity.",
    refuses: "It does not invent unsupported geographic links.",
    example: "Demonstration: distinguish where the fictional event occurs from where a publisher is based.",
    accent: "cyan",
  },
  {
    name: "Politico",
    short: "Political context without forecasting",
    abbreviation: "PI",
    icon: "politico",
    question: "Which political actors, parties, relationships and conditions shape the public context?",
    evidence: "Attributed statements, public participation, party records and evidence-backed relationships.",
    outputs: ["Political actors", "Parties", "Relationships", "Participation", "Political context", "Changing conditions"],
    connections: "Narrative, Sentiment, Geography, Portal and Entity.",
    refuses: "It does not forecast election outcomes or automate persuasion.",
    example: "Demonstration: map attributed positions around the notice without predicting public response.",
    accent: "violet",
  },
  {
    name: "Author Intelligence",
    short: "Who carries public claims",
    abbreviation: "AU",
    icon: "author",
    question: "Who authored, carried or voiced a public claim, and what patterns are observable?",
    evidence: "Bylines, attributed speakers, source records and recurring published subjects.",
    outputs: ["Authorship", "Carrier participation", "Author voice", "Attributed speakers", "Recurring subjects", "Publishing patterns"],
    connections: "Narrative, Portal, Sentiment and Entity.",
    refuses: "It does not erase the distinction between author, quoted speaker and publisher.",
    example: "Demonstration: separate the reporter, quoted official and outlet in each article.",
    accent: "amber",
  },
  {
    name: "Portal and Source Intelligence",
    short: "Outlet behaviour and source families",
    abbreviation: "PS",
    icon: "portal",
    question: "How do outlets and source families publish, syndicate and participate?",
    evidence: "Portal records, publication patterns, syndication links, source health and preserved articles.",
    outputs: ["Outlet behaviour", "Source families", "Syndication", "Trust and health context", "Narrative participation"],
    connections: "Author, Narrative, Sentiment, Politico and Evidence.",
    refuses: "It does not assume wording similarity proves coordination.",
    example: "Demonstration: identify a syndicated article family without alleging coordinated intent.",
    accent: "green",
  },
  {
    name: "Entity and Relationship Intelligence",
    short: "Only supported connections",
    abbreviation: "ER",
    icon: "entity",
    question: "Which people, organisations, places, events and evidence records are supportably connected?",
    evidence: "Canonical entities, exact evidence, attributable claims and rebuildable derived relationships.",
    outputs: ["People", "Organisations", "Places", "Events", "Evidence", "Sources", "Claims", "Narratives", "Investigations", "Memory"],
    connections: "Every lens through shared canonical evidence and bounded relationship types.",
    refuses: "It does not connect entities through unsupported inference.",
    example: "Demonstration: connect the notice to its issuing body, mentioned locality and preserved source document.",
    accent: "violet",
  },
];

export type Audience = {
  name: string;
  icon: LucideIcon;
  question: string;
  material: string;
  search: string;
  investigation: string;
  lenses: string;
  output: string;
  judgment: string;
  result: string;
};

export const audiences: Audience[] = [
  {
    name: "Journalists",
    icon: BookOpen,
    question: "How are a public claim and responsible actors being framed?",
    material: "Outlets, an official statement and public posts describing the same illustrative event differently.",
    search: "Find and preserve articles, statements and relevant public posts.",
    investigation: "Scope attributed claims, responsible actors, time and affected location.",
    lenses: "Narrative, Author, Portal, Geography and Fact-check.",
    output: "Original sources, claim attribution, competing frames, source differences, geographic context, contradiction register and coverage limitations.",
    judgment: "The journalist decides evidentiary sufficiency, wording, fairness and publication.",
    result: "Illustrative result: an evidence-backed story research package with links to exact evidence.",
  },
  {
    name: "Researchers",
    icon: Database,
    question: "How does a frame change across time, language, location and publication type?",
    material: "Archived multilingual reporting, documents and structured public records.",
    search: "Build a governed corpus with visible provider and archive coverage.",
    investigation: "Define comparison periods, language groups and evidence inclusion rules.",
    lenses: "Narrative, Geography, Author, Portal and Entity relationships.",
    output: "Comparative dataset, timeline, narrative-family history, geographic distribution and reproducible export.",
    judgment: "The researcher owns methodology, interpretation, caveats and reproducibility choices.",
    result: "Illustrative result: a method-linked comparative evidence package, not an automatic conclusion.",
  },
  {
    name: "NGOs",
    icon: HeartPulse,
    question: "What public claims concern the monitored population, issue or location?",
    material: "Public reporting, official records, monitored sources and submitted documents.",
    search: "Locate claims and evidence around the defined population or issue.",
    investigation: "Organize claims by source, actor, place, time and uncertainty.",
    lenses: "Fact-check, Geography, Emotion, Threat and Narrative.",
    output: "Evidence-organised issue brief with claims, context, coverage, emotional language, risk observations and uncertainty.",
    judgment: "Human reviewers decide advocacy relevance, safeguards and what is responsible to publish.",
    result: "Illustrative result: a bounded issue brief that distinguishes observation from inference.",
  },
  {
    name: "Government",
    icon: Building2,
    question: "What claims, concerns, contradictions and geographic signals appear in public information?",
    material: "Official sources, public reporting, public records and approved public-source material.",
    search: "Discover relevant evidence without treating prominence as accuracy.",
    investigation: "Scope a situational question and compare source, place and claim context.",
    lenses: "Geography, Fact-check, Narrative, Threat and Entity relationships.",
    output: "A traceable situational overview for authorised human review.",
    judgment: "Authorised officials retain responsibility for interpretation and action.",
    result: "Illustrative result: an evidence-linked overview with visible contradictions and limits.",
  },
  {
    name: "Political teams",
    icon: Flag,
    question: "How are policies, actors, parties and public claims being framed?",
    material: "Public statements, reporting, party material and official public records.",
    search: "Collect attributable public positions and coverage around a defined policy question.",
    investigation: "Compare claims, parties, actors, locations and publication context.",
    lenses: "Politico, Narrative, Sentiment, Portal, Geography and Author.",
    output: "Comparison of attributed positions, portal emphasis, geographic context and expressed stance.",
    judgment: "Humans decide interpretation. FrameWire does not target voters or generate persuasion.",
    result: "Illustrative result: a source-linked position comparison without automatic counter-messaging.",
  },
  {
    name: "Security analysts",
    icon: ShieldCheck,
    question: "Which public evidence signals require closer human assessment?",
    material: "Public reporting, official information, approved public-source records and historical evidence.",
    search: "Find bounded evidence around actors, targets, recurrence and place.",
    investigation: "Separate supporting, contradicting and insufficient material.",
    lenses: "Threat, Geography, Fact-check, Entity, Narrative and Memory.",
    output: "Bounded threat observations, actors, places, recurrence, supporting evidence, contradictions and uncertainty.",
    judgment: "A qualified human decides relevance, severity and any operational response.",
    result: "Illustrative result: a review queue with evidence, not an automatic threat declaration.",
  },
  {
    name: "Diplomats",
    icon: Globe2,
    question: "How do sources across regions and languages describe the same event?",
    material: "Multilingual reporting, official statements, source records and relevant public documents.",
    search: "Locate and preserve source-language evidence across regions.",
    investigation: "Compare attribution, framing, geography and publication context.",
    lenses: "Narrative, Author, Portal, Geography, Politico and Fact-check.",
    output: "Multilingual comparison of frames, attribution, authors, portals, geographic context and exact evidence.",
    judgment: "The diplomat decides contextual relevance and how uncertainty affects interpretation.",
    result: "Illustrative result: a cross-language evidence brief retaining every original source.",
  },
  {
    name: "General investigators",
    icon: ScanSearch,
    question: "What happened, what evidence exists and how can another person inspect the reasoning?",
    material: "Any authorised set of public information and uploaded evidence relevant to the subject.",
    search: "Discover, preserve and select bounded evidence.",
    investigation: "Move from subject and question through evidence to structured understanding.",
    lenses: "Choose only the independent lenses relevant to the question.",
    output: "A complete Subject to Question to Evidence to Understanding to Report workspace.",
    judgment: "The investigator remains accountable for scope, interpretation and conclusion.",
    result: "Illustrative result: a defensible report package another reviewer can inspect.",
  },
];

export const workbenchTabs = [
  { name: "Evidence", detail: "Five scoped records retain source, provider, retrieval context and a route to the untouched original.", items: ["Official notice PDF", "Local report", "National report", "Public statement", "Public post"] },
  { name: "Timeline", detail: "Sequence distinguishes publication time, stated event time and later clarification.", items: ["Notice issued", "First coverage", "Official clarification", "Contradiction logged"] },
  { name: "Entities", detail: "Actors and places connect only through relationships supported by the selected evidence.", items: ["Issuing body", "Affected residents", "Named corridor", "Publishing outlets"] },
  { name: "Lenses", detail: "Selected lenses inspect the same scoped records independently.", items: ["Narrative", "Fact-check", "Geography", "Author", "Portal"] },
  { name: "Findings", detail: "Structured observations preserve support, contradiction and insufficiency.", items: ["Document timing supported", "Duration remains inconclusive", "Location scope disputed"] },
  { name: "Report", detail: "Human-reviewed findings move into assembly with evidence and limitations attached.", items: ["Include supported finding", "Qualify disputed scope", "Retain unanswered question"] },
];
