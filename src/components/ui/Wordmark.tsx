import { LOGO } from "../../config";

export interface WordmarkProps {
  size?: number;
  showWord?: boolean;
  gap?: number;
}

/** The wordmark lockup (hex mark + "FrameWire"). */
export function Wordmark({ size = 26, showWord = true, gap = 11 }: WordmarkProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      <img src={LOGO} alt="" width={size} height={size} style={{ width: size, height: size, display: "block" }} />
      {showWord && (
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: size * 0.72, letterSpacing: "-0.02em", color: "var(--fw-ink)" }}>
          FrameWire
        </span>
      )}
    </span>
  );
}
