import { useEffect, useState, type CSSProperties } from "react";
import { Icon } from "../ui/Icon";
import { usePRM } from "../graphs/graphUtils";

/** Plays a scene's internal animation when it becomes active; reduced-motion shows the settled state. */
export function usePlay(active: boolean) {
  const reduced = usePRM();
  const [play, setPlay] = useState(reduced);
  useEffect(() => {
    if (reduced) { setPlay(true); return; }
    if (!active) { setPlay(false); return; }
    const t = setTimeout(() => setPlay(true), 70);
    return () => clearTimeout(t);
  }, [active, reduced]);
  return play;
}

const sceneCls = (play: boolean) => `scene${play ? " in" : ""}`;

/* ── 1. Narrative ───────────────────────────────────────────────────────── */
const CLUSTERS = [
  { x: 24, y: 60, label: "Policy story" },
  { x: 50, y: 48, label: "Funding story" },
  { x: 77, y: 60, label: "Local impact" },
];
const DOTS = [
  { sx: 12, sy: 24, c: 0 }, { sx: 30, sy: 18, c: 1 }, { sx: 52, sy: 22, c: 1 },
  { sx: 70, sy: 16, c: 2 }, { sx: 86, sy: 28, c: 2 }, { sx: 18, sy: 44, c: 0 },
  { sx: 40, sy: 38, c: 1 }, { sx: 62, sy: 34, c: 2 }, { sx: 82, sy: 46, c: 2 },
  { sx: 10, sy: 70, c: 0 }, { sx: 28, sy: 78, c: 0 }, { sx: 46, sy: 72, c: 1 },
  { sx: 60, sy: 80, c: 2 }, { sx: 74, sy: 74, c: 2 }, { sx: 90, sy: 66, c: 2 },
];
export function NarrativeScene({ active }: { active: boolean }) {
  const play = usePlay(active);
  return (
    <div className={sceneCls(play)}>
      <span className="scene-label">Narrative clustering</span>
      {DOTS.map((d, i) => {
        const cl = CLUSTERS[d.c];
        const ox = ((i % 3) - 1) * 6, oy = (Math.floor(i / 3) % 3 - 1) * 7;
        const left = play ? cl.x + ox : d.sx, top = play ? cl.y + oy : d.sy;
        return <span key={i} className={`sc-dot${play ? " clustered" : ""}`} style={{ left: `${left}%`, top: `${top}%` }} />;
      })}
      {CLUSTERS.map((c) => (
        <span key={c.label} className={`sc-cluster-lb${play ? " show" : ""}`} style={{ left: `${c.x}%`, top: `${c.y - 18}%` }}>{c.label}</span>
      ))}
    </div>
  );
}

/* ── 2. Sentiment ───────────────────────────────────────────────────────── */
const TONE = [
  { lb: "Policy story", pos: 52, mix: 26, neg: 22 },
  { lb: "Funding story", pos: 30, mix: 28, neg: 42 },
  { lb: "Local impact", pos: 46, mix: 34, neg: 20 },
];
export function SentimentScene({ active }: { active: boolean }) {
  const play = usePlay(active);
  return (
    <div className={sceneCls(play)}>
      <span className="scene-label">Tone movement</span>
      <div className="sc-rows">
        {TONE.map((t) => (
          <div key={t.lb}>
            <div className="sc-row-lb"><Icon name="trending-up" size={13} color="var(--fw-ink-3)" />{t.lb}</div>
            <div className="sc-bar">
              <span className="sc-seg pos" style={{ width: play ? `${t.pos}%` : 0 }} />
              <span className="sc-seg mix" style={{ width: play ? `${t.mix}%` : 0 }} />
              <span className="sc-seg neg" style={{ width: play ? `${t.neg}%` : 0 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="sc-legend">
        <span><i style={{ background: "var(--fw-verified)" }} />Positive</span>
        <span><i style={{ background: "var(--fw-ink-4)" }} />Mixed</span>
        <span><i style={{ background: "var(--fw-conflict)" }} />Negative</span>
      </div>
    </div>
  );
}

/* ── 3. Emotion ─────────────────────────────────────────────────────────── */
const EMO = [
  { lb: "Fear", a: -90, m: 70 }, { lb: "Anger", a: -25, m: 55 },
  { lb: "Hope", a: 40, m: 40 }, { lb: "Trust", a: 110, m: 32 },
  { lb: "Uncertainty", a: 180, m: 60 },
];
export function EmotionScene({ active }: { active: boolean }) {
  const play = usePlay(active);
  return (
    <div className={sceneCls(play)}>
      <span className="scene-label">Emotional signals</span>
      <span className="sc-emo-core">Dominant narrative</span>
      {EMO.map((e, i) => {
        const rad = (e.a * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 34, y = 50 + Math.sin(rad) * 33;
        const style: CSSProperties = { left: `${x}%`, top: `${y}%`, transitionDelay: `${i * 90}ms` };
        return (
          <span key={e.lb} className={`sc-emo-chip${play ? " show" : ""}`} style={style}>
            <span>{e.lb}</span>
            <span className="sc-emo-meter"><i style={{ width: play ? `${e.m}%` : 0, transitionDelay: `${i * 90 + 120}ms` }} /></span>
          </span>
        );
      })}
    </div>
  );
}

/* ── 4. Threat & escalation ─────────────────────────────────────────────── */
const THR_IN = ["Recurring narrative", "Rising tension", "Actor involvement", "Repeated signals", "Emotional pressure"];
export function ThreatScene({ active }: { active: boolean }) {
  const play = usePlay(active);
  return (
    <div className={sceneCls(play)}>
      <span className="scene-label">Convergence</span>
      <div className="sc-thr">
        <div className="sc-thr-inputs">
          {THR_IN.map((t, i) => (
            <div key={t} className={`sc-thr-in${play ? " show" : ""}`} style={{ transitionDelay: `${i * 90}ms` }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--fw-caution)", flexShrink: 0, display: "inline-block" }} />{t}
            </div>
          ))}
        </div>
        <div className={`sc-thr-out${play ? " show" : ""}`} style={{ transitionDelay: "480ms" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13, color: "var(--fw-ink)" }}>
            <Icon name="triangle-alert" size={15} color="var(--fw-caution)" />Escalation indicator
          </div>
          <div className="sc-thr-meter"><i style={{ width: play ? "66%" : 0, transitionDelay: "600ms" }} /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11.5, color: "var(--fw-ink-3)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon name="check" size={12} color="var(--fw-verified)" />Supporting evidence attached</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon name="split" size={12} color="var(--fw-conflict)" />Contradicting evidence kept</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon name="help-circle" size={12} color="var(--fw-caution)" />Uncertainty preserved</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 5. Geography ───────────────────────────────────────────────────────── */
const GEO = [
  { lb: "" }, { lb: "Local", t: "hot" }, { lb: "Region", t: "hot" }, { lb: "" },
  { lb: "", t: "warm" }, { lb: "Cross-border", t: "hot" }, { lb: "" }, { lb: "", t: "warm" },
];
export function GeographyScene({ active }: { active: boolean }) {
  const play = usePlay(active);
  return (
    <div className={sceneCls(play)}>
      <span className="scene-label">Where it happens</span>
      <div className="sc-geo">
        {GEO.map((g, i) => (
          <div key={i} className={`sc-geo-tile${play && g.t ? " " + g.t : ""}`} style={{ transitionDelay: `${i * 70}ms` }}>
            {play && g.t === "hot" && <Icon name="map-pin" size={14} color="var(--fw-signal)" />}
            {g.lb && <span>{g.lb}</span>}
          </div>
        ))}
      </div>
      <div className="sc-legend"><span><i style={{ background: "var(--fw-signal)" }} />Concentration</span><span><i style={{ background: "var(--fw-line-bright)" }} />Related activity</span></div>
    </div>
  );
}

/* ── 6. Report ──────────────────────────────────────────────────────────── */
const FINDINGS = ["Narrative finding", "Sentiment shift", "Escalation indicator", "Geographic pattern"];
export function ReportScene({ active }: { active: boolean }) {
  const play = usePlay(active);
  return (
    <div className={sceneCls(play)}>
      <span className="scene-label">Report builder</span>
      <div className="sc-rep">
        <div className="sc-rep-find">
          {FINDINGS.map((f, i) => (
            <div key={f} className={`sc-rep-item${play ? " sel" : ""}`} style={{ transitionDelay: `${i * 110}ms` }}>
              <span className="chk">{play && <Icon name="check" size={11} color="#fff" />}</span>{f}
            </div>
          ))}
        </div>
        <div className={`sc-rep-doc${play ? " show" : ""}`} style={{ transitionDelay: "260ms" }}>
          <div className="sc-rep-h">Evidence-linked report</div>
          <div className="sc-rep-line" style={{ width: "90%" }} />
          <div className="sc-rep-line" style={{ width: "75%" }} />
          <div style={{ display: "flex", gap: 8 }}>
            <span className="sc-rep-cite"><Icon name="link" size={10} color="var(--fw-signal)" />[1]</span>
            <span className="sc-rep-cite"><Icon name="link" size={10} color="var(--fw-signal)" />[2]</span>
            <span className="sc-rep-cite"><Icon name="link" size={10} color="var(--fw-signal)" />[3]</span>
          </div>
          <div className="sc-rep-line" style={{ width: "82%" }} />
          <span className="sc-rep-unc"><Icon name="help-circle" size={11} color="var(--fw-caution)" />Uncertainty noted</span>
        </div>
      </div>
    </div>
  );
}

export const FLOW_STAGES = [
  { id: "narrative", label: "Narrative", icon: "trending-up", h: "Narrative — stories take shape", s: "Scattered sources cluster into a few dominant narratives.", Scene: NarrativeScene },
  { id: "sentiment", label: "Sentiment", icon: "activity", h: "Sentiment — tone moves", s: "Each narrative carries positive, negative, or divided tone.", Scene: SentimentScene },
  { id: "emotion", label: "Emotion", icon: "heart", h: "Emotion — signals surface", s: "Emotional signals appear in the observed content.", Scene: EmotionScene },
  { id: "threat", label: "Threat", icon: "triangle-alert", h: "Threat — convergence", s: "Recurring signals and pressure converge into a bounded risk view.", Scene: ThreatScene },
  { id: "geography", label: "Geography", icon: "map", h: "Geography — where it happens", s: "The same patterns are placed in their locations.", Scene: GeographyScene },
  { id: "report", label: "Report", icon: "file-check", h: "Report — evidence-linked", s: "Selected findings become a report that stays linked to its evidence.", Scene: ReportScene },
] as const;
