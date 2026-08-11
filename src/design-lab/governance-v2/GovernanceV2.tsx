import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { PublicHeaderV2 } from "../platform-v2/PlatformHeader";
import { PublicFooterV2 } from "../shared/PublicFooterV2";
import { usePublicReveal } from "../shared/usePublicReveal";
import { GovernanceVisual } from "./GovernanceVisual";
import { governanceDefinitions, governanceFromHash, governanceGroups, governanceIds, type GovernanceDefinition, type GovernanceId } from "./governanceData";

function moveTo(id: string) { window.history.pushState(null, "", `#${id}`); window.dispatchEvent(new HashChangeEvent("hashchange")); window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }))); }

function GovernanceModel({ selectedId, onSelect, onClose }: { selectedId: GovernanceId; onSelect: (id: GovernanceId) => void; onClose: () => void }) {
  const chain = ["Identity", "Authentication", "Role & Ownership", "Tier & Quota", "Capability State", "Evidence & Investigation Scope", "Provider, Model & Budget Control", "Governed Runtime Execution", "Audit & Attribution", "Human Report Finalization", "Institutional Accountability"];
  return <section id="governance-model" className="g2-model" aria-labelledby="g2-model-title"><div className="p2-container">
    <header><div><span>COMPLETE GOVERNANCE MODEL</span><h2 id="g2-model-title">Authority is bounded.<br />Every decision remains attributable.</h2></div><button type="button" onClick={onClose}><X size={16} aria-hidden="true" />Close model</button></header>
    <div className="g2-model-groups">{governanceGroups.map((group) => <section key={group}><h3>{group}</h3><div>{governanceDefinitions.filter((item) => item.group === group).map((item) => <button type="button" key={item.id} className={item.id === selectedId ? "active" : ""} aria-current={item.id === selectedId ? "true" : undefined} onClick={() => onSelect(item.id)}><strong>{item.name}</strong><span>{item.technicalFlow.join(" → ")}</span></button>)}</div></section>)}</div>
    <ol className="g2-model-chain">{chain.map((item) => <li key={item}>{item}</li>)}</ol>
  </div></section>;
}

function GovernancePresentation({ governance, onPrevious, onNext, onShowModel }: { governance: GovernanceDefinition; onPrevious?: () => void; onNext?: () => void; onShowModel: () => void }) {
  return <section id={governance.id} key={governance.id} className="g2-presentation" aria-labelledby={`${governance.id}-title`}><div className="p2-container">
    <header className="g2-presentation-heading"><span>{governance.group}</span><h2 id={`${governance.id}-title`}>{governance.name}</h2><p>{governance.subtitle}</p></header>
    <div className="g2-purpose"><span>WHAT THIS CONTROL GOVERNS</span><p>{governance.purpose}</p></div>
    <GovernanceVisual governance={governance} />
    <div className="g2-information-grid"><section><span>HOW IT WORKS</span><p>{governance.mechanism}</p></section><section><span>CONTROLS</span><ul>{governance.controls.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span>POSSIBLE DECISIONS</span><ul>{governance.decisions.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span>TECHNICAL FLOW</span><ol>{governance.technicalFlow.map((item) => <li key={item}>{item}</li>)}</ol></section><section><span>AUDITABLE STATE</span><ul>{governance.auditState.map((item) => <li key={item}>{item}</li>)}</ul></section><aside><ShieldCheck size={20} aria-hidden="true" /><div><span>AUTHORITY BOUNDARY</span><p>{governance.boundary}</p>{governance.limitation && <small>{governance.limitation}</small>}</div></aside></div>
    <nav className="g2-topic-actions" aria-label={`${governance.name} navigation`}><button type="button" onClick={onPrevious} disabled={!onPrevious}><ArrowLeft size={16} />Previous Governance Topic</button><button className="model" type="button" onClick={onShowModel}>View Governance Model</button><button type="button" onClick={onNext} disabled={!onNext}>Next Governance Topic<ArrowRight size={16} /></button></nav>
  </div></section>;
}

function GovernanceAuthority() {
  const authorities = [["Raw Archive", "Canonical preserved source material."], ["PostgreSQL", "Authoritative operational and investigation records."], ["Capability Governance", "Effective state for whether a governed function may run."], ["Lens Contracts", "Independent analytical boundaries and output semantics."], ["Audit Ledger", "Attributable records of governed actions and decisions."], ["Human Reviewer", "Authority over findings and final report composition."], ["Founder / Product Owner", "Accountability for declared product and architecture truth."]];
  return <section className="g2-authority" aria-labelledby="g2-authority-title"><div className="p2-container"><header data-p2-reveal><span>AUTHORITY MODEL</span><h2 id="g2-authority-title">No single interface<br />owns every truth.</h2><p>FrameWire separates evidence authority, operational authority, analytical contracts and human judgment so one layer cannot silently replace another.</p></header><div className="g2-authority-grid" data-p2-reveal>{authorities.map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}</div></div></section>;
}

function GovernancePrinciple() {
  const doctrine = ["Authenticate Before Access", "Authorization Is Not UI Hiding", "Ownership Before Scope", "Tiers Cannot Weaken Evidence Rules", "Visible Toggle Is Not Runtime Proof", "Emergency Stop Must Fail Closed", "Eligible Does Not Mean Verified", "Investigation Scope Is Explicit", "Credentials Remain Private", "Provider Coverage Is Not Complete Evidence", "Budgets Bound Execution", "Analysis Is Additive", "Exports Are Non-Canonical", "AI Assists", "Humans Finalize"];
  return <section className="g2-principle" aria-labelledby="g2-principle-title"><div className="p2-container"><span>THE GOVERNANCE PRINCIPLE</span><h2 id="g2-principle-title">FrameWire governs who may act, what may run, which evidence may enter analysis, how decisions are attributed, and where human authority remains final.</h2><ul>{doctrine.map((item) => <li key={item}><CheckCircle2 size={15} aria-hidden="true" />{item}</li>)}</ul></div></section>;
}

export default function GovernanceV2Page() {
  usePublicReveal(); const [selected, setSelected] = useState(governanceFromHash); const [modelOpen, setModelOpen] = useState(() => window.location.hash === "#governance-model"); const selectedIndex = governanceDefinitions.findIndex((item) => item.id === selected.id);
  useEffect(() => { const previousTitle = document.title; document.title = "FrameWire Governance — Control Without Replacing Judgment"; const initialHash = window.location.hash.slice(1); if (initialHash) window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(initialHash)?.scrollIntoView({ block: "start" }))); return () => { document.title = previousTitle; }; }, []);
  useEffect(() => { const onLocationChange = () => { if (window.location.hash === "#governance-model") { setModelOpen(true); return; } const id = window.location.hash.slice(1) as GovernanceId; if (!governanceIds.includes(id)) { setSelected(governanceDefinitions[0]); setModelOpen(false); return; } const item = governanceDefinitions.find((entry) => entry.id === id); if (item) { setSelected(item); setModelOpen(false); } }; window.addEventListener("hashchange", onLocationChange); window.addEventListener("popstate", onLocationChange); return () => { window.removeEventListener("hashchange", onLocationChange); window.removeEventListener("popstate", onLocationChange); }; }, []);
  const select = (id: GovernanceId) => { const item = governanceDefinitions.find((entry) => entry.id === id); if (!item) return; setSelected(item); setModelOpen(false); moveTo(id); };
  const showModel = () => { setModelOpen(true); moveTo("governance-model"); }; const closeModel = () => { setModelOpen(false); moveTo(selected.id); };
  return <div className="p2-page g2-page"><PublicHeaderV2 activePage="governance" /><main id="p2-main">
    <section className="g2-hero" aria-labelledby="g2-hero-title"><div className="p2-container"><div className="g2-hero-grid"><div className="g2-hero-copy" data-p2-reveal><span>FRAMEWIRE GOVERNANCE</span><h1 id="g2-hero-title">Control the system<br />without replacing human judgment.</h1><p>FrameWire governs identity, access, capabilities, evidence eligibility, provider use, runtime execution, auditability and report finalization so the platform can remain powerful without confusing automation with authority.</p><div className="p2-hero-actions"><a href="#identity-sessions">Explore Governance <ArrowRight size={17} aria-hidden="true" /></a><a href="#governance-model">View Governance Model <ArrowDown size={17} aria-hidden="true" /></a></div></div><aside className="g2-hero-gate" data-p2-reveal><span>GOVERNED DECISION PATH</span><div>{["Identity", "Scope", "Capability", "Evidence", "Runtime", "Human Review"].map((item, index) => <div key={item} style={{ "--gate-index": index } as React.CSSProperties}><i /><strong>{item}</strong><small>{index === 5 ? "Final authority" : "Bounded control"}</small></div>)}</div><p>Illustrative control path · not a runtime status display</p></aside></div><div className="g2-doctrine-strip" data-p2-reveal>{["Authenticate", "Authorize", "Scope", "Govern", "Record", "Review"].map((item, index) => <span key={item}>{index > 0 && <i />}{item}</span>)}</div></div></section>
    {modelOpen && <GovernanceModel selectedId={selected.id} onSelect={select} onClose={closeModel} />}
    <GovernancePresentation governance={selected} onPrevious={selectedIndex > 0 ? () => select(governanceDefinitions[selectedIndex - 1].id as GovernanceId) : undefined} onNext={selectedIndex < governanceDefinitions.length - 1 ? () => select(governanceDefinitions[selectedIndex + 1].id as GovernanceId) : undefined} onShowModel={showModel} />
    <GovernanceAuthority /><GovernancePrinciple />
  </main><PublicFooterV2 /></div>;
}
