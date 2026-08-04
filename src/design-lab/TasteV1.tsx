import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileJson,
  FileSpreadsheet,
  FileText,
  FolderArchive,
  GitBranch,
  History,
  Layers3,
  Link2,
  LockKeyhole,
  Network,
  Pause,
  Play,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Wordmark } from "../components/ui/Wordmark";
import { Button } from "../components/ui/Button";
import { BETA_MAILTO, CONTACT_MAILTO } from "../config";
import FrameWireTour from "./FrameWireTour";
import { LensIcon, type LensIconKind } from "./LensIcons";
import WhyFrameWire from "./WhyFrameWire";
import {
  audiences,
  evidenceStates,
  illustrativeCase,
  lenses,
  productGroups,
  systemMap,
  userStages,
  workbenchTabs,
} from "./tasteData";

const doctrine = [
  "Understand Before Concluding.",
  "Archive First.",
  "Evidence Before Conclusion.",
  "Deterministic First.",
  "LLM Assists.",
  "Humans Decide.",
];

const archiveCapabilities = [
  ["Governed collection", "Public sources and uploads enter through bounded, attributable intake."],
  ["Untouched raw evidence", "The original remains preserved while readable derivatives are created."],
  ["Provenance history", "Source, provider, retrieval time and transformations stay inspectable."],
  ["Deduplication", "Copies and syndication families are organised without erasing lineage."],
  ["Quarantine and eligibility", "Malformed or unverified material cannot silently enter a lens."],
  ["Document extraction", "OCR and file extraction preserve a route back to the submitted original."],
  ["Source Inspector", "A reviewer can inspect exact source material, metadata and derived text."],
  ["Honest insufficiency", "Missing or contradictory evidence remains visible rather than forced closed."],
];

const crossLensRelations = [
  "Narrative ↔ Sentiment",
  "Fact-check ↔ Threat",
  "Sentiment ↔ Geography",
  "Narrative ↔ Geography",
  "Author ↔ Portal",
  "Entity ↔ Memory",
  "Story ↔ Evidence",
];

const reportAssembly = [
  ["Finding", "The document states a defined start date."],
  ["Exact evidence", "Source excerpt and page location remain attached."],
  ["Contradiction", "Public descriptions disagree about duration."],
  ["Limitation", "No preserved source resolves the final end date."],
  ["Human note", "Qualify the timing claim and retain the open question."],
  ["Finalisation", "A human approves the wording and evidence package."],
];

const exportTypes = ["JSON", "CSV", "HTML", "PDF", "Evidence package", "Timeline", "Lens outputs", "Geographic context", "Cross-engine matrix", "Reproducible manifest"];
const analyticTypes = ["Dataset profiling", "Trend summaries", "Geographic comparison", "Correlation candidates", "Anomaly candidates", "Reproducible method logs"];
const memoryNodes = ["Evidence", "Prior investigation", "Entity", "Narrative family", "Source", "Location", "Finding", "Report"];
const lensDefinitionTargets = ["lens-narrative", "lens-sentiment", "lens-emotion", "lens-threat", "lens-fact-check", "lens-geography", "lens-politico", "lens-author", "lens-portal", "lens-entity"];

function activateOnKey(event: KeyboardEvent<HTMLButtonElement>, action: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useCycle(length: number, delay = 3200) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % length), delay);
    return () => window.clearInterval(timer);
  }, [delay, length, playing, reduced]);

  const previous = () => setIndex((value) => (value - 1 + length) % length);
  const next = () => setIndex((value) => (value + 1) % length);

  return { index, setIndex, playing, setPlaying, previous, next, reduced };
}

function useScrollReveal() {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-taste-reveal]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("taste-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("taste-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Controls({
  label,
  testId,
  index,
  total,
  playing,
  onPrevious,
  onNext,
  onPlaying,
}: {
  label: string;
  testId: string;
  index: number;
  total: number;
  playing: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPlaying: (playing: boolean) => void;
}) {
  return (
    <div className="taste-controls" aria-label={`${label} controls`}>
      <button type="button" data-testid={`${testId}-previous`} onClick={onPrevious} aria-label={`Previous ${label} item`}><ChevronLeft size={16} /></button>
      <span aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      <button type="button" data-testid={`${testId}-next`} onClick={onNext} aria-label={`Next ${label} item`}><ChevronRight size={16} /></button>
      {playing ? (
        <button type="button" data-testid={`${testId}-pause`} onClick={() => onPlaying(false)} aria-label={`Pause ${label} animation`}><Pause size={15} /> Pause</button>
      ) : (
        <button type="button" data-testid={`${testId}-play`} onClick={() => onPlaying(true)} aria-label={`Play ${label} animation`}><Play size={15} /> Play</button>
      )}
    </div>
  );
}

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="taste-section-head" data-taste-reveal>
      <p className="taste-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{lead}</p>
    </div>
  );
}

function DemoFlag({ children = "Illustrative product demonstration" }: { children?: ReactNode }) {
  return <span className="taste-demo-flag"><Sparkles size={13} aria-hidden="true" /> {children}</span>;
}

function SystemMap() {
  const cycle = useCycle(systemMap.length, 3000);
  const active = systemMap[cycle.index];
  const Icon = active.icon;

  return (
    <div className="taste-system-map" data-taste-reveal>
      <div className="taste-system-rail" role="group" aria-label="FrameWire product flow">
        {systemMap.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <button
              className={index === cycle.index ? "active" : ""}
              key={step.name}
              type="button"
              data-testid={`system-step-${index}`}
              aria-pressed={index === cycle.index}
              onClick={() => cycle.setIndex(index)}
              onKeyDown={(event) => activateOnKey(event, () => cycle.setIndex(index))}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <StepIcon size={19} strokeWidth={1.45} aria-hidden="true" />
              <strong>{step.name}</strong>
            </button>
          );
        })}
      </div>
      <div className="taste-system-readout" key={active.name}>
        <div><Icon size={28} strokeWidth={1.35} /><span>ACTIVE SYSTEM STATE</span></div>
        <h3>{active.name}</h3>
        <p>{active.detail}</p>
        <Controls label="system map" testId="system" index={cycle.index} total={systemMap.length} playing={cycle.playing} onPrevious={cycle.previous} onNext={cycle.next} onPlaying={cycle.setPlaying} />
      </div>
    </div>
  );
}

function ProductStages() {
  const cycle = useCycle(userStages.length, 5000);
  const stage = userStages[cycle.index];

  return (
    <section className="taste-product-stages" id="governed-collection" tabIndex={-1}>
      <SectionHead eyebrow="Search to investigation to report" title="Three human stages. One preserved evidence chain." lead="The same fictional investigation moves from discovery to contextual examination and finally to a report a human can defend." />
      <div className="taste-stage-layout" data-taste-reveal>
        <div className="taste-stage-tabs" role="tablist" aria-label="FrameWire user stages">
          {userStages.map((item, index) => (
            <button
              type="button"
              role="tab"
              key={item.name}
              id={`taste-stage-tab-${index}`}
              aria-controls="taste-stage-panel"
              aria-selected={cycle.index === index}
              data-testid={`stage-${item.name.toLowerCase()}`}
              className={cycle.index === index ? "active" : ""}
              onClick={() => cycle.setIndex(index)}
              onKeyDown={(event) => activateOnKey(event, () => cycle.setIndex(index))}
            >
              <span>{item.question}</span>
              <strong>{item.name}</strong>
              <ArrowRight size={17} />
            </button>
          ))}
        </div>
        <article className="taste-stage-panel" role="tabpanel" id="taste-stage-panel" aria-labelledby={`taste-stage-tab-${cycle.index}`} key={stage.name}>
          <div className="taste-stage-case"><DemoFlag>{illustrativeCase.label}</DemoFlag><strong>{illustrativeCase.title}</strong><p>{illustrativeCase.question}</p></div>
          <div className="taste-stage-copy"><p className="taste-stage-question">{stage.question}</p><h3>{stage.name}</h3><p>{stage.summary}</p></div>
          <ul className="taste-stage-items">{stage.items.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
          <div className="taste-stage-demo"><span>DEMONSTRATION VIEW</span><p>{stage.demo}</p></div>
          <Controls label="product stage" testId="stage" index={cycle.index} total={userStages.length} playing={cycle.playing} onPrevious={cycle.previous} onNext={cycle.next} onPlaying={cycle.setPlaying} />
        </article>
      </div>
    </section>
  );
}

function ProductExplorer() {
  const cycle = useCycle(productGroups.length, 5200);
  const group = productGroups[cycle.index];
  const safeguards = ["Role-based access", "Human review gates", "Source and provider controls", "Budget and capability limits", "Audit records", "Operational safeguards"];

  const detail = (mobile = false) => (
    <article className={mobile ? "taste-explorer-detail taste-explorer-mobile" : "taste-explorer-detail"} key={`${group.name}-${mobile ? "mobile" : "desktop"}`} aria-live="polite" data-testid={mobile ? "explorer-mobile-detail" : "explorer-detail"}>
      <div className="taste-explorer-heading"><DemoFlag /><span>{group.verb}</span><h3>{group.name}</h3><p>{group.purpose}</p></div>
      <div className="taste-explorer-pages" aria-label={`${group.name} pages`}>
        {group.pages.map((page) => <span className={page.startsWith("Threat ›") ? "nested" : ""} key={page}>{page}</span>)}
      </div>
      <dl className="taste-explorer-grid">
        <div><dt>How it connects</dt><dd>{group.connection}</dd></div>
        <div><dt>Illustrative action</dt><dd>{group.action}</dd></div>
        <div><dt>Example output</dt><dd>{group.output}</dd></div>
        <div><dt>Next stage</dt><dd>{group.next}</dd></div>
      </dl>
    </article>
  );

  return (
    <section className="taste-product-explorer" id="live" tabIndex={-1}>
      <SectionHead eyebrow="Public product journey" title="Explore the FrameWire system." lead="Four public-facing groups carry an investigator from observation through analysis and context to a preserved, reviewable report." />
      <div className="taste-explorer-shell" data-taste-reveal>
        <aside className="taste-explorer-sidebar" aria-label="FrameWire public product groups">
          <div className="taste-sidebar-brand"><Wordmark size={23} /><span>PRODUCT MAP</span></div>
          {productGroups.map((item, index) => (
            <div className="taste-explorer-row" key={item.name}>
              <button type="button" className={cycle.index === index ? "active" : ""} aria-pressed={cycle.index === index} data-testid={`product-group-${index}`} onClick={() => cycle.setIndex(index)} onKeyDown={(event) => activateOnKey(event, () => cycle.setIndex(index))}>
                <span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.name}</strong><small>{item.verb}</small></div><ChevronRight size={16} />
              </button>
              {cycle.index === index && detail(true)}
            </div>
          ))}
          <div className="taste-safeguard-note"><LockKeyhole size={16} /><span>Governance is expressed through bounded safeguards, not as a public investigator chapter.</span></div>
        </aside>
        {detail()}
      </div>
      <div className="taste-public-journey" aria-label="Public FrameWire journey">
        {productGroups.map((item, index) => <div className={cycle.index === index ? "active" : ""} key={item.name}><span>{item.name}</span><strong>{item.verb}</strong>{index < productGroups.length - 1 && <ArrowRight size={16} />}</div>)}
      </div>
      <div className="taste-safeguards"><span>High-level safeguards</span>{safeguards.map((item) => <small key={item}><Check size={13} />{item}</small>)}</div>
      <Controls label="public product journey" testId="product-journey" index={cycle.index} total={productGroups.length} playing={cycle.playing} onPrevious={cycle.previous} onNext={cycle.next} onPlaying={cycle.setPlaying} />
      <p className="taste-journey-summary">Observe <ArrowRight size={14} /> Analyse <ArrowRight size={14} /> Contextualise <ArrowRight size={14} /> Investigate, preserve and report</p>
    </section>
  );
}

function WorkspaceControlsPreview() {
  return (
    <section className="taste-workspace-controls" id="user-controls" tabIndex={-1}>
      <div className="taste-workspace-controls-intro" data-taste-reveal>
        <p className="taste-kicker">User-controlled workspace preview</p>
        <h2>Your workspace. Your controls.</h2>
        <p>A smaller operational layer can help investigators choose their providers and repeat their own workflows. It sits outside the primary intelligence journey.</p>
      </div>
      <div className="taste-control-preview-grid" data-taste-reveal>
        <article><LockKeyhole size={24} /><span>BYOK · Bring Your Own Key</span><h3>Choose providers without surrendering control.</h3><p>Select supported model and evidence providers, retain control of credentials, and define permissions, usage and budget limits without being forced into one provider ecosystem.</p></article>
        <article><Layers3 size={24} /><span>Custom presets</span><h3>Repeat disciplined workflows quickly.</h3><p>Save reusable queries, countries, languages, sources, providers, filters, time windows and workflow preferences for different research purposes.</p></article>
      </div>
    </section>
  );
}

function EvidenceLifecycle() {
  const cycle = useCycle(evidenceStates.length, 2600);
  const state = evidenceStates[cycle.index];

  return (
    <div className="taste-evidence-lifecycle" id="evidence-lifecycle" tabIndex={-1} data-taste-reveal>
      <div className="taste-record-card">
        <div className="taste-record-top"><FileText size={20} /><span>DEMO-EVIDENCE-001</span><strong>ORIGINAL LINK RETAINED</strong></div>
        <p>Fictional public notice · PDF · English and Nepali</p>
        <div className="taste-record-meta"><span>SOURCE / Demonstration registry</span><span>PROVIDER / Approved intake</span><span>TRANSFORM / {state.name}</span></div>
      </div>
      <div className="taste-life-track" role="group" aria-label="Evidence lifecycle">
        {evidenceStates.map((item, index) => (
          <button
            type="button"
            key={item.name}
            data-testid={`evidence-state-${index}`}
            aria-pressed={cycle.index === index}
            className={cycle.index === index ? "active" : index < cycle.index ? "complete" : ""}
            onClick={() => cycle.setIndex(index)}
            onKeyDown={(event) => activateOnKey(event, () => cycle.setIndex(index))}
          ><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong></button>
        ))}
      </div>
      <div className="taste-life-readout" key={state.name}>
        <div><LockKeyhole size={19} /><span>Current state</span></div><h3>{state.name}</h3><p>{state.detail}</p>
        <a href="#archive-first"><Link2 size={14} /> Inspect preserved original</a>
      </div>
      <Controls label="evidence lifecycle" testId="evidence" index={cycle.index} total={evidenceStates.length} playing={cycle.playing} onPrevious={cycle.previous} onNext={cycle.next} onPlaying={cycle.setPlaying} />
    </div>
  );
}

function LensGraphic({ kind }: { kind: LensIconKind }) {
  return (
    <div className="taste-lens-graphic" aria-hidden="true">
      <LensIcon kind={kind} size={102} strokeWidth={1.7} />
    </div>
  );
}

function LensSystem({ selected, setSelected }: { selected: number; setSelected: (index: number) => void }) {
  const lens = lenses[selected];
  const detailRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const selectLens = useCallback((index: number) => {
    setSelected(index);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const detail = detailRef.current;
        if (!detail || !window.matchMedia("(min-width: 821px)").matches) return;

        const rect = detail.getBoundingClientRect();
        const visibleDetailThreshold = window.innerHeight - Math.min(112, window.innerHeight * 0.16);
        if (rect.top <= visibleDetailThreshold && rect.bottom >= 0) return;

        const restrainedTop = window.innerHeight - Math.min(220, window.innerHeight * 0.29);
        const destination = Math.max(0, window.scrollY + rect.top - restrainedTop);
        window.scrollTo({ top: destination, behavior: reducedMotion ? "auto" : "smooth" });
      });
    });
  }, [reducedMotion, setSelected]);

  return (
    <section className="taste-lenses taste-story-stage" id="intelligence-lenses" tabIndex={-1}>
      <SectionHead eyebrow="Complete intelligence-lens system" title="Independent lenses. Shared evidence. No hidden master score." lead="Choose a lens to inspect its question, evidence boundary, outputs, relationships and refusal conditions." />
      <div className="taste-lens-matrix" role="group" aria-label="Principal intelligence lenses">
        {lenses.map((item, index) => {
          return (
            <button
              type="button"
              className={`taste-lens-item ${item.accent} ${selected === index ? "active" : ""}`}
              key={item.name}
              data-testid={`lens-${index}`}
              aria-pressed={selected === index}
              aria-controls="taste-lens-detail"
              onClick={() => selectLens(index)}
              onKeyDown={(event) => activateOnKey(event, () => selectLens(index))}
            >
              <div className="taste-lens-top"><span className="taste-lens-abbreviation">{item.abbreviation}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
              <LensGraphic kind={item.icon} />
              <h3>{item.name}</h3><p>{item.short}</p>
            </button>
          );
        })}
      </div>
      <article ref={detailRef} className={`taste-lens-detail ${lens.accent}`} id="taste-lens-detail" aria-live="polite" key={lens.name} data-testid="lens-detail">
        <div className="taste-lens-detail-title"><LensIcon kind={lens.icon} size={52} strokeWidth={1.55} aria-hidden="true" /><div><span>SELECTED LENS</span><h3 id={lensDefinitionTargets[selected]} tabIndex={-1}>{lens.name}</h3></div></div>
        <div className="taste-lens-question"><span>Question answered</span><p>{lens.question}</p></div>
        <div className="taste-lens-detail-grid">
          <div><span>Evidence examined</span><p>{lens.evidence}</p></div>
          <div><span>Connects with</span><p>{lens.connections}</p></div>
          <div className="taste-lens-refusal"><span>Refusal boundary</span><p>{lens.refuses}</p></div>
        </div>
        <div className="taste-lens-outputs"><span>Main outputs</span><div>{lens.outputs.map((output) => <small key={output}>{output}</small>)}</div></div>
        <div className="taste-lens-example"><DemoFlag /><p>{lens.example}</p></div>
      </article>
    </section>
  );
}

function CrossLens() {
  const cycle = useCycle(lenses.length, 2200);
  const active = lenses[cycle.index];

  return (
    <section className="taste-cross-lens taste-story-stage" id="cross-lens-context" tabIndex={-1}>
      <SectionHead eyebrow="Cross-lens contextual intelligence" title="Compare observations without collapsing them." lead="A preserved record can be viewed through several independent lenses, then recombined into a structured investigation view. No lens can overwrite another." />
      <div className="taste-cross-canvas" data-taste-reveal>
        <div className="taste-cross-source"><FileText size={25} /><span>Preserved evidence</span><strong>DEMO-EVIDENCE-001</strong></div>
        <div className="taste-cross-spine" aria-hidden="true"><span style={{ transform: `scaleY(${(cycle.index + 1) / lenses.length})` }} /></div>
        <div className="taste-cross-lenses" role="group" aria-label="Cross-lens views">
          {lenses.map((lens, index) => {
            return <button type="button" key={lens.name} className={index === cycle.index ? `active ${lens.accent}` : ""} aria-pressed={index === cycle.index} onClick={() => cycle.setIndex(index)} onKeyDown={(event) => activateOnKey(event, () => cycle.setIndex(index))} data-testid={`cross-lens-${index}`}><LensIcon kind={lens.icon} size={18} strokeWidth={1.45} aria-hidden="true" /><span>{lens.name}</span></button>;
          })}
        </div>
        <div className="taste-cross-observation" key={active.name}>
          <span>{active.name} observation</span><p>{active.example.replace("Demonstration: ", "")}</p>
        </div>
        <div className="taste-cross-output"><Network size={23} /><span>Structured investigation view</span><p>Evidence, observations, disagreement and insufficiency remain separate but comparable.</p></div>
        <Controls label="cross-lens view" testId="cross" index={cycle.index} total={lenses.length} playing={cycle.playing} onPrevious={cycle.previous} onNext={cycle.next} onPlaying={cycle.setPlaying} />
      </div>
      <div className="taste-context-rules" data-taste-reveal>
        <div><h3>Authority remains explicit.</h3><p>PostgreSQL and the Archive remain authoritative. Derived graph relationships are rebuildable. Canonical evidence is never mutated by a downstream lens.</p></div>
        <div className="taste-relation-list">{crossLensRelations.map((relation) => <span key={relation}>{relation}</span>)}</div>
        <div><h3>Disagreement is information.</h3><p>Conflicting observations and insufficient evidence remain visible. Humans decide what enters the final report.</p></div>
      </div>
    </section>
  );
}

function AudienceWalkthroughs() {
  const [selected, setSelected] = useState(0);
  const audience = audiences[selected];
  const Icon = audience.icon;
  const detailRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const selectAudience = useCallback((index: number) => {
    setSelected(index);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const detail = detailRef.current;
        if (!detail || !window.matchMedia("(min-width: 821px)").matches) return;

        const rect = detail.getBoundingClientRect();
        const safeTop = 96;
        const visibleDetailThreshold = window.innerHeight - Math.min(112, window.innerHeight * 0.16);
        if (rect.top >= safeTop && rect.top <= visibleDetailThreshold) return;

        const viewportTarget = rect.top < safeTop ? safeTop : window.innerHeight - Math.min(220, window.innerHeight * 0.29);
        const destination = Math.max(0, window.scrollY + rect.top - viewportTarget);
        window.scrollTo({ top: destination, behavior: reducedMotion ? "auto" : "smooth" });
      });
    });
  }, [reducedMotion]);

  const detail = (mobile = false) => (
    <article ref={mobile ? undefined : detailRef} className={mobile ? "taste-audience-detail taste-audience-mobile" : "taste-audience-detail"} aria-live="polite" key={`${audience.name}-${mobile ? "mobile" : "desktop"}`} data-testid={mobile ? "audience-mobile-detail" : "audience-detail"}>
      <div className="taste-audience-title"><Icon size={30} strokeWidth={1.3} /><div><span>SELECTED WALKTHROUGH</span><h3>{audience.name}</h3></div></div>
      <div className="taste-audience-question"><span>Practical question</span><p>{audience.question}</p></div>
      <dl>
        <div><dt>Public material</dt><dd>{audience.material}</dd></div>
        <div><dt>Search</dt><dd>{audience.search}</dd></div>
        <div><dt>Investigation</dt><dd>{audience.investigation}</dd></div>
        <div><dt>Lenses</dt><dd>{audience.lenses}</dd></div>
        <div><dt>Structured output</dt><dd>{audience.output}</dd></div>
        <div><dt>Human judgment</dt><dd>{audience.judgment}</dd></div>
      </dl>
      <div className="taste-audience-result"><DemoFlag /><p>{audience.result}</p></div>
    </article>
  );

  return (
    <section className="taste-users" id="taste-users">
      <SectionHead eyebrow="Intended-user walkthroughs" title="One evidence doctrine. Eight practical entry points." lead="Select a role to follow its question from public material through Search, Investigation, lenses and a human-reviewed output." />
      <div className="taste-audience-layout" data-taste-reveal>
        <div className="taste-user-list" role="group" aria-label="Intended user walkthroughs">
          {audiences.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <div className="taste-user-row-wrap" key={item.name}>
                <button type="button" className={`taste-user-item ${selected === index ? "active" : ""}`} data-testid={`audience-${index}`} aria-pressed={selected === index} onClick={() => selectAudience(index)} onKeyDown={(event) => activateOnKey(event, () => selectAudience(index))}>
                  <span>{String(index + 1).padStart(2, "0")}</span><ItemIcon size={18} /><strong>{item.name}</strong><ArrowRight size={18} />
                </button>
                {selected === index && detail(true)}
              </div>
            );
          })}
        </div>
        {detail(false)}
      </div>
    </section>
  );
}

function Workbench() {
  const [selected, setSelected] = useState(0);
  const tab = workbenchTabs[selected];

  return (
    <section className="taste-workbench-section" id="investigation-workbench" tabIndex={-1}>
      <SectionHead eyebrow="Investigation workspace and reporting" title="The evidence stays visible while understanding changes." lead="This fictional workbench demonstrates how a human can move between evidence, time, entities, lenses, findings and report assembly without losing the investigation question." />
      <div className="taste-workbench" data-taste-reveal>
        <div className="taste-workbench-top"><div><DemoFlag /><h3>{illustrativeCase.title}</h3><p>{illustrativeCase.question}</p></div><span>REVIEW STATE / IN PROGRESS</span></div>
        <div className="taste-workbench-tabs" role="tablist" aria-label="Investigation workbench">
          {workbenchTabs.map((item, index) => <button type="button" role="tab" id={`workbench-tab-${index}`} aria-controls="workbench-panel" aria-selected={selected === index} data-testid={`workbench-${item.name.toLowerCase()}`} className={selected === index ? "active" : ""} onClick={() => setSelected(index)} onKeyDown={(event) => activateOnKey(event, () => setSelected(index))} key={item.name}>{item.name}</button>)}
        </div>
        <div className="taste-workbench-body">
          <aside className="taste-evidence-tray"><span>EVIDENCE TRAY</span>{["Official notice", "Local report", "National report", "Public statement", "Public post"].map((item, index) => <button type="button" key={item}><FileText size={15} /><span>{item}</span><small>E-0{index + 1}</small></button>)}</aside>
          <article className="taste-workbench-panel" role="tabpanel" id="workbench-panel" aria-labelledby={`workbench-tab-${selected}`} key={tab.name}>
            <div><span>ACTIVE VIEW</span><h4>{tab.name}</h4><p>{tab.detail}</p></div>
            <ul>{tab.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><Check size={15} /></li>)}</ul>
          </article>
          <aside className="taste-inspector"><span>SOURCE AND PROVENANCE</span><dl><div><dt>Original</dt><dd>Retained</dd></div><div><dt>Source</dt><dd>Demo registry</dd></div><div><dt>Provider</dt><dd>Approved intake</dd></div><div><dt>Retrieval</dt><dd>Illustrative</dd></div><div><dt>Eligibility</dt><dd>Human scoped</dd></div></dl><button type="button"><Eye size={15} /> Open Source Inspector</button></aside>
        </div>
        <div className="taste-workbench-note"><CircleDot size={14} /><span>Contradiction retained:</span> public descriptions disagree about duration; exact resolution is insufficient.</div>
      </div>
    </section>
  );
}

function ReportingAndExports() {
  const cycle = useCycle(reportAssembly.length, 2800);
  const [decision, setDecision] = useState("Qualify");
  const active = reportAssembly[cycle.index];

  return (
    <section className="taste-reporting taste-story-stage" id="taste-reporting">
      <SectionHead eyebrow="Report, export and analytics" title="Findings leave the investigation under governance." lead="Report Studio keeps evidence, contradiction, limitation and human annotation attached. Exports and analytics remain non-canonical derivatives." />
      <div className="taste-report-grid" data-taste-reveal>
        <article className="taste-report-studio" id="taste-report-studio">
          <div className="taste-report-title"><FileCheck2 size={24} /><div><span>REPORT STUDIO</span><h3>Illustrative findings assembly</h3></div></div>
          <div className="taste-assembly-track">{reportAssembly.map(([name], index) => <button type="button" key={name} className={cycle.index === index ? "active" : index < cycle.index ? "complete" : ""} aria-pressed={cycle.index === index} onClick={() => cycle.setIndex(index)}><span>{String(index + 1).padStart(2, "0")}</span>{name}</button>)}</div>
          <div className="taste-assembly-detail" key={active[0]}><span>{active[0]}</span><p>{active[1]}</p></div>
          <div className="taste-decision-actions" aria-label="Human report actions">{["Include", "Exclude", "Qualify", "Correct"].map((action) => <button type="button" key={action} className={decision === action ? "active" : ""} aria-pressed={decision === action} onClick={() => setDecision(action)} onKeyDown={(event) => activateOnKey(event, () => setDecision(action))} data-testid={`report-${action.toLowerCase()}`}>{action === decision && <Check size={13} />}{action}</button>)}</div>
          <p className="taste-decision-status"><UserCheck size={15} /> Human action selected: <strong>{decision}</strong>. No automatic finalisation.</p>
          <Controls label="report assembly" testId="report" index={cycle.index} total={reportAssembly.length} playing={cycle.playing} onPrevious={cycle.previous} onNext={cycle.next} onPlaying={cycle.setPlaying} />
        </article>
        <article className="taste-export-panel"><div className="taste-report-title"><Download size={23} /><div><span>GOVERNED EXPORTS</span><h3>Portable, reproducible, non-canonical</h3></div></div><div className="taste-export-list">{exportTypes.map((item, index) => <span key={item}>{index === 0 ? <FileJson size={15} /> : index === 1 ? <FileSpreadsheet size={15} /> : <FolderArchive size={15} />} {item}</span>)}</div></article>
        <article className="taste-analytics-panel"><div className="taste-report-title"><BarChart3 size={23} /><div><span>GOVERNED ANALYTICS</span><h3>Methods remain visible</h3></div></div><ul>{analyticTypes.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><div className="taste-analytics-guards"><span>Correlation is not causation.</span><span>No automatic forecasting.</span><span>No automatic threat decision.</span><span>No automatic canonical write.</span></div></article>
      </div>
    </section>
  );
}

function Memory() {
  return (
    <section className="taste-memory taste-story-stage" id="shared-intelligence-memory" tabIndex={-1}>
      <SectionHead eyebrow="Shared intelligence memory" title="Historical context remains available, not automatically current." lead="Reviewed investigations preserve continuity across evidence, entities, narrative families, sources, locations, findings and reports." />
      <div className="taste-memory-map" data-taste-reveal>
        {memoryNodes.map((node, index) => <div key={node} className={index === 0 || index === memoryNodes.length - 1 ? "anchor" : ""}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node}</strong>{index < memoryNodes.length - 1 && <ArrowRight size={16} />}</div>)}
      </div>
      <div className="taste-memory-principles" data-taste-reveal><div><History size={27} /><h3>Recurrence with lineage</h3><p>New evidence can reconnect to reviewed historical context while preserving what was known at each earlier point.</p></div><div><Clock3 size={27} /><h3>Time remains explicit</h3><p>Past observations do not become current facts automatically. A human reviews relevance, change and continuity.</p></div><div><GitBranch size={27} /><h3>Derived and rebuildable</h3><p>Relationships can be reconstructed from authoritative evidence and reviewed records rather than treated as hidden truth.</p></div></div>
    </section>
  );
}

export default function TasteV1() {
  useScrollReveal();
  const [tourStage, setTourStage] = useState(0);
  const [returnTourStage, setReturnTourStage] = useState<number | null>(null);
  const [selectedLens, setSelectedLens] = useState(0);

  const focusDefinition = useCallback((target: string) => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const destination = document.getElementById(target);
        if (!destination) return;
        const focusTarget = destination.matches("h1, h2, h3, button") ? destination : destination.querySelector<HTMLElement>("h1, h2, h3, button") ?? destination;
        destination.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        focusTarget.setAttribute("tabindex", "-1");
        focusTarget.focus({ preventScroll: true });
      }, 50);
    });
  }, []);

  const navigateToDefinition = useCallback((target: string, lensIndex?: number) => {
    setReturnTourStage(tourStage);
    if (lensIndex !== undefined) setSelectedLens(lensIndex);
    window.history.pushState({ framewireTourStage: tourStage }, "", `#${target}`);
    focusDefinition(target);
  }, [focusDefinition, tourStage]);

  const returnToTour = useCallback(() => {
    if (returnTourStage !== null) setTourStage(returnTourStage);
    setReturnTourStage(null);
    window.history.pushState({ framewireTourStage: null }, "", "#framewire-tour");
    focusDefinition("framewire-tour");
  }, [focusDefinition, returnTourStage]);

  useEffect(() => {
    const syncFromHistory = () => {
      const target = window.location.hash.slice(1);
      const lensIndex = lensDefinitionTargets.indexOf(target);
      if (lensIndex >= 0) setSelectedLens(lensIndex);
      if (!target || target === "framewire-tour") setReturnTourStage(null);
    };
    syncFromHistory();
    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "FrameWire Design Lab | Taste V1";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="taste-lab">
      <a className="taste-skip" href="#taste-main">Skip to content</a>
      <div className="taste-grain" aria-hidden="true" />

      <header className="taste-nav">
        <a href="/design-lab/taste-v1" className="taste-brand" aria-label="FrameWire experimental landing page"><Wordmark size={28} /><small>DESIGN LAB</small></a>
        <nav aria-label="Page navigation"><a href="#taste-method">Method</a><a href="#framewire-tour">Tour</a><a href="#live">System</a><a href="#intelligence-lenses">Lenses</a><a href="#investigation-workbench">Workbench</a><a href="#taste-beta">Beta</a></nav>
        <a className="taste-nav-action" href={BETA_MAILTO}>Enter beta <ArrowRight size={16} /></a>
      </header>

      <main id="taste-main">
        <section className="taste-hero taste-story-stage">
          <div className="taste-hero-signal" aria-hidden="true"><span>EN / ने / हिं</span><span>PUBLIC INFORMATION</span><span>PRESERVED EVIDENCE</span></div>
          <div className="taste-hero-copy taste-visible" data-taste-reveal>
            <p className="taste-eyebrow"><CircleDot size={14} /> Human-centred contextual intelligence</p>
            <h1>Contextual Intelligence. <em>Human-Led</em> Investigations.</h1>
            <p className="taste-hero-text">FrameWire collects public information, preserves original evidence, examines it through independent intelligence lenses, connects only supported relationships and helps a human produce a defensible report.</p>
            <div className="taste-actions"><Button variant="primary" size="lg" href={BETA_MAILTO} icon={<ArrowRight size={18} />}>Request beta access</Button><Button variant="secondary" size="lg" href="#framewire-tour" icon={<ArrowDownRight size={18} />}>Take the tour</Button></div>
          </div>
          <SystemMap />
          <div className="taste-doctrine-strip">{doctrine.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <FrameWireTour activeStage={tourStage} onStageChange={setTourStage} onDefinitionNavigate={navigateToDefinition} />
        <WhyFrameWire />

        <section className="taste-problem" id="taste-method">
          <div className="taste-chapter-intro" data-taste-reveal><p className="taste-kicker">Why FrameWire exists</p><h2>Information arrives fast. Understanding does not.</h2></div>
          <div className="taste-problem-grid">
            <div className="taste-problem-lead" data-taste-reveal><ScanSearch size={42} strokeWidth={1.2} /><p>An investigation is not a feed, automatic answer or prediction. It is a disciplined path from public material to a conclusion another person can inspect.</p></div>
            <div className="taste-problem-list">{[["Information is fragmented", "Relevant material is scattered across languages, formats, portals and moments in time."], ["Context is lost", "A screenshot or isolated quote can detach a claim from its source, date and surrounding evidence."], ["Conclusions need a trace", "A serious finding must lead backward to exact evidence and the choices made along the way."], ["Automation needs boundaries", "Deterministic rules come first, LLMs assist bounded work and humans retain the decision."]].map(([title, text], index) => <div className="taste-problem-row" data-taste-reveal key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
          </div>
        </section>

        <ProductStages />

        <section className="taste-archive" id="archive-first" tabIndex={-1}>
          <div className="taste-archive-title" data-taste-reveal><p className="taste-kicker">Archive-first evidence foundation</p><h2>The source should survive the analysis.</h2><p>Preservation begins the investigation. Cleaning, extraction and classification create governed derivatives without destroying the original or hiding uncertainty.</p></div>
          <div><EvidenceLifecycle /><div className="taste-archive-capabilities">{archiveCapabilities.map(([title, text], index) => <article id={index === 0 ? "evidence-intake" : undefined} tabIndex={index === 0 ? -1 : undefined} key={title} data-taste-reveal><h3>{title}</h3><p>{text}</p></article>)}</div></div>
        </section>

        <ProductExplorer />
        <LensSystem selected={selectedLens} setSelected={setSelectedLens} />
        <CrossLens />
        <AudienceWalkthroughs />
        <Workbench />
        <ReportingAndExports />
        <Memory />
        <WorkspaceControlsPreview />

        <section className="taste-final-cta taste-story-stage" id="taste-beta">
          <div data-taste-reveal><p className="taste-kicker">FrameWire private beta</p><h2>Preserve the record. Examine the context. Decide with evidence.</h2><p>Designed for journalists, researchers, NGOs, government, political teams, security analysts, diplomats and general investigators who remain accountable for what they conclude.</p><div className="taste-actions"><Button variant="primary" size="lg" href={BETA_MAILTO} icon={<ArrowRight size={18} />}>Request beta access</Button><Button variant="secondary" size="lg" href={CONTACT_MAILTO} icon={<ArrowRight size={18} />}>Contact FrameWire</Button></div></div>
          <div className="taste-final-doctrine" aria-label="FrameWire doctrine"><ShieldCheck size={28} /><span>Investigation infrastructure, not a chatbot.</span><span>No automatic answer.</span><span>No automatic persuasion.</span><span>No automatic conclusion.</span></div>
        </section>
      </main>

      {returnTourStage !== null && <button type="button" className="taste-return-tour" data-testid="return-to-tour" onClick={returnToTour} onKeyDown={(event) => activateOnKey(event, returnToTour)}><ArrowDownRight size={16} /> Return to Tour</button>}

      <footer className="taste-footer"><Wordmark size={25} /><p>Understand Before Concluding.</p><p>Experimental final-beta product demonstration. All examples are illustrative.</p></footer>
    </div>
  );
}
