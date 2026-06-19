import { Icon } from "../ui/Icon";
import { MotionCanvas } from "../motion/MotionCanvas";
import { AnimatedEdge } from "../motion/AnimatedEdge";
import { MotionNode } from "../motion/MotionNode";
import { getRevealProgress } from "../motion/sceneClock";
import { EASING, clamp01 } from "../motion/easing";
import { useInViewClock, useIsNarrow } from "./primitives";

/* Reusable, scroll-triggered motion scenes for the homepage sections. */

/* ── Evidence-flow strip (Subject → … → Memory) ── */
export function FlowStrip({ steps, icons, accent = "var(--fw-signal)" }: { steps: string[]; icons?: string[]; accent?: string }) {
  const compact = useIsNarrow();
  const [ref, t] = useInViewClock(2 + steps.length * 0.35);
  const N = steps.length;
  const gap = compact ? 0 : 150;
  const w = compact ? 320 : Math.max(640, 60 + N * gap);
  const h = compact ? N * 84 : 150;
  const pos = (i: number) => (compact ? { x: 90, y: 42 + i * 84 } : { x: 60 + i * gap, y: 75 });
  return (
    <div ref={ref} className="flow-strip">
      <MotionCanvas w={w} h={h} max={compact ? 360 : 980} summary={`Evidence flows: ${steps.join(" → ")}.`}>
        <svg viewBox={`0 0 ${w} ${h}`} className="mc-svg" aria-hidden="true">
          {steps.slice(0, -1).map((_, i) => {
            const a = pos(i), b = pos(i + 1);
            return <AnimatedEdge key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} p={getRevealProgress(t, 0.4 + i * 0.32, 0.5)} color={accent} opacity={0.5} width={2} t={t} pulse arrow />;
          })}
        </svg>
        {steps.map((s, i) => {
          const p = getRevealProgress(t, 0.25 + i * 0.32, 0.5, EASING.outBack);
          const last = i === N - 1;
          return (
            <MotionNode key={s} x={pos(i).x} y={pos(i).y} p={p} accent={accent} active={last} glow={last ? p : 0} w={compact ? 150 : 116}>
              <div className="fs-node">{icons && <Icon name={icons[i]} size={14} color={accent} />}<span>{s}</span></div>
            </MotionNode>
          );
        })}
      </MotionCanvas>
    </div>
  );
}

/* ── Hero: subject → sources → investigation → lenses → findings → report → citation ── */
const HERO_LENSES = [-150, -110, -70, -30];
export function HeroScene() {
  const compact = useIsNarrow();
  const [ref, t] = useInViewClock(7);
  const reveal = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));
  const w = 860, h = compact ? 600 : 440;
  // anchor points differ subtly for compact stacking
  const INV = compact ? { x: 180, y: 250 } : { x: 330, y: 220 };
  const REP = compact ? { x: 430, y: 470 } : { x: 720, y: 220 };
  const srcs = compact
    ? [{ x: 160, y: 120 }, { x: 300, y: 130 }, { x: 430, y: 150 }]
    : [{ x: 80, y: 90 }, { x: 70, y: 220 }, { x: 90, y: 350 }];
  return (
    <div ref={ref}>
      <MotionCanvas w={w} h={h} max={compact ? 460 : 1000} summary="A subject and its fragmented sources connect into an investigation; intelligence lenses activate; findings are selected; a human-reviewed, evidence-linked report forms; and its citations reconnect to the original sources.">
        <svg viewBox={`0 0 ${w} ${h}`} className="mc-svg" aria-hidden="true">
          {srcs.map((s, i) => <AnimatedEdge key={i} x1={s.x} y1={s.y} x2={INV.x} y2={INV.y} p={reveal(0.6 + i * 0.15, 0.6)} color="var(--fw-signal)" opacity={0.4} t={t} pulse />)}
          <AnimatedEdge x1={INV.x} y1={INV.y} x2={REP.x} y2={REP.y} p={reveal(2.4, 0.7)} color="var(--fw-verified)" opacity={0.5} width={2} t={t} pulse arrow />
          {/* citation back to a source */}
          <AnimatedEdge x1={REP.x} y1={REP.y + 30} x2={srcs[0].x} y2={srcs[0].y} p={reveal(4.4, 0.8)} color="var(--fw-signal)" opacity={0.28} dashed />
          {/* lens ring spokes */}
          {!compact && HERO_LENSES.map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            const x = INV.x + Math.cos(a) * 92, y = INV.y + Math.sin(a) * 92;
            return <AnimatedEdge key={`l${i}`} x1={INV.x} y1={INV.y} x2={x} y2={y} p={reveal(1.6 + i * 0.12, 0.5)} color="var(--fw-neutral-mark)" opacity={0.5} />;
          })}
        </svg>

        {srcs.map((s, i) => (
          <div key={i} className="hero-src" style={{ left: s.x, top: s.y, opacity: reveal(0.2 + i * 0.12) }}>
            <Icon name={["newspaper", "message-square", "upload"][i]} size={13} color="var(--fw-ink-3)" />
          </div>
        ))}
        <MotionNode x={INV.x} y={INV.y} p={reveal(1.2, 0.6, EASING.outBack)} accent="var(--fw-signal)" active glow={reveal(1.2)} w={132}>
          <div className="hero-inv"><Icon name="git-branch" size={16} color="var(--fw-signal)" /><span>Investigation</span></div>
        </MotionNode>
        {!compact && HERO_LENSES.map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const x = INV.x + Math.cos(a) * 92, y = INV.y + Math.sin(a) * 92;
          const p = reveal(1.6 + i * 0.12, 0.5, EASING.outBack);
          return <div key={i} className="hero-lens" style={{ left: x, top: y, opacity: clamp01(p), transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * clamp01(p)})` }}><Icon name={["trending-up", "shield", "map", "badge-check"][i]} size={12} color="var(--fw-neutral-mark)" /></div>;
        })}
        <MotionNode x={REP.x} y={REP.y} p={reveal(2.6, 0.6, EASING.outBack)} accent="var(--fw-verified)" active glow={reveal(2.6)} w={150}>
          <div className="hero-report">
            <div className="hero-report-h"><Icon name="file-check" size={14} color="var(--fw-verified)" /> Report</div>
            <span className="hero-report-line" style={{ width: `${88 * reveal(3.0)}%` }} />
            <span className="hero-report-line" style={{ width: `${70 * reveal(3.2)}%` }} />
            <span className="hero-cite" style={{ opacity: reveal(4.4) }}>[1] [2] cited</span>
          </div>
        </MotionNode>
      </MotionCanvas>
    </div>
  );
}

/* ── How FrameWire works: phases + the full 24-step investigation ── */
const WF_PHASES = [
  { label: "Observe", icon: "radio", accent: "var(--fw-signal)" },
  { label: "Investigate", icon: "git-branch", accent: "var(--fw-signal-bright)" },
  { label: "Analyze", icon: "layers-3", accent: "var(--fw-neutral-mark)" },
  { label: "Verify & report", icon: "user-check", accent: "var(--fw-verified)" },
  { label: "Remember", icon: "history", accent: "var(--fw-archive)" },
];
const WF_STEPS = [
  [0, "Signal appears in Live Timeline"], [0, "User opens an investigation"], [1, "Search expands terms & entities"], [1, "Sources join the investigation"],
  [2, "Narrative finds competing stories"], [2, "Sentiment shows tone movement"], [2, "Emotion shows signals"], [2, "Author & Portal patterns"],
  [2, "Fact-Check compares evidence"], [2, "Entities connect people & places"], [2, "Actors' involvement examined"], [2, "Geography reveals distribution"],
  [2, "Timeline shows recurrence"], [2, "Threat examines convergence"], [2, "Memory links past cases"], [2, "Analytics compares patterns"],
  [2, "Guided Cognition finds gaps"], [3, "User selects findings"], [3, "Findings enter Report Studio"], [3, "Human review begins"],
  [3, "Final report approved"], [3, "Citations return to evidence"], [4, "Investigation enters Memory"], [4, "Later evidence updates it"],
] as const;
export function WorkflowScene() {
  const compact = useIsNarrow();
  const [ref, t] = useInViewClock(10);
  const reveal = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));
  const w = 900, h = 150, gap = 175;
  const px = (i: number) => 90 + i * gap;
  return (
    <div ref={ref} className="wf">
      {!compact && (
        <MotionCanvas w={w} h={h} max={1000} summary={`Five phases: ${WF_PHASES.map((p) => p.label).join(", ")}.`}>
          <svg viewBox={`0 0 ${w} ${h}`} className="mc-svg" aria-hidden="true">
            {WF_PHASES.slice(0, -1).map((p, i) => <AnimatedEdge key={i} x1={px(i)} y1={75} x2={px(i + 1)} y2={75} p={reveal(0.4 + i * 0.4, 0.5)} color={p.accent} opacity={0.5} width={2} t={t} pulse arrow />)}
          </svg>
          {WF_PHASES.map((p, i) => (
            <MotionNode key={p.label} x={px(i)} y={75} p={reveal(0.25 + i * 0.4, 0.5, EASING.outBack)} accent={p.accent} active glow={reveal(0.25 + i * 0.4)} w={132}>
              <div className="fs-node"><Icon name={p.icon} size={14} color={p.accent} /><span>{p.label}</span></div>
            </MotionNode>
          ))}
        </MotionCanvas>
      )}
      <ol className="wf-steps">
        {WF_STEPS.map(([phase, label], i) => (
          <li key={i} style={{ opacity: reveal(1.2 + i * 0.18, 0.5), borderColor: `color-mix(in srgb, ${WF_PHASES[phase].accent} 45%, transparent)` }}>
            <span className="wf-dot" style={{ background: WF_PHASES[phase].accent }} />{label}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Multilingual: many languages → one connected investigation ── */
const ML_SRC = [
  { label: "English source", x: 70, y: 60 },
  { label: "Nepali source", x: 70, y: 160 },
  { label: "Regional source", x: 70, y: 260 },
  { label: "Scanned doc → OCR", x: 70, y: 360 },
];
export function MultilingualScene() {
  const compact = useIsNarrow();
  const [ref, t] = useInViewClock(5);
  const reveal = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));
  const w = 720, h = compact ? 520 : 440;
  const ENT = { x: 420, y: 210 }, INV = { x: 620, y: 210 };
  return (
    <div ref={ref}>
      <MotionCanvas w={w} h={h} max={compact ? 460 : 920} summary="Sources in English, Nepali and another regional language, plus a scanned OCR document, normalize their entity aliases into one entity and join a single investigation. Original language and source origin stay attached.">
        <svg viewBox={`0 0 ${w} ${h}`} className="mc-svg" aria-hidden="true">
          {ML_SRC.map((s, i) => <AnimatedEdge key={i} x1={s.x + 78} y1={s.y} x2={ENT.x} y2={ENT.y} p={reveal(0.8 + i * 0.14, 0.5)} color={i === 3 ? "var(--fw-archive)" : "var(--fw-signal)"} opacity={0.38} t={t} pulse dashed={i === 3} />)}
          <AnimatedEdge x1={ENT.x} y1={ENT.y} x2={INV.x} y2={INV.y} p={reveal(2.2, 0.6)} color="var(--fw-verified)" width={2} opacity={0.5} t={t} pulse arrow />
        </svg>
        {ML_SRC.map((s, i) => (
          <div key={i} className="ml-src" style={{ left: s.x, top: s.y, opacity: reveal(0.1 + i * 0.12) }}>
            <Icon name={i === 3 ? "scan-text" : "languages"} size={13} color="var(--fw-ink-3)" /><span>{s.label}</span>
          </div>
        ))}
        <MotionNode x={ENT.x} y={ENT.y} p={reveal(1.8, 0.6, EASING.outBack)} accent="var(--fw-neutral-mark)" active glow={reveal(1.8)} w={140}>
          <div className="ml-ent"><span className="ml-ent-h">Entity aliases</span><span className="ml-ent-s">normalized · original kept</span></div>
        </MotionNode>
        <MotionNode x={INV.x} y={INV.y} p={reveal(2.4, 0.6, EASING.outBack)} accent="var(--fw-signal)" active glow={reveal(2.4)} w={120}>
          <div className="fs-node"><Icon name="git-branch" size={14} color="var(--fw-signal)" /><span>One investigation</span></div>
        </MotionNode>
      </MotionCanvas>
    </div>
  );
}

/* ── Institutional memory: investigation → memory → time → new evidence → updated ── */
export function MemoryScene() {
  const compact = useIsNarrow();
  const [ref, t] = useInViewClock(5);
  const reveal = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));
  const w = 760, h = compact ? 460 : 320;
  const INV = compact ? { x: 160, y: 70 } : { x: 130, y: 160 };
  const MEM = { x: 400, y: 160 };
  const NEW = compact ? { x: 600, y: 70 } : { x: 640, y: 70 };
  const UPD = compact ? { x: 600, y: 260 } : { x: 640, y: 250 };
  return (
    <div ref={ref}>
      <MotionCanvas w={w} h={h} max={compact ? 460 : 960} summary="A completed investigation and report enter Investigation Memory. Time passes, new evidence arrives, previous findings reconnect, and an updated understanding is recorded — while earlier states stay preserved.">
        <svg viewBox={`0 0 ${w} ${h}`} className="mc-svg" aria-hidden="true">
          <AnimatedEdge x1={INV.x} y1={INV.y} x2={MEM.x} y2={MEM.y} p={reveal(0.6, 0.6)} color="var(--fw-archive)" width={2} opacity={0.5} t={t} pulse arrow />
          <AnimatedEdge x1={NEW.x} y1={NEW.y} x2={MEM.x} y2={MEM.y} p={reveal(2.0, 0.6)} color="var(--fw-signal)" opacity={0.45} t={t} pulse arrow />
          <AnimatedEdge x1={MEM.x} y1={MEM.y} x2={UPD.x} y2={UPD.y} p={reveal(2.8, 0.6)} color="var(--fw-verified)" opacity={0.5} t={t} pulse arrow />
        </svg>
        <MotionNode x={INV.x} y={INV.y} p={reveal(0.2, 0.5, EASING.outBack)} accent="var(--fw-signal)" w={130}>
          <div className="fs-node"><Icon name="file-check" size={13} color="var(--fw-signal)" /><span>Investigation & report</span></div>
        </MotionNode>
        <MotionNode x={MEM.x} y={MEM.y} p={reveal(0.5, 0.6, EASING.outBack)} accent="var(--fw-archive)" active glow={reveal(0.5)} w={120}>
          <div className="mem-core"><Icon name="history" size={18} color="var(--fw-archive)" /><span>Memory</span><span className="mem-core-s">earlier states kept</span></div>
        </MotionNode>
        <MotionNode x={NEW.x} y={NEW.y} p={reveal(1.7, 0.5, EASING.outBack)} accent="var(--fw-signal)" w={120}>
          <div className="fs-node"><Icon name="radio" size={13} color="var(--fw-signal)" /><span>New evidence</span></div>
        </MotionNode>
        <MotionNode x={UPD.x} y={UPD.y} p={reveal(2.6, 0.5, EASING.outBack)} accent="var(--fw-verified)" active glow={reveal(2.6)} w={140}>
          <div className="fs-node"><Icon name="badge-check" size={13} color="var(--fw-verified)" /><span>Updated understanding</span></div>
        </MotionNode>
      </MotionCanvas>
    </div>
  );
}
