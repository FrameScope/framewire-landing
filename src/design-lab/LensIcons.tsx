import type { SVGProps } from "react";

export type LensIconKind =
  | "narrative"
  | "sentiment"
  | "emotion"
  | "threat"
  | "fact-check"
  | "geography"
  | "politico"
  | "author"
  | "portal"
  | "entity";

export const lensIconOrder: LensIconKind[] = [
  "narrative",
  "sentiment",
  "emotion",
  "threat",
  "fact-check",
  "geography",
  "politico",
  "author",
  "portal",
  "entity",
];

type LensIconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & {
  kind: LensIconKind;
  size?: number;
  strokeWidth?: number;
};

const cyan = "#55d7e5";
const blue = "#5575f6";
const violet = "#a968e8";
const amber = "#f2c94c";
const orange = "#ff843d";
const green = "#65e2ab";
const ink = "#edf0ed";

function NarrativeIcon({ strokeWidth }: { strokeWidth: number }) {
  const nodes = [[14, 48], [29, 24], [48, 14], [70, 21], [84, 40], [76, 68], [48, 82], [25, 70]];
  return <>
    <g stroke={cyan} strokeWidth={strokeWidth}>
      <circle cx="47" cy="49" r="9" />
      <path d="M38 49H22M40 42 33 31M47 40V24M54 42 63 31M56 47 74 43M55 55 67 64M47 58V72M39 56 31 64" />
      <path d="M57 49h10l7-7M34 46l-6-6" opacity=".82" />
      {nodes.map(([x, y], index) => <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 5 : 4} />)}
    </g>
  </>;
}

function SentimentIcon({ strokeWidth }: { strokeWidth: number }) {
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <path d="M15 61a33 33 0 0 1 33-33" stroke={cyan} />
      <path d="M48 28a33 33 0 0 1 33 33" stroke={blue} />
      <path d="M20 61v-9M29 39l6 7M48 28v10M67 39l-6 7M76 61v-9" stroke={ink} opacity=".78" />
      <circle cx="48" cy="61" r="5" stroke={ink} />
      <path d="m48 61 22-26" stroke={ink} />
      <path d="M16 76v-9h5l3-6 4 1v12h-5l-2 2h-5ZM80 76v-9h-5l-3-6-4 1v12h5l2 2h5Z" stroke={ink} />
      <path d="M15 61h66" stroke={ink} opacity=".25" />
    </g>
  </>;
}

function EmotionIcon({ strokeWidth }: { strokeWidth: number }) {
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <path d="M23 26c12-9 31-11 47-3l2 3v22c0 19-10 32-24 35-15-3-25-16-25-35Z" stroke={ink} />
      <path d="M33 43q6-5 12 0M56 42q6-5 11 0M47 44v12l-5 2M36 67q12 9 24 0" stroke={ink} />
      <path d="M66 58c7-10 20-5 20 5 0 9-9 15-20 24-11-9-20-15-20-24 0-10 13-15 20-5Z" stroke={violet} />
      <circle cx="81" cy="22" r="2.5" stroke={violet} /><circle cx="87" cy="34" r="2" stroke={ink} /><circle cx="82" cy="45" r="2.5" stroke={violet} />
      <circle cx="17" cy="72" r="2.5" stroke={violet} /><circle cx="22" cy="82" r="1.8" stroke={ink} />
    </g>
  </>;
}

function ThreatIcon({ strokeWidth }: { strokeWidth: number }) {
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <path d="M44 15 10 76a7 7 0 0 0 6 10h64a7 7 0 0 0 6-10L52 15a5 5 0 0 0-8 0Z" stroke={orange} />
      <path d="m48 25-26 49h52Z" stroke={amber} />
      <path d="m51 40-13 24h11l-3 19 14-26H49Z" stroke={amber} />
      <path d="m78 24-5 10 7 2-5 10M85 43l8-8M84 50h9" stroke={orange} />
      <path d="M29 57h2M67 57h2" stroke={ink} opacity=".72" />
    </g>
  </>;
}

function FactCheckIcon({ strokeWidth }: { strokeWidth: number }) {
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <path d="M22 13h39l15 15v42H22Z" stroke={ink} />
      <path d="M61 13v16h15M32 34h21M32 45h26M32 56h17" stroke={ink} />
      <circle cx="66" cy="64" r="17" stroke={ink} />
      <path d="m78 77 12 12" stroke={ink} />
      <path d="m57 64 7 7 12-14" stroke={green} />
    </g>
  </>;
}

function GeographyIcon({ strokeWidth }: { strokeWidth: number }) {
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <circle cx="45" cy="53" r="31" stroke={ink} />
      <path d="M14 53h62M19 39h52M20 66h45M45 22v62M45 22c-18 13-18 49 0 62M45 22c13 10 17 29 12 45" stroke={cyan} />
      <path d="M77 18c-9 0-16 7-16 16 0 12 16 28 16 28s16-16 16-28c0-9-7-16-16-16Z" stroke={green} />
      <circle cx="77" cy="34" r="6" stroke={green} />
      <path d="M11 82a39 39 0 0 1 1-56M17 88h1M87 76h1" stroke={ink} strokeDasharray="2 5" opacity=".72" />
    </g>
  </>;
}

function PoliticoIcon({ strokeWidth }: { strokeWidth: number }) {
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <path d="M22 37h52l-6 13H28ZM30 50h36v35H30ZM19 85h58" stroke={violet} />
      <path d="m40 69 8-8 8 8-8 8Z" stroke={violet} />
      <path d="M34 37V27l-8-8M62 37V27l8-8" stroke={violet} />
      <circle cx="24" cy="17" r="4" stroke={violet} /><circle cx="72" cy="17" r="4" stroke={violet} />
      <path d="M35 57h26" stroke={ink} opacity=".45" />
    </g>
  </>;
}

function AuthorIcon({ strokeWidth }: { strokeWidth: number }) {
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <path d="M19 30V17h13M64 17h13v13M77 65v14H64M32 79H19V65" stroke={amber} />
      <path d="M48 26c14 0 24 10 24 24M28 50c0-12 8-21 20-21 11 0 19 8 19 19 0 20-8 29-18 35" stroke={amber} />
      <path d="M33 62c4-3 5-8 5-14 0-6 4-10 10-10s10 4 10 10c0 13-4 23-13 30M26 71c6-5 8-13 8-23M42 64c3-4 4-10 4-16 0-2 1-3 3-3s3 1 3 3c0 9-2 17-8 23M58 82c9-8 14-19 14-34" stroke={amber} />
    </g>
  </>;
}

function PortalIcon({ strokeWidth }: { strokeWidth: number }) {
  const nodes = [[48, 12], [72, 21], [84, 42], [82, 66], [65, 83], [40, 86], [19, 72], [12, 48], [22, 25]];
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <circle cx="48" cy="49" r="25" stroke={cyan} />
      <path d="M23 49h50M48 24v50M48 24c-12 9-12 41 0 50M48 24c12 9 12 41 0 50M27 36h42M27 62h42" stroke={cyan} />
      <circle cx="48" cy="49" r="37" stroke={cyan} strokeDasharray="4 6" opacity=".75" />
      {nodes.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="4" fill="#091014" stroke={cyan} />)}
    </g>
  </>;
}

function EntityIcon({ strokeWidth }: { strokeWidth: number }) {
  return <>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
      <path d="M29 54 47 28M47 28l25 13M29 54l17 27M46 81l28-15M47 28l-1 53M29 54l45 12" stroke={violet} strokeDasharray="3 5" />
      <path d="M47 28 72 66M29 54l43-13" stroke={ink} opacity=".76" />
      <circle cx="47" cy="18" r="6" stroke={ink} /><path d="M36 34c2-7 7-10 11-10s9 3 11 10" stroke={ink} />
      <circle cx="23" cy="48" r="6" stroke={ink} /><path d="M12 64c2-7 7-10 11-10s9 3 11 10" stroke={violet} />
      <circle cx="75" cy="35" r="6" stroke={ink} /><path d="M64 51c2-7 7-10 11-10s9 3 11 10" stroke={violet} />
      <circle cx="75" cy="67" r="6" stroke={ink} /><path d="M64 83c2-7 7-10 11-10s9 3 11 10" stroke={ink} />
      <circle cx="46" cy="83" r="4" fill="#091014" stroke={amber} />
    </g>
  </>;
}

export function LensIcon({ kind, size = 96, strokeWidth = 1.8, className, ...props }: LensIconProps) {
  const icon = {
    narrative: NarrativeIcon,
    sentiment: SentimentIcon,
    emotion: EmotionIcon,
    threat: ThreatIcon,
    "fact-check": FactCheckIcon,
    geography: GeographyIcon,
    politico: PoliticoIcon,
    author: AuthorIcon,
    portal: PortalIcon,
    entity: EntityIcon,
  }[kind];
  const Icon = icon;

  return (
    <svg
      viewBox="0 0 96 96"
      width={size}
      height={size}
      className={["taste-lens-icon", className].filter(Boolean).join(" ")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Icon strokeWidth={strokeWidth} />
    </svg>
  );
}
