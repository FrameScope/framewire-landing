import { useState } from "react";
import { Icon } from "../ui/Icon";
import { MotionCanvas } from "../motion/MotionCanvas";
import { AnimatedEdge } from "../motion/AnimatedEdge";
import { MotionNode } from "../motion/MotionNode";
import { getRevealProgress, useReducedMotion, useSceneClock } from "../motion/sceneClock";
import { EASING, clamp01 } from "../motion/easing";
import { TOOLS } from "../../site/content";

/* One transforming tool workspace — selecting a tool resets the clock and reveals
   what it does: input → tool → output, plus what it shows and its limitation. */

export function ToolsWorkspace() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const t = useSceneClock(i, { reduced, runFor: 3 });
  const tool = TOOLS[i];
  const reveal = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));

  return (
    <div className="tw">
      <div className="tw-tabs" role="tablist" aria-label="Investigation tools">
        {TOOLS.map((tl, idx) => {
          const on = idx === i;
          return (
            <button key={tl.key} role="tab" aria-selected={on} tabIndex={on ? 0 : -1}
              className={`tw-tab${on ? " on" : ""}`} onClick={() => setI(idx)}>
              <Icon name={tl.icon} size={14} color={on ? "var(--fw-signal)" : "var(--fw-ink-3)"} />{tl.key}
            </button>
          );
        })}
      </div>

      <div className="tw-body">
        <div className="tw-stage">
          <MotionCanvas w={300} h={210} max={360} summary={`${tool.key}: ${tool.definition}`}>
            <svg viewBox="0 0 300 210" className="mc-svg" aria-hidden="true">
              <AnimatedEdge x1={60} y1={105} x2={150} y2={105} p={reveal(0.5, 0.5)} color="var(--fw-signal)" opacity={0.45} width={2} t={t} pulse arrow />
              <AnimatedEdge x1={150} y1={105} x2={240} y2={105} p={reveal(1.4, 0.5)} color="var(--fw-verified)" opacity={0.5} width={2} t={t} pulse arrow />
            </svg>
            <MotionNode x={48} y={105} p={reveal(0.15, 0.5, EASING.outBack)} accent="var(--fw-ink-3)" w={70}>
              <div className="fs-node fs-muted"><Icon name="radio" size={12} color="var(--fw-ink-3)" /><span>Input</span></div>
            </MotionNode>
            <MotionNode x={150} y={105} p={reveal(0.4, 0.5, EASING.outBack)} accent="var(--fw-signal)" active glow={reveal(0.4)} w={120}>
              <div className="fs-node"><Icon name={tool.icon} size={15} color="var(--fw-signal)" /><span>{tool.key}</span></div>
            </MotionNode>
            <MotionNode x={252} y={105} p={reveal(1.3, 0.5, EASING.outBack)} accent="var(--fw-verified)" w={74}>
              <div className="fs-node"><Icon name="file-check" size={12} color="var(--fw-verified)" /><span>Output</span></div>
            </MotionNode>
          </MotionCanvas>
        </div>

        <div className="tw-detail" key={i}>
          <h3 className="tw-name">{tool.key}</h3>
          <p className="tw-def">{tool.definition}</p>
          <div className="tw-shows">
            {tool.shows.map((s, k) => (
              <span key={s} className="tw-show" style={{ opacity: reveal(0.4 + k * 0.2) }}>
                <span className="tw-show-n">{k + 1}</span>{s}
              </span>
            ))}
          </div>
          {tool.limitation && <p className="tw-limit"><Icon name="info" size={13} color="var(--fw-caution)" /> {tool.limitation}</p>}
        </div>
      </div>
    </div>
  );
}
