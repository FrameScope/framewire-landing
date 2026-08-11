import { useEffect, useState } from "react";
import { Archive, ArrowDownToLine, CheckCircle2, Compass, FileCheck2, Gavel, Search, UserRoundCheck } from "lucide-react";
import type { MissionPhase, MissionStep, UseCaseDefinition } from "./useCaseData";

const phases: MissionPhase[] = ["situation", "environment", "framewire", "human", "output", "continuity"];
const phaseLabels: Record<MissionPhase,string> = { situation:"REAL-WORLD SITUATION", environment:"INFORMATION ENVIRONMENT", framewire:"FRAMEWIRE ACTION", human:"HUMAN DECISION", output:"ACCOUNTABLE OUTPUT", continuity:"WHAT CHANGES NEXT" };
const phaseIcons = { situation:Compass, environment:Archive, framewire:Search, human:UserRoundCheck, output:FileCheck2, continuity:ArrowDownToLine } satisfies Record<MissionPhase,typeof Compass>;

function MissionDetail({ step }: { step: MissionStep }) {
  return <aside className={`u2-step-detail phase-${step.phase}`} aria-live="polite"><span>SELECTED STEP</span><h4>{step.label}</h4><dl><div><dt>Why it matters</dt><dd>{step.why}</dd></div><div><dt>FrameWire systems</dt><dd>{step.systems.join(" · ")}</dd></div><div><dt>Human authority</dt><dd>{step.humanAuthority}</dd></div></dl><p><Gavel size={15} aria-hidden="true" />Machine assistance does not replace the stated human decision boundary.</p></aside>;
}

export function UseCaseVisual({ useCase }: { useCase: UseCaseDefinition }) {
  const [activeId,setActiveId]=useState(useCase.steps[0].id);
  useEffect(()=>setActiveId(useCase.steps[0].id),[useCase]);
  const active=useCase.steps.find((item)=>item.id===activeId)??useCase.steps[0];
  return <section className={`u2-visual mission-${useCase.visualType}`} aria-labelledby={`${useCase.id}-visual-title`}>
    <header className="u2-visual-head"><div><span>MISSION VIEW · ILLUSTRATIVE INVESTIGATION STRUCTURE</span><h3 id={`${useCase.id}-visual-title`}>{useCase.visualTitle}</h3></div><p>{useCase.visualSummary}</p></header>
    <div className="u2-visual-layout"><div className="u2-mission" role="group" aria-label={`${useCase.name} interactive mission visualization`}>
      <div className="u2-mission-spine" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      {phases.map((phase,phaseIndex)=>{const items=useCase.steps.filter((item)=>item.phase===phase);if(!items.length)return null;const Icon=phaseIcons[phase];return <section className={`u2-phase phase-${phase}`} key={phase} style={{"--phase-index":phaseIndex} as React.CSSProperties}><h4><Icon size={14} aria-hidden="true" />{phaseLabels[phase]}</h4><div>{items.map((item,itemIndex)=><button key={item.id} type="button" className={item.id===activeId?"active":""} aria-pressed={item.id===activeId} aria-controls={`${useCase.id}-mission-detail`} style={{"--item-index":itemIndex} as React.CSSProperties} onClick={()=>setActiveId(item.id)}><strong>{item.label}</strong><small>{item.state}</small>{item.id===activeId&&<CheckCircle2 size={14} aria-hidden="true" />}</button>)}</div></section>})}
    </div><div id={`${useCase.id}-mission-detail`}><MissionDetail step={active} /></div></div>
  </section>;
}
