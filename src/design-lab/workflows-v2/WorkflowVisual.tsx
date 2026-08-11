import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Archive, Ban, CheckCircle2, Cpu, Gavel, Network, UserRound } from "lucide-react";
import type { WorkflowDefinition, WorkflowNode, WorkflowNodeCategory } from "./workflowData";

const categoryLabels: Record<WorkflowNodeCategory, string> = {
  user: "Human action",
  decision: "Human decision",
  system: "System action",
  evidence: "Evidence",
  analysis: "Analysis",
  output: "Output",
  blocked: "Boundary state",
};

const categoryIcons = {
  user: UserRound,
  decision: Gavel,
  system: Cpu,
  evidence: Archive,
  analysis: Network,
  output: CheckCircle2,
  blocked: Ban,
} satisfies Record<WorkflowNodeCategory, typeof UserRound>;

function edgePath(from: WorkflowNode, to: WorkflowNode) {
  const mid = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mid} ${from.y}, ${mid} ${to.y}, ${to.x} ${to.y}`;
}

export function WorkflowVisual({ workflow }: { workflow: WorkflowDefinition }) {
  const [activeId, setActiveId] = useState(workflow.nodes[0].id);
  useEffect(() => setActiveId(workflow.nodes[0].id), [workflow]);

  const nodeById = useMemo(() => new Map(workflow.nodes.map((node) => [node.id, node])), [workflow.nodes]);
  const relatedIds = useMemo(() => {
    const ids = new Set([activeId]);
    workflow.edges.forEach((edge) => {
      if (edge.from === activeId) ids.add(edge.to);
      if (edge.to === activeId) ids.add(edge.from);
    });
    return ids;
  }, [activeId, workflow.edges]);
  const activeNode = nodeById.get(activeId) ?? workflow.nodes[0];

  return (
    <section className={`w2-visual topology-${workflow.visualType}`} aria-labelledby={`${workflow.id}-visual-title`}>
      <header className="w2-visual-head">
        <div><span>OPERATIONAL MOVEMENT</span><h3 id={`${workflow.id}-visual-title`}>{workflow.visualTitle}</h3></div>
        <p>{workflow.visualSummary}</p>
      </header>

      <div className="w2-visual-legend" aria-label="Diagram categories">
        {(Object.keys(categoryLabels) as WorkflowNodeCategory[]).map((category) => <span key={category} className={`category-${category}`}><i aria-hidden="true" />{categoryLabels[category]}</span>)}
      </div>

      <div className="w2-diagram-shell">
        <div className="w2-diagram" role="group" aria-label={`${workflow.name} interactive workflow diagram`}>
          <svg className="w2-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id={`arrow-${workflow.id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L8 4L0 8Z" /></marker></defs>
            {workflow.edges.map((edge) => {
              const from = nodeById.get(edge.from);
              const to = nodeById.get(edge.to);
              if (!from || !to) return null;
              const active = edge.from === activeId || edge.to === activeId;
              return <g key={`${edge.from}-${edge.to}`} className={active ? "active" : "dimmed"}>
                <path className={edge.style ?? "solid"} d={edgePath(from, to)} markerEnd={`url(#arrow-${workflow.id})`} />
                <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 1.2}>{edge.label}</text>
              </g>;
            })}
          </svg>
          {workflow.nodes.map((node) => {
            const Icon = categoryIcons[node.category];
            const active = node.id === activeId;
            return (
              <button
                key={node.id}
                type="button"
                className={`w2-node category-${node.category} ${active ? "active" : ""} ${relatedIds.has(node.id) ? "related" : "dimmed"}`}
                style={{ "--node-x": `${node.x}%`, "--node-y": `${node.y}%` } as CSSProperties}
                aria-pressed={active}
                aria-controls={`${workflow.id}-node-detail`}
                onClick={() => setActiveId(node.id)}
              >
                <Icon size={15} aria-hidden="true" />
                <span><b>{categoryLabels[node.category]}</b><strong>{node.label}</strong><small>{node.state}</small></span>
              </button>
            );
          })}
        </div>

        <aside id={`${workflow.id}-node-detail`} className={`w2-node-detail category-${activeNode.category}`} aria-live="polite">
          <span>{categoryLabels[activeNode.category]}</span>
          <h4>{activeNode.label}</h4>
          <dl>
            <div><dt>Actor</dt><dd>{activeNode.actor}</dd></div>
            <div><dt>Input</dt><dd>{activeNode.input}</dd></div>
            <div><dt>Creates</dt><dd>{activeNode.creates}</dd></div>
            <div><dt>Does not create</dt><dd>{activeNode.doesNot}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
