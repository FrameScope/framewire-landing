import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/motion.css";
import "./styles/site.css";
// Complete FrameWire public homepage — the guided tour is one section within it.
import CompleteHomepage from "./CompleteHomepage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CompleteHomepage />
  </StrictMode>,
);
