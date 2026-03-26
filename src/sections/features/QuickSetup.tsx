import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, fontFamily } from "../../constants";
import { Terminal } from "../../components/Terminal";
import { TypewriterText } from "../../components/TypewriterText";

export const QuickSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progress bar
  const progressWidth = interpolate(frame, [15, 45], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stopwatch primary (30s)
  const stopwatchScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12 },
  });

  // Secondary stopwatch (2min)
  const stopwatch2Opacity = interpolate(frame, [60, 70], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        <Terminal title="bash — quick-setup" width={750} height={240} enterFrame={0}>
          {/* Quick Setup one-liner */}
          <div>
            <span style={{ color: COLORS.green, fontSize: 14, fontWeight: 600 }}>
              # 30-Second Quick Setup
            </span>
          </div>
          <div style={{ marginTop: 6 }}>
            <span style={{ color: "#888" }}>$ </span>
            <TypewriterText
              text="curl -sL .../quick-setup.sh | bash"
              startFrame={5}
              speed={1.5}
              fontSize={18}
              showCursor={false}
            />
          </div>

          {/* Full Install alternative */}
          {frame > 30 && (
            <div style={{ marginTop: 16 }}>
              <span style={{ color: "#666", fontSize: 14 }}>
                # Or Full Install (22 hooks + audio + TTS)
              </span>
            </div>
          )}
          {frame > 35 && (
            <div style={{ marginTop: 4 }}>
              <span style={{ color: "#888" }}>$ </span>
              <TypewriterText
                text="bash scripts/install-complete.sh"
                startFrame={35}
                speed={1.5}
                fontSize={18}
                showCursor={false}
              />
            </div>
          )}

          {/* Progress bar */}
          {frame > 15 && (
            <div
              style={{
                marginTop: 20,
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

        {/* Stopwatch area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Primary: 30s */}
          <div
            style={{
              transform: `scale(${stopwatchScale})`,
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: `3px solid ${COLORS.green}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily,
              fontSize: 32,
              fontWeight: 800,
              color: COLORS.green,
              textShadow: COLORS.greenGlow,
            }}
          >
            30 sec
          </div>

          {/* Secondary: 2min (smaller, dimmer) */}
          <div
            style={{
              opacity: stopwatch2Opacity,
              fontFamily,
              fontSize: 16,
              color: COLORS.white,
            }}
          >
            Full Install: 2 min
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
        30 Seconds.{" "}
        <span style={{ color: COLORS.green }}>Ready to Go.</span>
      </div>
    </div>
  );
};
