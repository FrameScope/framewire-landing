import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { FlowGraph } from "../graphs/FlowGraph";
import { SegregationGraph } from "../graphs/SegregationGraph";
import { RelationshipGraph } from "../graphs/RelationshipGraph";
import { TimelineGraph } from "../graphs/TimelineGraph";
import { LineageGraph } from "../graphs/LineageGraph";

export function FlowSection() {
  return (
    <Section id="flow">
      <SectionHead kicker="The governed path" align="center"
        title="Every source enters the archive first."
        lead="Raw data cannot jump to an engine. Verification is the gate between collection and analysis." />
      <Reveal><FlowGraph /></Reveal>
    </Section>
  );
}

export function SegregationSection() {
  return (
    <Section id="segregation" band>
      <SectionHead kicker="Data segregation" align="center"
        title="What can move where — and what is blocked."
        lead="States are kept apart on purpose. Some transitions are never allowed." />
      <Reveal><SegregationGraph /></Reveal>
    </Section>
  );
}

export function RelationshipsSection() {
  return (
    <Section id="relationships">
      <SectionHead kicker="Connected evidence"
        title="See how people, claims and sources connect."
        lead="FrameWire links actors, organizations, claims, narratives, locations, sources and evidence — so context is visible, not buried." />
      <Reveal><RelationshipGraph /></Reveal>
    </Section>
  );
}

export function TimelineSection() {
  return (
    <Section id="timeline">
      <SectionHead kicker="Continuity"
        title="Preserve how an investigation changed over time."
        lead="Evidence arrives, contradictions surface, status changes, corrections are recorded — and none of it is overwritten." />
      <Reveal><TimelineGraph /></Reveal>
    </Section>
  );
}

export function LineageSection() {
  return (
    <Section id="lineage" band>
      <SectionHead kicker="Traceability"
        title="Trace any conclusion back to its source."
        lead="From a report citation to the original collected item, the chain of transformation stays intact and inspectable." />
      <Reveal><LineageGraph /></Reveal>
    </Section>
  );
}
