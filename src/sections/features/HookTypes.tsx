import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaKey,
  FaBell,
  FaShieldAlt,
  FaChartBar,
  FaBolt,
  FaFlagCheckered,
  FaCog,
} from "react-icons/fa";
import { COLORS, fontFamily } from "../../constants";

const hookTypes: { name: string; icon: React.ReactNode }[] = [
  { name: "Task Complete", icon: <FaCheckCircle /> },
  { name: "Task Failure", icon: <FaTimesCircle /> },
  { name: "Authorization", icon: <FaKey /> },
  { name: "Notification", icon: <FaBell /> },
  { name: "Permission", icon: <FaShieldAlt /> },
  { name: "Progress", icon: <FaChartBar /> },
  { name: "Tool Start", icon: <FaBolt /> },
  { name: "Tool End", icon: <FaFlagCheckered /> },
  { name: "Custom", icon: <FaCog /> },
];

export const HookTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
        Hook Types
      </div>

      {/* 3x3 Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          maxWidth: 900,
        }}
      >
        {hookTypes.map((hook, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const delay = (row + col) * 4 + 10;

          const scale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, mass: 0.5 },
          });

          const glowPulse = Math.sin((frame - delay) * 0.08) * 0.5 + 0.5;

          return (
            <div
              key={hook.name}
              style={{
                width: 260,
                height: 90,
                borderRadius: 12,
                border: `1.5px solid ${COLORS.green}`,
                backgroundColor: `${COLORS.green}08`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "0 20px",
                transform: `scale(${scale})`,
                boxShadow: `0 0 ${12 * glowPulse}px ${COLORS.green}33, inset 0 0 ${8 * glowPulse}px ${COLORS.green}11`,
              }}
            >
              <span style={{ fontSize: 24, color: COLORS.green, display: "flex" }}>
                {hook.icon}
              </span>
              <span
                style={{
                  fontFamily,
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.white,
                }}
              >
                {hook.name}
              </span>
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
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.white,
          opacity: interpolate(frame, [45, 55], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ color: COLORS.green }}>9</span> Hook Types. Every Event Covered.
      </div>
    </div>
  );
};
