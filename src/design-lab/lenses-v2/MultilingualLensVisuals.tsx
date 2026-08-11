import { useMemo, useState, type CSSProperties } from "react";
import { GitBranch, MessageSquareText, Network, Newspaper, Radio } from "lucide-react";
import type { LensDefinition } from "./lensData";
import {
  MultilingualEvidencePreview,
  MultilingualFilterBar,
  type LanguageFilter,
  type SourceFilter,
} from "./MultilingualEvidencePreview";
import { multilingualEvidence, type MultilingualEvidenceItem } from "./multilingualEvidenceData";
import {
  InterpretationStrip,
  LensAuthorityBoundary,
  MultilingualSecondaryAnalysis,
  RelatedLensContext,
} from "./LensAnalyticalSupport";

function useEvidenceFilters() {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>("all");
  const matches = (item: MultilingualEvidenceItem) =>
    (sourceFilter === "all" || item.sourceType === sourceFilter) &&
    (languageFilter === "all" || item.language === languageFilter);
  return { sourceFilter, languageFilter, setSourceFilter, setLanguageFilter, matches };
}

function MultilingualViewHeader({ title, summary }: { title: string; summary: string }) {
  return (
    <header className="ml-view-header">
      <div><span>MULTILINGUAL EVIDENCE VIEW</span><strong>{title}</strong><p>{summary}</p></div>
      <div className="ml-language-line"><b lang="ne">नेपाली</b><i /><b lang="hi">हिन्दी</b><i /><b>English</b></div>
    </header>
  );
}

type NarrativeKind = "evidence" | "claim" | "frame" | "family" | "counter" | "unresolved";

interface NarrativeNode {
  id: string;
  label: string;
  type: string;
  kind: NarrativeKind;
  x: number;
  y: number;
  evidenceId?: string;
  connectedEvidence: string[];
}

interface NarrativeEdge {
  from: string;
  to: string;
  label: string;
  relation?: "strong" | "contests" | "qualifies";
}

const narrativeNodes: NarrativeNode[] = [
  { id: "ev-ne-news", label: "Nepali News", type: "NEWS EVIDENCE", kind: "evidence", x: 7, y: 74, evidenceId: "ne-news-transport", connectedEvidence: ["ne-news-transport"] },
  { id: "ev-ne-infra", label: "Nepali Social", type: "SOCIAL EVIDENCE", kind: "evidence", x: 18, y: 86, evidenceId: "ne-social-infrastructure", connectedEvidence: ["ne-social-infrastructure"] },
  { id: "ev-ne-safety", label: "Nepali Social", type: "SOCIAL EVIDENCE", kind: "evidence", x: 30, y: 75, evidenceId: "ne-social-safety", connectedEvidence: ["ne-social-safety"] },
  { id: "ev-hi-news", label: "Hindi News", type: "NEWS EVIDENCE", kind: "evidence", x: 41, y: 86, evidenceId: "hi-news-restrictions", connectedEvidence: ["hi-news-restrictions"] },
  { id: "ev-hi-infra", label: "Hindi Social", type: "SOCIAL EVIDENCE", kind: "evidence", x: 52, y: 75, evidenceId: "hi-social-infrastructure", connectedEvidence: ["hi-social-infrastructure"] },
  { id: "ev-hi-info", label: "Hindi Social", type: "SOCIAL EVIDENCE", kind: "evidence", x: 63, y: 86, evidenceId: "hi-social-information", connectedEvidence: ["hi-social-information"] },
  { id: "ev-en-official", label: "English Official", type: "OFFICIAL EVIDENCE", kind: "evidence", x: 74, y: 75, evidenceId: "en-official-guidance", connectedEvidence: ["en-official-guidance"] },
  { id: "ev-en-status", label: "Institutional Update", type: "OFFICIAL EVIDENCE", kind: "evidence", x: 85, y: 86, evidenceId: "en-institutional-status", connectedEvidence: ["en-institutional-status"] },
  { id: "ev-ne-attributed", label: "Nepali News", type: "REPORTED EVIDENCE", kind: "evidence", x: 94, y: 74, evidenceId: "ne-news-attributed-concern", connectedEvidence: ["ne-news-attributed-concern"] },
  { id: "ev-hi-official", label: "Hindi Official", type: "OFFICIAL EVIDENCE", kind: "evidence", x: 96, y: 86, evidenceId: "hi-official-locality", connectedEvidence: ["hi-official-locality"] },
  { id: "claim-preparedness", label: "Recurring disruption", type: "CLAIM / INTERPRETATION", kind: "claim", x: 24, y: 59, connectedEvidence: ["ne-social-infrastructure", "hi-social-infrastructure", "ne-news-attributed-concern"] },
  { id: "claim-safety", label: "Avoid risk exposure", type: "CLAIM / INTERPRETATION", kind: "claim", x: 47, y: 64, connectedEvidence: ["ne-news-transport", "ne-social-safety", "en-official-guidance"] },
  { id: "claim-coordination", label: "Timely local information", type: "CLAIM / INTERPRETATION", kind: "claim", x: 69, y: 59, connectedEvidence: ["hi-social-information", "hi-official-locality"] },
  { id: "claim-temporary", label: "Conditions remain temporary", type: "QUALIFYING CLAIM", kind: "claim", x: 84, y: 63, connectedEvidence: ["hi-news-restrictions", "en-institutional-status"] },
  { id: "frame-preparedness", label: "Infrastructure Preparedness", type: "FRAME", kind: "frame", x: 20, y: 36, connectedEvidence: ["ne-social-infrastructure", "hi-social-infrastructure", "ne-news-attributed-concern"] },
  { id: "frame-safety", label: "Immediate Public Safety", type: "FRAME", kind: "frame", x: 45, y: 39, connectedEvidence: ["ne-news-transport", "ne-social-safety", "en-official-guidance"] },
  { id: "frame-coordination", label: "Information & Coordination", type: "FRAME", kind: "frame", x: 67, y: 35, connectedEvidence: ["hi-social-information", "hi-official-locality"] },
  { id: "frame-temporary", label: "Temporary Disruption", type: "COUNTERFRAME", kind: "counter", x: 86, y: 39, connectedEvidence: ["hi-news-restrictions", "en-institutional-status"] },
  { id: "family-continuity", label: "Preparedness & continuity", type: "NARRATIVE FAMILY", kind: "family", x: 29, y: 13, connectedEvidence: ["ne-social-infrastructure", "hi-social-infrastructure", "ne-news-attributed-concern"] },
  { id: "family-response", label: "Safety response", type: "NARRATIVE FAMILY", kind: "family", x: 60, y: 13, connectedEvidence: ["ne-news-transport", "ne-social-safety", "en-official-guidance", "hi-social-information", "hi-official-locality"] },
  { id: "unassigned", label: "Unassigned / insufficient", type: "OPEN ANALYTICAL STATE", kind: "unresolved", x: 88, y: 13, connectedEvidence: ["hi-news-restrictions", "en-institutional-status"] },
];

const narrativeEdges: NarrativeEdge[] = [
  { from: "ev-ne-infra", to: "claim-preparedness", label: "CARRIES" }, { from: "ev-hi-infra", to: "claim-preparedness", label: "CARRIES" }, { from: "ev-ne-attributed", to: "claim-preparedness", label: "QUALIFIES", relation: "qualifies" },
  { from: "ev-ne-news", to: "claim-safety", label: "SUPPORTS" }, { from: "ev-ne-safety", to: "claim-safety", label: "SUPPORTS" }, { from: "ev-en-official", to: "claim-safety", label: "SUPPORTS" },
  { from: "ev-hi-info", to: "claim-coordination", label: "CARRIES" }, { from: "ev-hi-official", to: "claim-coordination", label: "SUPPORTS" },
  { from: "ev-hi-news", to: "claim-temporary", label: "QUALIFIES", relation: "qualifies" }, { from: "ev-en-status", to: "claim-temporary", label: "QUALIFIES", relation: "qualifies" },
  { from: "claim-preparedness", to: "frame-preparedness", label: "FORMS", relation: "strong" }, { from: "claim-safety", to: "frame-safety", label: "FORMS", relation: "strong" },
  { from: "claim-coordination", to: "frame-coordination", label: "FORMS", relation: "strong" }, { from: "claim-temporary", to: "frame-temporary", label: "FORMS", relation: "strong" },
  { from: "frame-preparedness", to: "family-continuity", label: "MEMBER OF", relation: "strong" }, { from: "frame-safety", to: "family-response", label: "MEMBER OF", relation: "strong" },
  { from: "frame-coordination", to: "family-response", label: "QUALIFIES", relation: "qualifies" }, { from: "frame-temporary", to: "family-continuity", label: "CONTESTS", relation: "contests" },
  { from: "frame-temporary", to: "unassigned", label: "INSUFFICIENT", relation: "qualifies" },
];

function narrativePath(from: NarrativeNode, to: NarrativeNode) {
  const midX = (from.x + to.x) / 2;
  const bendY = Math.min(from.y, to.y) - Math.max(3, Math.abs(from.x - to.x) * 0.05);
  return `M ${from.x} ${from.y} Q ${midX} ${bendY} ${to.x} ${to.y}`;
}

function NarrativeMultilingualGraph({ lens }: { lens: LensDefinition }) {
  const filters = useEvidenceFilters();
  const [activeNodeId, setActiveNodeId] = useState("frame-preparedness");
  const activeNode = narrativeNodes.find((node) => node.id === activeNodeId) ?? narrativeNodes[0];
  const activeEvidence = multilingualEvidence.find((item) => item.id === activeNode.evidenceId) ?? multilingualEvidence.find((item) => activeNode.connectedEvidence.includes(item.id)) ?? multilingualEvidence[0];
  const directlyConnected = useMemo(() => {
    const values = new Set<string>([activeNode.id]);
    narrativeEdges.forEach((edge) => {
      if (edge.from === activeNode.id) values.add(edge.to);
      if (edge.to === activeNode.id) values.add(edge.from);
    });
    activeNode.connectedEvidence.forEach((evidenceId) => {
      const node = narrativeNodes.find((candidate) => candidate.evidenceId === evidenceId);
      if (node) values.add(node.id);
    });
    return values;
  }, [activeNode]);

  const nodeMatches = (node: NarrativeNode) => {
    const evidence = node.evidenceId ? multilingualEvidence.find((item) => item.id === node.evidenceId) : null;
    if (evidence) return filters.matches(evidence);
    return node.connectedEvidence.some((id) => {
      const item = multilingualEvidence.find((candidate) => candidate.id === id);
      return item ? filters.matches(item) : false;
    });
  };

  return (
    <div className={`ml-visual-shell ml-narrative-shell accent-${lens.accent}`} aria-label="Narrative Structure in Selected Evidence">
      <MultilingualViewHeader title="Multilingual Narrative Network" summary="One preserved evidence set. Multiple possible frames. No automatic dominant truth." />
      <MultilingualFilterBar sourceFilter={filters.sourceFilter} languageFilter={filters.languageFilter} onSourceChange={filters.setSourceFilter} onLanguageChange={filters.setLanguageFilter} />
      <div className="ml-analytical-grid">
        <section className="ml-narrative-canvas" aria-label="Interactive multilingual narrative relationship field">
          <p className="l2-sr-only">Evidence in Nepali, Hindi and English connects to bounded claims, frames, narrative families and unresolved states. Selecting a node highlights only its supported relationships.</p>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {narrativeEdges.map((edge, index) => {
              const from = narrativeNodes.find((node) => node.id === edge.from)!;
              const to = narrativeNodes.find((node) => node.id === edge.to)!;
              const active = directlyConnected.has(edge.from) && directlyConnected.has(edge.to);
              return <g key={`${edge.from}-${edge.to}`} className={`${active ? "active" : ""} relation-${edge.relation ?? "evidence"}`} style={{ "--edge-order": index } as CSSProperties}><path d={narrativePath(from, to)} /><text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 1}>{edge.label}</text></g>;
            })}
          </svg>
          {narrativeNodes.map((node, index) => {
            const evidence = node.evidenceId ? multilingualEvidence.find((item) => item.id === node.evidenceId) : null;
            const active = node.id === activeNode.id;
            const related = directlyConnected.has(node.id);
            const visible = nodeMatches(node);
            return (
              <button key={node.id} type="button" data-kind={node.kind} className={`${active ? "active" : ""} ${related ? "related" : "unrelated"} ${visible ? "filter-match" : "filter-dim"}`} style={{ "--x": `${node.x}%`, "--y": `${node.y}%`, "--node-order": index } as CSSProperties} aria-pressed={active} aria-label={`${node.type}: ${node.label}${evidence ? `. ${evidence.languageLabel} ${evidence.sourceType} evidence.` : "."}`} onMouseEnter={() => setActiveNodeId(node.id)} onFocus={() => setActiveNodeId(node.id)} onClick={() => setActiveNodeId(node.id)}>
                <span>{node.kind === "evidence" ? <Newspaper size={12} aria-hidden="true" /> : node.kind === "claim" ? <MessageSquareText size={12} aria-hidden="true" /> : node.kind === "family" ? <Network size={12} aria-hidden="true" /> : <GitBranch size={12} aria-hidden="true" />}{node.type}</span>
                <strong>{node.label}</strong>
                {evidence && <small lang={evidence.language}>{evidence.languageLabel} · {evidence.sourceType}</small>}
              </button>
            );
          })}
          <div className="ml-mobile-frame-list" aria-label="Selectable narrative frames">
            {narrativeNodes.filter((node) => ["frame", "counter", "unresolved"].includes(node.kind)).map((node) => <button key={node.id} type="button" aria-pressed={node.id === activeNode.id} onClick={() => setActiveNodeId(node.id)}><span>{node.type}</span><strong>{node.label}</strong><small>{node.connectedEvidence.length} connected evidence observations</small></button>)}
          </div>
          <footer className="ml-narrative-legend">
            {[["evidence", "Evidence"], ["claim", "Claim / Interpretation"], ["frame", "Frame"], ["family", "Narrative Family"], ["counter", "Counterframe"], ["unresolved", "Unresolved"]].map(([kind, label]) => <span key={kind} data-kind={kind}><i />{label}</span>)}
          </footer>
        </section>
        <MultilingualEvidencePreview item={activeEvidence}
          selectionLabel={activeNode.kind === "family" ? "SELECTED NARRATIVE FAMILY" : activeNode.kind === "frame" || activeNode.kind === "counter" ? "SELECTED FRAME" : activeNode.kind === "claim" ? "SELECTED CLAIM" : "SELECTED EVIDENCE"}
          selectionTitle={activeNode.label}
          selectionSummary={`${activeNode.type} · ${activeNode.connectedEvidence.length} evidence observation${activeNode.connectedEvidence.length === 1 ? "" : "s"} in scope`}
          context={[
            { label: "Source type", value: activeEvidence.sourceType, state: "supported" },
            { label: "Carrier", value: activeEvidence.carrierLabel, state: "supported" },
            { label: "Connected claim", value: activeEvidence.narrative.claim, state: "qualified" },
            { label: "Connected frame", value: activeNode.kind === "evidence" ? activeEvidence.narrative.frame : activeNode.label, state: activeNode.kind === "unresolved" ? "missing" : "supported" },
            { label: "Narrative family", value: activeEvidence.narrative.family, state: activeEvidence.narrative.family === "Unresolved" ? "missing" : "qualified" },
            { label: "Analytical role", value: activeEvidence.narrative.relation.toUpperCase(), state: activeEvidence.narrative.relation === "contests" ? "contested" : "qualified" },
            { label: "Evidence state", value: activeNode.kind === "unresolved" ? "Insufficient / unassigned" : "In investigation scope", state: activeNode.kind === "unresolved" ? "missing" : "supported" },
            { label: "Source family", value: activeEvidence.sourceFamily ?? "Unresolved", state: activeEvidence.sourceFamily ? "qualified" : "missing" },
          ]} boundary="One source does not establish a Narrative Family. Shared vocabulary does not prove coordination; narrative structure does not establish factual truth or population opinion." />
      </div>
      <div className="ml-support-grid"><MultilingualSecondaryAnalysis lensId="narrative" activeItem={activeEvidence} /><RelatedLensContext lensId="narrative" /></div>
      <InterpretationStrip note="Frame movement shows ordered evidence participation, not influence, virality or factual truth." />
      <LensAuthorityBoundary observes="Claims, frames, counterframes, family membership and temporal continuity in scoped evidence." refuses="Coordination from shared wording, factual truth from structure, or public opinion from prevalence." />
    </div>
  );
}

function sentimentX(item: MultilingualEvidenceItem) { return 10 + (((item.sentiment?.polarityValue ?? 0) + 1) / 2) * 80; }
function sentimentY(item: MultilingualEvidenceItem) { return 88 - (item.sentiment?.intensity ?? 0.1) * 72; }

function SentimentMultilingualGraph({ lens }: { lens: LensDefinition }) {
  const filters = useEvidenceFilters();
  const observations = multilingualEvidence.filter((item) => item.sentiment);
  const [activeId, setActiveId] = useState("ne-social-infrastructure");
  const activeItem = observations.find((item) => item.id === activeId) ?? observations[0];
  const sentiment = activeItem.sentiment!;

  return (
    <div className={`ml-visual-shell ml-landscape-shell accent-${lens.accent}`} aria-label="Sentiment Observed in Selected Evidence">
      <MultilingualViewHeader title="Multilingual Sentiment Landscape" summary="Holder, target and aspect remain attached to every expressed evaluation." />
      <MultilingualFilterBar sourceFilter={filters.sourceFilter} languageFilter={filters.languageFilter} onSourceChange={filters.setSourceFilter} onLanguageChange={filters.setLanguageFilter} />
      <div className="ml-analytical-grid">
        <section className="ml-plot-column">
          <div className="ml-scatter ml-sentiment-scatter" aria-label="Interactive sentiment polarity and intensity plot">
            <p className="l2-sr-only">The horizontal axis moves from negative to positive evaluation. The vertical axis moves from low to high expression intensity. Bubble size indicates recurrence only inside this illustrative evidence set.</p>
            <span className="axis-y top">HIGH EXPRESSION INTENSITY</span><span className="axis-y bottom">LOW EXPRESSION INTENSITY</span><span className="axis-x left">NEGATIVE EVALUATION</span><span className="axis-x right">POSITIVE EVALUATION</span>
            <i className="axis-line x" aria-hidden="true" /><i className="axis-line y" aria-hidden="true" />
            {observations.map((item, index) => {
              const value = item.sentiment!;
              const match = filters.matches(item);
              const active = item.id === activeItem.id;
              return <button key={item.id} type="button" data-source={item.sourceType} data-language={item.language} data-polarity={value.polarity} className={`${active ? "active" : ""} ${match ? "filter-match" : "filter-dim"}`} style={{ "--x": `${sentimentX(item)}%`, "--y": `${sentimentY(item)}%`, "--bubble": `${30 + value.recurrence * 8}px`, "--bubble-order": index } as CSSProperties} aria-pressed={active} aria-label={`${item.languageLabel} ${item.sourceType} evidence. ${value.polarity} sentiment toward ${value.target}, ${value.aspect}.`} onFocus={() => setActiveId(item.id)} onMouseEnter={() => setActiveId(item.id)} onClick={() => setActiveId(item.id)}><span lang={item.language}>{item.language === "en" ? "EN" : item.languageLabel}</span><small>{item.sourceType}</small></button>;
            })}
          </div>
          <div className="ml-plot-legend">
            <span><i className="size" />Size = observation recurrence in this evidence set</span><span><i className="news" />News</span><span><i className="social" />Social</span><span><i className="official" />Official</span><strong>Not population opinion</strong>
          </div>
          <div className="ml-trend-strip" aria-label="Sentiment sequence across the illustrative evidence window">
            <header><span>OBSERVATION SEQUENCE</span><small>Earlier evidence → Later evidence</small></header>
            <div>{observations.map((item) => <button key={item.id} type="button" className={item.id === activeItem.id ? "active" : ""} data-polarity={item.sentiment!.polarity} aria-label={`Select ${item.semanticLabel}: ${item.sentiment!.polarity}`} onClick={() => setActiveId(item.id)}><i /><span>{item.language === "en" ? "EN" : item.languageLabel}</span></button>)}</div>
          </div>
        </section>
        <MultilingualEvidencePreview item={activeItem} selectionLabel="SELECTED SENTIMENT OBSERVATION" selectionSummary={`${activeItem.sourceType} · ${activeItem.topic}`} context={[
          { label: "Source type", value: activeItem.sourceType, state: "supported" }, { label: "Holder", value: sentiment.holder, state: "supported" },
          { label: "Target", value: sentiment.target, state: "supported" }, { label: "Aspect", value: sentiment.aspect, state: "supported" },
          { label: "Polarity", value: sentiment.polarity === "unresolved" ? "Unresolved — not forced to neutral" : sentiment.polarity, state: sentiment.polarity === "unresolved" ? "missing" : "qualified" },
          { label: "Intensity", value: sentiment.intensity >= .75 ? "Strong" : sentiment.intensity >= .45 ? "Moderate" : "Low", state: "qualified" },
          { label: "Attribution", value: sentiment.holder === activeItem.carrierLabel ? "Carrier voice" : "Attributed holder", state: "qualified" },
          { label: "Evidence basis", value: "Exact evaluative span in preserved source", state: "supported" },
        ]} boundary="This is evidence-backed expressed sentiment in selected material, not population-wide opinion. Missing sentiment is not neutral, and negative sentiment does not automatically become Threat." />
      </div>
      <div className="ml-support-grid"><MultilingualSecondaryAnalysis lensId="sentiment" activeItem={activeItem} /><RelatedLensContext lensId="sentiment" /></div>
      <InterpretationStrip note="The diverging distribution compares observations inside this illustrative evidence window; it is not polling or national mood." />
      <LensAuthorityBoundary observes="Attributed stance, target, aspect, polarity and expression intensity in selected material." refuses="Population opinion, public approval, factual truth, or Threat from negative tone alone." />
    </div>
  );
}

function emotionX(item: MultilingualEvidenceItem, index: number) {
  if (item.emotion.category === "unresolved") return 42 + (index % 5) * 4;
  return 10 + ((item.emotion.valence + 1) / 2) * 80;
}
function emotionY(item: MultilingualEvidenceItem, index: number) {
  if (item.emotion.category === "unresolved") return 73 + (index % 3) * 7;
  return 88 - item.emotion.arousal * 72;
}

function EmotionMultilingualGraph({ lens }: { lens: LensDefinition }) {
  const filters = useEvidenceFilters();
  const [activeId, setActiveId] = useState("ne-social-safety");
  const activeItem = multilingualEvidence.find((item) => item.id === activeId) ?? multilingualEvidence[0];
  const emotion = activeItem.emotion;

  return (
    <div className={`ml-visual-shell ml-landscape-shell accent-${lens.accent}`} aria-label="Emotion Observed in Selected Evidence">
      <MultilingualViewHeader title="Multilingual Emotion Landscape" summary="Expressed and attributed emotional language stays separate from private mental state." />
      <MultilingualFilterBar sourceFilter={filters.sourceFilter} languageFilter={filters.languageFilter} onSourceChange={filters.setSourceFilter} onLanguageChange={filters.setLanguageFilter} />
      <div className="ml-analytical-grid">
        <section className="ml-plot-column">
          <div className="ml-scatter ml-emotion-scatter" aria-label="Interactive valence and activation plot">
            <p className="l2-sr-only">The horizontal axis moves from unpleasant to pleasant expression. The vertical axis moves from calm to activated language. Dashed observations indicate unresolved or not expressed emotion.</p>
            <span className="axis-y top">ACTIVATED</span><span className="axis-y bottom">CALM</span><span className="axis-x left">UNPLEASANT</span><span className="axis-x right">PLEASANT</span>
            <i className="axis-line x" aria-hidden="true" /><i className="axis-line y" aria-hidden="true" />
            {multilingualEvidence.map((item, index) => {
              const active = item.id === activeItem.id;
              const match = filters.matches(item);
              return <button key={item.id} type="button" data-source={item.sourceType} data-language={item.language} data-emotion={item.emotion.category} data-attribution={item.emotion.attribution} className={`${active ? "active" : ""} ${match ? "filter-match" : "filter-dim"} ${item.emotion.category === "unresolved" ? "unresolved" : ""}`} style={{ "--x": `${emotionX(item, index)}%`, "--y": `${emotionY(item, index)}%`, "--bubble": `${30 + item.emotion.recurrence * 9}px`, "--bubble-order": index } as CSSProperties} aria-pressed={active} aria-label={`${item.languageLabel} ${item.sourceType} evidence. ${item.emotion.category === "unresolved" ? "No explicit emotion observed" : `${item.emotion.category}, ${item.emotion.attribution} expression`}.`} onFocus={() => setActiveId(item.id)} onMouseEnter={() => setActiveId(item.id)} onClick={() => setActiveId(item.id)}><span lang={item.language}>{item.language === "en" ? "EN" : item.languageLabel}</span><small>{item.emotion.category === "unresolved" ? "not expressed" : item.emotion.category}</small></button>;
            })}
          </div>
          <div className="ml-plot-legend emotion">
            <span><i className="size" />Size = recurrence or intensity in this evidence set</span><span><i className="direct" />Direct</span><span><i className="reported" />Reported / attributed</span><span><i className="unresolved" />Not expressed</span>
          </div>
          <div className="ml-attribution-key"><Radio size={15} aria-hidden="true" /><p><strong>News Author ≠ Emotion Experiencer.</strong> Reported concern remains attributed to local residents, not to the carrier.</p></div>
        </section>
        <MultilingualEvidencePreview item={activeItem} selectionLabel="SELECTED EMOTION OBSERVATION" selectionSummary={`${activeItem.sourceType} · expression attribution retained`} context={[
          { label: "Source type", value: activeItem.sourceType, state: "supported" }, { label: "Experiencer", value: emotion.experiencer, state: emotion.experiencer === "Not expressed" ? "missing" : "supported" },
          { label: "Trigger", value: emotion.trigger, state: "qualified" }, { label: "Object", value: emotion.object, state: "qualified" },
          { label: "Expressed emotion", value: emotion.category === "unresolved" ? "Unresolved / not expressed" : emotion.category, state: emotion.category === "unresolved" ? "missing" : "supported" },
          { label: "Valence", value: emotion.category === "unresolved" ? "Not established" : emotion.valence < 0 ? "Unpleasant expression" : "Pleasant expression", state: emotion.category === "unresolved" ? "missing" : "qualified" },
          { label: "Activation", value: emotion.category === "unresolved" ? "Not established" : emotion.arousal >= .6 ? "Activated" : "Calm / moderate", state: emotion.category === "unresolved" ? "missing" : "qualified" },
          { label: "Expression type", value: emotion.attribution === "not-expressed" ? "No explicit expression" : emotion.attribution, state: emotion.attribution === "not-expressed" ? "missing" : "supported" },
        ]} boundary="This observation concerns explicit or attributed language. FrameWire does not claim access to a person’s internal mental state, and Emotion does not automatically become Threat." />
      </div>
      <div className="ml-support-grid"><MultilingualSecondaryAnalysis lensId="emotion" activeItem={activeItem} /><RelatedLensContext lensId="emotion" /></div>
      <InterpretationStrip note="Expression categories describe explicit or attributed language. The carrier, experiencer and object remain separate records." />
      <LensAuthorityBoundary observes="Explicit or attributed emotional language, experiencer, trigger, object, valence and activation." refuses="Private mental state, audience emotion, intent, or Threat from emotion alone." />
    </div>
  );
}

export function MultilingualLensVisual({ lens }: { lens: LensDefinition }) {
  if (lens.visualType === "narrative") return <NarrativeMultilingualGraph lens={lens} />;
  if (lens.visualType === "sentiment") return <SentimentMultilingualGraph lens={lens} />;
  return <EmotionMultilingualGraph lens={lens} />;
}
