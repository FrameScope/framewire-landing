import { useState } from "react";
import {
  Archive,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleHelp,
  Clock3,
  Database,
  Eye,
  FileCheck2,
  FileSearch,
  Fingerprint,
  GitCompareArrows,
  Layers3,
  Link2,
  LockKeyhole,
  Quote,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  UserCheck,
  XCircle,
} from "lucide-react";

const authorities = [
  { name: "AI", icon: Layers3, items: ["Scale", "Extraction", "Comparison", "Pattern detection", "Organisation"] },
  { name: "Evidence", icon: Archive, items: ["Source authority", "Provenance", "Exact support", "Contradiction", "Limitations"] },
  { name: "Human", icon: UserCheck, items: ["Context", "Responsibility", "Ethics", "Consequence", "Final judgment"] },
];

const monitoringSignals = ["Mentions", "Attention", "Volume", "Trends", "Tone", "Source activity"];
const investigationEvidence = ["Exact claim", "Original source", "Attributed speaker", "Source independence", "Competing frame", "Support", "Contradiction", "Limitation", "Human decision"];

const aiCapabilities = [
  "Process large volumes",
  "Extract claims",
  "Compare language",
  "Group related evidence",
  "Identify possible patterns",
  "Surface relationships",
  "Organise timelines",
  "Prepare material for review",
];

const failureProblems = [
  "Repeated coverage traces back to one original article.",
  "A quotation was mistaken for the author's own position.",
  "Criticism was mistaken for support.",
  "A mentioned place was mistaken for the event location.",
  "Missing data was treated as neutral evidence.",
  "Correlation was mistaken for causation.",
  "A historical pattern was described as current.",
  "A model-suggested relationship was treated as verified.",
  "Contradiction disappeared from the summary.",
];

const confidenceStates = [
  { name: "Supported", icon: CheckCircle2, detail: "Careful language with strong evidence becomes eligible for human review.", className: "supported" },
  { name: "Contradicted", icon: XCircle, detail: "Conflicting evidence remains attached to the claim and visible.", className: "contradicted" },
  { name: "Unresolved", icon: CircleHelp, detail: "Disagreement is preserved rather than silently collapsed.", className: "unresolved" },
  { name: "Insufficient", icon: CircleAlert, detail: "A conclusion waits when the available evidence cannot support it.", className: "insufficient" },
];

const humanContext = [
  "Local political or cultural meaning",
  "Sarcasm, irony and coded language",
  "Whether two names identify one organisation",
  "Whether a quotation has lost its context",
  "Whether apparently independent sources are syndicated",
  "Whether relevant evidence is responsible to include",
  "Whether the evidence is strong enough to conclude",
];

const reviewActions = [
  { name: "Accept", status: "Eligible for report", detail: "The evidence supports the language and weight of the finding.", className: "report" },
  { name: "Correct", status: "Corrected — review again", detail: "The machine observation is amended without changing the archived source.", className: "review" },
  { name: "Narrow", status: "Narrowed scope", detail: "Only the supportable part of the observation remains under review.", className: "review" },
  { name: "Qualify", status: "Eligible with limitation", detail: "The finding may enter the report with an explicit boundary.", className: "qualified" },
  { name: "Annotate", status: "Annotation preserved", detail: "Human context is attached while the finding remains under review.", className: "review" },
  { name: "Exclude", status: "Audit history only", detail: "The observation stays inspectable but does not enter the report.", className: "held" },
  { name: "Mark unresolved", status: "Outside final conclusion", detail: "The disagreement remains available to future investigation.", className: "held" },
  { name: "Request more evidence", status: "Returned to investigation", detail: "The evidence tray reopens before any conclusion is attempted.", className: "investigation" },
  { name: "Refuse to conclude", status: "Abstention preserved", detail: "The responsible outcome is an explicit decision not to conclude.", className: "held" },
];

const recordLayers = [
  { name: "What the source contained", meta: "Immutable evidence record", detail: "Exact attributed statement and surrounding material.", icon: LockKeyhole, className: "source" },
  { name: "What the machine observed", meta: "Auditable analytical record", detail: "Possible contradiction and competing frame detected.", icon: Layers3, className: "machine" },
  { name: "What the investigator decided", meta: "Separate decision record", detail: "Qualify the claim and preserve the limitation.", icon: UserCheck, className: "decision" },
  { name: "What the final report communicated", meta: "Reviewed communication", detail: "Qualified finding with citations and contradiction note.", icon: FileCheck2, className: "report" },
];

const packageGroups = [
  { name: "Foundation", items: ["Original question", "Selected evidence", "Provenance", "Timeline"] },
  { name: "Context", items: ["Actors and entities", "Claims and attributed speakers", "Narrative Families and competing frames", "Sentiment, emotion and geography"] },
  { name: "Verification", items: ["Verification state", "Supporting and contradicting evidence", "Gaps and limitations"] },
  { name: "Decision", items: ["Human notes", "Findings", "Evidence-backed report"] },
];

const beforeFrameWire = ["Scattered material", "Repeated sources", "Missing context", "Conflicting claims", "Uncertain attribution", "Manual comparison burden"];
const withFrameWire = ["Preserved sources", "Structured evidence", "Independent analytical lenses", "Visible contradictions", "Explicit limitations", "Human-reviewed findings"];

const principles = [
  "Evidence before conclusion.",
  "Preserve the source before interpreting it.",
  "Separate discovery from investigation.",
  "Separate machine observations from human decisions.",
  "Keep uncertainty visible.",
  "Allow analytical lenses to disagree.",
  "Treat missing evidence as missing.",
  "Create relationships only when evidence supports them.",
  "More mentions do not automatically mean more truth.",
  "Strong emotion does not automatically mean greater threat.",
  "One AI summary cannot represent every contested information environment.",
];

const philosophyFlow = ["Reality", "Evidence", "Intelligence", "Understanding", "Human Judgment", "Report"];

function SectionLabel({ children }: { children: string }) {
  return <p className="taste-why-label">{children}</p>;
}

function AuthorityGraphic() {
  const [assembled, setAssembled] = useState(false);

  return (
    <div className={`taste-why-authority ${assembled ? "assembled" : ""}`} id="why-three-authorities" data-taste-reveal>
      <div className="taste-why-authority-streams">
        {authorities.map((authority) => {
          const Icon = authority.icon;
          return (
            <article key={authority.name} className={authority.name.toLowerCase()}>
              <header><Icon size={23} strokeWidth={1.45} aria-hidden="true" /><h3>{authority.name}</h3></header>
              <div>{authority.items.map((item) => <span key={item}>{item}</span>)}</div>
              <i aria-hidden="true" />
            </article>
          );
        })}
      </div>
      <div className="taste-why-authority-report" role="status" aria-live="polite">
        <FileCheck2 size={26} strokeWidth={1.35} aria-hidden="true" />
        <span>{assembled ? "Evidence-backed report" : "Report remains unformed"}</span>
        <strong>{assembled ? "AI assistance + inspectable evidence + human judgment" : "AI output alone is not a final report"}</strong>
      </div>
      <div className="taste-why-authority-action">
        <button type="button" className="taste-why-button" data-testid="why-authority-assemble" aria-pressed={assembled} onClick={() => setAssembled((value) => !value)}>
          {assembled ? <RotateCcw size={15} /> : <ArrowRight size={15} />}{assembled ? "Reset demonstration" : "Assemble responsible report"}
        </button>
        <p>AI can help process the investigation. Evidence and human judgment determine what can responsibly enter the report.</p>
      </div>
    </div>
  );
}

function MonitoringComparison() {
  return (
    <div className="taste-why-monitoring" id="why-monitoring-investigation" data-taste-reveal>
      <article className="signals">
        <header><ScanSearch size={25} strokeWidth={1.35} /><div><span>Useful first view</span><h3>Monitoring signals</h3></div></header>
        <div className="taste-why-signal-field" aria-label="Monitoring signals">{monitoringSignals.map((signal) => <span key={signal}>{signal}</span>)}</div>
        <div className="taste-why-monitor-surface"><i /><i /><i /><strong>What is receiving attention?</strong></div>
      </article>
      <div className="taste-why-monitor-bridge" aria-hidden="true"><ArrowRight size={20} /><span>select evidence</span></div>
      <article className="investigation">
        <header><FileSearch size={25} strokeWidth={1.35} /><div><span>High-consequence work</span><h3>FrameWire investigation</h3></div></header>
        <div className="taste-why-investigation-items">{investigationEvidence.map((item) => <span key={item}><Check size={12} />{item}</span>)}</div>
        <div className="taste-why-stage-questions"><span><b>Search</b>What exists?</span><span><b>Investigation</b>What does the selected evidence mean?</span><span><b>Report</b>What can a responsible human conclude?</span></div>
      </article>
    </div>
  );
}

function SourceSurvives() {
  const [inspecting, setInspecting] = useState(false);
  const stages = ["Canonical Archive", "Working Copy", "Analytical Observations", "Human-Reviewed Finding"];

  return (
    <div className="taste-why-source-layout taste-story-stage" id="why-source-survives">
      <div className="taste-why-source-copy" data-taste-reveal>
        <SectionLabel>Archive first</SectionLabel>
        <h3>The analysis may change. The evidence should remain inspectable.</h3>
        <p>FrameWire preserves the original material before an intelligence engine interprets it. Every important observation can remain connected to the source that supports or contradicts it.</p>
        <button type="button" className="taste-why-button" data-testid="why-inspect-source" aria-expanded={inspecting} onClick={() => setInspecting((value) => !value)}><Eye size={15} />{inspecting ? "Close source inspector" : "Inspect source"}</button>
      </div>
      <div className="taste-why-source-visual" data-taste-reveal>
        <article className="taste-why-original"><header><LockKeyhole size={18} /><span>Original source</span><strong>LOCKED</strong></header><p>DEMO-SOURCE-001</p><small>Illustrative product demonstration</small><div className="source-lines"><i /><i /><i /></div></article>
        <div className="taste-why-source-chain">{stages.map((stage, index) => <div key={stage}><ArrowRight size={15} aria-hidden="true" /><span>{stage}</span><small>{index === 0 ? "Untouched" : index === 1 ? "Linked derivative" : index === 2 ? "Independent outputs" : "Human decision"}</small></div>)}</div>
        <div className={`taste-why-provenance ${inspecting ? "open" : ""}`} aria-hidden={!inspecting}>
          {["Source: fictional public notice", "URL: example.invalid/source-001", "Provider: demonstration intake", "Retrieved: recorded at capture", "Content hash: DEMO-7F21", "Completeness: source body retained", "Processing: archived → working copy", "Lineage: finding → observation → source"].map((field) => <span key={field}>{field}</span>)}
        </div>
      </div>
    </div>
  );
}

function AIBoundaries() {
  const [failureIndex, setFailureIndex] = useState(-1);
  const revealed = failureIndex + 1;

  return (
    <div className="taste-why-ai-grid" id="why-ai-boundaries">
      <article className="taste-why-ai-capabilities" data-taste-reveal>
        <SectionLabel>What AI can do</SectionLabel>
        <h3>AI gives the investigator scale.</h3>
        <p>It is powerful and valuable when its role is correctly bounded. It does not inherit the investigator's responsibility.</p>
        <div>{aiCapabilities.map((capability, index) => <span key={capability}><b>{String(index + 1).padStart(2, "0")}</b>{capability}</span>)}</div>
      </article>
      <article className="taste-why-ai-failure" data-taste-reveal>
        <SectionLabel>Where AI can fail</SectionLabel>
        <h3>The most dangerous mistake may sound completely convincing.</h3>
        <div className="taste-why-polished-answer"><span>Machine-generated statement</span><Quote size={18} /><p>“The available reporting consistently confirms a single account of the event.”</p><small>Illustrative product demonstration</small></div>
        <div className="taste-why-hidden-problem" aria-live="polite">
          {failureIndex < 0 ? <p>Select “Reveal evidence problem” to inspect what polished wording can hide.</p> : <><span>Hidden evidence problem {revealed} of {failureProblems.length}</span><strong>{failureProblems[failureIndex]}</strong></>}
        </div>
        <div className="taste-why-failure-controls">
          <button type="button" data-testid="why-failure-previous" disabled={failureIndex < 0} onClick={() => setFailureIndex((value) => Math.max(-1, value - 1))}>Previous</button>
          <span>{revealed} / {failureProblems.length}</span>
          <button type="button" data-testid="why-failure-next" disabled={failureIndex >= failureProblems.length - 1} onClick={() => setFailureIndex((value) => Math.min(failureProblems.length - 1, value + 1))}>{failureIndex < 0 ? "Reveal evidence problem" : "Reveal next"}</button>
        </div>
      </article>
    </div>
  );
}

function ConfidenceAndHuman() {
  return (
    <>
      <div className="taste-why-confidence" id="why-confidence-support" data-taste-reveal>
        <div className="taste-why-confidence-copy"><SectionLabel>Confidence versus support</SectionLabel><h3>FrameWire does not hide uncertainty behind confident wording.</h3><p>Polished language does not increase evidence quality. A finding's state follows its support—not the fluency of its sentence.</p></div>
        <div className="taste-why-confidence-axis"><span>Confident language</span><i aria-hidden="true" /><span>Evidence support</span></div>
        <div className="taste-why-confidence-states">{confidenceStates.map((state) => { const Icon = state.icon; return <article className={state.className} key={state.name}><Icon size={18} /><strong>{state.name}</strong><p>{state.detail}</p></article>; })}</div>
      </div>
      <div className="taste-why-human taste-story-stage" id="why-human-authority" data-taste-reveal>
        <div><SectionLabel>Why the human remains essential</SectionLabel><h3>You are not the final obstacle in the workflow. You are the final authority.</h3><p>Context, responsibility and consequence belong to the human investigator.</p></div>
        <div className="taste-why-human-console">
          <header><UserCheck size={22} /><span>Investigator context</span><strong>HUMAN REVIEW</strong></header>
          <div>{humanContext.map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}</div>
          <footer><FileSearch size={15} />Select evidence · inspect sources · compare · annotate · qualify</footer>
        </div>
      </div>
    </>
  );
}

function HumanVerification() {
  const [selected, setSelected] = useState(3);
  const action = reviewActions[selected];

  return (
    <div className="taste-why-verification taste-story-stage" id="why-human-verification" data-taste-reveal>
      <div className="taste-why-verification-heading"><SectionLabel>Human verification is real work</SectionLabel><h3>Human verification is not a ceremonial approval button.</h3><p>It is where the investigator decides whether the evidence supports the language, weight and consequence of a finding.</p></div>
      <div className="taste-why-review-workspace">
        <article className="taste-why-machine-observation"><span>Machine observation</span><h4>Public sources appear to support one account.</h4><div><small><Quote size={13} /> Exact evidence</small><small><Fingerprint size={13} /> Source provenance</small><small><CheckCircle2 size={13} /> Supporting material</small><small><XCircle size={13} /> Contradicting material</small><small><CircleAlert size={13} /> Coverage limitations</small><small><GitCompareArrows size={13} /> Alternative interpretation</small></div></article>
        <div className="taste-why-review-actions" role="group" aria-label="Human verification actions">{reviewActions.map((item, index) => <button type="button" key={item.name} className={selected === index ? "active" : ""} aria-pressed={selected === index} data-testid={`why-review-${item.name.toLowerCase().replace(/ /g, "-")}`} onClick={() => setSelected(index)}>{selected === index && <Check size={12} />}{item.name}</button>)}</div>
        <article className={`taste-why-review-outcome ${action.className}`} aria-live="polite" key={action.name}><ShieldCheck size={24} /><span>Decision state</span><h4>{action.status}</h4><p>{action.detail}</p><small>Machine observation remains auditable.</small></article>
      </div>
    </div>
  );
}

function FourRecords() {
  return (
    <div className="taste-why-records" id="why-four-records" data-taste-reveal>
      <div className="taste-why-record-heading"><SectionLabel>Four separate records</SectionLabel><h3>FrameWire preserves the difference between evidence, machine interpretation and human conclusion.</h3></div>
      <div className="taste-why-record-flow">{recordLayers.map((record, index) => { const Icon = record.icon; return <article key={record.name} className={record.className}><header><span>{String(index + 1).padStart(2, "0")}</span><Icon size={19} /></header><small>{record.meta}</small><h4>{record.name}</h4><p>{record.detail}</p>{index < recordLayers.length - 1 && <ArrowRight className="taste-why-record-arrow" size={18} aria-hidden="true" />}</article>; })}</div>
      <p className="taste-why-record-note"><HistoryIcon />One report decision never silently rewrites historical evidence.</p>
    </div>
  );
}

function HistoryIcon() {
  return <Clock3 size={15} aria-hidden="true" />;
}

function InvestigationPackage() {
  const [selected, setSelected] = useState(0);
  const group = packageGroups[selected];

  return (
    <div className="taste-why-package" id="why-investigation-package" data-taste-reveal>
      <div className="taste-why-package-heading"><SectionLabel>What the user gets</SectionLabel><h3>Not just an answer. A reviewable investigation.</h3><p>Every important conclusion should remain connected to the evidence that supports it.</p></div>
      <div className="taste-why-package-shell">
        <div className="taste-why-package-tabs" role="tablist" aria-label="Investigation package layers">{packageGroups.map((item, index) => <button type="button" key={item.name} role="tab" id={`why-package-tab-${index}`} aria-selected={selected === index} aria-controls="why-package-panel" data-testid={`why-package-${index}`} onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}</button>)}</div>
        <article className="taste-why-package-panel" id="why-package-panel" role="tabpanel" aria-labelledby={`why-package-tab-${selected}`} key={group.name}><header><Database size={20} /><span>Investigation package</span><strong>{group.name}</strong></header><div>{group.items.map((item) => <span key={item}><Link2 size={13} />{item}</span>)}</div><footer><LockKeyhole size={13} />Each layer retains evidence lineage.</footer></article>
      </div>
    </div>
  );
}

function DecisionSupport() {
  return (
    <div className="taste-why-decision" id="why-decision-support" data-taste-reveal>
      <div className="taste-why-decision-heading"><SectionLabel>Decision support</SectionLabel><h3>FrameWire does not decide for you. It helps you see the decision more clearly.</h3><p>It reduces the effort required to collect, organise, compare and inspect public information while keeping responsibility with the investigator.</p></div>
      <div className="taste-why-decision-compare">
        <article><header><span>Before FrameWire</span><GitCompareArrows size={19} /></header>{beforeFrameWire.map((item) => <p key={item}><CircleHelp size={13} />{item}</p>)}</article>
        <ArrowRight className="taste-why-decision-arrow" size={24} aria-hidden="true" />
        <article className="structured"><header><span>With FrameWire</span><FileCheck2 size={19} /></header>{withFrameWire.map((item) => <p key={item}><Check size={13} />{item}</p>)}</article>
      </div>
      <small>No guarantee replaces judgment. The investigator remains accountable for the conclusion.</small>
    </div>
  );
}

function Philosophy() {
  return (
    <div className="taste-why-philosophy" id="why-philosophy" data-taste-reveal>
      <SectionLabel>FrameWire philosophy</SectionLabel>
      <div className="taste-why-philosophy-flow" aria-label="Reality to evidence-backed report">{philosophyFlow.map((item, index) => <span key={item}>{item}{index < philosophyFlow.length - 1 && <ArrowRight size={14} aria-hidden="true" />}</span>)}</div>
      <div className="taste-why-manifesto"><div><h3>Understand Before Concluding.</h3><p>FrameWire does not ask you to trust the machine.</p><p>It gives you the evidence, context and analytical structure needed to make your own informed judgment.</p></div><ol>{principles.map((principle) => <li key={principle}>{principle}</li>)}</ol></div>
      <blockquote>“The machine helps organise the investigation. The human carries responsibility for the conclusion.”</blockquote>
      <div className="taste-why-doctrine"><span>Archive First.</span><span>Evidence Before Conclusion.</span><span>AI Assists.</span><span>Humans Decide.</span></div>
    </div>
  );
}

export default function WhyFrameWire() {
  return (
    <section className="taste-why" id="why-framewire" aria-labelledby="why-framewire-title">
      <header className="taste-why-opening taste-story-stage" data-taste-reveal>
        <div><SectionLabel>Why FrameWire</SectionLabel><h2 id="why-framewire-title">Intelligence should strengthen judgment—not replace it.</h2></div>
        <div><p>FrameWire preserves evidence, organises competing perspectives and helps a human understand what the available material can responsibly support.</p><strong>AI assists. Evidence remains visible. Humans decide.</strong><small>Illustrative product demonstration.</small></div>
      </header>

      <AuthorityGraphic />

      <div className="taste-why-editorial" data-taste-reveal><SectionLabel>Monitoring is the beginning</SectionLabel><h3>Monitoring helps reveal what is happening. FrameWire helps a human investigate what it means.</h3><p>A search result is not automatically a finding. An engine observation is not automatically a fact. An AI summary is not automatically a report.</p></div>
      <MonitoringComparison />

      <SourceSurvives />
      <AIBoundaries />
      <ConfidenceAndHuman />
      <HumanVerification />
      <FourRecords />
      <InvestigationPackage />
      <DecisionSupport />
      <Philosophy />
    </section>
  );
}
