import { Icon } from "../../ui/Icon";
import { MotionCanvas } from "../MotionCanvas";
import { AnimatedEdge } from "../AnimatedEdge";
import { getRevealProgress } from "../sceneClock";
import { EASING, clamp01 } from "../easing";
import type { SceneProps } from "./shared";

/* Scene 5 — Report Studio & Human Verification.
   Findings → user selection → AI assistance → HUMAN REVIEW (approve/edit/reject)
   → final approval unlocks an evidence-linked report whose citations trace back to
   the original sources. The report never appears automatically. */

const FINDINGS = [
  { lens: "Narrative", c: "var(--fw-signal)", text: "Competing narratives", selected: true, review: "approved" },
  { lens: "Sentiment", c: "var(--fw-conflict)", text: "Tone turned divided", selected: true, review: "approved" },
  { lens: "Threat", c: "var(--fw-caution)", text: "Escalation: Elevated", selected: true, review: "edited" },
  { lens: "Fact-Check", c: "var(--fw-verified)", text: "One claim contradicted", selected: false, review: "held" },
];

const REVIEW_ICON: Record<string, { icon: string; color: string }> = {
  approved: { icon: "check", color: "var(--fw-verified)" },
  edited: { icon: "pen-line", color: "var(--fw-caution)" },
  held: { icon: "ban", color: "var(--fw-ink-3)" },
};

const cardY = (i: number) => 56 + i * 78;
const REPORT = { x: 452, top: 70, w: 178 };

export function ReportStudioScene({ t }: SceneProps) {
  const reveal = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));
  const approved = reveal(3.4);
  return (
    <MotionCanvas
      w={650}
      h={500}
      summary="Findings from several lenses appear on the left. The user selects three of four. AI assistance flags one contradiction, one gap, and notes uncertainty. Human Review then approves, edits, or holds each finding; the unselected finding is held out. Only after final human approval does an evidence-linked report build on the right, with citations [1][2][3] that draw back to the original sources. The report is never generated automatically."
    >
      <svg viewBox="0 0 650 500" className="mc-svg" aria-hidden="true">
        {/* selected findings → report (only after approval) */}
        {FINDINGS.map((f, i) =>
          f.selected ? (
            <AnimatedEdge key={i} x1={206} y1={cardY(i) + 26} x2={REPORT.x - 4} y2={210} p={getRevealProgress(t, 3.6 + i * 0.1, 0.5)} color={f.c} opacity={0.4} t={t} pulse />
          ) : null,
        )}
        {/* citations drawing back to original sources */}
        {[0, 1, 2].map((i) => (
          <AnimatedEdge key={`c${i}`} x1={REPORT.x + 18} y1={300} x2={150} y2={cardY(i) + 44} p={getRevealProgress(t, 4.6 + i * 0.12, 0.6)} color="var(--fw-signal)" opacity={0.28} dashed />
        ))}
      </svg>

      {/* findings + selection + human review */}
      <div className="rs-col-h" style={{ left: 14, top: 18, opacity: reveal(0.05) }}>Lens findings</div>
      {FINDINGS.map((f, i) => {
        const p = reveal(0.1 + i * 0.14);
        const sel = f.selected && t > 1.2;
        return (
          <div key={i} className={`rs-find${sel ? " sel" : ""}${f.selected ? "" : " dim"}`} style={{ left: 14, top: cardY(i), opacity: clamp01(p), transform: `translateX(${(1 - p) * -12}px)`, borderColor: sel ? `color-mix(in srgb, ${f.c} 50%, transparent)` : undefined }}>
            <span className="rs-chk" style={{ background: sel ? f.c : "transparent", borderColor: sel ? f.c : "var(--fw-line-bright)" }}>
              {sel && <Icon name="check" size={10} color="#fff" />}
            </span>
            <span className="rs-find-lens" style={{ color: f.c }}>{f.lens}</span>
            <span className="rs-find-text">{f.text}</span>
            <span className="rs-find-src"><Icon name="file-text" size={9} color="var(--fw-ink-3)" /> source</span>
          </div>
        );
      })}

      {/* AI assist note */}
      <div className="rs-ai" style={{ left: 224, top: 56, opacity: reveal(1.8) }}>
        <div className="rs-ai-h"><Icon name="wand-sparkles" size={13} color="var(--fw-signal)" /> AI assists</div>
        <div>1 contradiction flagged</div>
        <div>1 evidence gap</div>
        <div>uncertainty noted</div>
        <div className="rs-ai-foot">organizes — does not decide</div>
      </div>

      {/* human review */}
      <div className="rs-col-h" style={{ left: 224, top: 188, opacity: reveal(2.2) }}>Human review</div>
      {FINDINGS.map((f, i) => {
        if (!f.selected) return null;
        const rv = REVIEW_ICON[f.review];
        return (
          <div key={`rv${i}`} className="rs-review" style={{ left: 224, top: 214 + i * 34, opacity: reveal(2.4 + i * 0.18) }}>
            <Icon name={rv.icon} size={13} color={rv.color} />
            <span>{f.lens} · {f.review}</span>
          </div>
        );
      })}
      <div className="rs-approve" style={{ left: 224, top: 330, opacity: approved, borderColor: "var(--fw-verified-edge)" }}>
        <Icon name="user-check" size={14} color="var(--fw-verified)" /> Approved — report unlocked
      </div>

      {/* evidence-linked report (only after approval) */}
      <div className="rs-report" style={{ left: REPORT.x, top: REPORT.top, width: REPORT.w, opacity: approved, transform: `scale(${0.9 + 0.1 * approved})` }}>
        <div className="rs-report-h"><Icon name="file-check" size={14} color="var(--fw-verified)" /> Evidence-linked report</div>
        {[100, 84, 92, 70].map((w, i) => (
          <div key={i} className="rs-report-line" style={{ width: `${w * reveal(3.8 + i * 0.12)}%` }} />
        ))}
        <div className="rs-cites" style={{ opacity: reveal(4.6) }}>
          {[1, 2, 3].map((n) => <span key={n}><Icon name="link" size={9} color="var(--fw-signal)" />[{n}]</span>)}
        </div>
        <div className="rs-report-unc" style={{ opacity: reveal(4.2) }}><Icon name="help-circle" size={11} color="var(--fw-caution)" /> Uncertainty preserved</div>
      </div>
    </MotionCanvas>
  );
}
