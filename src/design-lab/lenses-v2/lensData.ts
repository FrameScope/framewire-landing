export type LensId =
  | "narrative"
  | "sentiment"
  | "emotion"
  | "threat"
  | "fact-check"
  | "geography"
  | "politico"
  | "author"
  | "portal-source"
  | "entity-relationship";

export type LensCode = "NA" | "SE" | "EM" | "TH" | "FC" | "GE" | "PI" | "AU" | "PS" | "ER";

export type LensVisualType =
  | "narrative"
  | "sentiment"
  | "emotion"
  | "threat"
  | "verification"
  | "geography"
  | "politico"
  | "author"
  | "portal-source"
  | "entity-relationship";

export interface LensDefinition {
  id: LensId;
  code: LensCode;
  name: string;
  overview: string;
  subtitle: string;
  question: string;
  purpose: string;
  mechanism: string;
  evidence: string[];
  outputs: string[];
  boundary: string;
  limitation: string;
  maturity: string;
  visualType: LensVisualType;
  accent: "cyan" | "blue" | "violet" | "amber" | "green" | "teal" | "copper" | "indigo";
}

export const lensDefinitions: LensDefinition[] = [
  {
    id: "narrative",
    code: "NA",
    name: "Narrative Intelligence",
    overview: "Frames, claims, positions and narrative families",
    subtitle: "Trace how interpretations form, compete and persist across evidence.",
    question: "How is this issue being framed, explained, contested, and carried across evidence?",
    purpose: "Identifies evidence-grounded interpretations describing the central problem, responsible actor or force, causal logic, legitimacy evaluation, and competing interpretations.",
    mechanism: "Exact evidence spans are connected to attributed claims, carriers, targets and stance. Related claims can become positions, frames and time-bounded narrative families only when the evidence supports that structure.",
    evidence: ["Investigation-scoped evidence spans", "Attributed claims and carriers", "Targets, stance and source channels", "Time and language context"],
    outputs: ["Narrative Positions", "Claim and Narrative Families", "Frames and counterframes", "Temporal state, confidence and insufficiency"],
    boundary: "Shared actors, slogans, topics or emotions are not enough to merge a Narrative Family. Narrative observations remain analytical observations until human report review.",
    limitation: "A family remains unresolved when lineage, carrier, stance or temporal continuity is insufficient.",
    maturity: "Advanced / Active",
    visualType: "narrative",
    accent: "cyan",
  },
  {
    id: "sentiment",
    code: "SE",
    name: "Sentiment Intelligence",
    overview: "Holder, target, aspect and expressed evaluation",
    subtitle: "Read expressed evaluation without reducing a document to one mood.",
    question: "Who expresses what evaluation, toward whom or what, about which aspect, and with what intensity?",
    purpose: "Analyzes holder-target-aspect sentiment rather than generic document positivity, while separating author voice from quoted voice.",
    mechanism: "The lens resolves the holder, target and evaluated aspect, preserves the evidence span, and records positive, negative, neutral, mixed or polarized expression with bounded confidence.",
    evidence: ["Scoped text and exact spans", "Author and quoted-speaker identity", "Targets and evaluated aspects", "Time, source and geographic context"],
    outputs: ["Holder-target observations", "Aspect-level evaluation", "Canonical intensity where supported", "Trends, comparisons and missing states"],
    boundary: "Missing sentiment is not neutral sentiment. Negative sentiment must never become an automatic Threat input.",
    limitation: "Ambiguous holder, target or aspect attribution remains unresolved instead of being forced into a polarity.",
    maturity: "Active / Partial",
    visualType: "sentiment",
    accent: "blue",
  },
  {
    id: "emotion",
    code: "EM",
    name: "Emotion Intelligence",
    overview: "Experiencer, trigger and expressed emotion",
    subtitle: "Locate explicit or attributed emotion within its evidence context.",
    question: "What emotion is explicitly expressed or attributed, by whom, toward what, and in response to what trigger?",
    purpose: "Identifies expressed or attributed emotion without claiming access to a person’s private internal mental state.",
    mechanism: "Evidence phrases are resolved into experiencer, trigger, object, category, intensity and expression type, distinguishing direct, quoted, reported, attributed, performative and uncertain language.",
    evidence: ["Exact expression spans", "Experiencer and speaker attribution", "Trigger and object references", "Quotation and reporting context"],
    outputs: ["Emotion observations", "Expression and attribution type", "Category and bounded intensity", "Time trends, uncertainty and limitations"],
    boundary: "Emotion language does not prove internal mental state. Emotion alone does not establish mobilization or Threat.",
    limitation: "Implicit emotion without an evidence-grounded experiencer, trigger or attribution remains uncertain.",
    maturity: "Active / Partial",
    visualType: "emotion",
    accent: "violet",
  },
  {
    id: "threat",
    code: "TH",
    name: "Threat Intelligence",
    overview: "Evidence convergence around possible harm",
    subtitle: "Examine bounded indicators of harm, escalation and mobilization.",
    question: "What supported indicators converge around a possible harmful or escalating condition?",
    purpose: "Evaluates evidence convergence involving actors, targets, mechanisms, capability, immediacy, mobilization, recurrence, geography and verification.",
    mechanism: "Authorized threat observations are read alongside investigation evidence and bounded geographic or recurrence context. Support, contradiction, sparse data and missing mechanism evidence remain separate.",
    evidence: ["Investigation-scoped evidence", "Approved threat observations", "Actor, target and mechanism context", "Geography, recurrence and verification"],
    outputs: ["Actor-target-mechanism views", "Evidence convergence state", "Contradictions and availability", "Bounded geographic and recurrence context"],
    boundary: "Negative tone, narrative spread, stale memory or sparse data cannot silently raise Threat authority. The lens does not forecast attacks.",
    limitation: "Sparse, stale, unavailable or contradictory evidence remains visible and cannot be inflated into convergence.",
    maturity: "Active / Partial",
    visualType: "threat",
    accent: "amber",
  },
  {
    id: "fact-check",
    code: "FC",
    name: "Fact-check & Verification",
    overview: "Claims, support, contradiction and source independence",
    subtitle: "Test a precise claim against traceable and independent evidence.",
    question: "What exactly is being claimed, and what independent evidence supports, contradicts, disputes, or fails to resolve it?",
    purpose: "Decomposes checkable claims and organizes supporting, contradicting, disputed and unresolved evidence without forcing a binary verdict.",
    mechanism: "The lens preserves original wording and claimant, follows source lineage, distinguishes copied repetition from independent corroboration, and records corrections, confidence and report eligibility.",
    evidence: ["Claim wording and claimant", "Canonical Archive evidence", "Source lineage and corrections", "Independent lateral evidence"],
    outputs: ["Versioned verification findings", "Support and contradiction maps", "Source-independence context", "Supported, disputed, inconclusive or insufficient states"],
    boundary: "Repetition is not independent corroboration. Verification may challenge another lens without overwriting its original observation.",
    limitation: "When provenance, independence or decisive evidence is missing, the claim remains disputed, inconclusive or insufficient.",
    maturity: "Active / Fragmented",
    visualType: "verification",
    accent: "green",
  },
  {
    id: "geography",
    code: "GE",
    name: "Geography Intelligence",
    overview: "Typed geographic relationships",
    subtitle: "Resolve where evidence belongs without confusing mention with occurrence.",
    question: "What geographic relationship does the evidence actually support?",
    purpose: "Determines whether evidence supports a mention, occurrence, source jurisdiction, actor base, affected place, spread, scored location or investigation scope.",
    mechanism: "Country, province and district identity are resolved through stable, country-scoped references. Each owning engine retains a distinct typed relationship and its provenance.",
    evidence: ["Evidence spans with place references", "Country-scoped geographic registry", "Source, actor and event context", "Owning-engine relationship records"],
    outputs: ["Typed geographic links", "Country, province and district hierarchy", "Resolution and ambiguity state", "Provenance-aware geographic context"],
    boundary: "Mentioned place is not necessarily event location. Language is not country, and geographic volume is not automatically risk.",
    limitation: "Nepal is the active beta geography. Municipality, ward, locality and constituency authority remain outside the current canonical foundation.",
    maturity: "Active / Nepal-first",
    visualType: "geography",
    accent: "teal",
  },
  {
    id: "politico",
    code: "PI",
    name: "Politico Intelligence",
    overview: "Political actors, roles, positions and relationships",
    subtitle: "Observe political participation and public positioning without forecasting outcomes.",
    question: "Who is participating in the political environment, in what role, on which issue, and through which evidence-supported relationship?",
    purpose: "Observes political actors, institutions, time-valid roles, issue positions, rhetoric, alliances, opposition, visibility and power structures.",
    mechanism: "Canonical actors and roles are connected to attributed statements, positions and supported relationships. No-match and insufficient-evidence states remain honest rather than silently recentering the view.",
    evidence: ["Political evidence and public statements", "Canonical actor identities", "Institutions and time-valid roles", "Issue, source and verification context"],
    outputs: ["Actor and institution profiles", "Role and issue-position views", "Evidence-supported relationships", "Participation, provenance and uncertainty"],
    boundary: "Politico does not forecast elections, coalition outcomes, winners, losers, beneficiaries or political probabilities.",
    limitation: "A relationship remains absent when the available evidence does not support it; the graph must not silently substitute a different actor.",
    maturity: "Active / Partial",
    visualType: "politico",
    accent: "violet",
  },
  {
    id: "author",
    code: "AU",
    name: "Author Intelligence",
    overview: "Observable patterns in public authorship",
    subtitle: "Examine public publishing patterns without profiling hidden motives.",
    question: "What observable patterns appear in a public author’s published work?",
    purpose: "Examines how a human author repeatedly frames, sources, quotes and participates in public stories and narratives over time.",
    mechanism: "Bylines are extracted and resolved separately from portals, then linked to published articles so time-bounded framing, stance, source-use and quotation patterns can be reviewed.",
    evidence: ["Article metadata and bylines", "Published evidence spans", "Quoted speakers and cited sources", "Time-bounded narrative participation"],
    outputs: ["Human-author profiles", "Article and source links", "Recurring observable patterns", "Confidence and missing-byline states"],
    boundary: "A publication is not a person. Missing bylines remain unknown, and recurring patterns do not prove hidden motive or coordination.",
    limitation: "Current evidence may not support a stable author identity or a recurring pattern across time.",
    maturity: "Active / Partial",
    visualType: "author",
    accent: "copper",
  },
  {
    id: "portal-source",
    code: "PS",
    name: "Portal & Source Intelligence",
    overview: "Origin, republication and amplification",
    subtitle: "Trace how information moves through the source ecosystem.",
    question: "How does information move through the source ecosystem?",
    purpose: "Observes how outlets and sources originate, repeat, cite, correct, synchronize and amplify information.",
    mechanism: "Source and portal identity, original versus republished material, syndication, citation behavior, corrections and source-family context are kept visible through typed propagation paths.",
    evidence: ["Canonical Archive records", "Portal and source identities", "Retrieval and citation lineage", "Corrections and lens participation"],
    outputs: ["Source and portal profiles", "Original and republished lineage", "Source-family and independence context", "Amplification and operational health context"],
    boundary: "High volume is not influence. Repetition is not independent corroboration, and trust labels require transparent evidence and time bounds.",
    limitation: "Similarity or synchronized timing alone cannot establish coordination or independent corroboration.",
    maturity: "Active / Partial",
    visualType: "portal-source",
    accent: "teal",
  },
  {
    id: "entity-relationship",
    code: "ER",
    name: "Entity & Relationship Intelligence",
    overview: "Stable identity and evidence-backed relationships",
    subtitle: "Separate mentions from resolved identity and supported relationships.",
    question: "What entities are present, which identities are actually the same, and which relationships are supported by evidence?",
    purpose: "Establishes stable identities for people, organizations, institutions, places, sources, events, claims and narratives, then links them through evidence.",
    mechanism: "Mentions pass through type classification, alias resolution, same-name separation and temporal validity before a typed, evidence-linked relationship can be projected.",
    evidence: ["Extracted mentions and spans", "Canonical identities and aliases", "Time-valid roles and context", "Lens observations and relationship evidence"],
    outputs: ["Resolved entities and profiles", "Alias and same-name decisions", "Typed evidence-backed edges", "Scoped derived graph views"],
    boundary: "Co-occurrence is not automatically a meaningful relationship. Same name is not the same entity, and graph projections remain derived rather than canonical truth.",
    limitation: "Unresolved identity or weak co-occurrence remains a mention, not a supported relationship.",
    maturity: "Active / Partial",
    visualType: "entity-relationship",
    accent: "indigo",
  },
];

export const lensIds = lensDefinitions.map((lens) => lens.id);

export function lensFromHash(): LensDefinition {
  const id = window.location.hash.slice(1) as LensId;
  return lensDefinitions.find((lens) => lens.id === id) ?? lensDefinitions[0];
}
