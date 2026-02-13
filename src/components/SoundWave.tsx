import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const SoundWave: React.FC<{
  barCount?: number;
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}> = ({
  barCount = 20,
  width = 300,
  height = 120,
  color = COLORS.green,
  speed = 0.15,
}) => {
  const frame = useCurrentFrame();
  const barWidth = width / (barCount * 2);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: barWidth,
        width,
        height,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const phase = (i / barCount) * Math.PI * 2;
        const barHeight =
          (Math.sin(frame * speed + phase) * 0.4 + 0.6) * height;
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: barHeight,
              backgroundColor: color,
              borderRadius: barWidth / 2,
              opacity: 0.7 + Math.sin(frame * speed + phase) * 0.3,
            }}
          />
        );
      })}
    </div>
  );
};
