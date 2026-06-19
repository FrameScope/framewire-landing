import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/proto.css";
// FrameWire motion homepage (animation-driven contextual-intelligence experience).
import Prototype from "./Prototype";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Prototype />
  </StrictMode>,
);
