import { Icon } from "../../ui/Icon";
import { MotionCanvas } from "../MotionCanvas";
import { AnimatedEdge } from "../AnimatedEdge";
import { getRevealProgress } from "../sceneClock";
import { EASING, clamp01 } from "../easing";
import type { SceneProps } from "./shared";

/* Scene 4 — Author vs Portal Intelligence (clearly different).
   Author = ONE author → many of their articles → recurring topics & tone over time.
   Portal = ONE domain → many different authors → topic concentration & frequency. */

const ARTICLES = [60, 130, 210, 280];
const AUTHORS = [
  { x: 372, label: "A. Sharma" },
  { x: 446, label: "R. Thapa" },
  { x: 520, label: "S. Karki" },
  { x: 590, label: "+5 more" },
];

export function AuthorPortalScene({ t }: SceneProps) {
  const reveal = (s: number, d = 0.5, e = EASING.outCubic) => clamp01(getRevealProgress(t, s, d, e));
  return (
    <MotionCanvas
      w={650}
      h={460}
      summary="Two distinct workspaces side by side. Author Intelligence shows one author connected to many of their own articles, with recurring topics and tone changing over time. Portal Intelligence shows one publisher domain connected to many different authors, with topic concentration and publishing frequency. They examine different things."
    >
      <svg viewBox="0 0 650 460" className="mc-svg" aria-hidden="true">
        {/* Author → its articles */}
        {ARTICLES.map((x, i) => (
          <AnimatedEdge key={`a${i}`} x1={155} y1={96} x2={x} y2={150} p={getRevealProgress(t, 0.7 + i * 0.1, 0.5)} color="var(--fw-signal)" opacity={0.4} t={t} pulse />
        ))}
        {/* Portal → its authors */}
        {AUTHORS.map((a, i) => (
          <AnimatedEdge key={`p${i}`} x1={495} y1={96} x2={a.x} y2={150} p={getRevealProgress(t, 0.7 + i * 0.1, 0.5)} color="var(--fw-archive)" opacity={0.4} t={t} pulse />
        ))}
        <line x1={325} y1={26} x2={325} y2={440} stroke="var(--fw-line)" strokeWidth={1} />
      </svg>

      {/* ── Author Intelligence (left) ── */}
      <div className="ap-head" style={{ left: 18, top: 8, color: "var(--fw-signal)", opacity: reveal(0.05) }}>Author Intelligence</div>
      <div className="mn ap-root" style={{ left: 155, top: 70, opacity: reveal(0.1, 0.5, EASING.outBack), transform: `translate(-50%,-50%) scale(${0.8 + 0.2 * reveal(0.1)})`, borderColor: "var(--fw-signal-edge)" }}>
        <Icon name="pen-line" size={14} color="var(--fw-signal)" />
        <span>Author · A. Sharma</span>
      </div>
      {ARTICLES.map((x, i) => (
        <div key={i} className="ap-article" style={{ left: x, top: 150, opacity: reveal(0.8 + i * 0.1) }}>
          <Icon name="file-text" size={12} color="var(--fw-ink-3)" />
        </div>
      ))}
      <div className="ap-sub" style={{ left: 18, top: 205, opacity: reveal(1.6) }}>Recurring topics</div>
      <div className="ap-chips" style={{ left: 18, top: 228, opacity: reveal(1.7) }}>
        {["Floods", "Relief funds", "Policy"].map((c) => <span key={c}>{c}</span>)}
      </div>
      <div className="ap-sub" style={{ left: 18, top: 300, opacity: reveal(2.0) }}>Tone over time</div>
      <div className="ap-bars" style={{ left: 18, top: 324, opacity: reveal(2.1) }}>
        {[40, 55, 38, 62, 48].map((h, i) => <i key={i} style={{ height: `${h * reveal(2.1 + i * 0.08)}%` }} />)}
      </div>
      <div className="ap-foot" style={{ left: 18, top: 412, opacity: reveal(2.4) }}>One author · many articles</div>

      {/* ── Portal Intelligence (right) ── */}
      <div className="ap-head" style={{ left: 345, top: 8, color: "var(--fw-archive)", opacity: reveal(0.05) }}>Portal Intelligence</div>
      <div className="mn ap-root" style={{ left: 495, top: 70, opacity: reveal(0.1, 0.5, EASING.outBack), transform: `translate(-50%,-50%) scale(${0.8 + 0.2 * reveal(0.1)})`, borderColor: "var(--fw-archive-edge)" }}>
        <Icon name="globe" size={14} color="var(--fw-archive)" />
        <span>Portal · relief-news.np</span>
      </div>
      {AUTHORS.map((a, i) => (
        <div key={a.label} className="ap-author" style={{ left: a.x, top: 150, opacity: reveal(0.8 + i * 0.1) }}>
          <Icon name="user-check" size={11} color="var(--fw-ink-3)" />
          <span>{a.label}</span>
        </div>
      ))}
      <div className="ap-sub" style={{ left: 345, top: 205, opacity: reveal(1.6) }}>Topic concentration</div>
      <div className="ap-conc" style={{ left: 345, top: 228, opacity: reveal(1.7) }}>
        {[["Disaster relief", 78], ["Local politics", 52], ["Economy", 34]].map(([l, w], i) => (
          <div key={l as string}><span>{l}</span><i style={{ width: `${(w as number) * reveal(1.8 + i * 0.1)}%` }} /></div>
        ))}
      </div>
      <div className="ap-sub" style={{ left: 345, top: 320, opacity: reveal(2.0) }}>Publishing frequency</div>
      <div className="ap-freq" style={{ left: 345, top: 344, opacity: reveal(2.1) }}>
        {[...Array(9)].map((_, i) => <span key={i} style={{ opacity: 0.3 + 0.7 * reveal(2.1 + i * 0.05) }} />)}
      </div>
      <div className="ap-foot" style={{ left: 345, top: 412, opacity: reveal(2.4) }}>One portal · many authors</div>
    </MotionCanvas>
  );
}
