import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FaExclamationTriangle, FaClock } from "react-icons/fa";
import { COLORS, fontFamily } from "../constants";
import { Terminal } from "../components/Terminal";
import { TypewriterText } from "../components/TypewriterText";

export const ProblemStatement: React.FC = () => {
  const frame = useCurrentFrame();

  // Terminal slide in (frame 0-30)
  const terminalX = interpolate(frame, [0, 25], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Loading dots
  const dots = ".".repeat((Math.floor(frame / 10) % 4));

  // Clock time
  const minutes = Math.min(10, Math.floor(interpolate(frame, [30, 90], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));

  // Auth required (frame 90-150)
  const authOpacity = interpolate(frame, [90, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red vignette
  const vignetteOpacity = interpolate(frame, [120, 140], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final text stagger
  const lostTexts = ["Lost time.", "Missed prompts.", "Broken flow."];
  const textStagger = lostTexts.map((_, i) => {
    const start = 130 + i * 12;
    return interpolate(frame, [start, start + 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
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
        overflow: "hidden",
      }}
    >
      {/* Red vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, ${COLORS.red}44 100%)`,
          opacity: vignetteOpacity,
          pointerEvents: "none",
        }}
      />

      <div style={{ transform: `translateX(${terminalX}px)` }}>
        <Terminal title="bash — claude" width={1000} height={340}>
          <div>
            <span style={{ color: COLORS.green }}>$ </span>
            <TypewriterText
              text='claude "Refactor the authentication module"'
              startFrame={5}
              speed={1.5}
              fontSize={20}
              showCursor={false}
            />
          </div>

          {frame > 30 && (
            <div style={{ marginTop: 12, color: "#888", display: "flex", alignItems: "center", gap: 8 }}>
              <span>Processing{dots}</span>
              <span style={{ marginLeft: 12, color: "#666", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <FaClock size={14} /> {minutes}m elapsed
              </span>
            </div>
          )}

          {frame > 90 && (
            <div
              style={{
                marginTop: 16,
                color: COLORS.red,
                opacity: authOpacity,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FaExclamationTriangle size={16} /> Authorization required - Waiting for user input...
            </div>
          )}
        </Terminal>
      </div>

      {/* Narrative text */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: "30%",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {frame > 30 && (
          <div
            style={{
              fontFamily,
              fontSize: 28,
              color: COLORS.white,
              opacity: interpolate(frame, [30, 45], [0, 0.8], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            You step away...
          </div>
        )}
        {frame > 90 && (
          <div
            style={{
              fontFamily,
              fontSize: 24,
              color: COLORS.red,
              opacity: authOpacity,
              fontWeight: 500,
            }}
          >
            Claude needed you 10 minutes ago.
          </div>
        )}
      </div>

      {/* Bottom staggered text */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 50,
        }}
      >
        {lostTexts.map((text, i) => (
          <span
            key={i}
            style={{
              fontFamily,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.red,
              opacity: textStagger[i],
              transform: `translateY(${(1 - textStagger[i]) * 20}px)`,
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
