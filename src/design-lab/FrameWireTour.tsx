import { useEffect, useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleHelp,
  FileCheck2,
  FileSearch,
  FileText,
  Files,
  GitCompareArrows,
  Landmark,
  LibraryBig,
  Link2,
  LockKeyhole,
  MapPin,
  MessageSquareText,
  Newspaper,
  Pause,
  Play,
  Quote,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  UserRoundSearch,
  XCircle,
} from "lucide-react";
import { LensIcon, lensIconOrder } from "./LensIcons";
import { finalTourDoctrine, tourLenses, tourStages } from "./tourData";

type FrameWireTourProps = {
  activeStage: number;
  onStageChange: (stage: number) => void;
  onDefinitionNavigate: (target: string, lensIndex?: number) => void;
};

type StoryVisualProps = {
  stageIndex: number;
  motionActive: boolean;
  reviewChoice: string;
  onReviewChoice: (choice: string) => void;
  onMoreEvidence: () => void;
  onDefinitionNavigate: (target: string, lensIndex?: number) => void;
};

type EvidenceRecordProps = {
  label?: string;
  variant?: string;
  compact?: boolean;
};

const reviewChoices = ["Accept", "Qualify", "Correct", "Exclude", "Request more evidence", "Unresolved"];

const lensObservations = [
  "Two competing frames",
  "Critical stance toward policy",
  "Fear language present",
  "Insufficient for a threat conclusion",
  "Event location supported",
  "One claim contradicted",
  "Quoted official identified",
  "Three copies share one origin",
  "Two political actors referenced",
];

const lensPositions = ["north-west", "north", "north-east", "west", "east", "south-west", "south", "south-east", "far-east"];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function activateOnKey(event: KeyboardEvent<HTMLButtonElement>, action: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

function EvidenceRecord({ label = "Selected public record", variant = "", compact = false }: EvidenceRecordProps) {
  return (
    <article className={"taste-film-record " + variant + (compact ? " compact" : "")}>
      <header><FileText size={compact ? 14 : 18} /><span>DEMO-EVIDENCE-001</span></header>
      <strong>{label}</strong>
      <div className="taste-film-record-lines"><i /><i /><i /></div>
      <footer><Link2 size={12} /><span>Original source linked</span></footer>
    </article>
  );
}

function SourceCard({ kind, title, detail }: { kind: string; title: string; detail: string }) {
  const icon = kind === "news" ? <Newspaper size={20} /> : kind === "social" ? <MessageSquareText size={20} /> : kind === "official" ? <Landmark size={20} /> : <Files size={20} />;
  return (
    <article className={"taste-film-source-card " + kind}>
      {icon}
      <div><strong>{title}</strong><span>{detail}</span></div>
      <i /><i />
    </article>
  );
}

function StoryVisual({ stageIndex, motionActive, reviewChoice, onReviewChoice, onMoreEvidence, onDefinitionNavigate }: StoryVisualProps) {
  const motionClass = motionActive ? "motion-run" : "motion-still";

  if (stageIndex === 0) {
    return (
      <div className={"taste-film-scene taste-film-sources " + motionClass}>
        <div className="taste-film-source-field">
          <SourceCard kind="news" title="News & media" detail="Published coverage" />
          <SourceCard kind="social" title="Social post" detail="Public conversation" />
          <SourceCard kind="official" title="Official record" detail="Public material" />
          <SourceCard kind="upload" title="Uploaded document" detail="PDF or evidence file" />
          <div className="taste-film-selection-path" aria-hidden="true"><span /><ArrowRight size={18} /></div>
          <div className="taste-film-selected-record"><EvidenceRecord /><small><Check size={12} /> Selected for investigation</small></div>
        </div>
      </div>
    );
  }

  if (stageIndex === 1) {
    const checks = ["Source", "Permission", "Provider", "Retrieval time", "Method", "Access boundary"];
    return (
      <div className={"taste-film-scene taste-film-ingest " + motionClass}>
        <div className="taste-film-ingest-input">
          <EvidenceRecord label="Incoming public record" compact />
          <div className="taste-film-related-material"><span>Related media</span><span>Official context</span></div>
        </div>
        <div className="taste-film-ingest-gateway">
          <ShieldCheck size={31} />
          <span>Controlled route</span>
          <strong>FrameWire ingest</strong>
          <div>{checks.map((check) => <small key={check}><Check size={11} />{check}</small>)}</div>
        </div>
        <div className="taste-film-ingest-output">
          <EvidenceRecord label="Retrieved with context" compact />
          <div className="taste-film-context-tags"><span>Provider attached</span><span>Time recorded</span></div>
        </div>
      </div>
    );
  }

  if (stageIndex === 2) {
    return (
      <div className={"taste-film-scene taste-film-archive " + motionClass}>
        <div className="taste-film-archive-split" aria-hidden="true"><EvidenceRecord label="Incoming evidence" compact /><span /></div>
        <div className="taste-film-archive-original">
          <div className="taste-film-vault-label"><LockKeyhole size={18} /><span>ORIGINAL</span></div>
          <EvidenceRecord label="Preserved original" variant="original" />
          <div className="taste-film-vault-stamp"><CheckCircle2 size={14} /><span>Timestamped · provenance locked</span></div>
        </div>
        <div className="taste-film-provenance-link" aria-label="Working copy remains linked to original"><Link2 size={17} /><span /></div>
        <div className="taste-film-working-copy">
          <span>WORKING COPY</span>
          <EvidenceRecord label="Analysis working copy" variant="working" />
          <small>Continues forward</small>
        </div>
      </div>
    );
  }

  if (stageIndex === 3) {
    const actions = ["Clean", "Extract", "Normalize", "Deduplicate", "Classify", "Link context"];
    return (
      <div className={"taste-film-scene taste-film-prepare " + motionClass}>
        <div className="taste-film-archive-anchor"><LockKeyhole size={15} /><span>Archived original</span><strong>DEMO-EVIDENCE-001</strong></div>
        <div className="taste-film-prepare-track" aria-hidden="true"><span /></div>
        <div className="taste-film-copy-stack">
          <i /><i />
          <EvidenceRecord label="Working copy" variant="working" />
          <div className="taste-film-copy-highlight"><Quote size={13} /><span>Claim span identified</span></div>
        </div>
        <div className="taste-film-prepare-actions">
          {actions.map((action, index) => <span key={action} style={{ "--action-order": index } as CSSProperties}><Check size={11} />{action}</span>)}
        </div>
        <div className="taste-film-entity-tags"><span>Actor</span><span>Place</span><span>Author</span><span>Source</span></div>
        <div className="taste-film-lineage-alive"><Link2 size={13} /><span>Lineage to original remains visible</span></div>
      </div>
    );
  }

  if (stageIndex === 4) {
    return (
      <div className={"taste-film-scene taste-film-lenses " + motionClass}>
        <svg className="taste-film-lens-paths" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
          <path d="M500 260 L145 82" /><path d="M500 260 L500 58" /><path d="M500 260 L825 82" />
          <path d="M500 260 L105 260" /><path d="M500 260 L895 260" />
          <path d="M500 260 L145 438" /><path d="M500 260 L500 462" /><path d="M500 260 L825 438" /><path d="M500 260 L955 405" />
        </svg>
        <div className="taste-film-lens-record"><EvidenceRecord label="Prepared evidence" variant="working" compact /><span>Same evidence</span></div>
        <div className="taste-film-lens-modules" role="group" aria-label="Optional analytical lens definitions">
          {tourLenses.map((lens, index) => (
            <button
              type="button"
              key={lens.name}
              className={lensPositions[index]}
              data-testid={"tour-node-4-" + index}
              onClick={() => onDefinitionNavigate(lens.target, lens.lensIndex)}
              onKeyDown={(event) => activateOnKey(event, () => onDefinitionNavigate(lens.target, lens.lensIndex))}
            >
              <LensIcon kind={lensIconOrder[lens.lensIndex]} size={18} strokeWidth={1.45} aria-hidden="true" />
              <strong>{lens.name}</strong><span>{lensObservations[index]}</span><small>Explore definition</small>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (stageIndex === 5) {
    const states = [
      { name: "Supported", detail: "Event location supported", icon: <CheckCircle2 size={16} /> },
      { name: "Contradicted", detail: "One public claim contradicted", icon: <XCircle size={16} /> },
      { name: "Unresolved", detail: "Actor attribution unresolved", icon: <CircleHelp size={16} /> },
      { name: "Insufficient", detail: "No threat conclusion", icon: <CircleAlert size={16} /> },
    ];
    return (
      <div className={"taste-film-scene taste-film-compare " + motionClass}>
        <div className="taste-film-returning-observations"><span>Narrative</span><span>Geography</span><span>Fact-Check</span><span>Threat</span></div>
        <div className="taste-film-compare-flow" aria-hidden="true"><i /><i /><i /><i /></div>
        <article className="taste-film-comparison-surface">
          <header><GitCompareArrows size={20} /><div><span>DEMO-EVIDENCE-001</span><strong>Comparison remains open</strong></div></header>
          <div className="taste-film-state-list">{states.map((state) => <div className={state.name.toLowerCase()} key={state.name}>{state.icon}<span><strong>{state.name}</strong><small>{state.detail}</small></span></div>)}</div>
        </article>
      </div>
    );
  }

  if (stageIndex === 6) {
    return (
      <div className={"taste-film-scene taste-film-investigate " + motionClass}>
        <div className="taste-film-workspace">
          <header><UserRoundSearch size={20} /><div><span>Illustrative investigation</span><strong>How do the public accounts differ?</strong></div><small>DEMO-EVIDENCE-001</small></header>
          <div className="taste-film-workspace-body">
            <aside>
              <span>Evidence</span>
              <button type="button" className="active"><LockKeyhole size={13} /> Archived original</button>
              <button type="button"><Newspaper size={13} /> News article</button>
              <button type="button"><Landmark size={13} /> Official record</button>
            </aside>
            <article className="taste-film-workspace-document">
              <div><span>Exact evidence</span><strong>Public claim record</strong></div>
              <i /><i /><p><Quote size={14} /> The attributed claim differs across the preserved sources.</p><i />
              <small><Link2 size={12} /> Open source origin</small>
            </article>
            <aside className="taste-film-workspace-inspector">
              <span>Review</span>
              <div><GitCompareArrows size={13} /> Contradiction visible</div>
              <div><MapPin size={13} /> Location supported</div>
              <div><FileSearch size={13} /> Attribution requires review</div>
              <label><span>Investigator note</span><textarea readOnly value="Keep the attribution question unresolved." aria-label="Illustrative investigator note" /></label>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  if (stageIndex === 7) {
    return (
      <div className={"taste-film-scene taste-film-verify " + motionClass + (reviewChoice === "Request more evidence" ? " show-return" : "")}>
        <div className="taste-film-review-gate"><ShieldCheck size={27} /><span>Human review gate</span><strong>Responsibility stays with the reviewer</strong></div>
        <div className="taste-film-review-outcomes">
          <article className="qualified"><span>Finding A</span><strong>Qualified</strong><small><Check size={12} /> May proceed to report</small></article>
          <article className="more"><span>Finding B</span><strong>More evidence required</strong><small><RotateCcw size={12} /> Returns to collection</small></article>
        </div>
        <div className="taste-film-review-choices" role="group" aria-label="Human verification choices">
          {reviewChoices.map((choice) => (
            <button
              type="button"
              key={choice}
              className={reviewChoice === choice ? "active" : ""}
              aria-pressed={reviewChoice === choice}
              data-testid={"tour-review-" + choice.toLowerCase().replace(/ /g, "-")}
              onClick={() => onReviewChoice(choice)}
              onKeyDown={(event) => activateOnKey(event, () => onReviewChoice(choice))}
            >{reviewChoice === choice && <Check size={12} />}{choice}</button>
          ))}
        </div>
        <div className="taste-film-review-return" aria-live="polite">
          <RotateCcw size={16} /><span>DEMO-EVIDENCE-001 returns for more public evidence.</span>
          <button type="button" data-testid="tour-follow-fallback" onClick={onMoreEvidence} onKeyDown={(event) => activateOnKey(event, onMoreEvidence)}>Follow return <ArrowRight size={13} /></button>
        </div>
      </div>
    );
  }

  if (stageIndex === 8) {
    const reportSections = [
      ["Summary", "Reviewed account of the public record."],
      ["Evidence", "Exact preserved sources and citations."],
      ["Competing interpretation", "Alternative framing remains visible."],
      ["Contradictions", "One claim remains contradicted."],
      ["Limitations", "Coverage and attribution limits."],
      ["Human conclusion", "Qualified by the reviewer."],
    ];
    return (
      <div className={"taste-film-scene taste-film-report-scene " + motionClass}>
        <div className="taste-film-citation-sources">
          <article><LockKeyhole size={14} /><span>Archived source</span><strong>DEMO-EVIDENCE-001</strong></article>
          <article><Quote size={14} /><span>Exact evidence</span><strong>Attributed claim span</strong></article>
          <article><GitCompareArrows size={14} /><span>Relevant observations</span><strong>Qualified comparison</strong></article>
        </div>
        <div className="taste-film-citation-lines" aria-hidden="true"><i /><i /><i /></div>
        <article className="taste-film-report-document">
          <header><FileCheck2 size={22} /><div><span>Human-verified</span><strong>Evidence-backed report</strong></div></header>
          {reportSections.map(([title, detail]) => <section key={title}><strong>{title}</strong><span>{detail}</span><i /></section>)}
          <footer><Link2 size={12} /><span>Citations resolve to evidence</span></footer>
        </article>
      </div>
    );
  }

  const memoryNodes = ["Original evidence", "Investigation", "Sources", "Authors", "Entities", "Locations", "Reviewed findings", "Decisions"];
  return (
    <div className={"taste-film-scene taste-film-memory " + motionClass}>
      <div className="taste-film-memory-nodes">{memoryNodes.map((node) => <span key={node}>{node}</span>)}</div>
      <div className="taste-film-memory-lines" aria-hidden="true"><i /><i /><i /><i /></div>
      <article className="taste-film-memory-report"><FileCheck2 size={23} /><span>DEMO-EVIDENCE-001</span><strong>Reviewed report</strong><small>Context, not automatic truth</small></article>
      <div className="taste-film-future-path" aria-hidden="true"><span /><ArrowRight size={17} /></div>
      <article className="taste-film-future-investigation"><LibraryBig size={23} /><span>Future investigation</span><strong>Reviewed context discovered</strong><small>A new human question begins.</small></article>
    </div>
  );
}

export default function FrameWireTour({ activeStage, onStageChange, onDefinitionNavigate }: FrameWireTourProps) {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [motionActive, setMotionActive] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);
  const [reviewChoice, setReviewChoice] = useState("Qualify");
  const stage = tourStages[activeStage];
  const progress = ((activeStage + 1) / tourStages.length) * 100;

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setTimeout(() => {
      if (activeStage === tourStages.length - 1) {
        setPlaying(false);
      } else {
        onStageChange(activeStage + 1);
        setSceneKey((value) => value + 1);
      }
    }, 7600);
    return () => window.clearTimeout(timer);
  }, [activeStage, onStageChange, playing, reducedMotion]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPlaying(false);
      setMotionActive(false);
    }
  }, [reducedMotion]);

  const selectStage = (index: number) => {
    setPlaying(false);
    setMotionActive(!reducedMotion);
    setSceneKey((value) => value + 1);
    onStageChange(index);
  };

  const previous = () => selectStage(Math.max(0, activeStage - 1));
  const next = () => selectStage(Math.min(tourStages.length - 1, activeStage + 1));

  const play = () => {
    if (reducedMotion || activeStage === tourStages.length - 1) return;
    setMotionActive(true);
    setSceneKey((value) => value + 1);
    setPlaying(true);
  };

  const restart = () => {
    setPlaying(false);
    setMotionActive(false);
    setReviewChoice("Qualify");
    setSceneKey((value) => value + 1);
    onStageChange(0);
  };

  const openLensDefinition = (target: string, lensIndex?: number) => {
    setPlaying(false);
    onDefinitionNavigate(target, lensIndex);
  };

  const returnForEvidence = () => {
    setPlaying(false);
    setMotionActive(!reducedMotion);
    setSceneKey((value) => value + 1);
    onStageChange(1);
  };

  return (
    <section className={"taste-tour taste-film-tour taste-story-stage tone-" + stage.tone} id="framewire-tour" tabIndex={-1} aria-labelledby="framewire-tour-title">
      <div className="taste-tour-header">
        <div>
          <p className="taste-kicker">Guided FrameWire tour</p>
          <h2 id="framewire-tour-title">Watch one record become a report.</h2>
        </div>
        <p>Follow the same fictional public record as it is collected, preserved, examined, verified by a human and retained as reviewed context.</p>
      </div>

      <div className="taste-tour-case">
        <span>Illustrative walkthrough</span>
        <p>No real event or operational claim is represented. A news article, official statement and public posts describe the same fictional event differently.</p>
      </div>

      <div className="taste-film-progress">
        <div className="taste-film-progress-copy"><span>{activeStage + 1} of {tourStages.length}</span><strong>{stage.shortName}</strong></div>
        <div className="taste-film-progress-bar" aria-hidden="true"><span style={{ transform: "scaleX(" + progress / 100 + ")" }} /></div>
        <div className="taste-film-step-dots" role="tablist" aria-label="FrameWire report journey">
          {tourStages.map((item, index) => (
            <button
              type="button"
              role="tab"
              key={item.name}
              aria-label={String(index + 1).padStart(2, "0") + " " + item.shortName}
              aria-selected={activeStage === index}
              aria-controls="tour-film-stage"
              className={activeStage === index ? "active" : index < activeStage ? "complete" : ""}
              data-testid={"tour-stage-" + index}
              onClick={() => selectStage(index)}
              onKeyDown={(event) => activateOnKey(event, () => selectStage(index))}
            ><span>{String(index + 1).padStart(2, "0")}</span></button>
          ))}
        </div>
      </div>

      <div className="taste-film-stage" id="tour-film-stage" role="tabpanel" aria-live="polite">
        <header className="taste-film-stage-head">
          <div><FileText size={15} /><span>DEMO-EVIDENCE-001</span></div>
          <span>{reducedMotion ? "Reduced motion" : motionActive ? "Evidence journey active" : "Ready — select Play or Next"}</span>
        </header>

        <StoryVisual
          key={activeStage + "-" + sceneKey}
          stageIndex={activeStage}
          motionActive={motionActive && !reducedMotion}
          reviewChoice={reviewChoice}
          onReviewChoice={(choice) => { setPlaying(false); setReviewChoice(choice); }}
          onMoreEvidence={returnForEvidence}
          onDefinitionNavigate={openLensDefinition}
        />

        <footer className="taste-film-narrative">
          <div><span>{String(activeStage + 1).padStart(2, "0")} / {String(tourStages.length).padStart(2, "0")}</span><h3>{stage.name}</h3></div>
          <p>{stage.statement}</p>
          <small>{stage.support}</small>
        </footer>
      </div>

      {activeStage === tourStages.length - 1 && (
        <div className="taste-tour-finale" data-testid="tour-finale">
          <LibraryBig size={22} />
          <p>The source survives. The human decision remains inspectable. Reviewed history can inform—but never decide—the next investigation.</p>
          <div>{finalTourDoctrine.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}

      <div className="taste-tour-controls" aria-label="FrameWire tour controls">
        <button type="button" data-testid="tour-previous" disabled={activeStage === 0} onClick={previous} onKeyDown={(event) => activateOnKey(event, previous)}><ArrowLeft size={16} /> Previous</button>
        <button type="button" data-testid="tour-next" disabled={activeStage === tourStages.length - 1} onClick={next} onKeyDown={(event) => activateOnKey(event, next)}>Next <ArrowRight size={16} /></button>
        {playing ? (
          <button type="button" data-testid="tour-pause" onClick={() => setPlaying(false)} onKeyDown={(event) => activateOnKey(event, () => setPlaying(false))}><Pause size={15} /> Pause</button>
        ) : (
          <button type="button" data-testid="tour-play" disabled={reducedMotion || activeStage === tourStages.length - 1} onClick={play} onKeyDown={(event) => activateOnKey(event, play)}><Play size={15} /> Play Tour</button>
        )}
        <button type="button" data-testid="tour-restart" onClick={restart} onKeyDown={(event) => activateOnKey(event, restart)}><RefreshCcw size={15} /> Restart</button>
        <span><ShieldCheck size={15} /> {reducedMotion ? "Direct scene changes" : playing ? "Tour playing" : motionActive ? "Scene ready" : "Tour paused"}</span>
      </div>
    </section>
  );
}
