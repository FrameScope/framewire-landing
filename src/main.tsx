import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/motion.css";
import "./styles/site.css";
import "./styles/taste-v1.css";
import "./styles/platform-v2.css";
import "./styles/lenses-v2.css";
import "./styles/workflows-v2.css";
import "./styles/evidence-v2.css";
import "./styles/governance-v2.css";
import "./styles/use-cases-v2.css";
import "./styles/resources-v2.css";
import "./styles/technology-v2.css";
// Complete FrameWire public homepage — the guided tour is one section within it.
import CompleteHomepage from "./CompleteHomepage";
import TasteV1 from "./design-lab/TasteV1";
import HomeV2Page from "./design-lab/home-v2/HomeV2";
import LensesV2Page from "./design-lab/lenses-v2/LensesV2";
import PlatformV2Page from "./design-lab/platform-v2/PlatformV2";
import WorkflowsV2Page from "./design-lab/workflows-v2/WorkflowsV2";
import EvidenceV2Page from "./design-lab/evidence-v2/EvidenceV2";
import GovernanceV2Page from "./design-lab/governance-v2/GovernanceV2";
import UseCasesV2Page from "./design-lab/use-cases-v2/UseCasesV2";
import ResourcesV2Page from "./design-lab/resources-v2/ResourcesV2";
import TechnologyV2Page from "./design-lab/technology-v2/TechnologyV2";

const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
const isTasteV1 = currentPath === "/design-lab/taste-v1" || currentPath === "/design-lab/platform-v1";
const isHomeV2 = currentPath === "/" || currentPath === "/design-lab/home-v2";
const isPlatformV2 = currentPath === "/platform" || currentPath === "/design-lab/platform-v2";
const isLensesV2 = currentPath === "/lenses" || currentPath === "/design-lab/lenses-v2";
const isWorkflowsV2 = currentPath === "/workflows" || currentPath === "/design-lab/workflows-v2";
const isEvidenceV2 = currentPath === "/evidence" || currentPath === "/design-lab/evidence-v2";
const isGovernanceV2 = currentPath === "/governance" || currentPath === "/design-lab/governance-v2";
const isUseCasesV2 = currentPath === "/use-cases" || currentPath === "/design-lab/use-cases-v2";
const isResourcesV2 = currentPath === "/resources" || currentPath === "/design-lab/resources-v2";
const isTechnologyV2 = currentPath === "/technology" || currentPath === "/design-lab/technology-v2";

const pageTitles: Record<string, string> = {
  "/": "FrameWire — Understand Before Concluding",
  "/platform": "Platform — FrameWire",
  "/lenses": "Intelligence Lenses — FrameWire",
  "/workflows": "Investigation Workflows — FrameWire",
  "/evidence": "Evidence — FrameWire",
  "/governance": "Governance — FrameWire",
  "/use-cases": "Use Cases — FrameWire",
  "/resources": "Resources — FrameWire",
  "/technology": "Technology & Architecture — FrameWire",
};

const designLabCanonicalPath = currentPath.match(/^\/design-lab\/(home|platform|lenses|workflows|evidence|governance|use-cases|resources|technology)-v2$/)?.[1];
const metadataPath = designLabCanonicalPath === "home" ? "/" : designLabCanonicalPath ? `/${designLabCanonicalPath}` : currentPath;
if (pageTitles[metadataPath]) document.title = pageTitles[metadataPath];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isHomeV2 ? <HomeV2Page /> : isPlatformV2 ? <PlatformV2Page /> : isLensesV2 ? <LensesV2Page /> : isWorkflowsV2 ? <WorkflowsV2Page /> : isEvidenceV2 ? <EvidenceV2Page /> : isGovernanceV2 ? <GovernanceV2Page /> : isUseCasesV2 ? <UseCasesV2Page /> : isResourcesV2 ? <ResourcesV2Page /> : isTechnologyV2 ? <TechnologyV2Page /> : isTasteV1 ? <TasteV1 /> : <CompleteHomepage />}
  </StrictMode>,
);

if (window.location.hash) {
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    document.getElementById(targetId)?.scrollIntoView({ behavior: "auto", block: "start" });
  }));
}
