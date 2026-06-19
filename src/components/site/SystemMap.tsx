import { useEffect, useState } from "react";
import { Icon } from "../ui/Icon";
import { MotionCanvas } from "../motion/MotionCanvas";
import { AnimatedEdge } from "../motion/AnimatedEdge";
import { getRevealProgress, useReducedMotion, useSceneClock } from "../motion/sceneClock";
import { EASING, clamp01 } from "../motion/easing";
import { useInView } from "../graphs/graphUtils";
import { useIsNarrow } from "./primitives";

/* Complete FrameWire system map — the whole architecture revealed in eight
   readable, cumulative stages. Reuses the motion engine (no guided-tour clone).
   Click a group to highlight its paths; "View complete map" settles everything. */

type Key = "sources" | "ingestion" | "lenses" | "analytics" | "human" | "report" | "outputs" | "memory";

interface Group {
  key: Key; stage: number; n: number; title: string; icon: string; accent: string; items: string[]; desc: string;
}

const GROUPS: Group[] = [
  { key: "sources", stage: 1, n: 1, title: "Sources", icon: "rss", accent: "var(--fw-signal)",
    items: ["Social media", "News & media", "Government & public", "Open web", "User uploads", "User question"],
    desc: "Diverse, global, continuously updated information — never used until it is governed." },
  { key: "ingestion", stage: 2, n: 2, title: "Ingestion & evidence prep", icon: "shield-check", accent: "var(--fw-verified)",
    items: ["Discover", "Archive", "Extract", "Clean", "Normalize", "Sort · dedupe", "Provenance", "Verify", "Engine-eligible"],
    desc: "Governed, traceable preparation. Every source is archived first; only eligible evidence reaches the engines." },
  { key: "lenses", stage: 3, n: 3, title: "Intelligence lenses", icon: "layers-3", accent: "var(--fw-neutral-mark)",
    items: ["Search", "Narrative", "Sentiment", "Emotion", "Threat", "Geography", "Actors", "Author", "Portal", "Fact-Check", "Entities", "Coordination", "Timeline", "Memory"],
    desc: "Many lenses, one investigation — each examines a different dimension of the same evidence." },
  { key: "analytics", stage: 4, n: 4, title: "Data analytics", icon: "activity", accent: "var(--fw-caution)",
    items: ["Quantitative", "Trend", "Geographic", "Source", "Entity", "Pattern & anomaly", "→ Charts · tables · datasets"],
    desc: "Measurable insight from validated investigation data only. Patterns do not establish causation." },
  { key: "human", stage: 5, n: 5, title: "Human-led investigation", icon: "user-check", accent: "var(--fw-signal-bright)",
    items: ["Define subject", "Ask questions", "Inspect evidence", "Track", "Compare", "Findings", "Select"],
    desc: "Human curiosity drives understanding. The investigator controls the path and selects findings." },
  { key: "report", stage: 6, n: 6, title: "Report Studio & verification", icon: "file-check", accent: "var(--fw-caution)",
    items: ["Report Studio", "Organize", "Review evidence", "AI assistance", "Human review", "Final approval"],
    desc: "AI assists; humans decide. The report stays locked until human final approval." },
  { key: "outputs", stage: 7, n: 7, title: "Intelligence outputs", icon: "layout-list", accent: "var(--fw-verified)",
    items: ["Report", "Brief", "Assessment", "Timeline", "Geo view", "Relationship graph", "Alerts", "Dataset", "Evidence package"],
    desc: "Actionable, evidence-linked, shareable. Citations trace back through findings, lenses, verification, archive, and sources." },
  { key: "memory", stage: 8, n: 8, title: "Shared memory & users", icon: "history", accent: "var(--fw-archive)",
    items: ["Store findings", "Track changes", "Build continuity", "Improve future work", "→ feeds search & lenses"],
    desc: "Continuity that grows stronger over time, feeding future search, comparison, and investigations — for every kind of user." },
];

const G = (k: Key) => GROUPS.find((g) => g.key === k) as Group;

interface Edge { from: Key; to: Key; stage: number; kind?: "flow" | "blocked" | "feedback" | "citation"; }
const EDGES: Edge[] = [
  { from: "sources", to: "ingestion", stage: 2 },
  { from: "ingestion", to: "lenses", stage: 3 },
  { from: "lenses", to: "analytics", stage: 4 },
  { from: "lenses", to: "human", stage: 5 },
  { from: "analytics", to: "human", stage: 5 },
  { from: "analytics", to: "report", stage: 6 },
  { from: "human", to: "report", stage: 6 },
  { from: "report", to: "outputs", stage: 7 },
  { from: "outputs", to: "memory", stage: 8 },
  { from: "memory", to: "lenses", stage: 8, kind: "feedback" },
  { from: "outputs", to: "sources", stage: 7, kind: "citation" },
];
const touches = (e: Edge, k: Key) => e.from === k || e.to === k;
const connected = (a: Key, b: Key) => EDGES.some((e) => (e.from === a && e.to === b) || (e.from === b && e.to === a));

const USERS = ["Journalists", "Researchers", "NGOs", "Humanitarian", "Government", "Security", "Public-safety", "Diplomatic", "Political", "Compliance", "Media & comms", "General"];

type Pos = Record<Key, { x: number; y: number; w: number }>;
function widePos(): { w: number; h: number; max: number; p: Pos; quarantine: { x: number; y: number }; users: { x: number; y: number; w: number } } {
  return {
    w: 1240, h: 860, max: 1200,
    p: {
      sources: { x: 130, y: 200, w: 200 }, ingestion: { x: 375, y: 200, w: 210 }, lenses: { x: 630, y: 215, w: 220 }, analytics: { x: 890, y: 200, w: 210 },
      human: { x: 210, y: 540, w: 230 }, report: { x: 500, y: 540, w: 220 }, outputs: { x: 790, y: 545, w: 220 }, memory: { x: 1080, y: 430, w: 200 },
    },
    quarantine: { x: 375, y: 360 },
    users: { x: 560, y: 790, w: 1040 },
  };
}
function compactPos(): { w: number; h: number; max: number; p: Pos; quarantine: { x: number; y: number }; users: { x: number; y: number; w: number } } {
  const x = 170, w = 300;
  return {
    w: 340, h: 1960, max: 360,
    p: {
      sources: { x, y: 110, w }, ingestion: { x, y: 330, w }, lenses: { x, y: 560, w }, analytics: { x, y: 820, w },
      human: { x, y: 1040, w }, report: { x, y: 1240, w }, outputs: { x, y: 1450, w }, memory: { x, y: 1670, w },
    },
    quarantine: { x: 300, y: 430 },
    users: { x: 170, y: 1860, w: 300 },
  };
}

export function SystemMap() {
  const reduced = useReducedMotion();
  const compact = useIsNarrow();
  const [ref, inView] = useInView();
  const [stage, setStage] = useState(reduced ? 8 : 1);
  const [nonce, setNonce] = useState(0);
  const [manual, setManual] = useState(false);
  const [selected, setSelected] = useState<Key | null>(null);
  const t = useSceneClock(`${stage}:${nonce}`, { reduced, runFor: 3 });
  const L = compact ? compactPos() : widePos();

  // auto-advance once through the eight stages on first view; user control stops it
  useEffect(() => {
    if (reduced || manual || !inView || stage >= 8) return;
    const id = setTimeout(() => setStage((s) => Math.min(8, s + 1)), 1700);
    return () => clearTimeout(id);
  }, [reduced, manual, inView, stage]);

  const stop = () => setManual(true);
  const go = (s: number) => { stop(); setSelected(null); setStage(Math.max(1, Math.min(8, s))); setNonce((n) => n + 1); };
  const replay = () => { stop(); setSelected(null); setStage(1); setNonce((n) => n + 1); };
  const viewComplete = () => { stop(); setSelected(null); setStage(8); setNonce((n) => n + 1); };

  // reveal value for an element belonging to `gs` stage
  const reveal = clamp01(getRevealProgress(t, 0.1, 0.6, EASING.outBack));
  const vis = (gs: number) => (stage > gs ? 1 : stage === gs ? reveal : 0);
  const dimGroup = (k: Key) => (selected && selected !== k && !connected(selected, k) ? 0.26 : 1);
  const edgeP = (e: Edge) => (stage > e.stage ? 1 : stage === e.stage ? clamp01(getRevealProgress(t, 0.15, 0.6)) : 0);
  const edgeDim = (e: Edge) => (selected ? (touches(e, selected) ? 1 : 0.14) : 1);

  const ec = (k: Key) => ({ x: L.p[k].x, y: L.p[k].y });

  return (
    <div ref={ref} className="sm">
      <MotionCanvas w={L.w} h={L.h} max={L.max} summary={`The complete FrameWire system: ${GROUPS.map((g) => g.title).join(" → ")}. Sources are governed in ingestion (archive, extract, clean, normalize, verify) so only eligible evidence reaches the intelligence lenses; data analytics works on validated data only; human-led investigation selects findings; Report Studio collects them and a human approves before any output; evidence-linked outputs (reports, briefs, assessments, timelines, relationship graphs, datasets, evidence packages) flow into shared memory and to users, and memory feeds future investigations. AI assists, humans decide.`}>
        <svg viewBox={`0 0 ${L.w} ${L.h}`} className="mc-svg" aria-hidden="true">
          {EDGES.map((e, i) => {
            const a = ec(e.from), b = ec(e.to);
            const color = e.kind === "citation" || e.kind === "feedback" ? "var(--fw-signal)" : G(e.to).accent;
            return <AnimatedEdge key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} p={edgeP(e)} color={color} width={e.kind ? 1.2 : 2} opacity={0.5 * edgeDim(e)} dashed={e.kind === "citation" || e.kind === "feedback"} t={t} pulse={!e.kind && stage === e.stage} arrow={!e.kind} />;
          })}
          {/* ingestion → quarantine (blocked) */}
          <AnimatedEdge x1={L.p.ingestion.x} y1={L.p.ingestion.y} x2={L.quarantine.x} y2={L.quarantine.y} p={vis(2)} color="var(--fw-conflict)" opacity={0.4 * (selected && selected !== "ingestion" ? 0.3 : 1)} dashed blocked />
        </svg>

        {GROUPS.map((g) => {
          const pos = L.p[g.key];
          const op = vis(g.stage) * dimGroup(g.key);
          const on = selected === g.key;
          return (
            <button key={g.key} type="button" className={`sm-card${on ? " on" : ""}`} aria-pressed={on}
              onClick={() => { stop(); setSelected((s) => (s === g.key ? null : g.key)); }}
              style={{ left: pos.x, top: pos.y, width: pos.w, opacity: clamp01(op), transform: `translate(-50%,-50%) scale(${0.94 + 0.06 * clamp01(vis(g.stage))})`, borderColor: on ? g.accent : undefined, pointerEvents: op > 0.5 ? "auto" : "none" }}>
              <div className="sm-card-h"><span className="sm-card-n" style={{ color: g.accent }}>{g.n}</span><Icon name={g.icon} size={14} color={g.accent} /><span>{g.title}</span></div>
              <div className="sm-card-items">{g.items.map((it) => <span key={it}>{it}</span>)}</div>
            </button>
          );
        })}

        {/* quarantine chip */}
        <div className="sm-quar" style={{ left: L.quarantine.x, top: L.quarantine.y, opacity: clamp01(vis(2)) }}>
          <Icon name="ban" size={12} color="var(--fw-conflict)" /><span>Quarantine · blocked</span>
        </div>

        {/* users strip (stage 8) */}
        <div className="sm-users" style={{ left: L.users.x, top: L.users.y, width: L.users.w, opacity: clamp01(vis(8) * (selected && selected !== "memory" ? 0.4 : 1)) }}>
          <span className="sm-users-h"><Icon name="users" size={12} color="var(--fw-archive)" /> Users</span>
          {USERS.map((u) => <span key={u} className="sm-user">{u}</span>)}
        </div>
      </MotionCanvas>

      {/* explanation for selected group */}
      {selected && (
        <div className="sm-explain" style={{ borderColor: `color-mix(in srgb, ${G(selected).accent} 45%, transparent)` }}>
          <span className="sm-explain-h" style={{ color: G(selected).accent }}><Icon name={G(selected).icon} size={14} color={G(selected).accent} /> {G(selected).title}</span>
          <span className="sm-explain-d">{G(selected).desc}</span>
        </div>
      )}

      {/* controls */}
      <div className="sm-bar">
        <button className="msc-btn" onClick={() => go(stage - 1)} disabled={stage === 1} aria-label="Previous stage"><Icon name="chevron-left" size={18} /></button>
        <div className="msc-dots" role="tablist" aria-label="System map stages">
          {GROUPS.map((g, i) => (
            <button key={g.key} role="tab" aria-selected={stage === i + 1} aria-label={`Stage ${i + 1}: ${g.title}`} tabIndex={stage === i + 1 ? 0 : -1}
              className={`msc-dot${stage === i + 1 ? " on" : ""}${i + 1 < stage ? " done" : ""}`} onClick={() => go(i + 1)} />
          ))}
        </div>
        <button className="msc-btn" onClick={() => go(stage + 1)} disabled={stage === 8} aria-label="Next stage"><Icon name="chevron-right" size={18} /></button>
        <span className="msc-sep" aria-hidden="true" />
        <button className="msc-btn" onClick={replay} aria-label="Replay"><Icon name="rotate-ccw" size={16} /></button>
        <button className="sm-complete" onClick={viewComplete}>View complete map</button>
      </div>
      <p className="sm-hint">Stage {stage} of 8 · {GROUPS[stage - 1].title}{!compact && " · click any group to trace its paths"}</p>
    </div>
  );
}
