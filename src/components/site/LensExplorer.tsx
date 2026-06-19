import { useState } from "react";
import { Icon } from "../ui/Icon";
import { MotionCanvas } from "../motion/MotionCanvas";
import { AnimatedEdge } from "../motion/AnimatedEdge";
import { MotionNode } from "../motion/MotionNode";
import { getRevealProgress, useReducedMotion, useSceneClock } from "../motion/sceneClock";
import { EASING, clamp01 } from "../motion/easing";
import { LENSES } from "../../site/content";

/* One persistent investigation workspace. Selecting a lens resets the scene clock
   and re-reveals: evidence → investigation → lens → finding, with the lens's
   definition, what it examines, what it identifies, and one limitation. */

export function LensExplorer() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const t = useSceneClock(i, { reduced, runFor: 3.4 });
  const lens = LENSES[i];
  const reveal = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));

  const EVID = [{ y: 70 }, { y: 130 }, { y: 190 }];
  const INV = { x: 175, y: 130 }, LENS = { x: 175, y: 250 }, FIND = { x: 300, y: 130 };

  return (
    <div className="lx">
      <div className="lx-selector" role="tablist" aria-label="Intelligence lenses">
        {LENSES.map((l, idx) => {
          const on = idx === i;
          return (
            <button key={l.key} role="tab" aria-selected={on} tabIndex={on ? 0 : -1}
              className={`lx-chip${on ? " on" : ""}`} style={on ? { borderColor: l.accent } : undefined} onClick={() => setI(idx)}>
              <Icon name={l.icon} size={15} color={on ? l.accent : "var(--fw-ink-3)"} />
              <span>{l.key}</span>
            </button>
          );
        })}
      </div>

      <div className="lx-stage" role="tabpanel" aria-label={lens.key}>
        <MotionCanvas w={360} h={320} max={420} summary={`${lens.key}: ${lens.definition}`}>
          <svg viewBox="0 0 360 320" className="mc-svg" aria-hidden="true">
            {EVID.map((e, k) => <AnimatedEdge key={k} x1={42} y1={e.y} x2={INV.x} y2={INV.y} p={reveal(0.5 + k * 0.12, 0.5)} color={lens.accent} opacity={0.35} t={t} pulse />)}
            <AnimatedEdge x1={INV.x} y1={INV.y + 26} x2={LENS.x} y2={LENS.y - 22} p={reveal(1.3, 0.5)} color={lens.accent} opacity={0.6} width={2} t={t} pulse />
            <AnimatedEdge x1={INV.x + 30} y1={INV.y} x2={FIND.x} y2={FIND.y} p={reveal(2.0, 0.5)} color="var(--fw-verified)" opacity={0.55} width={2} t={t} pulse arrow />
          </svg>
          {EVID.map((e, k) => <div key={k} className="lx-evid" style={{ left: 42, top: e.y, opacity: reveal(0.2 + k * 0.1) }}><Icon name="file-text" size={11} color="var(--fw-ink-3)" /></div>)}
          <MotionNode x={INV.x} y={INV.y} p={reveal(0.15, 0.5, EASING.outBack)} accent="var(--fw-signal)" active glow={reveal(0.15)} w={104}>
            <div className="fs-node"><Icon name="git-branch" size={13} color="var(--fw-signal)" /><span>Investigation</span></div>
          </MotionNode>
          <MotionNode x={LENS.x} y={LENS.y} p={reveal(1.2, 0.5, EASING.outBack)} accent={lens.accent} active glow={reveal(1.2)} w={140}>
            <div className="fs-node"><Icon name={lens.icon} size={14} color={lens.accent} /><span>{lens.key}</span></div>
          </MotionNode>
          <MotionNode x={FIND.x} y={FIND.y} p={reveal(2.0, 0.5, EASING.outBack)} accent="var(--fw-verified)" w={96}>
            <div className="fs-node"><Icon name="badge-check" size={13} color="var(--fw-verified)" /><span>Finding</span></div>
          </MotionNode>
        </MotionCanvas>
      </div>

      <div className="lx-detail" key={i}>
        <h3 className="lx-name" style={{ color: lens.accent }}>{lens.key}</h3>
        <p className="lx-def">{lens.definition}</p>
        <p className="lx-q"><Icon name="help-circle" size={14} color="var(--fw-signal)" /> {lens.question}</p>
        <div className="lx-cols">
          <div>
            <div className="lx-sub">Examines</div>
            <ul>{lens.examines.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div>
            <div className="lx-sub">Identifies</div>
            <ul>{lens.identifies.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
        <p className="lx-learn"><Icon name="eye" size={13} color="var(--fw-ink-3)" /> {lens.learn}</p>
        {lens.limitation && <p className="lx-limit"><Icon name="info" size={13} color="var(--fw-caution)" /> {lens.limitation}</p>}
        {lens.line && <p className="lx-line">{lens.line}</p>}
      </div>
    </div>
  );
}
