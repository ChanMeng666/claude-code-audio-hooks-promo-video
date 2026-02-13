import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, fontFamily } from "../constants";

export const CounterNumber: React.FC<{
  target: number;
  startFrame: number;
  duration?: number;
  suffix?: string;
  label: string;
  fontSize?: number;
}> = ({ target, startFrame, duration = 30, suffix = "", label, fontSize = 72 }) => {
  const frame = useCurrentFrame();

  const value = Math.round(
    interpolate(frame - startFrame, [0, duration], [0, target], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const opacity = interpolate(frame - startFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize,
          fontWeight: 800,
          color: COLORS.green,
          textShadow: COLORS.greenGlow,
        }}
      >
        {value}
        {suffix}
      </span>
      <span
        style={{
          fontFamily,
          fontSize: 22,
          color: COLORS.white,
          fontWeight: 500,
          opacity: 0.8,
        }}
      >
        {label}
      </span>
    </div>
  );
};
