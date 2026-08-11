import { Bell, Database, FileCheck2, Focus, LockKeyhole, Search, ShieldCheck } from "lucide-react";
import type { PlatformStageId } from "./platformData";

const lensCodes = ["NA", "SE", "EM", "TH", "FC", "GE", "PI", "AU", "PS", "ER"];

function CollectVisual() {
  return <div className="p2-stage-scene collect"><div className="p2-scene-sources"><i>MEDIA</i><i>SOCIAL</i><i>RECORD</i><i>UPLOAD</i></div><div className="p2-scene-path"><span /><span /><span /><span /></div><div className="p2-scene-gateway"><Database /><small>GOVERNED</small><strong>Acquisition</strong></div></div>;
}

function PreserveVisual() {
  return <div className="p2-stage-scene preserve"><div className="p2-scene-document"><span>ORIGINAL</span><i /><i /><i /></div><div className="p2-scene-arrow">→</div><div className="p2-scene-archive"><LockKeyhole /><span>RAW ARCHIVE</span><strong>Preserved</strong></div><div className="p2-scene-derived"><span>DERIVED</span><i /><i /><small>Lineage retained</small></div></div>;
}

function DiscoverVisual() {
  return <div className="p2-stage-scene discover"><div className="p2-discover-input"><article><Database /><span>ARCHIVE</span></article><article><Search /><span>FRESH CANDIDATES</span></article></div><div className="p2-discover-universe"><i /><i /><i /><i /><i /><strong>RAW ECOSYSTEM</strong></div></div>;
}

function InvestigateVisual() {
  return <div className="p2-stage-scene investigate"><div className="p2-broad-universe"><i /><i /><i /><i /><i /><i /><span>BROAD RESULTS</span></div><div className="p2-narrow-path"><span /><span /></div><div className="p2-scope-box"><Focus /><small>HUMAN DECISION</small><strong>Bounded scope</strong><i /><i /><i /></div></div>;
}

function AnalyzeVisual() {
  return <div className="p2-stage-scene analyze"><div className="p2-scoped-evidence"><span>SCOPED EVIDENCE</span><i /><i /><i /></div><div className="p2-lens-branches">{lensCodes.map((code) => <i key={code}>{code}</i>)}</div><small>INDEPENDENT OBSERVATIONS</small></div>;
}

function UnderstandVisual() {
  return <div className="p2-stage-scene understand"><div className="p2-context-nodes"><article>NA</article><article>FC</article><article>GE</article><article>ER</article><svg viewBox="0 0 300 180" aria-hidden="true"><path d="M70 45 L230 45 M70 135 L230 135 M70 45 L70 135 M230 45 L230 135 M70 45 L230 135" /></svg></div><div className="p2-context-key"><span>SUPPORTED</span><span>CONTRADICTS</span><span>INSUFFICIENT</span></div></div>;
}

function CalculateVisual() {
  return <div className="p2-stage-scene calculate"><div className="p2-dataset"><span>GOVERNED DATASET</span><i /><i /><i /><small>Manifest + provenance</small></div><div className="p2-comparison-bars"><i /><i /><i /><i /></div><div className="p2-caveats"><span>CORRELATION CANDIDATE</span><strong>NOT CAUSATION</strong><small>Non-canonical until reviewed</small></div></div>;
}

function ReportVisual() {
  return <div className="p2-stage-scene report"><div className="p2-report-inputs"><span>EVIDENCE</span><span>OBSERVATIONS</span><span>LIMITATIONS</span></div><div className="p2-human-gate"><ShieldCheck /><small>HUMAN REVIEW</small><strong>Include · Revise · Exclude</strong></div><div className="p2-final-report"><FileCheck2 /><span>REPORT</span><strong>Finalized</strong></div></div>;
}

function ContinueVisual() {
  return <div className="p2-stage-scene continue"><div className="p2-complete-case"><FileCheck2 /><span>DATED CASE</span></div><div className="p2-continuing-line"><i /><i /><i /><i /></div><div className="p2-continuing-events"><article>TRACKED</article><article>CHANGE</article><article><Bell /> ALERT</article></div><small>OPERATIONAL NOTICE</small></div>;
}

function ControlVisual() {
  return <div className="p2-stage-scene control"><div className="p2-control-enclosure"><header><ShieldCheck /><strong>CONTROL</strong><span>WHO · WHAT · WHEN · HOW · COST</span></header><div>{["COLLECT", "PRESERVE", "DISCOVER", "INVESTIGATE", "ANALYZE", "UNDERSTAND", "CALCULATE", "REPORT", "CONTINUE"].map((item) => <i key={item}>{item}</i>)}</div><footer>BYOK · PROVIDERS · ACCESS · COST · CAPABILITIES · OPERATIONS</footer></div></div>;
}

export function PlatformStageVisual({ type }: { type: PlatformStageId }) {
  const visuals: Record<PlatformStageId, JSX.Element> = {
    collect: <CollectVisual />, preserve: <PreserveVisual />, discover: <DiscoverVisual />, investigate: <InvestigateVisual />, analyze: <AnalyzeVisual />, understand: <UnderstandVisual />, calculate: <CalculateVisual />, report: <ReportVisual />, continue: <ContinueVisual />, control: <ControlVisual />,
  };
  return <div className={`p2-stage-visual type-${type}`} aria-hidden="true">{visuals[type]}</div>;
}
