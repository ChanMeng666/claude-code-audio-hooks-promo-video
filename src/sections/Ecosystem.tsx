import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FaFilter, FaBolt, FaMoon } from "react-icons/fa";
import { COLORS, fontFamily } from "../constants";

const features = [
  {
    icon: <FaFilter />,
    title: "Smart Matchers",
    subtitle: "Less noise, more signal",
  },
  {
    icon: <FaBolt />,
    title: "Async Execution",
    subtitle: "Zero latency hooks",
  },
  {
    icon: <FaMoon />,
    title: "Snooze",
    subtitle: "Pause anytime, auto-resume",
  },
];

export const Ecosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bottomTextOpacity = interpolate(frame, [100, 120], [0, 1], {
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
        overflow: "hidden",
      }}
    >
      {/* Cards row */}
      <div style={{ display: "flex", gap: 50 }}>
        {features.map((feat, i) => {
          const cardScale = spring({
            frame: frame - 15 - i * 15,
            fps,
            config: { damping: 12, mass: 0.6 },
          });

          const glowPulse = Math.sin((frame - 15 - i * 15) * 0.06) * 0.4 + 0.6;

          return (
            <div
              key={feat.title}
              style={{
                width: 280,
                height: 220,
                borderRadius: 20,
                border: `2px solid ${COLORS.green}66`,
                backgroundColor: `${COLORS.green}08`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                transform: `scale(${cardScale})`,
                boxShadow: `0 0 ${20 * glowPulse}px ${COLORS.green}22`,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: `${COLORS.green}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: COLORS.green,
                }}
              >
                {feat.icon}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.white,
                }}
              >
                {feat.title}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 16,
                  color: COLORS.white,
                  opacity: 0.6,
                }}
              >
                {feat.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontFamily,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.white,
          opacity: bottomTextOpacity,
        }}
      >
        Fine-tuned to{" "}
        <span style={{ color: COLORS.green }}>your workflow.</span>
      </div>
    </div>
  );
};
