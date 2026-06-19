/* Audience journey configuration — one entry per professional role.
   The AudienceExperienceSelector renders these; the shared Investigation node
   and evidence line stay constant, only the surround changes per role. */

export interface Audience {
  id: string;
  nav: string;          // short selector label
  title: string;        // public title
  icon: string;
  accent: string;       // CSS color var for the role accent
  headline: string;
  problems: string[];
  journey: string[];
  lenses: string[];
  sources: string[];    // role-specific source chips for the journey graphic
  output: string;
  safeguard: string;
}

export const AUDIENCES: Audience[] = [
  {
    id: "journalist", nav: "Journalist", title: "Investigative Journalism", icon: "newspaper", accent: "var(--fw-signal)",
    headline: "Follow a claim from first appearance to evidence-backed reporting.",
    problems: ["Sources spread across tabs and messages", "Claims change while reporting develops", "Reports lose their source lineage"],
    journey: [
      "A public claim appears in Live Timeline.",
      "Open an investigation and collect news, documents, records, and social sources.",
      "Original material is archived; claims and named entities are extracted.",
      "Supporting and contradicting evidence are compared.",
      "Narrative movement and actor involvement are examined.",
      "Selected findings become an evidence-linked investigative brief.",
    ],
    lenses: ["Claims & Verification", "Sources & Provenance", "Narrative", "Actors & Institutions", "Entities", "Timeline", "Geography"],
    sources: ["News", "Documents", "Public records", "Social"],
    output: "An evidence-linked investigative brief with claims, contradictions, actors, timeline, uncertainty, and source references.",
    safeguard: "FrameWire organizes evidence and context. The journalist retains editorial judgment and responsibility.",
  },
  {
    id: "researcher", nav: "Researcher", title: "Research & Longitudinal Analysis", icon: "microscope", accent: "var(--fw-archive)",
    headline: "Study patterns over time without losing methodology, evidence, or uncertainty.",
    problems: ["Material comes from incompatible sources", "Long projects lose context", "Methodology detaches from findings"],
    journey: [
      "Define a subject, question, scope, and time range.",
      "Collect academic, public, media, document, and open-data sources.",
      "Archive and normalize; identify recurring entities, narratives, and relationships.",
      "Compare evidence across time; keep contradictions visible.",
      "Assemble findings with limitations and unresolved questions.",
      "Investigation Memory preserves continuity for the next phase.",
    ],
    lenses: ["Timeline & Recurrence", "Narrative", "Entities", "Geography", "Sources & Provenance", "Claims & Verification", "Investigation Memory"],
    sources: ["Academic", "Open data", "Media", "Documents"],
    output: "A reproducible research report with evidence, methodology, relationships, change history, limitations, and unresolved questions.",
    safeguard: "Analytical patterns remain distinguishable from verified facts and researcher interpretation.",
  },
  {
    id: "ngo", nav: "NGO", title: "Civil Society & Programme Intelligence", icon: "heart-handshake", accent: "var(--fw-verified)",
    headline: "Connect field evidence, public information, geography, and institutional context.",
    problems: ["Field reports stay disconnected from public information", "Geographic context is hard to compare", "Reports separate conclusions from materials"],
    journey: [
      "Introduce a programme, issue, or community concern.",
      "Collect field documents, uploads, public sources, OCR records, and open data.",
      "Preserve source identity; connect locations, organizations, and recurring issues.",
      "Examine geographic concentration and narrative movement.",
      "Retain contradictions and missing evidence.",
      "Assemble an evidence-linked programme or advocacy report.",
    ],
    lenses: ["Geography", "Claims & Verification", "Entities", "Narrative", "Emotion", "Sources & Provenance", "Timeline", "Investigation Memory"],
    sources: ["Field reports", "Scans · OCR", "Open data", "Public"],
    output: "An evidence-linked issue or programme report connecting field material, geography, claims, institutions, limitations, and change over time.",
    safeguard: "Geographic or emotional signals must not be presented as the complete representation of an entire community.",
  },
  {
    id: "security", nav: "Security", title: "Security & Risk Investigation", icon: "shield", accent: "var(--fw-caution)",
    headline: "Examine escalation through evidence, geography, recurrence, actors, and time.",
    problems: ["Alerts arrive without context", "Risk scores hide their evidence", "Recurring indicators are hard to track"],
    journey: [
      "A concerning signal appears in Live Timeline.",
      "Collect related sources and historical patterns; archive and verify.",
      "Examine threat, geography, narrative, emotion, actors, and timeline together.",
      "Keep supporting and contradicting indicators visible.",
      "Evaluate recurrence and convergence.",
      "Human Review records uncertainty before a situational report.",
    ],
    lenses: ["Threat & Escalation", "Geography", "Timeline & Recurrence", "Narrative", "Emotion", "Actors & Institutions", "Entities", "Sources & Provenance"],
    sources: ["Live signals", "Regional", "Historical", "Public"],
    output: "A situational intelligence report showing indicators, supporting evidence, contradictions, locations, recurrence, actors, and uncertainty.",
    safeguard: "Threat indicators support investigation. They do not automatically predict events or replace professional security judgment.",
  },
  {
    id: "government", nav: "Government", title: "Government & Public-Sector Analysis", icon: "landmark", accent: "var(--fw-neutral-mark)",
    headline: "Connect policy questions, public evidence, geography, institutions, and history.",
    problems: ["Information is fragmented across departments", "Analysis loses source lineage", "Institutional knowledge disappears with staff changes"],
    journey: [
      "Define a policy, event, institution, or public issue.",
      "Collect official, media, open-data, document, and public sources.",
      "Preserve lineage and verification state; connect institutions, actors, and claims.",
      "Examine geographic and historical differences.",
      "Compare supporting, contradicting, and incomplete evidence.",
      "Assemble a policy brief; Institutional Memory preserves it for future teams.",
    ],
    lenses: ["Geography", "Actors & Institutions", "Claims & Verification", "Timeline & Recurrence", "Narrative", "Sources & Provenance", "Entities", "Investigation Memory"],
    sources: ["Official", "Open data", "Media", "Documents"],
    output: "A traceable policy or situational brief connecting public evidence, institutions, geography, historical context, uncertainty, and source references.",
    safeguard: "Role authority does not replace evidence validation, and administrative access does not make uploaded information automatically trusted.",
  },
  {
    id: "political", nav: "Political", title: "Political & Electoral Research", icon: "vote", accent: "var(--fw-conflict)",
    headline: "Examine narratives, actors, claims, and geography without reducing politics to one score.",
    problems: ["Narratives move faster than manual analysis", "Relationships are shown without evidence", "Sentiment is mistaken for public opinion"],
    journey: [
      "Define an actor, institution, issue, or public narrative.",
      "Collect and archive relevant public sources.",
      "Extract claims, actors, institutions, locations, and narratives.",
      "Examine narrative, sentiment, emotion, claims, geography, and relationships together.",
      "Keep competing explanations visible; separate evidence from inference.",
      "Human Review records limitations before a political research report.",
    ],
    lenses: ["Narrative", "Actors & Institutions", "Claims & Verification", "Sentiment", "Emotion", "Geography", "Entities", "Timeline", "Sources & Provenance"],
    sources: ["Public", "Media", "Records", "Social"],
    output: "An evidence-linked political research brief with narratives, actors, claims, geography, relationships, competing explanations, and limitations.",
    safeguard: "Connections do not imply guilt, coordination, or causation; sentiment is not public opinion; FrameWire is not a persuasion or targeting system.",
  },
  {
    id: "diplomat", nav: "Diplomat", title: "Diplomatic & Cross-Border Understanding", icon: "globe-2", accent: "var(--fw-archive)",
    headline: "Follow issues across borders, languages, institutions, narratives, and time.",
    problems: ["Cross-border information is fragmented", "The same issue differs across languages and regions", "Policy teams lose historical context"],
    journey: [
      "Define a country, bilateral issue, regional event, or cross-border subject.",
      "Collect multilingual and cross-border public sources.",
      "Preserve language, geography, and provenance; normalize entity aliases.",
      "Compare narratives, claims, actors, and timelines across regions.",
      "Keep national and regional interpretations visible.",
      "Assemble a diplomatic brief; Investigation Memory preserves continuity.",
    ],
    lenses: ["Narrative", "Geography", "Actors & Institutions", "Entities", "Claims & Verification", "Timeline & Recurrence", "Sources & Provenance", "Investigation Memory"],
    sources: ["Multilingual", "Regional", "Institutional", "Public"],
    output: "A cross-border intelligence brief connecting multilingual evidence, narratives, actors, institutions, geography, historical context, uncertainty, and citations.",
    safeguard: "Cross-border relationships support contextual understanding and do not imply covert activity, coordination, or causation without evidence.",
  },
  {
    id: "general", nav: "General", title: "Everyday Evidence-Based Investigation", icon: "users", accent: "var(--fw-signal)",
    headline: "Understand a complex subject without losing where the information came from.",
    problems: ["Search results are overwhelming", "Sources contradict each other", "AI answers don't show enough evidence"],
    journey: [
      "Search a subject or open a Live Timeline signal.",
      "FrameWire collects and preserves relevant public material.",
      "See the most relevant evidence, claims, sources, and timeline.",
      "Contradictions and uncertainty stay visible; complex lenses stay optional.",
      "Save findings or create a concise evidence-linked summary.",
      "The investigation remains available for later continuation.",
    ],
    lenses: ["Claims & Verification", "Sources & Provenance", "Narrative", "Timeline", "Geography", "Entities"],
    sources: ["Search", "Public", "News", "Records"],
    output: "A clear investigation summary showing what is known, what is disputed, where the information came from, and what remains uncertain.",
    safeguard: "FrameWire supports informed understanding but does not make personal, legal, medical, financial, or political decisions for the user.",
  },
];
