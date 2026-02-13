import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const TypewriterText: React.FC<{
  text: string;
  startFrame: number;
  speed?: number;
  fontSize?: number;
  color?: string;
  showCursor?: boolean;
  fontWeight?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  startFrame,
  speed = 2,
  fontSize = 32,
  color = COLORS.green,
  showCursor = true,
  fontWeight = 400,
  style,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(Math.floor(elapsed / speed), text.length);
  const displayText = text.slice(0, charsToShow);
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  return (
    <span
      style={{
        fontFamily: `"Courier New", monospace`,
        fontSize,
        color,
        fontWeight,
        whiteSpace: "pre",
        ...style,
      }}
    >
      {displayText}
      {showCursor && (
        <span
          style={{
            opacity: cursorVisible ? 1 : 0,
            color: COLORS.green,
          }}
        >
          _
        </span>
      )}
    </span>
  );
};

export const TypewriterBlock: React.FC<{
  lines: { text: string; delay: number; color?: string }[];
  startFrame: number;
  speed?: number;
  fontSize?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
}> = ({ lines, startFrame, speed = 2, fontSize = 28, lineHeight = 1.8, style }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ fontFamily: `"Courier New", monospace`, fontSize, lineHeight, ...style }}>
      {lines.map((line, i) => {
        const lineStart = startFrame + line.delay;
        const elapsed = Math.max(0, frame - lineStart);
        const charsToShow = Math.min(Math.floor(elapsed / speed), line.text.length);
        const displayText = line.text.slice(0, charsToShow);
        const isLastActive =
          i === lines.length - 1 ||
          frame < startFrame + (lines[i + 1]?.delay ?? Infinity);
        const cursorVisible = Math.floor(frame / 15) % 2 === 0;

        if (frame < lineStart) return null;

        return (
          <div key={i} style={{ color: line.color ?? COLORS.green }}>
            {displayText}
            {isLastActive && charsToShow < line.text.length && (
              <span style={{ opacity: cursorVisible ? 1 : 0 }}>_</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
