"use client";

import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/system/colorManipulator";

interface INoDataIllustrationProps {
  title?: string;
}

/**
 * Theme-aware "No Data Found" illustration.
 * Reads colors from the MUI palette so it adapts to light/dark mode.
 */
export function NoDataIllustration({
  title = "No Data Found",
}: INoDataIllustrationProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { gold, ink } = theme.palette;

  const haloOuter = isDark ? alpha(gold[500], 0.08) : gold[50];
  const haloInner = isDark ? alpha(gold[500], 0.14) : gold[100];
  const cardFill = theme.palette.background.paper;
  const cardStroke = isDark ? gold[500] : ink[800];
  const lineStrong = isDark ? alpha("#FFFFFF", 0.16) : ink[100];
  const lineFaint = isDark ? alpha("#FFFFFF", 0.08) : theme.palette.canvas[200];
  const ringStroke = isDark ? gold[400] : gold[600];
  const lensFill = isDark ? alpha(gold[500], 0.16) : gold[100];
  const lensSurface = isDark ? alpha(gold[500], 0.06) : gold[50];
  const handle = isDark ? gold[400] : gold[700];
  const face = isDark ? gold[300] : gold[700];
  const dot = isDark ? gold[400] : gold[300];
  const dotSoft = isDark ? gold[500] : gold[200];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 500 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      {/* Soft backdrop halo */}
      <ellipse cx="250" cy="200" rx="150" ry="150" fill={haloOuter} />
      <ellipse cx="250" cy="200" rx="112" ry="112" fill={haloInner} />

      {/* Decorative scatter dots */}
      <circle cx="92" cy="110" r="5" fill={dot} />
      <circle cx="410" cy="86" r="6" fill={dotSoft} />
      <circle cx="424" cy="240" r="4" fill={dot} />
      <circle cx="78" cy="262" r="4" fill={dotSoft} />
      <path d="M120 78 l0 14 M113 85 l14 0" stroke={dot} strokeWidth="3" strokeLinecap="round" />
      <path d="M388 290 l0 12 M382 296 l12 0" stroke={dotSoft} strokeWidth="3" strokeLinecap="round" />

      {/* Empty document card */}
      <rect x="176" y="102" width="148" height="188" rx="14" fill={cardFill} stroke={cardStroke} strokeWidth="3" />
      <rect x="200" y="136" width="100" height="10" rx="5" fill={lineStrong} />
      <rect x="200" y="160" width="76" height="8" rx="4" fill={lineFaint} />
      <rect x="200" y="180" width="90" height="8" rx="4" fill={lineFaint} />
      <rect x="200" y="200" width="60" height="8" rx="4" fill={lineFaint} />

      {/* Magnifying glass */}
      <circle cx="286" cy="242" r="52" fill={lensSurface} stroke={ringStroke} strokeWidth="8" />
      <circle cx="286" cy="242" r="40" fill={lensFill} />
      <line x1="324" y1="280" x2="358" y2="314" stroke={handle} strokeWidth="14" strokeLinecap="round" />
      {/* Empty-state face inside lens */}
      <circle cx="270" cy="234" r="4" fill={face} />
      <circle cx="302" cy="234" r="4" fill={face} />
      <path d="M272 260 q14 -12 28 0" stroke={face} strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
