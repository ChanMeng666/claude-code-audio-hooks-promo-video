import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FaBalanceScale, FaGithub } from "react-icons/fa";
import { COLORS, fontFamily } from "../../constants";

export const OpenSource: React.FC = () => {
  const frame = useCurrentFrame();

  // Contribution grid wave
  const gridCols = 20;
  const gridRows = 7;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bottomOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.black,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          fontFamily,
          fontSize: 20,
          color: COLORS.green,
          opacity: 0.6,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        Open Source
      </div>

      {/* GitHub-style contribution grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: 40,
          borderRadius: 16,
          border: `1px solid ${COLORS.lightGray}`,
          backgroundColor: `${COLORS.darkGray}`,
        }}
      >
        {Array.from({ length: gridRows }).map((_, row) => (
          <div key={row} style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: gridCols }).map((_, col) => {
              const waveDelay = (col + row) * 2;
              const progress = interpolate(
                frame - waveDelay,
                [10, 25],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              );

              // Pseudo-random intensity
              const seed = (col * 7 + row * 13 + 5) % 5;
              const intensities = [0.1, 0.25, 0.45, 0.7, 1.0];
              const intensity = intensities[seed] * progress;

              return (
                <div
                  key={col}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    backgroundColor: COLORS.green,
                    opacity: intensity,
                    boxShadow:
                      intensity > 0.5
                        ? `0 0 ${intensity * 8}px ${COLORS.green}44`
                        : "none",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* MIT + GitHub badges */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          gap: 16,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            padding: "8px 20px",
            borderRadius: 20,
            border: `1px solid ${COLORS.green}`,
            fontFamily,
            fontSize: 16,
            color: COLORS.green,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <FaBalanceScale /> MIT License
        </div>
        <div
          style={{
            padding: "8px 20px",
            borderRadius: 20,
            border: `1px solid ${COLORS.green}`,
            fontFamily,
            fontSize: 16,
            color: COLORS.green,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <FaGithub /> GitHub
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontFamily,
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.white,
          opacity: bottomOpacity,
        }}
      >
        Open Source.{" "}
        <span style={{ color: COLORS.green }}>MIT Licensed.</span>
      </div>
    </div>
  );
};
