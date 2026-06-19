import { Icon } from "../ui/Icon";
import { MotionCanvas } from "../motion/MotionCanvas";
import { AnimatedEdge } from "../motion/AnimatedEdge";
import { MotionNode } from "../motion/MotionNode";
import { getRevealProgress } from "../motion/sceneClock";
import { EASING, clamp01 } from "../motion/easing";
import { useInViewClock, useIsNarrow } from "./primitives";

/* Ingestion journey — one continuous, scroll-triggered animation:
   four source families → Ingestion → Archive → validation → Engine eligible →
   Investigation → lenses → findings → Report Studio → human review → report.
   No controller (not another guided tour). Reuses the motion engine. */

const GROUPS = [
  { key: "Social Media", icon: "message-square", accent: "var(--fw-signal)", items: ["Facebook", "X / Twitter", "Reddit", "TikTok", "+ more social"] },
  { key: "News & Media", icon: "newspaper", accent: "var(--fw-signal-bright)", items: ["Live feeds", "RSS", "Articles", "Op-eds", "Publishers"] },
  { key: "Government & Public", icon: "landmark", accent: "var(--fw-archive)", items: ["Gov sites", "Notices", "Public records", "Open data"] },
  { key: "Uploaded Material", icon: "upload", accent: "var(--fw-neutral-mark)", items: ["PDF", "Scan · OCR", "Image", "CSV"] },
];

const LENSES = [
  ["Narrative", "trending-up"], ["Sentiment", "activity"], ["Emotion", "heart"],
  ["Threat", "triangle-alert"], ["Geography", "map"], ["Actors", "building-2"], ["Fact-Check", "badge-check"],
] as const;

interface Pt { x: number; y: number; }
interface Layout {
  w: number; h: number; max: number;
  sources: Pt[]; lenses: Pt[];
  ingestion: Pt; archive: Pt; validate: Pt; quarantine: Pt; eligible: Pt; investigation: Pt; findings: Pt; reportStudio: Pt; humanReview: Pt; report: Pt;
}

function wide(): Layout {
  return {
    w: 760, h: 1020, max: 940,
    sources: [{ x: 110, y: 64 }, { x: 295, y: 64 }, { x: 470, y: 64 }, { x: 650, y: 64 }],
    ingestion: { x: 380, y: 205 }, archive: { x: 380, y: 295 }, validate: { x: 380, y: 388 },
    quarantine: { x: 590, y: 388 }, eligible: { x: 380, y: 480 }, investigation: { x: 380, y: 575 },
    lenses: [{ x: 70, y: 668 }, { x: 175, y: 668 }, { x: 280, y: 668 }, { x: 385, y: 668 }, { x: 490, y: 668 }, { x: 595, y: 668 }, { x: 695, y: 668 }],
    findings: { x: 380, y: 765 }, reportStudio: { x: 380, y: 850 }, humanReview: { x: 380, y: 925 }, report: { x: 380, y: 995 },
  };
}
function compact(): Layout {
  return {
    w: 340, h: 1480, max: 360,
    sources: [{ x: 170, y: 56 }, { x: 170, y: 146 }, { x: 170, y: 236 }, { x: 170, y: 326 }],
    ingestion: { x: 170, y: 440 }, archive: { x: 170, y: 530 }, validate: { x: 170, y: 620 },
    quarantine: { x: 285, y: 685 }, eligible: { x: 170, y: 720 }, investigation: { x: 170, y: 815 },
    lenses: [{ x: 70, y: 905 }, { x: 150, y: 905 }, { x: 230, y: 905 }, { x: 300, y: 905 }, { x: 110, y: 960 }, { x: 190, y: 960 }, { x: 270, y: 960 }],
    findings: { x: 170, y: 1055 }, reportStudio: { x: 170, y: 1150 }, humanReview: { x: 170, y: 1245 }, report: { x: 170, y: 1350 },
  };
}

export function IngestionScene() {
  const isNarrow = useIsNarrow();
  const L = isNarrow ? compact() : wide();
  const [ref, t] = useInViewClock(7);
  const r = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));

  return (
    <div ref={ref}>
      <MotionCanvas w={L.w} h={L.h} max={L.max} summary="Four source families — social media (Facebook, X/Twitter, Reddit, TikTok), news and media, government and public sources, and uploaded material (PDF, scans, OCR, spreadsheets) — flow into Ingestion, then Archive, then Extract/Clean/Normalize/Sort/Verify. Duplicate and unsupported material is quarantined; only engine-eligible evidence reaches the Investigation. Intelligence lenses (Narrative, Sentiment, Emotion, Threat, Geography, Actors, Fact-Check) examine it, the user selects findings, Report Studio collects them with evidence, a human reviews and approves, and an evidence-linked report's citations trace back to the original sources.">
        <svg viewBox={`0 0 ${L.w} ${L.h}`} className="mc-svg" aria-hidden="true">
          {L.sources.map((s, i) => <AnimatedEdge key={`s${i}`} x1={s.x} y1={s.y + (isNarrow ? 30 : 40)} x2={L.ingestion.x} y2={L.ingestion.y} p={r(0.7 + i * 0.1, 0.5)} color={GROUPS[i].accent} opacity={0.34} t={t} pulse />)}
          <AnimatedEdge x1={L.ingestion.x} y1={L.ingestion.y} x2={L.archive.x} y2={L.archive.y} p={r(1.0, 0.5)} color="var(--fw-signal)" width={2} opacity={0.5} t={t} pulse arrow />
          <AnimatedEdge x1={L.archive.x} y1={L.archive.y} x2={L.validate.x} y2={L.validate.y} p={r(1.35, 0.5)} color="var(--fw-signal)" width={2} opacity={0.5} t={t} pulse arrow />
          <AnimatedEdge x1={L.validate.x} y1={L.validate.y} x2={L.quarantine.x} y2={L.quarantine.y} p={r(1.7, 0.5)} color="var(--fw-conflict)" opacity={0.4} dashed blocked />
          <AnimatedEdge x1={L.validate.x} y1={L.validate.y} x2={L.eligible.x} y2={L.eligible.y} p={r(1.9, 0.5)} color="var(--fw-verified)" width={2} opacity={0.5} t={t} pulse arrow />
          <AnimatedEdge x1={L.eligible.x} y1={L.eligible.y} x2={L.investigation.x} y2={L.investigation.y} p={r(2.3, 0.5)} color="var(--fw-verified)" width={2} opacity={0.5} t={t} pulse arrow />
          {L.lenses.map((p, i) => <AnimatedEdge key={`l${i}`} x1={L.investigation.x} y1={L.investigation.y} x2={p.x} y2={p.y} p={r(2.7 + i * 0.06, 0.5)} color="var(--fw-neutral-mark)" opacity={0.4} />)}
          {L.lenses.map((p, i) => <AnimatedEdge key={`lf${i}`} x1={p.x} y1={p.y} x2={L.findings.x} y2={L.findings.y} p={r(3.4 + i * 0.04, 0.5)} color="var(--fw-verified)" opacity={0.3} />)}
          <AnimatedEdge x1={L.findings.x} y1={L.findings.y} x2={L.reportStudio.x} y2={L.reportStudio.y} p={r(3.9, 0.5)} color="var(--fw-signal)" width={2} opacity={0.5} t={t} pulse arrow />
          <AnimatedEdge x1={L.reportStudio.x} y1={L.reportStudio.y} x2={L.humanReview.x} y2={L.humanReview.y} p={r(4.2, 0.5)} color="var(--fw-signal)" width={2} opacity={0.5} t={t} pulse arrow />
          <AnimatedEdge x1={L.humanReview.x} y1={L.humanReview.y} x2={L.report.x} y2={L.report.y} p={r(4.5, 0.5)} color="var(--fw-verified)" width={2} opacity={0.55} t={t} pulse arrow />
          <AnimatedEdge x1={L.report.x + 40} y1={L.report.y} x2={L.sources[0].x} y2={L.sources[0].y} p={r(5.2, 0.8)} color="var(--fw-signal)" opacity={0.22} dashed />
        </svg>

        {/* source family cards */}
        {GROUPS.map((g, i) => {
          const p = L.sources[i];
          const rp = r(0.1 + i * 0.1, 0.5);
          return (
            <div key={g.key} className="ing-group" style={{ left: p.x, top: p.y, opacity: clamp01(rp), transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * clamp01(rp)})`, borderColor: `color-mix(in srgb, ${g.accent} 40%, transparent)` }}>
              <div className="ing-group-h"><Icon name={g.icon} size={13} color={g.accent} />{g.key}</div>
              <div className="ing-group-items">{g.items.map((it) => <span key={it}>{it}</span>)}</div>
            </div>
          );
        })}

        {/* central spine */}
        <MotionNode x={L.ingestion.x} y={L.ingestion.y} p={r(0.5, 0.5, EASING.outBack)} accent="var(--fw-signal)" active glow={r(0.5)} w={120}>
          <div className="fs-node"><Icon name="download" size={14} color="var(--fw-signal)" /><span>Ingestion</span></div>
        </MotionNode>
        <MotionNode x={L.archive.x} y={L.archive.y} p={r(1.0, 0.5, EASING.outBack)} accent="var(--fw-signal)" w={150}>
          <div className="ing-stack"><div className="fs-node"><Icon name="archive" size={13} color="var(--fw-signal)" /><span>Archive</span></div><span className="ing-sub">source · time · language · provenance</span></div>
        </MotionNode>
        <MotionNode x={L.validate.x} y={L.validate.y} p={r(1.35, 0.5, EASING.outBack)} accent="var(--fw-signal)" w={158}>
          <div className="ing-stack"><div className="fs-node"><Icon name="shield-check" size={13} color="var(--fw-signal)" /><span>Validate</span></div><span className="ing-sub">extract · clean · normalize · sort · verify</span></div>
        </MotionNode>
        <MotionNode x={L.quarantine.x} y={L.quarantine.y} p={r(1.75, 0.5, EASING.outBack)} accent="var(--fw-conflict)" w={104}>
          <div className="fs-node ing-quar"><Icon name="ban" size={13} color="var(--fw-conflict)" /><span>Quarantine</span></div>
        </MotionNode>
        <MotionNode x={L.eligible.x} y={L.eligible.y} p={r(1.95, 0.5, EASING.outBack)} accent="var(--fw-verified)" active glow={r(1.95)} w={130}>
          <div className="fs-node"><Icon name="badge-check" size={13} color="var(--fw-verified)" /><span>Engine eligible</span></div>
        </MotionNode>
        <MotionNode x={L.investigation.x} y={L.investigation.y} p={r(2.35, 0.5, EASING.outBack)} accent="var(--fw-signal-bright)" active glow={r(2.35)} w={120}>
          <div className="fs-node"><Icon name="git-branch" size={14} color="var(--fw-signal-bright)" /><span>Investigation</span></div>
        </MotionNode>

        {/* lenses */}
        {LENSES.map(([label, icon], i) => {
          const p = L.lenses[i];
          const rp = r(2.7 + i * 0.06, 0.5, EASING.outBack);
          return (
            <div key={label} className="ing-lens" style={{ left: p.x, top: p.y, opacity: clamp01(rp), transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * clamp01(rp)})` }}>
              <Icon name={icon} size={11} color="var(--fw-neutral-mark)" /><span>{label}</span>
            </div>
          );
        })}

        <MotionNode x={L.findings.x} y={L.findings.y} p={r(3.5, 0.5, EASING.outBack)} accent="var(--fw-verified)" w={130}>
          <div className="fs-node"><Icon name="check" size={13} color="var(--fw-verified)" /><span>Selected findings</span></div>
        </MotionNode>
        <MotionNode x={L.reportStudio.x} y={L.reportStudio.y} p={r(3.9, 0.5, EASING.outBack)} accent="var(--fw-signal)" w={120}>
          <div className="fs-node"><Icon name="file-check" size={13} color="var(--fw-signal)" /><span>Report Studio</span></div>
        </MotionNode>
        <MotionNode x={L.humanReview.x} y={L.humanReview.y} p={r(4.25, 0.5, EASING.outBack)} accent="var(--fw-verified)" active glow={r(4.25)} w={120}>
          <div className="fs-node"><Icon name="user-check" size={13} color="var(--fw-verified)" /><span>Human review</span></div>
        </MotionNode>
        <MotionNode x={L.report.x} y={L.report.y} p={r(4.6, 0.5, EASING.outBack)} accent="var(--fw-verified)" active glow={r(4.6)} w={160}>
          <div className="fs-node"><Icon name="file-check" size={14} color="var(--fw-verified)" /><span>Evidence-linked report</span></div>
        </MotionNode>
      </MotionCanvas>

      <div className="ing-micro">
        {[
          "Every source enters the archive first.",
          "Raw information cannot enter an intelligence lens.",
          "Only eligible evidence reaches the engines.",
          "Different lenses examine different dimensions of the same investigation.",
          "The user decides what enters the report.",
          "AI assists. Humans decide.",
        ].map((m) => <span key={m}><Icon name="check" size={12} color="var(--fw-verified)" />{m}</span>)}
      </div>
    </div>
  );
}
