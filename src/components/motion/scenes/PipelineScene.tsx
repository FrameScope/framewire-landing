import { Icon } from "../../ui/Icon";
import { MotionCanvas } from "../MotionCanvas";
import { AnimatedEdge } from "../AnimatedEdge";
import { MotionNode } from "../MotionNode";
import { getRevealProgress } from "../sceneClock";
import { clamp01 } from "../easing";
import type { SceneProps } from "./shared";

/* Scene 6 — The robust system underneath.
   Ingest → Archive → Extract → Clean → Normalize → Sort → Verify → Engine Eligible
   → Investigation. Sources feed Ingest; duplicates branch off; failed material is
   isolated in Quarantine; invalid paths (Raw→Lenses, Quarantine→Lenses) are blocked.
   Recomposes to a vertical column on narrow viewports. */

const STAGES = [
  { key: "ingest", label: "Ingest", icon: "download", accent: "var(--fw-signal)" },
  { key: "archive", label: "Archive", icon: "archive", accent: "var(--fw-signal)" },
  { key: "extract", label: "Extract", icon: "scan-text", accent: "var(--fw-signal)" },
  { key: "clean", label: "Clean", icon: "wand-sparkles", accent: "var(--fw-signal)" },
  { key: "normalize", label: "Normalize", icon: "git-merge", accent: "var(--fw-signal)" },
  { key: "sort", label: "Sort", icon: "layout-list", accent: "var(--fw-signal)" },
  { key: "verify", label: "Verify", icon: "shield-check", accent: "var(--fw-verified)" },
  { key: "eligible", label: "Engine eligible", icon: "badge-check", accent: "var(--fw-verified)" },
];
const SOURCES = ["News", "Upload", "OCR scan", "API"];

interface Pt { x: number; y: number; }

function wideLayout() {
  const stages: Record<string, Pt> = {};
  STAGES.forEach((s, i) => { stages[s.key] = { x: 150 + i * 90, y: 150 }; });
  return {
    w: 880, h: 470,
    stages,
    sources: SOURCES.map((_, i) => ({ x: 22, y: 40 + i * 56 })),
    ingestAnchor: { x: 150, y: 150 },
    duplicate: { x: 600, y: 56 },
    quarantine: { x: 690, y: 320 },
    investigation: { x: 790, y: 320 },
    lenses: { x: 470, y: 400 },
  };
}

function compactLayout() {
  const stages: Record<string, Pt> = {};
  STAGES.forEach((s, i) => { stages[s.key] = { x: 150, y: 150 + i * 78 }; });
  return {
    w: 360, h: 980,
    stages,
    sources: SOURCES.map((_, i) => ({ x: 40 + i * 80, y: 40 })),
    ingestAnchor: { x: 150, y: 150 },
    duplicate: { x: 290, y: 540 },
    quarantine: { x: 290, y: 618 },
    investigation: { x: 150, y: 774 },
    lenses: { x: 150, y: 866 },
  };
}

export function PipelineScene({ t, compact }: SceneProps) {
  const L = compact ? compactLayout() : wideLayout();
  const stageStart = (i: number) => 0.5 + i * 0.22;
  const sortP = L.stages.sort, verifyP = L.stages.verify, eligibleP = L.stages.eligible, ingestP = L.stages.ingest;

  return (
    <MotionCanvas
      w={L.w}
      h={L.h}
      summary="A protective pipeline. Sources (News, Upload, OCR scan, API) feed Ingest, then material flows Archive, Extract, Clean, Normalize, Sort, Verify, Engine eligible, and reaches the Investigation. Duplicates branch off and failed material is isolated in Quarantine. Raw and quarantined material are blocked from reaching the lenses — only verified, eligible evidence becomes available to intelligence analysis."
    >
      <svg viewBox={`0 0 ${L.w} ${L.h}`} className="mc-svg" aria-hidden="true">
        {/* sources → ingest */}
        {L.sources.map((s, i) => (
          <AnimatedEdge key={`s${i}`} x1={s.x + 34} y1={s.y + 12} x2={L.ingestAnchor.x} y2={L.ingestAnchor.y} p={getRevealProgress(t, 0.3 + i * 0.06, 0.5)} opacity={0.3} t={t} pulse />
        ))}
        {/* main chain */}
        {STAGES.slice(0, -1).map((s, i) => {
          const a = L.stages[s.key], b = L.stages[STAGES[i + 1].key];
          return <AnimatedEdge key={`e${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} p={getRevealProgress(t, stageStart(i) + 0.12, 0.5)} color={i >= 5 ? "var(--fw-verified)" : "var(--fw-signal)"} opacity={0.45} width={2} t={t} pulse arrow />;
        })}
        {/* duplicate branch from Sort */}
        <AnimatedEdge x1={sortP.x} y1={sortP.y} x2={L.duplicate.x} y2={L.duplicate.y} p={getRevealProgress(t, 2.6, 0.5)} color="var(--fw-ink-3)" opacity={0.35} dashed />
        {/* failed → quarantine from Verify */}
        <AnimatedEdge x1={verifyP.x} y1={verifyP.y} x2={L.quarantine.x} y2={L.quarantine.y} p={getRevealProgress(t, 3.0, 0.5)} color="var(--fw-conflict)" opacity={0.4} />
        {/* eligible → investigation (allowed) */}
        <AnimatedEdge x1={eligibleP.x} y1={eligibleP.y} x2={L.investigation.x} y2={L.investigation.y} p={getRevealProgress(t, 3.4, 0.5)} color="var(--fw-verified)" opacity={0.5} width={2} t={t} pulse arrow />
        {/* investigation → lenses (allowed) */}
        <AnimatedEdge x1={L.investigation.x} y1={L.investigation.y} x2={L.lenses.x} y2={L.lenses.y} p={getRevealProgress(t, 3.8, 0.5)} color="var(--fw-signal)" opacity={0.5} width={2} t={t} pulse arrow />
        {/* BLOCKED: raw ingest → lenses */}
        <AnimatedEdge x1={ingestP.x} y1={ingestP.y} x2={L.lenses.x} y2={L.lenses.y} p={getRevealProgress(t, 4.3, 0.6)} color="var(--fw-conflict)" opacity={0.3} dashed blocked />
        {/* BLOCKED: quarantine → lenses */}
        <AnimatedEdge x1={L.quarantine.x} y1={L.quarantine.y} x2={L.lenses.x} y2={L.lenses.y} p={getRevealProgress(t, 4.6, 0.6)} color="var(--fw-conflict)" opacity={0.3} dashed blocked />
      </svg>

      {/* sources */}
      {L.sources.map((s, i) => {
        const p = getRevealProgress(t, 0.1 + i * 0.08, 0.45);
        return (
          <div key={SOURCES[i]} className="pl-src" style={{ left: s.x, top: s.y, opacity: clamp01(p) }}>
            <Icon name="rss" size={11} color="var(--fw-ink-3)" />{SOURCES[i]}
          </div>
        );
      })}

      {/* pipeline stages */}
      {STAGES.map((s, i) => {
        const pt = L.stages[s.key];
        const p = getRevealProgress(t, stageStart(i), 0.5);
        const active = s.key === "verify" || s.key === "eligible";
        return (
          <MotionNode key={s.key} x={pt.x} y={pt.y} p={p} accent={s.accent} active={active} glow={active ? p : 0} w={78}>
            <div className="pl-node">
              <Icon name={s.icon} size={15} color={s.accent} />
              <span>{s.label}</span>
            </div>
          </MotionNode>
        );
      })}

      {/* duplicate */}
      <MotionNode x={L.duplicate.x} y={L.duplicate.y} p={getRevealProgress(t, 2.7, 0.5)} accent="var(--fw-ink-3)" w={86}>
        <div className="pl-node pl-muted"><Icon name="copy-minus" size={13} color="var(--fw-ink-3)" /><span>Duplicate removed</span></div>
      </MotionNode>

      {/* quarantine (isolated) */}
      <MotionNode x={L.quarantine.x} y={L.quarantine.y} p={getRevealProgress(t, 3.1, 0.5)} accent="var(--fw-conflict)" w={86}>
        <div className="pl-node pl-quar"><Icon name="ban" size={14} color="var(--fw-conflict)" /><span>Quarantine</span></div>
      </MotionNode>

      {/* investigation */}
      <MotionNode x={L.investigation.x} y={L.investigation.y} p={getRevealProgress(t, 3.5, 0.5)} accent="var(--fw-signal-bright)" active glow={getRevealProgress(t, 3.5, 0.5)} w={86}>
        <div className="pl-node"><Icon name="git-branch" size={14} color="var(--fw-signal-bright)" /><span>Investigation</span></div>
      </MotionNode>

      {/* lenses / engines */}
      <MotionNode x={L.lenses.x} y={L.lenses.y} p={getRevealProgress(t, 3.9, 0.5)} accent="var(--fw-signal)" w={92}>
        <div className="pl-node"><Icon name="layers-3" size={14} color="var(--fw-signal)" /><span>Intelligence lenses</span></div>
      </MotionNode>
    </MotionCanvas>
  );
}
