/* Single source of truth for the complete FrameWire homepage.
   Lenses, tools, audiences, and flow chains — consumed by the section components
   so the same data is never duplicated across the page. */

export interface Lens {
  key: string;
  icon: string;
  accent: string;
  definition: string;
  question: string;
  examines: string[];
  identifies: string[];
  learn: string;
  limitation?: string;
  line?: string;
}

export const LENSES: Lens[] = [
  {
    key: "Narrative", icon: "trending-up", accent: "var(--fw-signal)",
    definition: "Shows how stories, explanations, and interpretations form and move across sources.",
    question: "Which stories are emerging, growing, declining, competing, or returning?",
    examines: ["Repeated language", "Claims & topics", "Sources & actors", "Time"],
    identifies: ["Emerging narratives", "Competing explanations", "Recurring carriers"],
    learn: "Which explanations are taking hold — and what evidence carries them.",
    limitation: "A widely repeated narrative is not automatically true.",
  },
  {
    key: "Sentiment", icon: "activity", accent: "var(--fw-conflict)",
    definition: "Shows the tone and positioning expressed in observed content.",
    question: "Is coverage becoming more positive, negative, neutral, or divided?",
    examines: ["Language tone", "Sources & actors", "Narratives", "Geography & time"],
    identifies: ["Tone movement", "Source concentration", "Geographic differences"],
    learn: "Where tone is shifting and where the movement comes from.",
    limitation: "Sentiment is not the same as public opinion.",
  },
  {
    key: "Emotion", icon: "heart", accent: "var(--fw-neutral-mark)",
    definition: "Identifies emotional signals expressed within observed content.",
    question: "Which emotional signals appear, and which narratives carry them?",
    examines: ["Words & phrases", "Events & narratives", "Sources", "Time"],
    identifies: ["Fear · anger · hope", "Trust · uncertainty", "Emotional recurrence"],
    learn: "Which emotional signals appear in the content and how they change.",
    limitation: "Emotion analysis describes content, not the private emotions of a population.",
  },
  {
    key: "Threat & Escalation", icon: "triangle-alert", accent: "var(--fw-caution)",
    definition: "Examines whether several evidence-backed indicators are converging into a possible escalation pattern.",
    question: "Which indicators are converging, and what supports or weakens the concern?",
    examines: ["Recurrence", "Actor involvement", "Geography & time", "Supporting & contradicting evidence"],
    identifies: ["Convergence", "Evidence strength", "Contradictions & gaps"],
    learn: "Whether independent indicators are appearing together — with uncertainty kept.",
    limitation: "Threat indicators are not predictions or final security judgments.",
  },
  {
    key: "Geography", icon: "map", accent: "var(--fw-archive)",
    definition: "Shows where evidence, events, actors, narratives, claims, and indicators are concentrated or changing.",
    question: "Where is activity occurring, and what evidence connects it to those locations?",
    examines: ["Source locations", "Events & claims", "Evidence", "Regional relationships"],
    identifies: ["Local concentration", "Cross-border relevance", "Evidence gaps"],
    learn: "Where activity concentrates and how it is distributed.",
    limitation: "A geographic connection does not automatically establish causation.",
  },
  {
    key: "Actors & Institutions", icon: "building-2", accent: "var(--fw-signal-bright)",
    definition: "Examines the people, organizations, political actors, public bodies, and institutions involved.",
    question: "Who is involved, how are they connected, and what evidence supports the connection?",
    examines: ["People & organizations", "Institutions", "Claims & narratives", "Relationships over time"],
    identifies: ["Recurring involvement", "Evidence-backed relationships", "Institutional connections"],
    learn: "Who is involved and how the connections are supported by evidence.",
    limitation: "A connection does not imply guilt, coordination, endorsement, or causation.",
  },
  {
    key: "Author Intelligence", icon: "pen-line", accent: "var(--fw-neutral-mark)",
    definition: "Examines recurring patterns across content published by an individual author.",
    question: "What subjects, narratives, claims, and patterns repeatedly appear in an author's work?",
    examines: ["Authored items", "Topics & narratives", "Tone", "Publishing time"],
    identifies: ["Recurring subjects", "Narrative association", "Publishing patterns"],
    learn: "What patterns recur across one author's published work.",
    limitation: "Author Intelligence must not become psychological profiling.",
  },
  {
    key: "Portal Intelligence", icon: "globe", accent: "var(--fw-archive)",
    definition: "Examines patterns across a publisher, website, news portal, or source domain.",
    question: "What does a portal repeatedly publish, who carries it, and how does it change?",
    examines: ["Published articles", "Authors", "Topics & claims", "Provenance"],
    identifies: ["Topic concentration", "Author participation", "Pattern changes"],
    learn: "What a publisher repeatedly produces and who carries it.",
    limitation: "Observed publishing patterns do not automatically establish intention or coordination.",
  },
  {
    key: "Fact-Check & Verification", icon: "badge-check", accent: "var(--fw-verified)",
    definition: "Compares a claim with supporting, contradicting, incomplete, and changing evidence.",
    question: "What supports the claim, what contradicts it, and how has its status changed?",
    examines: ["The exact claim", "Original source", "Supporting & contradicting evidence", "Corrections over time"],
    identifies: ["Supported · contradicted", "Incomplete · disputed", "Changed status"],
    learn: "What the evidence supports — and how that has changed.",
    limitation: "Verification may change when stronger evidence appears.",
  },
  {
    key: "Entities & Relationships", icon: "network", accent: "var(--fw-signal)",
    definition: "Connects people, organizations, institutions, places, claims, events, and sources.",
    question: "Which relationships are directly supported, and which remain uncertain?",
    examines: ["Names & aliases", "Organizations & places", "Claims & events", "Historical memory"],
    identifies: ["Direct relationships", "Suggested relationships", "Alias matches"],
    learn: "Which entities appear together and which links are actually supported.",
    limitation: "Co-occurrence is not proof of a meaningful relationship.",
  },
  {
    key: "Sources & Provenance", icon: "folder-open", accent: "var(--fw-verified)",
    definition: "Shows where information came from and how it changed before being used.",
    question: "Where did the information originate, and which findings rely on it?",
    examines: ["Original source", "Archived copy", "Extraction & cleaning", "Verification history"],
    identifies: ["Source lineage", "Transformation history", "Dependent findings"],
    learn: "The full lineage from original source to finding.",
    line: "Every conclusion remains connected to its evidence.",
  },
  {
    key: "Timeline & Recurrence", icon: "clock", accent: "var(--fw-signal-ink)",
    definition: "Shows how sources, events, claims, findings, and corrections develop over time.",
    question: "What happened first, what changed, and which patterns returned?",
    examines: ["First appearance", "Later changes", "Verification changes", "Corrections"],
    identifies: ["Recurrence", "Pattern return", "Interpretation change"],
    learn: "How understanding developed — without erasing earlier states.",
  },
  {
    key: "Investigation Memory", icon: "history", accent: "var(--fw-archive)",
    definition: "Preserves evidence, findings, corrections, relationships, reports, and later updates.",
    question: "Has this pattern appeared before, and what has changed?",
    examines: ["Past findings", "Recurring entities", "Changed evidence", "Relationship continuity"],
    identifies: ["Historical patterns", "Updated conclusions", "Continuity"],
    learn: "Whether a pattern recurs and what has changed since.",
    line: "A memory system for evidence-backed institutional understanding.",
  },
];

export interface Tool {
  key: string;
  icon: string;
  definition: string;
  shows: string[];
  limitation?: string;
}

export const TOOLS: Tool[] = [
  { key: "Search", icon: "search", definition: "Starts an investigation from a subject, question, person, organization, event, location, or claim.", shows: ["Related terms", "Entities & aliases", "Source paths", "New investigation"], limitation: "Search begins an investigation. It does not create a conclusion." },
  { key: "Live Timeline", icon: "radio", definition: "Starts from an emerging signal, source, event, contradiction, or meaningful change.", shows: ["Signal appears", "Original source preserved", "Related evidence joins"], limitation: "A signal is an observation, not a verified conclusion." },
  { key: "Investigation Workspace", icon: "git-branch", definition: "Keeps subject, questions, scope, evidence, lenses, findings, contradictions, uncertainty, and timeline connected.", shows: ["Subject & questions", "Evidence & claims", "Findings & uncertainty"] },
  { key: "Guided Cognition", icon: "lightbulb", definition: "Helps investigators ask better questions, examine evidence gaps, and compare alternative explanations.", shows: ["Current question", "Evidence gap", "Alternative interpretation"], limitation: "It supports human reasoning. It does not decide the conclusion." },
  { key: "Evidence Workspace", icon: "folder-open", definition: "Connects original sources, archived records, verification states, findings, and citations.", shows: ["Source → archive", "Extracted evidence", "Verification → finding → citation"] },
  { key: "Data Analytics", icon: "activity", definition: "Compares quantities, distributions, changes, and patterns within validated investigation data.", shows: ["Time comparison", "Geographic comparison", "Trend change with references"], limitation: "A statistical relationship does not establish causation." },
  { key: "Relationship Graph", icon: "waypoints", definition: "Explores evidence-backed relationships between people, organizations, institutions, claims, sources, places, and events.", shows: ["Direct relationship", "Suggested relationship", "Supporting evidence"] },
  { key: "Tracked Items", icon: "list-plus", definition: "Preserves user-selected investigation anchors and shows how they grow, decline, recur, contradict, or change.", shows: ["User selects anchor", "New evidence arrives", "Change reconnects to the investigation"] },
  { key: "Report Studio", icon: "file-check", definition: "Turns user-selected findings into a structured report without disconnecting them from evidence.", shows: ["Selected findings", "Evidence travels along", "Human-reviewed report"] },
];

export interface Audience {
  role: string;
  icon: string;
  accent: string;
  subject: string;
  sources: string[];
  question: string;
  lenses: string[];
  output: string;
  safeguard: string;
}

export const AUDIENCES: Audience[] = [
  { role: "Journalist", icon: "newspaper", accent: "var(--fw-signal)", subject: "A spreading public claim", sources: ["News", "Documents", "Records", "Social"], question: "Follow a claim from first appearance to evidence-backed reporting.", lenses: ["Fact-Check", "Sources", "Narrative", "Actors", "Timeline"], output: "Evidence-linked investigative brief or report.", safeguard: "FrameWire organizes evidence; editorial judgment stays with the journalist." },
  { role: "Researcher", icon: "microscope", accent: "var(--fw-archive)", subject: "A long-running pattern", sources: ["Academic", "Open data", "Media", "Documents"], question: "Study patterns over time without losing methodology or uncertainty.", lenses: ["Timeline", "Memory", "Entities", "Geography", "Sources"], output: "Reproducible research report with methodology, limits, and change history.", safeguard: "Analytical patterns stay distinguishable from verified facts." },
  { role: "NGO", icon: "heart-handshake", accent: "var(--fw-verified)", subject: "A community or programme issue", sources: ["Field reports", "Scans · OCR", "Open data", "Public"], question: "Connect field evidence, public information, geography, and institutions.", lenses: ["Geography", "Fact-Check", "Entities", "Emotion", "Memory"], output: "Evidence-linked programme, monitoring, or advocacy report.", safeguard: "Geographic or emotional signals never stand in for an entire community." },
  { role: "Humanitarian", icon: "heart", accent: "var(--fw-conflict)", subject: "An unfolding incident", sources: ["Incident reports", "Local", "Open data", "Public"], question: "Connect incidents, locations, and changing needs with verified context.", lenses: ["Geography", "Timeline", "Threat", "Sources", "Memory"], output: "Traceable situational-awareness or response brief.", safeguard: "Verified and unverified material stay clearly separated." },
  { role: "Security & Risk", icon: "shield", accent: "var(--fw-caution)", subject: "A concerning signal", sources: ["Live signals", "Regional", "Historical", "Public"], question: "Examine escalation through evidence, geography, recurrence, and actors.", lenses: ["Threat", "Geography", "Timeline", "Actors", "Memory"], output: "Situational intelligence report with indicators, evidence, and uncertainty.", safeguard: "FrameWire supports investigation; it does not predict events." },
  { role: "Law-Enforcement", icon: "scale", accent: "var(--fw-neutral-mark)", subject: "Legally obtained information", sources: ["Permitted records", "Incidents", "Public", "Documents"], question: "Connect incidents, entities, geography, and timeline with evidence lineage.", lenses: ["Entities", "Geography", "Timeline", "Sources", "Fact-Check"], output: "Human-reviewed analytical brief with traceable evidence.", safeguard: "Not a guilt-determination, suspicion, or predictive-policing system." },
  { role: "Government", icon: "landmark", accent: "var(--fw-signal-bright)", subject: "A policy or public issue", sources: ["Official", "Open data", "Media", "Documents"], question: "Connect policy questions, institutions, geography, and history.", lenses: ["Geography", "Actors", "Fact-Check", "Timeline", "Memory"], output: "Traceable policy, institutional, or situational brief.", safeguard: "Role authority does not replace evidence validation." },
  { role: "Political Research", icon: "vote", accent: "var(--fw-conflict)", subject: "A public narrative", sources: ["Public", "Media", "Records", "Social"], question: "Examine narratives, actors, and claims without reducing politics to a score.", lenses: ["Narrative", "Actors", "Fact-Check", "Sentiment", "Geography"], output: "Evidence-linked political or public-affairs research report.", safeguard: "Not a persuasion, targeting, or ideological-classification system." },
  { role: "Diplomatic", icon: "globe-2", accent: "var(--fw-archive)", subject: "A cross-border issue", sources: ["Multilingual", "Regional", "Institutional", "Public"], question: "Follow issues across borders, languages, institutions, and time.", lenses: ["Geography", "Narrative", "Actors", "Entities", "Timeline"], output: "Cross-border brief with multilingual evidence and citations.", safeguard: "Cross-border links imply context, not covert activity, without evidence." },
  { role: "Compliance", icon: "clipboard-check", accent: "var(--fw-verified)", subject: "An organization or claim", sources: ["Registries", "Public claims", "Records", "Documents"], question: "Review organizations, claims, sources, and changes with provenance.", lenses: ["Entities", "Sources", "Fact-Check", "Timeline", "Memory"], output: "Evidence-linked due-diligence or compliance research brief.", safeguard: "Findings remain evidence-backed; no unsupported accusation." },
  { role: "Media & Comms", icon: "message-square-text", accent: "var(--fw-signal)", subject: "A moving narrative", sources: ["News", "Social", "Author", "Portal"], question: "Follow narrative movement, tone, and source patterns.", lenses: ["Narrative", "Sentiment", "Emotion", "Author", "Portal"], output: "Traceable media-intelligence or communication-context report.", safeguard: "More than mention counting or basic brand monitoring." },
  { role: "General", icon: "users", accent: "var(--fw-signal)", subject: "A confusing subject", sources: ["Search", "Public", "News", "Records"], question: "Understand a complex subject without losing where information came from.", lenses: ["Fact-Check", "Sources", "Narrative", "Timeline", "Geography"], output: "A clear summary of what is known, disputed, missing, and uncertain.", safeguard: "FrameWire does not make personal, legal, or medical decisions for you." },
];

/* Short flow chains reused by the evidence-flow strips. */
export const FLOW_DEFINITION = ["Subject", "Evidence", "Investigation", "Understanding", "Report", "Memory"];
export const FLOW_VERBS = ["Observe", "Question", "Investigate", "Understand", "Report", "Remember"];
export const FLOW_RECAP = ["Subject", "Sources", "Investigation", "Lenses", "Findings", "Report Studio", "Human review", "Final report", "Memory"];
