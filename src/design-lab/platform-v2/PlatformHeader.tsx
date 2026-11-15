import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Check, ChevronDown, Menu, X } from "lucide-react";
import { BETA_MAILTO, LOGO, SIGNIN_URL } from "../../config";
import { evidenceDefinitions, evidenceIds, type EvidenceId } from "../evidence-v2/evidenceData";
import { governanceDefinitions, governanceIds, type GovernanceId } from "../governance-v2/governanceData";
import { lensDefinitions, lensIds, type LensId } from "../lenses-v2/lensData";
import { resourceDefinitions, resourceGroupMeta, resourceGroups, resourceIds, type ResourceId } from "../resources-v2/resourceData";
import { workflowDefinitions, workflowIds, type WorkflowId } from "../workflows-v2/workflowData";
import { useCaseDefinitions, useCaseIds, type UseCaseId } from "../use-cases-v2/useCaseData";
import { canonicalPlatformStages, type CanonicalStageId } from "./canonicalPlatformData";

const stageIds = canonicalPlatformStages.map((stage) => stage.id);

function stageIdFromHash(): CanonicalStageId {
  const hash = window.location.hash.slice(1) as CanonicalStageId;
  return stageIds.includes(hash) ? hash : canonicalPlatformStages[0].id;
}

function lensIdFromHash(): LensId {
  const hash = window.location.hash.slice(1) as LensId;
  return lensIds.includes(hash) ? hash : lensDefinitions[0].id;
}

function workflowIdFromHash(): WorkflowId {
  const hash = window.location.hash.slice(1) as WorkflowId;
  return workflowIds.includes(hash) ? hash : workflowDefinitions[0].id;
}

function evidenceIdFromHash(): EvidenceId {
  const hash = window.location.hash.slice(1) as EvidenceId;
  return evidenceIds.includes(hash) ? hash : evidenceDefinitions[0].id;
}

function governanceIdFromHash(): GovernanceId {
  const hash = window.location.hash.slice(1) as GovernanceId;
  return governanceIds.includes(hash) ? hash : governanceDefinitions[0].id as GovernanceId;
}

function currentUseCaseIdFromHash(): UseCaseId {
  const hash = window.location.hash.slice(1) as UseCaseId;
  return useCaseIds.includes(hash) ? hash : useCaseDefinitions[0].id as UseCaseId;
}

function currentResourceIdFromHash(): ResourceId {
  const hash = window.location.hash.slice(1) as ResourceId;
  return resourceIds.includes(hash) ? hash : resourceDefinitions[0].id as ResourceId;
}

export function PublicHeaderV2({ activePage }: { activePage: "home" | "platform" | "lenses" | "workflows" | "evidence" | "governance" | "use-cases" | "resources" | "technology" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [mobileLensesOpen, setMobileLensesOpen] = useState(false);
  const [mobileWorkflowsOpen, setMobileWorkflowsOpen] = useState(false);
  const [mobileEvidenceOpen, setMobileEvidenceOpen] = useState(false);
  const [mobileGovernanceOpen, setMobileGovernanceOpen] = useState(false);
  const [mobileUseCasesOpen, setMobileUseCasesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [lensesOpen, setLensesOpen] = useState(false);
  const [workflowsOpen, setWorkflowsOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [governanceOpen, setGovernanceOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(stageIdFromHash);
  const [selectedLensId, setSelectedLensId] = useState(lensIdFromHash);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(workflowIdFromHash);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(evidenceIdFromHash);
  const [selectedGovernanceId, setSelectedGovernanceId] = useState(governanceIdFromHash);
  const [selectedUseCaseId, setSelectedUseCaseId] = useState(currentUseCaseIdFromHash);
  const [selectedResourceId, setSelectedResourceId] = useState(currentResourceIdFromHash);
  const [scrolled, setScrolled] = useState(false);
  const platformControlRef = useRef<HTMLDivElement>(null);
  const platformButtonRef = useRef<HTMLButtonElement>(null);
  const platformItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lensesControlRef = useRef<HTMLDivElement>(null);
  const lensesButtonRef = useRef<HTMLButtonElement>(null);
  const lensesItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const workflowsControlRef = useRef<HTMLDivElement>(null);
  const workflowsButtonRef = useRef<HTMLButtonElement>(null);
  const workflowsItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const evidenceControlRef = useRef<HTMLDivElement>(null);
  const evidenceButtonRef = useRef<HTMLButtonElement>(null);
  const evidenceItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const governanceControlRef = useRef<HTMLDivElement>(null);
  const governanceButtonRef = useRef<HTMLButtonElement>(null);
  const governanceItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const useCasesControlRef = useRef<HTMLDivElement>(null);
  const useCasesButtonRef = useRef<HTMLButtonElement>(null);
  const useCasesItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const resourcesControlRef = useRef<HTMLDivElement>(null);
  const resourcesButtonRef = useRef<HTMLButtonElement>(null);
  const resourcesItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusResourcesOnOpenRef = useRef(false);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const selectedIndex = canonicalPlatformStages.findIndex((stage) => stage.id === selectedStageId);
  const selectedLensIndex = lensDefinitions.findIndex((lens) => lens.id === selectedLensId);
  const selectedWorkflowIndex = workflowDefinitions.findIndex((workflow) => workflow.id === selectedWorkflowId);
  const selectedEvidenceIndex = evidenceDefinitions.findIndex((evidence) => evidence.id === selectedEvidenceId);
  const selectedGovernanceIndex = governanceDefinitions.findIndex((item) => item.id === selectedGovernanceId);
  const selectedUseCaseIndex = useCaseDefinitions.findIndex((item) => item.id === selectedUseCaseId);
  const selectedResourceIndex = resourceDefinitions.findIndex((item) => item.id === selectedResourceId);

  useEffect(() => {
    if (!resourcesOpen || !focusResourcesOnOpenRef.current) return;
    focusResourcesOnOpenRef.current = false;
    resourcesItemRefs.current[Math.max(selectedResourceIndex, 0)]?.focus();
  }, [resourcesOpen, selectedResourceIndex]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    const onLocationChange = () => {
      if (activePage === "platform") setSelectedStageId(stageIdFromHash());
      if (activePage === "lenses") setSelectedLensId(lensIdFromHash());
      if (activePage === "workflows") setSelectedWorkflowId(workflowIdFromHash());
      if (activePage === "evidence") setSelectedEvidenceId(evidenceIdFromHash());
      if (activePage === "governance") setSelectedGovernanceId(governanceIdFromHash());
      if (activePage === "use-cases") setSelectedUseCaseId(currentUseCaseIdFromHash());
      if (activePage === "resources") setSelectedResourceId(currentResourceIdFromHash());
    };
    const onPointerDown = (event: PointerEvent) => {
      if (platformOpen && !platformControlRef.current?.contains(event.target as Node)) setPlatformOpen(false);
      if (lensesOpen && !lensesControlRef.current?.contains(event.target as Node)) setLensesOpen(false);
      if (workflowsOpen && !workflowsControlRef.current?.contains(event.target as Node)) setWorkflowsOpen(false);
      if (evidenceOpen && !evidenceControlRef.current?.contains(event.target as Node)) setEvidenceOpen(false);
      if (governanceOpen && !governanceControlRef.current?.contains(event.target as Node)) setGovernanceOpen(false);
      if (useCasesOpen && !useCasesControlRef.current?.contains(event.target as Node)) setUseCasesOpen(false);
      if (resourcesOpen && !resourcesControlRef.current?.contains(event.target as Node)) setResourcesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (platformOpen) {
        setPlatformOpen(false);
        platformButtonRef.current?.focus();
        return;
      }
      if (lensesOpen) {
        setLensesOpen(false);
        lensesButtonRef.current?.focus();
        return;
      }
      if (workflowsOpen) {
        setWorkflowsOpen(false);
        workflowsButtonRef.current?.focus();
        return;
      }
      if (evidenceOpen) {
        setEvidenceOpen(false);
        evidenceButtonRef.current?.focus();
        return;
      }
      if (governanceOpen) {
        setGovernanceOpen(false);
        governanceButtonRef.current?.focus();
        return;
      }
      if (useCasesOpen) {
        setUseCasesOpen(false);
        useCasesButtonRef.current?.focus();
        return;
      }
      if (resourcesOpen) {
        setResourcesOpen(false);
        resourcesButtonRef.current?.focus();
        return;
      }
      if (mobilePlatformOpen) {
        setMobilePlatformOpen(false);
        mobilePanelRef.current?.querySelector<HTMLButtonElement>(".p2-mobile-platform-trigger")?.focus();
        return;
      }
      if (mobileLensesOpen) {
        setMobileLensesOpen(false);
        mobilePanelRef.current?.querySelector<HTMLButtonElement>(".p2-mobile-lenses-trigger")?.focus();
        return;
      }
      if (mobileWorkflowsOpen) {
        setMobileWorkflowsOpen(false);
        mobilePanelRef.current?.querySelector<HTMLButtonElement>(".p2-mobile-workflows-trigger")?.focus();
        return;
      }
      if (mobileEvidenceOpen) {
        setMobileEvidenceOpen(false);
        mobilePanelRef.current?.querySelector<HTMLButtonElement>(".p2-mobile-evidence-trigger")?.focus();
        return;
      }
      if (mobileGovernanceOpen) {
        setMobileGovernanceOpen(false);
        mobilePanelRef.current?.querySelector<HTMLButtonElement>(".p2-mobile-governance-trigger")?.focus();
        return;
      }
      if (mobileUseCasesOpen) {
        setMobileUseCasesOpen(false);
        mobilePanelRef.current?.querySelector<HTMLButtonElement>(".p2-mobile-use-cases-trigger")?.focus();
        return;
      }
      if (mobileResourcesOpen) {
        setMobileResourcesOpen(false);
        mobilePanelRef.current?.querySelector<HTMLButtonElement>(".p2-mobile-resources-trigger")?.focus();
        return;
      }
      if (mobileOpen) {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activePage, evidenceOpen, governanceOpen, lensesOpen, mobileEvidenceOpen, mobileGovernanceOpen, mobileLensesOpen, mobileOpen, mobilePlatformOpen, mobileResourcesOpen, mobileUseCasesOpen, mobileWorkflowsOpen, platformOpen, resourcesOpen, useCasesOpen, workflowsOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => mobilePanelRef.current?.querySelector<HTMLElement>("a, button")?.focus());
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobilePlatformOpen(false);
    setMobileLensesOpen(false);
    setMobileWorkflowsOpen(false);
    setMobileEvidenceOpen(false);
    setMobileGovernanceOpen(false);
    setMobileUseCasesOpen(false);
    setMobileResourcesOpen(false);
    setMobileOpen(false);
  };

  const selectPlatformStage = (id: CanonicalStageId, returnFocus = false, fromMobile = false) => {
    setSelectedStageId(id);
    setPlatformOpen(false);
    if (fromMobile) closeMobile();

    const target = `/platform#${id}`;
    if (activePage !== "platform") {
      window.location.assign(target);
      return;
    }

    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (returnFocus) platformButtonRef.current?.focus();
    }));
  };

  const openPlatformFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setLensesOpen(false);
    setWorkflowsOpen(false);
    setEvidenceOpen(false);
    setGovernanceOpen(false);
    setUseCasesOpen(false);
    setResourcesOpen(false);
    setPlatformOpen(true);
    window.requestAnimationFrame(() => platformItemRefs.current[Math.max(selectedIndex, 0)]?.focus());
  };

  const selectLens = (id: LensId, returnFocus = false, fromMobile = false) => {
    setSelectedLensId(id);
    setLensesOpen(false);
    if (fromMobile) closeMobile();

    const target = `/lenses#${id}`;
    if (activePage !== "lenses") {
      window.location.assign(target);
      return;
    }

    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (returnFocus) lensesButtonRef.current?.focus();
    }));
  };

  const openLensesFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setPlatformOpen(false);
    setWorkflowsOpen(false);
    setEvidenceOpen(false);
    setGovernanceOpen(false);
    setUseCasesOpen(false);
    setResourcesOpen(false);
    setLensesOpen(true);
    window.requestAnimationFrame(() => lensesItemRefs.current[Math.max(selectedLensIndex, 0)]?.focus());
  };

  const handleLensItemKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number, id: LensId) => {
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      selectLens(id, true);
      return;
    }
    const targetByKey: Record<string, number> = {
      ArrowDown: Math.min(index + 1, lensDefinitions.length - 1),
      ArrowRight: Math.min(index + 1, lensDefinitions.length - 1),
      ArrowUp: Math.max(index - 1, 0),
      ArrowLeft: Math.max(index - 1, 0),
      Home: 0,
      End: lensDefinitions.length - 1,
    };
    if (!(event.key in targetByKey)) return;
    event.preventDefault();
    lensesItemRefs.current[targetByKey[event.key]]?.focus();
  };

  const handlePlatformItemKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number, id: CanonicalStageId) => {
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      selectPlatformStage(id, true);
      return;
    }
    const targetByKey: Record<string, number> = {
      ArrowDown: Math.min(index + 1, canonicalPlatformStages.length - 1),
      ArrowRight: Math.min(index + 1, canonicalPlatformStages.length - 1),
      ArrowUp: Math.max(index - 1, 0),
      ArrowLeft: Math.max(index - 1, 0),
      Home: 0,
      End: canonicalPlatformStages.length - 1,
    };
    if (!(event.key in targetByKey)) return;
    event.preventDefault();
    platformItemRefs.current[targetByKey[event.key]]?.focus();
  };

  const selectWorkflow = (id: WorkflowId, returnFocus = false, fromMobile = false) => {
    setSelectedWorkflowId(id);
    setWorkflowsOpen(false);
    if (fromMobile) closeMobile();

    const target = `/workflows#${id}`;
    if (activePage !== "workflows") {
      window.location.assign(target);
      return;
    }

    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (returnFocus) workflowsButtonRef.current?.focus();
    }));
  };

  const openWorkflowsFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setPlatformOpen(false);
    setLensesOpen(false);
    setEvidenceOpen(false);
    setGovernanceOpen(false);
    setUseCasesOpen(false);
    setResourcesOpen(false);
    setWorkflowsOpen(true);
    window.requestAnimationFrame(() => workflowsItemRefs.current[Math.max(selectedWorkflowIndex, 0)]?.focus());
  };

  const handleWorkflowItemKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number, id: WorkflowId) => {
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      selectWorkflow(id, true);
      return;
    }
    const targetByKey: Record<string, number> = {
      ArrowDown: Math.min(index + 2, workflowDefinitions.length - 1),
      ArrowRight: Math.min(index + 1, workflowDefinitions.length - 1),
      ArrowUp: Math.max(index - 2, 0),
      ArrowLeft: Math.max(index - 1, 0),
      Home: 0,
      End: workflowDefinitions.length - 1,
    };
    if (!(event.key in targetByKey)) return;
    event.preventDefault();
    workflowsItemRefs.current[targetByKey[event.key]]?.focus();
  };

  const selectEvidence = (id: EvidenceId, returnFocus = false, fromMobile = false) => {
    setSelectedEvidenceId(id);
    setEvidenceOpen(false);
    if (fromMobile) closeMobile();
    const target = `/evidence#${id}`;
    if (activePage !== "evidence") { window.location.assign(target); return; }
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (returnFocus) evidenceButtonRef.current?.focus();
    }));
  };

  const openEvidenceFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setGovernanceOpen(false); setUseCasesOpen(false); setResourcesOpen(false); setEvidenceOpen(true);
    window.requestAnimationFrame(() => evidenceItemRefs.current[Math.max(selectedEvidenceIndex, 0)]?.focus());
  };

  const handleEvidenceItemKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number, id: EvidenceId) => {
    if (["Enter", " "].includes(event.key)) { event.preventDefault(); selectEvidence(id, true); return; }
    const targetByKey: Record<string, number> = {
      ArrowDown: Math.min(index + 2, evidenceDefinitions.length - 1), ArrowRight: Math.min(index + 1, evidenceDefinitions.length - 1),
      ArrowUp: Math.max(index - 2, 0), ArrowLeft: Math.max(index - 1, 0), Home: 0, End: evidenceDefinitions.length - 1,
    };
    if (!(event.key in targetByKey)) return;
    event.preventDefault(); evidenceItemRefs.current[targetByKey[event.key]]?.focus();
  };

  const selectGovernance = (id: GovernanceId, returnFocus = false, fromMobile = false) => {
    setSelectedGovernanceId(id);
    setGovernanceOpen(false);
    if (fromMobile) closeMobile();
    const target = `/governance#${id}`;
    if (activePage !== "governance") { window.location.assign(target); return; }
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (returnFocus) governanceButtonRef.current?.focus();
    }));
  };

  const openGovernanceFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setUseCasesOpen(false); setResourcesOpen(false); setGovernanceOpen(true);
    window.requestAnimationFrame(() => governanceItemRefs.current[Math.max(selectedGovernanceIndex, 0)]?.focus());
  };

  const handleGovernanceItemKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number, id: GovernanceId) => {
    if (["Enter", " "].includes(event.key)) { event.preventDefault(); selectGovernance(id, true); return; }
    const targetByKey: Record<string, number> = {
      ArrowDown: Math.min(index + 2, governanceDefinitions.length - 1), ArrowRight: Math.min(index + 1, governanceDefinitions.length - 1),
      ArrowUp: Math.max(index - 2, 0), ArrowLeft: Math.max(index - 1, 0), Home: 0, End: governanceDefinitions.length - 1,
    };
    if (!(event.key in targetByKey)) return;
    event.preventDefault(); governanceItemRefs.current[targetByKey[event.key]]?.focus();
  };

  const selectUseCase = (id: UseCaseId, returnFocus = false, fromMobile = false) => {
    setSelectedUseCaseId(id);
    setUseCasesOpen(false);
    if (fromMobile) closeMobile();
    const target = `/use-cases#${id}`;
    if (activePage !== "use-cases") { window.location.assign(target); return; }
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (returnFocus) useCasesButtonRef.current?.focus();
    }));
  };

  const openUseCasesFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setGovernanceOpen(false); setResourcesOpen(false); setUseCasesOpen(true);
    window.requestAnimationFrame(() => useCasesItemRefs.current[Math.max(selectedUseCaseIndex, 0)]?.focus());
  };

  const handleUseCasesItemKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number, id: UseCaseId) => {
    if (["Enter", " "].includes(event.key)) { event.preventDefault(); selectUseCase(id, true); return; }
    const targetByKey: Record<string, number> = {
      ArrowDown: Math.min(index + 2, useCaseDefinitions.length - 1), ArrowRight: Math.min(index + 1, useCaseDefinitions.length - 1),
      ArrowUp: Math.max(index - 2, 0), ArrowLeft: Math.max(index - 1, 0), Home: 0, End: useCaseDefinitions.length - 1,
    };
    if (!(event.key in targetByKey)) return;
    event.preventDefault(); useCasesItemRefs.current[targetByKey[event.key]]?.focus();
  };

  const selectResource = (id: ResourceId, returnFocus = false, fromMobile = false) => {
    setSelectedResourceId(id);
    setResourcesOpen(false);
    if (fromMobile) closeMobile();
    const target = `/resources#${id}`;
    if (activePage !== "resources") { window.location.assign(target); return; }
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (returnFocus) resourcesButtonRef.current?.focus();
    }));
  };

  const openResourcesFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    focusResourcesOnOpenRef.current = true;
    setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setGovernanceOpen(false); setUseCasesOpen(false); setResourcesOpen(true);
  };

  const handleResourcesItemKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number, id: ResourceId) => {
    if (["Enter", " "].includes(event.key)) { event.preventDefault(); selectResource(id, true); return; }
    const targetByKey: Record<string, number> = {
      ArrowDown: Math.min(index + 1, resourceDefinitions.length - 1), ArrowRight: Math.min(index + 1, resourceDefinitions.length - 1),
      ArrowUp: Math.max(index - 1, 0), ArrowLeft: Math.max(index - 1, 0), Home: 0, End: resourceDefinitions.length - 1,
    };
    if (!(event.key in targetByKey)) return;
    event.preventDefault(); resourcesItemRefs.current[targetByKey[event.key]]?.focus();
  };

  return (
    <header className={`p2-header ${scrolled ? "scrolled" : ""}`}>
      <a className="p2-skip" href="#p2-main">Skip to content</a>
      <div className="p2-header-inner">
        <a className="p2-brand" href="/" aria-label="FrameWire home">
          <img src={LOGO} alt="" width="30" height="30" />
          <span>FRAMEWIRE</span>
        </a>

        <nav className="p2-desktop-nav" aria-label="Primary navigation">
          <a href="/" className={activePage === "home" ? "active" : ""} aria-current={activePage === "home" ? "page" : undefined}>Home</a>
          <a href="/technology" className={activePage === "technology" ? "active" : ""} aria-current={activePage === "technology" ? "page" : undefined}>Technology</a>
          <div ref={platformControlRef} className="p2-header-platform">
            <button
              ref={platformButtonRef}
              type="button"
              className={activePage === "platform" ? "active" : ""}
              aria-haspopup="menu"
              aria-expanded={platformOpen}
              aria-controls="p2-platform-menu"
              aria-current={activePage === "platform" ? "page" : undefined}
              onClick={() => { setLensesOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setGovernanceOpen(false); setUseCasesOpen(false); setResourcesOpen(false); setPlatformOpen((open) => !open); }}
              onKeyDown={openPlatformFromKeyboard}
            >
              Platform <ChevronDown size={13} aria-hidden="true" />
            </button>
            {platformOpen && (
              <div id="p2-platform-menu" className="p2-header-platform-menu" role="menu" aria-label="Platform functions">
                {canonicalPlatformStages.map((stage, index) => (
                  <button
                    ref={(element) => { platformItemRefs.current[index] = element; }}
                    key={stage.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={activePage === "platform" && stage.id === selectedStageId}
                    onClick={() => selectPlatformStage(stage.id, true)}
                    onKeyDown={(event) => handlePlatformItemKey(event, index, stage.id)}
                  >
                    <span>{stage.navigationName}</span>
                    {activePage === "platform" && stage.id === selectedStageId && <Check size={14} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div ref={lensesControlRef} className="p2-header-lenses">
            <button
              ref={lensesButtonRef}
              type="button"
              className={activePage === "lenses" ? "active" : ""}
              aria-haspopup="menu"
              aria-expanded={lensesOpen}
              aria-controls="p2-lenses-menu"
              aria-current={activePage === "lenses" ? "page" : undefined}
              onClick={() => { setPlatformOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setGovernanceOpen(false); setUseCasesOpen(false); setResourcesOpen(false); setLensesOpen((open) => !open); }}
              onKeyDown={openLensesFromKeyboard}
            >
              Lenses <ChevronDown size={13} aria-hidden="true" />
            </button>
            {lensesOpen && (
              <div id="p2-lenses-menu" className="p2-header-lenses-menu" role="menu" aria-label="Intelligence lenses">
                {lensDefinitions.map((lens, index) => (
                  <button
                    ref={(element) => { lensesItemRefs.current[index] = element; }}
                    key={lens.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={activePage === "lenses" && lens.id === selectedLensId}
                    onClick={() => selectLens(lens.id, true)}
                    onKeyDown={(event) => handleLensItemKey(event, index, lens.id)}
                  >
                    <b>{lens.code}</b><span>{lens.name}</span>
                    {activePage === "lenses" && lens.id === selectedLensId && <Check size={14} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div ref={workflowsControlRef} className="p2-header-workflows">
            <button
              ref={workflowsButtonRef}
              type="button"
              className={activePage === "workflows" ? "active" : ""}
              aria-haspopup="menu"
              aria-expanded={workflowsOpen}
              aria-controls="p2-workflows-menu"
              aria-current={activePage === "workflows" ? "page" : undefined}
              onClick={() => { setPlatformOpen(false); setLensesOpen(false); setEvidenceOpen(false); setGovernanceOpen(false); setUseCasesOpen(false); setResourcesOpen(false); setWorkflowsOpen((open) => !open); }}
              onKeyDown={openWorkflowsFromKeyboard}
            >
              Workflows <ChevronDown size={13} aria-hidden="true" />
            </button>
            {workflowsOpen && (
              <div id="p2-workflows-menu" className="p2-header-workflows-menu" role="menu" aria-label="FrameWire workflows">
                {workflowDefinitions.map((workflow, index) => (
                  <button
                    ref={(element) => { workflowsItemRefs.current[index] = element; }}
                    key={workflow.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={activePage === "workflows" && workflow.id === selectedWorkflowId}
                    onClick={() => selectWorkflow(workflow.id, true)}
                    onKeyDown={(event) => handleWorkflowItemKey(event, index, workflow.id)}
                  >
                    <span>{workflow.name}</span>
                    {activePage === "workflows" && workflow.id === selectedWorkflowId && <Check size={14} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div ref={evidenceControlRef} className="p2-header-evidence">
            <button ref={evidenceButtonRef} type="button" className={activePage === "evidence" ? "active" : ""} aria-haspopup="menu" aria-expanded={evidenceOpen} aria-controls="p2-evidence-menu" aria-current={activePage === "evidence" ? "page" : undefined} onClick={() => { setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setGovernanceOpen(false); setUseCasesOpen(false); setResourcesOpen(false); setEvidenceOpen((open) => !open); }} onKeyDown={openEvidenceFromKeyboard}>
              Evidence <ChevronDown size={13} aria-hidden="true" />
            </button>
            {evidenceOpen && <div id="p2-evidence-menu" className="p2-header-evidence-menu" role="menu" aria-label="FrameWire evidence functions">
              {evidenceDefinitions.map((evidence, index) => <button ref={(element) => { evidenceItemRefs.current[index] = element; }} key={evidence.id} type="button" role="menuitemradio" aria-checked={activePage === "evidence" && evidence.id === selectedEvidenceId} onClick={() => selectEvidence(evidence.id, true)} onKeyDown={(event) => handleEvidenceItemKey(event,index,evidence.id)}><span>{evidence.name}</span>{activePage === "evidence" && evidence.id === selectedEvidenceId && <Check size={14} aria-hidden="true" />}</button>)}
            </div>}
          </div>
          <div ref={governanceControlRef} className="p2-header-governance">
            <button ref={governanceButtonRef} type="button" className={activePage === "governance" ? "active" : ""} aria-haspopup="menu" aria-expanded={governanceOpen} aria-controls="p2-governance-menu" aria-current={activePage === "governance" ? "page" : undefined} onClick={() => { setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setUseCasesOpen(false); setResourcesOpen(false); setGovernanceOpen((open) => !open); }} onKeyDown={openGovernanceFromKeyboard}>
              Governance <ChevronDown size={13} aria-hidden="true" />
            </button>
            {governanceOpen && <div id="p2-governance-menu" className="p2-header-governance-menu" role="menu" aria-label="FrameWire governance controls">
              {governanceDefinitions.map((item, index) => <button ref={(element) => { governanceItemRefs.current[index] = element; }} key={item.id} type="button" role="menuitemradio" aria-checked={activePage === "governance" && item.id === selectedGovernanceId} onClick={() => selectGovernance(item.id as GovernanceId, true)} onKeyDown={(event) => handleGovernanceItemKey(event, index, item.id as GovernanceId)}><span>{item.name}</span>{activePage === "governance" && item.id === selectedGovernanceId && <Check size={14} aria-hidden="true" />}</button>)}
            </div>}
          </div>
          <div ref={useCasesControlRef} className="p2-header-use-cases">
            <button ref={useCasesButtonRef} type="button" className={activePage === "use-cases" ? "active" : ""} aria-haspopup="menu" aria-expanded={useCasesOpen} aria-controls="p2-use-cases-menu" aria-current={activePage === "use-cases" ? "page" : undefined} onClick={() => { setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setGovernanceOpen(false); setResourcesOpen(false); setUseCasesOpen((open) => !open); }} onKeyDown={openUseCasesFromKeyboard}>
              Use Cases <ChevronDown size={13} aria-hidden="true" />
            </button>
            {useCasesOpen && <div id="p2-use-cases-menu" className="p2-header-use-cases-menu" role="menu" aria-label="FrameWire use cases">
              {useCaseDefinitions.map((item, index) => <button ref={(element) => { useCasesItemRefs.current[index] = element; }} key={item.id} type="button" role="menuitemradio" aria-checked={activePage === "use-cases" && item.id === selectedUseCaseId} onClick={() => selectUseCase(item.id as UseCaseId, true)} onKeyDown={(event) => handleUseCasesItemKey(event, index, item.id as UseCaseId)}><span>{item.name}</span>{activePage === "use-cases" && item.id === selectedUseCaseId && <Check size={14} aria-hidden="true" />}</button>)}
            </div>}
          </div>
          <div ref={resourcesControlRef} className="p2-header-resources">
            <button ref={resourcesButtonRef} type="button" className={activePage === "resources" ? "active" : ""} aria-haspopup="menu" aria-expanded={resourcesOpen} aria-controls="p2-resources-menu" aria-current={activePage === "resources" ? "page" : undefined} onClick={() => { setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setGovernanceOpen(false); setUseCasesOpen(false); setResourcesOpen((open) => !open); }} onKeyDown={openResourcesFromKeyboard}>
              Resources <ChevronDown size={13} aria-hidden="true" />
            </button>
            {resourcesOpen && <div id="p2-resources-menu" className="p2-header-resources-menu" role="menu" aria-label="FrameWire Resources">
              {resourceGroups.map((group) => <section key={group} className="p2-header-resources-group" aria-label={resourceGroupMeta[group].label}>
                <span>{resourceGroupMeta[group].label}</span>
                {resourceDefinitions.filter((item) => item.group === group).map((item) => { const index = resourceDefinitions.findIndex((entry) => entry.id === item.id); return <button ref={(element) => { resourcesItemRefs.current[index] = element; }} key={item.id} type="button" role="menuitemradio" aria-checked={activePage === "resources" && item.id === selectedResourceId} onClick={() => selectResource(item.id as ResourceId, true)} onKeyDown={(event) => handleResourcesItemKey(event, index, item.id as ResourceId)}><span>{item.name}</span>{activePage === "resources" && item.id === selectedResourceId && <Check size={14} aria-hidden="true" />}</button>; })}
              </section>)}
            </div>}
          </div>
        </nav>

        <div className="p2-header-actions">
          {SIGNIN_URL ? <a className="p2-signin" href={SIGNIN_URL}>Sign In</a> : <span className="p2-signin p2-signin-disabled" aria-label="Sign in is not currently available">Sign In</span>}
          <a className="p2-beta-button" href={BETA_MAILTO}>Apply for Beta</a>
          <button ref={mobileButtonRef} className="p2-menu-toggle" type="button" aria-label="Open navigation" aria-expanded={mobileOpen} aria-controls="p2-mobile-navigation" onClick={() => { setPlatformOpen(false); setLensesOpen(false); setWorkflowsOpen(false); setEvidenceOpen(false); setGovernanceOpen(false); setUseCasesOpen(false); setResourcesOpen(false); setMobileOpen(true); }}>
            <Menu size={21} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`p2-mobile-backdrop ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen} onMouseDown={(event) => { if (event.target === event.currentTarget) closeMobile(); }}>
        <div ref={mobilePanelRef} id="p2-mobile-navigation" className="p2-mobile-drawer" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="p2-mobile-head">
            <span>NAVIGATION</span>
            <button type="button" onClick={() => { closeMobile(); mobileButtonRef.current?.focus(); }} aria-label="Close navigation"><X size={20} /></button>
          </div>
          <nav className="p2-mobile-primary" aria-label="Mobile primary pages">
            <a href="/" aria-current={activePage === "home" ? "page" : undefined} onClick={closeMobile}>Home</a>
            <a href="/technology" aria-current={activePage === "technology" ? "page" : undefined} onClick={closeMobile}>Technology</a>
            <button type="button" className="p2-mobile-platform-trigger" aria-expanded={mobilePlatformOpen} aria-controls="p2-mobile-platform-menu" aria-current={activePage === "platform" ? "page" : undefined} onClick={() => { setMobileLensesOpen(false); setMobileWorkflowsOpen(false); setMobileEvidenceOpen(false); setMobileGovernanceOpen(false); setMobileUseCasesOpen(false); setMobileResourcesOpen(false); setMobilePlatformOpen((open) => !open); }}>
              Platform <ChevronDown size={15} aria-hidden="true" />
            </button>
            <button type="button" className="p2-mobile-lenses-trigger" aria-expanded={mobileLensesOpen} aria-controls="p2-mobile-lenses-menu" aria-current={activePage === "lenses" ? "page" : undefined} onClick={() => { setMobilePlatformOpen(false); setMobileWorkflowsOpen(false); setMobileEvidenceOpen(false); setMobileGovernanceOpen(false); setMobileUseCasesOpen(false); setMobileResourcesOpen(false); setMobileLensesOpen((open) => !open); }}>
              Lenses <ChevronDown size={15} aria-hidden="true" />
            </button>
            <button type="button" className="p2-mobile-workflows-trigger" aria-expanded={mobileWorkflowsOpen} aria-controls="p2-mobile-workflows-menu" aria-current={activePage === "workflows" ? "page" : undefined} onClick={() => { setMobilePlatformOpen(false); setMobileLensesOpen(false); setMobileEvidenceOpen(false); setMobileGovernanceOpen(false); setMobileUseCasesOpen(false); setMobileResourcesOpen(false); setMobileWorkflowsOpen((open) => !open); }}>
              Workflows <ChevronDown size={15} aria-hidden="true" />
            </button>
            <button type="button" className="p2-mobile-evidence-trigger" aria-expanded={mobileEvidenceOpen} aria-controls="p2-mobile-evidence-menu" aria-current={activePage === "evidence" ? "page" : undefined} onClick={() => { setMobilePlatformOpen(false); setMobileLensesOpen(false); setMobileWorkflowsOpen(false); setMobileGovernanceOpen(false); setMobileUseCasesOpen(false); setMobileResourcesOpen(false); setMobileEvidenceOpen((open) => !open); }}>
              Evidence <ChevronDown size={15} aria-hidden="true" />
            </button>
            <button type="button" className="p2-mobile-governance-trigger" aria-expanded={mobileGovernanceOpen} aria-controls="p2-mobile-governance-menu" aria-current={activePage === "governance" ? "page" : undefined} onClick={() => { setMobilePlatformOpen(false); setMobileLensesOpen(false); setMobileWorkflowsOpen(false); setMobileEvidenceOpen(false); setMobileUseCasesOpen(false); setMobileResourcesOpen(false); setMobileGovernanceOpen((open) => !open); }}>
              Governance <ChevronDown size={15} aria-hidden="true" />
            </button>
            <button type="button" className="p2-mobile-use-cases-trigger" aria-expanded={mobileUseCasesOpen} aria-controls="p2-mobile-use-cases-menu" aria-current={activePage === "use-cases" ? "page" : undefined} onClick={() => { setMobilePlatformOpen(false); setMobileLensesOpen(false); setMobileWorkflowsOpen(false); setMobileEvidenceOpen(false); setMobileGovernanceOpen(false); setMobileResourcesOpen(false); setMobileUseCasesOpen((open) => !open); }}>
              Use Cases <ChevronDown size={15} aria-hidden="true" />
            </button>
            <button type="button" className="p2-mobile-resources-trigger" aria-expanded={mobileResourcesOpen} aria-controls="p2-mobile-resources-menu" aria-current={activePage === "resources" ? "page" : undefined} onClick={() => { setMobilePlatformOpen(false); setMobileLensesOpen(false); setMobileWorkflowsOpen(false); setMobileEvidenceOpen(false); setMobileGovernanceOpen(false); setMobileUseCasesOpen(false); setMobileResourcesOpen((open) => !open); }}>
              Resources <ChevronDown size={15} aria-hidden="true" />
            </button>
          </nav>
          {mobilePlatformOpen && (
            <div id="p2-mobile-platform-menu" className="p2-mobile-platform-menu" aria-label="Platform functions">
              {canonicalPlatformStages.map((stage) => (
                <button key={stage.id} type="button" aria-current={activePage === "platform" && stage.id === selectedStageId ? "page" : undefined} onClick={() => selectPlatformStage(stage.id, false, true)}>
                  <span>{stage.navigationName}</span>
                  {activePage === "platform" && stage.id === selectedStageId && <Check size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
          {mobileLensesOpen && (
            <div id="p2-mobile-lenses-menu" className="p2-mobile-lenses-menu" aria-label="Intelligence lenses">
              {lensDefinitions.map((lens) => (
                <button key={lens.id} type="button" aria-current={activePage === "lenses" && lens.id === selectedLensId ? "page" : undefined} onClick={() => selectLens(lens.id, false, true)}>
                  <b>{lens.code}</b><span>{lens.name}</span>
                  {activePage === "lenses" && lens.id === selectedLensId && <Check size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
          {mobileWorkflowsOpen && (
            <div id="p2-mobile-workflows-menu" className="p2-mobile-workflows-menu" aria-label="FrameWire workflows">
              {workflowDefinitions.map((workflow) => (
                <button key={workflow.id} type="button" aria-current={activePage === "workflows" && workflow.id === selectedWorkflowId ? "page" : undefined} onClick={() => selectWorkflow(workflow.id, false, true)}>
                  <span>{workflow.name}</span>
                  {activePage === "workflows" && workflow.id === selectedWorkflowId && <Check size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
          {mobileEvidenceOpen && <div id="p2-mobile-evidence-menu" className="p2-mobile-evidence-menu" aria-label="FrameWire evidence functions">
            {evidenceDefinitions.map((evidence) => <button key={evidence.id} type="button" aria-current={activePage === "evidence" && evidence.id === selectedEvidenceId ? "page" : undefined} onClick={() => selectEvidence(evidence.id,false,true)}><span>{evidence.name}</span>{activePage === "evidence" && evidence.id === selectedEvidenceId && <Check size={14} aria-hidden="true" />}</button>)}
          </div>}
          {mobileGovernanceOpen && <div id="p2-mobile-governance-menu" className="p2-mobile-governance-menu" aria-label="FrameWire governance controls">
            {governanceDefinitions.map((item) => <button key={item.id} type="button" aria-current={activePage === "governance" && item.id === selectedGovernanceId ? "page" : undefined} onClick={() => selectGovernance(item.id as GovernanceId, false, true)}><span>{item.name}</span>{activePage === "governance" && item.id === selectedGovernanceId && <Check size={14} aria-hidden="true" />}</button>)}
          </div>}
          {mobileUseCasesOpen && <div id="p2-mobile-use-cases-menu" className="p2-mobile-use-cases-menu" aria-label="FrameWire use cases">
            {useCaseDefinitions.map((item) => <button key={item.id} type="button" aria-current={activePage === "use-cases" && item.id === selectedUseCaseId ? "page" : undefined} onClick={() => selectUseCase(item.id as UseCaseId, false, true)}><span>{item.name}</span>{activePage === "use-cases" && item.id === selectedUseCaseId && <Check size={14} aria-hidden="true" />}</button>)}
          </div>}
          {mobileResourcesOpen && <div id="p2-mobile-resources-menu" className="p2-mobile-resources-menu" aria-label="FrameWire Resources">
            {resourceGroups.map((group) => <section key={group} className="p2-mobile-resources-group" aria-label={resourceGroupMeta[group].label}><span>{resourceGroupMeta[group].label}</span>{resourceDefinitions.filter((item) => item.group === group).map((item) => <button key={item.id} type="button" aria-current={activePage === "resources" && item.id === selectedResourceId ? "page" : undefined} onClick={() => selectResource(item.id as ResourceId, false, true)}><span>{item.name}</span>{activePage === "resources" && item.id === selectedResourceId && <Check size={14} aria-hidden="true" />}</button>)}</section>)}
          </div>}
          <div className="p2-mobile-actions">
            {SIGNIN_URL ? <a href={SIGNIN_URL}>Sign In</a> : <span aria-disabled="true">Sign In</span>}
            <a href={BETA_MAILTO}>Apply for Beta</a>
          </div>
        </div>
      </div>
    </header>
  );
}
