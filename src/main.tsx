import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/motion.css";
import "./styles/site.css";
import "./styles/taste-v1.css";
// Complete FrameWire public homepage — the guided tour is one section within it.
import CompleteHomepage from "./CompleteHomepage";
import TasteV1 from "./design-lab/TasteV1";

const isTasteV1 = window.location.pathname.replace(/\/$/, "") === "/design-lab/taste-v1";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isTasteV1 ? <TasteV1 /> : <CompleteHomepage />}
  </StrictMode>,
);
