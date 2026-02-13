import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, fontFamily } from "../constants";

export const GlowText: React.FC<{
  text: string;
  fontSize?: number;
  enterFrame?: number;
  color?: string;
  fontWeight?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  fontSize = 36,
  enterFrame = 0,
  color = COLORS.green,
  fontWeight = 700,
  style,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - enterFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <span
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        color,
        textShadow: `0 0 ${20 * glowPulse}px ${color}, 0 0 ${40 * glowPulse}px ${color}66`,
        opacity,
        ...style,
      }}
    >
      {text}
    </span>
  );
};
