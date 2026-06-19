import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/motion.css";
// FrameWire motion homepage — the Technical Intelligence experience.
import ProofScenes from "./ProofScenes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProofScenes />
  </StrictMode>,
);
