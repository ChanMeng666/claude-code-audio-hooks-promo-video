import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, fontFamily } from "../../constants";
import { Terminal } from "../../components/Terminal";
import { TypewriterText } from "../../components/TypewriterText";

export const QuickSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progress bar
  const progressWidth = interpolate(frame, [20, 65], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stopwatch
  const stopwatchScale = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12 },
  });

  // Done text
  const doneOpacity = interpolate(frame, [50, 60], [0, 1], {
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
        Quick Setup
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        <Terminal title="bash — install" width={750} height={240} enterFrame={0}>
          <div>
            <span style={{ color: "#888" }}>$ </span>
            <TypewriterText
              text="git clone ...claude-code-audio-hooks.git"
              startFrame={5}
              speed={1.2}
              fontSize={18}
              showCursor={false}
            />
          </div>
          {frame > 30 && (
            <div style={{ marginTop: 10 }}>
              <span style={{ color: "#888" }}>$ </span>
              <TypewriterText
                text="bash scripts/install-complete.sh"
                startFrame={30}
                speed={1.5}
                fontSize={18}
                showCursor={false}
              />
            </div>
          )}

          {/* Progress bar */}
          {frame > 20 && (
            <div
              style={{
                marginTop: 24,
                width: "100%",
                height: 6,
                backgroundColor: COLORS.lightGray,
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  width: `${progressWidth}%`,
                  height: "100%",
                  backgroundColor: COLORS.green,
                  borderRadius: 3,
                  boxShadow: `0 0 10px ${COLORS.green}88`,
                }}
              />
            </div>
          )}
        </Terminal>

        {/* Stopwatch */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            transform: `scale(${stopwatchScale})`,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: `3px solid ${COLORS.green}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily,
              fontSize: 36,
              fontWeight: 800,
              color: COLORS.green,
              textShadow: COLORS.greenGlow,
            }}
          >
            2 min
          </div>
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
          opacity: doneOpacity,
        }}
      >
        Two Minutes.{" "}
        <span style={{ color: COLORS.green }}>Ready to Go.</span>
      </div>
    </div>
  );
};
