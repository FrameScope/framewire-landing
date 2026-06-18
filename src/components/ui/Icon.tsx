import type { CSSProperties } from "react";
import { ICONS } from "./icons";

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

/** Decorative by default — section copy provides the accessible meaning. */
export function Icon({ name, size = 18, color, strokeWidth = 1.75, style }: IconProps) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return (
    <Cmp
      size={size}
      color={color ?? "currentColor"}
      strokeWidth={strokeWidth}
      style={style}
      aria-hidden="true"
      focusable="false"
    />
  );
}
