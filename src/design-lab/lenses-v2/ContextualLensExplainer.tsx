import type { CSSProperties, ReactNode } from "react";
import type { LensDefinition, LensId } from "./lensData";

type NodeTone = "evidence" | "analysis" | "caution" | "supported" | "unresolved";

function Node({ x, y, label, kicker, tone = "analysis", width = 82 }: { x: number; y: number; label: string; kicker: string; tone?: NodeTone; width?: number }) {
  return (
    <g className={`context-node tone-${tone}`} transform={`translate(${x} ${y})`}>
      <rect width={width} height="34" rx="2" />
      <text className="context-kicker" x="8" y="11">{kicker}</text>
      <text className="context-label" x="8" y="24">{label}</text>
    </g>
  );
}

function Link({ d, dashed = false, contested = false }: { d: string; dashed?: boolean; contested?: boolean }) {
  return <path className={`context-link ${dashed ? "is-dashed" : ""} ${contested ? "is-contested" : ""}`} d={d} />;
}

function GraphFrame({ id, children }: { id: LensId; children: ReactNode }) {
  return (
    <svg viewBox="0 0 420 220" role="img" aria-labelledby={`${id}-context-graphic-title`}>
      <title id={`${id}-context-graphic-title`}>Compact conceptual diagram for the {id.replace(/-/g, " ")} lens</title>
      <defs>
        <marker id={`context-arrow-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <g style={{ "--context-arrow": `url(#context-arrow-${id})` } as CSSProperties}>{children}</g>
    </svg>
  );
}

function NarrativeGraphic() {
  return <GraphFrame id="narrative"><Link d="M94 70 C112 70 120 70 138 70" /><Link d="M220 70 C238 70 246 70 264 70" /><Link d="M346 70 C360 70 366 70 382 70" /><Link d="M305 87 C305 110 290 119 263 129" contested /><Link d="M179 87 C179 132 196 151 223 164" dashed /><Node x={12} y={53} label="Evidence span" kicker="SOURCE" tone="evidence" /><Node x={138} y={53} label="Attributed claim" kicker="CLAIM" /><Node x={264} y={53} label="Public frame" kicker="FRAME" /><Node x={336} y={101} label="Counterframe" kicker="CONTESTS" tone="caution" /><Node x={223} y={147} label="Unassigned" kicker="INSUFFICIENT" tone="unresolved" /><Node x={337} y={53} label="Family" kicker="NARRATIVE" tone="supported" width={70} /></GraphFrame>;
}

const sentimentPoints = [[86,76,8],[120,92,5],[153,112,7],[203,129,5],[248,104,8],[298,72,6],[335,57,9]];
function SentimentGraphic() {
  return <GraphFrame id="sentiment"><path className="context-axis" d="M55 177 H372 M68 190 V35" /><text className="context-axis-label" x="54" y="205">NEGATIVE</text><text className="context-axis-label" x="326" y="205">POSITIVE</text><text className="context-axis-label" x="20" y="45">HIGH</text><text className="context-axis-label" x="24" y="179">LOW</text>{sentimentPoints.map(([cx,cy,r], index)=><circle key={`${cx}-${cy}`} className={`context-point point-${index % 3}`} cx={cx} cy={cy} r={r} style={{ "--point-order": index } as CSSProperties} />)}<g className="context-note"><rect x="245" y="142" width="119" height="28" rx="2" /><text x="255" y="154">HOLDER → TARGET → ASPECT</text><text x="255" y="165">polarity stays attributed</text></g></GraphFrame>;
}

const emotionPoints = [[108,75,12,"direct"],[151,92,8,"attributed"],[182,64,6,"direct"],[275,83,11,"attributed"],[319,125,9,"direct"],[215,158,8,"missing"]] as const;
function EmotionGraphic() {
  return <GraphFrame id="emotion"><path className="context-axis" d="M52 111 H372 M211 188 V31" /><text className="context-axis-label" x="43" y="127">UNPLEASANT</text><text className="context-axis-label" x="326" y="127">PLEASANT</text><text className="context-axis-label" x="218" y="43">ACTIVATED</text><text className="context-axis-label" x="218" y="183">CALM</text>{emotionPoints.map(([cx,cy,r,state],index)=><circle key={`${cx}-${cy}`} className={`context-point emotion-${state}`} cx={cx} cy={cy} r={r} style={{ "--point-order": index } as CSSProperties} />)}<g className="context-legend"><circle cx="73" cy="202" r="4" /><text x="82" y="205">DIRECT</text><circle className="attributed" cx="157" cy="202" r="4" /><text x="166" y="205">ATTRIBUTED</text><circle className="missing" cx="268" cy="202" r="4" /><text x="277" y="205">NOT EXPRESSED</text></g></GraphFrame>;
}

function ThreatGraphic() {
  return <GraphFrame id="threat"><Node x={10} y={22} label="Public actor" kicker="ACTOR" /><Node x={10} y={71} label="Named target" kicker="TARGET" /><Node x={10} y={120} label="Unresolved" kicker="MECHANISM" tone="unresolved" /><Node x={126} y={46} label="Sparse signal" kicker="CAPABILITY" tone="caution" /><Node x={126} y={111} label="Road corridor" kicker="GEOGRAPHY" tone="evidence" /><Link d="M92 39 C173 39 183 71 242 91" /><Link d="M92 88 C173 88 183 88 242 98" /><Link d="M92 137 C173 137 183 119 242 105" dashed /><Link d="M208 63 C224 70 229 79 242 91" contested /><Link d="M208 128 C225 121 231 112 242 105" /><g className="context-convergence"><path d="M273 71 L315 101 L273 131 L231 101 Z" /><text x="273" y="96">EVIDENCE</text><text x="273" y="108">CONVERGENCE</text></g><Link d="M315 101 H334" /><g className="context-outcomes"><text x="342" y="78">SUPPORTED</text><text className="mixed" x="342" y="103">MIXED</text><text className="missing" x="342" y="128">MISSING</text></g></GraphFrame>;
}

function VerificationGraphic() {
  return <GraphFrame id="fact-check"><Node x={18} y={88} label="Public claim" kicker="CLAIM" width={92} /><Link d="M110 105 C151 105 155 49 194 49" /><Link d="M110 105 H194" contested /><Link d="M110 105 C151 105 155 162 194 162" dashed /><Node x={194} y={32} label="Official record" kicker="SUPPORT" tone="supported" width={104} /><Node x={194} y={88} label="Later correction" kicker="CONTRADICT" tone="caution" width={104} /><Node x={194} y={145} label="Coverage gap" kicker="UNRESOLVED" tone="unresolved" width={104} /><Link d="M298 49 C330 49 333 91 350 99" /><Link d="M298 105 H350" contested /><Link d="M298 162 C330 162 333 119 350 111" dashed /><g className="context-boundary"><rect x="350" y="78" width="58" height="55" rx="2" /><text x="379" y="97">BOUNDED</text><text x="379" y="109">REVIEW</text><text x="379" y="122">STATE</text></g></GraphFrame>;
}

function GeographyGraphic() {
  return <GraphFrame id="geography"><g className="context-map"><path d="M204 44 L266 32 L327 57 L350 111 L318 160 L252 176 L192 143 L174 87 Z" /><path d="M204 44 L226 91 L192 143 M226 91 L291 86 L327 57 M226 91 L252 176 M291 86 L318 160" /></g><Node x={16} y={29} label="Source text" kicker="EVIDENCE" tone="evidence" width={100} /><Node x={16} y={91} label="Observed event" kicker="EVENT" width={100} /><Node x={16} y={153} label="Affected area" kicker="IMPACT" tone="caution" width={100} /><Link d="M116 46 C150 46 158 67 204 70" dashed /><Link d="M116 108 C158 108 170 108 218 108" /><Link d="M116 170 C160 170 174 149 219 143" contested /><text className="context-relation" x="127" y="53">MENTIONS</text><text className="context-relation" x="130" y="102">OCCURRED_IN</text><text className="context-relation" x="128" y="164">AFFECTED_PLACE</text><text className="context-place" x="267" y="108">CANONICAL PLACE</text></GraphFrame>;
}

function PoliticoGraphic() {
  return <GraphFrame id="politico"><Node x={12} y={35} label="Public actor" kicker="ACTOR" /><Node x={128} y={35} label="Committee role" kicker="ROLE" /><Node x={244} y={35} label="Institution" kicker="INSTITUTION" width={92} /><Link d="M94 52 H128" /><Link d="M210 52 H244" /><Node x={128} y={137} label="Safety review" kicker="POSITION" tone="supported" /><Node x={244} y={137} label="Transport policy" kicker="ISSUE" width={92} /><Link d="M53 69 C53 142 85 154 128 154" /><Link d="M210 154 H244" /><Link d="M290 69 V137" dashed /><Node x={336} y={87} label="Alliance?" kicker="UNRESOLVED" tone="unresolved" width={72} /><Link d="M336 52 C371 52 376 70 376 87" dashed /></GraphFrame>;
}

function AuthorGraphic() {
  return <GraphFrame id="author"><Node x={12} y={84} label="Public author" kicker="AUTHOR" tone="evidence" width={94} /><Node x={142} y={25} label="Article A" kicker="EARLIER" /><Node x={142} y={84} label="Article B" kicker="LATER" /><Node x={142} y={143} label="Article C" kicker="RECENT" /><Link d="M106 101 C124 101 124 42 142 42" /><Link d="M106 101 H142" /><Link d="M106 101 C124 101 124 160 142 160" /><Node x={282} y={25} label="Topic pattern" kicker="RECURS" tone="supported" width={102} /><Node x={282} y={84} label="Quoted voice" kicker="ATTRIBUTION" width={102} /><Node x={282} y={143} label="Source use" kicker="OBSERVABLE" width={102} /><Link d="M224 42 H282" /><Link d="M224 101 H282" /><Link d="M224 160 H282" /><text className="context-footnote" x="282" y="198">PATTERN ≠ MOTIVE</text></GraphFrame>;
}

function PortalGraphic() {
  return <GraphFrame id="portal-source"><Node x={12} y={86} label="Original record" kicker="SOURCE" tone="evidence" width={102} /><Node x={151} y={35} label="Outlet report" kicker="CITES" /><Node x={151} y={137} label="Portal copy" kicker="REPUBLISHES" tone="caution" /><Link d="M114 103 C132 103 132 52 151 52" /><Link d="M114 103 C132 103 132 154 151 154" dashed /><Node x={273} y={16} label="Translation" kicker="DERIVED" width={92} /><Node x={273} y={76} label="Rewrite" kicker="SHARED ORIGIN" width={92} /><Node x={273} y={136} label="Social repost" kicker="AMPLIFIES" width={92} /><Link d="M233 52 C251 52 253 33 273 33" /><Link d="M233 154 C251 154 253 93 273 93" dashed /><Link d="M233 154 H273" dashed /><g className="context-family"><path d="M377 20 H401 V183 H377" /><text x="389" y="101">ONE</text><text x="389" y="112">FAMILY</text></g></GraphFrame>;
}

function EntityGraphic() {
  return <GraphFrame id="entity-relationship"><Node x={12} y={18} label="K. Sharma" kicker="ALIAS" tone="evidence" /><Node x={12} y={72} label="के. शर्मा" kicker="ALIAS" tone="evidence" /><Node x={12} y={126} label="Same name" kicker="CANDIDATE" tone="unresolved" /><Link d="M94 35 C137 35 137 78 169 88" /><Link d="M94 89 H169" /><Link d="M94 143 C137 143 137 101 169 94" dashed /><g className="context-entity"><circle cx="216" cy="91" r="47" /><text x="216" y="86">CANONICAL</text><text x="216" y="99">ENTITY</text></g><Link d="M263 72 C282 61 289 45 307 42" /><Link d="M263 91 H307" /><Link d="M263 110 C282 121 289 137 307 140" /><Node x={307} y={25} label="Institution" kicker="ROLE_IN" tone="supported" width={100} /><Node x={307} y={74} label="Published source" kicker="QUOTED_BY" width={100} /><Node x={307} y={123} label="Place" kicker="LOCATED_IN" width={100} /></GraphFrame>;
}

const graphicByLens: Record<LensId, () => ReactNode> = {
  narrative: NarrativeGraphic,
  sentiment: SentimentGraphic,
  emotion: EmotionGraphic,
  threat: ThreatGraphic,
  "fact-check": VerificationGraphic,
  geography: GeographyGraphic,
  politico: PoliticoGraphic,
  author: AuthorGraphic,
  "portal-source": PortalGraphic,
  "entity-relationship": EntityGraphic,
};

const explainerCopy: Record<LensId, { title: string; note: string }> = {
  narrative: { title: "From evidence to narrative structure", note: "Counterframes and insufficient states remain separate." },
  sentiment: { title: "Polarity and intensity stay attributed", note: "A plotted observation is not a population score." },
  emotion: { title: "Expression mapped by valence and activation", note: "Direct, attributed and unexpressed states remain distinct." },
  threat: { title: "Indicators converge without forcing a threat decision", note: "Missing mechanism evidence remains visible at the convergence boundary." },
  "fact-check": { title: "A claim keeps every evidence branch", note: "Support, contradiction and unresolved evidence remain inspectable." },
  geography: { title: "Place roles are typed before they are connected", note: "A mention is not automatically an event or affected location." },
  politico: { title: "Roles connect actors to evidenced positions", note: "Shared issue participation does not establish an alliance." },
  author: { title: "Publications reveal observable patterns", note: "Recurring topics and sources do not establish motive." },
  "portal-source": { title: "Information moves through visible lineage", note: "Dependent copies remain one source family." },
  "entity-relationship": { title: "Identity resolves before relationships appear", note: "Same-name candidates remain unresolved when context is insufficient." },
};

export function ContextualLensExplainer({ lens }: { lens: LensDefinition }) {
  const Graphic = graphicByLens[lens.id];
  const copy = explainerCopy[lens.id];
  return (
    <figure className={`l2-context-explainer accent-${lens.accent}`} aria-labelledby={`${lens.id}-context-title`}>
      <header><strong id={`${lens.id}-context-title`}>{copy.title}</strong></header>
      <div className="l2-context-canvas"><Graphic /></div>
      <figcaption>{copy.note}</figcaption>
    </figure>
  );
}
