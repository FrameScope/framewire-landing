import { useEffect, useState } from "react";
import { Ban, CheckCircle2, CircleDollarSign, Fingerprint, Gavel, KeyRound, LockKeyhole, RadioTower, Settings2, ShieldCheck, SlidersHorizontal, UserCheck } from "lucide-react";
import type { GovernanceControlNode, GovernanceDefinition, GovernanceLane, GovernanceNodeKind } from "./governanceData";

const laneLabels: Record<GovernanceLane, string> = { request: "REQUEST", check: "CONTROL GATES", decision: "DECISION", state: "GOVERNED STATE", audit: "ATTRIBUTION" };
const kindLabels: Record<GovernanceNodeKind, string> = { governed: "Governed", allowed: "Allowed", human: "Human authority", denied: "Denied", disabled: "Disabled", configuration: "Configuration" };
const kindIcons = { governed: ShieldCheck, allowed: CheckCircle2, human: Gavel, denied: Ban, disabled: LockKeyhole, configuration: Settings2 } satisfies Record<GovernanceNodeKind, typeof ShieldCheck>;
const visualIcons = { identity: Fingerprint, access: UserCheck, tier: SlidersHorizontal, capability: Settings2, emergency: Ban, evidence: ShieldCheck, "investigation-boundary": LockKeyhole, byok: KeyRound, "provider-model": SlidersHorizontal, cost: CircleDollarSign, workers: Settings2, realtime: RadioTower, audit: Fingerprint, admin: UserCheck, "cross-lens": ShieldCheck, report: Gavel, "export-api": LockKeyhole, "runtime-truth": CheckCircle2 } satisfies Record<GovernanceDefinition["visualType"], typeof ShieldCheck>;

function ControlDetail({ node }: { node: GovernanceControlNode }) {
  return <aside className={`g2-control-detail kind-${node.kind}`} aria-live="polite">
    <span>CONTROL</span><h4>{node.label}</h4>
    <dl><div><dt>Capability State</dt><dd>{node.state}</dd></div><div><dt>Evaluates</dt><dd>{node.evaluates.join(" · ")}</dd></div><div><dt>Possible result</dt><dd>{node.results.join(" · ")}</dd></div></dl>
    <p><ShieldCheck size={15} aria-hidden="true" />{node.note}</p>
  </aside>;
}

export function GovernanceVisual({ governance }: { governance: GovernanceDefinition }) {
  const [activeId, setActiveId] = useState(governance.nodes[0].id);
  useEffect(() => setActiveId(governance.nodes[0].id), [governance]);
  const activeNode = governance.nodes.find((item) => item.id === activeId) ?? governance.nodes[0];
  const VisualIcon = visualIcons[governance.visualType];
  const lanes = (["request", "check", "decision", "state", "audit"] as GovernanceLane[]).map((lane) => ({ lane, nodes: governance.nodes.filter((node) => node.lane === lane) })).filter((item) => item.nodes.length);

  return <section className={`g2-visual visual-${governance.visualType}`} aria-labelledby={`${governance.id}-visual-title`}>
    <header className="g2-visual-head"><div><span>GOVERNED CONTROL PLANE</span><h3 id={`${governance.id}-visual-title`}><VisualIcon size={22} aria-hidden="true" />{governance.visualTitle}</h3></div><p>{governance.visualSummary}</p></header>
    <div className="g2-legend" aria-label="Governance states">{(Object.keys(kindLabels) as GovernanceNodeKind[]).map((kind) => <span className={`kind-${kind}`} key={kind}><i />{kindLabels[kind]}</span>)}</div>
    <div className="g2-visual-layout">
      <div className="g2-control-plane" role="group" aria-label={`${governance.name} finite decision flow`}>
        {lanes.map(({ lane, nodes }, laneIndex) => <section className={`g2-lane lane-${lane}`} key={lane} style={{ "--lane-index": laneIndex } as React.CSSProperties}><h4>{laneLabels[lane]}</h4><div>{nodes.map((node, nodeIndex) => { const Icon = kindIcons[node.kind]; return <button key={node.id} type="button" className={`g2-control kind-${node.kind} ${node.id === activeId ? "active" : ""}`} aria-pressed={node.id === activeId} aria-controls={`${governance.id}-control-detail`} style={{ "--node-index": nodeIndex } as React.CSSProperties} onClick={() => setActiveId(node.id)}><Icon size={16} aria-hidden="true" /><span><strong>{node.label}</strong><small>{node.state}</small></span></button>; })}</div></section>)}
      </div>
      <div id={`${governance.id}-control-detail`}><ControlDetail node={activeNode} /></div>
    </div>
  </section>;
}
