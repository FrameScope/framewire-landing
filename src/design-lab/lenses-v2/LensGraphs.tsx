import { useMemo, useState, type CSSProperties } from "react";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Building2,
  CircleHelp,
  Clock3,
  Database,
  FileCheck2,
  GitBranch,
  Landmark,
  MapPin,
  MessageSquareQuote,
  Network,
  Newspaper,
  Quote,
  ShieldCheck,
  Target,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { LensDefinition, LensVisualType } from "./lensData";
import { MultilingualLensVisual } from "./MultilingualLensVisuals";
import { NativeLensVisual } from "./NativeLensVisuals";

type NodeTone = "evidence" | "analysis" | "human" | "supported" | "unresolved";
type NodeKind = "evidence" | "claim" | "people" | "target" | "activity" | "verification" | "place" | "institution" | "author" | "source" | "network" | "time" | "bookOpen" | "quote" | "alert" | "fileCheck" | "git" | "unknown";

interface GraphNode {
  id: string;
  label: string;
  type: string;
  note: string;
  evidence: string;
  state: string;
  x: number;
  y: number;
  kind: NodeKind;
  tone?: NodeTone;
}

interface GraphEdge {
  from: string;
  to: string;
  label: string;
  style?: "solid" | "dashed" | "contested";
}

interface GraphDefinition {
  title: string;
  summary: string;
  topology: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  legend: string[];
}

const icons: Record<NodeKind, LucideIcon> = {
  evidence: Database,
  claim: MessageSquareQuote,
  people: Users,
  target: Target,
  activity: Activity,
  verification: ShieldCheck,
  place: MapPin,
  institution: Landmark,
  author: UserRound,
  source: Newspaper,
  network: Network,
  time: Clock3,
  bookOpen: BookOpen,
  quote: Quote,
  alert: AlertTriangle,
  fileCheck: FileCheck2,
  git: GitBranch,
  unknown: CircleHelp,
};

const graphDefinitions: Record<LensVisualType, GraphDefinition> = {
  narrative: {
    title: "Narrative Family / Frame Graph",
    summary: "Evidence spans support attributed claims; supported claims may form positions, frames and a time-bounded Narrative Family. A counterframe remains separately visible.",
    topology: "narrative",
    legend: ["Lineage", "Contains", "CONTESTS", "Insufficient"],
    nodes: [
      { id: "n-evidence-a", label: "Official statement", type: "EVIDENCE SPAN", note: "An attributed passage preserved with its source context.", evidence: "Exact archived span", state: "Observed", x: 17, y: 83, kind: "evidence", tone: "evidence" },
      { id: "n-evidence-b", label: "Published article", type: "EVIDENCE SPAN", note: "A second source carries a related but not identical interpretation.", evidence: "Exact archived span", state: "Observed", x: 43, y: 83, kind: "evidence", tone: "evidence" },
      { id: "n-evidence-c", label: "Public response", type: "EVIDENCE SPAN", note: "A response contests the causal interpretation in the first frame.", evidence: "Exact archived span", state: "Observed", x: 77, y: 83, kind: "evidence", tone: "evidence" },
      { id: "n-claim-a", label: "Attributed claim", type: "CLAIM", note: "The carrier and target remain attached to the wording.", evidence: "Statement span and carrier", state: "Provisional", x: 20, y: 62, kind: "claim" },
      { id: "n-claim-b", label: "Causal claim", type: "CLAIM", note: "A second claim describes why the issue occurred.", evidence: "Article span and target", state: "Provisional", x: 46, y: 62, kind: "claim" },
      { id: "n-counter", label: "Counter-claim", type: "CLAIM", note: "The response explicitly contests the causal account.", evidence: "Response span", state: "Provisional", x: 78, y: 62, kind: "claim", tone: "unresolved" },
      { id: "n-position-a", label: "Responsibility position", type: "NARRATIVE POSITION", note: "Claims align around a responsible actor and legitimacy evaluation.", evidence: "Two attributed claims", state: "Supported structure", x: 30, y: 40, kind: "network" },
      { id: "n-position-b", label: "Alternative position", type: "NARRATIVE POSITION", note: "A competing interpretation remains independently inspectable.", evidence: "Counter-claim and source", state: "Provisional", x: 73, y: 40, kind: "network", tone: "unresolved" },
      { id: "n-frame-a", label: "Institutional frame", type: "FRAME", note: "The issue is explained through institutional responsibility.", evidence: "Position and lineage", state: "Active", x: 33, y: 21, kind: "bookOpen" as NodeKind },
      { id: "n-frame-b", label: "Context counterframe", type: "COUNTERFRAME", note: "A competing frame enters through an explicit CONTESTS relationship.", evidence: "Alternative position", state: "Emerging", x: 70, y: 21, kind: "network", tone: "unresolved" },
      { id: "n-family", label: "Narrative family", type: "FAMILY", note: "A time-bounded family preserves both the dominant frame and its contestation.", evidence: "Frames, positions and lineage", state: "Active / contested", x: 51, y: 7, kind: "network", tone: "analysis" },
    ],
    edges: [
      { from: "n-evidence-a", to: "n-claim-a", label: "SUPPORTS" }, { from: "n-evidence-b", to: "n-claim-b", label: "CARRIES" }, { from: "n-evidence-c", to: "n-counter", label: "CARRIES" },
      { from: "n-claim-a", to: "n-position-a", label: "FORMS" }, { from: "n-claim-b", to: "n-position-a", label: "FORMS" }, { from: "n-counter", to: "n-position-b", label: "FORMS" },
      { from: "n-position-a", to: "n-frame-a", label: "EXPRESSES" }, { from: "n-position-b", to: "n-frame-b", label: "EXPRESSES" },
      { from: "n-frame-a", to: "n-family", label: "MEMBER OF" }, { from: "n-frame-b", to: "n-family", label: "CONTESTS", style: "contested" },
    ],
  },
  sentiment: {
    title: "Holder → Target → Aspect View",
    summary: "The graph separates the person or voice expressing an evaluation from its target and evaluated aspect, then reveals a time-bounded trend.",
    topology: "sentiment",
    legend: ["EXPRESSES", "ABOUT ASPECT", "Author voice", "Quoted voice"],
    nodes: [
      { id: "s-author", label: "Article author", type: "AUTHOR VOICE", note: "The author’s own evaluative wording is separated from quotations.", evidence: "Attributed article span", state: "Resolved holder", x: 12, y: 26, kind: "author" },
      { id: "s-speaker", label: "Quoted expert", type: "QUOTED VOICE", note: "Quoted evaluation remains attributed to the speaker, not the publication.", evidence: "Direct quotation", state: "Resolved holder", x: 12, y: 66, kind: "people" },
      { id: "s-target", label: "Policy announcement", type: "TARGET", note: "Both voices evaluate the same public policy subject.", evidence: "Resolved target reference", state: "Observed", x: 42, y: 45, kind: "target" },
      { id: "s-aspect-a", label: "Implementation", type: "ASPECT", note: "The author expresses a negative evaluation of implementation.", evidence: "Aspect-specific wording", state: "Negative", x: 66, y: 22, kind: "activity" },
      { id: "s-aspect-b", label: "Communication", type: "ASPECT", note: "The quoted expert expresses a mixed evaluation of communication.", evidence: "Aspect-specific quotation", state: "Mixed", x: 66, y: 50, kind: "activity", tone: "unresolved" },
      { id: "s-aspect-c", label: "Leadership", type: "ASPECT", note: "No supported evaluation is present for leadership.", evidence: "No attributable span", state: "Unresolved", x: 66, y: 78, kind: "unknown", tone: "unresolved" },
      { id: "s-trend", label: "Evaluation trend", type: "TIME-BOUNDED VIEW", note: "Positive, mixed, negative and unresolved observations remain distinct over time.", evidence: "Scoped observations by date", state: "Mixed → Negative", x: 89, y: 49, kind: "time" },
    ],
    edges: [
      { from: "s-author", to: "s-target", label: "EXPRESSES" }, { from: "s-speaker", to: "s-target", label: "EXPRESSES" },
      { from: "s-target", to: "s-aspect-a", label: "ABOUT" }, { from: "s-target", to: "s-aspect-b", label: "ABOUT" }, { from: "s-target", to: "s-aspect-c", label: "MISSING", style: "dashed" },
      { from: "s-aspect-a", to: "s-trend", label: "NEGATIVE" }, { from: "s-aspect-b", to: "s-trend", label: "MIXED" }, { from: "s-aspect-c", to: "s-trend", label: "UNRESOLVED", style: "dashed" },
    ],
  },
  emotion: {
    title: "Expression Attribution Chain",
    summary: "An evidence phrase is resolved into experiencer, trigger, object and expressed emotion, with attribution and intensity held as separate contextual dimensions.",
    topology: "emotion",
    legend: ["ATTRIBUTED TO", "TRIGGERED BY", "DIRECTED TOWARD", "Uncertain"],
    nodes: [
      { id: "e-evidence", label: "Quoted evidence phrase", type: "EXACT SPAN", note: "The expression remains attached to its quotation and reporting context.", evidence: "Archived quotation", state: "Observed", x: 15, y: 14, kind: "evidence", tone: "evidence" },
      { id: "e-experiencer", label: "Public spokesperson", type: "EXPERIENCER", note: "The emotion is attributed to the quoted speaker, not inferred for the audience.", evidence: "Speaker attribution", state: "Resolved", x: 37, y: 28, kind: "people" },
      { id: "e-trigger", label: "Policy reversal", type: "TRIGGER", note: "The public policy change is the explicitly described trigger.", evidence: "Trigger clause", state: "Observed", x: 54, y: 45, kind: "activity" },
      { id: "e-object", label: "Implementation process", type: "OBJECT", note: "The expressed reaction is directed toward implementation.", evidence: "Object reference", state: "Observed", x: 37, y: 63, kind: "target" },
      { id: "e-emotion", label: "Expressed concern", type: "EMOTION", note: "The category describes public language, not a private mental state.", evidence: "Explicit wording", state: "Reported / moderate", x: 15, y: 78, kind: "activity" },
      { id: "e-category", label: "Category", type: "CONTEXT", note: "Concern is retained as the expressed category.", evidence: "Lexical and contextual evidence", state: "Bounded", x: 72, y: 26, kind: "bookOpen" as NodeKind },
      { id: "e-intensity", label: "Intensity", type: "CONTEXT", note: "Intensity remains bounded by the available expression.", evidence: "Expression strength", state: "Moderate", x: 82, y: 49, kind: "activity" },
      { id: "e-type", label: "Expression type", type: "CONTEXT", note: "The emotion is reported through a direct quotation.", evidence: "Quotation structure", state: "Quoted", x: 72, y: 73, kind: "quote" as NodeKind },
      { id: "e-unknown", label: "Private mental state", type: "NOT CLAIMED", note: "The graph explicitly refuses to infer private internal experience.", evidence: "No direct evidence", state: "Unresolved", x: 92, y: 85, kind: "unknown", tone: "unresolved" },
    ],
    edges: [
      { from: "e-evidence", to: "e-experiencer", label: "ATTRIBUTED TO" }, { from: "e-experiencer", to: "e-trigger", label: "RESPONDS TO" }, { from: "e-trigger", to: "e-object", label: "CONTEXTUALIZES" }, { from: "e-object", to: "e-emotion", label: "DIRECTED TOWARD" },
      { from: "e-emotion", to: "e-category", label: "CATEGORY" }, { from: "e-emotion", to: "e-intensity", label: "INTENSITY" }, { from: "e-emotion", to: "e-type", label: "EXPRESSION" }, { from: "e-emotion", to: "e-unknown", label: "DOES NOT PROVE", style: "dashed" },
    ],
  },
  threat: {
    title: "Evidence Convergence Graph",
    summary: "Actor, target, mechanism and capability indicators converge only through authorized evidence. Support, contradiction and missing information remain distinct.",
    topology: "threat",
    legend: ["CONVERGES", "SUPPORTS", "CONTRADICTS", "MISSING"],
    nodes: [
      { id: "t-actor", label: "Public actor", type: "ACTOR", note: "The actor is present in scoped evidence; intent is not automatically inferred.", evidence: "Attributed public material", state: "Observed", x: 13, y: 18, kind: "people" },
      { id: "t-target", label: "Named institution", type: "TARGET", note: "The target is explicitly named in the evidence.", evidence: "Direct target reference", state: "Observed", x: 36, y: 18, kind: "target" },
      { id: "t-mechanism", label: "Mechanism evidence", type: "MECHANISM", note: "The available material does not resolve a supported mechanism.", evidence: "Insufficient detail", state: "Missing", x: 62, y: 18, kind: "unknown", tone: "unresolved" },
      { id: "t-capability", label: "Capability context", type: "CAPABILITY", note: "Capability remains bounded and requires separate support.", evidence: "One contextual reference", state: "Sparse", x: 86, y: 18, kind: "activity", tone: "unresolved" },
      { id: "t-convergence", label: "Partial convergence", type: "CONVERGENCE", note: "Some indicators align, but mechanism and timing remain unresolved.", evidence: "Independent scoped indicators", state: "Partial / human review", x: 50, y: 48, kind: "network", tone: "human" },
      { id: "t-support", label: "Supporting indicators", type: "SUPPORT", note: "Two independent evidence spans support bounded escalation context.", evidence: "Multiple evidence spans", state: "Available", x: 21, y: 78, kind: "verification", tone: "supported" },
      { id: "t-contradict", label: "Timing disputed", type: "CONTRADICTION", note: "The timing described by sources is inconsistent.", evidence: "Contradicting source context", state: "Disputed", x: 50, y: 78, kind: "alert" as NodeKind, tone: "unresolved" },
      { id: "t-missing", label: "Mechanism unresolved", type: "MISSING EVIDENCE", note: "A harmful mechanism is not established by the available evidence.", evidence: "No qualifying span", state: "Missing", x: 79, y: 78, kind: "unknown", tone: "unresolved" },
    ],
    edges: [
      { from: "t-actor", to: "t-convergence", label: "ACTOR CONTEXT" }, { from: "t-target", to: "t-convergence", label: "TARGET CONTEXT" }, { from: "t-mechanism", to: "t-convergence", label: "MISSING", style: "dashed" }, { from: "t-capability", to: "t-convergence", label: "SPARSE", style: "dashed" },
      { from: "t-convergence", to: "t-support", label: "SUPPORT" }, { from: "t-convergence", to: "t-contradict", label: "CONTRADICT" }, { from: "t-convergence", to: "t-missing", label: "MISSING", style: "dashed" },
    ],
  },
  verification: {
    title: "Claim Evidence Graph",
    summary: "A precise claim is compared with supporting, contradicting and unresolved evidence, while source lineage tests whether apparent corroboration is independent.",
    topology: "verification",
    legend: ["SUPPORTS", "CONTRADICTS", "REPUBLISHED", "INDEPENDENT"],
    nodes: [
      { id: "f-claim", label: "Public claim", type: "CHECKABLE CLAIM", note: "The exact wording and claimant remain attached to the verification record.", evidence: "Original public statement", state: "Under review", x: 49, y: 10, kind: "claim" },
      { id: "f-support", label: "Institutional record", type: "SUPPORT", note: "A public record supports part of the claim.", evidence: "Archived official record", state: "Supporting", x: 20, y: 39, kind: "verification", tone: "supported" },
      { id: "f-contradict", label: "Source correction", type: "CONTRADICTION", note: "A later correction contradicts the claim’s stated timing.", evidence: "Correction and earlier version", state: "Contradicting", x: 49, y: 39, kind: "alert" as NodeKind, tone: "unresolved" },
      { id: "f-gap", label: "Independent confirmation", type: "EVIDENCE GAP", note: "No second independent source resolves the disputed part.", evidence: "Unavailable", state: "Insufficient", x: 79, y: 39, kind: "unknown", tone: "unresolved" },
      { id: "f-earliest", label: "Earliest source", type: "PROVENANCE", note: "The earliest located publication anchors the source lineage.", evidence: "Retrieval and publication time", state: "Located", x: 10, y: 76, kind: "source" },
      { id: "f-republish", label: "Republished wording", type: "SOURCE LINEAGE", note: "Two later items repeat the wording from the same origin.", evidence: "Syndication lineage", state: "Not independent", x: 34, y: 76, kind: "source" },
      { id: "f-independent", label: "Independent record", type: "SOURCE TEST", note: "The institutional record has a separate provenance chain.", evidence: "Independent Archive identity", state: "Independent", x: 65, y: 76, kind: "verification", tone: "supported" },
      { id: "f-state", label: "Disputed / incomplete", type: "VERIFICATION STATE", note: "Support and contradiction coexist; the unresolved portion is not forced true or false.", evidence: "Claim evidence graph", state: "Disputed", x: 90, y: 76, kind: "fileCheck" as NodeKind, tone: "human" },
    ],
    edges: [
      { from: "f-claim", to: "f-support", label: "SUPPORTS" }, { from: "f-claim", to: "f-contradict", label: "CONTRADICTS", style: "contested" }, { from: "f-claim", to: "f-gap", label: "UNRESOLVED", style: "dashed" },
      { from: "f-earliest", to: "f-republish", label: "REPUBLISHED", style: "dashed" }, { from: "f-republish", to: "f-claim", label: "REPEATS", style: "dashed" }, { from: "f-independent", to: "f-support", label: "INDEPENDENT" }, { from: "f-support", to: "f-state", label: "CONTRIBUTES" }, { from: "f-contradict", to: "f-state", label: "CONTRIBUTES" }, { from: "f-gap", to: "f-state", label: "LIMITS", style: "dashed" },
    ],
  },
  geography: {
    title: "Typed Geographic Relationship View",
    summary: "Evidence resolves through an explicit relationship type before it reaches a country-scoped hierarchy. Mention, occurrence, actor base and source jurisdiction remain separate.",
    topology: "geography",
    legend: ["OCCURRED_IN", "MENTIONS", "ACTOR_BASED_IN", "SOURCE_JURISDICTION"],
    nodes: [
      { id: "g-event", label: "Regional event", type: "EVENT", note: "The event has direct evidence supporting an occurrence relationship.", evidence: "Event record and exact place span", state: "Resolved", x: 10, y: 18, kind: "activity" },
      { id: "g-article", label: "Published article", type: "ARTICLE", note: "The article mentions a place without establishing that the event occurred there.", evidence: "Place mention span", state: "Mention only", x: 10, y: 42, kind: "source" },
      { id: "g-actor", label: "Public institution", type: "ACTOR", note: "Registry evidence supports an actor-base relationship.", evidence: "Institutional record", state: "Resolved", x: 10, y: 66, kind: "institution" },
      { id: "g-source", label: "News outlet", type: "SOURCE", note: "The source jurisdiction is independently recorded from event geography.", evidence: "Source registry context", state: "Resolved", x: 10, y: 88, kind: "source" },
      { id: "g-type-event", label: "OCCURRED_IN", type: "RELATIONSHIP", note: "Direct event evidence supports occurrence in the resolved district.", evidence: "Event-place evidence", state: "Supported", x: 35, y: 18, kind: "git" as NodeKind, tone: "supported" },
      { id: "g-type-mention", label: "MENTIONS", type: "RELATIONSHIP", note: "A textual mention remains distinct from event location.", evidence: "Article span", state: "Supported", x: 35, y: 42, kind: "git" as NodeKind },
      { id: "g-type-base", label: "ACTOR_BASED_IN", type: "RELATIONSHIP", note: "The actor’s public base is supported by a registry source.", evidence: "Institutional evidence", state: "Supported", x: 35, y: 66, kind: "git" as NodeKind },
      { id: "g-type-source", label: "SOURCE_JURISDICTION", type: "RELATIONSHIP", note: "Outlet jurisdiction describes the source, not the event.", evidence: "Source registry", state: "Supported", x: 35, y: 88, kind: "git" as NodeKind },
      { id: "g-district", label: "Resolved district", type: "DISTRICT", note: "A stable, country-scoped district identity anchors the supported relationships.", evidence: "Canonical geographic registry", state: "Resolved", x: 62, y: 52, kind: "place", tone: "supported" },
      { id: "g-province", label: "Province", type: "ADMIN 1", note: "The district belongs to a canonical province record.", evidence: "Canonical hierarchy", state: "Resolved", x: 82, y: 36, kind: "place" },
      { id: "g-country", label: "Nepal", type: "COUNTRY", note: "Nepal is the active beta country scope; unsupported countries remain unavailable.", evidence: "Country registry", state: "Active beta scope", x: 92, y: 15, kind: "place" },
      { id: "g-local", label: "Locality detail", type: "UNMODELED", note: "Locality authority is not invented when canonical geometry is unavailable.", evidence: "No canonical locality model", state: "Unavailable", x: 86, y: 76, kind: "unknown", tone: "unresolved" },
    ],
    edges: [
      { from: "g-event", to: "g-type-event", label: "EVIDENCE" }, { from: "g-article", to: "g-type-mention", label: "EVIDENCE" }, { from: "g-actor", to: "g-type-base", label: "EVIDENCE" }, { from: "g-source", to: "g-type-source", label: "EVIDENCE" },
      { from: "g-type-event", to: "g-district", label: "OCCURRED_IN" }, { from: "g-type-mention", to: "g-district", label: "MENTIONS", style: "dashed" }, { from: "g-type-base", to: "g-district", label: "ACTOR_BASED_IN" }, { from: "g-type-source", to: "g-district", label: "SOURCE_JURISDICTION", style: "dashed" },
      { from: "g-district", to: "g-province", label: "WITHIN" }, { from: "g-province", to: "g-country", label: "WITHIN" }, { from: "g-district", to: "g-local", label: "NOT MODELED", style: "dashed" },
    ],
  },
  politico: {
    title: "Political Actor / Institution Network",
    summary: "Public evidence resolves actors and time-valid institutional roles before issue positions or supported political relationships can appear.",
    topology: "politico",
    legend: ["ROLE_IN", "PUBLIC_STATEMENT", "ISSUE_POSITION", "No forecast"],
    nodes: [
      { id: "p-evidence-a", label: "Official statement", type: "EVIDENCE", note: "An attributed public statement supports one issue position.", evidence: "Archived statement span", state: "Observed", x: 23, y: 88, kind: "evidence", tone: "evidence" },
      { id: "p-evidence-b", label: "Institutional record", type: "EVIDENCE", note: "A public institutional record supports the actor’s time-valid role.", evidence: "Official record", state: "Observed", x: 76, y: 88, kind: "evidence", tone: "evidence" },
      { id: "p-position-a", label: "Supports review", type: "ISSUE POSITION", note: "The position is attributed to the actor and bounded to the public statement.", evidence: "Official statement", state: "Observed", x: 23, y: 65, kind: "claim" },
      { id: "p-position-b", label: "Requests revision", type: "ISSUE POSITION", note: "A second actor publicly requests revision of the policy.", evidence: "Published statement", state: "Observed", x: 76, y: 65, kind: "claim" },
      { id: "p-role-a", label: "Institutional role", type: "TIME-VALID ROLE", note: "The actor’s role is resolved for the relevant time period.", evidence: "Institutional record", state: "Resolved", x: 23, y: 42, kind: "people" },
      { id: "p-role-b", label: "Committee role", type: "TIME-VALID ROLE", note: "The second actor’s committee role remains distinct.", evidence: "Committee record", state: "Resolved", x: 76, y: 42, kind: "people" },
      { id: "p-actor-a", label: "Political actor A", type: "ACTOR", note: "Canonical actor identity linked to a supported public role.", evidence: "Actor registry and record", state: "Resolved", x: 32, y: 22, kind: "people" },
      { id: "p-actor-b", label: "Political actor B", type: "ACTOR", note: "A separate actor identity with independently supported evidence.", evidence: "Actor registry and record", state: "Resolved", x: 67, y: 22, kind: "people" },
      { id: "p-institution", label: "Public institution", type: "INSTITUTION", note: "The institution anchors roles; it does not imply coalition or outcome.", evidence: "Canonical institution identity", state: "Resolved", x: 50, y: 7, kind: "institution" },
      { id: "p-unresolved", label: "Alliance claim", type: "UNRESOLVED", note: "Shared issue participation does not establish an alliance.", evidence: "Insufficient relationship evidence", state: "Not established", x: 50, y: 69, kind: "unknown", tone: "unresolved" },
    ],
    edges: [
      { from: "p-evidence-a", to: "p-position-a", label: "SUPPORTS" }, { from: "p-evidence-b", to: "p-role-b", label: "SUPPORTS" }, { from: "p-position-a", to: "p-role-a", label: "ATTRIBUTED TO" }, { from: "p-position-b", to: "p-role-b", label: "ATTRIBUTED TO" },
      { from: "p-role-a", to: "p-actor-a", label: "ROLE OF" }, { from: "p-role-b", to: "p-actor-b", label: "ROLE OF" }, { from: "p-actor-a", to: "p-institution", label: "ROLE_IN" }, { from: "p-actor-b", to: "p-institution", label: "ROLE_IN" },
      { from: "p-actor-a", to: "p-unresolved", label: "CO-OCCURS", style: "dashed" }, { from: "p-actor-b", to: "p-unresolved", label: "CO-OCCURS", style: "dashed" },
    ],
  },
  author: {
    title: "Author Pattern Network",
    summary: "A human author remains distinct from publications. Articles enter over time, then observable framing, quotation and source-use patterns can be compared.",
    topology: "author",
    legend: ["AUTHORED", "USES SOURCE", "QUOTES", "Observed pattern"],
    nodes: [
      { id: "a-author", label: "Public author", type: "HUMAN AUTHOR", note: "The resolved person remains distinct from every publication carrying the work.", evidence: "Byline and identity context", state: "Resolved", x: 12, y: 48, kind: "author" },
      { id: "a-publication", label: "News publication", type: "PORTAL", note: "The publication is a source entity, not a person.", evidence: "Portal registry", state: "Resolved separately", x: 12, y: 82, kind: "source" },
      { id: "a-article-1", label: "Earlier article", type: "ARTICLE", note: "An earlier publication provides the first time-bounded observation.", evidence: "Published article", state: "Observed", x: 38, y: 20, kind: "source" },
      { id: "a-article-2", label: "Later article", type: "ARTICLE", note: "A later article supplies a second comparable observation.", evidence: "Published article", state: "Observed", x: 50, y: 48, kind: "source" },
      { id: "a-article-3", label: "Recent article", type: "ARTICLE", note: "A recent article adds source and quotation behavior.", evidence: "Published article", state: "Observed", x: 38, y: 78, kind: "source" },
      { id: "a-frame", label: "Framing pattern", type: "OBSERVATION", note: "Related framing appears across more than one article.", evidence: "Time-bounded article spans", state: "Recurring / provisional", x: 72, y: 20, kind: "bookOpen" as NodeKind },
      { id: "a-quote", label: "Quotation pattern", type: "OBSERVATION", note: "Quotation behavior is described from visible evidence, not motive.", evidence: "Attributed quotations", state: "Observed", x: 82, y: 48, kind: "quote" as NodeKind },
      { id: "a-source", label: "Source-use pattern", type: "OBSERVATION", note: "Repeated source use remains an observable pattern only.", evidence: "Cited source lineage", state: "Recurring / bounded", x: 72, y: 78, kind: "network" },
      { id: "a-limit", label: "Hidden motive", type: "NOT CLAIMED", note: "Published patterns do not establish hidden intent or coordination.", evidence: "No direct evidence", state: "Unresolved", x: 94, y: 88, kind: "unknown", tone: "unresolved" },
    ],
    edges: [
      { from: "a-author", to: "a-article-1", label: "AUTHORED" }, { from: "a-author", to: "a-article-2", label: "AUTHORED" }, { from: "a-author", to: "a-article-3", label: "AUTHORED" }, { from: "a-publication", to: "a-article-2", label: "PUBLISHED" },
      { from: "a-article-1", to: "a-frame", label: "FRAME" }, { from: "a-article-2", to: "a-frame", label: "FRAME" }, { from: "a-article-2", to: "a-quote", label: "QUOTES" }, { from: "a-article-3", to: "a-source", label: "USES SOURCE" }, { from: "a-frame", to: "a-limit", label: "DOES NOT PROVE", style: "dashed" },
    ],
  },
  "portal-source": {
    title: "Information Propagation Network",
    summary: "An original source branches into citation, republication and rewrite paths. Source-family and independence context prevent repetition from appearing as corroboration.",
    topology: "portal-source",
    legend: ["CITES", "REPUBLISHES", "REWRITES", "CORRECTS"],
    nodes: [
      { id: "ps-original", label: "Original public record", type: "ORIGINAL SOURCE", note: "The earliest located source anchors the propagation view.", evidence: "Archive identity and retrieval time", state: "Original located", x: 12, y: 48, kind: "evidence", tone: "evidence" },
      { id: "ps-outlet-a", label: "Outlet A", type: "CITATION PATH", note: "The outlet cites the original record and adds its own reporting.", evidence: "Citation and article lineage", state: "Potentially independent", x: 40, y: 18, kind: "source" },
      { id: "ps-outlet-b", label: "Outlet B", type: "REPUBLICATION", note: "The wording is republished from the original source family.", evidence: "Matching lineage", state: "Not independent", x: 40, y: 48, kind: "source", tone: "unresolved" },
      { id: "ps-outlet-c", label: "Outlet C", type: "REWRITE", note: "The source rewrites the material while retaining the same origin.", evidence: "Source and text lineage", state: "Shared origin", x: 40, y: 78, kind: "source" },
      { id: "ps-correction", label: "Published correction", type: "CORRECTION", note: "A later correction is linked to the affected propagation path.", evidence: "Correction notice", state: "Observed", x: 68, y: 8, kind: "verification", tone: "supported" },
      { id: "ps-family", label: "Source family", type: "LINEAGE CONTEXT", note: "Republications and rewrites remain grouped by shared origin.", evidence: "Archive and syndication evidence", state: "Resolved", x: 67, y: 46, kind: "network" },
      { id: "ps-amplification", label: "Amplification pattern", type: "PROPAGATION", note: "Volume describes propagation but not influence or truth.", evidence: "Time-bounded source paths", state: "Observed", x: 88, y: 47, kind: "activity" },
      { id: "ps-independent", label: "Independent source?", type: "REVIEW STATE", note: "Independence requires separate provenance, not repeated wording.", evidence: "Source lineage review", state: "Mixed", x: 68, y: 82, kind: "unknown", tone: "human" },
    ],
    edges: [
      { from: "ps-original", to: "ps-outlet-a", label: "CITED BY" }, { from: "ps-original", to: "ps-outlet-b", label: "REPUBLISHED", style: "dashed" }, { from: "ps-original", to: "ps-outlet-c", label: "REWRITTEN", style: "dashed" },
      { from: "ps-outlet-a", to: "ps-correction", label: "CORRECTS", style: "contested" }, { from: "ps-outlet-b", to: "ps-family", label: "SAME FAMILY" }, { from: "ps-outlet-c", to: "ps-family", label: "SAME FAMILY" },
      { from: "ps-correction", to: "ps-amplification", label: "UPDATES" }, { from: "ps-family", to: "ps-amplification", label: "AMPLIFIES" }, { from: "ps-family", to: "ps-independent", label: "LIMITS", style: "dashed" },
    ],
  },
  "entity-relationship": {
    title: "Typed Entity Relationship Graph",
    summary: "A mention becomes an identity candidate, then a resolved entity. Only evidence-backed, time-valid edges become supported relationship projections.",
    topology: "entity-relationship",
    legend: ["MENTION", "ROLE_IN", "QUOTED_BY", "SUPPORTED EDGE"],
    nodes: [
      { id: "er-mention", label: "Name mention", type: "MENTION", note: "A name in evidence begins as a mention, not a resolved person.", evidence: "Exact article span", state: "Candidate", x: 8, y: 18, kind: "claim", tone: "evidence" },
      { id: "er-alias", label: "Alias resolution", type: "IDENTITY STEP", note: "Aliases and same-name candidates are compared without guessing.", evidence: "Identity registry and context", state: "Reviewable", x: 28, y: 18, kind: "git" as NodeKind },
      { id: "er-person", label: "Resolved person", type: "PERSON", note: "Stable identity is established with time-valid context.", evidence: "Alias and contextual evidence", state: "Resolved", x: 50, y: 18, kind: "people", tone: "supported" },
      { id: "er-institution", label: "Public institution", type: "INSTITUTION", note: "A role relationship connects the person to the institution for a defined period.", evidence: "Institutional record", state: "Supported", x: 30, y: 49, kind: "institution" },
      { id: "er-source", label: "Published source", type: "SOURCE", note: "The source carries the quotation and remains a distinct entity.", evidence: "Archive and source identity", state: "Resolved", x: 70, y: 49, kind: "source" },
      { id: "er-event", label: "Regional event", type: "EVENT", note: "Evidence supports involvement in the event without implying every co-occurrence is meaningful.", evidence: "Event and role evidence", state: "Supported", x: 24, y: 80, kind: "activity" },
      { id: "er-claim", label: "Attributed claim", type: "CLAIM", note: "The source carries a claim attributed to the resolved person.", evidence: "Quotation span", state: "Observed", x: 76, y: 80, kind: "claim" },
      { id: "er-projection", label: "Derived relationship projection", type: "SCOPED GRAPH", note: "The graph view is rebuilt from canonical identities and evidence-backed edges.", evidence: "Typed relationship records", state: "Derived / reviewable", x: 50, y: 92, kind: "network", tone: "human" },
      { id: "er-cooccur", label: "Same-name co-occurrence", type: "NOT A RELATIONSHIP", note: "A second same-name mention remains separated because identity evidence is insufficient.", evidence: "Weak co-occurrence only", state: "Unresolved", x: 91, y: 20, kind: "unknown", tone: "unresolved" },
    ],
    edges: [
      { from: "er-mention", to: "er-alias", label: "CANDIDATE" }, { from: "er-alias", to: "er-person", label: "RESOLVES TO" }, { from: "er-person", to: "er-institution", label: "ROLE_IN" }, { from: "er-person", to: "er-source", label: "QUOTED_BY" },
      { from: "er-institution", to: "er-event", label: "INVOLVED_IN" }, { from: "er-source", to: "er-claim", label: "CARRIES_CLAIM" }, { from: "er-event", to: "er-projection", label: "SUPPORTED EDGE" }, { from: "er-claim", to: "er-projection", label: "SUPPORTED EDGE" },
      { from: "er-person", to: "er-cooccur", label: "SAME NAME ONLY", style: "dashed" }, { from: "er-cooccur", to: "er-projection", label: "EXCLUDED", style: "dashed" },
    ],
  },
};

function resolveIcon(kind: NodeKind): LucideIcon {
  return icons[kind] ?? Building2;
}

function GenericLensGraph({ lens }: { lens: LensDefinition }) {
  const graph = graphDefinitions[lens.visualType];
  const [activeId, setActiveId] = useState(graph.nodes[0].id);
  const activeNode = graph.nodes.find((node) => node.id === activeId) ?? graph.nodes[0];
  const connectedIds = useMemo(() => {
    const ids = new Set<string>([activeNode.id]);
    graph.edges.forEach((edge) => {
      if (edge.from === activeNode.id) ids.add(edge.to);
      if (edge.to === activeNode.id) ids.add(edge.from);
    });
    return ids;
  }, [activeNode.id, graph.edges]);
  const activeRelationship = graph.edges.find((edge) => edge.from === activeNode.id || edge.to === activeNode.id)?.label ?? "EVIDENCE CONTEXT";

  return (
    <div className={`l2-graph-shell accent-${lens.accent}`} aria-label={`${lens.name} analytical visualization`}>
      <header className="l2-graph-header">
        <div><span>ANALYTICAL VIEW</span><strong>{graph.title}</strong></div>
        <ul aria-label="Relationship legend">{graph.legend.map((item) => <li key={item}>{item}</li>)}</ul>
      </header>

      <div className={`l2-network topology-${graph.topology}`}>
        <p className="l2-sr-only">{graph.summary}</p>
        <svg className="l2-graph-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {graph.edges.map((edge, index) => {
            const from = graph.nodes.find((node) => node.id === edge.from)!;
            const to = graph.nodes.find((node) => node.id === edge.to)!;
            const active = edge.from === activeNode.id || edge.to === activeNode.id;
            return (
              <g key={`${edge.from}-${edge.to}`} className={`${active ? "active" : ""} edge-${edge.style ?? "solid"}`} style={{ "--edge-delay": `${120 + index * 42}ms` } as CSSProperties}>
                <path d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`} />
                <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 1.3}>{edge.label}</text>
              </g>
            );
          })}
        </svg>

        {graph.nodes.map((node, index) => {
          const Icon = resolveIcon(node.kind);
          const active = node.id === activeNode.id;
          const related = connectedIds.has(node.id);
          return (
            <button
              key={node.id}
              type="button"
              className={`l2-graph-node tone-${node.tone ?? "analysis"} ${active ? "active" : ""} ${related ? "related" : "dimmed"}`}
              style={{ "--x": `${node.x}%`, "--y": `${node.y}%`, "--node-delay": `${80 + index * 48}ms` } as CSSProperties}
              aria-pressed={active}
              aria-controls="l2-graph-detail"
              aria-label={`${node.type}: ${node.label}. ${node.note}`}
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              onClick={() => setActiveId(node.id)}
            >
              <span><Icon size={16} aria-hidden="true" />{node.type}</span>
              <strong>{node.label}</strong>
              <small>{node.state}</small>
            </button>
          );
        })}
      </div>

      <div id="l2-graph-detail" className="l2-graph-detail" role="status" aria-live="polite">
        <div className="l2-detail-title"><span>SELECTED OBSERVATION</span><strong>{activeNode.label}</strong><p>{activeNode.note}</p></div>
        <dl>
          <div><dt>Relationship</dt><dd>{activeRelationship}</dd></div>
          <div><dt>Evidence basis</dt><dd>{activeNode.evidence}</dd></div>
          <div><dt>State</dt><dd>{activeNode.state}</dd></div>
          <div><dt>Limitation</dt><dd>{lens.limitation}</dd></div>
        </dl>
      </div>
    </div>
  );
}

export function LensGraph({ lens }: { lens: LensDefinition }) {
  if (lens.visualType === "narrative" || lens.visualType === "sentiment" || lens.visualType === "emotion") {
    return <MultilingualLensVisual lens={lens} />;
  }
  if (["threat", "verification", "geography", "politico", "author", "portal-source", "entity-relationship"].includes(lens.visualType)) {
    return <NativeLensVisual lens={lens} />;
  }
  return <GenericLensGraph lens={lens} />;
}
