export type TourTone = "source" | "ingest" | "archive" | "process" | "engine" | "context" | "human" | "report" | "verified";

export type TourStage = {
  name: string;
  shortName: string;
  statement: string;
  support: string;
  tone: TourTone;
};

export type TourLens = {
  name: string;
  target: string;
  lensIndex: number;
};

export const tourStages: TourStage[] = [
  {
    name: "Public Information",
    shortName: "Sources",
    statement: "Public information enters from media, social platforms, official records and uploaded material.",
    support: "The journey begins with inspectable public material—not an automatic answer.",
    tone: "source",
  },
  {
    name: "Governed Ingest",
    shortName: "Ingest",
    statement: "FrameWire collects material through controlled and traceable routes.",
    support: "Source, permission, provider, retrieval time, method and access boundaries remain attached.",
    tone: "ingest",
  },
  {
    name: "Archive First",
    shortName: "Archive",
    statement: "Before analysis begins, the original material is preserved.",
    support: "Analysis may change. The source remains inspectable.",
    tone: "archive",
  },
  {
    name: "Evidence Preparation",
    shortName: "Prepare",
    statement: "FrameWire prepares evidence without losing where it came from.",
    support: "Cleaning, extraction and classification never replace the archived original.",
    tone: "process",
  },
  {
    name: "Analytical Lenses",
    shortName: "Lenses",
    statement: "Each lens examines the same evidence from a different perspective.",
    support: "The observations remain independent. No lens silently becomes the conclusion.",
    tone: "engine",
  },
  {
    name: "Cross-Lens Context",
    shortName: "Compare",
    statement: "FrameWire compares the observations without forcing one automatic answer.",
    support: "Agreement, disagreement and missing evidence remain visible.",
    tone: "context",
  },
  {
    name: "Human-Led Investigation",
    shortName: "Investigate",
    statement: "The investigator examines the evidence, context and competing interpretations.",
    support: "FrameWire organises the investigation. The human interprets it.",
    tone: "human",
  },
  {
    name: "Human Verification",
    shortName: "Verify",
    statement: "AI assists, but a human decides what the evidence responsibly supports.",
    support: "A reviewer can accept, qualify, correct, exclude, request more evidence or leave a finding unresolved.",
    tone: "human",
  },
  {
    name: "Evidence-Backed Report",
    shortName: "Report",
    statement: "Only reviewed findings move into the final evidence-backed report.",
    support: "Citations keep the archived source, exact evidence and relevant observations inspectable.",
    tone: "report",
  },
  {
    name: "Institutional Memory",
    shortName: "Memory",
    statement: "Reviewed work becomes context for future investigations—not automatic truth.",
    support: "Previous evidence and decisions can inform a new question without deciding it.",
    tone: "verified",
  },
];

export const tourLenses: TourLens[] = [
  { name: "Narrative", target: "lens-narrative", lensIndex: 0 },
  { name: "Sentiment", target: "lens-sentiment", lensIndex: 1 },
  { name: "Emotion", target: "lens-emotion", lensIndex: 2 },
  { name: "Threat", target: "lens-threat", lensIndex: 3 },
  { name: "Geography", target: "lens-geography", lensIndex: 5 },
  { name: "Fact-Check", target: "lens-fact-check", lensIndex: 4 },
  { name: "Author", target: "lens-author", lensIndex: 7 },
  { name: "Portal", target: "lens-portal", lensIndex: 8 },
  { name: "Politico", target: "lens-politico", lensIndex: 6 },
];

export const finalTourDoctrine = ["Archive First.", "Evidence Before Conclusion.", "AI Assists.", "Humans Decide."];
