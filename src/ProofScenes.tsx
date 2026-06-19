import { useCallback, useEffect, useState } from "react";
import { Wordmark } from "./components/ui/Wordmark";
import { Icon } from "./components/ui/Icon";
import { SceneController } from "./components/motion/SceneController";
import { useReducedMotion, useSceneClock } from "./components/motion/sceneClock";
import type { SceneProps } from "./components/motion/scenes/shared";
import { LensConceptScene } from "./components/motion/scenes/LensConceptScene";
import { NarrativeScene } from "./components/motion/scenes/NarrativeScene";
import { ThreatConvergenceScene } from "./components/motion/scenes/ThreatConvergenceScene";
import { AuthorPortalScene } from "./components/motion/scenes/AuthorPortalScene";
import { ReportStudioScene } from "./components/motion/scenes/ReportStudioScene";
import { PipelineScene } from "./components/motion/scenes/PipelineScene";

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
  {
    id: "lens",
    eyebrow: "What is an intelligence lens?",
    title: "The same subject, seen through different lenses",
    definition: "A FrameWire lens examines one dimension of an investigation while staying connected to the same evidence, entities, claims, locations and timeline.",
    question: "What does each lens ask of the same subject?",
    runFor: 12,
    Component: LensConceptScene,
  },
  {
    id: "narrative",
    eyebrow: "Lens · Narrative",
    title: "Stories form, grow, fade, and compete",
    definition: "Narrative shows how explanations form and move across sources — which are growing, which are weakening, and which collide.",
    question: "Which stories are forming, and what evidence carries them?",
    limitation: "A widely repeated narrative is not automatically true.",
    runFor: 4,
    Component: NarrativeScene,
  },
  {
    id: "threat",
    eyebrow: "Lens · Threat & escalation",
    title: "Convergence — not emotion turned into alarm",
    definition: "Several independent, evidence-backed indicators converge into one bounded escalation view, keeping support, contradiction and uncertainty visible.",
    question: "Are several meaningful indicators appearing together?",
    limitation: "Threat indicators support investigation. They are not predictions or final security judgments.",
    runFor: 4.5,
    Component: ThreatConvergenceScene,
  },
  {
    id: "author-portal",
    eyebrow: "Lenses · Author vs Portal",
    title: "One author's work, versus one publisher's output",
    definition: "Author Intelligence studies many articles by one author. Portal Intelligence studies many authors across one publisher domain. Different questions, different shapes.",
    question: "Whose patterns are we examining — an author's, or a portal's?",
    limitation: "Patterns describe published material; they do not establish private belief, intention, or coordination.",
    runFor: 3.5,
    Component: AuthorPortalScene,
  },
  {
    id: "report",
    eyebrow: "Report Studio & human verification",
    title: "A report is verified into existence, never generated automatically",
    definition: "Selected findings carry their evidence into Report Studio. AI assists; a human approves, edits, or holds each finding; only then does an evidence-linked report unlock.",
    question: "Who decides what enters the report?",
    limitation: "AI assists. Humans decide. The user remains responsible for the final conclusion.",
    runFor: 6,
    Component: ReportStudioScene,
  },
  {
    id: "pipeline",
    eyebrow: "The robust system underneath",
    title: "Raw information cannot jump into an intelligence engine",
    definition: "Ingest → Archive → Extract → Clean → Normalize → Sort → Verify → Engine eligible. Duplicates branch off, failed material is quarantined, and only verified evidence reaches the lenses.",
    question: "What protects the engines from raw or unverified material?",
    limitation: "Collection does not equal truth. Role authority does not replace evidence validation.",
    runFor: 6,
    Component: PipelineScene,
  },
];

function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return narrow;
}

export default function ProofScenes() {
  const reduced = useReducedMotion();
  const compact = useIsNarrow();
  const [index, setIndex] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const scene = SCENES[index];
  const t = useSceneClock(`${index}:${nonce}`, { reduced, runFor: scene.runFor });

  const go = useCallback((i: number, keepAuto = false) => {
    setIndex(Math.max(0, Math.min(SCENES.length - 1, i)));
    setNonce((n) => n + 1);
    if (!keepAuto) setAutoplay(false);
  }, []);
  const replay = useCallback(() => setNonce((n) => n + 1), []);

  // keyboard — never traps input fields; arrows/home/end only
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(SCENES.length - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  // optional autoplay — off by default, stops at the last scene, stops on interaction
  useEffect(() => {
    if (!autoplay || reduced) return;
    if (index >= SCENES.length - 1) { setAutoplay(false); return; }
    const id = setTimeout(() => go(index + 1, true), scene.runFor * 1000 + 1800);
    return () => clearTimeout(id);
  }, [autoplay, reduced, index, scene.runFor, go]);

  const Scene = scene.Component;

  return (
    <>
      <a href="#stage" className="fw-skip">Skip to content</a>

      <nav className="fw-nav" aria-label="Primary">
        <div className="fw-container proof-nav">
          <Wordmark size={24} />
          <span className="proof-nav-tag">Technical intelligence</span>
        </div>
      </nav>

      <main id="stage" className="proof-main">
        <div className="fw-container">
          <header className="proof-head" key={`h-${index}`}>
            <div className="proof-eyebrow">
              <span className="proof-num">{String(index + 1).padStart(2, "0")}</span>
              <span>{scene.eyebrow}</span>
            </div>
            <h1 className="proof-title">{scene.title}</h1>
            <p className="proof-def">{scene.definition}</p>
            {scene.question && <p className="proof-q"><Icon name="help-circle" size={15} color="var(--fw-signal)" /> {scene.question}</p>}
          </header>

          <div className="proof-stage" role="group" aria-roledescription="Animated scene" aria-label={scene.title}>
            <Scene key={`${index}:${nonce}`} t={t} reduced={reduced} compact={compact} />
          </div>

          {scene.limitation && (
            <p className="proof-limit"><Icon name="info" size={14} color="var(--fw-caution)" /> {scene.limitation}</p>
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

          <p className="proof-hint">
            {reduced
              ? "Reduced motion is on — every scene renders its complete, settled state."
              : "Arrow keys move between scenes · Home / End jump to first / last · Replay restarts the current scene."}
          </p>
        </div>
      </main>
    </>
  );
}
