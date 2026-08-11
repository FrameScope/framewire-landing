import type { LensVisualType } from "./lensData";

export type NativeLensId = Exclude<LensVisualType, "narrative" | "sentiment" | "emotion">;
export type NativeTone = "evidence" | "analysis" | "supported" | "contested" | "unresolved" | "human";
export type NativeShape = "rect" | "round" | "circle" | "diamond" | "pill";

export interface NativeNode {
  id: string;
  label: string;
  type: string;
  note: string;
  evidence: string;
  state: string;
  x: number;
  y: number;
  tone: NativeTone;
  shape: NativeShape;
}

export interface NativeEdge {
  from: string;
  to: string;
  label: string;
  state?: "solid" | "dashed" | "contested";
}

export interface NativeGraphDefinition {
  id: NativeLensId;
  title: string;
  question: string;
  summary: string;
  legend: string[];
  nodes: NativeNode[];
  edges: NativeEdge[];
}

export const nativeGraphs: Record<NativeLensId, NativeGraphDefinition> = {
  threat: {
    id: "threat",
    title: "Evidence Convergence Network",
    question: "Which bounded public-evidence dimensions require closer human assessment?",
    summary: "Actor, target, mechanism, capability and context remain separate evidence dimensions. Supporting, contradicting and missing observations converge without becoming a prediction.",
    legend: ["Evidence dimension", "Supporting", "Contradicting", "Missing", "Human review"],
    nodes: [
      { id: "th-actor", label: "Public actor reference", type: "ACTOR", note: "A public actor is named in scoped material; intent is not inferred.", evidence: "Attributed public statement", state: "Observed", x: 10, y: 13, tone: "evidence", shape: "round" },
      { id: "th-target", label: "Transport authority", type: "TARGET", note: "The institution is explicitly named as the subject of the public claim.", evidence: "Exact named-target span", state: "Observed", x: 30, y: 13, tone: "evidence", shape: "round" },
      { id: "th-mechanism", label: "Disruption mechanism", type: "MECHANISM", note: "Available material does not establish a deliberate harmful mechanism.", evidence: "No qualifying mechanism span", state: "Missing", x: 50, y: 13, tone: "unresolved", shape: "round" },
      { id: "th-capability", label: "Operational capacity", type: "CAPABILITY", note: "One contextual reference is insufficient to establish capability.", evidence: "Single contextual mention", state: "Sparse", x: 70, y: 13, tone: "contested", shape: "round" },
      { id: "th-geo", label: "Named road corridor", type: "GEOGRAPHY", note: "A location is present, but geographic mention alone does not establish threat.", evidence: "Resolved place mention", state: "Observed", x: 90, y: 13, tone: "evidence", shape: "round" },
      { id: "th-rec", label: "Repeated disruption", type: "RECURRENCE", note: "Several records describe recurrence inside this evidence window.", evidence: "Three scoped observations", state: "Supported context", x: 18, y: 42, tone: "supported", shape: "pill" },
      { id: "th-time", label: "Timing disagreement", type: "IMMEDIACY", note: "Sources disagree about timing and current operational status.", evidence: "Contradicting publication times", state: "Contradictory", x: 40, y: 42, tone: "contested", shape: "pill" },
      { id: "th-mob", label: "Mobilization", type: "MOBILIZATION", note: "No supported mobilization evidence appears in the selected material.", evidence: "No qualifying observation", state: "Missing", x: 62, y: 42, tone: "unresolved", shape: "pill" },
      { id: "th-ind", label: "Two source families", type: "INDEPENDENCE", note: "Two observations have distinct provenance; copied items remain grouped.", evidence: "Archive lineage review", state: "Partial support", x: 84, y: 42, tone: "supported", shape: "pill" },
      { id: "th-converge", label: "Bounded convergence", type: "EVIDENCE CONVERGENCE", note: "Recurrence and location context align, while mechanism, immediacy and mobilization remain unresolved.", evidence: "Dimension-by-dimension comparison", state: "Partial / mixed", x: 50, y: 68, tone: "analysis", shape: "diamond" },
      { id: "th-support", label: "Supporting observations", type: "SUPPORT", note: "The record supports bounded recurrence and geographic context only.", evidence: "Independent scoped spans", state: "Supported", x: 22, y: 91, tone: "supported", shape: "rect" },
      { id: "th-contradict", label: "Contradictions retained", type: "CONTRADICTION", note: "Conflicting timing remains visible instead of being averaged away.", evidence: "Conflicting public updates", state: "Contradicted", x: 50, y: 91, tone: "contested", shape: "rect" },
      { id: "th-gap", label: "Evidence gaps", type: "MISSING", note: "Mechanism and mobilization are not established.", evidence: "Explicit insufficiency state", state: "Insufficient", x: 78, y: 91, tone: "unresolved", shape: "rect" },
    ],
    edges: [
      { from: "th-actor", to: "th-rec", label: "CONTEXT" }, { from: "th-target", to: "th-time", label: "NAMED" },
      { from: "th-mechanism", to: "th-mob", label: "MISSING", state: "dashed" }, { from: "th-capability", to: "th-ind", label: "QUALIFIES", state: "contested" },
      { from: "th-geo", to: "th-ind", label: "LOCATES" }, { from: "th-rec", to: "th-converge", label: "SUPPORTS" },
      { from: "th-time", to: "th-converge", label: "CONTRADICTS", state: "contested" }, { from: "th-mob", to: "th-converge", label: "MISSING", state: "dashed" },
      { from: "th-ind", to: "th-converge", label: "QUALIFIES" }, { from: "th-converge", to: "th-support", label: "SUPPORTED" },
      { from: "th-converge", to: "th-contradict", label: "CONTRADICTED", state: "contested" }, { from: "th-converge", to: "th-gap", label: "INSUFFICIENT", state: "dashed" },
    ],
  },
  verification: {
    id: "verification",
    title: "Claim–Evidence Bipartite Graph",
    question: "What supports, contradicts or leaves the selected claim unresolved?",
    summary: "A multilingual claim family is compared with exact evidence and provenance. Republications remain dependent on their original source.",
    legend: ["Claim", "Supporting evidence", "Contradiction", "Dependent source", "Unresolved gap"],
    nodes: [
      { id: "fc-ne", label: "नेपाली claim wording", type: "CLAIM VARIANT", note: "The Nepali wording belongs to the same bounded claim family.", evidence: "Exact original-language span", state: "Extracted", x: 12, y: 16, tone: "analysis", shape: "pill" },
      { id: "fc-hi", label: "हिन्दी claim wording", type: "CLAIM VARIANT", note: "The Hindi wording repeats part of the claim without becoming new corroboration.", evidence: "Exact original-language span", state: "Extracted", x: 12, y: 43, tone: "analysis", shape: "pill" },
      { id: "fc-en", label: "English claim wording", type: "CLAIM VARIANT", note: "The English official wording provides the checkable operational statement.", evidence: "Official public notice", state: "Extracted", x: 12, y: 70, tone: "analysis", shape: "pill" },
      { id: "fc-family", label: "Temporary restrictions remain", type: "CLAIM FAMILY", note: "Language variants are resolved into one reviewable claim family.", evidence: "Multilingual claim comparison", state: "Under review", x: 39, y: 43, tone: "human", shape: "diamond" },
      { id: "fc-support-a", label: "Archived authority notice", type: "SUPPORT", note: "The preserved notice supports restrictions in identified sections.", evidence: "Original official record", state: "Supporting", x: 69, y: 14, tone: "supported", shape: "rect" },
      { id: "fc-support-b", label: "Independent local update", type: "SUPPORT", note: "A separately sourced local update supports limited route disruption.", evidence: "Independent source lineage", state: "Partial support", x: 69, y: 34, tone: "supported", shape: "rect" },
      { id: "fc-copy", label: "Syndicated rewrite", type: "DEPENDENT", note: "A translated rewrite derives from the original notice and is not independent support.", evidence: "Shared wording and provenance", state: "Dependent", x: 69, y: 54, tone: "contested", shape: "rect" },
      { id: "fc-contradict", label: "Later access update", type: "CONTRADICTION", note: "A later source contradicts the claim if it is interpreted as current everywhere.", evidence: "Later operational update", state: "Contradicting scope", x: 69, y: 74, tone: "contested", shape: "rect" },
      { id: "fc-gap", label: "Locality coverage gap", type: "UNRESOLVED", note: "The evidence does not resolve every locality or time window.", evidence: "No complete locality record", state: "Insufficient", x: 69, y: 92, tone: "unresolved", shape: "rect" },
      { id: "fc-state", label: "Supported with limitations", type: "VERIFICATION STATE", note: "The bounded claim is supported for identified sections, while locality and timing limitations remain explicit.", evidence: "Human-reviewable evidence comparison", state: "Qualified", x: 92, y: 52, tone: "human", shape: "round" },
    ],
    edges: [
      { from: "fc-ne", to: "fc-family", label: "SAME CLAIM" }, { from: "fc-hi", to: "fc-family", label: "SAME CLAIM" }, { from: "fc-en", to: "fc-family", label: "CANONICAL WORDING" },
      { from: "fc-family", to: "fc-support-a", label: "SUPPORTED BY" }, { from: "fc-family", to: "fc-support-b", label: "SUPPORTED BY" },
      { from: "fc-family", to: "fc-copy", label: "REPEATED BY", state: "dashed" }, { from: "fc-family", to: "fc-contradict", label: "CONTRADICTED BY", state: "contested" },
      { from: "fc-family", to: "fc-gap", label: "UNRESOLVED", state: "dashed" }, { from: "fc-support-a", to: "fc-state", label: "CONTRIBUTES" },
      { from: "fc-support-b", to: "fc-state", label: "CONTRIBUTES" }, { from: "fc-contradict", to: "fc-state", label: "QUALIFIES", state: "contested" }, { from: "fc-gap", to: "fc-state", label: "LIMITS", state: "dashed" },
    ],
  },
  geography: {
    id: "geography",
    title: "Geospatial Typed-Relationship Map",
    question: "Which place relationship is actually supported by each evidence item?",
    summary: "A schematic regional map separates occurrence, affected place, source jurisdiction and mention-only relationships while resolving multilingual aliases to canonical places.",
    legend: ["OCCURRED_IN", "AFFECTED_PLACE", "MENTIONS", "SOURCE_JURISDICTION", "Canonical place"],
    nodes: [
      { id: "ge-kath", label: "Kathmandu", type: "CANONICAL PLACE", note: "काठमाडौं, काठमांडू and Kathmandu resolve to one country-scoped canonical place.", evidence: "Alias registry and country context", state: "Resolved", x: 43, y: 43, tone: "supported", shape: "circle" },
      { id: "ge-pok", label: "Pokhara", type: "AFFECTED PLACE", note: "Evidence describes an affected transport corridor near Pokhara.", evidence: "Exact affected-place span", state: "Affected place", x: 27, y: 54, tone: "contested", shape: "circle" },
      { id: "ge-bir", label: "Birgunj", type: "MENTIONED PLACE", note: "The place is mentioned as a route reference; event occurrence is not established there.", evidence: "Route mention only", state: "Mention only", x: 39, y: 73, tone: "unresolved", shape: "circle" },
      { id: "ge-delhi", label: "New Delhi", type: "SOURCE JURISDICTION", note: "नई दिल्ली and New Delhi resolve to a source jurisdiction, not event location.", evidence: "Publisher registry context", state: "Source jurisdiction", x: 73, y: 38, tone: "analysis", shape: "circle" },
      { id: "ge-luck", label: "Lucknow", type: "CANONICAL PLACE", note: "A northern India transport update is scoped to the resolved locality.", evidence: "Official locality reference", state: "Resolved", x: 72, y: 58, tone: "supported", shape: "circle" },
      { id: "ge-gor", label: "Gorakhpur corridor", type: "AFFECTED PLACE", note: "The corridor is described as affected without assigning a risk score.", evidence: "Transport disruption record", state: "Affected place", x: 59, y: 66, tone: "contested", shape: "circle" },
      { id: "ge-event", label: "Monsoon transport disruption", type: "EVENT", note: "The illustrative event connects only to supported occurrence and affected-place relationships.", evidence: "Scoped multilingual evidence set", state: "Illustrative event", x: 50, y: 19, tone: "human", shape: "diamond" },
      { id: "ge-news", label: "Hindi regional report", type: "SOURCE", note: "Publisher jurisdiction remains distinct from places described in the article.", evidence: "Source registry", state: "Resolved source", x: 88, y: 20, tone: "evidence", shape: "rect" },
      { id: "ge-ne", label: "Nepali news evidence", type: "EVIDENCE", note: "The report links disruption to a resolved road section and mentions alternatives.", evidence: "Original Nepali span", state: "Observed", x: 15, y: 24, tone: "evidence", shape: "rect" },
    ],
    edges: [
      { from: "ge-event", to: "ge-kath", label: "OCCURRED_IN" }, { from: "ge-event", to: "ge-pok", label: "AFFECTED_PLACE", state: "contested" },
      { from: "ge-event", to: "ge-gor", label: "AFFECTED_PLACE", state: "contested" }, { from: "ge-ne", to: "ge-kath", label: "OCCURRED_IN" },
      { from: "ge-ne", to: "ge-bir", label: "MENTIONS", state: "dashed" }, { from: "ge-news", to: "ge-delhi", label: "SOURCE_JURISDICTION", state: "dashed" },
      { from: "ge-news", to: "ge-luck", label: "MENTIONS", state: "dashed" },
    ],
  },
  politico: {
    id: "politico",
    title: "Actor–Institution–Role–Position Network",
    question: "Which evidenced public roles and positions connect actors to institutions and issues?",
    summary: "Illustrative public actors remain unnamed. Roles, statements and issue positions are time-bounded and evidence-linked; shared participation does not predict alliances or outcomes.",
    legend: ["Actor", "Institution", "Time-valid role", "Public position", "Unresolved relationship"],
    nodes: [
      { id: "pi-inst-a", label: "Transport committee", type: "INSTITUTION", note: "A public committee anchors time-valid roles.", evidence: "Institutional public record", state: "Resolved", x: 28, y: 10, tone: "analysis", shape: "rect" },
      { id: "pi-inst-b", label: "Regional authority", type: "INSTITUTION", note: "A regional authority is separately resolved.", evidence: "Official institutional record", state: "Resolved", x: 72, y: 10, tone: "analysis", shape: "rect" },
      { id: "pi-actor-a", label: "Public actor A", type: "POLITICAL ACTOR", note: "An unnamed illustrative actor with a supported public role.", evidence: "Role record and attributed statement", state: "Resolved", x: 18, y: 35, tone: "evidence", shape: "circle" },
      { id: "pi-actor-b", label: "Public actor B", type: "POLITICAL ACTOR", note: "A second illustrative actor remains independently identified.", evidence: "Committee record", state: "Resolved", x: 43, y: 35, tone: "evidence", shape: "circle" },
      { id: "pi-actor-c", label: "Public actor C", type: "POLITICAL ACTOR", note: "A regional public actor is linked only to the evidenced institution.", evidence: "Institutional role notice", state: "Resolved", x: 79, y: 35, tone: "evidence", shape: "circle" },
      { id: "pi-role-a", label: "Committee member", type: "ROLE", note: "The role is valid inside the illustrative evidence window.", evidence: "Time-bounded role record", state: "Time-valid", x: 12, y: 59, tone: "supported", shape: "pill" },
      { id: "pi-role-b", label: "Public spokesperson", type: "ROLE", note: "The public spokesperson role is separately evidenced.", evidence: "Attributed official statement", state: "Time-valid", x: 38, y: 59, tone: "supported", shape: "pill" },
      { id: "pi-role-c", label: "Regional representative", type: "ROLE", note: "The regional role is supported without implying wider influence.", evidence: "Public role notice", state: "Time-valid", x: 70, y: 59, tone: "supported", shape: "pill" },
      { id: "pi-pos-a", label: "Supports safety review", type: "PUBLIC POSITION", note: "The issue position is attributed to a public statement.", evidence: "Exact statement span", state: "Observed", x: 20, y: 82, tone: "analysis", shape: "round" },
      { id: "pi-pos-b", label: "Requests infrastructure review", type: "PUBLIC POSITION", note: "A second position is supported by a separate statement.", evidence: "Published public statement", state: "Observed", x: 51, y: 82, tone: "analysis", shape: "round" },
      { id: "pi-issue", label: "Monsoon transport policy", type: "ISSUE", note: "The shared issue connects positions without converting them into a coalition.", evidence: "Resolved issue references", state: "Observed", x: 82, y: 82, tone: "human", shape: "diamond" },
      { id: "pi-alliance", label: "Alliance claim", type: "NOT ESTABLISHED", note: "Issue co-participation does not establish alliance or coalition.", evidence: "Insufficient relationship evidence", state: "Unresolved", x: 95, y: 56, tone: "unresolved", shape: "rect" },
    ],
    edges: [
      { from: "pi-inst-a", to: "pi-actor-a", label: "ROLE_IN" }, { from: "pi-inst-a", to: "pi-actor-b", label: "ROLE_IN" }, { from: "pi-inst-b", to: "pi-actor-c", label: "ROLE_IN" },
      { from: "pi-actor-a", to: "pi-role-a", label: "HOLDS_ROLE" }, { from: "pi-actor-b", to: "pi-role-b", label: "HOLDS_ROLE" }, { from: "pi-actor-c", to: "pi-role-c", label: "HOLDS_ROLE" },
      { from: "pi-role-a", to: "pi-pos-a", label: "PUBLIC_STATEMENT" }, { from: "pi-role-b", to: "pi-pos-b", label: "PUBLIC_STATEMENT" },
      { from: "pi-role-c", to: "pi-issue", label: "PARTICIPATES_IN" }, { from: "pi-pos-a", to: "pi-issue", label: "SUPPORTS_POSITION" },
      { from: "pi-pos-b", to: "pi-issue", label: "SUPPORTS_POSITION" }, { from: "pi-actor-c", to: "pi-alliance", label: "DOES NOT PROVE", state: "dashed" },
    ],
  },
  author: {
    id: "author",
    title: "Author–Article–Source / Topic Network",
    question: "What observable publication, sourcing and framing patterns recur across attributed work?",
    summary: "Human authors, unknown bylines, publications, articles, quoted sources and topics remain distinct. Recurrent patterns describe published evidence, not hidden motive.",
    legend: ["Human author", "Article", "Publication", "Quoted source", "Observed pattern"],
    nodes: [
      { id: "au-author", label: "Public author", type: "HUMAN AUTHOR", note: "The resolved human author remains separate from the publication.", evidence: "Byline and identity context", state: "Resolved", x: 9, y: 30, tone: "supported", shape: "circle" },
      { id: "au-unknown", label: "Unknown byline", type: "UNKNOWN AUTHOR", note: "A missing byline remains unknown rather than becoming the portal.", evidence: "No byline in preserved item", state: "Unresolved", x: 9, y: 70, tone: "unresolved", shape: "circle" },
      { id: "au-pub", label: "Regional publication", type: "PUBLICATION", note: "The outlet is a source entity, not a human author.", evidence: "Portal registry", state: "Resolved separately", x: 29, y: 12, tone: "analysis", shape: "rect" },
      { id: "au-art-a", label: "Earlier report", type: "ARTICLE", note: "The first article carries infrastructure framing.", evidence: "Archived article", state: "Observed", x: 34, y: 34, tone: "evidence", shape: "round" },
      { id: "au-art-b", label: "Safety update", type: "ARTICLE", note: "A later article quotes an official public source.", evidence: "Archived article and quotation", state: "Observed", x: 34, y: 57, tone: "evidence", shape: "round" },
      { id: "au-art-c", label: "Route explainer", type: "ARTICLE", note: "The latest article introduces information-coordination framing.", evidence: "Archived article", state: "Observed", x: 34, y: 80, tone: "evidence", shape: "round" },
      { id: "au-quote", label: "Official quoted source", type: "QUOTED SOURCE", note: "The quoted voice remains attributed to the institution.", evidence: "Exact quotation span", state: "Resolved speaker", x: 58, y: 19, tone: "analysis", shape: "pill" },
      { id: "au-topic", label: "Transport disruption", type: "TOPIC", note: "A shared topic supports comparison across the selected articles.", evidence: "Resolved topic observations", state: "Recurring", x: 58, y: 43, tone: "analysis", shape: "pill" },
      { id: "au-frame", label: "Preparedness framing", type: "FRAME OBSERVATION", note: "Related framing appears in two items and remains time-bounded.", evidence: "Two evidence-linked frame observations", state: "Recurring / bounded", x: 58, y: 67, tone: "human", shape: "pill" },
      { id: "au-source", label: "Official-source use", type: "SOURCE PATTERN", note: "Repeated official-source use is an observable publication pattern only.", evidence: "Cited-source lineage", state: "Observed", x: 58, y: 89, tone: "human", shape: "pill" },
      { id: "au-pattern", label: "Time-bounded pattern", type: "PATTERN", note: "The graph compares recurrence without inferring motive, ideology or coordination.", evidence: "Ordered article observations", state: "Reviewable", x: 86, y: 53, tone: "supported", shape: "diamond" },
      { id: "au-motive", label: "Hidden motive", type: "NOT CLAIMED", note: "Observable authorship patterns do not establish private intent.", evidence: "No direct evidence", state: "Not established", x: 94, y: 88, tone: "unresolved", shape: "rect" },
    ],
    edges: [
      { from: "au-author", to: "au-art-a", label: "AUTHORED" }, { from: "au-author", to: "au-art-b", label: "AUTHORED" }, { from: "au-unknown", to: "au-art-c", label: "BYLINE_MISSING", state: "dashed" },
      { from: "au-pub", to: "au-art-a", label: "PUBLISHED" }, { from: "au-pub", to: "au-art-b", label: "PUBLISHED" }, { from: "au-pub", to: "au-art-c", label: "PUBLISHED" },
      { from: "au-art-b", to: "au-quote", label: "QUOTES" }, { from: "au-art-a", to: "au-topic", label: "ABOUT" }, { from: "au-art-c", to: "au-topic", label: "ABOUT" },
      { from: "au-art-a", to: "au-frame", label: "CARRIES_FRAME" }, { from: "au-art-b", to: "au-source", label: "USES_SOURCE" },
      { from: "au-quote", to: "au-pattern", label: "OBSERVED_IN" }, { from: "au-topic", to: "au-pattern", label: "RECURS_IN" }, { from: "au-frame", to: "au-pattern", label: "RECURS_IN" },
      { from: "au-source", to: "au-pattern", label: "RECURS_IN" }, { from: "au-pattern", to: "au-motive", label: "DOES_NOT_PROVE", state: "dashed" },
    ],
  },
  "portal-source": {
    id: "portal-source",
    title: "Information Diffusion Cascade",
    question: "How did preserved information move, change language and remain dependent on its origin?",
    summary: "A public source propagates through citation, republication, translation and social amplification. Source-family grouping prevents copied volume from appearing as independent corroboration.",
    legend: ["Original", "Cites", "Republishes", "Translates", "Amplifies", "Independent"],
    nodes: [
      { id: "ps-original", label: "English official notice", type: "ORIGINAL SOURCE", note: "The earliest preserved public notice anchors the diffusion cascade.", evidence: "Archive identity and retrieval context", state: "Original located", x: 8, y: 50, tone: "supported", shape: "diamond" },
      { id: "ps-cite", label: "Independent local report", type: "CITATION", note: "A local report cites the notice and adds independently gathered route context.", evidence: "Citation plus separate reporting", state: "Potentially independent", x: 29, y: 18, tone: "supported", shape: "rect" },
      { id: "ps-hi", label: "हिन्दी report", type: "TRANSLATED REPORT", note: "The Hindi report translates and summarizes the original notice.", evidence: "Source and wording lineage", state: "Shared origin", x: 29, y: 50, tone: "analysis", shape: "rect" },
      { id: "ps-copy", label: "Syndicated copy", type: "REPUBLICATION", note: "Matching wording identifies a dependent republication.", evidence: "Syndication lineage", state: "Not independent", x: 29, y: 82, tone: "contested", shape: "rect" },
      { id: "ps-ne", label: "नेपाली portal summary", type: "TRANSLATION", note: "The Nepali summary derives from the Hindi report and shared original.", evidence: "Translation and citation lineage", state: "Dependent translation", x: 53, y: 36, tone: "analysis", shape: "round" },
      { id: "ps-rewrite", label: "Local portal rewrite", type: "REWRITE", note: "The rewrite changes wording while retaining the same origin.", evidence: "Semantic and provenance comparison", state: "Shared source family", x: 53, y: 66, tone: "contested", shape: "round" },
      { id: "ps-x", label: "Public social repost", type: "AMPLIFICATION", note: "A public repost amplifies the translated summary without adding independent evidence.", evidence: "Public repost lineage", state: "Amplification", x: 77, y: 24, tone: "evidence", shape: "circle" },
      { id: "ps-social", label: "Public social summary", type: "AMPLIFICATION", note: "A second social item summarizes the dependent rewrite.", evidence: "Public post lineage", state: "Amplification", x: 77, y: 49, tone: "evidence", shape: "circle" },
      { id: "ps-correct", label: "Published correction", type: "CORRECTION", note: "A later correction links back to affected dependent publications.", evidence: "Correction notice", state: "Observed", x: 77, y: 75, tone: "supported", shape: "pill" },
      { id: "ps-family", label: "One dependent source family", type: "SOURCE FAMILY", note: "Translation, republication and reposts remain one dependent family.", evidence: "Archive provenance graph", state: "Resolved family", x: 94, y: 46, tone: "human", shape: "diamond" },
      { id: "ps-ind", label: "Independent report", type: "INDEPENDENT SOURCE", note: "Separate reporting is retained outside the dependent family.", evidence: "Distinct provenance and observations", state: "Independent candidate", x: 94, y: 15, tone: "supported", shape: "rect" },
    ],
    edges: [
      { from: "ps-original", to: "ps-cite", label: "CITED_BY" }, { from: "ps-original", to: "ps-hi", label: "TRANSLATED", state: "dashed" }, { from: "ps-original", to: "ps-copy", label: "REPUBLISHED", state: "dashed" },
      { from: "ps-cite", to: "ps-ind", label: "SEPARATE_REPORTING" }, { from: "ps-hi", to: "ps-ne", label: "TRANSLATES", state: "dashed" }, { from: "ps-copy", to: "ps-rewrite", label: "REWRITES", state: "dashed" },
      { from: "ps-ne", to: "ps-x", label: "AMPLIFIES" }, { from: "ps-rewrite", to: "ps-social", label: "SUMMARIZES" }, { from: "ps-rewrite", to: "ps-correct", label: "CORRECTED_BY", state: "contested" },
      { from: "ps-hi", to: "ps-family", label: "MEMBER_OF" }, { from: "ps-copy", to: "ps-family", label: "MEMBER_OF" }, { from: "ps-ne", to: "ps-family", label: "MEMBER_OF" },
      { from: "ps-rewrite", to: "ps-family", label: "MEMBER_OF" }, { from: "ps-x", to: "ps-family", label: "MEMBER_OF" }, { from: "ps-social", to: "ps-family", label: "MEMBER_OF" },
    ],
  },
  "entity-relationship": {
    id: "entity-relationship",
    title: "Typed Knowledge Graph",
    question: "Which identities and relationships are supported, time-valid and evidence-backed?",
    summary: "Mentions resolve to canonical entities before typed relationships are projected. Same-name co-occurrence remains excluded when identity evidence is insufficient.",
    legend: ["Canonical entity", "Evidence", "Supported edge", "Mention only", "Unresolved identity"],
    nodes: [
      { id: "er-person", label: "Public spokesperson", type: "PERSON", note: "A canonical person identity is supported by contextual evidence.", evidence: "Name, role and source context", state: "Resolved", x: 50, y: 11, tone: "supported", shape: "circle" },
      { id: "er-role", label: "Spokesperson role", type: "ROLE", note: "The role is time-valid inside the evidence window.", evidence: "Institutional record", state: "Time-valid", x: 25, y: 31, tone: "analysis", shape: "pill" },
      { id: "er-source", label: "Official notice", type: "SOURCE", note: "The source carries the attributed public statement.", evidence: "Canonical source identity", state: "Resolved", x: 75, y: 31, tone: "evidence", shape: "rect" },
      { id: "er-inst", label: "Transport authority", type: "INSTITUTION", note: "A supported role relationship connects the person to this institution.", evidence: "Public role record", state: "Supported", x: 14, y: 55, tone: "supported", shape: "rect" },
      { id: "er-claim", label: "Temporary restriction claim", type: "CLAIM", note: "The source carries a claim attributed to the resolved spokesperson.", evidence: "Exact attributed span", state: "Observed", x: 86, y: 55, tone: "analysis", shape: "round" },
      { id: "er-event", label: "Transport disruption event", type: "EVENT", note: "The institution is involved in the public operational response.", evidence: "Event and institutional evidence", state: "Supported", x: 24, y: 79, tone: "analysis", shape: "diamond" },
      { id: "er-place", label: "Kathmandu", type: "PLACE", note: "The event is supported as occurring in the canonical place.", evidence: "Resolved event-place span", state: "Supported", x: 49, y: 91, tone: "supported", shape: "circle" },
      { id: "er-narr", label: "Safety response frame", type: "NARRATIVE", note: "The claim participates in a bounded analytical frame.", evidence: "Evidence-linked frame observation", state: "Reviewable", x: 76, y: 79, tone: "human", shape: "diamond" },
      { id: "er-mention", label: "K. Sharma", type: "MENTION", note: "A same-name mention begins as an identity candidate only.", evidence: "Exact article mention", state: "Candidate", x: 8, y: 15, tone: "evidence", shape: "pill" },
      { id: "er-candidate", label: "Same-name candidate", type: "UNRESOLVED IDENTITY", note: "Insufficient context prevents merger with the canonical person.", evidence: "Weak name match only", state: "Separated", x: 92, y: 15, tone: "unresolved", shape: "pill" },
      { id: "er-memory", label: "Reviewed investigation memory", type: "MEMORY", note: "Only reviewed relationships can enter reusable investigation memory.", evidence: "Human-reviewed relationship record", state: "Derived / rebuildable", x: 50, y: 56, tone: "human", shape: "diamond" },
    ],
    edges: [
      { from: "er-person", to: "er-role", label: "HOLDS_ROLE" }, { from: "er-person", to: "er-source", label: "QUOTED_BY" }, { from: "er-role", to: "er-inst", label: "ROLE_IN" },
      { from: "er-source", to: "er-claim", label: "CARRIES_CLAIM" }, { from: "er-inst", to: "er-event", label: "INVOLVED_IN" }, { from: "er-event", to: "er-place", label: "OCCURRED_IN" },
      { from: "er-claim", to: "er-narr", label: "PARTICIPATES_IN" }, { from: "er-event", to: "er-memory", label: "SUPPORTED_EDGE" }, { from: "er-narr", to: "er-memory", label: "SUPPORTED_EDGE" },
      { from: "er-mention", to: "er-person", label: "CANDIDATE", state: "dashed" }, { from: "er-candidate", to: "er-person", label: "SAME_NAME_ONLY", state: "dashed" },
      { from: "er-candidate", to: "er-memory", label: "EXCLUDED", state: "dashed" },
    ],
  },
};
