import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";

export const GreenGrid: React.FC<{
  opacity?: number;
  cellSize?: number;
  animated?: boolean;
}> = ({ opacity = 0.1, cellSize = 60, animated = true }) => {
  const frame = useCurrentFrame();
  const offset = animated ? frame * 0.3 : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(${COLORS.green}${Math.round(opacity * 255).toString(16).padStart(2, "0")} 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.green}${Math.round(opacity * 255).toString(16).padStart(2, "0")} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        backgroundPosition: `${offset}px ${offset}px`,
      }}
    />
  );
};

export const ScanLine: React.FC<{
  startFrame: number;
  duration?: number;
}> = ({ startFrame, duration = 30 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < startFrame || frame > startFrame + duration + 10) return null;

  const fadeOut = interpolate(
    frame - startFrame,
    [duration - 5, duration + 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      {/* Upward scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${50 - progress * 50}%`,
          height: 2,
          backgroundColor: COLORS.green,
          boxShadow: COLORS.greenGlow,
          opacity: fadeOut,
        }}
      />
      {/* Downward scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${50 + progress * 50}%`,
          height: 2,
          backgroundColor: COLORS.green,
          boxShadow: COLORS.greenGlow,
          opacity: fadeOut,
        }}
      />
    </>
  );
};
