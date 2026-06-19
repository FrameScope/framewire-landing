import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";
import { SceneController } from "../motion/SceneController";
import { useReducedMotion, useSceneClock } from "../motion/sceneClock";
import type { SceneProps } from "../motion/scenes/shared";
import { LensConceptScene } from "../motion/scenes/LensConceptScene";
import { NarrativeScene } from "../motion/scenes/NarrativeScene";
import { ThreatConvergenceScene } from "../motion/scenes/ThreatConvergenceScene";
import { AuthorPortalScene } from "../motion/scenes/AuthorPortalScene";
import { ReportStudioScene } from "../motion/scenes/ReportStudioScene";
import { PipelineScene } from "../motion/scenes/PipelineScene";

/* The approved six-scene Technical Intelligence guided tour, embeddable as a
   homepage section. Keyboard control is scoped to the tour region so it never
   hijacks page scrolling. */

interface SceneDef {
  id: string;
  eyebrow: string;
  title: string;
  definition: string;
  question?: string;
  limitation?: string;
  runFor: number;
  Component: (p: SceneProps) => JSX.Element;
}

const SCENES: SceneDef[] = [
  { id: "lens", eyebrow: "What is an intelligence lens?", title: "The same subject, seen through different lenses", definition: "A FrameWire lens examines one dimension of an investigation while staying connected to the same evidence, entities, claims, locations and timeline.", question: "What does each lens ask of the same subject?", runFor: 12, Component: LensConceptScene },
  { id: "narrative", eyebrow: "Lens · Narrative", title: "Stories form, grow, fade, and compete", definition: "Narrative shows how explanations form and move across sources — which are growing, which are weakening, and which collide.", question: "Which stories are forming, and what evidence carries them?", limitation: "A widely repeated narrative is not automatically true.", runFor: 4, Component: NarrativeScene },
  { id: "threat", eyebrow: "Lens · Threat & escalation", title: "Convergence — not emotion turned into alarm", definition: "Several independent, evidence-backed indicators converge into one bounded escalation view, keeping support, contradiction and uncertainty visible.", question: "Are several meaningful indicators appearing together?", limitation: "Threat indicators support investigation. They are not predictions or final security judgments.", runFor: 4.5, Component: ThreatConvergenceScene },
  { id: "author-portal", eyebrow: "Lenses · Author vs Portal", title: "One author's work, versus one publisher's output", definition: "Author Intelligence studies many articles by one author. Portal Intelligence studies many authors across one publisher domain. Different questions, different shapes.", question: "Whose patterns are we examining — an author's, or a portal's?", limitation: "Patterns describe published material; they do not establish private belief, intention, or coordination.", runFor: 3.5, Component: AuthorPortalScene },
  { id: "report", eyebrow: "Report Studio & human verification", title: "A report is verified into existence, never generated automatically", definition: "Selected findings carry their evidence into Report Studio. AI assists; a human approves, edits, or holds each finding; only then does an evidence-linked report unlock.", question: "Who decides what enters the report?", limitation: "AI assists. Humans decide. The user remains responsible for the final conclusion.", runFor: 6, Component: ReportStudioScene },
  { id: "pipeline", eyebrow: "The robust system underneath", title: "Raw information cannot jump into an intelligence engine", definition: "Ingest → Archive → Extract → Clean → Normalize → Sort → Verify → Engine eligible. Duplicates branch off, failed material is quarantined, and only verified evidence reaches the lenses.", question: "What protects the engines from raw or unverified material?", limitation: "Collection does not equal truth. Role authority does not replace evidence validation.", runFor: 6, Component: PipelineScene },
];

export function GuidedTour({ compact }: { compact: boolean }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const scene = SCENES[index];
  const t = useSceneClock(`${index}:${nonce}`, { reduced, runFor: scene.runFor });

  const go = useCallback((i: number, keepAuto = false) => {
    setIndex(Math.max(0, Math.min(SCENES.length - 1, i)));
    setNonce((n) => n + 1);
    if (!keepAuto) setAutoplay(false);
  }, []);
  const replay = useCallback(() => setNonce((n) => n + 1), []);

  // autoplay — optional, off by default, stops at the end, stops on interaction
  useEffect(() => {
    if (!autoplay || reduced) return;
    if (index >= SCENES.length - 1) { setAutoplay(false); return; }
    const id = setTimeout(() => go(index + 1, true), scene.runFor * 1000 + 1800);
    return () => clearTimeout(id);
  }, [autoplay, reduced, index, scene.runFor, go]);

  // keyboard — scoped to the tour region only
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(SCENES.length - 1); }
  };

  const Scene = scene.Component;

  return (
    <div className="gt" ref={regionRef} onKeyDown={onKey} tabIndex={-1} aria-roledescription="Guided tour">
      <div className="gt-head" key={`gt-${index}`}>
        <div className="gt-eyebrow">
          <span className="gt-num">{String(index + 1).padStart(2, "0")}</span>
          <span>{scene.eyebrow}</span>
        </div>
        <h3 className="gt-title">{scene.title}</h3>
        <p className="gt-def">{scene.definition}</p>
        {scene.question && <p className="gt-q"><Icon name="help-circle" size={15} color="var(--fw-signal)" /> {scene.question}</p>}
      </div>

      <div className="gt-stage" role="group" aria-roledescription="Animated scene" aria-label={scene.title}>
        <Scene key={`${index}:${nonce}`} t={t} reduced={reduced} compact={compact} />
      </div>

      {scene.limitation && (
        <p className="gt-limit"><Icon name="info" size={14} color="var(--fw-caution)" /> {scene.limitation}</p>
      )}

      <SceneController
        count={SCENES.length}
        index={index}
        labels={SCENES.map((s) => s.title)}
        onPrev={() => go(index - 1)}
        onNext={() => go(index + 1)}
        onSelect={(i) => go(i)}
        onReplay={replay}
        autoplay={autoplay}
        onToggleAutoplay={() => setAutoplay((a) => !a)}
      />

      <p className="gt-hint">
        {reduced
          ? "Reduced motion is on — every scene renders its complete, settled state."
          : "Click the tour, then use ← → to move · Home / End jump · Replay restarts the scene."}
      </p>
    </div>
  );
}
